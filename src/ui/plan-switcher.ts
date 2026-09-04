import { t } from '../i18n';
import type { Context } from './app';
import { byId, el } from './dom';
import { createInlineInput } from './inline-input';

/**
 * Selecteur de la seance active, avec creation / duplication / renommage /
 * suppression. Reconstruit entierement a chaque rendu (comme les options du
 * filtre de groupe dans ui/library.ts) : les libelles suivent la langue
 * active, et l'ensemble reste petit, donc bon marche a refaire.
 */
export function createPlanSwitcher(ctx: Context): { render: () => void } {
  const container = byId('planSwitcher');

  function render(): void {
    // Un renderAll() declenche ailleurs (ajout d'exercice, changement de
    // mode...) ne doit pas ecraser un formulaire de creation/renommage en
    // cours de saisie : on suspend la reconstruction tant qu'il est ouvert.
    if (container.querySelector('.inline-input')) return;

    const { plans } = ctx.state;
    const activePlan = ctx.activePlan();

    const select = el('select', {
      attrs: { id: 'planSelect', 'aria-label': t('plans.label') },
    });
    for (const plan of plans) {
      const option = el('option', {
        text: plan.name ?? t('plans.unnamed'),
        attrs: { value: plan.id },
      });
      if (plan.id === activePlan.id) option.selected = true;
      select.append(option);
    }
    select.addEventListener('change', () => ctx.switchPlan(select.value));

    const selectField = el('div', {
      className: 'f',
      children: [el('label', { text: t('plans.label'), attrs: { for: 'planSelect' } }), select],
    });

    const newBtn = el('button', {
      className: 'ghost',
      text: t('plans.new'),
      attrs: { type: 'button' },
    });
    const duplicateBtn = el('button', {
      className: 'ghost',
      text: t('plans.duplicate'),
      attrs: { type: 'button' },
    });
    const renameBtn = el('button', {
      className: 'ghost',
      text: t('plans.rename'),
      attrs: { type: 'button' },
    });
    const deleteBtn = el('button', {
      className: 'ghost',
      text: t('plans.delete'),
      attrs: { type: 'button' },
    });
    // Desactive plutot que confirme-puis-refuse : plus clair, evite une
    // confirmation qui ne mene a rien quand il ne reste qu'une seule seance.
    deleteBtn.disabled = plans.length <= 1;

    createInlineInput(newBtn, {
      label: () => t('plans.namePrompt'),
      confirmLabel: () => t('actions.confirm'),
      cancelLabel: () => t('actions.cancel'),
      placeholder: () => t('plans.namePrompt'),
      onConfirm: (name) => ctx.createPlan(name),
    });

    createInlineInput(renameBtn, {
      label: () => t('plans.namePrompt'),
      confirmLabel: () => t('actions.confirm'),
      cancelLabel: () => t('actions.cancel'),
      placeholder: () => t('plans.namePrompt'),
      initialValue: () => activePlan.name ?? '',
      onConfirm: (name) => ctx.renamePlan(activePlan.id, name),
    });

    duplicateBtn.addEventListener('click', () => ctx.duplicatePlan(activePlan.id));

    deleteBtn.addEventListener('click', () => {
      if (plans.length <= 1) return;
      if (!window.confirm(t('plans.confirmDelete'))) return;
      ctx.deletePlan(activePlan.id);
    });

    container.replaceChildren(
      selectField,
      el('div', {
        className: 'plan-actions',
        children: [newBtn, duplicateBtn, renameBtn, deleteBtn],
      }),
    );
  }

  return { render };
}
