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

import { LIBRARY } from '../src/data/library';
import { figureSvg } from '../src/data/figures';
import { groupColor } from '../src/data/groups';
import type { ExerciseKey, GroupId, Locale } from '../src/core/types';
import { DICTIONARIES, type Translations } from '../src/i18n';
import { DETAILS_BY_LOCALE, type ExerciseDetail } from '../src/content/exercise-details';
import { imagePrompt } from '../src/content/image-prompts';

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

const SITE_URL = 'https://kallly.github.io/SRCR';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

/** Langue source : la seule garantie d'avoir du contenu pour chaque exercice. */
const SOURCE_LOCALE: Locale = 'fr';

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
    `    <link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}/exercises/${l}/${DETAILS_BY_LOCALE[l]![key]!.slug}.html" />`;

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
  return `<a class="carousel-card" href="${detail.slug}.html">
  <span class="cfig">${figureSvg(key)}</span>
  <span class="cb">
    <span class="cn">${esc(name)}</span>
    <span class="cd">${esc(detail.muscles.primary)}</span>
  </span>
</a>`;
}

function renderPage(locale: Locale, key: ExerciseKey, dict: Translations, all: Partial<Record<ExerciseKey, ExerciseDetail>>): string {
  const detail = all[key];
  if (!detail) throw new Error(`unreachable: ${key}`);
  const entry = libraryEntry(key);
  const name = dict.exercise[key]?.name ?? key;
  const groupLabel = dict.group[entry.group as GroupId] ?? entry.group;
  // Remplacement par fonction, pas par chaine : une chaine de remplacement
  // ferait interpreter $&, $` ou $1 s'ils apparaissaient un jour dans un nom
  // d'exercice, en corrompant silencieusement la description.
  const description = dict.page.description.replace('{name}', () => name);
  const url = `${SITE_URL}/exercises/${locale}/${detail.slug}.html`;

  const similar = LIBRARY.filter(
    (e) => e.group === entry.group && e.key !== key && all[e.key],
  );

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
    <title>${esc(name)} — ${esc(dict.page.titleSuffix)} | Séance</title>
    <link rel="canonical" href="${url}" />
${hreflangTags(key)}
    <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="../../favicon.ico" sizes="32x32" />

    <meta property="og:title" content="${esc(name)} — ${esc(dict.page.titleSuffix)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:site_name" content="Séance" />
    <meta property="og:locale" content="${OG_LOCALES[locale]}" />
    <!--
      Image de partage : celle de l'app, faute d'illustration par exercice.
      Le jour ou les images generees existeront (voir docs/image-prompts.md),
      c'est ici qu'il faudra pointer vers celle de l'exercice courant.
    -->
    <meta property="og:image" content="${SITE_URL}/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Séance — reprise au poids du corps sans matériel" />

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
          isPartOf: { '@type': 'WebApplication', name: 'Séance', url: `${SITE_URL}/` },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Séance', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name, item: url },
          ],
        },
      ])}
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,600;125,700;125,800&family=Manrope:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
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
        <a href="${SITE_URL}/">Séance</a> — ${esc(dict.page.tagline)}
      </footer>
    </main>
  </body>
</html>
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
      sitemapUrls.push(`${SITE_URL}/exercises/${locale}/${detail.slug}.html`);

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
