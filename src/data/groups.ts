import type { GroupId } from '../core/types';

/** Ordre d'affichage dans les selecteurs de groupe musculaire. */
export const GROUP_IDS: readonly GroupId[] = [
  'push',
  'shoulders',
  'back',
  'legs',
  'calves',
  'core',
  'cardio',
];

/** Les libelles vivent dans `i18n/locales/*` sous la cle `group.<id>`. */
const GROUP_COLORS: Record<GroupId, string> = {
  push: '#ff9f45',
  shoulders: '#ff6f91',
  back: '#ffd27f',
  legs: '#7fb2ff',
  calves: '#b48cff',
  core: '#d7ff3f',
  cardio: '#7fe0b0',
};

const FALLBACK_COLOR = '#a9b0a7';

export function groupColor(id: string): string {
  return GROUP_COLORS[id as GroupId] ?? FALLBACK_COLOR;
}

export function isGroupId(value: unknown): value is GroupId {
  return typeof value === 'string' && value in GROUP_COLORS;
}
