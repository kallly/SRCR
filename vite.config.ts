import { defineConfig, type Plugin } from 'vite';

import { DETAILS_BY_LOCALE } from './src/content/exercise-details';
import { findLibraryEntry } from './src/data/library';
import { fr as i18nFr } from './src/i18n/locales/fr';
import type { ExerciseKey, Locale } from './src/core/types';

/**
 * Langue source de l'index des fiches. L'accueil est une URL unique et non
 * localisee : le HTML *livre* ne peut pointer que vers une seule langue de
 * fiches, et c'est celle-ci — c'est aussi ce que voit un crawler.
 *
 * Au chargement, `ui/guides-index.ts` reoriente ces liens vers la langue
 * active a partir des attributs `data-slug-<locale>` deposes ci-dessous, de
 * sorte que l'index et le bouton « Plus d'informations » de la modal
 * (`ui/exercise-info.ts`) pointent toujours vers la meme URL. Les deux
 * retombent sur cette langue quand la langue active n'a pas encore de fiche.
 */
const INDEX_LOCALE: Locale = 'fr';

/**
 * Injecte la liste des fiches d'exercice a la place de <!--EXERCISE_INDEX-->.
 *
 * Sans elle, aucune fiche n'est atteignable depuis l'accueil en HTML brut :
 * les seuls liens vers les fiches sont ceux de la modal, generes en JS dans
 * un <dialog> ferme, donc invisibles pour un crawler. En plugin Vite plutot
 * qu'en post-traitement du build : ca marche aussi en `npm run dev`, ou le
 * marqueur non remplace laisserait sinon une section vide a l'ecran.
 */
function injectExerciseIndex(): Plugin {
  const MARKER = '<!--EXERCISE_INDEX-->';
  return {
    name: 'inject-exercise-index',
    transformIndexHtml(html) {
      const all = DETAILS_BY_LOCALE[INDEX_LOCALE];
      if (!all) {
        throw new Error(
          `Aucun contenu de fiches pour la langue source "${INDEX_LOCALE}" : ` +
            `l'accueil serait publie sans aucun lien vers les fiches.`,
        );
      }
      if (!html.includes(MARKER)) {
        throw new Error(`Marqueur ${MARKER} introuvable dans index.html.`);
      }

      // Les slugs de TOUTES les langues sont deposes en attributs data-, y
      // compris la langue source : ui/guides-index.ts reconstruit le href a
      // partir de ces attributs a chaque changement de langue. Sans le slug
      // source, passer de l'anglais a une langue sans fiche laisserait le
      // lien anglais en place, faute de pouvoir revenir en arriere.
      // Aucun import de contenu cote navigateur : le bundle de demarrage
      // reste allege (voir CLAUDE.md).
      const localesWithPages = Object.keys(DETAILS_BY_LOCALE) as Locale[];

      const links = (Object.keys(all) as ExerciseKey[])
        .map((key) => ({ key, name: i18nFr.exercise[key]?.name ?? key, slug: all[key]!.slug }))
        .sort((a, b) => a.name.localeCompare(b.name, INDEX_LOCALE))
        .map((e) => {
          const data = localesWithPages
            .map((l) => {
              const slug = DETAILS_BY_LOCALE[l]?.[e.key]?.slug;
              return slug ? ` data-slug-${l}="${slug}"` : '';
            })
            .join('');
          // La cle et le groupe de chaque exercice, en clair dans le HTML
          // livre : c'est la table de reference qu'une IA lit pour ecrire un
          // lien `?s=` (voir la section « Creer une seance par lien » de
          // index.html). Injectes depuis LIBRARY, donc incapables de diverger
          // — une seconde liste ecrite a la main serait le probleme
          // `public/sitemap.xml` a nouveau. Aucun effet sur
          // ui/guides-index.ts, qui ne lit que `dataset.slug*`.
          const entry = findLibraryEntry(e.key);
          const machine = entry ? ` data-key="${entry.key}" data-group="${entry.group}"` : '';
          // La cle est AUSSI du texte visible (`<code>`), pas seulement
          // l'attribut `data-key` ci-dessus — piege verifie : une IA qui lit
          // la page en extraction de texte (beaucoup d'outils de navigation
          // le font, plutot que de parser les attributs HTML) ne voit que le
          // nom et l'URL du lien, jamais `data-key`. Sans repere visible, une
          // IA a deja pris le SLUG de la fiche dans l'URL (`chat-vache`) pour
          // la cle attendue (`catCow`), produisant une seance ou chaque
          // exercice s'affichait comme "Exercice perso" faute de cle connue.
          const visibleKey = entry ? ` <code>${entry.key}</code>` : '';
          return `          <li><a href="exercises/${INDEX_LOCALE}/${e.slug}.html"${machine}${data}>${e.name}</a>${visibleKey}</li>`;
        })
        .join('\n');

      return html.replace(MARKER, `<ul>\n${links}\n        </ul>`);
    },
  };
}

/**
 * Remplace __BUILD_DATE__ (JSON-LD, dateModified) par la date reelle de
 * build, au format YYYY-MM-DD. Tourne aussi bien en dev qu'en prod : jamais
 * de valeur figee a maintenir a la main, jamais de placeholder visible.
 * Signal de fraicheur documente pour la citabilite par les moteurs IA — voir
 * CLAUDE.md, section « SEO & partage social ».
 */
function stampBuildDate(): Plugin {
  return {
    name: 'stamp-build-date',
    transformIndexHtml(html) {
      const today = new Date().toISOString().slice(0, 10);
      return html.replace('__BUILD_DATE__', today);
    },
  };
}

export default defineConfig({
  // Chemins relatifs : le build fonctionne sur user.github.io/<depot>/
  // sans avoir a coder le nom du depot en dur.
  base: './',
  plugins: [stampBuildDate(), injectExerciseIndex()],
  // `host: true` expose le serveur sur le reseau local : la seance se teste
  // depuis le telephone, qui est l'appareil vise.
  server: { port: 8000, host: true, strictPort: true },
  preview: { port: 8000, host: true, strictPort: true },
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
});
