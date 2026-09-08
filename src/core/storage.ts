// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

import { isLocale } from '../i18n';
import { isGroupId } from '../data/groups';
import { findLibraryEntry, isLibraryKey } from '../data/library';
import { MAX_NAME, uid } from './plan';
import type { ExerciseItem, Locale, PlanItem, RestItem, SavedPlan, SessionConfig } from './types';

/**
 * Schema v6 : chaque `SavedPlan` porte un `updatedAt`, et l'etat garde une
 * liste d'ids supprimes (`deleted`). Ces deux ajouts n'existent que pour la
 * sauvegarde en ligne (src/cloud/) : sans eux, une fusion entre deux appareils
 * ne saurait ni quelle version d'une seance est la plus recente, ni distinguer
 * « supprimee ici » de « pas encore connue ici » — une seance supprimee sur le
 * telephone reviendrait du nuage a chaque synchronisation.
 *
 * La v5 n'est jamais effacee : elle sert de migration, et la v6 est ecrite a
 * cote (comme la v5 l'avait ete a cote de la v4, et la v4 de la v3).
 *
 * `locale` et `history` restent sur leur ancienne cle : leur forme n'a pas
 * change. Meme precedent que `history`, deja reste en v4 lors du passage a la
 * v5 — on ne bump que ce qui change de forme.
 *
 * Voir CLAUDE.md, section « Modifier le schema persiste impose une migration ».
 */
const KEYS = {
  plans: 'seance.plans.v6',
  activePlanId: 'seance.active.v6',
  deleted: 'seance.deleted.v6',
  locale: 'seance.locale.v5',
  history: 'seance.history.v4',
} as const;

/** v5 : plusieurs seances, mais sans horodatage ni suivi des suppressions. */
const V5_KEYS = {
  plans: 'seance.plans.v5',
  activePlanId: 'seance.active.v5',
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

/**
 * Plafonds des valeurs numeriques d'une ligne.
 *
 * Ce parseur lit QUATRE entrees non fiables — le stockage local, un lien
 * `?s=`, un lien `?plan=` et le document distant — et il ne les bornait que
 * par le bas (`Math.max(1, ...)`). C'etait exploitable, pas theorique : un
 * lien de 138 caracteres portant `sets: 1e9` faisait sauter l'onglet, parce
 * que `buildClassic()` construit une etape par serie et que la barre de
 * statut reconstruit la file a CHAQUE rendu. La seance ayant deja ete ecrite
 * en `localStorage` avant ce rendu, l'app regelait a chaque rechargement, sans
 * autre recours que vider les donnees du site.
 *
 * `sets` est donc le seul de ces trois plafonds qui protege la memoire ; les
 * deux autres ne bornent que des durees affichees, et sont la par uniformite —
 * une valeur venue de l'exterieur se borne aux deux bouts, sans exception a
 * retenir.
 *
 * Genereux devant les maxima de l'interface (10 series, 3600 s d'effort, 600 s
 * de repos) : ces bornes-ci disent « ce n'est plus une seance », pas « ce
 * n'est pas ce que le formulaire propose ». Un lien ecrit par une IA qui
 * demande 12 series doit s'importer tel quel, et non se faire rogner en
 * silence.
 */
export const MAX_SETS = 99;
export const MAX_REPS = 9_999;
export const MAX_SECONDS = 86_400;
/**
 * Charge, en kilogrammes. Meme esprit que les trois au-dessus : tres au-dela
 * de ce que l'interface propose (250 kg), assez bas pour qu'on ne puisse pas
 * loger un nombre absurde dans le champ le plus visible du lecteur.
 */
export const MAX_WEIGHT = 999;

/**
 * Lignes retenues d'un deroule. Tres au-dessus de ce qu'une seance reelle
 * contient (la bibliotheque n'a que 62 exercices) : ce plafond ne doit JAMAIS
 * tronquer la seance de quelqu'un au rechargement, il ne vise que le lien
 * forge — `?s=` acceptait 20 000 lignes, chacune rendue en carte.
 *
 * `core/ai-plan.ts` en a un autre, bien plus bas (60), qui n'est pas le meme
 * garde-fou : la, le surplus d'un modele bavard est ignore a l'import, ici on
 * refuse un deroule qui n'en est pas un.
 */
const MAX_ITEMS = 500;

/**
 * Duree de vie d'une pierre tombale. Passe ce delai, on suppose que tous les
 * appareils de la personne ont vu la suppression ; garder la liste indefiniment
 * la ferait grossir sans fin dans un stockage qui n'a que quelques Mo.
 *
 * Volontairement large (1 an, pas 90 jours) : purger cote LOCAL (loadState())
 * est sans risque — l'appareil qui purge sa propre pierre tombale a deja
 * applique la suppression, l'oublier ne la fait pas revenir chez lui. Mais un
 * appareil resté injoignable plus longtemps que ce delai reverrait alors une
 * seance que d'autres ont supprimee comme si elle n'avait jamais ete vue, et
 * la resusciterait pour tout le monde a sa prochaine synchronisation. Un an
 * de marge rend ce scenario negligeable sans faire grossir le stockage de
 * facon significative (quelques dizaines d'octets par pierre tombale).
 */
const TOMBSTONE_TTL_MS = 365 * 24 * 60 * 60 * 1000;

export interface State {
  plans: SavedPlan[];
  activePlanId: string;
  history: number[];
  /**
   * Seances supprimees : id -> ms epoch de la suppression. Sans cette trace,
   * la fusion avec le nuage ne pourrait pas faire la difference entre une
   * seance que cet appareil a supprimee et une qu'il n'a jamais recue.
   */
  deleted: Record<string, number>;
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

/**
 * `max` est facultatif parce qu'un des appelants n'en veut pas : `updatedAt`
 * est un horodatage, borner sa valeur n'aurait aucun sens. Partout ailleurs il
 * est fourni — voir MAX_SETS et ses voisins.
 */
function positiveInt(value: unknown, fallback: number, max?: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return fallback;
  const rounded = Math.round(value);
  return max === undefined ? rounded : Math.min(rounded, max);
}

/**
 * Charge en kg, ou `undefined` quand il n'y en a pas.
 *
 * Le seul champ du schema que `positiveInt()` ne peut pas lire : les disques
 * font 1,25 et 2,5 kg, et arrondir a l'entier rendrait le champ faux pour les
 * charges legeres — celles, precisement, ou le quart de kilo compte.
 *
 * Zero et negatif retombent sur `undefined` plutot que sur 0 : « aucune
 * charge » n'a qu'une seule ecriture dans le stockage, ce qui evite d'avoir a
 * traiter `weight: 0` comme un cas particulier a l'affichage, au partage et a
 * la fusion. C'est aussi ce qui fait que vider le champ dans la carte efface
 * la propriete au lieu d'y laisser un 0.
 */
function optionalWeight(value: unknown): number | undefined {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return undefined;
  return Math.min(MAX_WEIGHT, Math.round(value * 100) / 100);
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
    const item: RestItem = {
      id,
      type: 'rest',
      seconds: positiveInt(source['seconds'], 120, MAX_SECONDS),
    };
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
  // `.slice()` et pas seulement `.trim()` : le nom vient peut-etre d'un lien
  // `?s=`, ou rien ne le bornait (voir MAX_NAME, core/plan.ts).
  const customName = (
    providedName || (!known && rawKey !== 'custom' ? humanizeUnknownKey(rawKey) : '')
  ).slice(0, MAX_NAME);

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
    sets: Math.max(1, positiveInt(source['sets'], 3, MAX_SETS)),
    reps: Math.max(1, positiveInt(source['reps'], 10, MAX_REPS)),
    seconds: Math.max(1, positiveInt(source['seconds'], 30, MAX_SECONDS)),
    rest: positiveInt(source['rest'], 90, MAX_SECONDS),
  };
  if (!known && customName) item.customName = customName;
  // Affecte seulement si elle existe : `exactOptionalPropertyTypes` interdit
  // d'ecrire `undefined` dans une propriete facultative, et c'est tant mieux
  // — une ligne sans charge ne doit pas porter la clef du tout, sans quoi
  // chaque exercice au poids du corps la trainerait dans le stockage, dans le
  // document distant et dans le lien de partage.
  //
  // Aucun filtre sur la cle : ce parseur ne decide pas quels exercices ont le
  // droit d'etre charges (`data/library.ts` le declare, `ui/planner.ts`
  // l'affiche). Une charge sur une ligne qui n'en attend pas est conservee
  // telle quelle plutot que jetee en silence — meme regle que partout ici, on
  // borne, on ne censure pas.
  const weight = optionalWeight(source['weight']);
  if (weight !== undefined) item.weight = weight;
  return item;
}

export function parsePlan(raw: unknown): PlanItem[] | null {
  if (!Array.isArray(raw)) return null;
  const items = raw
    .slice(0, MAX_ITEMS)
    .map(parseItem)
    .filter((item): item is PlanItem => item !== null);

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

export function parseHistory(raw: unknown): number[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((entry): entry is number => typeof entry === 'number').slice(-MAX_HISTORY);
}

export function parseSessionConfig(raw: unknown): SessionConfig {
  const source = typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {};
  return {
    mode: source['mode'] === 'circuit' ? 'circuit' : 'classic',
    pause: positiveInt(source['pause'], DEFAULT_SESSION_CONFIG.pause, MAX_SECONDS),
    trans: positiveInt(source['trans'], DEFAULT_SESSION_CONFIG.trans, MAX_SECONDS),
  };
}

/**
 * Jamais de texte traduit : une chaine vide ou absente devient `null`.
 *
 * Exporte pour `core/share.ts`, qui construit sa `SharedPlan` sans passer par
 * `parsePlanEntry()` et relisait donc le nom lui-meme — un lien `?s=` forge y
 * a longtemps fait passer un nom de 200 000 caracteres, alors que la meme
 * valeur venue du stockage ou du document distant etait bornee ici.
 */
export function parsePlanName(raw: unknown): string | null {
  return typeof raw === 'string' && raw.trim() ? raw.slice(0, MAX_NAME) : null;
}

/**
 * Exporte : le document distant (src/cloud/) est une entree non fiable au meme
 * titre qu'un lien de partage, et repasse donc par ce parseur plutot que par
 * une seconde validation vouee a diverger de celle-ci.
 */
export function parsePlanEntry(raw: unknown): SavedPlan | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const source = raw as Record<string, unknown>;
  return {
    id: typeof source['id'] === 'string' ? source['id'] : uid(),
    name: parsePlanName(source['name']),
    items: parsePlan(source['items']) ?? [],
    config: parseSessionConfig(source['config']),
    // Une seance v5 n'a pas d'horodatage : on la date de MAINTENANT plutot que
    // de zero. « L'appareil sur lequel je migre est presume a jour » — dater de
    // zero ferait perdre le contenu local face a n'importe quelle copie
    // distante des la premiere connexion.
    updatedAt: positiveInt(source['updatedAt'], Date.now()),
  };
}

/**
 * Pierres tombales, en oubliant les plus anciennes (voir TOMBSTONE_TTL_MS).
 * `now` est un parametre pour rester testable sans horloge simulee.
 *
 * `prune` vaut `false` pour le document distant (cloud/sync.ts) : le purger
 * la reviendrait a supposer que CET appareil a deja vu toutes les
 * suppressions qu'il contient, ce qui est exactement ce qu'on ne sait pas —
 * c'est le distant qui fait foi pour les autres appareils. Seule la lecture
 * LOCALE (loadState() ci-dessous) purge : un appareil qui oublie sa PROPRE
 * pierre tombale ne fait rien revenir, il a deja applique cette suppression.
 */
export function parseDeleted(
  raw: unknown,
  now: number = Date.now(),
  prune: boolean = true,
): Record<string, number> {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return {};
  const deleted: Record<string, number> = {};
  for (const [id, at] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof at !== 'number' || !Number.isFinite(at)) continue;
    if (prune && now - at > TOMBSTONE_TTL_MS) continue;
    deleted[id] = Math.round(at);
  }
  return deleted;
}

/**
 * `null` signifie « rien de lisible ici » (cle absente, JSON casse), et
 * DECLENCHE le repli sur la version precedente du schema. Un tableau vide est
 * au contraire une reponse valide : depuis que l'app n'impose plus de seance
 * type, quelqu'un peut n'avoir aucune seance a soi et n'utiliser que les
 * modeles CIRKALI. Confondre les deux ferait ressusciter ses anciennes seances
 * v5 au rechargement suivant, juste apres qu'il les a toutes supprimees.
 */
export function parsePlansList(raw: unknown): SavedPlan[] | null {
  if (!Array.isArray(raw)) return null;
  return raw.map(parsePlanEntry).filter((entry): entry is SavedPlan => entry !== null);
}

/**
 * Enveloppe l'ancien schema v4 (retombant lui-meme sur la v3) en une seule
 * seance. Renvoie une LISTE — vide s'il n'y a rien a migrer — pour tenir dans
 * la chaine de replis de `loadState()` sans cas particulier.
 */
function migrateFromV4(): SavedPlan[] {
  const rawPlan = readJson(V4_KEYS.plan) ?? readJson(LEGACY_KEYS.plan);
  const rawConfig = readJson(V4_KEYS.config) ?? readJson(LEGACY_KEYS.config);
  if (rawPlan === undefined && rawConfig === undefined) return [];
  return [
    {
      id: uid(),
      name: null,
      items: parsePlan(rawPlan) ?? [],
      config: parseSessionConfig(rawConfig),
      updatedAt: Date.now(),
    },
  ];
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
 * Empreinte du CONTENU d'une seance, `updatedAt` exclu — c'est ce que
 * `stampUpdated()` compare. L'inclure ferait qu'une ecriture change l'empreinte
 * qui declenche l'ecriture suivante : `updatedAt` se re-daterait a chaque
 * sauvegarde, et cet appareil gagnerait toutes les fusions a venir sans avoir
 * rien modifie.
 */
function planFingerprint(plan: SavedPlan): string {
  return JSON.stringify([plan.name, plan.items, plan.config]);
}

/**
 * Derniere empreinte ecrite, par id. Semee par `loadState()`, tenue a jour par
 * `saveState()`.
 */
const fingerprints = new Map<string, string>();

/**
 * Horodate les seances dont le contenu a reellement change depuis la derniere
 * ecriture.
 *
 * Automatique, et non un `touch()` a appeler depuis l'UI : ce dernier serait
 * oublie au premier module ajoute, et `updatedAt` est precisement ce qui
 * arbitre la fusion avec le nuage — un oubli s'y traduirait par une
 * modification silencieusement perdue au profit d'une version distante plus
 * ancienne. Le contrat « muter -> save() » deja en place suffit donc.
 */
function stampUpdated(plans: SavedPlan[], now: number): void {
  for (const plan of plans) {
    const fingerprint = planFingerprint(plan);
    const previous = fingerprints.get(plan.id);
    // Inconnue de la Map : soit une seance neuve, soit le premier passage
    // apres chargement. Dans les deux cas `updatedAt` est deja juste (fixe par
    // le parseur ou par la creation) — on enregistre l'empreinte sans redater.
    if (previous !== undefined && previous !== fingerprint) plan.updatedAt = now;
    fingerprints.set(plan.id, fingerprint);
  }
}

/**
 * Charge l'etat, en se rabattant sur la v5, puis sur la migration v4, puis sur
 * la seance type. Les anciennes cles ne sont jamais effacees : la v6 est
 * ecrite a cote.
 */
export function loadState(): State {
  // Chaine de replis inchangee, sauf sa fin : plus de seance fabriquee quand
  // rien n'a ete trouve. `plans` PEUT donc etre vide, et ce n'est pas une
  // anomalie — une premiere visite n'ecrit rien du tout, elle s'ouvre sur un
  // modele CIRKALI (voir data/presets.ts). C'est `ui/app.ts` (`ensureActive()`)
  // qui garantit desormais qu'il y a toujours une seance AFFICHEE, a soi ou
  // modele.
  const plans =
    parsePlansList(readJson(KEYS.plans)) ??
    parsePlansList(readJson(V5_KEYS.plans)) ??
    migrateFromV4();
  const rawActiveId = readJson(KEYS.activePlanId) ?? readJson(V5_KEYS.activePlanId);
  const activePlanId =
    typeof rawActiveId === 'string' && plans.some((plan) => plan.id === rawActiveId)
      ? rawActiveId
      : (plans[0]?.id ?? '');

  // Sème les empreintes : sans ca, la premiere sauvegarde qui suit le
  // chargement redaterait toutes les seances comme si elles venaient d'etre
  // modifiees.
  fingerprints.clear();
  for (const plan of plans) fingerprints.set(plan.id, planFingerprint(plan));

  return {
    plans,
    activePlanId,
    history: parseHistory(readJson(KEYS.history) ?? readJson(LEGACY_KEYS.history)),
    deleted: parseDeleted(readJson(KEYS.deleted)),
  };
}

/**
 * Ecrit l'etat, en horodatant au passage les seances modifiees. Renvoie
 * `false` si le stockage local est indisponible.
 */
export function saveState(state: State, now: number = Date.now()): boolean {
  stampUpdated(state.plans, now);
  try {
    localStorage.setItem(KEYS.plans, JSON.stringify(state.plans));
    localStorage.setItem(KEYS.activePlanId, JSON.stringify(state.activePlanId));
    localStorage.setItem(KEYS.history, JSON.stringify(state.history.slice(-MAX_HISTORY)));
    localStorage.setItem(KEYS.deleted, JSON.stringify(state.deleted));
    return true;
  } catch {
    return false;
  }
}

/**
 * Oublie l'empreinte d'une seance disparue, pour que la Map ne retienne pas
 * indefiniment des ids supprimes.
 */
export function forgetPlanFingerprint(id: string): void {
  fingerprints.delete(id);
}

/**
 * Reprend les empreintes apres une fusion avec le nuage : l'etat adopte est,
 * par construction, celui qui vient d'etre ecrit. Sans cet appel, la
 * sauvegarde suivante redaterait chaque seance venue du distant comme si cet
 * appareil l'avait modifiee, et elle gagnerait a tort la fusion d'apres.
 */
export function reseedFingerprints(plans: SavedPlan[]): void {
  fingerprints.clear();
  for (const plan of plans) fingerprints.set(plan.id, planFingerprint(plan));
}
