import type { CategoryId } from '../core/types';

/** Ordre d'affichage des puces de filtre dans la bibliotheque. */
export const CATEGORY_IDS: readonly CategoryId[] = [
  'warmup',
  'stretching',
  'bodyweight',
  'band',
  'dumbbell',
  'machine',
];

/**
 * Pas de palette dediee (contrairement a `groups.ts`) : la pastille coloree
 * de la carte de bibliotheque est deja prise par le groupe musculaire, une
 * deuxieme palette concurrente serait plus confuse qu'utile. La categorie
 * s'affiche en texte simple.
 */
export function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === 'string' && (CATEGORY_IDS as readonly string[]).includes(value);
}
