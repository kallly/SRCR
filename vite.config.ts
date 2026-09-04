import { defineConfig, type Plugin } from 'vite';

import { DETAILS_BY_LOCALE } from './src/content/exercise-details';
import { fr as i18nFr } from './src/i18n/locales/fr';
import type { ExerciseKey, Locale } from './src/core/types';

/**
 * Langue source de l'index des fiches. L'accueil est une URL unique et non
 * localisee : il ne peut pointer que vers une seule langue de fiches, et
 * c'est celle-ci. Le lien « Plus d'informations » de la modal, lui, resout
 * vers la langue active quand elle a son propre contenu (ui/exercise-info.ts)
 * — les deux divergeront donc le jour ou une deuxieme langue aura des fiches.
 * A ce moment-la, il faudra faire remettre a jour ces liens par le JS au
 * changement de langue, comme le reste de l'interface.
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

      const links = (Object.keys(all) as ExerciseKey[])
        .map((key) => ({ name: i18nFr.exercise[key]?.name ?? key, slug: all[key]!.slug }))
        .sort((a, b) => a.name.localeCompare(b.name, INDEX_LOCALE))
        .map(
          (e) =>
            `          <li><a href="exercises/${INDEX_LOCALE}/${e.slug}.html">${e.name}</a></li>`,
        )
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
