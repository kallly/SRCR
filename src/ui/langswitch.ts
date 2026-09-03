import { getLocale, LOCALE_NAMES, LOCALES, setLocale, isLocale } from '../i18n';
import type { Context } from './app';
import { byId, el } from './dom';

/** Selecteur de langue. Le choix est persiste avec le reste des reglages. */
export function createLangSwitch(ctx: Context): { render: () => void } {
  const select = byId<HTMLSelectElement>('locale');

  select.replaceChildren(
    ...LOCALES.map((locale) =>
      el('option', { text: LOCALE_NAMES[locale], attrs: { value: locale } }),
    ),
  );

  select.addEventListener('change', () => {
    if (!isLocale(select.value)) return;
    ctx.state.config.locale = select.value;
    setLocale(select.value);
    ctx.save();
    ctx.renderAll();
  });

  function render(): void {
    select.value = getLocale();
  }

  return { render };
}
