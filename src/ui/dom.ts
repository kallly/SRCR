import { t, type TranslationKey } from '../i18n';

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
 * `field`+`itemId` sont deja uniques ensemble (un champ donne d'une ligne
 * donnee) : ca suffit comme id DOM, pas besoin d'un compteur separe.
 */
function fieldId(field: string, itemId: string): string {
  return `f-${field}-${itemId}`;
}

/** Champ numerique du deroule, identifie par l'element et le nom du champ. */
export function numberField(
  label: string,
  value: number,
  field: string,
  itemId: string,
  attrs: Record<string, string>,
): HTMLElement {
  const id = fieldId(field, itemId);
  const input = el('input', {
    attrs: {
      type: 'number',
      value: String(value),
      id,
      'data-field': field,
      'data-id': itemId,
      ...attrs,
    },
  });
  return el('div', {
    className: 'f',
    children: [el('label', { text: label, attrs: { for: id } }), input],
  });
}

export function selectField(
  label: string,
  value: string,
  field: string,
  itemId: string,
  options: { value: string; label: string }[],
  className = 'f',
): HTMLElement {
  const id = fieldId(field, itemId);
  const select = el('select', { attrs: { id, 'data-field': field, 'data-id': itemId } });
  for (const option of options) {
    const node = el('option', { text: option.label, attrs: { value: option.value } });
    if (option.value === value) node.selected = true;
    select.append(node);
  }
  return el('div', {
    className,
    children: [el('label', { text: label, attrs: { for: id } }), select],
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
