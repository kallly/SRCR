import type { EffortMode, ExerciseKey, GroupId } from '../core/types';

/**
 * Un exercice propose par la bibliotheque.
 *
 * Aucun texte ici : le nom et le conseil sont dans `i18n/locales/*` sous les
 * cles `exercise.<key>.name` et `exercise.<key>.cue`. Le resume affiche sur la
 * carte (« 3 x 10 », « 20 min ») est recalcule depuis ces valeurs par
 * `ui/format.ts`, pour ne jamais diverger des reglages reels.
 */
export interface LibraryEntry {
  key: Exclude<ExerciseKey, 'custom'>;
  group: GroupId;
  mode: EffortMode;
  sets: number;
  reps: number;
  seconds: number;
  /** Repos entre series, en secondes (mode classique). */
  rest: number;
}

export const LIBRARY: readonly LibraryEntry[] = [
  { key: 'inclined', group: 'push', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'chairsquat', group: 'legs', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'calf', group: 'calves', mode: 'reps', sets: 3, reps: 15, seconds: 30, rest: 90 },
  { key: 'wallsit', group: 'legs', mode: 'time', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'rotation', group: 'shoulders', mode: 'reps', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'deadbug', group: 'core', mode: 'reps', sets: 3, reps: 8, seconds: 30, rest: 60 },
  { key: 'plank', group: 'core', mode: 'time', sets: 3, reps: 10, seconds: 20, rest: 60 },
  { key: 'walk', group: 'cardio', mode: 'time', sets: 1, reps: 10, seconds: 1200, rest: 0 },

  // push
  { key: 'kneePushup', group: 'push', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'wallPushup', group: 'push', mode: 'reps', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'chairDips', group: 'push', mode: 'reps', sets: 3, reps: 8, seconds: 30, rest: 90 },

  // shoulders
  { key: 'armCircles', group: 'shoulders', mode: 'time', sets: 3, reps: 10, seconds: 30, rest: 30 },
  { key: 'wallSlides', group: 'shoulders', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 60 },

  // back
  { key: 'superman', group: 'back', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 60 },
  { key: 'reverseSnowAngel', group: 'back', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 60 },
  { key: 'birdDog', group: 'back', mode: 'reps', sets: 3, reps: 8, seconds: 30, rest: 60 },
  { key: 'catCow', group: 'back', mode: 'time', sets: 3, reps: 10, seconds: 30, rest: 20 },

  // legs
  { key: 'reverseLunge', group: 'legs', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'stepUp', group: 'legs', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'lateralLunge', group: 'legs', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 90 },

  // glutes
  { key: 'gluteBridge', group: 'glutes', mode: 'reps', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'donkeyKick', group: 'glutes', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 60 },
  { key: 'hipAbduction', group: 'glutes', mode: 'reps', sets: 3, reps: 12, seconds: 30, rest: 60 },

  // core
  { key: 'sidePlank', group: 'core', mode: 'time', sets: 3, reps: 10, seconds: 20, rest: 60 },
  { key: 'standingKneeRaise', group: 'core', mode: 'reps', sets: 3, reps: 10, seconds: 30, rest: 45 },
  { key: 'crunch', group: 'core', mode: 'reps', sets: 3, reps: 15, seconds: 30, rest: 45 },

  // cardio
  { key: 'highKneeMarch', group: 'cardio', mode: 'time', sets: 2, reps: 10, seconds: 45, rest: 30 },
  { key: 'buttKickMarch', group: 'cardio', mode: 'time', sets: 2, reps: 10, seconds: 45, rest: 30 },
];

/** Seance type proposee par le bouton « charger la seance type ». */
export const DEFAULT_ORDER: readonly LibraryEntry['key'][] = [
  'inclined',
  'chairsquat',
  'calf',
  'wallsit',
  'rotation',
  'deadbug',
  'plank',
];

/** Reglages de depart d'un exercice saisi par l'utilisateur. */
export const CUSTOM_DEFAULTS = {
  group: 'core',
  mode: 'reps',
  sets: 3,
  reps: 10,
  seconds: 30,
  rest: 90,
} satisfies Omit<LibraryEntry, 'key'>;

export function findLibraryEntry(key: string): LibraryEntry | undefined {
  return LIBRARY.find((entry) => entry.key === key);
}

/** Vrai pour une cle de la bibliotheque : exclut donc `custom`. */
export function isLibraryKey(key: string): key is LibraryEntry['key'] {
  return findLibraryEntry(key) !== undefined;
}
