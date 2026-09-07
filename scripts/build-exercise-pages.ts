/**
 * Genere une page HTML statique et autonome par exercice, plus le sitemap et
 * un recapitulatif des prompts d'image. Lance apres `vite build` (voir
 * package.json) : ecrit directement dans dist/, qui existe deja a ce stade.
 *
 * Pourquoi statique plutot qu'une route client : ces pages doivent etre
 * crawlables sans JavaScript et referencees individuellement dans le
 * sitemap -- exactement le probleme deja documente pour l'app elle-meme
 * dans CLAUDE.md (hreflang). Une route SPA ne conviendrait pas.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LIBRARY, type LibraryEntry } from '../src/data/library';
import { GROUP_IDS } from '../src/data/groups';
import { encodeSharedPlan } from '../src/core/share';
import type { ExerciseItem, PlanItem } from '../src/core/types';
import { figureSvg } from '../src/data/figures';
import { groupColor } from '../src/data/groups';
import type { ExerciseKey, GroupId, Locale } from '../src/core/types';
import { DICTIONARIES, type Translations } from '../src/i18n';
import { DETAILS_BY_LOCALE, type ExerciseDetail } from '../src/content/exercise-details';
import { imagePrompt } from '../src/content/image-prompts';
import { AD_SLOTS, adRailsScript } from '../src/content/ad-rails';

/**
 * Locales Open Graph, langue + territoire. Table explicite et non
 * `${locale}_${locale.toUpperCase()}` : ce raccourci marche par coincidence
 * pour fr/es/de/it, dont le code pays coincide avec le code langue, mais
 * produit `en_EN` pour l'anglais — or « EN » n'est pas un code pays
 * ISO 3166-1, et la valeur est donc invalide.
 */
const OG_LOCALES: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
  de: 'de_DE',
  it: 'it_IT',
};

/**
 * Origine canonique publiee. Elle commande les canonical, hreflang, og:*,
 * JSON-LD, fil d'Ariane, sitemap et llms.txt de toutes les pages generees.
 *
 * Le site a longtemps vecu sur kallly.github.io/SRCR et cette constante n'a pas
 * suivi le passage a cirkali.fr : pendant ce temps chaque page disait a Google
 * que sa version de reference etait l'ancienne adresse, et le sitemap servi
 * depuis cirkali.fr n'y listait que des URL d'un autre domaine — donc rejete.
 * Les memes valeurs vivent en litteral dans `index.html` (les balises SEO ne
 * passent pas par `fillStaticTranslations()`), d'ou l'assertion de
 * `scripts/check-build.ts` qui interdit l'ancienne origine dans `dist/`.
 */
const SITE_URL = 'https://cirkali.fr';

/**
 * Les URL publiees n'ont PAS d'extension, alors que les fichiers ecrits sur le
 * disque, eux, gardent leur `.html`. C'est l'hebergeur qui fait la
 * correspondance, et il la fait dans ce sens-la : Cloudflare Pages sert
 * `dist/exercises/fr/pompes.html` a l'adresse `/exercises/fr/pompes` et
 * REDIRIGE `/exercises/fr/pompes.html` vers elle, en 307.
 *
 * Tant que les balises declaraient la forme avec extension, chaque canonical,
 * chaque hreflang et les 317 entrees du sitemap designaient une URL qui
 * redirige, pendant que Google indexait l'autre — l'incoherence exacte qui
 * laisse une page en « Detectee, actuellement non indexee ». Rien ne cassait,
 * donc rien ne le signalait.
 *
 * Verifie sur les trois environnements avant d'etre adopte : Cloudflare Pages,
 * GitHub Pages et `vite preview` servent tous les deux formes, seule la forme
 * courte est stable. `check-build.ts` interdit desormais l'extension dans le
 * sitemap.
 */
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

/** Langue source : la seule garantie d'avoir du contenu pour chaque exercice. */
const SOURCE_LOCALE: Locale = 'fr';

/**
 * Adresse de contact publiee dans la page de confidentialite. Un texte RGPD
 * sans destinataire ne vaut rien : c'est par la qu'une demande de suppression
 * arrive. A faire suivre vers une boite reellement relevee.
 */
const CONTACT_EMAIL = 'contact@cirkali.fr';

/** Identifiant de mesure GA, cite tel quel dans la page de confidentialite. */
const GA_MEASUREMENT_ID = 'G-QVCTZFCKBL';

/** Slug du repertoire des pages de confidentialite, une page par langue. */
const PRIVACY_DIR = 'confidentialite';

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

/**
 * esc() echappe pour du texte HTML, pas pour du JSON : a l'interieur d'un
 * <script>, les entites HTML ne sont jamais decodees, donc &quot; resterait
 * une chaine litterale au lieu de devenir un guillemet et casserait le JSON.
 * JSON.stringify() produit du JSON valide ; seul `<` est encore echappe en
 * < pour empecher un `</script>` dans une valeur de fermer la balise
 * prematurement.
 */
function jsonLd(value: unknown): string {
  return JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
}

/**
 * Sections optionnelles : rendues seulement si le contenu existe. Une
 * mobilite ou du cardio n'ont pas de "progression" au sens d'un exercice de
 * force — mieux vaut une section absente qu'une section de remplissage.
 */
function renderProgression(detail: ExerciseDetail, dict: Translations): string {
  const p = detail.progression;
  if (!p) return '';
  const rows = [
    p.easier ? `        <li><b>${esc(dict.page.easier)} :</b> ${esc(p.easier)}</li>` : '',
    p.harder ? `        <li><b>${esc(dict.page.harder)} :</b> ${esc(p.harder)}</li>` : '',
    p.readyWhen ? `        <li><b>${esc(dict.page.readyWhen)} :</b> ${esc(p.readyWhen)}</li>` : '',
  ].filter(Boolean);
  if (rows.length === 0) return '';
  return `
      <h2>${esc(dict.page.progression)}</h2>
      <ul class="progression">
${rows.join('\n')}
      </ul>
`;
}

function renderPrecautions(detail: ExerciseDetail, dict: Translations): string {
  if (!detail.precautions) return '';
  return `
      <h2>${esc(dict.page.precautions)}</h2>
      <p class="precautions">${esc(detail.precautions)}</p>
`;
}

/**
 * Balises hreflang d'une fiche : declare toutes les langues qui ont
 * reellement une page pour cet exercice, plus x-default.
 *
 * Longtemps impossible et documente comme tel : hreflang n'a de sens que si
 * chaque langue a sa propre URL. C'est desormais le cas pour les fiches
 * (exercises/<locale>/<slug>.html), contrairement a l'app elle-meme qui
 * reste sur une URL unique. Chaque page declare aussi sa propre langue :
 * un ensemble hreflang sans auto-reference est ignore par Google.
 */
function hreflangTags(key: ExerciseKey): string {
  const available = (Object.keys(DETAILS_BY_LOCALE) as Locale[]).filter(
    (l) => DETAILS_BY_LOCALE[l]?.[key],
  );
  if (available.length < 2) return '';

  const tag = (hreflang: string, l: Locale) =>
    `    <link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}/exercises/${l}/${DETAILS_BY_LOCALE[l]![key]!.slug}" />`;

  const lines = available.map((l) => tag(l, l));
  // x-default pointe vers la langue source, celle qui a toujours du contenu.
  if (available.includes(SOURCE_LOCALE)) lines.push(tag('x-default', SOURCE_LOCALE));
  return lines.join('\n');
}

function libraryEntry(key: ExerciseKey) {
  const entry = LIBRARY.find((e) => e.key === key);
  if (!entry) throw new Error(`Aucune entree LIBRARY pour la cle "${key}" (exercise-details en a une en trop).`);
  return entry;
}

function carouselCard(key: ExerciseKey, dict: Translations, detail: ExerciseDetail): string {
  const name = dict.exercise[key]?.name ?? key;
  return `<a class="carousel-card" href="${detail.slug}">
  <span class="cfig">${figureSvg(key)}</span>
  <span class="cb">
    <span class="cn">${esc(name)}</span>
    <span class="cd">${esc(detail.muscles.primary)}</span>
  </span>
</a>`;
}

/** Cartes maximum dans le carrousel « exercices similaires ». */
const SIMILAR_MAX = 6;

/**
 * Voisins de meme groupe musculaire, plafonnes et tournants.
 *
 * Sans plafond, un groupe fourni faisait exploser la page : chaque carte
 * inline sa figure SVG (~650 o), donc a 13 membres le carrousel pesait 46 %
 * du HTML — le meme bloc quasi identique repete sur les 13 fiches du groupe,
 * ce qui est autant un probleme de poids que de contenu duplique.
 *
 * Rotation circulante plutot que « les N premiers » : chaque fiche pointe
 * vers les N suivantes dans l'ordre de LIBRARY, modulo la taille du groupe.
 * Chaque fiche recoit donc exactement autant de liens qu'elle en emet, aucune
 * n'est orpheline et aucune ne monopolise — ce qu'un simple `.slice(0, N)`
 * ne garantit pas. Deterministe d'un build a l'autre, l'ordre de LIBRARY ne
 * dependant pas de la langue.
 *
 * Le filtre `all[e.key]` est, lui, propre a la langue : si une langue prend
 * du retard sur le contenu long, sa topologie de liens differera des autres.
 */
function pickSimilar(
  key: ExerciseKey,
  group: GroupId,
  all: Partial<Record<ExerciseKey, ExerciseDetail>>,
): LibraryEntry[] {
  const members = LIBRARY.filter((e) => e.group === group && all[e.key]);
  const self = members.findIndex((e) => e.key === key);
  if (self === -1) return [];
  if (members.length - 1 <= SIMILAR_MAX) return members.filter((e) => e.key !== key);
  return Array.from(
    { length: SIMILAR_MAX },
    (_, i) => members[(self + 1 + i) % members.length]!,
  );
}

function renderPage(locale: Locale, key: ExerciseKey, dict: Translations, all: Partial<Record<ExerciseKey, ExerciseDetail>>): string {
  const detail = all[key];
  if (!detail) throw new Error(`unreachable: ${key}`);
  const entry = libraryEntry(key);
  const name = dict.exercise[key]?.name ?? key;
  const groupLabel = dict.group[entry.group as GroupId] ?? entry.group;
  const equipmentLabel = dict.category[entry.category];
  // Remplacement par fonction, pas par chaine : une chaine de remplacement
  // ferait interpreter $&, $` ou $1 s'ils apparaissaient un jour dans un nom
  // d'exercice, en corrompant silencieusement la description.
  const description = dict.page.description.replace('{name}', () => name);
  const url = `${SITE_URL}/exercises/${locale}/${detail.slug}`;

  const similar = pickSimilar(key, entry.group, all);

  const carousel =
    similar.length > 0
      ? `<h2>${esc(dict.page.similar)}</h2>
<div class="carousel">
${similar.map((e) => carouselCard(e.key, dict, all[e.key]!)).join('\n')}
</div>`
      : '';

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="description" content="${esc(description)}" />
    <meta name="color-scheme" content="dark" />
    <meta name="theme-color" content="#0e1210" />
    <title>${esc(name)} — ${esc(dict.page.titleSuffix)} | CIRKALI</title>
    <link rel="canonical" href="${url}" />
${hreflangTags(key)}
    <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="../../favicon.ico" sizes="32x32" />

    <meta property="og:title" content="${esc(name)} — ${esc(dict.page.titleSuffix)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:site_name" content="CIRKALI" />
    <meta property="og:locale" content="${OG_LOCALES[locale]}" />
    <!--
      Image de partage : celle de l'app, faute d'illustration par exercice.
      Le jour ou les images generees existeront (voir docs/image-prompts.md),
      c'est ici qu'il faudra pointer vers celle de l'exercice courant.
    -->
    <meta property="og:image" content="${SITE_URL}/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="CIRKALI — planificateur et minuteur d’entraînement" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(name)} — ${esc(dict.page.titleSuffix)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE_URL}/og-image.png" />

    <script type="application/ld+json">
      ${jsonLd([
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name,
          description,
          url,
          inLanguage: locale,
          isPartOf: { '@type': 'WebApplication', name: 'CIRKALI', url: `${SITE_URL}/` },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'CIRKALI', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name, item: url },
          ],
        },
      ])}
    </script>

    <!--
      Polices servies par le site : @font-face dans exercise-page.css. Le
      preload les sort du bout de la chaine (HTML -> feuille -> police) ;
      L'attribut crossorigin est obligatoire meme en meme origine, une requete
      de police partant toujours en mode CORS. Voir index.html pour le detail.
    -->
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/archivo-latin.woff2" />
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/manrope-latin.woff2" />
    <link rel="stylesheet" href="../style.css" />
  </head>
  <body>
    <main class="wrap">
      <nav class="back" aria-label="${esc(dict.page.breadcrumb)}">
        <a href="${SITE_URL}/">${esc(dict.page.back)}</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">${esc(name)}</span>
      </nav>

      <span class="chip"><i style="background:${groupColor(entry.group)}"></i>${esc(groupLabel)}</span>
      <span class="chip" style="margin-left:8px">${esc(equipmentLabel)}</span>
      <h1>${esc(name)}</h1>

      <div class="fig">${figureSvg(key)}</div>

      <p class="muscles"><b>${esc(dict.exerciseInfo.muscles)} :</b> ${esc(detail.muscles.primary)}${
        detail.muscles.secondary ? ` <span>· ${esc(detail.muscles.secondary)}</span>` : ''
      }</p>

      <h2>${esc(dict.page.howTo)}</h2>
      <ol>
${detail.steps.map((s) => `        <li>${esc(s)}</li>`).join('\n')}
      </ol>

      <h2>${esc(dict.page.mistakes)}</h2>
      <ul class="mistakes">
${detail.mistakes.map((m) => `        <li>${esc(m)}</li>`).join('\n')}
      </ul>

      <h2>${esc(dict.page.sensation)}</h2>
      <p>${esc(detail.sensation)}</p>

      <h2>${esc(dict.page.rangeOfMotion)}</h2>
      <p>${esc(detail.rangeOfMotion)}</p>

      <h2>${esc(dict.page.tempo)}</h2>
      <p>${esc(detail.tempo)}</p>

      <h2>${esc(dict.page.anatomy)}</h2>
      <p>${esc(detail.anatomy)}</p>

      <h2>${esc(dict.page.mechanics)}</h2>
      <p>${esc(detail.mechanics)}</p>

      <h2>${esc(dict.page.benefits)}</h2>
      <ul>
${detail.benefits.map((b) => `        <li>${esc(b)}</li>`).join('\n')}
      </ul>
${renderProgression(detail, dict)}${renderPrecautions(detail, dict)}
      ${carousel}

      <footer>
        <p class="disclaimer">${esc(dict.page.disclaimer)}</p>
        <p class="ads-note">${esc(dict.ads.none)}</p>
        <a href="${SITE_URL}/">CIRKALI</a> — ${esc(dict.page.tagline)}
        · <a href="${SITE_URL}/${PRIVACY_DIR}/${locale}">${esc(dict.privacy.title)}</a>
      </footer>
    </main>
    ${adRailsScript(AD_SLOTS.pageLeft, AD_SLOTS.pageRight, dict.ads.label)}
  </body>
</html>
`;
}

/**
 * Page de specification du format de lien, pour les intelligences
 * artificielles a qui on donne l'URL du site.
 *
 * Pourquoi une page HTML et pas seulement un fichier de convention. Aucune
 * norme ne s'est imposee (llms.txt, ai.txt, agents.txt, /.well-known/*). Ces
 * fichiers s'ancrent a la RACINE du domaine, ce qui etait longtemps hors de
 * portee : le site vivait sous kallly.github.io/SRCR/, dont la racine
 * appartient a un autre projet. Depuis cirkali.fr c'est acquis — llms.txt est
 * bien servi a la racine — mais la page reste, et pour sa raison d'origine :
 * crawlable, inscrite au sitemap et atteignable par un <a> depuis l'accueil,
 * meme doctrine que les fiches d'exercice, du contenu qu'on trouve en suivant
 * un lien plutot qu'en devinant un nom de fichier.
 *
 * Francais uniquement, et c'est une divergence assumee de la regle « le
 * chrome des pages generees vient de l'i18n » : c'est une specification
 * technique dont tous les identifiants sont deja en anglais, et y faire
 * entrer sa prose dans le contrat i18n strict couterait cinq traductions
 * pour un lecteur (un modele) qui lit tres bien le francais.
 */
const AI_PAGE_SLUG = 'creer-une-seance-par-lien';
const AI_PAGE_TITLE = 'Créer une séance par lien';

/**
 * Reciproque de `toBase64Url()` (core/share.ts), pour un seul usage : relire
 * en clair l'exemple qu'on vient d'encoder (voir `aiExample()`). Reimplemente
 * ici plutot qu'importee, faute d'export dans core/share.ts, dont la version
 * s'appuie sur `atob` pour rester compatible navigateur — indisponible et
 * inutile ici, ce script tournant sous Node (`Buffer`).
 */
function decodeBase64Url(encoded: string): string {
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64').toString('utf8');
}

/**
 * Exemple de reference, ENCODE AU BUILD par `encodeSharedPlan()` — jamais
 * recopie a la main. C'est la seule facon de garantir que la chaine donnee
 * en exemple aux modeles decode reellement : un exemple faux serait pire que
 * pas d'exemple.
 */
function aiExample(): { json: string; encoded: string; url: string } {
  const line = (key: ExerciseKey, over: Partial<ExerciseItem> = {}): ExerciseItem => {
    const entry = libraryEntry(key);
    return {
      id: '',
      type: 'exercise',
      key: entry.key,
      group: entry.group,
      mode: entry.mode,
      sets: entry.sets,
      reps: entry.reps,
      seconds: entry.seconds,
      rest: entry.rest,
      ...over,
    };
  };
  const items: PlanItem[] = [
    line('kneePushup', { sets: 4, reps: 12, rest: 60 }),
    line('superman', { sets: 3, reps: 10, rest: 60 }),
    line('plank', { sets: 3, seconds: 45, rest: 60 }),
    { id: '', type: 'rest', seconds: 90 },
    {
      id: '',
      type: 'exercise',
      key: 'custom',
      customName: 'Burpees',
      group: 'cardio',
      mode: 'reps',
      sets: 3,
      reps: 10,
      seconds: 30,
      rest: 60,
    },
  ];
  const plan = {
    id: '',
    name: 'Haut du corps',
    items,
    config: { mode: 'circuit' as const, pause: 60, trans: 0 },
  };
  const encoded = encodeSharedPlan(plan);
  // Decode le base64url produit ci-dessus au lieu de reconstruire le JSON a
  // la main : piege deja rencontre une fois ici meme (un `json` tape a la
  // main a diverge silencieusement du payload reel qu'encode `encoded`,
  // malgre ce commentaire de fonction qui promettait l'inverse). Node fournit
  // `Buffer`, donc pas besoin de reimplementer `atob` comme le fait
  // core/share.ts (qui doit rester compatible navigateur).
  const json = decodeBase64Url(encoded);
  return { json, encoded, url: `${SITE_URL}/?s=${encoded}` };
}

/** Table des cles, derivee de LIBRARY : jamais une seconde liste a tenir a jour. */
function aiKeysTable(dict: Translations): string {
  return LIBRARY.map((e) => {
    const name = dict.exercise[e.key]?.name ?? e.key;
    const effort = e.mode === 'time' ? `${e.seconds} s` : `${e.reps} reps`;
    return `          <tr><td><code>${e.key}</code></td><td>${esc(name)}</td><td><code>${e.group}</code></td><td><code>${e.mode}</code></td><td>${e.sets} × ${effort}, repos ${e.rest} s</td></tr>`;
  }).join('\n');
}

function aiGroupsTable(dict: Translations): string {
  return GROUP_IDS.map(
    (id) => `          <tr><td><code>${id}</code></td><td>${esc(dict.group[id])}</td></tr>`,
  ).join('\n');
}

function renderAiPlanPage(dict: Translations): string {
  const url = `${SITE_URL}/${AI_PAGE_SLUG}`;
  const description =
    `Format du lien qui crée une séance dans CIRKALI : structure JSON, encodage base64url, liste des ${LIBRARY.length} clés d’exercice et des groupes musculaires. Destiné aux intelligences artificielles à qui on donne l’adresse du site.`;
  const example = aiExample();

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="description" content="${esc(description)}" />
    <meta name="color-scheme" content="dark" />
    <meta name="theme-color" content="#0e1210" />
    <title>${esc(AI_PAGE_TITLE)} — format pour une IA | CIRKALI</title>
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="favicon.ico" sizes="32x32" />

    <meta property="og:title" content="${esc(AI_PAGE_TITLE)} — format pour une IA" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:site_name" content="CIRKALI" />
    <meta property="og:locale" content="${OG_LOCALES[SOURCE_LOCALE]}" />
    <meta property="og:image" content="${SITE_URL}/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="CIRKALI — planificateur et minuteur d’entraînement" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(AI_PAGE_TITLE)} — format pour une IA" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE_URL}/og-image.png" />

    <script type="application/ld+json">
      ${jsonLd([
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: AI_PAGE_TITLE,
          description,
          url,
          inLanguage: SOURCE_LOCALE,
          isPartOf: { '@type': 'WebApplication', name: 'CIRKALI', url: `${SITE_URL}/` },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'CIRKALI', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: AI_PAGE_TITLE, item: url },
          ],
        },
      ])}
    </script>

    <!--
      Polices servies par le site : @font-face dans exercise-page.css. Le
      preload les sort du bout de la chaine (HTML -> feuille -> police) ;
      L'attribut crossorigin est obligatoire meme en meme origine, une requete
      de police partant toujours en mode CORS. Voir index.html pour le detail.
    -->
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/archivo-latin.woff2" />
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/manrope-latin.woff2" />
    <link rel="stylesheet" href="exercises/style.css" />
  </head>
  <body>
    <main class="wrap">
      <nav class="back" aria-label="${esc(dict.page.breadcrumb)}">
        <a href="${SITE_URL}/">${esc(dict.page.back)}</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">${esc(AI_PAGE_TITLE)}</span>
      </nav>

      <h1>${esc(AI_PAGE_TITLE)}</h1>

      <p>
        CIRKALI sait recevoir une séance entière décrite dans son adresse. Ouvrir un tel lien
        affiche un résumé et propose de l’importer : rien n’est enregistré sans que la personne
        ait choisi une destination. Aucun compte n’est nécessaire pour cela — la séance voyage
        dans l’URL et ne passe par aucun serveur.
      </p>
      <p>
        Cette page est écrite pour une intelligence artificielle à qui on donne l’adresse du site
        et qui doit produire un lien valide du premier coup.
      </p>

      <h2>La forme du lien</h2>
      <pre><code>${SITE_URL}/?s=&lt;base64url du JSON&gt;</code></pre>

      <h2>L’enveloppe JSON</h2>
      <div class="tablewrap">
        <table>
          <thead><tr><th>Champ</th><th>Valeur</th></tr></thead>
          <tbody>
            <tr><td><code>v</code></td><td>Version du format. Toujours <code>1</code>.</td></tr>
            <tr><td><code>n</code></td><td>Nom de la séance, ou <code>null</code>.</td></tr>
            <tr><td><code>m</code></td><td>Mode : <code>"c"</code> classique, <code>"x"</code> circuit.</td></tr>
            <tr><td><code>p</code></td><td>Pause imposée en secondes (mode circuit uniquement).</td></tr>
            <tr><td><code>t</code></td><td>Transition entre exercices en secondes (0 pour aucune).</td></tr>
            <tr><td><code>i</code></td><td>Lignes du déroulé, dans l’ordre.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        En mode classique, les séries d’un exercice s’enchaînent avant de passer au suivant, avec
        le repos réglé sur chaque ligne. En mode circuit, les séries alternent les groupes
        musculaires et le repos de chaque ligne est ignoré : c’est <code>p</code> qui s’applique.
      </p>

      <h2>Les lignes</h2>
      <p>Chaque ligne est un tableau positionnel, pas un objet.</p>
      <pre><code>Exercice : ["e", clé, groupe, effort, séries, répétitions, secondes, repos, nomPerso?]
Pause    : ["r", secondes]</code></pre>
      <div class="tablewrap">
        <table>
          <thead><tr><th>Position</th><th>Valeur</th></tr></thead>
          <tbody>
            <tr><td>clé</td><td>Une des ${LIBRARY.length} clés ci-dessous, ou <code>"custom"</code>.</td></tr>
            <tr><td>groupe</td><td>Un des ${GROUP_IDS.length} identifiants de groupe musculaire.</td></tr>
            <tr><td>effort</td><td><code>"r"</code> répétitions, <code>"t"</code> durée.</td></tr>
            <tr><td>séries</td><td>Entier ≥ 1.</td></tr>
            <tr><td>répétitions</td><td>Entier ≥ 1. Utilisé si l’effort est <code>"r"</code>.</td></tr>
            <tr><td>secondes</td><td>Entier ≥ 1. Utilisé si l’effort est <code>"t"</code>.</td></tr>
            <tr><td>repos</td><td>Secondes entre deux séries (mode classique).</td></tr>
            <tr><td>nomPerso</td><td>Neuvième élément, uniquement si la clé est <code>"custom"</code>.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Renseigner les deux valeurs (répétitions <em>et</em> secondes) est normal : seule celle
        qui correspond à l’effort choisi est affichée, l’autre sert si l’on bascule l’unité.
        Une clé absente de la liste est traitée comme <code>"custom"</code>.
      </p>

      <h2>Exercice personnalisé</h2>
      <p>
        Un mouvement absent de la bibliothèque s’écrit avec la clé <code>"custom"</code>, le
        groupe musculaire qui lui correspond, et son nom en neuvième position. Le groupe compte :
        c’est lui qui fait alterner les efforts en mode circuit.
      </p>
      <pre><code>["e", "custom", "cardio", "r", 3, 10, 30, 60, "Burpees"]</code></pre>

      <h2>Encodage</h2>
      <p>
        Le JSON est encodé en <strong>base64url</strong> : base64 standard, puis
        <code>+</code> remplacé par <code>-</code>, <code>/</code> par <code>_</code>, et le
        remplissage <code>=</code> retiré. Aucune compression.
      </p>

      <h2>Exemple complet</h2>
      <p>Le JSON ci-dessous et la chaîne qui le suit sont générés ensemble à chaque build : ce lien fonctionne.</p>
      <pre><code>${esc(example.json)}</code></pre>
      <pre><code>${esc(example.url)}</code></pre>

      <h2>Le lien à donner</h2>
      <p>
        Donnez toujours ce lien tel quel — jamais enveloppé dans une recherche
        (<code>google.com/search</code>) ni raccourci. Certains assistants ajoutent cette
        enveloppe automatiquement : si le lien que vous vous apprêtez à donner en contient une,
        retirez-la avant de répondre. L’import en un clic ne fonctionne qu’avec le lien exact.
      </p>

      <h2>Les ${LIBRARY.length} clés d’exercice</h2>
      <div class="tablewrap">
        <table>
          <thead><tr><th>Clé</th><th>Nom</th><th>Groupe</th><th>Effort</th><th>Réglages par défaut</th></tr></thead>
          <tbody>
${aiKeysTable(dict)}
          </tbody>
        </table>
      </div>

      <h2>Les ${GROUP_IDS.length} groupes musculaires</h2>
      <div class="tablewrap">
        <table>
          <thead><tr><th>Identifiant</th><th>Nom</th></tr></thead>
          <tbody>
${aiGroupsTable(dict)}
          </tbody>
        </table>
      </div>

      <h2>Si le base64 pose problème</h2>
      <p>
        Un second paramètre, <code>?plan=</code>, accepte la même séance en <strong>JSON lisible
        non encodé</strong>, avec des noms de champs explicites. Il est plus long et ne rentre pas
        dans un QR code, mais il se relit à l’œil et se corrige. À utiliser en repli lorsque la
        chaîne base64 risque d’être approximative.
      </p>
      <pre><code>${SITE_URL}/?plan={"name":"Haut du corps","mode":"circuit","pause":60,"items":[
  {"ex":"kneePushup","sets":4,"reps":12,"rest":60},
  {"ex":"plank","sets":3,"seconds":45},
  {"ex":"Burpees","group":"cardio","sets":3,"reps":10},
  {"rest":90}
]}</code></pre>
      <p>
        Dans cette forme : <code>ex</code> accepte une clé de la bibliothèque ou un nom libre (qui
        devient un exercice personnalisé) ; le groupe, le type d’effort et tout champ absent sont
        déduits de la bibliothèque ; <code>reps</code> seul impose l’effort en répétitions,
        <code>seconds</code> seul l’impose en durée ; une ligne sans <code>ex</code> est une pause
        dont <code>rest</code> donne la durée. Les noms de champs sont insensibles à la casse et
        les nombres acceptés sous forme de chaîne. Maximum 60 lignes.
      </p>
      <p>
        Une réserve d’encodage propre à cette forme : le JSON voyage en clair dans la partie
        requête de l’URL, donc <code>&amp;</code> et <code>#</code> doivent être encodés en
        <code>%26</code> et <code>%23</code> — sinon le premier coupe le paramètre en deux et le
        second tronque tout ce qui suit. Le plus sûr reste d’encoder l’ensemble de la valeur avec
        un <code>encodeURIComponent</code>. Le paramètre <code>?s=</code> n’a pas ce problème :
        le base64url n’utilise que des caractères sans signification dans une URL.
      </p>

      <h2>Consignes de rédaction d’une séance</h2>
      <ul>
        <li>Alterner les groupes musculaires plutôt que d’enchaîner deux fois le même.</li>
        <li>Rester dans les ordres de grandeur des réglages par défaut ci-dessus : ils sont propres à chaque exercice.</li>
        <li>Préférer les clés de la bibliothèque aux exercices personnalisés : elles apportent une figure, un conseil d’exécution et une fiche détaillée.</li>
        <li>Ne jamais poser de diagnostic ni prescrire à une personne blessée : proposer une séance, pas un traitement.</li>
      </ul>

      <footer>
        <p class="disclaimer">${esc(dict.page.disclaimer)}</p>
        <p class="ads-note">${esc(dict.ads.none)}</p>
        <a href="${SITE_URL}/">CIRKALI</a> — ${esc(dict.page.tagline)}
        · <a href="${SITE_URL}/${PRIVACY_DIR}/${SOURCE_LOCALE}">${esc(dict.privacy.title)}</a>
      </footer>
    </main>
    ${adRailsScript(AD_SLOTS.pageLeft, AD_SLOTS.pageRight, dict.ads.label)}
  </body>
</html>
`;
}

/**
 * Page de confidentialite, une par langue, a `/confidentialite/<locale>`.
 *
 * Elle existe d'abord parce qu'AdSense refuse un site qui n'en a pas, mais le
 * manque etait deja reel : Google Analytics tourne depuis plusieurs semaines
 * et la connexion Google enregistre des donnees chez un tiers, sans que rien
 * ne le dise nulle part.
 *
 * Le texte vient des dictionnaires, comme le reste — donc traduit une fois et
 * jamais recopie. Les marqueurs {date}, {ga} et {email} sont remplaces ici :
 * ce ne sont pas des pluriels, `t()` n'a rien a faire dans un script de build.
 */
function renderPrivacyPage(locale: Locale, dict: Translations): string {
  const url = `${SITE_URL}/${PRIVACY_DIR}/${locale}`;
  const title = `${dict.privacy.title} | CIRKALI`;
  const today = new Date().toISOString().slice(0, 10);

  const fill = (text: string): string =>
    text
      .replace('{date}', today)
      .replace('{ga}', GA_MEASUREMENT_ID)
      .replace('{email}', CONTACT_EMAIL);

  const hreflang = (Object.keys(DICTIONARIES) as Locale[])
    .map(
      (l) =>
        `    <link rel="alternate" hreflang="${l}" href="${SITE_URL}/${PRIVACY_DIR}/${l}" />`,
    )
    .concat(
      `    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/${PRIVACY_DIR}/${SOURCE_LOCALE}" />`,
    )
    .join('\n');

  const section = (heading: string, body: string): string =>
    `      <h2>${esc(heading)}</h2>\n      <p>${esc(fill(body))}</p>\n`;

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="description" content="${esc(fill(dict.privacy.lead))}" />
    <meta name="color-scheme" content="dark" />
    <meta name="theme-color" content="#0e1210" />
    <title>${esc(title)}</title>
    <link rel="canonical" href="${url}" />
${hreflang}
    <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="../favicon.ico" sizes="32x32" />

    <meta property="og:title" content="${esc(dict.privacy.title)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:description" content="${esc(fill(dict.privacy.lead))}" />
    <meta property="og:site_name" content="CIRKALI" />
    <meta property="og:locale" content="${OG_LOCALES[locale]}" />
    <meta property="og:image" content="${SITE_URL}/og-image.png" />

    <script type="application/ld+json">
      ${jsonLd([
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: dict.privacy.title,
          description: fill(dict.privacy.lead),
          url,
          inLanguage: locale,
          isPartOf: { '@type': 'WebApplication', name: 'CIRKALI', url: `${SITE_URL}/` },
        },
      ])}
    </script>

    <!--
      Polices servies par le site : @font-face dans exercise-page.css. Le
      preload les sort du bout de la chaine (HTML -> feuille -> police) ;
      L'attribut crossorigin est obligatoire meme en meme origine, une requete
      de police partant toujours en mode CORS. Voir index.html pour le detail.
    -->
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/archivo-latin.woff2" />
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/manrope-latin.woff2" />
    <link rel="stylesheet" href="../exercises/style.css" />
  </head>
  <body>
    <main class="wrap">
      <nav class="back" aria-label="${esc(dict.page.breadcrumb)}">
        <a href="${SITE_URL}/">${esc(dict.page.back)}</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">${esc(dict.privacy.title)}</span>
      </nav>

      <h1>${esc(dict.privacy.title)}</h1>
      <p>${esc(fill(dict.privacy.lead))}</p>
      <p class="page-meta">${esc(fill(dict.privacy.updated))}</p>

${section(dict.privacy.localTitle, dict.privacy.localText)}${section(
    dict.privacy.accountTitle,
    dict.privacy.accountText,
  )}${section(dict.privacy.analyticsTitle, dict.privacy.analyticsText)}      <h2>${esc(
    dict.privacy.adsTitle,
  )}</h2>
      <p>${esc(fill(dict.privacy.adsText))}</p>
      <p>${esc(fill(dict.privacy.adsOptOut))}</p>
${section(dict.privacy.rightsTitle, dict.privacy.rightsText)}      <h2>${esc(
    dict.privacy.contactTitle,
  )}</h2>
      <p>${esc(dict.privacy.contactText.split('{email}')[0] ?? '')}<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>${esc(
    dict.privacy.contactText.split('{email}')[1] ?? '',
  )}</p>

      <footer>
        <a href="${SITE_URL}/">CIRKALI</a> — ${esc(dict.page.tagline)}
      </footer>
    </main>
    ${adRailsScript(AD_SLOTS.pageLeft, AD_SLOTS.pageRight, dict.ads.label)}
  </body>
</html>
`;
}

/**
 * Miroir court du format, a `/SRCR/llms.txt`. CLAUDE.md documente que Google
 * l'ignore pour la recherche, et ca reste vrai : ce n'est pas un levier SEO.
 * Il est ici pour une autre raison — les outils agentiques (Claude Code,
 * Cursor, Cline) le lisent quand on leur pointe une URL, ce qui est
 * exactement l'usage vise. Derive des memes sources que la page de spec,
 * donc sans risque de diverger.
 */
function renderLlmsTxt(dict: Translations): string {
  const example = aiExample();
  const keys = LIBRARY.map(
    (e) =>
      `- ${e.key} (${e.group}, ${e.mode}) — ${dict.exercise[e.key]?.name ?? e.key}`,
  ).join('\n');

  return `# CIRKALI

> Planificateur et minuteur de séance, avec ou sans matériel. Site statique, sans
> compte obligatoire : tout vit dans le navigateur, une connexion Google
> facultative sauvegarde les séances en ligne. Cinq langues.

## Créer une séance par lien

Cette application accepte une séance entière encodée dans son URL. Ouvrir le
lien affiche un résumé et propose de l'importer — rien n'est enregistré sans
confirmation de la personne.

Forme : ${SITE_URL}/?s=<base64url du JSON>

Enveloppe : {"v":1,"n":nom,"m":"c"|"x","p":pauseCircuit,"t":transition,"i":[lignes]}
Exercice  : ["e", clé, groupe, "r"|"t", séries, reps, secondes, repos, nomPerso?]
Pause     : ["r", secondes]

"m" vaut "c" pour le mode classique (toutes les séries d'un exercice, puis le
suivant) et "x" pour le circuit (les séries alternent les groupes musculaires).
"r" mesure l'effort en répétitions, "t" en secondes. Un mouvement absent de la
bibliothèque s'écrit avec la clé "custom" et son nom en neuvième position.

base64url = base64 standard, + → -, / → _, remplissage = retiré.

Exemple qui fonctionne :
${example.json}
${example.url}

Donnez toujours ce lien tel quel — jamais enveloppé dans une recherche
(google.com/search) ni raccourci. Si le lien que vous vous apprêtez à donner
en contient une, retirez-la avant de répondre : l'import en un clic ne
fonctionne qu'avec le lien exact.

Repli si le base64 est incertain : ?plan= accepte le même contenu en JSON
lisible non encodé, avec des noms de champs explicites (ex, sets, reps,
seconds, rest, group, name, mode, pause). Dans cette forme, & et # doivent
être encodés en %26 et %23, sinon l'URL est coupée. Voir la spécification
complète.

## Groupes musculaires

${GROUP_IDS.map((id) => `- ${id} — ${dict.group[id]}`).join('\n')}

## Clés d'exercice

${keys}

## Pages

- [Spécification complète du format](${SITE_URL}/${AI_PAGE_SLUG})
- [Application](${SITE_URL}/)
- [Sitemap, dont une fiche par exercice et par langue](${SITE_URL}/sitemap.xml)
`;
}

function main(): void {
  const exercisesDir = join(DIST, 'exercises');
  rmSync(exercisesDir, { recursive: true, force: true });

  const sitemapUrls: string[] = [`${SITE_URL}/`];
  // Un prompt par illustration, pas par page : les figures ne contiennent
  // aucun texte, la meme image sert donc aux cinq langues. La cle est le
  // prompt lui-meme, la valeur les noms traduits qui l'utilisent.
  const promptsByImage = new Map<string, string[]>();

  for (const locale of Object.keys(DETAILS_BY_LOCALE) as Locale[]) {
    const all = DETAILS_BY_LOCALE[locale]!;
    const dict = DICTIONARIES[locale];
    const localeDir = join(exercisesDir, locale);
    mkdirSync(localeDir, { recursive: true });

    const keys = Object.keys(all) as ExerciseKey[];
    for (const key of keys) {
      const detail = all[key]!;
      const html = renderPage(locale, key, dict, all);
      writeFileSync(join(localeDir, `${detail.slug}.html`), html, 'utf8');
      sitemapUrls.push(`${SITE_URL}/exercises/${locale}/${detail.slug}`);

      const name = dict.exercise[key]?.name ?? key;
      const prompt = imagePrompt(key);
      const names = promptsByImage.get(prompt) ?? [];
      names.push(name);
      promptsByImage.set(prompt, names);
    }
    console.log(`${keys.length} page(s) generee(s) pour la langue "${locale}".`);
  }

  // Feuille de style partagee, un seul exemplaire pour toutes les pages.
  const css = readFileSync(join(ROOT, 'src/content/exercise-page.css'), 'utf8');
  writeFileSync(join(exercisesDir, 'style.css'), css, 'utf8');

  // Page de spec du format de lien + son miroir llms.txt. Avant le sitemap :
  // la page doit pouvoir y pousser son URL.
  const sourceDict = DICTIONARIES[SOURCE_LOCALE];
  writeFileSync(join(DIST, `${AI_PAGE_SLUG}.html`), renderAiPlanPage(sourceDict), 'utf8');
  sitemapUrls.push(`${SITE_URL}/${AI_PAGE_SLUG}`);
  writeFileSync(join(DIST, 'llms.txt'), renderLlmsTxt(sourceDict), 'utf8');
  console.log(`${AI_PAGE_SLUG}.html + llms.txt generes.`);

  // Confidentialite : une page par langue. Avant le sitemap, comme la page de
  // spec — chacune doit pouvoir y pousser son URL.
  const privacyDir = join(DIST, PRIVACY_DIR);
  mkdirSync(privacyDir, { recursive: true });
  for (const locale of Object.keys(DICTIONARIES) as Locale[]) {
    writeFileSync(
      join(privacyDir, `${locale}.html`),
      renderPrivacyPage(locale, DICTIONARIES[locale]),
      'utf8',
    );
    sitemapUrls.push(`${SITE_URL}/${PRIVACY_DIR}/${locale}`);
  }
  console.log(`${PRIVACY_DIR}/ : ${Object.keys(DICTIONARIES).length} page(s) generee(s).`);

  // sitemap.xml : source unique desormais (public/sitemap.xml est supprime).
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n')}
</urlset>
`;
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`sitemap.xml : ${sitemapUrls.length} URL(s).`);

  // Recapitulatif des prompts, pour copier-coller dans Gemini.
  const docsDir = join(ROOT, 'docs');
  mkdirSync(docsDir, { recursive: true });
  const promptsDoc = `# Prompts d'illustration (Gemini)

Genere par \`scripts/build-exercise-pages.ts\` depuis
\`src/content/image-prompts.ts\` -- ne pas editer ce fichier a la main, editer
la source puis relancer \`npm run build\`.

**Une entree = une image a generer.** Les illustrations ne contiennent aucun
texte, la meme image sert donc aux cinq langues : les noms traduits listes
sous chaque prompt designent la meme figure, pas des images differentes.

Aucune des pages ne reference d'image generee tant qu'elle n'existe pas :
elles utilisent la figure SVG existante. Ajouter une image generee a une
page est un suivi separe.

${[...promptsByImage.entries()]
  .map(([prompt, names]) => `## ${names[0]}\n\n*${names.join(' · ')}*\n\n${prompt}\n`)
  .join('\n')}`;
  writeFileSync(join(docsDir, 'image-prompts.md'), promptsDoc, 'utf8');
  console.log(`docs/image-prompts.md : ${promptsByImage.size} image(s) a generer.`);
}

main();
