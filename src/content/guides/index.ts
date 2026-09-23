// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import type { Locale } from '../../core/types';
import type { GuideKey, GuideSet } from './types';
import { fr } from './fr';
import { en } from './en';
import { es } from './es';
import { de } from './de';
import { it } from './it';

/**
 * Seule source de la carte langue -> guides, lue par le generateur de pages.
 * Meme regle que `DETAILS_BY_LOCALE` (`exercise-details/index.ts`) : ne jamais
 * la dupliquer ailleurs, c'est l'erreur que `public/sitemap.xml` avait deja
 * commise avant d'etre supprime.
 */
export const GUIDES_BY_LOCALE: Record<Locale, GuideSet> = { fr, en, es, de, it };

/** Ordre d'affichage, dans l'index des guides et au sitemap. */
export const GUIDE_KEYS: readonly GuideKey[] = [
  'setsAndReps',
  'fullBodyNoEquipment',
  'bandsVsDumbbells',
  'classicVsCircuit',
];

export type { Guide, GuideKey, GuideSet } from './types';
