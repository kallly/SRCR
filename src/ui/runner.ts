import { t } from '../i18n';
import { groupColor } from '../data/groups';
import { figureSvg } from '../data/figures';
import { exerciseCue, exerciseName } from '../core/plan';
import { buildQueue } from '../core/queue';
import type { RestStep, Step, WorkStep } from '../core/types';
import { beep, beepExerciseEnd, beepWarning, primeAudio } from '../platform/audio';
import { acquireWakeLock, releaseWakeLock } from '../platform/wakelock';
import { byId, dot, el } from './dom';
import { clock } from './format';
import type { Context } from './app';

const RING_RADIUS = 100;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Secondes ajoutees par le bouton secondaire pendant une pause. */
const EXTRA_SECONDS = 15;

/**
 * Secondes de mise en place entre l'appui sur « Demarrer le chrono » et le
 * vrai depart (bip + decompte de l'exercice) : le temps de lacher le
 * telephone et de se mettre en position. Un bouton permet de la sauter.
 */
const SETUP_SECONDS = 5;

/** Periode de rafraichissement du chrono : assez fine pour ne pas sauter de seconde. */
const TICK_MS = 250;

/** Bip d'avertissement quand il reste ce nombre de secondes ou moins. */
const WARNING_SECONDS = 3;

/**
 * Phase courante du lecteur. Elle determine a la fois l'affichage et l'action
 * des deux boutons du bas, ce qui permet de repeindre l'ecran a tout moment
 * (changement de langue) sans toucher au chrono en cours.
 */
type Phase = 'rest' | 'ready' | 'countdown' | 'timing' | 'reps' | 'done';

const REST_LABELS: Record<RestStep['reason'], Parameters<typeof t>[0]> = {
  manual: 'rest.manual',
  'between-sets': 'rest.betweenSets',
  forced: 'rest.forced',
  transition: 'rest.transition',
};

export interface Runner {
  /** Repeint l'ecran courant, par exemple apres un changement de langue. */
  render(): void;
  start(): void;
  stop(): void;
}

export function createRunner(ctx: Context): Runner {
  const screen = byId('run');
  const stepLabel = byId('runStep');
  const progress = byId('runProgress');
  const label = byId('runLabel');
  const name = byId('runName');
  const setLine = byId('runSet');
  const figure = byId('runFigure');
  const ring = byId('runRing');
  const ringFill = byId('runRingFill');
  const time = byId('runTime');
  const reps = byId('runReps');
  const hint = byId('runHint');
  const cue = byId('runCue');
  const upNext = byId('runNext');
  const secondary = byId<HTMLButtonElement>('runSecondary');
  const primary = byId<HTMLButtonElement>('runPrimary');

  ringFill.setAttribute('stroke-dasharray', String(RING_CIRCUMFERENCE));

  let queue: Step[] = [];
  let index = 0;
  let phase: Phase = 'done';
  let active = false;
  let timer: number | null = null;
  let remaining = 0;
  let duration = 0;
  let endsAt = 0;
  let onCountdownEnd: () => void = next;
  let warned = false;

  function clearTimer(): void {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  }

  function setRing(fraction: number): void {
    ringFill.setAttribute(
      'stroke-dashoffset',
      String(RING_CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, fraction)))),
    );
  }

  function paintClock(): void {
    time.textContent = clock(remaining);
    setRing(duration > 0 ? remaining / duration : 0);
  }

  function tick(): void {
    remaining = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
    paintClock();
    // Pas d'avertissement pendant la mise en place : ses 5 secondes sont deja
    // toutes une preparation, un bip a 3 s n'y annoncerait rien de nouveau.
    if (!warned && phase !== 'countdown' && remaining > 0 && remaining <= WARNING_SECONDS) {
      warned = true;
      beepWarning();
    }
    if (remaining <= 0) {
      clearTimer();
      if (phase === 'timing') beepExerciseEnd();
      else beep();
      onCountdownEnd();
    }
  }

  function startCountdown(seconds: number, onEnd: () => void = next): void {
    clearTimer();
    duration = seconds;
    remaining = seconds;
    endsAt = Date.now() + seconds * 1000;
    onCountdownEnd = onEnd;
    warned = seconds <= WARNING_SECONDS;
    paintClock();
    timer = window.setInterval(tick, TICK_MS);
  }

  function currentStep(): Step | undefined {
    return queue[index];
  }

  /** Prochain effort de la file, pour l'annonce « Ensuite — … ». */
  function upcoming(): WorkStep | undefined {
    return queue.slice(index + 1).find((step): step is WorkStep => step.kind === 'work');
  }

  /**
   * Repos et effort ne se distinguaient qu'a la couleur (teinte de fond,
   * anneau, pastille) : illisible en plein soleil ou pour un daltonien.
   * Icone dediee, de forme differente du rond plein utilise pour l'effort.
   */
  function restIcon(): HTMLElement {
    return el('i', { className: 'rest-icon', attrs: { 'aria-hidden': 'true' } });
  }

  function paintRest(step: RestStep): void {
    label.replaceChildren(restIcon(), document.createTextNode(t(REST_LABELS[step.reason])));
    name.textContent = step.next
      ? t('runner.then', { name: exerciseName(step.next) })
      : t('runner.recover');
    setLine.textContent = '';
    figure.replaceChildren();
    cue.textContent =
      step.reason === 'forced'
        ? t('runner.forcedCue')
        : step.reason === 'transition'
          ? t('runner.transitionCue')
          : '';
    secondary.textContent = t('runner.addTime');
    primary.textContent = t('runner.skip');
  }

  function paintWork(step: WorkStep): void {
    const { item } = step;
    label.replaceChildren(
      dot(groupColor(item.group)),
      document.createTextNode(t(`group.${item.group}`)),
    );
    name.textContent = exerciseName(item);
    setLine.textContent = t('runner.setOf', { current: step.set, total: step.sets });
    figure.innerHTML = figureSvg(item.key);
    cue.textContent = exerciseCue(item);
    secondary.textContent = t('runner.skip');

    if (phase === 'reps') {
      reps.textContent = t('runner.reps', { count: item.reps });
      primary.textContent = t('runner.setDone');
      return;
    }
    hint.textContent = phase === 'countdown' ? t('runner.startingSoon') : t('runner.readyHint');
    primary.textContent =
      phase === 'ready'
        ? t('runner.startTimer')
        : phase === 'countdown'
          ? t('runner.skipSetup')
          : t('runner.done');
  }

  function paintDone(): void {
    label.replaceChildren();
    name.textContent = t('runner.finished');
    setLine.textContent = '';
    figure.replaceChildren();
    reps.textContent = '✓';
    cue.textContent = t('runner.finishedCue');
    upNext.textContent = '';
    primary.textContent = t('runner.close');
  }

  /**
   * Repeint entierement l'ecran a partir de la phase courante.
   * Ne touche jamais au chrono : appelable a tout moment.
   */
  function render(): void {
    if (!active) return;

    if (phase === 'done') {
      paintDone();
      return;
    }

    const step = currentStep();
    if (!step) return;

    stepLabel.textContent = t('runner.step', { current: index + 1, total: queue.length });
    const next = upcoming();
    upNext.textContent = next
      ? t('runner.next', { name: exerciseName(next.item) })
      : t('runner.lastEffort');

    if (step.kind === 'rest') paintRest(step);
    else paintWork(step);
  }

  /** Prepare et affiche l'etape courante. */
  function enterStep(): void {
    clearTimer();

    if (index >= queue.length) {
      finish();
      return;
    }
    const step = queue[index];
    if (!step) {
      finish();
      return;
    }

    screen.classList.toggle('resting', step.kind === 'rest');
    screen.classList.remove('done-state', 'ready', 'countdown');
    hint.classList.remove('on');
    secondary.style.display = '';
    progress.style.width = `${(index / queue.length) * 100}%`;

    const timed = step.kind === 'rest' || step.item.mode === 'time';
    ring.classList.toggle('on', timed);
    reps.classList.toggle('on', step.kind === 'work' && step.item.mode === 'reps');

    if (step.kind === 'rest') {
      phase = 'rest';
      render();
      startCountdown(step.seconds);
      return;
    }

    if (step.item.mode === 'time') {
      // Etape d'armement : le chrono ne part qu'une fois en position.
      phase = 'ready';
      screen.classList.add('ready');
      hint.classList.add('on');
      duration = step.item.seconds;
      remaining = step.item.seconds;
      paintClock();
      render();
      return;
    }

    phase = 'reps';
    render();
  }

  /** Appui sur « Demarrer le chrono » : lance la mise en place, pas l'exercice. */
  function beginSetup(): void {
    const step = currentStep();
    if (!step || step.kind !== 'work' || step.item.mode !== 'time') return;
    phase = 'countdown';
    screen.classList.remove('ready');
    screen.classList.add('countdown');
    render();
    startCountdown(SETUP_SECONDS, startTimer);
  }

  /**
   * Vrai depart de l'exercice : fin de la mise en place, spontanee ou sautee.
   * Ne bipe pas elle-meme : `tick()` l'a deja fait pour une fin naturelle, et
   * le bouton « Commencer maintenant » s'en charge pour une fin sautee — sans
   * quoi les deux chemins produiraient un double bip.
   */
  function startTimer(): void {
    const step = currentStep();
    if (!step || step.kind !== 'work' || step.item.mode !== 'time') return;
    phase = 'timing';
    screen.classList.remove('countdown');
    hint.classList.remove('on');
    render();
    startCountdown(step.item.seconds);
  }

  function next(): void {
    clearTimer();
    index += 1;
    enterStep();
  }

  function addTime(seconds: number): void {
    if (phase !== 'rest') return;
    duration += seconds;
    endsAt += seconds * 1000;
    remaining = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
    paintClock();
  }

  function finish(): void {
    clearTimer();
    phase = 'done';
    ctx.state.history.push(Date.now());
    ctx.save();

    screen.classList.remove('resting', 'ready', 'countdown');
    screen.classList.add('done-state');
    hint.classList.remove('on');
    ring.classList.remove('on');
    reps.classList.add('on');
    progress.style.width = '100%';
    secondary.style.display = 'none';
    render();
  }

  function stop(): void {
    clearTimer();
    active = false;
    phase = 'done';
    screen.classList.remove('on', 'resting', 'done-state', 'ready', 'countdown');
    hint.classList.remove('on');
    secondary.style.display = '';
    // Sans cette remise a zero, la barre gardait la position de la seance
    // precedente jusqu'au premier changement d'etape de la suivante.
    progress.style.width = '0';
    void releaseWakeLock();
    ctx.renderAll();
  }

  function start(): void {
    queue = buildQueue(ctx.activePlan().items, ctx.activePlan().config);
    if (queue.length === 0) return;
    index = 0;
    active = true;
    screen.classList.add('on');
    primeAudio();
    void acquireWakeLock();
    enterStep();
  }

  primary.addEventListener('click', () => {
    if (phase === 'done') stop();
    else if (phase === 'ready') beginSetup();
    else if (phase === 'countdown') {
      beep();
      startTimer();
    }
    else next();
  });

  secondary.addEventListener('click', () => {
    if (phase === 'rest') addTime(EXTRA_SECONDS);
    else next();
  });

  byId('runQuit').addEventListener('click', stop);

  document.addEventListener('keydown', (event) => {
    if (!active) return;
    if (event.key === ' ') {
      event.preventDefault();
      primary.click();
    } else if (event.key === 'Escape') {
      stop();
    }
  });

  return { render, start, stop };
}
