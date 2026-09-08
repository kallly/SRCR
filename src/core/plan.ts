// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import { t } from '../i18n';
import { CUSTOM_DEFAULTS, findLibraryEntry, isLibraryKey } from '../data/library';
import { presetPlanId, type AnyPreset } from '../data/presets';
import type { TenantExercise } from '../data/tenants';
import type { ExerciseItem, GroupId, PlanItem, SavedPlan } from './types';

/**
 * Longueur maximale d'un nom saisi par l'utilisateur : nom d'exercice perso
 * comme nom de seance.
 *
 * Applique aux deux bouts, et il a longtemps manque au second. A la CREATION
 * ici, `maxlength` sur les champs (`index.html`, `ui/inline-input.ts`) ; a la
 * RELECTURE dans `parseItem()` et `parsePlanName()` (core/storage.ts), sans
 * quoi un lien `?s=` forge fait stocker puis afficher un nom de 200 000
 * caracteres — ce que `core/ai-plan.ts` plafonnait deja de son cote, pour le
 * seul format `?plan=`.
 */
export const MAX_NAME = 60;

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

/**
 * Cree une ligne pour un exercice saisi par l'utilisateur.
 *
 * `group` est REQUIS, alors qu'il pourrait retomber sur `CUSTOM_DEFAULTS` :
 * c'est desormais la seule occasion de le renseigner, la carte du deroule ne
 * propose plus de le changer. Un defaut silencieux serait donc une invitation
 * a oublier de le demander.
 *
 * L'ordre du spread compte : `CUSTOM_DEFAULTS` porte lui aussi un `group`, il
 * doit passer AVANT pour que celui-ci l'emporte.
 */
export function createCustom(name: string, group: GroupId): ExerciseItem {
  return {
    id: uid(),
    type: 'exercise',
    key: 'custom',
    customName: name.trim().slice(0, MAX_NAME),
    ...CUSTOM_DEFAULTS,
    group,
  };
}

/**
 * Cree une ligne a partir d'un exercice propre a une salle (`data/tenants.ts`).
 *
 * C'est une ligne PERSO — `key: 'custom'`, le nom stocke tel quel — et non une
 * cle de bibliotheque : le nom voyage donc avec la ligne, et la seance reste
 * lisible partout, y compris sur cirkali.fr ou cette salle n'existe pas. Rien a
 * migrer, rien a etendre dans le format de partage.
 *
 * Les reglages, eux, sont ceux de l'entree — un exercice de salle n'est pas un
 * exercice perso improvise, il a ses series et son repos comme un autre.
 */
export function createFromTenant(entry: TenantExercise): ExerciseItem {
  return {
    id: uid(),
    type: 'exercise',
    key: 'custom',
    customName: entry.name.trim().slice(0, MAX_NAME),
    group: entry.group,
    mode: entry.mode,
    sets: entry.sets,
    reps: entry.reps,
    seconds: entry.seconds,
    rest: entry.rest,
  };
}

/**
 * Nom affiche d'une seance CIRKALI, resolu dans la langue active — jamais
 * stocke, exactement comme `plans.unnamed` pour une seance sans nom. Il n'est
 * fige en texte qu'a l'instant ou la personne cree sa propre version du
 * modele (voir `presetToPlan()` et `ctx.adoptPreset()`, ui/app.ts).
 */
export function presetName(preset: AnyPreset): string {
  // Une seance de salle porte son nom en clair ; un modele CIRKALI le resout
  // dans la langue active. `'name' in preset` distingue les deux sans champ
  // marqueur a tenir a jour.
  return 'name' in preset ? preset.name : t(`presets.name.${preset.id}`);
}

/**
 * Materialise un modele en seance manipulable : les donnees sont dans
 * `data/presets.ts`, la construction ici — meme partage des roles que
 * `LIBRARY` / `createFromLibrary()`.
 *
 * Le resultat n'est PAS ajoute a `state.plans` : il vit en memoire le temps
 * qu'on regarde le modele (ui/app.ts). Chaque ligne repart des reglages de la
 * bibliotheque, que le modele ne fait que retoucher — une ligne dont
 * l'exercice a disparu de `LIBRARY` est simplement ignoree plutot que de
 * faire echouer tout le modele.
 */
export function presetToPlan(preset: AnyPreset): SavedPlan {
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
