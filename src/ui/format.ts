import { t } from '../i18n';
import type { ExerciseItem } from '../core/types';

/** Chrono du lecteur : `m:ss`. */
export function clock(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}

/** Duree lisible : au-dela d'une minute, on arrondit aux minutes. */
export function humanDuration(seconds: number): string {
  return seconds >= 60
    ? t('duration.minutes', { count: Math.round(seconds / 60) })
    : t('duration.seconds', { count: seconds });
}

/**
 * Resume affiche sur les cartes de la bibliotheque (« 3 × 10 », « 20 min »).
 * Recalcule depuis les valeurs reelles, donc toujours en accord avec elles.
 */
export function effortSummary(item: {
  mode: ExerciseItem['mode'];
  sets: number;
  reps: number;
  seconds: number;
}): string {
  const effort = item.mode === 'time' ? humanDuration(item.seconds) : String(item.reps);
  return item.sets > 1 ? t('summary.sets', { sets: item.sets, effort }) : effort;
}
