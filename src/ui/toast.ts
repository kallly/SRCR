// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

import { el } from './dom';

/** Duree d'affichage avant disparition automatique. */
const TOAST_MS = 5000;

export interface Toast {
  /**
   * `actionLabel`/`onAction` vont ensemble et sont facultatifs : un toast
   * purement informatif (« des seances sont arrivees du nuage ») n'a pas
   * d'action a proposer, et un bouton qui ne ferait que fermer serait un
   * bouton qui ne sert a rien — le toast disparait seul.
   */
  show(message: string, actionLabel?: string, onAction?: () => void): void;
}

/**
 * Toast transitoire avec une action (« Annuler »), cree une seule fois et
 * ajoute directement au document — jamais de markup statique dans
 * index.html : son contenu est toujours du texte transitoire genere en JS.
 * Un nouveau toast remplace le precedent.
 */
export function createToast(): Toast {
  const node = el('div', { className: 'toast', attrs: { role: 'status', 'aria-live': 'polite' } });
  document.body.append(node);

  let hideTimer: number | null = null;

  function hide(): void {
    node.classList.remove('on');
    node.replaceChildren();
  }

  function show(message: string, actionLabel?: string, onAction?: () => void): void {
    if (hideTimer !== null) window.clearTimeout(hideTimer);

    const actionBtn =
      actionLabel !== undefined && onAction !== undefined
        ? el('button', {
            className: 'toast-action',
            text: actionLabel,
            attrs: { type: 'button' },
          })
        : null;
    actionBtn?.addEventListener('click', () => {
      if (hideTimer !== null) window.clearTimeout(hideTimer);
      hide();
      onAction?.();
    });

    node.replaceChildren(el('span', { text: message }), ...(actionBtn ? [actionBtn] : []));
    node.classList.add('on');
    hideTimer = window.setTimeout(hide, TOAST_MS);
  }

  return { show };
}
