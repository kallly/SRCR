/**
 * Un seul bit, en clair, hors de Firebase : « cette personne etait connectee la
 * derniere fois ».
 *
 * Firebase sait deja restaurer une session (`browserLocalPersistence`), mais le
 * savoir demande d'avoir charge le SDK — soit ~200 Ko a telecharger avant de
 * pouvoir constater que le visiteur n'est pas connecte. Ce drapeau repond a la
 * question sans rien charger, et c'est lui qui garantit qu'un visiteur anonyme
 * obtient exactement l'app d'avant.
 *
 * Il ne contient aucune donnee personnelle et ne fait autorite sur rien : la
 * verite reste `onAuthStateChanged`. Au pire il est perime (session Firebase
 * expiree), et le SDK charge pour rien signale simplement « deconnecte ».
 */
const KEY = 'cirkali.cloud.v1';

export function wasSignedIn(): boolean {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    // Stockage indisponible (mode prive verrouille) : on ne charge pas le SDK
    // de notre propre initiative. Le bouton de connexion, lui, marche toujours.
    return false;
  }
}

export function rememberSignedIn(signedIn: boolean): void {
  try {
    if (signedIn) localStorage.setItem(KEY, '1');
    else localStorage.removeItem(KEY);
  } catch {
    // Best-effort, comme saveLocale() : au pire on rechargera le SDK au
    // prochain clic au lieu de le faire au demarrage.
  }
}
