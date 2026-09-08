// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

/**
 * Construit `dist-app/`, le bundle embarque dans l'application native.
 *
 *     npm run build:app
 *
 * Pourquoi un dossier distinct de `dist/`. Le build du site produit 317 pages
 * — 310 fiches d'exercice, la page de specification, les cinq politiques de
 * confidentialite, la 404 — plus un sitemap, un llms.txt, un robots.txt et les
 * en-tetes de l'hebergeur. Rien de tout cela n'a de sens dans un binaire : ce
 * sont des surfaces d'indexation, elles vivent sur cirkali.fr et l'application
 * y renvoie par des liens absolus (`siteHref()`, src/platform/native.ts).
 * Embarquer `dist/` tel quel, ce serait quelques Mo de poids mort dans un
 * telechargement de magasin d'applications.
 *
 * Ce que ce script fait, exactement :
 *
 * 1. un build Vite normal, avec `CIRKALI_TARGET=app` — le seul effet de ce
 *    drapeau est de ne PAS injecter le portillon publicitaire (AdSense
 *    interdit ses annonces dans le WebView d'une application, et ne pas livrer
 *    le code est plus fort que le desactiver a l'execution) ;
 * 2. le retrait des fichiers que `public/` recopie pour l'hebergeur et pour
 *    les robots, et qui n'ont pas d'usage hors du web.
 *
 * Ce qu'il ne fait PAS : lancer `build-exercise-pages.ts`. C'est toute la
 * difference avec `npm run build`.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'dist-app');

/**
 * Fichiers recopies depuis `public/` qui ne s'adressent qu'au web.
 *
 * `sw.js` merite son mot : un service worker n'est jamais enregistre en natif
 * (voir la garde de src/main.ts), le WebView servant deja ses fichiers depuis
 * le binaire. L'embarquer serait au mieux inerte, au pire une seconde couche
 * de cache par-dessus des fichiers locaux — donc une source de peremption
 * pour rien.
 */
const WEB_ONLY = [
  '_headers', // en-tetes Cloudflare
  'robots.txt', // indexation
  'ads.txt', // AdSense
  'sw.js', // cache hors ligne du site
  'manifest.webmanifest', // installation depuis un navigateur
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'og-image.png', // apercu de partage social
  '.well-known', // association de domaine, servie par le site pas par l'app
];

console.log('Build applicatif (CIRKALI_TARGET=app) vers dist-app/\n');

execFileSync(
  'npx',
  ['vite', 'build', '--outDir', 'dist-app', '--emptyOutDir'],
  { stdio: 'inherit', env: { ...process.env, CIRKALI_TARGET: 'app' } },
);

let removed = 0;
for (const name of WEB_ONLY) {
  const path = join(OUT, name);
  if (!existsSync(path)) continue;
  rmSync(path, { recursive: true });
  removed++;
}

// La cle IndexNow porte un nom aleatoire : elle se reconnait a sa forme, pas
// a un nom qu'on pourrait lister ci-dessus.
for (const name of readdirSync(OUT)) {
  if (/^[0-9a-f]{32}\.txt$/.test(name)) {
    rmSync(join(OUT, name));
    removed++;
  }
}

function totalSize(dir: string): number {
  let bytes = 0;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    bytes += stat.isDirectory() ? totalSize(path) : stat.size;
  }
  return bytes;
}

// Garde-fou, pas une statistique : si `dist-app/` se met a peser plusieurs
// mega-octets, c'est que le build a recupere les fiches ou un dossier entier
// de `public/`, et personne ne s'en apercevrait avant de regarder la taille du
// telechargement dans un magasin d'applications.
const MAX_MB = 6;
const mb = totalSize(OUT) / 1024 / 1024;
console.log(`\n${removed} fichier(s) web-only retire(s). dist-app/ pese ${mb.toFixed(2)} Mo.`);

if (!existsSync(join(OUT, 'index.html'))) {
  console.error("\ndist-app/index.html est absent : le build n'a rien produit.");
  process.exit(1);
}
if (mb > MAX_MB) {
  console.error(`\ndist-app/ depasse ${MAX_MB} Mo — verifier ce qui y est entre.`);
  process.exit(1);
}

/**
 * Les deux promesses que ce bundle doit tenir, verifiees ici et pas dans
 * `check-build.ts` : celui-ci n'inspecte que `dist/`, et la CI ne construit
 * pas l'application. La verification doit donc vivre a l'endroit qui la
 * produit, sans quoi la seule chose qui separe une infraction d'un
 * televersement au magasin serait une relecture.
 *
 * 1. Aucun code publicitaire, aucune analytique web. AdSense interdit ses
 *    annonces dans le WebView d'une application, et une analytique embarquee
 *    obligerait a la declarer au questionnaire de confidentialite de l'App
 *    Store — pour une mesure que les magasins fournissent deja, et sans le
 *    bandeau de consentement, qui voyage avec le script publicitaire.
 * 2. Aucune page generee. Elles vivent sur cirkali.fr ; l'application y
 *    renvoie par des liens absolus (`siteHref()`, src/platform/native.ts).
 */
const home = readFileSync(join(OUT, 'index.html'), 'utf8');
const forbidden = ['adsbygoogle.js', 'googletagmanager', "gtag('config'", 'google-adsense-account'];
const found = forbidden.filter((needle) => home.includes(needle));
if (found.length > 0) {
  console.error(
    `\ndist-app/index.html porte encore : ${found.join(', ')}.\n` +
      `Les marqueurs <!--WEB_ONLY--> d'index.html ont du bouger ` +
      `(voir stripWebOnly(), vite.config.ts).`,
  );
  process.exit(1);
}
if (existsSync(join(OUT, 'exercises'))) {
  console.error('\ndist-app/exercises existe : les 310 fiches ne vont pas dans le binaire.');
  process.exit(1);
}

console.log('Ni publicite, ni analytique web, ni pages generees.');
console.log('\nEnsuite : npx cap sync (Node >= 22 requis par la CLI Capacitor).');
