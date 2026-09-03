import { t } from '../i18n';
import { groupColor } from '../data/groups';
import { buildCircuit } from '../core/queue';
import { exerciseName, isExercise } from '../core/plan';
import type { Step } from '../core/types';
import type { Context } from './app';
import { byId, dot, el } from './dom';
import { humanDuration } from './format';

function restChip(step: Extract<Step, { kind: 'rest' }>): HTMLElement {
  const label = step.reason === 'transition' ? t('rest.transition') : t('rest.manual');
  return el('span', {
    className: 'step pause',
    text: `${label} ${humanDuration(step.seconds)}`,
  });
}

function workChip(step: Extract<Step, { kind: 'work' }>): HTMLElement {
  return el('span', {
    className: 'step',
    children: [
      dot(groupColor(step.item.group)),
      document.createTextNode(exerciseName(step.item)),
      el('span', { className: 'sn', text: `${step.set}/${step.sets}` }),
    ],
  });
}

/** Apercu de l'enchainement, visible uniquement en mode circuit. */
export function createPreview(ctx: Context): { render: () => void } {
  const panel = byId('preview');
  const lead = byId('previewLead');
  const sequence = byId('previewSeq');
  const count = byId('previewCount');

  function render(): void {
    const { plan, config } = ctx.state;
    const visible = config.mode === 'circuit' && plan.some(isExercise);
    panel.classList.toggle('on', visible);
    if (!visible) return;

    const queue = buildCircuit(plan, config);
    sequence.replaceChildren(
      ...queue.map((step) => (step.kind === 'rest' ? restChip(step) : workChip(step))),
    );

    const works = queue.filter((step) => step.kind === 'work').length;
    const forced = queue.filter((step) => step.kind === 'rest' && step.reason === 'forced').length;

    lead.textContent = t('preview.lead', { count: works });
    count.textContent =
      forced === 0 ? t('preview.noneForced') : t('preview.forced', { count: forced });
  }

  return { render };
}
