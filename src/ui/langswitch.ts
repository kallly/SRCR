// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

import { getLocale, LOCALE_NAMES, LOCALES, isLocale } from '../i18n';
import type { Context } from './app';
import { byId, el } from './dom';

/** Selecteur de langue. La langue est globale, independante des seances. */
export function createLangSwitch(ctx: Context): { render: () => void } {
  const select = byId<HTMLSelectElement>('locale');

  select.replaceChildren(
    ...LOCALES.map((locale) =>
      el('option', { text: LOCALE_NAMES[locale], attrs: { value: locale } }),
    ),
  );

  select.addEventListener('change', () => {
    if (!isLocale(select.value)) return;
    ctx.setLocale(select.value);
  });

  function render(): void {
    select.value = getLocale();
  }

  return { render };
}
