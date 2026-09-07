/**
 * Verifications de non-regression sur `dist/`, apres `npm run build`.
 *
 *     npm run check
 *
 * Le depot n'a pas de suite de tests : `npm run typecheck` verifie le code et
 * la completude des cinq langues, mais rien ne verifiait ce que le build
 * *produit*. Ces controles-la vivaient jusqu'ici en prose dans CLAUDE.md, sous
 * forme de commandes `grep` a recopier a la main — donc jamais lances.
 *
 * Chaque assertion ici correspond a une regression deja vue ou explicitement
 * redoutee, jamais a une verification decorative :
 *
 * - un element `data-i18n` vide dans le HTML livre = la coquille vide que
 *   voient les robots sans JS, et le CLS qui revient ;
 * - la liste des cles absente = une IA ne peut plus ecrire de lien `?s=` ;
 * - un JSON-LD casse = balisage silencieusement ignore par Google ;
 * - l'exemple `?s=` de la page de spec faux = on apprend un format errone aux
 *   IA, ce qui est pire que de ne rien documenter ;
 * - une page d'exercice manquante ou vide = une URL du sitemap en 404.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { decodeSharedPlan } from '../src/core/share';
import { LIBRARY } from '../src/data/library';
import { DETAILS_BY_LOCALE } from '../src/content/exercise-details';
import { AD_CLIENT, AD_MIN_WIDTH } from '../src/content/ad-rails';
import { DICTIONARIES } from '../src/i18n';
import type { Locale } from '../src/core/types';

const DIST = join(process.cwd(), 'dist');

let failures = 0;
function check(label: string, ok: boolean, detail = ''): void {
  if (ok) {
    console.log(`  ok    ${label}`);
  } else {
    failures++;
    console.log(`  ECHEC ${label}${detail ? `\n        ${detail}` : ''}`);
  }
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html absent : lance `npm run build` d\'abord.');
  process.exit(2);
}

const index = readFileSync(join(DIST, 'index.html'), 'utf8');

console.log('\nAccueil');

// Tout data-i18n doit avoir ete rempli par fillStaticTranslations().
const empties = [...index.matchAll(/data-i18n="([^"]+)"><\/[a-z]+>/g)].map((m) => m[1]);
check('chaque element data-i18n porte son texte francais', empties.length === 0, `vides : ${empties.join(', ')}`);

// La table de reference qu'une IA lit pour ecrire un lien ?s=.
const keys = [...index.matchAll(/data-key="([^"]+)"/g)].map((m) => m[1]);
check(
  `les ${LIBRARY.length} cles d'exercice sont dans le HTML livre`,
  keys.length === LIBRARY.length,
  `${keys.length} trouvee(s)`,
);
const unknown = keys.filter((k) => !LIBRARY.some((e) => e.key === k));
check('aucune cle inconnue dans l\'index des fiches', unknown.length === 0, unknown.join(', '));

// La cle doit AUSSI etre du texte visible : une IA qui lit la page en
// extraction de texte ne voit pas les attributs (piege verifie avec Gemini).
const visible = LIBRARY.filter((e) => !index.includes(`<code>${e.key}</code>`)).map((e) => e.key);
check('chaque cle est aussi visible en <code>', visible.length === 0, visible.join(', '));

for (const [i, block] of [...index.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].entries()) {
  let ok = true;
  let err = '';
  try {
    JSON.parse(block[1] ?? '');
  } catch (e) {
    ok = false;
    err = String(e);
  }
  check(`JSON-LD #${i + 1} parse`, ok, err);
}

check('__BUILD_DATE__ remplace', !index.includes('__BUILD_DATE__'));
// Sans cette variable, `#library:empty` retombe sur sa valeur de repli : la
// reservation de hauteur redevient fausse des que la bibliotheque grandit,
// sans que rien ne casse (voir injectLibraryRows(), vite.config.ts).
check('--lib-rows-2 injecte pour la reservation CLS', index.includes('--lib-rows-2:'));

// Un navigateur qui n'a pas lu l'encodage dans les 1024 premiers octets
// recommence son analyse du document. Regression deja vue : un commentaire et
// le chargeur GA ajoutes en tete du <head> avaient repousse la balise a
// l'octet 1824, sans que rien ne casse — seul Lighthouse l'a signale.
const charsetAt = Buffer.from(index, 'utf8').indexOf('<meta charset');
check(
  '<meta charset> dans les 1024 premiers octets',
  charsetAt >= 0 && charsetAt < 1024,
  charsetAt < 0 ? 'balise absente' : `a l'octet ${charsetAt}`,
);

// Le CSS de l'accueil est integre (plugin inline-styles, vite.config.ts) : plus
// aucune requete bloquante avant le premier pixel. Si la forme des assets de
// Vite changeait, le remplacement echouerait et la page repasserait en rendu
// bloquant sans que rien d'autre ne le signale.
check('le CSS de l\'accueil est integre', /<style>[^]{2000,}<\/style>/.test(index));
check(
  'aucune feuille de style liee dans l\'accueil',
  !/<link\b[^>]*rel="stylesheet"/.test(index),
  /<link\b[^>]*rel="stylesheet"[^>]*>/.exec(index)?.[0] ?? '',
);

// Les polices sont declarees dans le CSS : sans preload elles ne partent
// qu'apres son telechargement. `crossorigin` est obligatoire meme en meme
// origine — sans lui le prechargement ne correspond pas a la requete reelle et
// la police est telechargee deux fois.
for (const font of ['archivo-latin', 'manrope-latin']) {
  check(
    `${font}.woff2 preloade avec crossorigin`,
    new RegExp(`<link\\b[^>]*rel="preload"[^>]*crossorigin[^>]*${font}\\.woff2`).test(index) ||
      new RegExp(`<link\\b[^>]*rel="preload"[^>]*${font}\\.woff2[^>]*crossorigin`).test(index),
  );
}
// Consent Mode v2 : l'etat par defaut doit etre pose AVANT `config`, sinon
// gtag a deja pu ecrire quand il arrive. Les deux appels vivent dans le meme
// script inline, a quelques lignes d'ecart : rien d'autre qu'un ordre, donc
// rien qui casse si on l'inverse — d'ou cette assertion.
const consentAt = index.indexOf("gtag('consent', 'default'");
const configAt = index.indexOf("gtag('config'");
check(
  'l\'etat de consentement par defaut precede gtag config',
  consentAt >= 0 && configAt >= 0 && consentAt < configAt,
  consentAt < 0 ? 'aucun appel consent default' : `consent a ${consentAt}, config a ${configAt}`,
);
// Les quatre signaux du Consent Mode v2. En oublier un ne provoque aucune
// erreur : Google le traite simplement comme accorde.
for (const signal of ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage']) {
  check(`${signal} refuse par defaut`, new RegExp(`${signal}: 'denied'`).test(index));
}

check('marqueur EXERCISE_INDEX remplace', !index.includes('<!--EXERCISE_INDEX-->'));

console.log('\nPages generees pour les IA');

const specPath = join(DIST, 'creer-une-seance-par-lien.html');
check('dist/creer-une-seance-par-lien.html existe', existsSync(specPath));
check('dist/llms.txt existe', existsSync(join(DIST, 'llms.txt')));

if (existsSync(specPath)) {
  const spec = readFileSync(specPath, 'utf8');
  // L'exemple montre aux IA doit se decoder par le vrai decodeur : un exemple
  // faux serait pire que pas d'exemple.
  const link = /[?&]s=([A-Za-z0-9_-]+)/.exec(spec)?.[1];
  check('la page de spec porte un lien ?s= d\'exemple', Boolean(link));
  if (link) {
    const decoded = decodeSharedPlan(link);
    check(
      'cet exemple se decode par decodeSharedPlan()',
      decoded !== null && decoded.items.length > 0,
      decoded === null ? 'decodeSharedPlan() renvoie null' : 'aucun exercice',
    );
  }
}

console.log('\nFiches d\'exercice');

const sitemapPath = join(DIST, 'sitemap.xml');
check('dist/sitemap.xml existe', existsSync(sitemapPath));
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, 'utf8') : '';
check('le sitemap reference la page de spec', sitemap.includes('creer-une-seance-par-lien'));

let pages = 0;
for (const locale of Object.keys(DETAILS_BY_LOCALE) as Locale[]) {
  const dir = join(DIST, 'exercises', locale);
  const details = DETAILS_BY_LOCALE[locale] ?? {};
  const expected = Object.keys(details).length;
  const found = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.html')) : [];
  check(`exercises/${locale} : ${expected} page(s)`, found.length === expected, `${found.length} trouvee(s)`);

  // Les assertions ci-dessus ne comparent la langue qu'a elle-meme : une cle
  // oubliee dans un seul fichier de contenu long passait donc au vert, avec
  // cette langue publiant une fiche de moins que le francais, en silence
  // (`ExerciseDetail` est volontairement `Partial`, voir la skill
  // add-exercise). Seul `npm run exo <cle>` le voyait, une cle a la fois.
  const uncovered = LIBRARY.filter((entry) => !(entry.key in details)).map((entry) => entry.key);
  check(
    `exercises/${locale} : les ${LIBRARY.length} cles de LIBRARY sont couvertes`,
    uncovered.length === 0,
    uncovered.join(', '),
  );

  const empty = found.filter((f) => statSync(join(dir, f)).size < 1000);
  check(`exercises/${locale} : aucune page vide`, empty.length === 0, empty.join(', '));

  const missing = Object.values(details)
    .map((d) => d.slug)
    .filter((slug) => !sitemap.includes(`/exercises/${locale}/${slug}</loc>`));
  check(`exercises/${locale} : toutes au sitemap`, missing.length === 0, missing.join(', '));
  pages += found.length;
}

console.log('\nPublicites et confidentialite');

// La promesse « aucune publicite sur mobile » n'est pas une intention, c'est
// une propriete du HTML livre : le portillon (src/content/ad-rails.ts) est la
// SEULE chose qui cree un encart, et il ne s'execute qu'au-dela du seuil de
// largeur. Ces assertions verifient les deux moities de cette promesse — le
// portillon present partout, et rien de publicitaire pose en statique a cote.
const surfaces = (readdirSync(DIST, { recursive: true, encoding: 'utf8' }) as string[])
  .filter((rel) => rel.endsWith('.html'))
  .filter((rel) => statSync(join(DIST, rel)).isFile());

const withoutGate = surfaces.filter(
  (rel) => !readFileSync(join(DIST, rel), 'utf8').includes(`min-width: ${AD_MIN_WIDTH}px`),
);
check(
  `les ${surfaces.length} pages livrees portent le portillon publicitaire`,
  withoutGate.length === 0,
  withoutGate.slice(0, 5).join(', '),
);

// Un <script src> vers adsbygoogle, ou un <ins> ecrit en dur, partirait sur
// TOUS les ecrans — c'est exactement la « simplification » qu'on redoute, et
// elle ne se verrait pas autrement qu'en ouvrant le site sur un telephone.
const staticAds = surfaces.filter((rel) => {
  const html = readFileSync(join(DIST, rel), 'utf8');
  return /<script\b[^>]*src="[^"]*adsbygoogle/.test(html) || /<ins\b[^>]*adsbygoogle/.test(html);
});
check(
  'aucune balise publicitaire statique (rien ne part sur mobile)',
  staticAds.length === 0,
  staticAds.slice(0, 5).join(', '),
);

// Sans ads.txt a la racine, une partie des acheteurs cesse d'encherir sans
// qu'aucune erreur ne le signale : la seule trace serait un revenu plus bas.
const adsTxtPath = join(DIST, 'ads.txt');
check('dist/ads.txt existe', existsSync(adsTxtPath));
check(
  'ads.txt porte l\'identifiant editeur',
  existsSync(adsTxtPath) && readFileSync(adsTxtPath, 'utf8').includes(AD_CLIENT.replace('ca-', '')),
);
check(
  'l\'accueil declare la propriete AdSense',
  index.includes(`content="${AD_CLIENT}"`),
);

// AdSense refuse un site sans politique de confidentialite accessible, et le
// manque etait de toute facon deja reel (GA, connexion Google).
for (const locale of Object.keys(DICTIONARIES) as Locale[]) {
  // Le FICHIER garde son extension, l'URL publiee ne l'a pas : c'est
  // exactement la distinction que le sitemap avait perdue.
  check(
    `confidentialite/${locale} existe et est au sitemap`,
    existsSync(join(DIST, `confidentialite/${locale}.html`)) &&
      sitemap.includes(`/confidentialite/${locale}</loc>`),
  );
}

// Cloudflare Pages redirige `/page.html` vers `/page` : une URL publiee avec
// extension est donc une URL qui redirige. Declarer celle-la en canonical, en
// hreflang ou au sitemap revient a designer a Google une adresse qui n'est pas
// celle qu'il indexe — regression deja vue, et parfaitement muette.
const sitemapHtml = [...sitemap.matchAll(/<loc>([^<]*\.html)<\/loc>/g)].map((m) => m[1]);
check(
  'aucune URL du sitemap ne porte l\'extension .html',
  sitemapHtml.length === 0,
  sitemapHtml.slice(0, 5).join(', '),
);

const canonicals = surfaces
  .map((rel) => ({ rel, m: /<link rel="canonical" href="([^"]+)"/.exec(readFileSync(join(DIST, rel), 'utf8')) }))
  .filter((e) => e.m?.[1]?.endsWith('.html'));
check(
  'aucun canonical ne porte l\'extension .html',
  canonicals.length === 0,
  canonicals.slice(0, 5).map((e) => e.rel).join(', '),
);

console.log('\nOrigine canonique');

// L'origine est ecrite a deux endroits que rien ne relie : `SITE_URL`
// (scripts/build-exercise-pages.ts) pour tout ce qui est genere, et des
// litteraux dans `index.html` — les balises SEO ne portent pas de `data-i18n`,
// donc `fillStaticTranslations()` ne les voit pas. Au passage a cirkali.fr,
// aucun des deux n'a suivi : chaque page a continue de se declarer canonique
// sur github.io, et le sitemap servi depuis cirkali.fr n'a liste que des URL
// d'un autre domaine. Rien ne cassait, donc personne ne l'a vu.
const STALE_ORIGIN = 'kallly.github.io';
const stale = (readdirSync(DIST, { recursive: true, encoding: 'utf8' }) as string[])
  .filter((rel) => /\.(html|xml|txt|json|js|css)$/.test(rel))
  .filter((rel) => statSync(join(DIST, rel)).isFile())
  .filter((rel) => readFileSync(join(DIST, rel), 'utf8').includes(STALE_ORIGIN));
check(`aucun fichier ne cite ${STALE_ORIGIN}`, stale.length === 0, stale.slice(0, 10).join(', '));

console.log(
  failures === 0
    ? `\n${pages} pages d'exercice, tout est conforme.\n`
    : `\n${failures} verification(s) en echec.\n`,
);
process.exit(failures === 0 ? 0 : 1);
