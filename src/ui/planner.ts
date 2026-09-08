// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import { t } from '../i18n';
import { groupColor } from '../data/groups';
import { exerciseName, isExercise, move } from '../core/plan';
import { findLibraryEntry, isLibraryKey } from '../data/library';
import { MAX_REPS, MAX_SECONDS, MAX_SETS, MAX_WEIGHT } from '../core/storage';
import type { ExerciseItem, ExerciseKey, PlanItem, RestItem } from '../core/types';
import type { Context } from './app';
import { byId, dot, el, numberField, selectField } from './dom';

/**
 * Champs numeriques dont la modification ne touche pas la structure du
 * deroule, chacun avec son plafond.
 *
 * L'attribut `max` du champ ne suffit pas : un `<input type="number">` laisse
 * TAPER au-dela, il se contente d'echouer a la validation. Sans ce plafond,
 * saisir 99999 series gelait l'onglet aussi surement qu'un lien forge — meme
 * faille que celle documentee sur MAX_SETS (core/storage.ts), atteinte sans le
 * moindre lien. Les valeurs viennent de la, jamais recopiees ici.
 */
const NUMERIC_FIELDS = new Map<string, number>([
  ['sets', MAX_SETS],
  ['reps', MAX_REPS],
  ['seconds', MAX_SECONDS],
  ['rest', MAX_SECONDS],
]);

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

/**
 * Le champ de charge apparait-il sur cette ligne ?
 *
 * Trois cas, dans cet ordre. La ligne PORTE deja une charge : le champ reste,
 * quoi qu'en dise la bibliotheque — une valeur venue d'un lien, ou d'un
 * exercice qui perdrait son drapeau demain, ne doit jamais devenir invisible
 * et donc incorrigeable. C'est un exercice perso : on ne sait pas ce que
 * c'est, donc la porte reste ouverte, champ vide. Sinon c'est la bibliotheque
 * qui tranche (`load`, data/library.ts) — elastiques et machines cardio n'en
 * ont pas.
 */
function takesLoad(item: ExerciseItem): boolean {
  if (item.weight !== undefined) return true;
  if (item.key === 'custom') return true;
  return findLibraryEntry(item.key)?.load === true;
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
      takesLoad(item)
        ? numberField({
            ariaLabel: t('item.weight'),
            unit: t('item.weightShort'),
            // `null` et non 0 : le champ doit etre VIDE tant qu'aucune charge
            // n'est reglee (voir numberField, ui/dom.ts).
            value: item.weight ?? null,
            field: 'weight',
            itemId: item.id,
            // Le pas est ce qui rend le champ utilisable en salle : les
            // petits disques font 1,25 et 2,5 kg, donc 0,25 et pas 0,5 — avec
            // un pas de 0,5, une charge de 1,25 kg venue d'un lien est en
            // `stepMismatch` et la moindre fleche du champ la remonte a 1,5.
            // Le plafond affiche est celui de l'interface, pas celui du
            // parseur (MAX_WEIGHT).
            attrs: { min: '0', max: '250', step: '0.25', inputmode: 'decimal' },
          })
        : null,
      // Pas de selecteur de groupe ici, y compris pour un exercice perso : il
      // se choisit desormais au moment de la creation (`ui/app.ts`), une fois
      // pour toutes. La carte reste donc identique pour tous les exercices,
      // et le groupe se lit au badge et a la bordure gauche coloree.
      //
      // Contrepartie assumee : un groupe mal choisi ne se corrige plus, il
      // faut supprimer la ligne et la refaire.
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

    // La charge est le seul champ non entier de la carte : elle ne peut pas
    // passer par NUMERIC_FIELDS, qui plafonne des entiers avec `parseInt` et
    // arrondirait 2,5 kg a 3.
    if (field === 'weight' && isExercise(item)) {
      // Saisie que le navigateur ne sait pas lire (un point decimal la ou il
      // attend une virgule, « 1.2.3 »...) : `value` vaut alors la chaine vide,
      // exactement comme un champ vide, et l'effacer VIDERAIT une charge que
      // personne n'a demande a retirer. `badInput` est ce qui distingue les
      // deux — on ne touche a rien et on laisse la personne corriger.
      if (input instanceof HTMLInputElement && input.validity.badInput) return;
      // `type=number` normalise deja `value` avec un point decimal, mais
      // certains navigateurs restituent la virgule telle qu'elle a ete tapee :
      // la remplacer coute une ligne et ne peut rien casser.
      const typed = Number.parseFloat(input.value.replace(',', '.'));
      const value = Number.isFinite(typed)
        ? Math.min(MAX_WEIGHT, Math.max(0, Math.round(typed * 100) / 100))
        : 0;
      // Vider le champ, ou y saisir 0, RETIRE la charge au lieu d'ecrire un
      // zero : meme normalisation qu'`optionalWeight()` (core/storage.ts), pour
      // que « pas de charge » n'ait qu'une seule ecriture dans le stockage.
      if (value > 0) item.weight = value;
      else delete item.weight;
      const shown = value > 0 ? String(value) : '';
      if (shown !== input.value) input.value = shown;
      ctx.save();
      ctx.renderDerived();
      return;
    }

    const max = NUMERIC_FIELDS.get(field);
    if (max !== undefined) {
      const value = Math.min(max, Math.max(0, Number.parseInt(input.value, 10) || 0));
      // `renderDerived()` ne reconstruit pas la liste (c'est tout son interet,
      // le focus reste dans le champ) : le champ afficherait donc encore la
      // valeur refusee. On la corrige a la main, sinon l'ecran ment sur ce qui
      // a ete enregistre.
      if (String(value) !== input.value) input.value = String(value);
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
