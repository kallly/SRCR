import { formatDate, t } from '../i18n';
import type { Context } from './app';
import { byId } from './dom';

/** Nombre de dates rappelees sous la bibliotheque. */
const RECENT = 5;

export function createHistory(ctx: Context): { render: () => void } {
  const node = byId('history');

  function render(): void {
    const { history } = ctx.state;
    if (history.length === 0) {
      node.textContent = '';
      return;
    }
    const dates = history.slice(-RECENT).reverse().map(formatDate).join(' · ');
    node.textContent = t('history.summary', { count: history.length, dates });
  }

  return { render };
}
