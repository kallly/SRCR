import { t } from '../i18n';
import { groupColor } from '../data/groups';
import { LIBRARY, type LibraryEntry } from '../data/library';
import { figureSvg } from '../data/figures';
import { createFromLibrary } from '../core/plan';
import type { Context } from './app';
import { byId, dot, el } from './dom';
import { effortSummary } from './format';

function card(entry: LibraryEntry): HTMLElement {
  const detail = el('span', {
    className: 'ld',
    children: [
      dot(groupColor(entry.group)),
      document.createTextNode(`${t(`group.${entry.group}`)} · ${effortSummary(entry)}`),
    ],
  });
  return el('button', {
    className: 'libcard',
    attrs: { type: 'button', 'data-add': entry.key },
    children: [
      el('span', { className: 'fig', html: figureSvg(entry.key) }),
      el('span', {
        className: 'lb',
        children: [
          el('span', { className: 'ln', text: t(`exercise.${entry.key}.name`) }),
          detail,
        ],
      }),
    ],
  });
}

/** Grille des exercices proposes ; un clic ajoute la ligne au deroule. */
export function createLibrary(ctx: Context): { render: () => void } {
  const grid = byId('library');

  grid.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>('[data-add]');
    const key = button?.dataset['add'];
    if (!key) return;

    const item = createFromLibrary(key);
    if (!item) return;
    ctx.state.plan.push(item);
    ctx.save();
    ctx.renderAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function render(): void {
    grid.replaceChildren(...LIBRARY.map(card));
  }

  return { render };
}
