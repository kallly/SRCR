import { t } from '../i18n';
import { encodeSharedPlan } from '../core/share';
import type { Context } from './app';
import { byId, el, wireDialogClose } from './dom';

/**
 * Modal declenchee par l'etiquette fixe #aiHelpTab (index.html). Distincte de
 * la section statique `#aiPlan` de l'accueil : celle-la s'adresse a l'IA
 * elle-meme quand elle lit la page brute (format technique du lien, cles de
 * la bibliotheque) ; celle-ci s'adresse a la PERSONNE, en langage courant,
 * avec deux messages prets a copier-coller dans ChatGPT, Claude ou Gemini.
 * Les deux se completent, aucune ne remplace l'autre.
 */
export function createAiHelp(ctx: Context): void {
  const trigger = byId<HTMLButtonElement>('aiHelpTab');
  const dialog = byId<HTMLDialogElement>('aiHelp');
  const modifyPrompt = byId('aiHelpModifyPrompt');
  const createCopyBtn = byId<HTMLButtonElement>('aiHelpCreateCopy');
  const createCopied = byId('aiHelpCreateCopied');
  const modifyCopyBtn = byId<HTMLButtonElement>('aiHelpModifyCopy');
  const modifyCopied = byId('aiHelpModifyCopied');

  wireDialogClose(dialog, byId('aiHelpClose'));

  // Le message « modifier », avec le vrai lien dedans : jamais ecrit dans le
  // DOM (voir renderModifyPrompt), seulement copie au clic.
  let modifyMessage = '';

  /** Le lien reel de la seance active : le message « modifier » n'est donc pas un gabarit vide, il est deja pret a envoyer. */
  function activeShareUrl(): string {
    return `${location.origin}${location.pathname}?s=${encodeSharedPlan(ctx.activePlan())}`;
  }

  /**
   * Affiche le message « modifier » avec le lien MASQUE (une URL base64 fait
   * plusieurs centaines de caracteres et noierait tout le reste sous un pave
   * illisible), tout en gardant le vrai message pret pour la copie.
   *
   * `t(key)` sans parametres renvoie le gabarit brut, jeton `{link}` compris
   * (voir `interpolate()`, src/i18n/index.ts : elle ne touche a rien sans
   * `params`) — on le decoupe donc nous-memes autour de ce jeton pour isoler
   * la portion a remplacer par le badge visuel, sans dupliquer la phrase
   * dans une seconde cle i18n.
   */
  function renderModifyPrompt(): void {
    modifyMessage = t('aiHelp.modifyPrompt', { link: activeShareUrl() });

    const template = t('aiHelp.modifyPrompt');
    const [before, after] = template.split('{link}');
    modifyPrompt.replaceChildren(
      document.createTextNode(before ?? ''),
      el('span', { className: 'ai-help-link-mask', text: t('aiHelp.linkMask') }),
      document.createTextNode(after ?? ''),
    );
  }

  function showCopied(target: HTMLElement): void {
    target.hidden = false;
    target.textContent = t('aiHelp.copied');
  }

  /**
   * Meme repli que ui/share.ts (execCommand('copy')) : navigator.clipboard
   * exige un contexte securise, absent par exemple en testant depuis un
   * telephone via l'IP locale du serveur de dev en http. Ici il n'y a pas
   * de <input> existant a selectionner : on en cree un temporaire, uniquement
   * pour ce repli.
   *
   * Ajoute a `dialog`, PAS a `document.body` — piege verifie : une <dialog>
   * ouverte en showModal() rend tout le reste du document inerte (le
   * navigateur l'exclut du focus, cf. MDN sur l'attribut `inert`), donc
   * `.select()` sur un element ajoute au body echoue silencieusement pendant
   * que la modal est ouverte et `execCommand('copy')` ne copie rien. Le
   * champ `#shareLink` de ui/share.ts n'a pas ce probleme : c'est un
   * <input> deja present dans le HTML statique du dialogue, donc jamais
   * inerte quand ce dialogue est la modal active.
   */
  function copyWithExecCommand(text: string, target: HTMLElement): void {
    const helper = document.createElement('textarea');
    helper.value = text;
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    dialog.append(helper);
    helper.select();
    const ok = document.execCommand('copy');
    helper.remove();
    if (ok) showCopied(target);
  }

  function copyPrompt(text: string, target: HTMLElement): void {
    if (!navigator.clipboard) {
      copyWithExecCommand(text, target);
      return;
    }
    void navigator.clipboard
      .writeText(text)
      .then(() => showCopied(target), () => copyWithExecCommand(text, target));
  }

  createCopyBtn.addEventListener('click', () => {
    copyPrompt(t('aiHelp.createPrompt'), createCopied);
  });
  modifyCopyBtn.addEventListener('click', () => {
    copyPrompt(modifyMessage, modifyCopied);
  });

  trigger.addEventListener('click', () => {
    // Double clic/double tap avant la fin du premier appel : meme garde que
    // openShare() (ui/share.ts), showModal() leve sur une <dialog> deja ouverte.
    if (dialog.open) return;
    createCopied.hidden = true;
    modifyCopied.hidden = true;
    // Recalcule a chaque ouverture, jamais mis a jour en direct si la seance
    // active change pendant que la modal est ouverte : meme compromis que
    // #importSummary/#shareLink, qui ne suivent pas non plus un changement
    // de langue pendant qu'ils sont affiches.
    renderModifyPrompt();
    dialog.showModal();
  });
}
