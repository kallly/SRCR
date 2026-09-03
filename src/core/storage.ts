import { DEFAULT_LOCALE, isLocale } from '../i18n';
import { isGroupId } from '../data/groups';
import { isLibraryKey } from '../data/library';
import { defaultPlan, uid } from './plan';
import type { Config, ExerciseItem, Locale, PlanItem, RestItem } from './types';

/**
 * Schema v4. La v3 (le monolithe) stockait le nom et le conseil traduits dans
 * chaque ligne, ce qui figeait la langue au moment de l'ajout ; la v4 ne garde
 * que la cle. Toute modification du schema impose de bumper ces cles et
 * d'ecrire la migration correspondante.
 */
const KEYS = {
  plan: 'seance.plan.v4',
  history: 'seance.history.v4',
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
  plan: PlanItem[];
  history: number[];
  config: Config;
}

export const DEFAULT_CONFIG: Config = {
  mode: 'classic',
  pause: 60,
  trans: 0,
  locale: DEFAULT_LOCALE,
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
  const customName =
    typeof source['customName'] === 'string' ? source['customName'].trim() : legacyName;

  const group = isGroupId(source['group']) ? source['group'] : 'core';
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

function parsePlan(raw: unknown): PlanItem[] | null {
  if (!Array.isArray(raw)) return null;
  return raw.map(parseItem).filter((item): item is PlanItem => item !== null);
}

function parseHistory(raw: unknown): number[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((entry): entry is number => typeof entry === 'number').slice(-MAX_HISTORY);
}

function parseConfig(raw: unknown, detected: Locale): Config {
  const source = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};
  const stored = source['locale'];
  return {
    mode: source['mode'] === 'circuit' ? 'circuit' : 'classic',
    pause: positiveInt(source['pause'], DEFAULT_CONFIG.pause),
    trans: positiveInt(source['trans'], DEFAULT_CONFIG.trans),
    // Pas de langue enregistree : premier lancement, on suit le navigateur.
    locale: isLocale(stored) ? stored : detected,
  };
}

/**
 * Charge l'etat, en se rabattant sur la v3 puis sur la seance type.
 * La v3 n'est jamais effacee : la v4 est ecrite a cote.
 */
export function loadState(detectedLocale: Locale): State {
  const rawPlan = readJson(KEYS.plan) ?? readJson(LEGACY_KEYS.plan);
  const rawHistory = readJson(KEYS.history) ?? readJson(LEGACY_KEYS.history);
  const rawConfig = readJson(KEYS.config) ?? readJson(LEGACY_KEYS.config);

  return {
    plan: parsePlan(rawPlan) ?? defaultPlan(),
    history: parseHistory(rawHistory),
    config: parseConfig(rawConfig, detectedLocale),
  };
}

/** Ecrit l'etat. Renvoie `false` si le stockage local est indisponible. */
export function saveState(state: State): boolean {
  try {
    localStorage.setItem(KEYS.plan, JSON.stringify(state.plan));
    localStorage.setItem(KEYS.history, JSON.stringify(state.history.slice(-MAX_HISTORY)));
    localStorage.setItem(KEYS.config, JSON.stringify(state.config));
    return true;
  } catch {
    return false;
  }
}
