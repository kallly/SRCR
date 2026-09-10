// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import { isExercise } from './plan';
import { parsePlan, parsePlanName, parseSessionConfig } from './storage';
import type { PlanItem, SessionConfig } from './types';

/**
 * Partage d'une seance par lien/QR code : pas de backend, donc la seance
 * entiere voyage encodee dans l'URL elle-meme. Ca ne marche que parce que
 * `PlanItem`/`SessionConfig` ne contiennent deja aucun texte traduit (regle
 * n°2 de CLAUDE.md) — un lien genere en francais s'importe donc correctement
 * chez quelqu'un dont l'app est en italien, sans rien a traduire dedans.
 *
 * Format volontairement dense : des tableaux positionnels plutot que des
 * objets (aucun nom de champ repete par ligne), et les deux enums a deux
 * valeurs (mode de seance, type d'effort) reduits a une lettre. Un QR plus
 * dense scanne moins bien, et l'URL est deja partagee telle quelle (SMS,
 * presse-papier) — chaque octet compte plus ici que dans le stockage local.
 * `v` permet de faire evoluer ce format sans casser un ancien lien.
 */
const SHARE_VERSION = 1;

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Rattrapages silencieux, avant le decodage. Un modele qui se trompe d'un
 * cheveu ne le sait pas et ne le saura jamais : le lien part chez quelqu'un
 * d'autre, qui n'a aucun moyen de le reparer. Trois deformations vues, toutes
 * sans ambiguite parce que l'alphabet base64url est ferme :
 *
 * - un espace est un `+` que `URLSearchParams` a deja decode — c'est ce que
 *   produit un modele qui ecrit du base64 STANDARD la ou on demande base64url ;
 * - les autres blancs (retour a la ligne d'un bloc de code recopie a la main)
 *   n'appartiennent a aucun des deux alphabets, donc ne peuvent rien signifier ;
 * - ce qui depasse l'alphabet EN FIN de chaine est la ponctuation de la phrase
 *   qui portait le lien (`)`, `.`, `»`, `]` d'un lien Markdown).
 *
 * Rien n'est retire au milieu : la, un caractere etranger signale une chaine
 * vraiment corrompue, et deviner reviendrait a importer une autre seance que
 * celle qui a ete partagee.
 */
function repairBase64Url(encoded: string): string {
  return encoded
    .replace(/ /g, '+')
    .replace(/\s+/g, '')
    .replace(/[^A-Za-z0-9+/\-_=]+$/, '');
}

function fromBase64Url(encoded: string): string {
  const base64 = repairBase64Url(encoded).replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/**
 * Une ligne encodee : `['r', secondes]` pour une pause, `['e', cle, groupe,
 * 'r'|'t', series, repetitions, secondes, repos, nomPerso?, charge?]` pour un
 * exercice (les deux derniers elements n'existent que s'ils sont renseignes).
 *
 * Un tableau positionnel s'etend par la fin sans casser personne, et c'est ce
 * qui a permis d'ajouter la charge sans toucher a `v` : un ancien build lit le
 * 9e element comme un nom perso et ignore le 10e. D'ou la contrepartie, la
 * chaine vide poussee en 9e position quand un exercice de la bibliotheque
 * porte une charge — trois caracteres pour ne pas avoir a deviner la nature
 * d'un element d'apres son type, ce qu'aucune documentation lisible par une IA
 * ne saurait dire simplement.
 */
type WireItem = [string, ...unknown[]];

function encodeItem(item: PlanItem): WireItem {
  if (item.type === 'rest') return ['r', item.seconds];
  const wire: WireItem = [
    'e',
    item.key,
    item.group,
    item.mode === 'time' ? 't' : 'r',
    item.sets,
    item.reps,
    item.seconds,
    item.rest,
  ];
  const name = item.key === 'custom' ? (item.customName ?? '') : '';
  if (name) wire.push(name);
  if (item.weight !== undefined) {
    if (!name) wire.push('');
    wire.push(item.weight);
  }
  return wire;
}

/** Reconstruit la forme `{ type, key, ... }` attendue par `parsePlan()` (core/storage.ts). */
function decodeItem(raw: unknown): Record<string, unknown> | null {
  if (!Array.isArray(raw) || raw.length < 2) return null;
  const [kind, ...rest] = raw as unknown[];
  // Rien n'ecrit plus de ligne 'r' (voir `RestItem`, core/types.ts) : ce
  // decodage sert aux liens deja partages, qui doivent continuer de s'ouvrir
  // entiers. `encodeItem()` la produit toujours, pour la meme raison — une
  // seance qui en contient encore une se repartage sans la perdre.
  if (kind === 'r') {
    return { type: 'rest', seconds: rest[0] };
  }
  if (kind === 'e') {
    const [key, group, mode, sets, reps, seconds, restSeconds, customName, weight] = rest;
    return {
      type: 'exercise',
      key,
      group,
      mode: mode === 't' ? 'time' : 'reps',
      sets,
      reps,
      seconds,
      rest: restSeconds,
      customName,
      weight,
    };
  }
  return null;
}

/**
 * Encode une seance pour un lien de partage. Les `id` des lignes sont omis
 * (le champ le plus lourd et le moins utile a partager) : `parsePlan()` leur
 * en regenere de frais a l'import, exactement comme il le ferait pour une
 * ligne stockee sans id.
 */
export function encodeSharedPlan(plan: SharedPlan): string {
  const payload = {
    v: SHARE_VERSION,
    n: plan.name,
    m: plan.config.mode === 'circuit' ? 'x' : 'c',
    p: plan.config.pause,
    t: plan.config.trans,
    i: plan.items.map(encodeItem),
  };
  return toBase64Url(JSON.stringify(payload));
}

export interface SharedPlan {
  name: string | null;
  items: PlanItem[];
  config: SessionConfig;
}

/**
 * Decode un lien de partage. Ne leve jamais : ce texte vient d'un tiers (URL
 * copiee, modifiee a la main, tronquee par un client de messagerie...), donc
 * aussi peu fiable qu'une valeur lue en localStorage — reutilise les memes
 * parseurs tolerants que `core/storage.ts` plutot qu'une seconde validation.
 * Rejette un payload sans le moindre exercice (que des pauses) : ce n'est
 * pas une seance importable.
 *
 * Le nom passe par `parsePlanName()` et non par un test local : c'est ce
 * parseur qui le plafonne, et le relire ici laissait justement le seul champ
 * de ce format sans plafond.
 */
export function decodeSharedPlan(encoded: string): SharedPlan | null {
  try {
    const raw: unknown = JSON.parse(fromBase64Url(encoded));
    if (typeof raw !== 'object' || raw === null) return null;
    const source = raw as Record<string, unknown>;
    if (source['v'] !== SHARE_VERSION || !Array.isArray(source['i'])) return null;

    const rawItems = source['i']
      .map(decodeItem)
      .filter((item): item is Record<string, unknown> => item !== null);
    const items = parsePlan(rawItems);
    if (!items || !items.some(isExercise)) return null;

    const name = parsePlanName(source['n']);
    const config = parseSessionConfig({
      mode: source['m'] === 'x' ? 'circuit' : 'classic',
      pause: source['p'],
      trans: source['t'],
    });
    return { name, items, config };
  } catch {
    return null;
  }
}
