import type { ExerciseKey, SessionConfig } from '../core/types';

/**
 * Les seances toutes faites proposees par CIRKALI, en dur dans le bundle.
 *
 * Elles n'existent NI dans le localStorage NI dans le nuage : elles sont
 * reconstruites a chaque chargement depuis ce fichier. C'est ce qui les rend
 * inalterables (rien a renommer ni a supprimer, il n'y a rien d'ecrit) et ce
 * qui permet d'en corriger une pour tout le monde d'une version a l'autre.
 * Une seance CIRKALI n'entre dans les donnees de la personne qu'au moment ou
 * elle en cree sa propre version (`ctx.adoptPreset()`, ui/app.ts), ce qui la
 * transforme en `SavedPlan` ordinaire.
 *
 * Aucun texte ici, comme dans `data/library.ts` : le nom affiche vit sous la
 * cle `presets.name.<id>` des cinq dictionnaires et se resout a l'affichage
 * (`presetName()`, core/plan.ts), ou vit aussi la materialisation en seance
 * manipulable — memes roles que `LIBRARY` ici / `createFromLibrary()` la-bas.
 */
export type PresetId =
  | 'fullBody'
  | 'beginner'
  | 'upperBody'
  | 'lowerBody'
  | 'core'
  | 'stretching';

/**
 * Une ligne d'un modele : une cle de bibliotheque, et seulement ce qui
 * s'ecarte des reglages par defaut de l'exercice. Ne pas recopier ici les
 * valeurs deja portees par `LIBRARY` — elles divergeraient au premier
 * ajustement fait la-bas.
 */
export interface PresetLine {
  key: Exclude<ExerciseKey, 'custom'>;
  sets?: number;
  reps?: number;
  seconds?: number;
  rest?: number;
}

export interface PresetPlan {
  id: PresetId;
  config: SessionConfig;
  items: readonly PresetLine[];
}

/**
 * Prefixe des ids de seance des modeles. Deux roles : distinguer un modele
 * d'une seance de l'utilisateur partout ou l'app ne manipule qu'un id
 * (`switchPlan`, `getPlan`), et garantir qu'aucun `uid()` — sept caracteres
 * de base 36, sans ponctuation — ne pourra jamais tomber dessus par hasard.
 */
const PRESET_PLAN_PREFIX = 'cirkali:';

/**
 * Le modele sur lequel s'ouvre une premiere visite.
 *
 * L'app ne cree plus de « seance type » a soi au premier lancement : elle
 * affiche celui-ci, et rien n'est ecrit tant que la personne n'y touche pas.
 * C'est ce qui permet a `state.plans` d'etre vide (voir core/storage.ts) et ce
 * qui a supprime toute la mecanique de reconnaissance des seances types
 * dupliquees d'un appareil a l'autre (cloud/merge.ts).
 *
 * Sans materiel et en circuit : le plus grand denominateur commun, et la
 * demonstration la plus parlante de ce que fait le lecteur.
 */
const FULL_BODY: PresetPlan = {
  id: 'fullBody',
  // Circuit : six groupes differents s'enchainent sans jamais se repeter,
  // c'est le cas ou le moteur (core/queue.ts) n'impose aucune pause.
  config: { mode: 'circuit', pause: 45, trans: 10 },
  items: [
    { key: 'squat', sets: 3, reps: 12 },
    { key: 'pushup', sets: 3, reps: 8 },
    { key: 'superman', sets: 3, reps: 10 },
    { key: 'gluteBridge', sets: 3, reps: 12 },
    { key: 'plank', sets: 3, seconds: 30 },
    { key: 'mountainClimber', sets: 3, seconds: 40 },
  ],
};

/** Alias parlant : c'est ce modele que l'app ouvre quand rien n'est enregistre. */
export const DEFAULT_PRESET = FULL_BODY;

export const PRESETS: readonly PresetPlan[] = [
  FULL_BODY,
  {
    id: 'beginner',
    config: { mode: 'classic', pause: 60, trans: 0 },
    items: [
      { key: 'armCircles', sets: 2, seconds: 30, rest: 20 },
      { key: 'wallPushup', sets: 3, reps: 10, rest: 60 },
      { key: 'chairsquat', sets: 3, reps: 10, rest: 60 },
      { key: 'gluteBridge', sets: 3, reps: 12, rest: 60 },
      { key: 'deadbug', sets: 3, reps: 8, rest: 60 },
      { key: 'childPose', sets: 2, seconds: 30, rest: 15 },
    ],
  },
  {
    id: 'upperBody',
    config: { mode: 'classic', pause: 60, trans: 0 },
    items: [
      { key: 'armCircles', sets: 2, seconds: 30, rest: 20 },
      { key: 'pushup', sets: 4, reps: 8, rest: 90 },
      { key: 'reverseSnowAngel', sets: 3, reps: 10, rest: 60 },
      { key: 'pikePushup', sets: 3, reps: 8, rest: 90 },
      { key: 'chairDips', sets: 3, reps: 8, rest: 90 },
      { key: 'chestDoorwayStretch', sets: 2, seconds: 30, rest: 15 },
    ],
  },
  {
    id: 'lowerBody',
    config: { mode: 'classic', pause: 60, trans: 0 },
    items: [
      { key: 'legSwing', sets: 2, seconds: 30, rest: 20 },
      { key: 'squat', sets: 4, reps: 12, rest: 90 },
      { key: 'reverseLunge', sets: 3, reps: 10, rest: 90 },
      { key: 'gluteBridge', sets: 3, reps: 15, rest: 60 },
      { key: 'hipAbduction', sets: 3, reps: 12, rest: 60 },
      { key: 'calf', sets: 3, reps: 15, rest: 45 },
      { key: 'hamstringStretch', sets: 2, seconds: 30, rest: 15 },
    ],
  },
  {
    id: 'core',
    // Le gainage revient au meme groupe d'une ligne a l'autre : le circuit y
    // impose donc sa pause (45 s ici) presque a chaque fois — c'est
    // exactement le rythme attendu d'un enchainement de gainage.
    config: { mode: 'circuit', pause: 45, trans: 5 },
    items: [
      { key: 'plank', sets: 3, seconds: 30 },
      { key: 'birdDog', sets: 3, reps: 8 },
      { key: 'sidePlank', sets: 3, seconds: 20 },
      { key: 'deadbug', sets: 3, reps: 10 },
    ],
  },
  {
    id: 'stretching',
    config: { mode: 'classic', pause: 60, trans: 0 },
    items: [
      { key: 'catCow', sets: 2, seconds: 30, rest: 15 },
      { key: 'childPose', sets: 2, seconds: 30, rest: 15 },
      { key: 'hamstringStretch', sets: 2, seconds: 30, rest: 15 },
      { key: 'quadStretch', sets: 2, seconds: 30, rest: 15 },
      { key: 'gluteStretch', sets: 2, seconds: 30, rest: 15 },
      { key: 'calfStretch', sets: 2, seconds: 30, rest: 15 },
      { key: 'tricepsStretch', sets: 2, seconds: 30, rest: 15 },
      { key: 'chestDoorwayStretch', sets: 2, seconds: 30, rest: 15 },
    ],
  },
];

/** Id de seance porte par un modele une fois materialise (core/plan.ts). */
export function presetPlanId(preset: PresetPlan): string {
  return PRESET_PLAN_PREFIX + preset.id;
}

/**
 * Le modele designe par un id de seance, s'il y en a un. C'est le test a
 * utiliser partout ou l'app recoit un id sans savoir d'ou il vient (selecteur
 * de seance, `getPlan()`) — jamais une comparaison de nom.
 */
export function findPresetByPlanId(planId: string): PresetPlan | undefined {
  if (!planId.startsWith(PRESET_PLAN_PREFIX)) return undefined;
  const id = planId.slice(PRESET_PLAN_PREFIX.length);
  return PRESETS.find((preset) => preset.id === id);
}
