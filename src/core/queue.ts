import type { Config, ExerciseItem, PlanItem, RestStep, Step, WorkStep } from './types';
import { isExercise } from './plan';

/** Estimation de la duree d'une repetition, en secondes. */
const SECONDS_PER_REP = 4;

function work(item: ExerciseItem, set: number): WorkStep {
  return { kind: 'work', item, set, sets: item.sets };
}

function rest(reason: RestStep['reason'], seconds: number, next: ExerciseItem | null): RestStep {
  return { kind: 'rest', reason, seconds, next };
}

/** Mode classique : toutes les series d'un exercice, puis le suivant. */
export function buildClassic(plan: readonly PlanItem[]): Step[] {
  const steps: Step[] = [];
  for (const item of plan) {
    if (!isExercise(item)) {
      steps.push(rest('manual', item.seconds, null));
      continue;
    }
    for (let set = 1; set <= item.sets; set++) {
      steps.push(work(item, set));
      if (set < item.sets && item.rest > 0) {
        steps.push(rest('between-sets', item.rest, item));
      }
    }
  }
  return steps;
}

/**
 * Un segment de circuit : on alterne les groupes musculaires en piochant a
 * chaque tour l'exercice d'un autre groupe a qui il reste le plus de series.
 *
 * Une pause n'est imposee que si le prochain effort touche le meme groupe que
 * celui qu'on vient de faire, c'est-a-dire quand aucun autre groupe n'a encore
 * de serie disponible.
 */
function buildCircuitSegment(
  items: readonly ExerciseItem[],
  cfg: Config,
  previousGroup: string | null,
): { steps: Step[]; lastGroup: string | null } {
  const pool = items.map((item, index) => ({ item, index, left: item.sets }));
  const steps: Step[] = [];
  let last = previousGroup;

  while (pool.some((slot) => slot.left > 0)) {
    const available = pool.filter((slot) => slot.left > 0);
    const others = available.filter((slot) => slot.item.group !== last);
    const candidates = others.length > 0 ? others : available;
    const forced = others.length === 0;

    // Le plus de series restantes ; a egalite, l'ordre du deroule tranche.
    const pick = candidates.reduce((best, slot) =>
      slot.left > best.left || (slot.left === best.left && slot.index < best.index) ? slot : best,
    );

    if (forced) {
      steps.push(rest('forced', cfg.pause, pick.item));
    } else if (steps.length > 0 && cfg.trans > 0) {
      steps.push(rest('transition', cfg.trans, pick.item));
    }

    steps.push(work(pick.item, pick.item.sets - pick.left + 1));
    pick.left--;
    last = pick.item.group;
  }

  return { steps, lastGroup: last };
}

/**
 * Mode circuit. Une pause ajoutee manuellement au deroule coupe le circuit en
 * deux segments independants : l'alternance repart de zero apres elle.
 */
export function buildCircuit(plan: readonly PlanItem[], cfg: Config): Step[] {
  const steps: Step[] = [];
  let segment: ExerciseItem[] = [];
  let last: string | null = null;

  const flush = (): void => {
    if (segment.length === 0) return;
    const built = buildCircuitSegment(segment, cfg, last);
    steps.push(...built.steps);
    last = built.lastGroup;
    segment = [];
  };

  for (const item of plan) {
    if (isExercise(item)) {
      segment.push(item);
    } else {
      flush();
      steps.push(rest('manual', item.seconds, null));
      last = null;
    }
  }
  flush();

  return steps;
}

export function buildQueue(plan: readonly PlanItem[], cfg: Config): Step[] {
  return cfg.mode === 'circuit' ? buildCircuit(plan, cfg) : buildClassic(plan);
}

/** Duree estimee de la file, en secondes. */
export function queueDuration(queue: readonly Step[]): number {
  return queue.reduce((total, step) => {
    if (step.kind === 'rest') return total + step.seconds;
    const { item } = step;
    return total + (item.mode === 'time' ? item.seconds : item.reps * SECONDS_PER_REP);
  }, 0);
}
