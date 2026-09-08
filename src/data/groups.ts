import type { GroupId } from '../core/types';

export interface GroupNode {
  readonly id: GroupId;
  /** Vide pour une feuille. Un enfant n'en a jamais : l'arbre fait deux etages. */
  readonly children: readonly GroupId[];
}

/**
 * L'arbre des groupes musculaires, tel qu'il est propose dans les selecteurs.
 *
 * **Deux etages, et pas trois.** Au troisieme (pectoraux vs triceps,
 * quadriceps vs ischios), la classification cesse d'etre un arbre — le triceps
 * releve de la poussee ET du bras, l'avant-bras du tirage ET du bras — et
 * aucune application grand public n'y descend. C'est la limite du decoupage,
 * pas une simplification provisoire.
 *
 * **Un parent est une reponse legale**, pas un simple regroupement d'affichage.
 * C'est ce qui distingue cette liste d'une liste plate : « je travaille toute
 * la jambe » se dit `lower`, sans avoir a trancher entre cuisses, fessiers et
 * mollets. Le prix a payer est `groupsOverlap()` — deux groupes ne se comparent
 * plus par egalite.
 *
 * **Les ids sont figes.** Ils voyagent dans le `localStorage` et dans les liens
 * `?s=`, ou `core/share.ts` encode l'identifiant en clair et non son rang : en
 * renommer un casserait les liens deja partages. D'ou deux noms internes
 * trompeurs, conserves tels quels — `push` designe la poitrine (c'est un nom de
 * patron de mouvement, pas de muscle) et `legs` les seules cuisses. Ce que la
 * personne lit, ce sont les libelles i18n (`group.<id>`), qui disent juste.
 *
 * L'ordre suit les registres du milieu : haut du corps, tronc, jambes, puis les
 * deux entrees transverses que toutes les applications de suivi admettent dans
 * la meme liste sans qu'elles designent un muscle — cardio (une filiere) et
 * corps entier.
 */
export const GROUP_TREE: readonly GroupNode[] = [
  { id: 'upper', children: ['push', 'shoulders', 'back', 'arms'] },
  { id: 'core', children: [] },
  { id: 'lower', children: ['legs', 'glutes', 'calves'] },
  { id: 'cardio', children: [] },
  { id: 'fullbody', children: [] },
];

/** Ordre d'affichage a plat : chaque parent, suivi de ses enfants. */
export const GROUP_IDS: readonly GroupId[] = GROUP_TREE.flatMap((node) => [
  node.id,
  ...node.children,
]);

const GROUP_PARENT = new Map<GroupId, GroupId>(
  GROUP_TREE.flatMap((node) => node.children.map((child) => [child, node.id] as const)),
);

/** Le parent d'un groupe, `null` pour un parent ou une feuille isolee. */
export function groupParent(id: string): GroupId | null {
  return GROUP_PARENT.get(id as GroupId) ?? null;
}

/**
 * Deux groupes se recouvrent s'ils designent tout ou partie de la meme zone.
 *
 * C'est le comparateur du mode circuit (`core/queue.ts`) et du filtre de la
 * bibliotheque, et il remplace partout l'egalite : sans lui, le circuit
 * alternerait « jambes » et « mollets » en croyant changer de zone, et
 * enchainerait un squat puis un mollet debout sans pause. Le bug n'existait pas
 * tant que la liste etait plate — il nait avec les parents, il se corrige ici.
 *
 * Un seul niveau de remontee suffit, l'arbre faisant deux etages. Si un
 * troisieme apparaissait, c'est cette fonction qu'il faudrait rendre
 * recursive, et elle seule.
 */
export function groupsOverlap(a: string, b: string): boolean {
  return a === b || groupParent(a) === b || groupParent(b) === a;
}

/**
 * Les libelles vivent dans `i18n/locales/*` sous la cle `group.<id>`.
 *
 * Les trois entrees larges portent une teinte **desaturee** : la pastille dit
 * alors « une region » et non « un muscle precis », et un parent ne se confond
 * pas avec l'un de ses enfants pose juste a cote dans la meme liste.
 */
const GROUP_COLORS: Record<GroupId, string> = {
  upper: '#f0c9a0',
  push: '#ff9f45',
  shoulders: '#ff6f91',
  back: '#ffd27f',
  arms: '#5fd4e0',
  core: '#d7ff3f',
  lower: '#a0c0f0',
  legs: '#7fb2ff',
  glutes: '#ff7a5c',
  calves: '#b48cff',
  cardio: '#7fe0b0',
  fullbody: '#c9c4b4',
};

const FALLBACK_COLOR = '#a9b0a7';

export function groupColor(id: string): string {
  return GROUP_COLORS[id as GroupId] ?? FALLBACK_COLOR;
}

export function isGroupId(value: unknown): value is GroupId {
  return typeof value === 'string' && value in GROUP_COLORS;
}
