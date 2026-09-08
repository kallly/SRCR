// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

/**
 * Signale les URL du site aux moteurs qui implementent IndexNow.
 *
 *     npm run indexnow -- --dry     # montre ce qui serait envoye, n'envoie rien
 *     npm run indexnow              # envoie
 *
 * IndexNow remplace l'attente d'un passage de robot par une notification : on
 * pousse la liste des adresses, les moteurs participants viennent les relire.
 *
 * DEUX LIMITES A CONNAITRE AVANT D'EN ATTENDRE QUELQUE CHOSE :
 *
 * 1. **Google n'y participe pas.** Bing, Yandex, Seznam et Naver oui, Google
 *    non — pour lui, seule la Search Console fait bouger les choses. Ne pas
 *    lancer cette commande en esperant un effet sur Google.
 * 2. **Le protocole attend les URL *modifiees*, pas le catalogue entier.**
 *    Renvoyer les 317 a chaque deploiement est tolere mais mal vu, et dilue le
 *    signal. D'ou une commande manuelle plutot qu'une etape de `npm run build` :
 *    a lancer apres un vrai changement de contenu, pas apres une virgule.
 *
 * La cle vit dans `public/<cle>.txt`, servi a la racine du domaine. Ce n'est
 * pas un secret : le protocole exige qu'elle soit publiquement lisible, c'est
 * la preuve de propriete du domaine. La commiter est le fonctionnement normal.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const KEY = 'aa22ab05496f4b5bb923774108f40cc8';
const HOST = 'cirkali.fr';
/** Point d'entree partage : il relaie a tous les moteurs participants. */
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const DIST = join(process.cwd(), 'dist');
const sitemapPath = join(DIST, 'sitemap.xml');

if (!existsSync(sitemapPath)) {
  console.error('dist/sitemap.xml absent : lance `npm run build` d\'abord.');
  process.exit(2);
}

// Le sitemap est la seule liste d'URL du projet, et il est genere depuis les
// memes sources que les pages : s'en servir evite une seconde liste qui
// divergerait — c'est exactement l'erreur que `public/sitemap.xml` avait deja
// commise avant d'etre supprime.
const urlList = [...readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1]!,
);

const foreign = urlList.filter((u) => !u.startsWith(`https://${HOST}/`));
if (foreign.length > 0) {
  console.error(`URL hors du domaine declare (${HOST}) : ${foreign.slice(0, 3).join(', ')}`);
  process.exit(1);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
};

if (process.argv.includes('--dry')) {
  console.log(`${urlList.length} URL(s) seraient envoyees a ${ENDPOINT}`);
  console.log(`  cle       : ${body.keyLocation}`);
  console.log(`  premieres : ${urlList.slice(0, 3).join('\n              ')}`);
  console.log(`  dernieres : ${urlList.slice(-2).join('\n              ')}`);
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

// 200 = accepte. 202 = accepte, cle en cours de verification. 422 = une URL
// hors du domaine declare. 429 = trop de soumissions.
const detail = (await res.text()).trim();
console.log(
  `${res.status} ${res.statusText} — ${urlList.length} URL(s) soumises.` +
    (detail ? `\n${detail}` : ''),
);

// 403 signifie « cle refusee », mais la premiere soumission d'une cle toute
// neuve le renvoie aussi : le moteur ne l'a pas encore lue. Observe ici meme —
// un 403, puis 200 quelques secondes plus tard sans rien changer. Ne pas
// conclure a une erreur de configuration avant d'avoir reessaye.
if (res.status === 403) {
  console.log(
    `\nSi c'est la premiere soumission de cette cle, reessaie dans une minute :\n` +
      `le moteur doit d'abord lire ${body.keyLocation}. Verifie qu'elle repond :\n` +
      `  curl -s ${body.keyLocation}`,
  );
}
process.exit(res.ok ? 0 : 1);
