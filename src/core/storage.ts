import { isLocale } from '../i18n';
import { isGroupId } from '../data/groups';
import { findLibraryEntry, isLibraryKey } from '../data/library';
import { defaultPlan, uid } from './plan';
import type { ExerciseItem, Locale, PlanItem, RestItem, SavedPlan, SessionConfig } from './types';

/**
 * Schema v5 : plusieurs seances sauvegardees (`SavedPlan`), au lieu d'un seul
 * plan. La v4 (un plan + une config qui melangeait reglages et langue)
 * n'est jamais effacee : elle sert de migration, et la v5 est ecrite a cote.
 * Voir CLAUDE.md, section « Modifier le schema persiste impose une migration ».
 */
const KEYS = {
  plans: 'seance.plans.v5',
  activePlanId: 'seance.active.v5',
  locale: 'seance.locale.v5',
  history: 'seance.history.v4',
} as const;

/** v4 : un seul plan + une config portant aussi la langue. */
const V4_KEYS = {
  plan: 'seance.plan.v4',
  config: 'seance.cfg.v4',
} as const;

const LEGACY_KEYS = {
  plan: 'seance.plan.v3',
  history: 'seance.history.v3',
  config: 'seance.cfg.v3',
} as const;

/** Au-dela, les plus anciennes seances sont oubliees. */
const MAX_HISTORY = 200;

export interface State {
  plans: SavedPlan[];
  activePlanId: string;
  history: number[];
}

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  mode: 'classic',
  pause: 60,
  trans: 0,
};

function readJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function positiveInt(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : fallback;
}

/**
 * Degrade une cle inconnue en nom lisible plutot que de perdre toute
 * information : "moulinets-de-bras" -> "Moulinets de bras".
 *
 * Piege verifie : une IA a qui on donne l'URL du site lit parfois la page en
 * extraction de texte, sans les attributs HTML (`data-key`) — elle ne voit
 * alors que les URL des fiches d'exercice et y puise le SLUG de la fiche
 * (`chat-vache`) au lieu de la cle interne attendue (`catCow`). Sans ce
 * filet, une telle ligne perdait tout nom et retombait sur le libelle
 * generique `exercise.custom.name` (« Exercice perso ») pour chaque
 * exercice de la seance, rendant le lien inutilisable une fois importe.
 */
function humanizeUnknownKey(key: string): string {
  const spaced = key.replace(/[-_]+/g, ' ').trim();
  return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : '';
}

/** Accepte aussi bien une ligne v4 qu'une ligne v3 (`type: 'ex'`, nom inline). */
function parseItem(raw: unknown): PlanItem | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const source = raw as Record<string, unknown>;
  const id = typeof source['id'] === 'string' ? source['id'] : uid();

  if (source['type'] === 'rest') {
    const item: RestItem = { id, type: 'rest', seconds: positiveInt(source['seconds'], 120) };
    return item;
  }
  if (source['type'] !== 'exercise' && source['type'] !== 'ex') return null;

  const rawKey = typeof source['key'] === 'string' ? source['key'] : 'custom';
  const known = isLibraryKey(rawKey);
  // v3 : le nom etait recopie dans la ligne. On ne le garde que s'il ne peut
  // pas etre retrouve depuis la bibliotheque, c'est-a-dire pour un perso.
  const legacyName = typeof source['name'] === 'string' ? source['name'].trim() : '';
  const providedName =
    typeof source['customName'] === 'string' ? source['customName'].trim() : legacyName;
  // `rawKey === 'custom'` est le sentinel legitime (aucun nom a en deduire) ;
  // toute AUTRE cle inconnue est vraisemblablement une cle mal formee — voir
  // humanizeUnknownKey().
  const customName =
    providedName || (!known && rawKey !== 'custom' ? humanizeUnknownKey(rawKey) : '');

  // Pour une cle connue, le groupe est intrinseque a l'exercice (LIBRARY),
  // jamais une valeur a faire confiance depuis le payload : c'est deja
  // l'invariant que l'UI applique (ui/planner.ts masque le selecteur de
  // groupe pour tout exercice de la bibliotheque — seul un perso l'expose).
  // Piege verifie : une IA a devine un groupe absent de nos identifiants
  // (« pull », usuel en musculation mais inexistant ici) pour des exercices
  // par ailleurs correctement reconnus (wallSlides, superman, rotation) ;
  // sans ce garde-fou, `isGroupId('pull')` est faux et le groupe retombait
  // sur 'core' au lieu du vrai groupe de l'exercice (epaules, dos...).
  const group = known
    ? (findLibraryEntry(rawKey)?.group ?? 'core')
    : isGroupId(source['group'])
      ? source['group']
      : 'core';
  const mode = source['mode'] === 'time' ? 'time' : 'reps';

  const item: ExerciseItem = {
    id,
    type: 'exercise',
    key: known ? rawKey : 'custom',
    group,
    mode,
    sets: Math.max(1, positiveInt(source['sets'], 3)),
    reps: Math.max(1, positiveInt(source['reps'], 10)),
    seconds: Math.max(1, positiveInt(source['seconds'], 30)),
    rest: positiveInt(source['rest'], 90),
  };
  if (!known && customName) item.customName = customName;
  return item;
}

export function parsePlan(raw: unknown): PlanItem[] | null {
  if (!Array.isArray(raw)) return null;
  const items = raw.map(parseItem).filter((item): item is PlanItem => item !== null);

  // Un id duplique (donnee corrompue, ou lien de partage manipule a la
  // main) ferait pointer suppression/edition d'une ligne sur la mauvaise :
  // regenere un id frais pour tout doublon rencontre.
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) item.id = uid();
    seen.add(item.id);
  }
  return items;
}

function parseHistory(raw: unknown): number[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((entry): entry is number => typeof entry === 'number').slice(-MAX_HISTORY);
}

export function parseSessionConfig(raw: unknown): SessionConfig {
  const source = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};
  return {
    mode: source['mode'] === 'circuit' ? 'circuit' : 'classic',
    pause: positiveInt(source['pause'], DEFAULT_SESSION_CONFIG.pause),
    trans: positiveInt(source['trans'], DEFAULT_SESSION_CONFIG.trans),
  };
}

/** Jamais de texte traduit : une chaine vide ou absente devient `null`. */
function parsePlanName(raw: unknown): string | null {
  return typeof raw === 'string' && raw.trim() ? raw : null;
}

function parsePlanEntry(raw: unknown): SavedPlan | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const source = raw as Record<string, unknown>;
  return {
    id: typeof source['id'] === 'string' ? source['id'] : uid(),
    name: parsePlanName(source['name']),
    items: parsePlan(source['items']) ?? [],
    config: parseSessionConfig(source['config']),
  };
}

function parsePlansList(raw: unknown): SavedPlan[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const plans = raw.map(parsePlanEntry).filter((entry): entry is SavedPlan => entry !== null);
  return plans.length > 0 ? plans : null;
}

/** Enveloppe l'ancien schema v4 (retombant lui-meme sur la v3) en une seule seance. */
function migrateFromV4(): SavedPlan | null {
  const rawPlan = readJson(V4_KEYS.plan) ?? readJson(LEGACY_KEYS.plan);
  const rawConfig = readJson(V4_KEYS.config) ?? readJson(LEGACY_KEYS.config);
  if (rawPlan === undefined && rawConfig === undefined) return null;
  return {
    id: uid(),
    name: null,
    items: parsePlan(rawPlan) ?? defaultPlan(),
    config: parseSessionConfig(rawConfig),
  };
}

function legacyLocale(): unknown {
  const rawConfig = readJson(V4_KEYS.config) ?? readJson(LEGACY_KEYS.config);
  return typeof rawConfig === 'object' && rawConfig !== null
    ? (rawConfig as Record<string, unknown>)['locale']
    : undefined;
}

/**
 * Langue active, independante de toute seance. Se rabat sur l'ancienne
 * config v4/v3 (ou elle vivait) pour que le choix d'un utilisateur existant
 * survive a la migration, puis sur la langue detectee du navigateur.
 */
export function loadLocale(detected: Locale): Locale {
  const stored = readJson(KEYS.locale);
  if (isLocale(stored)) return stored;
  const legacy = legacyLocale();
  return isLocale(legacy) ? legacy : detected;
}

/** Ecrit la langue. Best-effort : rien a faire si le stockage local manque. */
export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(KEYS.locale, JSON.stringify(locale));
  } catch {
    // Sauvegarde best-effort.
  }
}

/**
 * Charge l'etat, en se rabattant sur la migration v4 puis sur la seance
 * type. Les anciennes cles ne sont jamais effacees : la v5 est ecrite a cote.
 */
export function loadState(): State {
  const plans =
    parsePlansList(readJson(KEYS.plans)) ??
    (() => {
      const migrated = migrateFromV4();
      return [
        migrated ?? {
          id: uid(),
          name: null,
          items: defaultPlan(),
          // Copie, jamais la reference : sinon muter le mode d'une session
          // (ctx.activePlan().config.mode = ...) mute ce singleton partage,
          // et toute session creee ensuite via createPlan() en herite.
          config: { ...DEFAULT_SESSION_CONFIG },
        },
      ];
    })();

  // Invariant preserve partout dans l'app : il y a toujours au moins une
  // seance, meme fraichement creee ci-dessus si tout le reste a echoue.
  const firstPlan = plans[0] as SavedPlan;
  const rawActiveId = readJson(KEYS.activePlanId);
  const activePlanId =
    typeof rawActiveId === 'string' && plans.some((plan) => plan.id === rawActiveId)
      ? rawActiveId
      : firstPlan.id;

  return {
    plans,
    activePlanId,
    history: parseHistory(readJson(KEYS.history) ?? readJson(LEGACY_KEYS.history)),
  };
}

/** Ecrit l'etat. Renvoie `false` si le stockage local est indisponible. */
export function saveState(state: State): boolean {
  try {
    localStorage.setItem(KEYS.plans, JSON.stringify(state.plans));
    localStorage.setItem(KEYS.activePlanId, JSON.stringify(state.activePlanId));
    localStorage.setItem(KEYS.history, JSON.stringify(state.history.slice(-MAX_HISTORY)));
    return true;
  } catch {
    return false;
  }
}
