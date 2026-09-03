import { t } from '../i18n';
import { buildQueue, queueDuration } from '../core/queue';
import { isExercise } from '../core/plan';
import type { Context } from './app';
import { byId } from './dom';
import { humanDuration } from './format';

/** Barre fixe du bas : resume de la seance et bouton de demarrage. */
export function createStatusBar(ctx: Context): { render: () => void } {
  const title = byId('barTitle');
  const subtitle = byId('barSub');
  const start = byId<HTMLButtonElement>('start');

  start.addEventListener('click', () => ctx.startSession());

  function render(): void {
    const { plan, config } = ctx.state;
    start.disabled = plan.length === 0;

    if (plan.length === 0) {
      title.textContent = t('bar.emptyTitle');
      subtitle.textContent = t('bar.emptySub');
      return;
    }

    const exercises = plan.filter(isExercise).length;
    const duration = humanDuration(queueDuration(buildQueue(plan, config)));
    title.textContent = t('bar.exercises', { count: exercises });
    subtitle.textContent = t('bar.subtitle', {
      mode: config.mode === 'circuit' ? t('mode.circuit') : t('mode.classic'),
      duration,
    });
  }

  return { render };
}
