// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import { getLocale } from '../i18n';
import type { Locale } from '../core/types';
import { siteHref } from '../platform/native';

/** Langue source : celle qui a toujours une fiche, donc le repli. */
const SOURCE_LOCALE: Locale = 'fr';

/**
 * Reoriente l'index des fiches vers la langue active.
 *
 * Le HTML statique liste les fiches de la langue source — c'est ce que voit
 * un crawler, et c'est voulu : l'accueil a une URL unique, il ne peut en
 * declarer qu'une. Mais un visiteur ayant bascule l'interface doit atterrir
 * sur la fiche de sa langue, comme le fait deja le bouton « Plus
 * d'informations » de la modal. Sans ca, deux liens vers le meme exercice
 * coexistent sur la page en pointant vers deux URL differentes.
 *
 * Aucun import de contenu ici, volontairement : le plugin Vite depose les
 * slugs disponibles en attributs `data-slug-<locale>` sur chaque lien. Un
 * import de `content/exercise-details` ramenerait tout le contenu long dans
 * le bundle de demarrage, exactement ce que le chargement differe de la
 * modal evite (voir CLAUDE.md).
 */
export function createGuidesIndex(): { render: () => void } {
  function render(): void {
    const locale = getLocale();
    for (const link of document.querySelectorAll<HTMLAnchorElement>('.guides a[href]')) {
      const slugFor = (l: Locale): string | undefined =>
        link.dataset[`slug${l.charAt(0).toUpperCase()}${l.slice(1)}`];

      // Toujours reconstruit depuis les attributs, jamais depuis le href
      // courant : sinon, passer d'une langue qui a des fiches a une langue
      // qui n'en a pas laisserait le lien precedent en place.
      const slug = slugFor(locale) ?? slugFor(SOURCE_LOCALE);
      const linkLocale = slugFor(locale) ? locale : SOURCE_LOCALE;
      // Sans extension : c'est la forme canonique, celle vers laquelle
      // l'hebergeur redirige `.html` (voir SITE_URL, build-exercise-pages.ts).
      if (slug) link.href = siteHref(`exercises/${linkLocale}/${slug}`);
    }
  }

  return { render };
}

/**
 * Reduit un identifiant a sa forme comparable : minuscules, accents retires,
 * tout separateur efface. `Chat-Vache`, `chat vache` et `chatvache` se
 * rejoignent donc, et `catCow` rejoint le slug anglais `cat-cow`.
 *
 * Effacer les separateurs plutot que les normaliser rattrape aussi la casse
 * d'une clef interne ecrite en minuscules (`catcow`), ce que `?s=` ne savait
 * pas faire. Sans risque de confusion : seule une clef NI connue NI `custom`
 * arrive jusqu'ici (voir `setExerciseKeyResolver`, core/storage.ts), donc
 * jamais un nom saisi par quelqu'un.
 */
function comparable(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

/**
 * Le meme index des fiches, lu dans l'autre sens : du slug vers la clef.
 *
 * `createGuidesIndex()` ci-dessus va de la clef vers l'URL de la fiche ; ici
 * on remonte, pour rattraper une IA qui a pris le slug visible dans une URL
 * (`chat-vache`) pour la clef interne (`catCow`) — piege verifie avec Gemini,
 * voir `humanizeUnknownKey()` (core/storage.ts), qui reste le filet suivant
 * quand meme ce catalogue ne reconnait rien.
 *
 * Dans ce module et pas dans un module a lui : c'est ici que vit la
 * connaissance du contrat `data-key`/`data-slug-<langue>` depose par
 * `injectExerciseIndex()` (vite.config.ts). Deux lecteurs de ces attributs
 * dans deux fichiers, c'est la copie oubliee au premier changement de forme.
 *
 * La table est construite **au premier appel seulement**, donc jamais sur un
 * chargement normal : un lien correct, un stockage sain et un document
 * distant sain ne contiennent aucune clef mal formee.
 */
export function createSlugKeyResolver(): (rawKey: string) => string | undefined {
  let table: Map<string, string | null> | undefined;

  function build(): Map<string, string | null> {
    const map = new Map<string, string | null>();
    const add = (value: string | undefined, key: string): void => {
      const id = comparable(value ?? '');
      if (!id) return;
      const seen = map.get(id);
      // Deux clefs pour un meme identifiant : on refuse plutot que de choisir
      // (`null`). Meme doctrine que partout dans les parseurs — on repare ce
      // qui est sans ambiguite, on ne devine jamais.
      map.set(id, seen === undefined || seen === key ? key : null);
    };

    for (const link of document.querySelectorAll<HTMLAnchorElement>('.guides a[data-key]')) {
      const key = link.dataset['key'];
      if (!key) continue;
      add(key, key);
      for (const [name, value] of Object.entries(link.dataset)) {
        if (name.startsWith('slug')) add(value, key);
      }
    }
    return map;
  }

  return (rawKey) => {
    table ??= build();
    return table.get(comparable(rawKey)) ?? undefined;
  };
}
