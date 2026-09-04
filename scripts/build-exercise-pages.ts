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
import { fr as i18nFr } from '../src/i18n/locales/fr';
import { DETAILS_BY_LOCALE, type ExerciseDetail } from '../src/content/exercise-details';

const SITE_URL = 'https://kallly.github.io/SRCR';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

/** Noms/conseils courts par langue, pour les memes langues que DETAILS_BY_LOCALE. */
const NAMES_BY_LOCALE: Partial<Record<Locale, typeof i18nFr>> = { fr: i18nFr };

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
function renderProgression(detail: ExerciseDetail): string {
  const p = detail.progression;
  if (!p) return '';
  const rows = [
    p.easier ? `        <li><b>Plus accessible :</b> ${esc(p.easier)}</li>` : '',
    p.harder ? `        <li><b>Plus exigeant :</b> ${esc(p.harder)}</li>` : '',
    p.readyWhen ? `        <li><b>Passer à la suite :</b> ${esc(p.readyWhen)}</li>` : '',
  ].filter(Boolean);
  if (rows.length === 0) return '';
  return `
      <h2>Adapter et progresser</h2>
      <ul class="progression">
${rows.join('\n')}
      </ul>
`;
}

function renderPrecautions(detail: ExerciseDetail): string {
  if (!detail.precautions) return '';
  return `
      <h2>Précautions</h2>
      <p class="precautions">${esc(detail.precautions)}</p>
`;
}

function libraryEntry(key: ExerciseKey) {
  const entry = LIBRARY.find((e) => e.key === key);
  if (!entry) throw new Error(`Aucune entree LIBRARY pour la cle "${key}" (exercise-details en a une en trop).`);
  return entry;
}

function carouselCard(key: ExerciseKey, dict: typeof i18nFr, detail: ExerciseDetail): string {
  const name = dict.exercise[key]?.name ?? key;
  return `<a class="carousel-card" href="${detail.slug}.html">
  <span class="cfig">${figureSvg(key)}</span>
  <span class="cb">
    <span class="cn">${esc(name)}</span>
    <span class="cd">${esc(detail.muscles.primary)}</span>
  </span>
</a>`;
}

function renderPage(locale: Locale, key: ExerciseKey, dict: typeof i18nFr, all: Partial<Record<ExerciseKey, ExerciseDetail>>): string {
  const detail = all[key];
  if (!detail) throw new Error(`unreachable: ${key}`);
  const entry = libraryEntry(key);
  const name = dict.exercise[key]?.name ?? key;
  const groupLabel = dict.group[entry.group as GroupId] ?? entry.group;
  const description = `Comment faire ${name} correctement : muscles sollicités, étapes détaillées et erreurs fréquentes à éviter.`;
  const url = `${SITE_URL}/exercises/${locale}/${detail.slug}.html`;

  const similar = LIBRARY.filter(
    (e) => e.group === entry.group && e.key !== key && all[e.key],
  );

  const carousel =
    similar.length > 0
      ? `<h2>Exercices similaires</h2>
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
    <title>${esc(name)} — comment le faire | Séance</title>
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="../../favicon.ico" sizes="32x32" />

    <meta property="og:title" content="${esc(name)} — comment le faire" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:site_name" content="Séance" />
    <meta property="og:locale" content="${locale}_${locale.toUpperCase()}" />
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
    <meta name="twitter:title" content="${esc(name)} — comment le faire" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE_URL}/og-image.png" />

    <script type="application/ld+json">
      ${jsonLd({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name,
        description,
        url,
        inLanguage: locale,
        isPartOf: { '@type': 'WebApplication', name: 'Séance', url: `${SITE_URL}/` },
      })}
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
      <a class="back" href="${SITE_URL}/">← Retour à l’app</a>

      <span class="chip"><i style="background:${groupColor(entry.group)}"></i>${esc(groupLabel)}</span>
      <h1>${esc(name)}</h1>

      <div class="fig">${figureSvg(key)}</div>

      <p class="muscles"><b>Muscles sollicités :</b> ${esc(detail.muscles.primary)}${
        detail.muscles.secondary ? ` <span>· ${esc(detail.muscles.secondary)}</span>` : ''
      }</p>

      <h2>Comment faire l’exercice</h2>
      <ol>
${detail.steps.map((s) => `        <li>${esc(s)}</li>`).join('\n')}
      </ol>

      <h2>Erreurs fréquentes</h2>
      <ul class="mistakes">
${detail.mistakes.map((m) => `        <li>${esc(m)}</li>`).join('\n')}
      </ul>

      <h2>Où ça doit travailler</h2>
      <p>${esc(detail.sensation)}</p>

      <h2>Amplitude</h2>
      <p>${esc(detail.rangeOfMotion)}</p>

      <h2>Rythme et respiration</h2>
      <p>${esc(detail.tempo)}</p>

      <h2>Ce qui travaille, précisément</h2>
      <p>${esc(detail.anatomy)}</p>

      <h2>Mécanique du mouvement</h2>
      <p>${esc(detail.mechanics)}</p>

      <h2>Bienfaits</h2>
      <ul>
${detail.benefits.map((b) => `        <li>${esc(b)}</li>`).join('\n')}
      </ul>
${renderProgression(detail)}${renderPrecautions(detail)}
      ${carousel}

      <footer>
        <p class="disclaimer">
          Ces informations sont d’ordre général et ne remplacent pas l’avis d’un
          professionnel de santé. En cas de douleur, de blessure ou de pathologie
          connue, demandez un avis médical avant de vous lancer.
        </p>
        <a href="${SITE_URL}/">Séance</a> — planificateur et minuteur de séance au poids du corps.
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
  const imagePromptSections: string[] = [];

  for (const locale of Object.keys(DETAILS_BY_LOCALE) as Locale[]) {
    const all = DETAILS_BY_LOCALE[locale]!;
    const dict = NAMES_BY_LOCALE[locale]!;
    const localeDir = join(exercisesDir, locale);
    mkdirSync(localeDir, { recursive: true });

    const keys = Object.keys(all) as ExerciseKey[];
    for (const key of keys) {
      const detail = all[key]!;
      const html = renderPage(locale, key, dict, all);
      writeFileSync(join(localeDir, `${detail.slug}.html`), html, 'utf8');
      sitemapUrls.push(`${SITE_URL}/exercises/${locale}/${detail.slug}.html`);

      const name = dict.exercise[key]?.name ?? key;
      imagePromptSections.push(`## ${name}\n\n${detail.imagePrompt}\n`);
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

Genere par \`scripts/build-exercise-pages.ts\` depuis le champ \`imagePrompt\`
de \`src/content/exercise-details/fr.ts\` -- ne pas editer ce fichier a la
main, editer la source puis relancer \`npm run build\`.

Aucune des pages ne reference d'image generee tant qu'elle n'existe pas :
elles utilisent la figure SVG existante. Ajouter une image generee a une
page est un suivi separe.

${imagePromptSections.join('\n')}`;
  writeFileSync(join(docsDir, 'image-prompts.md'), promptsDoc, 'utf8');
  console.log(`docs/image-prompts.md : ${imagePromptSections.length} prompt(s).`);
}

main();
