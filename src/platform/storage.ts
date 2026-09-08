// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import { isNativeApp } from './native';

/**
 * Durabilite du stockage local, cote navigateur.
 *
 * Le `localStorage` est la source de verite de l'app (voir CLAUDE.md), mais
 * aucun navigateur ne promet de le garder eternellement. Deux comportements
 * distincts, donc deux fonctions :
 *
 * - Chrome et Firefox n'effacent que sous pression disque, et acceptent qu'on
 *   demande a en etre exempte : c'est `requestPersistentStorage()`.
 * - WebKit — Safari, et tout navigateur sur iOS — efface tout stockage ecrit
 *   par script apres sept jours sans visite, et rien ne permet de s'y
 *   soustraire depuis la page : la seule reponse est de le DIRE, c'est
 *   `evictsIdleStorage()`.
 *
 * L'application native est un troisieme cas, et c'est WebKit qui le rend
 * piegeux : voir `evictsIdleStorage()`.
 */

/**
 * Demande que le stockage de ce site soit marque persistant. Sans effet la ou
 * l'API n'existe pas (WebKit), best-effort partout ailleurs.
 *
 * A n'appeler qu'apres une vraie modification, jamais au chargement : Firefox
 * pose la question a l'utilisateur, et un visiteur qui n'a encore rien
 * enregistre n'a pas a se voir demander une permission pour des donnees qui
 * n'existent pas. Idempotent : la demande ne part qu'une fois par session.
 */
let requested = false;

export function requestPersistentStorage(): void {
  if (requested) return;
  requested = true;
  // Le chainage optionnel court-circuite toute la suite de l'expression, y
  // compris le `.catch()`, quand l'API manque.
  navigator.storage?.persist?.().catch(() => {});
}

/**
 * Vrai la ou le stockage d'un site non visite depuis sept jours est efface
 * (l'ITP de WebKit). Ce n'est pas « Safari » qu'on cherche mais WEBKIT, et les
 * deux ne se recouvrent pas :
 *
 * - sur iPhone et iPad, Apple impose son moteur a TOUS les navigateurs — Chrome
 *   et Firefox y sont des habillages de `WKWebView` et purgent donc pareil ;
 * - a l'inverse, Chrome, Edge, Opera et Samsung Internet ecrivent tous
 *   « Safari » dans leur UA (heritage : ils ont copie sa forme pour ne pas se
 *   faire servir de pages degradees) sans rien purger du tout. Chercher le
 *   seul mot « Safari » avertirait les deux tiers du web a tort.
 *
 * Detection par l'UA faute de mieux : aucune API n'expose cette politique, et
 * l'absence de `navigator.storage.persist` ne suffit pas a conclure (elle
 * manque aussi ailleurs). Le pire cas reste une phrase affichee en trop ou en
 * moins — rien de fonctionnel n'en depend.
 *
 * **L'application native est exclue en premier, et ce n'est pas un detail.**
 * Le WebView d'iOS est un `WKWebView`, donc son UA porte « iPhone » ou
 * « iPad » : sans ce test, l'app installee affichait « ce navigateur efface
 * les donnees apres sept jours » — faux, et alarmant. Le stockage d'une
 * application vit dans son conteneur, qu'iOS ne purge pas par inactivite ; il
 * disparait a la desinstallation, comme celui de n'importe quelle app. La
 * politique visee ici est celle du navigateur, pas celle du moteur de rendu,
 * et c'est le seul endroit ou les deux se separent.
 */
export function evictsIdleStorage(): boolean {
  if (isNativeApp()) return false;
  const ua = navigator.userAgent;
  // iOS : le marqueur du navigateur tiers (CriOS, FxiOS, EdgiOS) ou celui de
  // l'appareil suffit — dans les deux cas c'est WebKit dessous.
  const webkitIos = /crios|fxios|edgios|iphone|ipad|ipod/i.test(ua);
  // Safari proprement dit : macOS, ou un iPad en mode bureau (son UA se
  // fait alors passer pour un Macintosh, sans plus aucune trace d'iOS).
  const safari = /safari/i.test(ua) && !/chrome|chromium|android|opr\//i.test(ua);
  return webkitIos || safari;
}
