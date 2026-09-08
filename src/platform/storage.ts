/**
 * Durabilite du stockage local, cote navigateur.
 *
 * Le `localStorage` est la source de verite de l'app (voir CLAUDE.md), mais
 * aucun navigateur ne promet de le garder eternellement. Deux comportements
 * distincts, donc deux fonctions :
 *
 * - Chrome et Firefox n'effacent que sous pression disque, et acceptent qu'on
 *   demande a en etre exempte : c'est `requestPersistentStorage()`.
 * - Safari efface tout stockage ecrit par script apres sept jours sans visite,
 *   et rien ne permet de s'y soustraire depuis la page : la seule reponse est
 *   de le DIRE, c'est `evictsIdleStorage()`.
 */

/**
 * Demande que le stockage de ce site soit marque persistant. Sans effet la ou
 * l'API n'existe pas (Safari), best-effort partout ailleurs.
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
 * Vrai sur Safari, le seul navigateur qui efface le stockage d'un site non
 * visite depuis sept jours (ITP). Detection par l'UA faute de mieux : aucune
 * API n'expose cette politique, et `navigator.storage.persist` absent ne
 * suffit pas a conclure (il manque aussi ailleurs).
 *
 * Les navigateurs tiers sur iOS (Chrome, Firefox...) sont volontairement
 * exclus : ils embarquent bien WebKit, mais l'exception se paierait en
 * fausses alertes ailleurs, et le message vise le cas de loin le plus
 * courant.
 */
export function evictsIdleStorage(): boolean {
  const ua = navigator.userAgent;
  return /safari/i.test(ua) && !/chrome|chromium|android|crios|fxios|edgios|opr\//i.test(ua);
}
