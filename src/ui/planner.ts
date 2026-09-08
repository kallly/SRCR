import { t } from '../i18n';
import { groupColor, GROUP_IDS } from '../data/groups';
import { exerciseName, isExercise, move } from '../core/plan';
import { isLibraryKey } from '../data/library';
import type { ExerciseItem, ExerciseKey, PlanItem, RestItem } from '../core/types';
import type { Context } from './app';
import { byId, dot, el, numberField, selectField } from './dom';

/** Champs numeriques dont la modification ne touche pas la structure du deroule. */
const NUMERIC_FIELDS = new Set(['sets', 'reps', 'seconds', 'rest']);

/**
 * Rail de reordonnancement, colle au bord gauche de la carte : monter, le
 * numero de position, descendre. Les fleches gardent leur gabarit 44x44 —
 * ce sont les seules cibles tactiles vraiment repetees de la carte.
 */
function reorderRail(label: string, index: number, total: number): HTMLElement {
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
  return el('div', {
    className: 'reorder',
    children: [up, el('div', { className: 'idx', text: label }), down],
  });
}

/** Coin haut droit de la carte. Volontairement plus petite que 44px (voir CLAUDE.md). */
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

/**
 * Carte d'une pause. Plus rien n'en cree (voir `RestItem`, core/types.ts) :
 * ce rendu sert aux seances et aux liens qui en contiennent deja, ou la
 * ligne reste modifiable et supprimable comme avant.
 */
function restRow(item: RestItem, index: number, total: number): HTMLElement {
  const top = el('div', {
    className: 'top',
    children: [
      el('div', {
        className: 'name',
        children: [el('div', { className: 'title', text: t('item.restName') })],
      }),
      deleteButton(item.id),
    ],
  });
  const fields = el('div', {
    className: 'fields',
    children: [
      numberField({
        ariaLabel: t('item.restSeconds'),
        unit: t('effort.timeShort'),
        value: item.seconds,
        field: 'seconds',
        itemId: item.id,
        attrs: { min: '5', max: '900', step: '5' },
      }),
    ],
  });
  return el('li', {
    className: 'item rest',
    children: [
      reorderRail('⋯', index, total),
      el('div', { className: 'content', children: [top, fields] }),
    ],
  });
}

function exerciseRow(
  item: ExerciseItem,
  index: number,
  total: number,
  position: number,
  showRest: boolean,
): HTMLElement {
  // Le conseil d'execution (exerciseCue) n'est plus affiche ici : il figeait
  // le deroule, deja dense, alors qu'il n'est utile qu'au moment de faire
  // l'exercice — il reste affiche dans le lecteur (ui/runner.ts, paintWork),
  // pour les deux modes.
  // Le badge de groupe est un bloc sous le titre, jamais en fin de ligne :
  // `.name` est une colonne, pas un flux inline ou le badge remonterait a
  // cote du titre des que celui-ci est court.
  const name = el('div', {
    className: 'name',
    children: [
      el('div', { className: 'title', text: exerciseName(item) }),
      el('div', {
        className: 'chip',
        children: [dot(groupColor(item.group)), document.createTextNode(t(`group.${item.group}`))],
      }),
    ],
  });

  const top = el('div', {
    className: 'top',
    children: [name, deleteButton(item.id)],
  });

  // Le select de mode sert d'unite au champ d'effort (`[ 10 ] [reps ▾]`) :
  // il remplace l'ancien champ « Type » separe, une redondance de moins.
  const effort = numberField({
    ariaLabel: item.mode === 'reps' ? t('item.reps') : t('item.seconds'),
    value: item.mode === 'reps' ? item.reps : item.seconds,
    field: item.mode === 'reps' ? 'reps' : 'seconds',
    itemId: item.id,
    attrs: { min: '1', max: '3600' },
  });
  effort.append(
    selectField({
      ariaLabel: t('item.effort'),
      value: item.mode,
      field: 'mode',
      itemId: item.id,
      // Libelles longs dans la liste (« Secondes » seul est comprehensible),
      // unite courte une fois l'option choisie.
      choices: [
        { value: 'reps', label: t('effort.reps') },
        { value: 'time', label: t('effort.time') },
      ],
      display: item.mode === 'reps' ? t('effort.repsShort') : t('effort.timeShort'),
    }),
  );

  const fields = el('div', {
    className: 'fields',
    children: [
      numberField({
        ariaLabel: t('item.sets'),
        unit: t('item.sets'),
        value: item.sets,
        field: 'sets',
        itemId: item.id,
        attrs: { min: '1', max: '10' },
      }),
      effort,
      // Le groupe musculaire d'un exercice de la bibliotheque est intrinseque
      // a l'exercice (donnee de src/data/library.ts) : le rendre modifiable
      // desynchroniserait le badge affiche et fausserait le regroupement du
      // mode circuit. Seul un exercice perso n'a pas d'autre moyen de le
      // renseigner.
      !isLibraryKey(item.key)
        ? el('div', {
            className: 'f-inline',
            children: [
              selectField({
                ariaLabel: t('item.group'),
                value: item.group,
                field: 'group',
                itemId: item.id,
                choices: GROUP_IDS.map((id) => ({ value: id, label: t(`group.${id}`) })),
              }),
            ],
          })
        : null,
      // En mode circuit, la pause est gouvernee par le reglage global : afficher
      // un repos par exercice laisserait croire qu'il a un effet.
      showRest
        ? numberField({
            ariaLabel: t('item.rest'),
            unit: t('item.restShort'),
            value: item.rest,
            field: 'rest',
            itemId: item.id,
            attrs: { min: '0', max: '600', step: '10' },
          })
        : null,
      // Coin bas droit : action secondaire, poussee a l'oppose des champs.
      infoButton(item.key),
    ],
  });

  return el('li', {
    className: 'item',
    // Meme teinte que le chip et le lecteur : la bande de gauche permet de
    // scanner le deroule par groupe musculaire d'un coup d'oeil.
    attrs: { style: `border-left-color: ${groupColor(item.group)}` },
    children: [
      reorderRail(String(position), index, total),
      el('div', { className: 'content', children: [top, fields] }),
    ],
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
      // Pas d'annulation a proposer sur une seance CIRKALI : `save()` vient
      // d'ouvrir la question « en creer votre version ? », dont le refus
      // remet deja le modele en etat — et si la personne accepte, la ligne
      // supprimee l'est dans SA copie, qu'elle modifie librement. Un
      // « Annuler » derriere la modale viserait un modele qui n'existe plus.
      if (removed && !ctx.activePreset()) {
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
