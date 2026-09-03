import { t } from '../i18n';
import { CUSTOM_DEFAULTS, DEFAULT_ORDER, findLibraryEntry, isLibraryKey } from '../data/library';
import type { ExerciseItem, PlanItem, RestItem } from './types';

/** Longueur maximale d'un nom d'exercice saisi par l'utilisateur. */
const MAX_CUSTOM_NAME = 60;

export function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function isExercise(item: PlanItem): item is ExerciseItem {
  return item.type === 'exercise';
}

/** Cree une ligne a partir d'une entree de la bibliotheque. */
export function createFromLibrary(key: string): ExerciseItem | null {
  const entry = findLibraryEntry(key);
  if (!entry) return null;
  return {
    id: uid(),
    type: 'exercise',
    key: entry.key,
    group: entry.group,
    mode: entry.mode,
    sets: entry.sets,
    reps: entry.reps,
    seconds: entry.seconds,
    rest: entry.rest,
  };
}

/** Cree une ligne pour un exercice saisi par l'utilisateur. */
export function createCustom(name: string): ExerciseItem {
  return {
    id: uid(),
    type: 'exercise',
    key: 'custom',
    customName: name.trim().slice(0, MAX_CUSTOM_NAME),
    ...CUSTOM_DEFAULTS,
  };
}

export function createRest(seconds: number): RestItem {
  return { id: uid(), type: 'rest', seconds };
}

/** Seance type proposee au premier lancement et par le bouton dedie. */
export function defaultPlan(): PlanItem[] {
  return DEFAULT_ORDER.map(createFromLibrary).filter(
    (item): item is ExerciseItem => item !== null,
  );
}

/**
 * Nom affiche, resolu dans la langue active. Un exercice perso garde le nom
 * saisi ; toute cle inconnue se rabat sur le libelle generique.
 */
export function exerciseName(item: ExerciseItem): string {
  if (item.customName) return item.customName;
  if (isLibraryKey(item.key)) return t(`exercise.${item.key}.name`);
  return t('exercise.custom.name');
}

/** Conseil d'execution. Vide pour un exercice perso : il n'y en a pas. */
export function exerciseCue(item: ExerciseItem): string {
  return isLibraryKey(item.key) ? t(`exercise.${item.key}.cue`) : '';
}

/** Deplace un element du deroule, en place. Sans effet si l'index sort du plan. */
export function move(plan: PlanItem[], from: number, to: number): void {
  if (to < 0 || to >= plan.length || from < 0 || from >= plan.length) return;
  const [item] = plan.splice(from, 1);
  if (item) plan.splice(to, 0, item);
}
