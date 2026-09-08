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
