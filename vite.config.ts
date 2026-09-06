import { defineConfig, type Plugin } from 'vite';

import { DETAILS_BY_LOCALE } from './src/content/exercise-details';
import { LIBRARY, findLibraryEntry } from './src/data/library';
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

/**
 * Injecte le nombre de rangees de la grille bibliotheque, dont depend la
 * reservation de hauteur `#library:empty` (planner.css).
 *
 * Ces trois constantes etaient ecrites a la main, mesurees a 28 exercices :
 * a 36 elles reservaient deja 22 % de trop peu, et personne ne s'en apercoit
 * puisque rien ne casse — le CLS remonte, silencieusement. Comme `.libcard`
 * a desormais une hauteur fixe (voir `.libcard .ln`), le seul terme variable
 * est le nombre de rangees, qui se deduit de LIBRARY.length.
 *
 * Injecte dans le <head> plutot qu'ecrit dans la CSS : le CSS est un fichier
 * statique servi tel quel, alors que le HTML passe deja par cette famille de
 * plugins. La CSS garde des valeurs de repli, sans lesquelles une injection
 * ratee produirait une declaration invalide donc AUCUNE reservation.
 */
function injectLibraryRows(): Plugin {
  return {
    name: 'inject-library-rows',
    transformIndexHtml(html) {
      const style =
        `<style>:root{--lib-rows-2:${Math.ceil(LIBRARY.length / 2)};` +
        `--lib-rows-3:${Math.ceil(LIBRARY.length / 3)}}</style>`;
      return html.replace('</head>', `    ${style}\n  </head>`);
    },
  };
}

/**
 * Remplit le texte francais statique de chaque element `data-i18n` depuis
 * `fr.ts`, en dev comme en prod.
 *
 * Pourquoi ce texte doit exister dans le HTML livre : tout element `data-i18n`
 * est vide tant que `main.ts` n'a pas tourne, et les robots qui ne rendent pas
 * le JS (previsualisation sociale, audits SEO) verraient une coquille vide —
 * sans compter le CLS, ces elements passant de zero a leur hauteur reelle des
 * qu'`applyStaticTranslations()` s'execute. Voir CLAUDE.md, « SEO & partage
 * social ».
 *
 * Pourquoi l'injecter plutot que le recopier a la main : ce texte etait
 * jusqu'ici duplique dans `index.html` en miroir de `fr.ts`, avec une regle de
 * synchronisation manuelle listant les cles a repercuter. Une seule source
 * desormais — la meme raison qui fait injecter l'index des fiches ci-dessus
 * plutot que d'ecrire une seconde liste.
 *
 * Contrat sur la source : un element porteur de `data-i18n` doit etre **vide**
 * dans `index.html`. C'est ce qui rend le remplacement non ambigu (on n'a qu'a
 * reconnaitre la balise fermante qui suit immediatement) au lieu de faire
 * traverser des balises imbriquees a une expression reguliere. Un element non
 * vide est donc une erreur de build, pas un cas a gerer.
 */
function fillStaticTranslations(): Plugin {
  // Toute balise ouvrante, les valeurs d'attributs entre guillemets pouvant
  // elles-memes contenir un '>'.
  const OPEN_TAG = /<([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;

  const keyOf = (attrs: string, attr: string): string | undefined =>
    new RegExp(`\\s${attr}="([^"]+)"`).exec(attrs)?.[1];

  /** Resout une cle pointee ("app.heading") dans le dictionnaire francais. */
  const translate = (key: string): string => {
    let node: unknown = i18nFr;
    for (const part of key.split('.')) {
      if (typeof node !== 'object' || node === null) break;
      node = (node as Record<string, unknown>)[part];
    }
    if (node === undefined) {
      throw new Error(
        `index.html : data-i18n="${key}" ne correspond a aucune cle de fr.ts. ` +
          `Ajoute-la dans fr.ts (les 4 autres langues deviendront alors des ` +
          `erreurs de typecheck), ou corrige la cle ici.`,
      );
    }
    if (typeof node !== 'string') {
      throw new Error(
        `index.html : data-i18n="${key}" resout vers un bloc ou une entree ` +
          `pluralisee, pas vers une chaine. Un pluriel n'a pas de forme ` +
          `statique — ce texte doit etre construit en JS avec t(), pas pose ` +
          `dans index.html.`,
      );
    }
    return node;
  };

  const escapeText = (s: string): string =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escapeAttr = (s: string): string => escapeText(s).replace(/"/g, '&quot;');

  return {
    name: 'fill-static-translations',
    // `enforce: 'pre'` n'est pas necessaire : ce plugin ne touche qu'aux
    // elements data-i18n ecrits a la main, jamais au HTML injecte par les
    // autres plugins.
    transformIndexHtml(html) {
      let out = '';
      let cursor = 0;
      let filled = 0;

      for (const m of html.matchAll(OPEN_TAG)) {
        const [whole, tag = '', attrs = ''] = m;
        const start = m.index;
        const end = start + whole.length;

        const textKey = keyOf(attrs, 'data-i18n');
        const ariaKey = keyOf(attrs, 'data-i18n-aria-label');
        const placeholderKey = keyOf(attrs, 'data-i18n-placeholder');
        if (!textKey && !ariaKey && !placeholderKey) continue;

        // Les attributs traduits sont remplacés *sur place*, valeur vide dans
        // la source : l'ordre des attributs du HTML livre reste celui du
        // fichier, et l'attribut reste visible a la lecture de `index.html`.
        let newAttrs = attrs;
        for (const [key, attr] of [
          [ariaKey, 'aria-label'],
          [placeholderKey, 'placeholder'],
        ] as const) {
          if (!key) continue;
          const slot = new RegExp(`(\\s${attr}=")[^"]*(")`);
          if (!slot.test(newAttrs)) {
            throw new Error(
              `index.html : <${tag}> porte data-i18n-${attr}="${key}" mais pas ` +
                `d'attribut ${attr}="" a remplir. Ajoute ${attr}="" a cote.`,
            );
          }
          newAttrs = newAttrs.replace(slot, `$1${escapeAttr(translate(key))}$2`);
        }

        out += html.slice(cursor, start) + `<${tag}${newAttrs}>`;
        cursor = end;

        if (textKey) {
          // Prettier coupe volontiers une balise fermante en `</a\n  >` :
          // on tolere l'espace avant le chevron, mais rien entre `>` et `</`.
          const closing = new RegExp(`^</${tag}\\s*>`).exec(html.slice(end));
          if (!closing) {
            throw new Error(
              `index.html : <${tag} data-i18n="${textKey}"> n'est pas vide. ` +
                `Le texte francais est injecte au build depuis fr.ts — laisse ` +
                `l'element vide (<${tag} data-i18n="${textKey}"></${tag}>).`,
            );
          }
          out += escapeText(translate(textKey));
          filled++;
        }
      }
      out += html.slice(cursor);

      if (filled === 0) {
        throw new Error(
          `index.html : aucun element data-i18n rempli. Le marqueur a disparu ` +
            `ou le fichier a change de forme — l'accueil serait publie sans ` +
            `texte pour les robots qui n'executent pas le JS.`,
        );
      }
      return out;
    },
  };
}

export default defineConfig({
  // Chemins relatifs : le build fonctionne sur user.github.io/<depot>/
  // sans avoir a coder le nom du depot en dur.
  base: './',
  plugins: [stampBuildDate(), injectExerciseIndex(), fillStaticTranslations(), injectLibraryRows()],
  // `host: true` expose le serveur sur le reseau local : la seance se teste
  // depuis le telephone, qui est l'appareil vise.
  server: { port: 8000, host: true, strictPort: true },
  preview: { port: 8000, host: true, strictPort: true },
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
});
