// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import type { ExerciseKey, Locale } from '../../core/types';
import { fr } from './fr';
import { en } from './en';
import { es } from './es';
import { de } from './de';
import { it } from './it';
import type { ExerciseDetail } from './fr';

export type { ExerciseDetail };

/**
 * Une entree par langue ayant du contenu long. Ajouter une langue : ecrire `exercise-details/<locale>.ts` sur
 * le meme modele que `fr.ts`, puis l'ajouter ici — rien d'autre a changer,
 * ni dans l'app (ui/exercise-info.ts), ni dans le generateur de pages
 * (scripts/build-exercise-pages.ts), tous deux lisent cette carte.
 */
export const DETAILS_BY_LOCALE: Partial<Record<Locale, Partial<Record<ExerciseKey, ExerciseDetail>>>> = {
  fr,
  en,
  es,
  de,
  it,
};

/**
 * Contenu detaille d'un exercice pour une langue donnee, avec repli sur le
 * francais si cette langue n'a pas encore ce contenu — meme logique que le
 * repli i18n (`i18n/index.ts`), appliquee a ce second registre.
 */
export function exerciseDetail(key: ExerciseKey, locale: Locale): ExerciseDetail | undefined {
  return DETAILS_BY_LOCALE[locale]?.[key] ?? DETAILS_BY_LOCALE.fr?.[key];
}
