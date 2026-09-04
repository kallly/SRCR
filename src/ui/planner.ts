import { t } from '../i18n';
import { groupColor, GROUP_IDS } from '../data/groups';
import { exerciseCue, exerciseName, isExercise, move } from '../core/plan';
import { isLibraryKey } from '../data/library';
import type { ExerciseItem, ExerciseKey, PlanItem, RestItem } from '../core/types';
import type { Context } from './app';
import { byId, dot, el, numberField, selectField } from './dom';

/** Champs numeriques dont la modification ne touche pas la structure du deroule. */
const NUMERIC_FIELDS = new Set(['sets', 'reps', 'seconds', 'rest']);

function arrows(index: number, total: number): HTMLElement {
  const up = el('button', {
    className: 'mini',
    text: '▲',
    attrs: { type: 'button', 'data-move': 'up', 'data-index': String(index), 'aria-label': t('item.moveUp') },
  });
  const down = el('button', {
    className: 'mini',
    text: '▼',
    attrs: { type: 'button', 'data-move': 'down', 'data-index': String(index), 'aria-label': t('item.moveDown') },
  });
  up.disabled = index === 0;
  down.disabled = index === total - 1;
  return el('div', { className: 'arrows', children: [up, down] });
}

function deleteButton(id: string): HTMLElement {
  return el('button', {
    className: 'del',
    text: '×',
    attrs: { type: 'button', 'data-delete': id, 'aria-label': t('item.delete') },
  });
}

/** Un exercice perso n'a pas de fiche (aucun contenu associe a la cle `custom`). */
function infoButton(key: ExerciseKey): HTMLElement | null {
  if (!isLibraryKey(key)) return null;
  return el('button', {
    className: 'info-btn',
    text: 'ⓘ',
    attrs: { type: 'button', 'data-info': key, 'aria-label': t('exerciseInfo.trigger') },
  });
}

function restRow(item: RestItem, index: number, total: number): HTMLElement {
  const top = el('div', {
    className: 'top',
    children: [
      el('div', { className: 'name', text: t('item.restName') }),
      arrows(index, total),
      deleteButton(item.id),
    ],
  });
  const fields = el('div', {
    className: 'fields',
    children: [
      numberField(t('item.restSeconds'), item.seconds, 'seconds', item.id, {
        min: '5',
        max: '900',
        step: '5',
      }),
    ],
  });
  return el('li', {
    className: 'item rest',
    children: [el('div', { className: 'idx', text: '⋯' }), top, fields],
  });
}

function exerciseRow(
  item: ExerciseItem,
  index: number,
  total: number,
  position: number,
  showRest: boolean,
): HTMLElement {
  const cue = exerciseCue(item);
  const name = el('div', {
    className: 'name',
    children: [
      document.createTextNode(exerciseName(item)),
      el('div', {
        className: 'chip',
        children: [dot(groupColor(item.group)), document.createTextNode(t(`group.${item.group}`))],
      }),
      infoButton(item.key),
      cue ? el('div', { className: 'cue', text: cue }) : null,
    ],
  });

  const top = el('div', {
    className: 'top',
    children: [name, arrows(index, total), deleteButton(item.id)],
  });

  const effortLabel = item.mode === 'reps' ? t('item.reps') : t('item.seconds');
  const effortField = item.mode === 'reps' ? 'reps' : 'seconds';
  const effortValue = item.mode === 'reps' ? item.reps : item.seconds;

  const fields = el('div', {
    className: 'fields',
    children: [
      numberField(t('item.sets'), item.sets, 'sets', item.id, { min: '1', max: '10' }),
      selectField(t('item.effort'), item.mode, 'mode', item.id, [
        { value: 'reps', label: t('effort.reps') },
        { value: 'time', label: t('effort.time') },
      ]),
      numberField(effortLabel, effortValue, effortField, item.id, { min: '1', max: '3600' }),
      selectField(
        t('item.group'),
        item.group,
        'group',
        item.id,
        GROUP_IDS.map((id) => ({ value: id, label: t(`group.${id}`) })),
        'f wide',
      ),
      // En mode circuit, la pause est gouvernee par le reglage global : afficher
      // un repos par exercice laisserait croire qu'il a un effet.
      showRest
        ? numberField(t('item.rest'), item.rest, 'rest', item.id, {
            min: '0',
            max: '600',
            step: '10',
          })
        : null,
    ],
  });
  if (showRest) fields.lastElementChild?.classList.add('wide');

  return el('li', {
    className: 'item',
    children: [el('div', { className: 'idx', text: String(position) }), top, fields],
  });
}

export function createPlanner(ctx: Context): { render: () => void } {
  const list = byId<HTMLUListElement>('plan');
  const empty = byId('empty');

  list.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest('button');
    if (!button) return;
    const plan = ctx.activePlan().items;

    const infoKey = button.dataset['info'] as ExerciseKey | undefined;
    if (infoKey) {
      ctx.showExerciseInfo(infoKey);
      return;
    }

    const deleteId = button.dataset['delete'];
    if (deleteId) {
      const removedIndex = plan.findIndex((item) => item.id === deleteId);
      if (removedIndex === -1) return;
      const [removed] = plan.splice(removedIndex, 1);
      // Capture l'id de LA seance concernee : si l'utilisateur bascule vers
      // une autre seance avant de cliquer "Annuler", ctx.activePlan() aurait
      // alors renvoye la nouvelle seance active, pas celle d'origine.
      const planId = ctx.activePlan().id;
      ctx.save();
      ctx.renderAll();
      if (removed) {
        ctx.toast.show(t('toast.deleted'), t('toast.undo'), () => {
          const target = ctx.getPlan(planId);
          if (!target) return;
          target.items.splice(removedIndex, 0, removed);
          ctx.save();
          ctx.renderAll();
        });
      }
      return;
    }

    const direction = button.dataset['move'];
    const index = Number(button.dataset['index']);
    if (direction && Number.isInteger(index)) {
      move(plan, index, direction === 'up' ? index - 1 : index + 1);
      ctx.save();
      ctx.renderAll();
    }
  });

  list.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement | HTMLSelectElement;
    const field = input.dataset['field'];
    const id = input.dataset['id'];
    if (!field || !id) return;

    const item = ctx.activePlan().items.find((entry) => entry.id === id);
    if (!item) return;

    if (NUMERIC_FIELDS.has(field)) {
      const value = Math.max(0, Number.parseInt(input.value, 10) || 0);
      if (field === 'seconds') item.seconds = value;
      else if (isExercise(item)) {
        if (field === 'sets') item.sets = value;
        else if (field === 'reps') item.reps = value;
        else if (field === 'rest') item.rest = value;
      }
      ctx.save();
      // Une saisie chiffree ne change pas la structure du deroule : on ne
      // reconstruit pas la liste, ce qui garderait le focus au passage.
      ctx.renderDerived();
      return;
    }

    if (!isExercise(item)) return;
    if (field === 'mode' && (input.value === 'reps' || input.value === 'time')) {
      item.mode = input.value;
    } else if (field === 'group') {
      const group = GROUP_IDS.find((id) => id === input.value);
      if (group) item.group = group;
    }
    ctx.save();
    ctx.renderAll();
  });

  function render(): void {
    const active = ctx.activePlan();
    const plan = active.items;
    const showRest = active.config.mode === 'classic';
    list.replaceChildren();

    let position = 0;
    plan.forEach((item: PlanItem, index) => {
      if (isExercise(item)) {
        position += 1;
        list.append(exerciseRow(item, index, plan.length, position, showRest));
      } else {
        list.append(restRow(item, index, plan.length));
      }
    });

    // La liste vide est masquee, comme la grille de la bibliotheque quand la
    // recherche ne donne rien (ui/library.ts). Deux raisons : un <ul> vide n'a
    // rien a annoncer a un lecteur d'ecran, et surtout la reservation de
    // hauteur `#plan:empty` (planner.css) ne doit s'appliquer qu'AVANT le
    // premier rendu — sans ce masquage, vider le deroule rouvrirait un trou
    // de ~2000px au-dessus du message « Aucun exercice ».
    list.hidden = plan.length === 0;
    empty.style.display = plan.length > 0 ? 'none' : 'block';
  }

  return { render };
}
