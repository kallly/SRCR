import { getLocale, t } from '../i18n';
import { GROUP_IDS, groupColor } from '../data/groups';
import { CATEGORY_IDS } from '../data/categories';
import { LIBRARY, type LibraryEntry } from '../data/library';
import { figureSvg } from '../data/figures';
import { createFromLibrary } from '../core/plan';
import type { CategoryId, ExerciseKey } from '../core/types';
import type { Context } from './app';
import { byId, dot, el } from './dom';
import { effortSummary } from './format';

/** Insensible aux majuscules et aux accents : "epaule" trouve "Épaules". */
function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function card(entry: LibraryEntry): HTMLElement {
  const detail = el('span', {
    className: 'ld',
    children: [
      dot(groupColor(entry.group)),
      document.createTextNode(`${t(`group.${entry.group}`)} · ${effortSummary(entry)}`),
    ],
  });
  const addButton = el('button', {
    className: 'add',
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
  const infoButton = el('button', {
    className: 'info-btn',
    text: 'ⓘ',
    attrs: { type: 'button', 'data-info': entry.key, 'aria-label': t('exerciseInfo.trigger') },
  });
  return el('div', { className: 'libcard', children: [addButton, infoButton] });
}

/** Grille des exercices proposes ; un clic ajoute la ligne au deroule, l'autre ouvre la fiche info. */
export function createLibrary(ctx: Context): { render: () => void } {
  const grid = byId('library');
  const searchInput = byId<HTMLInputElement>('libSearch');
  const groupSelect = byId<HTMLSelectElement>('libGroupFilter');
  const categoryFilter = byId('libCategoryFilter');
  const emptyMessage = byId('libEmpty');

  // Survit aux re-rendus (changement de langue, ajout au deroule...) : le
  // filtre ne doit pas se reinitialiser a chaque fois que renderAll() tourne.
  let search = '';
  let group = '';
  const categories = new Set<CategoryId>();

  searchInput.addEventListener('input', () => {
    search = searchInput.value;
    renderGrid();
  });
  groupSelect.addEventListener('change', () => {
    group = groupSelect.value;
    renderGrid();
  });
  // Delegue sur le conteneur (comme sur `grid` plus bas) plutot qu'un
  // ecouteur par puce, qui serait repose a chaque render().
  categoryFilter.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-category]');
    const id = button?.dataset['category'] as CategoryId | undefined;
    if (!id) return;
    if (categories.has(id)) categories.delete(id);
    else categories.add(id);
    render();
  });

  grid.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    const infoButton = target.closest<HTMLElement>('[data-info]');
    if (infoButton) {
      const key = infoButton.dataset['info'] as ExerciseKey | undefined;
      if (key) ctx.showExerciseInfo(key);
      return;
    }

    const addButton = target.closest<HTMLElement>('[data-add]');
    const key = addButton?.dataset['add'];
    if (!key) return;

    const item = createFromLibrary(key);
    if (!item) return;
    ctx.activePlan().items.push(item);
    ctx.save();
    ctx.renderAll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /**
   * Par groupe musculaire (ordre `GROUP_IDS`), puis alphabetique par nom
   * traduit, plutot que l'ordre de declaration brut de `LIBRARY`. Refait a
   * chaque rendu, donc suit naturellement un changement de langue.
   */
  function sortedLibrary(): LibraryEntry[] {
    const locale = getLocale();
    return [...LIBRARY].sort((a, b) => {
      const groupDiff = GROUP_IDS.indexOf(a.group) - GROUP_IDS.indexOf(b.group);
      if (groupDiff !== 0) return groupDiff;
      return t(`exercise.${a.key}.name`).localeCompare(t(`exercise.${b.key}.name`), locale);
    });
  }

  function renderGrid(): void {
    const term = normalize(search);
    const filtered = sortedLibrary().filter((entry) => {
      if (group && entry.group !== group) return false;
      if (categories.size > 0 && !categories.has(entry.category)) return false;
      if (term && !normalize(t(`exercise.${entry.key}.name`)).includes(term)) return false;
      return true;
    });
    grid.replaceChildren(...filtered.map(card));
    grid.hidden = filtered.length === 0;
    emptyMessage.hidden = filtered.length > 0;
  }

  function render(): void {
    // Options du filtre reconstruites a chaque rendu : le libelle des
    // groupes suit la langue active.
    groupSelect.replaceChildren(
      el('option', { text: t('library.filterAll'), attrs: { value: '' } }),
      ...GROUP_IDS.map((id) => el('option', { text: t(`group.${id}`), attrs: { value: id } })),
    );
    groupSelect.value = group;
    searchInput.value = search;
    // Meme raison que les options du select : le libelle suit la langue
    // active, et `aria-pressed` doit refleter l'etat courant du filtre.
    categoryFilter.replaceChildren(
      ...CATEGORY_IDS.map((id) =>
        el('button', {
          text: t(`category.${id}`),
          className: 'cat-chip',
          attrs: {
            type: 'button',
            'data-category': id,
            'aria-pressed': String(categories.has(id)),
          },
        }),
      ),
    );
    renderGrid();
  }

  return { render };
}
