import { GROUP_IDS } from '../data/groups';
import { CUSTOM_DEFAULTS } from '../data/library';
import { createCustom } from '../core/plan';
import { reportCustomExercise } from '../cloud/exercise-feedback';
import type { GroupId } from '../core/types';
import type { Context } from './app';
import { byId, groupOptions, wireDialogClose } from './dom';

/**
 * « Nouvel exercice » : le nom ET le groupe musculaire, demandes ensemble.
 *
 * Un <dialog> plutot que le formulaire inline partage (`ui/inline-input.ts`) :
 * celui-la ne porte qu'un champ, et deux champs cote a cote dans la rangee
 * d'actions y tenaient mal. Les deux autres appelants du formulaire inline
 * (creation et renommage d'une seance) n'ont qu'un nom a saisir et le gardent.
 *
 * C'est LE seul endroit ou le groupe d'un exercice perso se choisit : la carte
 * du deroule ne le propose plus (`ui/planner.ts`). Ce n'est pas cosmetique —
 * le groupe gouverne la couleur du badge et surtout l'alternance du mode
 * circuit, que le defaut `core` faussait en rangeant tous les exercices perso
 * ensemble.
 */
export function createCustomExercise(ctx: Context): { open: () => void } {
  const dialog = byId<HTMLDialogElement>('customExercise');
  const form = byId<HTMLFormElement>('customExerciseForm');
  const nameInput = byId<HTMLInputElement>('customExerciseName');
  const groupSelect = byId<HTMLSelectElement>('customExerciseGroup');

  wireDialogClose(dialog, byId('customExerciseClose'));
  byId('customExerciseCancel').addEventListener('click', () => dialog.close());

  /**
   * Reconstruites a chaque ouverture, et non une fois pour toutes : leurs
   * libelles doivent suivre la langue active, comme celles du filtre de la
   * bibliotheque (`ui/library.ts`).
   */
  function fillGroups(): void {
    // Toute la liste, parents compris : c'est ici que « je travaille toute la
    // jambe » doit pouvoir se dire, sans trancher entre cuisses, fessiers et
    // mollets (`data/groups.ts`).
    groupSelect.replaceChildren(...groupOptions());
    groupSelect.value = CUSTOM_DEFAULTS.group;
  }

  form.addEventListener('submit', (event) => {
    // `method="dialog"` fermerait deja le dialogue, mais la fermeture native
    // n'emporte pas la lecture des champs : on prend les valeurs d'abord.
    event.preventDefault();
    const name = nameInput.value.trim();
    const group = GROUP_IDS.find((id) => id === groupSelect.value) ?? CUSTOM_DEFAULTS.group;
    dialog.close();
    if (name === '') return;

    ctx.activePlan().items.push(createCustom(name, group as GroupId));
    // Sans `await` et sans consequence : la remontee ne doit ni retarder le
    // rendu ni pouvoir le casser (`cloud/exercise-feedback.ts`).
    void reportCustomExercise(name, group as GroupId);
    ctx.save();
    ctx.renderAll();
  });

  return {
    open(): void {
      nameInput.value = '';
      fillGroups();
      dialog.showModal();
    },
  };
}
