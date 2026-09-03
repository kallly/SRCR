import type { Locale } from '../core/types';
import { fr } from './locales/fr';
import { en } from './locales/en';
import { es } from './locales/es';
import { de } from './locales/de';
import { it } from './locales/it';

/**
 * Une entree pluralisee. Les categories disponibles dependent de la langue :
 * `other` est la seule obligatoire, elle sert de repli quand la categorie
 * choisie par `Intl.PluralRules` n'est pas fournie.
 */
export interface PluralForms {
  readonly zero?: string;
  readonly one?: string;
  readonly two?: string;
  readonly few?: string;
  readonly many?: string;
  readonly other: string;
}

export type Dictionary = {
  readonly [key: string]: string | PluralForms | Dictionary;
};

/**
 * Meme structure de cles que le francais, mais des valeurs libres : une cle
 * absente ou en trop dans une traduction devient une erreur de compilation.
 * Les entrees pluralisees peuvent porter d'autres categories que le francais.
 */
type Mirror<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends PluralForms
      ? PluralForms
      : Mirror<T[K]>;
};

export type Translations = Mirror<typeof fr>;

type Leaf = string | PluralForms;

/** Tous les chemins pointes valides du dictionnaire, ex. `runner.setOf`. */
type Paths<T> = {
  [K in keyof T & string]: T[K] extends Leaf ? K : `${K}.${Paths<T[K]>}`;
}[keyof T & string];

export type TranslationKey = Paths<Translations>;

export type Params = Record<string, string | number>;

const DICTIONARIES: Record<Locale, Translations> = { fr, en, es, de, it };

/** Ordre du selecteur de langue. */
export const LOCALES: readonly Locale[] = ['fr', 'en', 'es', 'de', 'it'];

/** Noms des langues dans leur propre langue : jamais traduits. */
export const LOCALE_NAMES: Record<Locale, string> = {
  fr: 'Francais',
  en: 'English',
  es: 'Espanol',
  de: 'Deutsch',
  it: 'Italiano',
};

export const DEFAULT_LOCALE: Locale = 'fr';

let current: Locale = DEFAULT_LOCALE;
const listeners = new Set<() => void>();

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function getLocale(): Locale {
  return current;
}

/** Premiere langue preferee du navigateur qui figure dans LOCALES. */
export function detectLocale(): Locale {
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const base = tag.split('-')[0]?.toLowerCase();
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function setLocale(locale: Locale): void {
  current = locale;
  document.documentElement.lang = locale;
  document.title = t('app.title');
  for (const listener of listeners) listener();
}

/** S'abonner au changement de langue. Renvoie la fonction de desabonnement. */
export function onLocaleChange(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function isPluralForms(value: unknown): value is PluralForms {
  return typeof value === 'object' && value !== null && 'other' in value;
}

function lookup(dictionary: Translations, key: string): Leaf | undefined {
  let node: unknown = dictionary;
  for (const part of key.split('.')) {
    if (typeof node !== 'object' || node === null) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  if (typeof node === 'string' || isPluralForms(node)) return node;
  return undefined;
}

const pluralRules = new Map<Locale, Intl.PluralRules>();

function selectPlural(forms: PluralForms, count: number): string {
  let rules = pluralRules.get(current);
  if (!rules) {
    rules = new Intl.PluralRules(current);
    pluralRules.set(current, rules);
  }
  const category = rules.select(count);
  return forms[category] ?? forms.other;
}

function interpolate(template: string, params: Params | undefined): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name];
    return value === undefined ? match : String(value);
  });
}

/**
 * Traduit une cle dans la langue active.
 *
 * Les valeurs de `params` remplacent les jetons `{nom}`. Une entree
 * pluralisee choisit sa forme d'apres `params.count`.
 */
export function t(key: TranslationKey, params?: Params): string {
  const entry = lookup(DICTIONARIES[current], key) ?? lookup(fr as Translations, key);
  if (entry === undefined) return key;
  const count = typeof params?.count === 'number' ? params.count : 0;
  const template = typeof entry === 'string' ? entry : selectPlural(entry, count);
  return interpolate(template, params);
}

/** Date courte (« lun. 3 sept. ») dans la langue active. */
export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat(current, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(timestamp));
}
