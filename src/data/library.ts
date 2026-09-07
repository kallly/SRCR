import type { CategoryId, EffortMode, ExerciseKey, GroupId, MotionKind } from '../core/types';

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
  /**
   * Moment/equipement, une seule valeur. Metadonnee de catalogue seulement :
   * jamais copiee dans un `ExerciseItem` persiste (voir `CategoryId`,
   * `core/types.ts`), contrairement a `group`.
   */
  category: CategoryId;
  mode: EffortMode;
  /**
   * Geste repete ou position tenue. Metadonnee de catalogue comme `category` :
   * jamais recopiee dans un `ExerciseItem` persiste, donc son ajout n'a demande
   * aucune migration de stockage. Sert a la figure (voir la skill
   * `seance-figures`) et a l'assertion de `scripts/check-build.ts`.
   */
  motion: MotionKind;
  sets: number;
  reps: number;
  seconds: number;
  /** Repos entre series, en secondes (mode classique). */
  rest: number;
}

export const LIBRARY: readonly LibraryEntry[] = [
  { key: 'inclined', group: 'push', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'chairsquat', group: 'legs', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'calf', group: 'calves', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 15, seconds: 30, rest: 90 },
  { key: 'wallsit', group: 'legs', category: 'bodyweight', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'rotation', group: 'shoulders', category: 'warmup', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'deadbug', group: 'core', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 8, seconds: 30, rest: 60 },
  { key: 'plank', group: 'core', category: 'bodyweight', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 20, rest: 60 },
  { key: 'walk', group: 'cardio', category: 'bodyweight', mode: 'time', motion: 'move', sets: 1, reps: 10, seconds: 1200, rest: 0 },

  // push
  { key: 'kneePushup', group: 'push', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'wallPushup', group: 'push', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'chairDips', group: 'arms', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 8, seconds: 30, rest: 90 },

  // shoulders
  { key: 'armCircles', group: 'shoulders', category: 'warmup', mode: 'time', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 30 },
  { key: 'wallSlides', group: 'shoulders', category: 'warmup', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 60 },

  // back
  { key: 'superman', group: 'back', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 60 },
  { key: 'reverseSnowAngel', group: 'back', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 60 },
  { key: 'birdDog', group: 'back', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 8, seconds: 30, rest: 60 },
  { key: 'catCow', group: 'back', category: 'warmup', mode: 'time', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 20 },

  // legs
  { key: 'reverseLunge', group: 'legs', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'stepUp', group: 'legs', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'lateralLunge', group: 'legs', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },

  // glutes
  { key: 'gluteBridge', group: 'glutes', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'donkeyKick', group: 'glutes', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 60 },
  { key: 'hipAbduction', group: 'glutes', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 60 },

  // core
  { key: 'sidePlank', group: 'core', category: 'bodyweight', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 20, rest: 60 },
  { key: 'standingKneeRaise', group: 'core', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 45 },
  { key: 'crunch', group: 'core', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 15, seconds: 30, rest: 45 },

  // cardio
  { key: 'highKneeMarch', group: 'cardio', category: 'warmup', mode: 'time', motion: 'move', sets: 2, reps: 10, seconds: 45, rest: 30 },
  { key: 'buttKickMarch', group: 'cardio', category: 'warmup', mode: 'time', motion: 'move', sets: 2, reps: 10, seconds: 45, rest: 30 },

  // elastique / halteres / machine / etirements — voir CategoryId
  { key: 'bandPullApart', group: 'back', category: 'band', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'bandSquat', group: 'legs', category: 'band', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'dumbbellGobletSquat', group: 'legs', category: 'dumbbell', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'dumbbellRow', group: 'back', category: 'dumbbell', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'legPressMachine', group: 'legs', category: 'machine', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'latPulldownMachine', group: 'back', category: 'machine', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'hamstringStretch', group: 'legs', category: 'stretching', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 30, rest: 20 },
  { key: 'chestDoorwayStretch', group: 'push', category: 'stretching', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 30, rest: 20 },

  // poids du corps : comble le trou epaules, et pose les cibles de
  // progression que quatre fiches nommaient deja sans qu'elles existent
  { key: 'squat', group: 'legs', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 90 },
  { key: 'pushup', group: 'push', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 8, seconds: 30, rest: 90 },
  { key: 'pikePushup', group: 'shoulders', category: 'bodyweight', mode: 'reps', motion: 'move', sets: 3, reps: 8, seconds: 30, rest: 90 },
  { key: 'mountainClimber', group: 'cardio', category: 'bodyweight', mode: 'time', motion: 'move', sets: 3, reps: 10, seconds: 40, rest: 45 },

  // echauffement : le bas du corps n'en avait aucun
  { key: 'legSwing', group: 'legs', category: 'warmup', mode: 'time', motion: 'move', sets: 2, reps: 10, seconds: 30, rest: 20 },
  { key: 'torsoTwist', group: 'core', category: 'warmup', mode: 'time', motion: 'move', sets: 2, reps: 10, seconds: 30, rest: 20 },

  // etirements : meme palier que catCow (tenue passive, repos court)
  { key: 'quadStretch', group: 'legs', category: 'stretching', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 30, rest: 20 },
  { key: 'gluteStretch', group: 'glutes', category: 'stretching', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 30, rest: 20 },
  { key: 'calfStretch', group: 'calves', category: 'stretching', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 30, rest: 20 },
  { key: 'childPose', group: 'back', category: 'stretching', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 30, rest: 20 },
  { key: 'tricepsStretch', group: 'arms', category: 'stretching', mode: 'time', motion: 'hold', sets: 3, reps: 10, seconds: 30, rest: 20 },

  // elastique
  { key: 'bandChestPress', group: 'push', category: 'band', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'bandLateralRaise', group: 'shoulders', category: 'band', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'bandLateralWalk', group: 'glutes', category: 'band', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 60 },
  { key: 'bandCurl', group: 'arms', category: 'band', mode: 'reps', motion: 'move', sets: 3, reps: 12, seconds: 30, rest: 60 },

  // halteres. Charniere de hanche -> glutes (RDL) ; flexion/extension de
  // genou -> legs. Regle ecrite ici pour qu'on ne la « corrige » pas plus tard.
  { key: 'dumbbellShoulderPress', group: 'shoulders', category: 'dumbbell', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'dumbbellFloorPress', group: 'push', category: 'dumbbell', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'dumbbellRomanianDeadlift', group: 'glutes', category: 'dumbbell', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'dumbbellCalfRaise', group: 'calves', category: 'dumbbell', mode: 'reps', motion: 'move', sets: 3, reps: 15, seconds: 30, rest: 60 },
  { key: 'dumbbellCurl', group: 'arms', category: 'dumbbell', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 60 },
  { key: 'dumbbellTricepsExtension', group: 'arms', category: 'dumbbell', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 60 },

  // machine. Les trois cardio suivent « Marche » : sets 1, rest 0 — c'est ce
  // qui fait qu'un bloc cardio se comporte correctement dans queue.ts.
  { key: 'chestPressMachine', group: 'push', category: 'machine', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'legCurlMachine', group: 'legs', category: 'machine', mode: 'reps', motion: 'move', sets: 3, reps: 10, seconds: 30, rest: 90 },
  { key: 'treadmill', group: 'cardio', category: 'machine', mode: 'time', motion: 'move', sets: 1, reps: 10, seconds: 1200, rest: 0 },
  { key: 'stationaryBike', group: 'cardio', category: 'machine', mode: 'time', motion: 'move', sets: 1, reps: 10, seconds: 1200, rest: 0 },
  { key: 'rowingMachine', group: 'cardio', category: 'machine', mode: 'time', motion: 'move', sets: 1, reps: 10, seconds: 900, rest: 0 },
];

/** Seance type proposee au tout premier lancement, avant toute sauvegarde. */
export const DEFAULT_ORDER: readonly LibraryEntry['key'][] = [
  'inclined',
  'chairsquat',
  'calf',
  'wallsit',
  'rotation',
  'deadbug',
  'plank',
];

/**
 * Reglages de depart d'un exercice saisi par l'utilisateur.
 *
 * `category` est exclu du type (pas juste omis en valeur) : un exercice
 * perso n'apparait jamais dans la grille de bibliotheque, donc jamais soumis
 * a son filtre, et `createCustom()` (`core/plan.ts`) fait un vrai spread de
 * cet objet dans l'`ExerciseItem` cree — lui donner une valeur ici la
 * copierait dans chaque exercice perso et la persisterait en localStorage,
 * ce que `CategoryId` (catalogue uniquement) interdit.
 *
 * `motion` est exclu pour exactement la meme raison, et le typecheck l'a
 * rappele des l'ajout du champ : il ne decrit que la figure a dessiner, un
 * exercice perso porte la figure generique, et le persister l'aurait fige dans
 * chaque ligne du deroule sans que rien ne le lise jamais.
 */
export const CUSTOM_DEFAULTS = {
  group: 'core',
  mode: 'reps',
  sets: 3,
  reps: 10,
  seconds: 30,
  rest: 90,
} satisfies Omit<LibraryEntry, 'key' | 'category' | 'motion'>;

export function findLibraryEntry(key: string): LibraryEntry | undefined {
  return LIBRARY.find((entry) => entry.key === key);
}

/** Vrai pour une cle de la bibliotheque : exclut donc `custom`. */
export function isLibraryKey(key: string): key is LibraryEntry['key'] {
  return findLibraryEntry(key) !== undefined;
}
