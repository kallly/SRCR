// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import { t } from '../i18n';
import { byId, el, wireDialogClose } from './dom';
import { clock } from './format';

/**
 * Durees toutes faites, en secondes. Un appui les lance directement : on
 * choisit une pause en pleine seance, essouffle, pas en remplissant un champ.
 */
const PRESETS = [15, 30, 45, 60, 90, 120, 180, 300];

/**
 * Bornes du champ libre. Rien de persiste ni de partage ici — ce n'est pas une
 * entree hostile au sens de `core/storage.ts` — mais un <input type="number">
 * laisse taper au-dela de son `max` : sans ce plafond, 99999 figerait le
 * lecteur sur un decompte de plus d'une journee.
 */
const MIN_SECONDS = 5;
const MAX_SECONDS = 3600;

/**
 * Choix de la duree d'une pause libre, ouvert par le bouton chrono du lecteur
 * (`#runPause`, `ui/runner.ts`). Ne sait rien du lecteur : il rend un nombre
 * de secondes a `onPick`, qui decide du reste.
 */
export function createPausePicker(onPick: (seconds: number) => void): { open: () => void } {
  const dialog = byId<HTMLDialogElement>('pausePicker');
  const form = byId<HTMLFormElement>('pausePickerForm');
  const presets = byId('pausePresets');
  const input = byId<HTMLInputElement>('pauseSeconds');

  /**
   * Derniere duree choisie, reproposee dans le champ libre a l'ouverture
   * suivante. En memoire seulement, volontairement hors de `State` : un
   * confort de la seance en cours, pas une donnee de l'utilisateur.
   */
  let last = 60;

  wireDialogClose(dialog, byId('pausePickerClose'));

  function pick(seconds: number): void {
    last = seconds;
    dialog.close();
    onPick(seconds);
  }

  /**
   * Reconstruits a chaque ouverture : le texte (`m:ss`) ne se traduit pas,
   * mais l'`aria-label` si — « 1:30 » se lit mal a voix haute.
   */
  function fillPresets(): void {
    presets.replaceChildren(
      ...PRESETS.map((seconds) => {
        const button = el('button', {
          className: 'ghost',
          text: clock(seconds),
          attrs: { type: 'button', 'aria-label': t('duration.seconds', { count: seconds }) },
        });
        button.addEventListener('click', () => pick(seconds));
        return button;
      }),
    );
  }

  form.addEventListener('submit', (event) => {
    // Meme raison que `ui/custom-exercise.ts` : on lit le champ avant que la
    // fermeture native du `method="dialog"` n'emporte quoi que ce soit.
    event.preventDefault();
    const value = Math.round(Number(input.value));
    if (!Number.isFinite(value) || value <= 0) return;
    pick(Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, value)));
  });

  return {
    open(): void {
      fillPresets();
      input.value = String(last);
      dialog.showModal();
      // showModal() donnerait sinon le focus au bouton de fermeture ; la
      // premiere duree toute faite est le choix le plus probable au clavier.
      presets.querySelector('button')?.focus();
    },
  };
}
