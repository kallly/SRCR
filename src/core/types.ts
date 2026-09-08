/**
 * Groupes musculaires, dans l'ordre d'affichage des selecteurs.
 *
 * Deux etages : `upper` et `lower` contiennent les groupes qui les suivent
 * (l'arbre est dans `data/groups.ts`), et sont des reponses legales a part
 * entiere — « toute la jambe » doit pouvoir se dire sans choisir entre
 * cuisses, fessiers et mollets. Consequence : deux groupes ne se comparent
 * pas par egalite mais par `groupsOverlap()`.
 */
export type GroupId =
  | 'upper'
  | 'push'
  | 'shoulders'
  | 'back'
  | 'arms'
  | 'core'
  | 'lower'
  | 'legs'
  | 'glutes'
  | 'calves'
  | 'cardio'
  | 'fullbody';

/**
 * Moment de la seance ou equipement requis, une seule valeur par exercice
 * (le moment prime sur l'equipement : un echauffement ou un etirement garde
 * cette etiquette meme s'il ne demande aucun materiel). Metadonnee de
 * catalogue uniquement (`LibraryEntry`) : jamais copiee dans un `PlanItem`
 * persiste, contrairement a `GroupId`.
 */
export type CategoryId =
  | 'warmup'
  | 'stretching'
  | 'bodyweight'
  | 'band'
  | 'dumbbell'
  | 'machine';

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
  | 'bandPullApart'
  | 'bandSquat'
  | 'dumbbellGobletSquat'
  | 'dumbbellRow'
  | 'legPressMachine'
  | 'latPulldownMachine'
  | 'hamstringStretch'
  | 'chestDoorwayStretch'
  | 'squat'
  | 'pushup'
  | 'pikePushup'
  | 'mountainClimber'
  | 'legSwing'
  | 'torsoTwist'
  | 'quadStretch'
  | 'gluteStretch'
  | 'calfStretch'
  | 'childPose'
  | 'tricepsStretch'
  | 'bandChestPress'
  | 'bandLateralRaise'
  | 'bandLateralWalk'
  | 'bandCurl'
  | 'dumbbellShoulderPress'
  | 'dumbbellFloorPress'
  | 'dumbbellRomanianDeadlift'
  | 'dumbbellCalfRaise'
  | 'dumbbellCurl'
  | 'dumbbellTricepsExtension'
  | 'chestPressMachine'
  | 'legCurlMachine'
  | 'treadmill'
  | 'stationaryBike'
  | 'rowingMachine'
  | 'custom';

/** Un effort se mesure soit en repetitions, soit en duree. */
export type EffortMode = 'reps' | 'time';

/**
 * Ce que la figure doit montrer : un geste qui se repete, ou une position que
 * l'on garde. `EffortMode` ne peut pas repondre a cette question — il range la
 * planche et le velo d'appartement dans la meme case `time`, alors que l'une se
 * tient immobile et l'autre pedale. C'est la seule chose qui distingue une
 * figure devant porter une fleche d'une figure qui n'en porte pas.
 */
export type MotionKind = 'move' | 'hold';

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
  /**
   * Charge en kilogrammes. ABSENT quand il n'y en a pas — c'est le cas de
   * l'immense majorite des lignes, et c'est ce qui rend l'ajout gratuit :
   * une seance au poids du corps ne gagne pas un octet en stockage ni un
   * caractere dans son lien de partage.
   *
   * Seul champ non entier du schema (les disques font 1,25 et 2,5 kg), d'ou
   * un parseur distinct de `positiveInt()` dans `core/storage.ts`.
   *
   * Ce que ce champ n'est PAS : un journal. Il decrit la seance prevue, au
   * meme titre que `reps`, jamais ce qui a reellement ete souleve serie par
   * serie — ce serait un carnet d'entrainement, donc une autre application.
   */
  weight?: number;
}

/**
 * Une pause posee dans le deroule, entre deux exercices.
 *
 * **Plus rien dans l'interface n'en cree** : le bouton « Ajouter une pause »
 * a ete retire, parce que le repos est deja porte par les exercices
 * eux-memes (`ExerciseItem.rest` en mode classique, `SessionConfig.pause` en
 * circuit) — deux endroits pour regler la meme duree, dont un que la seance
 * suivante ne se rappelait pas.
 *
 * Tout ce qui en LIT reste en place, et doit y rester : une seance
 * enregistree avant ce retrait, un lien `?s=` deja partage, un document
 * Firestore d'un autre appareil et un import `?plan=` en contiennent
 * encore. Les parseurs (`core/storage.ts`, `core/share.ts`,
 * `core/ai-plan.ts`), le moteur (`core/queue.ts`), la carte du deroule
 * (`ui/planner.ts`) et le lecteur savent tous les afficher et les jouer ; on
 * peut supprimer la ligne, plus en ajouter.
 */
export interface RestItem {
  id: string;
  type: 'rest';
  seconds: number;
}

export type PlanItem = ExerciseItem | RestItem;

/**
 * Reglages d'une seance. La langue n'y figure plus : elle est globale a
 * l'application (voir `core/storage.ts`), alors que mode/pause/transition
 * sont propres a chaque seance sauvegardee.
 */
export interface SessionConfig {
  mode: SessionMode;
  /** Duree de la pause imposee en mode circuit, en secondes. */
  pause: number;
  /** Transition entre deux exercices en mode circuit, en secondes. */
  trans: number;
}

/**
 * Une seance sauvegardee : son deroule et ses reglages, sous un nom.
 *
 * IMPORTANT : `name` ne contient jamais de texte traduit, seulement du texte
 * saisi par l'utilisateur (meme statut que `customName` sur `ExerciseItem`).
 * `null` signifie « pas encore nommee » ; le libelle affiche dans ce cas
 * (« Seance sans nom ») est resolu a l'affichage, jamais stocke.
 */
export interface SavedPlan {
  id: string;
  name: string | null;
  items: PlanItem[];
  config: SessionConfig;
  /**
   * Derniere modification reelle du CONTENU (`name`/`items`/`config`), en ms
   * epoch. C'est l'arbitre de la fusion avec le nuage : entre deux versions
   * d'une meme seance, la plus recente gagne. Estampille automatiquement par
   * `saveState()` (core/storage.ts), jamais a la main depuis un module d'UI.
   */
  updatedAt: number;
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
