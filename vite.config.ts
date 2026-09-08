// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

import { defineConfig, type Plugin } from 'vite';

import { DETAILS_BY_LOCALE } from './src/content/exercise-details';
import { LIBRARY, findLibraryEntry } from './src/data/library';
import { fr as i18nFr } from './src/i18n/locales/fr';
import { AD_SLOTS, adRailsScript } from './src/content/ad-rails';
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
          // Sans `.html` : l'hebergeur sert le fichier a cette adresse et
          // redirige la forme longue vers elle (voir SITE_URL dans
          // scripts/build-exercise-pages.ts). `ui/guides-index.ts` recompose
          // le meme href au changement de langue, il suit la meme regle.
          return `          <li><a href="exercises/${INDEX_LOCALE}/${e.slug}"${machine}${data}>${e.name}</a>${visibleKey}</li>`;
        })
        .join('\n');

      return html.replace(MARKER, `<ul>\n${links}\n        </ul>`);
    },
  };
}

/**
 * Cible du build : le site, ou le bundle embarque dans l'application native.
 *
 * Un seul et meme code source pour les deux — voir src/platform/native.ts,
 * qui repond a l'execution. Ce drapeau ne sert QU'a ce qui ne peut pas se
 * decider a l'execution parce que ca ne doit pas etre livre du tout.
 */
const APP_TARGET = process.env['CIRKALI_TARGET'] === 'app';

/**
 * Injecte le portillon publicitaire a la place de <!--AD_RAILS-->.
 *
 * Le script lui-meme vit dans src/content/ad-rails.ts, partage avec les pages
 * generees : ce plugin ne fait que le poser dans l'accueil. Le passer par un
 * marqueur plutot que de l'ecrire en dur dans index.html evite d'avoir deux
 * versions du meme code de conformite, dont une derivant en silence.
 *
 * Le libelle est en francais ici, comme tout ce que rend `index.html` en
 * statique ; `applyStaticTranslations()` le retraduit au demarrage grace au
 * `data-i18n` que le script pose sur l'element.
 *
 * **Rien du tout dans le build applicatif.** AdSense interdit ses annonces
 * dans le WebView d'une application, et le script sait deja se taire s'il s'y
 * decouvre (voir ad-rails.ts) — mais ne pas livrer une ligne de code
 * publicitaire dans le binaire est la version forte de la meme promesse,
 * celle qui ne depend d'aucun test a l'execution. Meme raisonnement que le
 * portillon lui-meme, qui ne masque pas un encart deja demande : il ne le
 * demande pas.
 */
function injectAdRails(): Plugin {
  const MARKER = '<!--AD_RAILS-->';
  return {
    name: 'inject-ad-rails',
    transformIndexHtml(html) {
      if (!html.includes(MARKER)) {
        throw new Error(`Marqueur ${MARKER} introuvable dans index.html.`);
      }
      return html.replace(
        MARKER,
        APP_TARGET
          ? '<!-- Pas de publicite dans l\'application : politique AdSense. -->'
          : adRailsScript(AD_SLOTS.homeLeft, AD_SLOTS.homeRight, i18nFr.ads.label),
      );
    },
  };
}

/**
 * Retire du build applicatif tout ce qu'`index.html` encadre par
 * `<!--WEB_ONLY-->` … `<!--/WEB_ONLY-->`.
 *
 * Aujourd'hui : le chargeur Google Analytics avec son Consent Mode, et la
 * balise d'identification AdSense. Ce sont les deux seules choses du <head>
 * qui s'adressent au web et a lui seul.
 *
 * Ce n'est pas un scrupule de poids. Une analytique web embarquee dans un
 * binaire doit etre declaree au questionnaire de confidentialite de l'App
 * Store et dans la fiche Play — pour une mesure que les deux magasins
 * fournissent deja — et son bandeau de consentement voyage avec le script
 * publicitaire, absent de l'application par obligation. On livrerait donc un
 * traqueur sans le moyen d'y consentir.
 *
 * Un marqueur plutot qu'une expression reguliere sur le contenu des scripts :
 * meme convention que `<!--AD_RAILS-->` et `<!--EXERCISE_INDEX-->`, et surtout
 * la frontiere reste lisible dans `index.html`, la ou quelqu'un ajoutera le
 * prochain script.
 */
function stripWebOnly(): Plugin {
  const OPEN = '<!--WEB_ONLY-->';
  const CLOSE = '<!--/WEB_ONLY-->';
  // Le `(?!OPEN)` interdit a une region d'en avaler une autre. Sans lui, une
  // marque fermante mal ecrite faisait retomber le `*?` sur la fermante
  // SUIVANTE et emportait tout ce qui separait les deux blocs — le viewport,
  // la meta description, les preuves de propriete. Piege verifie : le build
  // reussissait, et le head y perdait la moitie de ses balises en silence.
  const REGION = new RegExp(
    `[ \\t]*${OPEN}(?:(?!${OPEN})[\\s\\S])*?${CLOSE}\\n?`,
    'g',
  );

  const count = (html: string, needle: string): number => html.split(needle).length - 1;

  return {
    name: 'strip-web-only',
    transformIndexHtml(html) {
      if (!APP_TARGET) return html;

      const opens = count(html, OPEN);
      const closes = count(html, CLOSE);
      if (opens === 0 || opens !== closes) {
        throw new Error(
          `index.html : ${opens} marqueur(s) ${OPEN} pour ${closes} ${CLOSE}. ` +
            `Sans paires equilibrees, le build applicatif embarquerait ` +
            `l'analytique web ou amputerait le <head>.`,
        );
      }
      return html.replace(REGION, '');
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
/**
 * Integre la feuille de style de l'accueil dans le HTML, au lieu de la lier.
 *
 * Un `<link rel="stylesheet">` bloque le rendu par definition : le navigateur
 * ne peint rien tant qu'il ne l'a pas recu. Mesure sur cirkali.fr, c'etait un
 * aller-retour reseau complet pour 5,6 Ko compresses — la derniere requete
 * bloquante de la page une fois Google Fonts elimine.
 *
 * Pourquoi c'est gratuit ici, alors que « inliner le CSS » coute normalement le
 * cache : le HTML est servi en `max-age=0, must-revalidate`, donc il est de
 * toute facon revalide a chaque visite. Le CSS integre voyage avec lui ou pas
 * du tout — les visites repetees font le meme nombre d'aller-retours qu'avant.
 * Seule la premiere visite y gagne, et elle y gagne entierement.
 *
 * La balise est remplacee SUR PLACE plutot qu'ajoutee ailleurs : c'est ce qui
 * garantit que le <style> de `injectLibraryRows()` (insere juste avant
 * </head>, donc apres) continue de gagner sur les valeurs de repli du fichier
 * CSS. Inverser les deux ferait retomber `--lib-rows-2` sur son repli et
 * remonter le CLS, sans que rien ne casse visiblement.
 *
 * Ne concerne QUE l'accueil. Les 310 fiches gardent `exercises/style.css` en
 * fichier separe : une seule feuille mise en cache puis reutilisee par 310
 * documents, l'integrer la ferait payer 310 fois.
 */
function inlineStyles(): Plugin {
  return {
    name: 'inline-styles',
    transformIndexHtml: {
      // `post` : il faut que Vite ait deja injecte sa balise pour qu'il y ait
      // quelque chose a remplacer.
      order: 'post',
      handler(html, ctx) {
        // En `npm run dev` il n'y a pas de bundle : Vite sert le CSS par
        // injection JS, il n'y a ni fichier ni balise a reprendre.
        if (!ctx.bundle) return html;

        return html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, (tag) => {
          const href = /href="([^"]+)"/.exec(tag)?.[1];
          if (!href) return tag;

          const asset = ctx.bundle?.[href.replace(/^\.?\//, '')];
          if (!asset || asset.type !== 'asset') {
            throw new Error(
              `inline-styles : "${href}" est liee dans index.html mais absente ` +
                `du bundle. La forme des noms d'assets a change — sans ce ` +
                `remplacement la page repasse en rendu bloquant, en silence.`,
            );
          }

          const css =
            typeof asset.source === 'string'
              ? asset.source
              : Buffer.from(asset.source).toString('utf8');

          // Rebaser les url() relatives : Vite les a calculees pour un fichier
          // servi depuis /assets/, or ce CSS part maintenant depuis la racine.
          // Les @font-face sortaient en `url(../fonts/…)`, ce qui ne visait le
          // bon fichier que parce qu'un navigateur refuse de remonter au-dessus
          // de la racine — juste par accident, et faux des que la page n'est
          // plus a la racine. Seules les polices sont concernees ; le chevron
          // des selects est une data: URI, insensible au chemin.
          const rebased = css.replace(/url\((['"]?)\.\.\//g, 'url($1/');
          return `<style>${rebased}</style>`;
        });
      },
    },
  };
}

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
  plugins: [
    stampBuildDate(),
    stripWebOnly(),
    injectExerciseIndex(),
    fillStaticTranslations(),
    injectAdRails(),
    injectLibraryRows(),
    inlineStyles(),
  ],
  // `host: true` expose le serveur sur le reseau local : la seance se teste
  // depuis le telephone, qui est l'appareil vise.
  server: { port: 8000, host: true, strictPort: true },
  preview: { port: 8000, host: true, strictPort: true },
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
});
