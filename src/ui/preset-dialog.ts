import { t } from '../i18n';
import type { Context } from './app';
import { byId, wireDialogClose } from './dom';

/**
 * « Voulez-vous en creer votre version ? », pose a la premiere modification
 * d'une seance CIRKALI.
 *
 * Ouvert par `save()` (ui/app.ts) et par lui seul : c'est le point de passage
 * de toutes les modifications de l'app, donc le seul endroit ou l'on est sur
 * de ne rater aucun chemin — un module ajoute demain sera couvert sans
 * cablage supplementaire.
 *
 * Les deux issues sont explicites et symetriques : accepter cree la copie
 * (`adoptPreset()`), refuser rend au modele sa forme d'origine
 * (`discardPresetEdits()`). Fermer par Echap ou par le fond vaut refus — un
 * dialogue ferme sans reponse ne doit pas laisser a l'ecran un modele modifie
 * que rien n'enregistrera.
 */
export function createPresetDialog(ctx: Context): { open: () => void } {
  const dialog = byId<HTMLDialogElement>('presetAdopt');
  const text = byId('presetAdoptText');
  const confirmBtn = byId<HTMLButtonElement>('presetAdoptConfirm');

  let adopting = false;

  wireDialogClose(dialog, byId('presetAdoptClose'));
  byId('presetAdoptCancel').addEventListener('click', () => dialog.close());

  confirmBtn.addEventListener('click', () => {
    // L'adoption est faite APRES la fermeture (voir le gestionnaire `close`) :
    // ainsi un seul chemin conclut le dialogue, quelle que soit la facon dont
    // il se termine.
    adopting = true;
    dialog.close();
  });

  dialog.addEventListener('close', () => {
    const adopted = adopting;
    adopting = false;
    if (adopted) ctx.adoptPreset();
    else ctx.discardPresetEdits();
  });

  return {
    open: () => {
      // Un second showModal() sur un dialogue deja ouvert leve (meme garde que
      // ui/share.ts). Le cas se presente si une modification en declenche une
      // autre pendant que la question est posee.
      if (dialog.open) return;
      const preset = ctx.activePreset();
      if (!preset) return;
      // Libelle parametre, donc rempli ici et non par
      // applyStaticTranslations() : meme statut que #importSummary.
      text.textContent = t('presets.adoptText', { name: ctx.activePlan().name ?? '' });
      dialog.showModal();
    },
  };
}
