// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import { getLocale, t } from '../i18n';
import { GROUP_IDS, groupColor, groupsOverlap } from '../data/groups';
import { CATEGORY_IDS } from '../data/categories';
import { LIBRARY } from '../data/library';
import { activeTenant } from '../data/tenants';
import { figureSvg } from '../data/figures';
import { createFromLibrary, createFromTenant } from '../core/plan';
import type { CategoryId, EffortMode, ExerciseKey, GroupId } from '../core/types';
import type { Context } from './app';
import { byId, dot, el, groupOptions } from './dom';
import { effortSummary } from './format';

/**
 * Les groupes qui ont au moins un exercice a montrer, parents compris. « Corps
 * entier » n'en a aucun : l'offrir au filtre serait un cul-de-sac, une option
 * qui ne renvoie jamais rien. Calcule une fois — `LIBRARY` ne bouge pas.
 */
const FILTERABLE = new Set(
  GROUP_IDS.filter((id) => LIBRARY.some((entry) => groupsOverlap(entry.group, id))),
);

/** Insensible aux majuscules et aux accents : "epaule" trouve "Épaules". */
function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

/**
 * Une carte de la grille, mise a plat.
 *
 * Deux origines s'y melangent : les 62 exercices de `LIBRARY`, dont le nom se
 * resout par `t()`, et ceux d'une salle (`data/tenants.ts`), dont le nom est du
 * texte deja ecrit. La carte, elle, est la meme — d'ou cette forme commune,
 * calculee a chaque rendu pour suivre la langue active.
 */
interface CatalogueCard {
  key: string;
  name: string;
  group: GroupId;
  category: CategoryId;
  mode: EffortMode;
  sets: number;
  reps: number;
  seconds: number;
  rest: number;
  /** Vrai pour une entree CIRKALI : elle seule a une fiche a montrer. */
  guide: boolean;
}

/**
 * Le catalogue visible ici et maintenant : CIRKALI, plus la salle s'il y en a
 * une. Jamais « a la place de » — une salle ajoute ses machines, elle ne retire
 * pas les exercices au poids du corps.
 */
function catalogue(): CatalogueCard[] {
  const own = LIBRARY.map((entry) => ({
    ...entry,
    name: t(`exercise.${entry.key}.name`),
    guide: true,
  }));
  const tenant = (activeTenant()?.exercises ?? []).map((entry) => ({ ...entry, guide: false }));
  return [...own, ...tenant];
}

function card(entry: CatalogueCard): HTMLElement {
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
          el('span', { className: 'ln', text: entry.name }),
          detail,
        ],
      }),
    ],
  });
  // Meme regle que dans le deroule (`infoButton()`, ui/planner.ts) : pas de
  // fiche pour ce qui n'a pas de contenu long, donc pas de bouton.
  const infoButton = entry.guide
    ? el('button', {
        className: 'info-btn',
        text: 'ⓘ',
        attrs: { type: 'button', 'data-info': entry.key, 'aria-label': t('exerciseInfo.trigger') },
      })
    : null;
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

    const entry = catalogue().find((candidate) => candidate.key === key);
    if (!entry) return;
    // Un exercice de salle devient une ligne PERSO portant son nom, pas une
    // cle de bibliotheque : c'est ce qui lui permet de traverser le stockage,
    // un lien de partage et le nuage sans rien casser (voir data/tenants.ts).
    const item = entry.guide ? createFromLibrary(key) : createFromTenant(entry);
    if (!item) return;
    ctx.activePlan().items.push(item);
    ctx.save();
    ctx.renderAll();
    // La carte ajoutee est le dernier <li> : on vient de `push()` en fin de
    // tableau, et planner.render() reconstruit la liste dans l'ordre de `items`.
    // `center` plutot que `nearest` : la barre d'action fixe du bas masquerait
    // une carte calee contre le bord inferieur.
    byId('plan').lastElementChild?.scrollIntoView({
      // Le bloc CSS `prefers-reduced-motion` ne peut rien contre un defilement
      // anime demande en JS : c'est ici qu'il faut le respecter.
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center',
    });
  });

  /**
   * Par groupe musculaire (ordre `GROUP_IDS`), puis alphabetique par nom
   * traduit, plutot que l'ordre de declaration brut de `LIBRARY`. Refait a
   * chaque rendu, donc suit naturellement un changement de langue.
   */
  function sortedLibrary(): CatalogueCard[] {
    const locale = getLocale();
    return catalogue().sort((a, b) => {
      const groupDiff = GROUP_IDS.indexOf(a.group) - GROUP_IDS.indexOf(b.group);
      if (groupDiff !== 0) return groupDiff;
      return a.name.localeCompare(b.name, locale);
    });
  }

  function renderGrid(): void {
    const term = normalize(search);
    const filtered = sortedLibrary().filter((entry) => {
      // Par recouvrement : choisir « Jambes » doit montrer cuisses, fessiers
      // et mollets, pas une grille vide (`data/groups.ts`).
      if (group && !groupsOverlap(entry.group, group)) return false;
      if (categories.size > 0 && !categories.has(entry.category)) return false;
      if (term && !normalize(entry.name).includes(term)) return false;
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
      ...groupOptions((id) => FILTERABLE.has(id)),
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
