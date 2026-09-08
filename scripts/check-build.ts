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
import { GROUP_IDS, GROUP_TREE } from '../src/data/groups';
import { LIBRARY } from '../src/data/library';
import { figureSvg } from '../src/data/figures';
import { DETAILS_BY_LOCALE } from '../src/content/exercise-details';
import { AD_CLIENT, AD_MIN_WIDTH } from '../src/content/ad-rails';
import { DICTIONARIES } from '../src/i18n';
import { SITE_URL } from '../src/data/site';
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

// L'accueil porte SA propre specification `?s=` (le bloc `#aiPlan`), ecrite a
// la main et sans data-i18n — donc rien ne la relie a celle que
// `build-exercise-pages.ts` genere, ni au format reel. C'est pourtant elle que
// les modeles lisent en premier : `aiHelp.createPrompt` leur donne l'adresse
// de cette page, pas celle de la page de spec. Un exemple faux ou perime y
// coute plus cher qu'ailleurs, et les deux surfaces ont deja diverge une fois
// — la charge documentee partout sauf ici.
const homeLink = /[?&]s=([A-Za-z0-9_-]{40,})/.exec(index)?.[1];
check("l'accueil porte un lien ?s= d'exemple", Boolean(homeLink));
if (homeLink) {
  const homePlan = decodeSharedPlan(homeLink);
  check(
    "l'exemple de l'accueil se decode par decodeSharedPlan()",
    homePlan !== null && homePlan.items.length > 0,
    homePlan === null ? 'decodeSharedPlan() renvoie null' : 'aucun exercice',
  );
  // La charge y est le seul element qui vive en DIXIEME position : si la
  // chaine vide de la neuvieme sautait, tout se decalerait sans que rien
  // d'autre ne le montre.
  check(
    'et il porte une charge, comme la ligne de format juste au-dessus',
    homePlan !== null &&
      homePlan.items.some((item) => item.type === 'exercise' && item.weight !== undefined),
    'aucune ligne chargee dans l\'exemple de l\'accueil',
  );
  check(
    "la specification de l'accueil annonce la charge",
    index.includes('nomPerso?, charge?'),
    'le bloc #aiPlan decrit encore une ligne a neuf positions',
  );
}

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
    // Et il doit porter une ligne CHARGEE. C'est la seule chose qui prouve
    // que la 10e position se decode reellement — donc que la chaine vide
    // poussee en 9e sur un exercice de la bibliotheque n'a decale aucune
    // autre valeur. Un exemple sans charge laisserait passer un encodeur qui
    // la perd en silence, et c'est cet exemple-la que les modeles recopient.
    check(
      'et il porte une charge, qui survit au decodage',
      decoded !== null &&
        decoded.items.some((item) => item.type === 'exercise' && item.weight !== undefined),
      'aucune ligne chargee dans l\'exemple',
    );
  }

  // La colonne « Fiche » du tableau des cles. Meme raison que pour llms.txt
  // plus bas : rien sur une fiche ne porte la cle interne, donc cette colonne
  // est la seule passerelle de cette page vers le contenu long. Les deux
  // surfaces destinees aux IA se verifient separement — la table HTML peut
  // perdre sa colonne sans que llms.txt bouge.
  const specSheets = [...spec.matchAll(/href="[^"]*\/exercises\/([a-z]{2})\/([^"]+)"/g)];
  const brokenSpecSheets = specSheets
    .filter(([, locale, slug]) => !existsSync(join(DIST, 'exercises', locale!, `${slug}.html`)))
    .map(([, , slug]) => slug!);
  check(
    `la page de spec mene aux ${LIBRARY.length} fiches`,
    specSheets.length === LIBRARY.length && brokenSpecSheets.length === 0,
    brokenSpecSheets.length > 0
      ? brokenSpecSheets.join(', ')
      : `${specSheets.length} liens pour ${LIBRARY.length} exercices`,
  );
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

// 404.html en est exclue, et c'est une regle et non un oubli : la politique
// AdSense interdit les annonces sur une page d'erreur, qui n'a pas de contenu.
const NO_ADS = ['404.html'];
const adSurfaces = surfaces.filter((rel) => !NO_ADS.includes(rel));
const withoutGate = adSurfaces.filter(
  (rel) => !readFileSync(join(DIST, rel), 'utf8').includes(`min-width: ${AD_MIN_WIDTH}px`),
);
check(
  `les ${adSurfaces.length} pages livrees portent le portillon publicitaire`,
  withoutGate.length === 0,
  withoutGate.slice(0, 5).join(', '),
);
const errorWithAds = NO_ADS.filter(
  (rel) =>
    existsSync(join(DIST, rel)) && readFileSync(join(DIST, rel), 'utf8').includes('adsbygoogle'),
);
check('aucune publicite sur la page d\'erreur', errorWithAds.length === 0, errorWithAds.join(', '));

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

// Sans 404.html a la racine, Cloudflare Pages sert l'accueil en 200 pour toute
// adresse inconnue : un lien casse devient indetectable et Google indexe des
// URL fantomes. Sa seule presence suffit a retablir un vrai 404.
const notFound = join(DIST, '404.html');
check('dist/404.html existe', existsSync(notFound));
// La page seule ne suffit pas — verifie en production : Workers Static Assets
// sert index.html en 200 pour toute adresse inconnue tant que
// `not_found_handling` n'est pas pose. Sans cette ligne, `404.html` n'est
// qu'un fichier decoratif que personne n'atteint jamais. Seule assertion du
// fichier qui ne porte pas sur `dist/` : la sortie est correcte, c'est ce qui
// la sert qui ne l'etait pas.
const wrangler = join(process.cwd(), 'wrangler.jsonc');
check(
  'wrangler.jsonc renvoie les adresses inconnues en 404',
  existsSync(wrangler) && /"not_found_handling"\s*:\s*"404-page"/.test(readFileSync(wrangler, 'utf8')),
);
check(
  '404.html porte noindex et n\'est pas au sitemap',
  existsSync(notFound) &&
    readFileSync(notFound, 'utf8').includes('name="robots" content="noindex"') &&
    !sitemap.includes('404'),
);

// IndexNow : la cle doit etre lisible a la racine du domaine, c'est la preuve
// de propriete. Si le fichier disparait ou que son contenu ne correspond plus
// au nom, les moteurs repondent 403 et les soumissions sont rejetees en
// silence — `npm run indexnow` a l'air de marcher, mais rien n'est pris.
const INDEXNOW_KEY = 'aa22ab05496f4b5bb923774108f40cc8';
const keyFile = join(DIST, `${INDEXNOW_KEY}.txt`);
check(
  'la cle IndexNow est servie a la racine',
  existsSync(keyFile) && readFileSync(keyFile, 'utf8').trim() === INDEXNOW_KEY,
);

// Un `.txt` ne peut pas dire son encodage de l'interieur, contrairement au HTML
// (`<meta charset>`) et au XML (sa declaration) : sans `charset` dans l'en-tete,
// Cloudflare sort un `text/plain` nu et le navigateur retombe sur l'encodage par
// defaut de sa locale — windows-1252 en France, donc « sÃ©ance ». C'est arrive a
// llms.txt, le fichier meme qu'on adresse aux IA. La regle vit dans
// `public/_headers` ; on verifie ici qu'aucun .txt accentue n'y manque, plutot
// que de figer une liste de noms qui divergerait au prochain fichier ajoute.
const headers = existsSync(join(DIST, '_headers'))
  ? readFileSync(join(DIST, '_headers'), 'utf8')
  : '';
const accentedTxt = readdirSync(DIST).filter(
  (name) => name.endsWith('.txt') && /[^\u0000-\u007F]/.test(readFileSync(join(DIST, name), 'utf8')),
);
const withoutCharset = accentedTxt.filter(
  (name) => !new RegExp(`^/${name}\\s*\\n\\s*Content-Type: text/plain; charset=utf-8$`, 'm').test(headers),
);
check(
  `les ${accentedTxt.length} .txt accentues sont servis en charset=utf-8`,
  accentedTxt.length > 0 && withoutCharset.length === 0,
  withoutCharset.join(', '),
);

console.log('\nFigures d\'exercice');

// Trois conventions de dessin qu'aucun type ne peut tenir : elles portent sur le
// contenu d'un litteral de chaine. La premiere s'etait deja degradee en silence
// — 26 exercices sur 62 la contredisaient — parce que rien ne la verifiait.
const figures = new Map(LIBRARY.map((e) => [e.key, figureSvg(e.key)]));

// 1. La fleche dit ce qui bouge, son absence dit que la position se tient.
const wrongArrow = LIBRARY.filter(
  (e) => figures.get(e.key)!.includes('class="ar"') !== (e.motion === 'move'),
).map((e) => `${e.key} (${e.motion})`);
check(
  'chaque mouvement porte une fleche, chaque tenue n\'en porte pas',
  wrongArrow.length === 0,
  wrongArrow.join(', '),
);

// 2. `.pull` marque le sens ou tirer pour s'installer, pas un geste a repeter :
// il n'a de sens que sur une tenue.
const wrongPull = LIBRARY.filter(
  (e) => figures.get(e.key)!.includes('class="pull"') && e.motion !== 'hold',
).map((e) => e.key);
check('la marque de tension ne vit que sur une tenue', wrongPull.length === 0, wrongPull.join(', '));

// 3. Toutes les figures de profil regardent du meme cote. Sept regardaient a
// droite ; dans la bibliotheque, filtree par groupe, elles s'affichaient a cote
// de leurs voisines et obligeaient l'oeil a se reorienter a chaque vignette.
const wrongFacing = LIBRARY.filter((e) => {
  const head = figures.get(e.key)!.match(/class="hd" cx="([\d.]+)"/);
  return head !== null && Number(head[1]) > 105;
}).map((e) => e.key);
check('aucune figure ne regarde a droite', wrongFacing.length === 0, wrongFacing.join(', '));

// 4. Le bloc `.fig-svg` existe en deux exemplaires — le bundle et la feuille des
// pages generees, hors bundle — pour la meme raison que les @font-face. Deux
// copies derivent : c'est exactement ce qui etait arrive aux cinq blocs que
// cette factorisation a remplaces, dont deux avaient change de teinte sans que
// ce soit une decision.
// Le selecteur doit commencer la ligne : `.carousel-card .fig-svg` et
// `.libcard .fig-svg` sont les ajustements propres a une surface, pas le socle
// partage, et n'ont aucune raison d'exister des deux cotes.
const figRules = (css: string): string =>
  (css.replace(/\/\*[\s\S]*?\*\//g, '').match(/^\.fig-svg[^{]*\{[^}]*\}/gm) ?? [])
    .join('')
    .replace(/\s+/g, '');
const bundleRules = figRules(readFileSync(join(process.cwd(), 'src/styles/base.css'), 'utf8'));
const pageRules = figRules(readFileSync(join(process.cwd(), 'src/content/exercise-page.css'), 'utf8'));
check(
  'les deux copies du bloc .fig-svg sont identiques',
  bundleRules.length > 0 && bundleRules === pageRules,
  'base.css et exercise-page.css ont diverge',
);

// 5. Sans la classe posee par figureSvg(), les quatre regles ci-dessus n'ont
// aucune prise sur ce qui est livre : les <path> du corps reprennent le `fill`
// noir par defaut du SVG, invisible sur le fond sombre et bien visible sur le
// theme clair.
const figPages = (readdirSync(join(DIST, 'exercises'), { recursive: true, encoding: 'utf8' }) as string[])
  .filter((rel) => rel.endsWith('.html'));
const sansClasse = figPages.filter(
  (rel) => !readFileSync(join(DIST, 'exercises', rel), 'utf8').includes('class="fig-svg"'),
);
check(
  `les ${figPages.length} fiches livrent des figures classees fig-svg`,
  figPages.length > 0 && sansClasse.length === 0,
  sansClasse.slice(0, 5).join(', '),
);

// Les exercices crees a la main sont remontes (cloud/exercise-feedback.ts).
// Deux choses peuvent casser en silence : la declaration disparait des pages
// de confidentialite, ou les regles refusent un groupe pourtant valide.
const withoutNotice = (Object.keys(DICTIONARIES) as Locale[]).filter((locale) => {
  const page = join(DIST, `confidentialite/${locale}.html`);
  return !existsSync(page) || !readFileSync(page, 'utf8').includes(DICTIONARIES[locale].privacy.libraryTitle);
});
check(
  'la collecte des exercices perso est declaree dans les 5 langues',
  withoutNotice.length === 0,
  withoutNotice.join(', '),
);

// L'autre moitie : `customExercises` est la seule collection ecrivable sans
// compte, et c'est `firestore.rules` qui en borne la forme.
//
// Meme statut que l'assertion `wrangler.jsonc` plus haut — elle ne porte pas
// sur `dist/`, et elle ne prouve rien de la PRODUCTION : ce fichier n'est
// qu'une trace, la CI ne le deploie pas, seule compte la regle collee dans la
// console. Mais une trace amputee garantit qu'on recollera un jour une regle
// trouee, et un verrou retire ici ne casse strictement rien de visible.
const rulesPath = join(process.cwd(), 'firestore.rules');
const rulesText = existsSync(rulesPath) ? readFileSync(rulesPath, 'utf8') : '';
const guards: [string, RegExp][] = [
  ['la collection est reglee', /match \/customExercises\/\{slug\}/],
  ['illisible et ineffacable', /allow read, delete: if false;/],
  ['horodatages types', /firstAt is timestamp[\s\S]*lastAt is timestamp/],
  ['compteur montant de un', /count == resource\.data\.count \+ 1/],
  ['refus par defaut', /match \/\{document=\*\*\}[\s\S]*allow read, write: if false;/],
];
const openGuards = guards.filter(([, pattern]) => !pattern.test(rulesText)).map(([label]) => label);
check(
  `firestore.rules garde ses ${guards.length} verrous`,
  rulesText !== '' && openGuards.length === 0,
  rulesText === '' ? 'fichier absent' : openGuards.join(', '),
);

// Les groupes musculaires forment un arbre a deux etages (src/data/groups.ts),
// et deux choses le trahissent sans rien casser.
//
// 1. Une entree de LIBRARY rangee dans un groupe large. Le catalogue doit
// nommer la zone precise : le parent existe pour l'exercice perso de quelqu'un
// qui ne veut pas trancher, pas pour une fiche qu'on redige a tete reposee.
// Un `upper` glisse ici ferait recouvrir tout le haut du corps en mode circuit,
// et la seance perdrait son alternance sans qu'aucune erreur ne s'affiche.
const wideEntries = LIBRARY.filter((entry) =>
  GROUP_TREE.some((node) => node.children.length > 0 && node.id === entry.group),
).map((entry) => entry.key);
check(
  'aucun exercice de la bibliotheque n\'est range dans un groupe large',
  wideEntries.length === 0,
  wideEntries.join(', '),
);

// 2. L'arbre aplati dans ce que lisent les IA. `llms.txt` est leur porte
// d'entree : douze identifiants de meme rang y laisseraient croire a douze
// zones distinctes, et un developpe couche partirait dans `upper` aussi
// volontiers que dans `push`.
const llms = readFileSync(join(DIST, 'llms.txt'), 'utf8');
const missingGroup = GROUP_IDS.filter((id) => !llms.includes(`- ${id} — `));
check(
  `llms.txt declare les ${GROUP_IDS.length} groupes`,
  missingGroup.length === 0,
  missingGroup.join(', '),
);
// 3. La passerelle entre la cle interne et le contenu long. Une fiche ne porte
// NULLE PART son `catCow` : une IA qui lit /exercises/fr/chat-vache n'a aucun
// moyen d'en revenir a la cle, et le piege est documente (voir
// `humanizeUnknownKey()`, core/storage.ts — un modele avait deja envoye des
// slugs a la place des cles). llms.txt est le seul endroit qui relie les deux ;
// un slug renomme y casserait les 62 chemins sans que rien ne le dise.
const sheetPaths = [...llms.matchAll(/^- \S+ \([^)]*\) — .* — (\/exercises\/\S+)$/gm)].map(
  (match) => match[1]!,
);
const missingSheets = sheetPaths.filter((path) => !existsSync(join(DIST, `${path}.html`)));
check(
  `llms.txt mene aux ${LIBRARY.length} fiches, et elles existent`,
  sheetPaths.length === LIBRARY.length && missingSheets.length === 0,
  missingSheets.length > 0
    ? missingSheets.join(', ')
    : `${sheetPaths.length} chemins pour ${LIBRARY.length} exercices`,
);

// 4. Quels exercices se reglent en poids. Une IA qui ecrit un lien doit savoir
// ou une charge est legitime : la marque « charge » de la liste est sa seule
// source, et elle derive de `load` (data/library.ts). Un drapeau ajoute sans
// que la liste bouge, c'est un exercice pour lequel personne ne proposera
// jamais de charge.
const loadedKeys = LIBRARY.filter((entry) => entry.load).map((entry) => entry.key);
const markedKeys = [...llms.matchAll(/^- (\S+) \([^)]*, charge\)/gm)].map((match) => match[1]!);
check(
  `llms.txt marque « charge » sur les ${loadedKeys.length} exercices concernes`,
  markedKeys.length === loadedKeys.length && loadedKeys.every((key) => markedKeys.includes(key)),
  `${markedKeys.length} marques pour ${loadedKeys.length} exercices declares`,
);

check(
  'llms.txt dit quels groupes en regroupent d\'autres',
  GROUP_TREE.filter((node) => node.children.length > 0).every((node) =>
    llms.includes(`regroupe ${node.children.join(', ')}`),
  ),
  'la hierarchie a disparu de llms.txt',
);

// Zones sures : `env(safe-area-inset-*)` ne repond PAS dans le WebView
// d'Android — le plugin SystemBars de Capacitor pose a la place des
// proprietes personnalisees du meme nom sur `documentElement`. Une feuille qui
// ecrit `env(...)` en direct produit donc un ecart invisible partout sauf sur
// un telephone Android, ou les boutons passent sous les icones de batterie.
// C'est exactement ce qui est arrive au premier APK. `tokens.css` est le seul
// endroit ou l'`env()` a le droit d'apparaitre : il l'enferme dans une
// variable que les deux plateformes savent remplir.
const STYLE_DIR = join(process.cwd(), 'src', 'styles');
// Commentaires retires d'abord : `base.css` EXPLIQUE pourquoi l'onglet d'aide
// n'est plus hors flux, et cite `env(safe-area-inset-*)` en prose. Une
// mention n'est pas un appel.
const withoutComments = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, '');
const strayEnv = readdirSync(STYLE_DIR)
  .filter((name) => name.endsWith('.css') && name !== 'tokens.css')
  .filter((name) =>
    /env\(\s*safe-area-inset/.test(withoutComments(readFileSync(join(STYLE_DIR, name), 'utf8'))),
  );
check(
  'aucune feuille hors tokens.css n\'appelle env(safe-area-inset-*)',
  strayEnv.length === 0,
  `${strayEnv.join(', ')} — utiliser var(--safe-area-inset-*)`,
);

console.log('\nInstallation hors ligne');

// Le manifeste et le service worker sont ce qui rend le site installable, et
// ce sur quoi s'appuie le portage mobile. Ni l'un ni l'autre n'a de type qui
// les protege : un manifeste au JSON casse, une icone absente ou un `sw.js`
// oublie par le build ne cassent RIEN de visible — le site continue de
// s'afficher, il cesse simplement d'etre installable, et personne ne s'en
// apercoit avant de chercher pourquoi le bouton « Installer » a disparu.
const manifestPath = join(DIST, 'manifest.webmanifest');
check('dist/manifest.webmanifest est livre', existsSync(manifestPath));

if (existsSync(manifestPath)) {
  let manifest: Record<string, unknown> | null = null;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as Record<string, unknown>;
  } catch {
    manifest = null;
  }
  check('le manifeste est du JSON valide', manifest !== null);

  const icons = (manifest?.['icons'] ?? []) as { src?: string; purpose?: string }[];
  const missing = icons
    .map((icon) => icon.src ?? '')
    .filter((src) => src !== '' && !existsSync(join(DIST, src)));
  check(
    `les ${icons.length} icones du manifeste existent dans dist/`,
    icons.length >= 2 && missing.length === 0,
    missing.join(', '),
  );

  // Une icone `maskable` n'est pas un confort : sans elle, Android recadre
  // l'icone « any » dans un cercle et rogne l'anneau du chrono, qui est tout
  // le dessin.
  check(
    'le manifeste porte une icone maskable',
    icons.some((icon) => (icon.purpose ?? '').split(' ').includes('maskable')),
  );

  // `base: './'` (vite.config.ts) tient tout le site en chemins relatifs pour
  // qu'il survive a un deploiement ailleurs qu'a la racine d'un domaine. Une
  // URL absolue ici rouvrirait le trou par le manifeste.
  const absolute = ['start_url', 'scope']
    .map((key) => [key, String(manifest?.[key] ?? '')] as const)
    .filter(([, value]) => value.startsWith('/') || /^https?:/.test(value));
  check(
    'start_url et scope restent relatifs',
    absolute.length === 0,
    absolute.map(([key, value]) => `${key}=${value}`).join(', '),
  );
}

check('index.html lie le manifeste', index.includes('rel="manifest"'));
check('dist/sw.js est livre', existsSync(join(DIST, 'sw.js')));

// Un service worker mis en cache longtemps est le seul fichier du site dont
// une erreur ne se rattrape pas depuis le serveur : voir public/_headers.
// `headers` est deja lu plus haut, pour les .txt accentues.
check(
  '_headers empeche la mise en cache de sw.js',
  /\/sw\.js\s*\n\s*Cache-Control:[^\n]*max-age=0/.test(headers),
);

// Les cinq sections de fin d'accueil doivent etre livrees OUVERTES. C'est
// `ui/app.ts` qui les replie au demarrage, et l'inverse serait une regression
// silencieuse : les outils de navigation de ChatGPT, Claude et Gemini
// recuperent ce fichier sans executer un octet de src/, et plusieurs extraient
// l'innerText d'un rendu sans JS — or le contenu d'un <details> FERME n'y
// figure pas. Replier la specification `?s=` dans la source, c'est la retirer
// a son unique public, sans que rien ne casse par ailleurs.
const SECTIONS = ['about', 'allGuides', 'aiPlan', 'installApp', 'supportProject'];
const notOpen = SECTIONS.filter(
  (id) => !new RegExp(`<details[^>]*id="${id}"[^>]*\\sopen>`).test(index),
);
check(
  'les sections de fin d\'accueil sont livrees ouvertes',
  notOpen.length === 0,
  `${notOpen.join(', ')} — c'est ui/app.ts qui replie, pas le HTML`,
);

console.log("\nEncarts d'installation et de soutien");

// Deux encarts de fin d'accueil, dont le texte francais est injecte au build
// depuis fr.ts. Un `data-i18n` mal orthographie ne casse rien de visible : le
// build echoue, certes, mais un encart SUPPRIME par megarde ne fait echouer
// personne — la page se contente d'etre plus courte, et l'appel au soutien
// disparait sans bruit.
const DICT_FR = DICTIONARIES.fr;
check(
  "l'accueil explique comment installer l'application",
  index.includes(DICT_FR.install.chrome) && index.includes(DICT_FR.install.ios),
);
check(
  "l'accueil dit que les versions natives ont un cout",
  index.includes(DICT_FR.install.native),
);
check("l'accueil porte l'encart de soutien", index.includes(DICT_FR.support.text));

// Deux liens attendus, et deux seulement : celui de l'encart d'installation
// (« aider a financer la publication ») et celui de l'encart de soutien.
const kofi = index.split('https://ko-fi.com/cirkali').length - 1;
check('les deux liens Ko-fi sont livres', kofi === 2, `${kofi} trouve(s)`);

// `target="_blank"` sans `rel` laisse la page ouverte manipuler `window.opener`.
// Les navigateurs recents l'impliquent, les anciens non, et ca ne coute rien.
const blanks = [...index.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map((m) => m[0]);
check(
  'chaque lien en nouvel onglet porte rel="noopener"',
  blanks.length > 0 && blanks.every((tag) => /rel="[^"]*noopener/.test(tag)),
  blanks.filter((tag) => !/rel="[^"]*noopener/.test(tag)).join(' '),
);

console.log("\nLiens d'application");

// `/.well-known/assetlinks.json` est ce qui fait qu'un lien cirkali.fr ouvre
// l'application Android au lieu du navigateur. C'est un fichier que SEUL LE
// SITE peut servir — l'application ne peut pas se declarer elle-meme, c'est
// tout le principe — et il vit donc dans `public/`, loin du reste du portage
// mobile. Un chemin en `.well-known` commence par un point : c'est exactement
// le genre de dossier qu'un outil de copie saute en silence.
//
// Rien ne casse s'il disparait : les liens se remettent simplement a ouvrir le
// navigateur, donc a importer la seance dans le SITE et pas dans
// l'application. Personne ne le signalerait.
const assetLinksPath = join(DIST, '.well-known', 'assetlinks.json');
check('dist/.well-known/assetlinks.json est livre', existsSync(assetLinksPath));

if (existsSync(assetLinksPath)) {
  type AssetLink = {
    relation?: string[];
    target?: { namespace?: string; package_name?: string; sha256_cert_fingerprints?: string[] };
  };
  let links: AssetLink[] = [];
  try {
    links = JSON.parse(readFileSync(assetLinksPath, 'utf8')) as AssetLink[];
  } catch {
    links = [];
  }
  const android = links.filter((l) => l.target?.namespace === 'android_app');
  check(
    'il declare le paquet fr.cirkali.app',
    android.some((l) => l.target?.package_name === 'fr.cirkali.app'),
  );
  // Une empreinte SHA-256 s'ecrit en 32 octets separes par des deux-points, en
  // majuscules. Android rejette silencieusement toute autre forme — et « rejette
  // silencieusement » veut dire : les liens ouvrent le navigateur, sans erreur
  // nulle part.
  const fingerprints = android.flatMap((l) => l.target?.sha256_cert_fingerprints ?? []);
  check(
    'chaque empreinte est un SHA-256 bien forme',
    fingerprints.length > 0 && fingerprints.every((f) => /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(f)),
    fingerprints.filter((f) => !/^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(f)).join(', '),
  );
  check(
    'la relation demandee est bien handle_all_urls',
    android.every((l) => (l.relation ?? []).includes('delegate_permission/common.handle_all_urls')),
  );
}

// Un `Disallow` sur `.well-known` n'empecherait pas Android de lire le
// fichier, mais c'est le meme dossier qui portera l'association iOS et, un
// jour, d'autres protocoles : le bloquer aux robots n'a aucun benefice et se
// paie au premier qui en depend.
check(
  'robots.txt ne bloque pas /.well-known/',
  !/^\s*Disallow:\s*\/\.well-known/im.test(readFileSync(join(DIST, 'robots.txt'), 'utf8')),
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

// L'un des deux endroits est desormais partage : `SITE_URL` vit dans
// `src/data/site.ts` et sert a la fois les pages generees et le bundle
// navigateur, qui en a besoin depuis le portage mobile (`platform/native.ts` :
// dans le WebView, `location.origin` vaut `https://localhost`). Restent les
// litteraux d'`index.html`, qu'aucun code ne peut atteindre — d'ou cette
// assertion, qui les tient a la meme valeur. Sans elle, un futur changement de
// domaine se ferait a moitie, exactement comme le precedent.
const homeOrigins = [...index.matchAll(/https:\/\/[a-z0-9.-]+/gi)]
  .map((m) => m[0])
  .filter((origin) => /(^https:\/\/([a-z0-9-]+\.)*cirkali\.fr$)|github\.io/i.test(origin));
const wrongOrigins = [...new Set(homeOrigins.filter((origin) => origin !== SITE_URL))];
check(
  `les litteraux d'origine d'index.html disent tous ${SITE_URL}`,
  homeOrigins.length > 0 && wrongOrigins.length === 0,
  homeOrigins.length === 0 ? 'aucun litteral trouve' : wrongOrigins.join(', '),
);

console.log(
  failures === 0
    ? `\n${pages} pages d'exercice, tout est conforme.\n`
    : `\n${failures} verification(s) en echec.\n`,
);
process.exit(failures === 0 ? 0 : 1);
