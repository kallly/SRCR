import { SITE_URL } from '../data/site';

/**
 * Sommes-nous dans le WebView de l'application native, ou dans un navigateur ?
 *
 * Une seule question, et tout ce que le portage mobile change en depend. Le
 * meme bundle sert les deux : il n'y a pas de branche de compilation, pas de
 * `#ifdef`, et c'est voulu — deux bundles divergeraient, et c'est toujours la
 * copie oubliee qui casse (voir `content/ad-rails.ts` sur les trois surfaces
 * publicitaires).
 *
 * **Aucun import de `@capacitor/core`**, et c'est la contrainte qui a dicte la
 * forme de ce module : le paquet peserait sur le bundle web, ou il ne repond a
 * rien. On sonde le global que le runtime natif pose sur la page avant tout
 * script d'application — exactement le motif de `host()` dans `ui/webmcp.ts`,
 * qui teste `document.modelContext` sans rien importer. Resultat : zero octet
 * de plus pour un visiteur du site, et une reponse identique des deux cotes.
 */

interface CapacitorGlobal {
  isNativePlatform?: () => boolean;
  getPlatform?: () => string;
}

function capacitor(): CapacitorGlobal | undefined {
  return (window as Window & { Capacitor?: CapacitorGlobal }).Capacitor;
}

/**
 * Memoise : la reponse ne change pas en cours de vie de la page, et elle est
 * lue a chaque rendu (le lien de confidentialite, l'index des fiches).
 */
let cached: boolean | null = null;

export function isNativeApp(): boolean {
  if (cached === null) {
    try {
      cached = capacitor()?.isNativePlatform?.() === true;
    } catch {
      // Un runtime en cours de chargement peut exposer un global incomplet.
      // Se tromper vers « web » est la bonne erreur : l'app garde alors le
      // comportement du site, qui marche partout.
      cached = false;
    }
  }
  return cached;
}

/** `'ios'`, `'android'`, ou `'web'` — utile pour les seuls ecarts d'OS. */
export function nativePlatform(): string {
  try {
    return capacitor()?.getPlatform?.() ?? 'web';
  } catch {
    return 'web';
  }
}

/**
 * Une adresse du site, a partir d'un chemin relatif a sa racine.
 *
 * Sur le web, on renvoie le chemin **tel quel** : c'est ce qui garde les liens
 * relatifs (`base: './'`, voir vite.config.ts) et, surtout, ce qui fait
 * qu'une salle servie sur `<salle>.cirkali.fr` reste sur son sous-domaine
 * (voir `data/tenants.ts`). Absolutiser cote web renverrait tous ses visiteurs
 * vers le domaine principal.
 *
 * Dans l'application, ces memes chemins ne menent nulle part : `exercises/fr/…`
 * et `confidentialite/fr` ne sont pas embarques dans le binaire (voir
 * `scripts/build-app.ts`). Ils deviennent donc des adresses completes, que le
 * WebView ouvre dans le navigateur du systeme.
 */
export function siteHref(path: string): string {
  return isNativeApp() ? `${SITE_URL}/${path}` : path;
}

/**
 * La base d'un lien de partage : tout ce qui precede le `?s=`.
 *
 * C'etait le vrai defaut decouvert en preparant le portage. Trois endroits
 * ecrivaient `${location.origin}${location.pathname}?s=…` — `ui/share.ts`,
 * `ui/ai-help.ts`, `ui/webmcp.ts`. Dans le WebView, ca donne
 * `https://localhost/?s=…` : chaque QR code affiche, chaque lien copie et
 * chaque message pret a coller dans une IA aurait designe une adresse que
 * personne d'autre ne peut ouvrir. Un lien qu'on ne peut pas partager, dans la
 * fonction « Partager ».
 *
 * Le `location.origin` du web reste, lui, la bonne reponse : il porte le
 * sous-domaine d'une salle, et `location.pathname` porte le sous-chemin d'un
 * deploiement qui ne serait pas a la racine.
 */
export function shareBase(): string {
  return isNativeApp() ? `${SITE_URL}/` : `${location.origin}${location.pathname}`;
}
