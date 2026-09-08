import { MAX_NAME } from '../core/plan';
import { el } from './dom';

export interface InlineInputOptions {
  /**
   * Fonctions plutot que chaines figees : `open()` les appelle a chaque
   * ouverture, pour retraduire meme si la langue a change depuis la
   * construction du formulaire (`createInlineInput` n'est appele qu'une
   * fois, a l'initialisation du module appelant).
   */
  label(): string;
  confirmLabel(): string;
  cancelLabel(): string;
  placeholder?(): string;
  initialValue?(): string;
  onConfirm(value: string): void;
}

/**
 * Remplace un `window.prompt()` natif par un petit formulaire qui s'insere
 * juste apres le bouton declencheur le temps de la saisie, puis disparait.
 * Partage par l'ajout d'un exercice perso (ui/app.ts) et par la
 * creation/le renommage d'une seance (ui/plan-switcher.ts), pour eviter
 * trois formulaires quasi identiques.
 */
export function createInlineInput(trigger: HTMLElement, options: InlineInputOptions): void {
  function open(): void {
    trigger.hidden = true;

    const input = el('input', {
      attrs: {
        type: 'text',
        value: options.initialValue?.() ?? '',
        placeholder: options.placeholder?.() ?? '',
        // Meme plafond que le champ « Exercice perso » d'index.html, et que
        // celui applique a la relecture (`parsePlanName()`, core/storage.ts) :
        // sans lui, un nom de seance plus long serait accepte a la saisie puis
        // rogne au rechargement suivant, sans que rien ne le dise.
        maxlength: String(MAX_NAME),
        'aria-label': options.label(),
      },
    });
    const confirmBtn = el('button', {
      className: 'ghost',
      text: options.confirmLabel(),
      attrs: { type: 'submit' },
    });
    const cancelBtn = el('button', {
      className: 'ghost',
      text: options.cancelLabel(),
      attrs: { type: 'button' },
    });
    const form = el('form', {
      className: 'inline-input',
      children: [input, confirmBtn, cancelBtn],
    });

    function close(): void {
      form.remove();
      trigger.hidden = false;
    }

    cancelBtn.addEventListener('click', close);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      close();
      if (value) options.onConfirm(value);
    });

    trigger.insertAdjacentElement('afterend', form);
    input.focus();
  }

  trigger.addEventListener('click', open);
}
