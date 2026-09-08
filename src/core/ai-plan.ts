import { CUSTOM_DEFAULTS, LIBRARY } from '../data/library';
import { isGroupId } from '../data/groups';
import { MAX_NAME, isExercise } from './plan';
import { parsePlan, parseSessionConfig } from './storage';
import type { SharedPlan } from './share';
import type { SavedPlan } from './types';
import type { LibraryEntry } from '../data/library';

/**
 * Second format d'entree, en JSON lisible (`?plan=`), a cote du format dense
 * `?s=` de `core/share.ts`.
 *
 * A quoi il sert. Une seance peut etre ecrite par une intelligence
 * artificielle a qui on a donne l'URL du site (voir la section « Creer une
 * seance par lien » d'index.html et la page de spec generee). Le format
 * canonique annonce a ces modeles reste `?s=` — c'est celui que l'app produit
 * elle-meme, donc le seul aller-retour sans perte. Mais un modele encode le
 * base64 « a la main », avec des erreurs de caracteres qu'aucun humain ne peut
 * relire : ce module est le filet. Quand le base64 sort faux, il reste une
 * voie qui marche, et l'utilisateur peut demander a l'IA de reformuler en
 * JSON plutot que de rester bloque sur un lien opaque.
 *
 * Ce que ce module ne fait PAS : entrer dans un QR code. La densite de `?s=`
 * est sa raison d'etre (voir CLAUDE.md) et un JSON en clair y est l'exact
 * oppose. `ui/share.ts` n'encode jamais que `?s=` en QR.
 *
 * Il ne valide rien lui-meme non plus : il reconstruit la forme
 * `{ type, key, ... }` attendue par `parsePlan()` (core/storage.ts) et lui
 * laisse la validation, exactement comme `decodeItem()` le fait pour `?s=`.
 * Une seule validation tolerante pour les trois sources (localStorage, lien
 * partage, lien ecrit par une IA).
 */

/** Au-dela, ce n'est pas une seance : on refuse avant meme `JSON.parse`. */
const MAX_RAW = 8000;
/** Lignes retenues. Le surplus est ignore, pas rejete. */
const MAX_ITEMS = 60;

/**
 * `"30"` devient 30. `positiveInt()` (core/storage.ts) n'accepte QUE des
 * `number` et retomberait sur sa valeur par defaut : une IA ecrit pourtant
 * regulierement `"sets": "3"`. La coercition se fait ici, jamais en
 * relachant le parseur du schema persiste.
 */
function num(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function str(value: unknown, max: number): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : undefined;
}

/** Vue a clefs minuscules : une IA ecrit parfois `"Sets"` ou `"Items"`. */
function lower(raw: unknown): Record<string, unknown> | null {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return null;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) out[key.toLowerCase()] = value;
  return out;
}

/** Premiere clef renseignee parmi les alias donnes. */
function pick(source: Record<string, unknown>, ...names: string[]): unknown {
  for (const name of names) {
    const value = source[name];
    if (value !== undefined && value !== null) return value;
  }
  return undefined;
}

/**
 * `findLibraryEntry()` compare exactement ; une IA ecrit parfois
 * `kneepushup` ou `KneePushup`. Rapprochement sur la casse seulement :
 * jamais par nom traduit, ce qui ferait dependre l'import de la langue
 * active et casserait la propriete qui fait marcher `?s=` (un lien produit
 * en francais s'importe en italien).
 */
function libraryEntryLoose(value: string): LibraryEntry | undefined {
  const target = value.toLowerCase();
  return LIBRARY.find((entry) => entry.key.toLowerCase() === target);
}

function readMode(value: unknown): 'reps' | 'time' | undefined {
  const raw = str(value, 16)?.toLowerCase();
  if (raw === 'time' || raw === 'temps' || raw === 'seconds' || raw === 'duree') return 'time';
  if (raw === 'reps' || raw === 'repetitions' || raw === 'rep') return 'reps';
  return undefined;
}

/**
 * Reconstruit une ligne au format attendu par `parsePlan()`.
 *
 * Trois inferences font tout le travail de simplification cote IA :
 * - une clef inconnue devient un exercice perso PORTANT CE NOM, au lieu du
 *   `custom` anonyme que produirait `parseItem()` seul — le modele peut donc
 *   toujours ecrire `ex`, sans savoir ce que contient la bibliotheque ;
 * - le type d'effort se deduit du champ fourni (`reps` seul, `seconds` seul) ;
 * - tout champ absent reprend le defaut de la bibliotheque.
 *
 * `rest` est ambigu et se tranche ici, une fois pour toutes : une ligne SANS
 * nom d'exercice est une pause dont `rest` donne la duree ; sur une ligne
 * d'exercice, c'est le repos entre series.
 */
function adaptItem(raw: unknown): Record<string, unknown> | null {
  const source = lower(raw);
  if (!source) return null;

  const type = str(source['type'], 16)?.toLowerCase();
  const key = str(pick(source, 'ex', 'exercise', 'exercice', 'key', 'cle'), MAX_NAME);
  const custom = str(
    pick(source, 'custom', 'customname', 'nom', 'name', 'title', 'titre'),
    MAX_NAME,
  );
  const label = key ?? custom;

  // La pause n'est plus proposee nulle part — ni bouton dans l'app, ni ligne
  // dans la specification `?plan=` livree aux IA (voir `RestItem`,
  // core/types.ts). On continue de l'accepter en entree : un lien redige
  // avant ce retrait, ou par un modele qui a garde l'ancienne page en
  // memoire, doit s'importer sans perdre de ligne.
  if (!label || type === 'rest' || type === 'pause') {
    const seconds = num(pick(source, 'rest', 'pause', 'seconds', 'duration', 'duree'));
    return seconds === undefined ? null : { type: 'rest', seconds };
  }

  const entry = key ? libraryEntryLoose(key) : undefined;
  const base = entry ?? CUSTOM_DEFAULTS;

  const reps = num(pick(source, 'reps', 'repetitions', 'rep'));
  const seconds = num(pick(source, 'seconds', 'duration', 'duree', 'time', 'secs'));
  const mode =
    readMode(pick(source, 'mode', 'effort', 'unit', 'unite')) ??
    (seconds !== undefined && reps === undefined
      ? 'time'
      : reps !== undefined && seconds === undefined
        ? 'reps'
        : base.mode);

  const group = str(pick(source, 'group', 'groupe', 'muscle'), 16)?.toLowerCase();

  return {
    type: 'exercise',
    key: entry ? entry.key : 'custom',
    // `parseItem()` ne garde `customName` que pour une clef inconnue de la
    // bibliotheque : inutile de le transmettre pour un exercice connu.
    customName: entry ? undefined : label,
    group: isGroupId(group) ? group : base.group,
    mode,
    sets: num(pick(source, 'sets', 'series', 'serie')) ?? base.sets,
    reps: reps ?? base.reps,
    seconds: seconds ?? base.seconds,
    rest: num(pick(source, 'rest', 'repos', 'restseconds')) ?? base.rest,
    // Pas de defaut : une charge absente reste absente, la bibliotheque n'en
    // propose aucune (elle depend de la personne, pas de l'exercice).
    // `parseItem()` jette une valeur nulle ou negative, donc un modele qui
    // ecrit `"weight": 0` pour dire « au poids du corps » se comprend seul.
    weight: num(pick(source, 'weight', 'poids', 'charge', 'load', 'kg')),
  };
}

/**
 * Un client de messagerie ou de chat percent-encode parfois une URL deja
 * encodee par le modele. `URLSearchParams.get()` en a defait un niveau ;
 * on tente le second ici plutot que d'echouer sur un lien recuperable.
 */
function parseLoose(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    /* seconde tentative ci-dessous */
  }
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return undefined;
  }
}

/**
 * Decode une seance ecrite en JSON lisible. Ne leve jamais : ce texte vient
 * d'un tiers (une IA, une URL retouchee a la main, un lien tronque), donc
 * aussi peu fiable qu'une valeur lue en localStorage. Meme refus que
 * `decodeSharedPlan()` : un payload sans le moindre exercice n'est pas une
 * seance importable.
 */
export function decodeAiPlan(encoded: string): SharedPlan | null {
  const raw = encoded.trim();
  if (!raw || raw.length > MAX_RAW) return null;

  const parsed = parseLoose(raw);
  if (parsed === undefined) return null;

  // Tableau nu accepte : une IA omet parfois l'enveloppe et ne renvoie que
  // la liste des exercices.
  const root = Array.isArray(parsed) ? { items: parsed } : lower(parsed);
  if (!root) return null;

  const rawItems = pick(root, 'items', 'exercises', 'exercices', 'plan', 'lines');
  if (!Array.isArray(rawItems)) return null;

  const items = parsePlan(
    rawItems
      .slice(0, MAX_ITEMS)
      .map(adaptItem)
      .filter((item): item is Record<string, unknown> => item !== null),
  );
  if (!items || !items.some(isExercise)) return null;

  const mode = str(pick(root, 'mode', 'sessionmode'), 16)?.toLowerCase();
  const config = parseSessionConfig({
    mode: mode === 'circuit' ? 'circuit' : 'classic',
    pause: num(pick(root, 'pause', 'restbetween')),
    trans: num(pick(root, 'trans', 'transition')),
  });

  return {
    name: str(pick(root, 'name', 'nom', 'title', 'titre'), MAX_NAME) ?? null,
    items,
    config,
  };
}

/**
 * Forme lisible d'une seance existante. Sert a l'outil WebMCP
 * `get_active_session` (ui/webmcp.ts) : un agent qui doit MODIFIER une seance
 * a besoin de la lire, et lui rendre le base64 de `?s=` l'obligerait a le
 * decoder — precisement ce qu'il fait mal.
 *
 * Le format se referme sur lui-meme : un exercice perso repart sous son nom
 * dans `ex`, et `adaptItem()` le retransforme en perso portant ce nom.
 */
export function encodeAiPlan(plan: SavedPlan): unknown {
  return {
    name: plan.name,
    mode: plan.config.mode,
    pause: plan.config.pause,
    trans: plan.config.trans,
    items: plan.items.map((item) =>
      item.type === 'rest'
        ? { rest: item.seconds }
        : {
            ex: item.key === 'custom' ? (item.customName ?? 'custom') : item.key,
            group: item.group,
            mode: item.mode,
            sets: item.sets,
            ...(item.mode === 'time' ? { seconds: item.seconds } : { reps: item.reps }),
            rest: item.rest,
            ...(item.weight === undefined ? {} : { weight: item.weight }),
          },
    ),
  };
}
