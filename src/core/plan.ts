import { t } from '../i18n';
import { CUSTOM_DEFAULTS, DEFAULT_ORDER, findLibraryEntry, isLibraryKey } from '../data/library';
import { presetPlanId, type PresetPlan } from '../data/presets';
import type { ExerciseItem, PlanItem, RestItem, SavedPlan } from './types';

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

/** Seance type proposee au tout premier lancement (core/storage.ts). */
export function defaultPlan(): PlanItem[] {
  return DEFAULT_ORDER.map(createFromLibrary).filter(
    (item): item is ExerciseItem => item !== null,
  );
}

/**
 * Nom affiche d'une seance CIRKALI, resolu dans la langue active — jamais
 * stocke, exactement comme `plans.unnamed` pour une seance sans nom. Il n'est
 * fige en texte qu'a l'instant ou la personne cree sa propre version du
 * modele (voir `presetToPlan()` et `ctx.adoptPreset()`, ui/app.ts).
 */
export function presetName(preset: PresetPlan): string {
  return t(`presets.name.${preset.id}`);
}

/**
 * Materialise un modele en seance manipulable. Meme partage des roles que
 * `defaultPlan()` juste au-dessus : les donnees sont dans `data/presets.ts`,
 * la construction ici.
 *
 * Le resultat n'est PAS ajoute a `state.plans` : il vit en memoire le temps
 * qu'on regarde le modele (ui/app.ts). Chaque ligne repart des reglages de la
 * bibliotheque, que le modele ne fait que retoucher — une ligne dont
 * l'exercice a disparu de `LIBRARY` est simplement ignoree plutot que de
 * faire echouer tout le modele.
 */
export function presetToPlan(preset: PresetPlan): SavedPlan {
  const items = preset.items
    .map((line) => {
      const item = createFromLibrary(line.key);
      if (!item) return null;
      if (line.sets !== undefined) item.sets = line.sets;
      if (line.reps !== undefined) item.reps = line.reps;
      if (line.seconds !== undefined) item.seconds = line.seconds;
      if (line.rest !== undefined) item.rest = line.rest;
      return item;
    })
    .filter((item): item is ExerciseItem => item !== null);

  return {
    id: presetPlanId(preset),
    name: presetName(preset),
    items,
    // Copie, jamais la reference : le mode d'une seance se change depuis
    // l'interface, et muter le singleton de `PRESETS` contaminerait le modele
    // pour le reste de la session (meme piege que DEFAULT_SESSION_CONFIG).
    config: { ...preset.config },
    // Sans objet pour un modele, qui n'est jamais persiste ni fusionne : la
    // vraie estampille est posee par `saveState()` le jour ou cette seance
    // devient celle de la personne.
    updatedAt: 0,
  };
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
