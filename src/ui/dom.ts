import { t, type TranslationKey } from '../i18n';
import { GROUP_TREE } from '../data/groups';
import type { GroupId } from '../core/types';

/** Recupere un element du document, en echouant tot si le markup a change. */
export function byId<T extends HTMLElement = HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element introuvable : #${id}`);
  return element as T;
}

interface ElementOptions {
  className?: string;
  text?: string;
  html?: string;
  attrs?: Record<string, string>;
  children?: (Node | null)[];
}

/**
 * Cree un element. `text` passe par textContent : c'est le chemin a utiliser
 * pour tout contenu saisi par l'utilisateur. `html` n'est reserve qu'aux
 * fragments statiques que nous produisons nous-memes (les figures SVG).
 */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: ElementOptions = {},
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text;
  if (options.html !== undefined) node.innerHTML = options.html;
  for (const [name, value] of Object.entries(options.attrs ?? {})) {
    node.setAttribute(name, value);
  }
  for (const child of options.children ?? []) {
    if (child) node.append(child);
  }
  return node;
}

/** Pastille de couleur d'un groupe musculaire. */
export function dot(color: string): HTMLElement {
  return el('i', { attrs: { style: `background:${color}` } });
}

/**
 * Options d'un selecteur de groupe musculaire, arbre compris.
 *
 * Chaque parent ouvre un <optgroup> dont il est LA PREMIERE OPTION : le label
 * d'un <optgroup> n'est pas selectionnable en HTML, or le parent doit rester
 * une reponse possible (`data/groups.ts`). Le libelle apparait donc deux fois
 * dans la liste ouverte, et c'est voulu — une fois ferme, un <select> n'affiche
 * que le texte de l'option choisie, jamais le titre de son groupe : une option
 * « Tout » y deviendrait illisible, exactement le piege documente pour
 * `.unit-select`.
 *
 * `accept` sert a masquer un groupe sans exercice a proposer ; un parent dont
 * tous les enfants sont ecartes disparait avec eux. Les libelles sont lus a
 * l'appel, donc a reconstruire a chaque rendu ou ouverture pour suivre la
 * langue active.
 */
export function groupOptions(accept: (id: GroupId) => boolean = () => true): HTMLElement[] {
  const option = (id: GroupId): HTMLOptionElement =>
    el('option', { text: t(`group.${id}`), attrs: { value: id } });

  return GROUP_TREE.flatMap((node) => {
    const children = node.children.filter(accept);
    const self = accept(node.id);
    if (children.length === 0) return self ? [option(node.id)] : [];
    return [
      el('optgroup', {
        attrs: { label: t(`group.${node.id}`) },
        children: [self ? option(node.id) : null, ...children.map(option)],
      }),
    ];
  });
}

/**
 * Ferme un <dialog> natif au clic sur son bouton de fermeture ou sur le fond
 * (en dehors du contenu, qui occupe toute la boite de dialogue). Partage par
 * toutes les modals de l'app (ui/exercise-info.ts, ui/share.ts) plutot que
 * de repeter ces deux ecouteurs a chaque fois.
 */
export function wireDialogClose(dialog: HTMLDialogElement, closeButton: HTMLElement): void {
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

/**
 * `field`+`itemId` sont deja uniques ensemble (un champ donne d'une ligne
 * donnee) : ca suffit comme id DOM, pas besoin d'un compteur separe.
 */
function fieldId(field: string, itemId: string): string {
  return `f-${field}-${itemId}`;
}

/**
 * Champs compacts du deroule : l'unite s'affiche A COTE du nombre (`unit`)
 * au lieu d'une etiquette empilee au-dessus, ce qui rend ~19px par champ.
 * Le libelle complet reste porte par `ariaLabel` — un suffixe court comme
 * « s repos » ne suffirait pas a un lecteur d'ecran.
 *
 * Classe `.f-inline` et non `.f` : cette derniere est partagee avec le bloc
 * reglages d'index.html et le selecteur de seance, qui gardent tous deux
 * l'etiquette au-dessus du champ.
 */
export interface FieldOptions {
  /** Libelle complet, jamais affiche : c'est le nom accessible du champ. */
  ariaLabel: string;
  /** Suffixe court affiche apres le champ. Omis quand un select fait office d'unite. */
  unit?: string;
  field: string;
  itemId: string;
}

/**
 * `value: null` rend un champ VIDE, pas un zero : c'est ce que demande la
 * charge (`ExerciseItem.weight`), dont l'absence est une valeur a part
 * entiere. Un `0` affiche laisserait croire qu'une charge nulle a ete reglee,
 * et obligerait a distinguer « pas de charge » de « 0 kg » partout ailleurs.
 */
export function numberField(
  options: FieldOptions & { value: number | null; attrs: Record<string, string> },
): HTMLElement {
  const input = el('input', {
    attrs: {
      type: 'number',
      value: options.value === null ? '' : String(options.value),
      id: fieldId(options.field, options.itemId),
      'aria-label': options.ariaLabel,
      'data-field': options.field,
      'data-id': options.itemId,
      ...options.attrs,
    },
  });
  return el('div', {
    className: 'f-inline',
    children: [input, options.unit ? el('span', { className: 'unit', text: options.unit }) : null],
  });
}

/**
 * Select compact des cartes du deroule.
 *
 * Sans `display`, c'est un `<select>` nu (cas du groupe musculaire d'un
 * exercice perso). Avec `display`, il sert d'unite juste apres un champ
 * numerique (`[ 10 ] [s ▾]`) et le select natif est rendu transparent
 * par-dessus un libelle court dessine a la main : la liste montre alors les
 * libelles longs (« Secondes »), la carte l'unite courte (« s »).
 *
 * Un `<select>` natif affiche toujours le texte de l'option selectionnee
 * quand il est ferme — ni `option[label]` ni la CSS ne dissocient les deux
 * etats, et il n'existe pas d'evenement d'ouverture exploitable (sur mobile
 * c'est une feuille native de l'OS). Cette superposition est donc le seul
 * moyen d'avoir les deux, tout en gardant le selecteur natif.
 */
export function selectField(
  options: FieldOptions & {
    value: string;
    choices: { value: string; label: string }[];
    /** Texte court affiche a la place de l'option choisie, une fois le select ferme. */
    display?: string;
  },
): HTMLElement {
  const select = el('select', {
    attrs: {
      id: fieldId(options.field, options.itemId),
      'aria-label': options.ariaLabel,
      'data-field': options.field,
      'data-id': options.itemId,
    },
  });
  for (const choice of options.choices) {
    const node = el('option', { text: choice.label, attrs: { value: choice.value } });
    if (choice.value === options.value) node.selected = true;
    select.append(node);
  }

  if (options.display === undefined) return select;

  return el('span', {
    className: 'unit-select',
    children: [
      // Le nom accessible reste celui du select (aria-label + libelles longs).
      el('span', { className: 'unit', text: options.display, attrs: { 'aria-hidden': 'true' } }),
      select,
    ],
  });
}

/**
 * Remplit le markup statique d'index.html. Rejoue a chaque changement de
 * langue ; le contenu genere par le JS appelle `t()` directement.
 */
export function applyStaticTranslations(root: ParentNode = document): void {
  for (const node of root.querySelectorAll<HTMLElement>('[data-i18n]')) {
    const key = node.dataset['i18n'];
    if (key) node.textContent = t(key as TranslationKey);
  }
  for (const node of root.querySelectorAll<HTMLElement>('[data-i18n-aria-label]')) {
    const key = node.dataset['i18nAriaLabel'];
    if (key) node.setAttribute('aria-label', t(key as TranslationKey));
  }
  for (const node of root.querySelectorAll<HTMLInputElement>('[data-i18n-placeholder]')) {
    const key = node.dataset['i18nPlaceholder'];
    if (key) node.placeholder = t(key as TranslationKey);
  }
}
