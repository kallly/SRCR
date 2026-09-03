/** Groupes musculaires, dans l'ordre d'affichage des selecteurs. */
export type GroupId =
  | 'push'
  | 'shoulders'
  | 'back'
  | 'legs'
  | 'glutes'
  | 'calves'
  | 'core'
  | 'cardio';

/** Cles de la bibliotheque. `custom` est reserve aux exercices saisis par l'utilisateur. */
export type ExerciseKey =
  | 'inclined'
  | 'chairsquat'
  | 'calf'
  | 'wallsit'
  | 'rotation'
  | 'deadbug'
  | 'plank'
  | 'walk'
  | 'kneePushup'
  | 'wallPushup'
  | 'chairDips'
  | 'armCircles'
  | 'wallSlides'
  | 'superman'
  | 'reverseSnowAngel'
  | 'birdDog'
  | 'catCow'
  | 'reverseLunge'
  | 'stepUp'
  | 'lateralLunge'
  | 'gluteBridge'
  | 'donkeyKick'
  | 'hipAbduction'
  | 'sidePlank'
  | 'standingKneeRaise'
  | 'crunch'
  | 'highKneeMarch'
  | 'buttKickMarch'
  | 'custom';

/** Un effort se mesure soit en repetitions, soit en duree. */
export type EffortMode = 'reps' | 'time';

/** Deux facons d'enchainer les series. */
export type SessionMode = 'classic' | 'circuit';

export type Locale = 'fr' | 'en' | 'es' | 'de' | 'it';

/**
 * Une ligne d'exercice du deroule.
 *
 * IMPORTANT : cet objet est persiste en localStorage et ne contient donc
 * AUCUN texte traduit. Le nom et le conseil sont resolus a l'affichage
 * depuis `key` (voir `core/plan.ts`). Seul `customName`, saisi par
 * l'utilisateur, est stocke tel quel.
 */
export interface ExerciseItem {
  id: string;
  type: 'exercise';
  key: ExerciseKey;
  /** Renseigne uniquement quand `key === 'custom'`. */
  customName?: string;
  group: GroupId;
  mode: EffortMode;
  sets: number;
  reps: number;
  seconds: number;
  /** Repos entre deux series du meme exercice, en mode classique. */
  rest: number;
}

/** Une pause inseree manuellement dans le deroule. */
export interface RestItem {
  id: string;
  type: 'rest';
  seconds: number;
}

export type PlanItem = ExerciseItem | RestItem;

/** Reglages de la seance. */
export interface Config {
  mode: SessionMode;
  /** Duree de la pause imposee en mode circuit, en secondes. */
  pause: number;
  /** Transition entre deux exercices en mode circuit, en secondes. */
  trans: number;
  locale: Locale;
}

/** Une serie a executer. */
export interface WorkStep {
  kind: 'work';
  item: ExerciseItem;
  /** Numero de la serie, a partir de 1. */
  set: number;
  sets: number;
}

/**
 * Pourquoi cette pause existe. Determine le libelle et la consigne affiches
 * pendant la seance, sans stocker de texte dans la file.
 */
export type RestReason =
  /** Pause ajoutee explicitement au deroule par l'utilisateur. */
  | 'manual'
  /** Repos entre deux series du meme exercice (mode classique). */
  | 'between-sets'
  /** Deux efforts du meme groupe se suivent : la pause est inevitable. */
  | 'forced'
  /** Court battement pour s'installer sur l'exercice suivant. */
  | 'transition';

export interface RestStep {
  kind: 'rest';
  reason: RestReason;
  seconds: number;
  /** Exercice qui suit la pause, quand il est connu. */
  next: ExerciseItem | null;
}

export type Step = WorkStep | RestStep;
