import { t } from '../i18n';
import { presetName } from '../core/plan';
import { PRESETS, presetPlanId } from '../data/presets';
import type { Context } from './app';
import { byId, el } from './dom';
import { createInlineInput } from './inline-input';

/**
 * Id de la note qui dit ce qu'est la seance choisie. Les deux boutons
 * indisponibles la designent en `aria-describedby` : un bouton `disabled`
 * n'est pas atteignable au clavier, ce contexte doit donc etre lisible sans
 * l'atteindre.
 */
const PRESET_NOTE_ID = 'planPresetNote';

/** Une entree du selecteur : un id de seance et le libelle a afficher. */
interface PlanOption {
  id: string;
  label: string;
}

/**
 * Un groupe d'options nomme. `<optgroup>` plutot qu'une option-separateur
 * dessinee (« ── Séances CIRKALI ── ») : le groupe est une vraie structure,
 * annoncee par les lecteurs d'ecran au passage d'une famille a l'autre et
 * indentee par le navigateur, la ou un faux separateur n'est qu'une option de
 * plus — selectionnable, et muette sur ce qu'elle separe.
 */
function optionGroup(label: string, options: PlanOption[], activeId: string): HTMLElement {
  const group = el('optgroup', { attrs: { label } });
  for (const option of options) {
    const node = el('option', { text: option.label, attrs: { value: option.id } });
    if (option.id === activeId) node.selected = true;
    group.append(node);
  }
  return group;
}

/**
 * Selecteur de la seance active, avec creation / duplication / renommage /
 * suppression. Reconstruit entierement a chaque rendu (comme les options du
 * filtre de groupe dans ui/library.ts) : les libelles suivent la langue
 * active, et l'ensemble reste petit, donc bon marche a refaire.
 *
 * Les seances CIRKALI (data/presets.ts) viennent toujours APRES celles de la
 * personne, dans leur propre groupe : ce sont des propositions, pas le coeur
 * de sa liste. Elles ne se renomment ni ne se suppriment — il n'y a rien
 * d'ecrit a renommer ou a supprimer — et les modifier cree sa propre version
 * (voir `save()`, ui/app.ts).
 */
export function createPlanSwitcher(ctx: Context): { render: () => void } {
  const container = byId('planSwitcher');

  function render(): void {
    // Un renderAll() declenche ailleurs (ajout d'exercice, changement de
    // mode...) ne doit pas ecraser un formulaire de creation/renommage en
    // cours de saisie : on suspend la reconstruction tant qu'il est ouvert.
    if (container.querySelector('.inline-input')) return;

    const { plans } = ctx.state;
    const activePlan = ctx.activePlan();
    const preset = ctx.activePreset();

    const select = el('select', {
      attrs: { id: 'planSelect', 'aria-label': t('plans.label') },
      children: [
        optionGroup(
          t('presets.groupMine'),
          plans.map((plan) => ({ id: plan.id, label: plan.name ?? t('plans.unnamed') })),
          activePlan.id,
        ),
        optionGroup(
          t('presets.group'),
          PRESETS.map((entry) => ({ id: presetPlanId(entry), label: presetName(entry) })),
          activePlan.id,
        ),
      ],
    });
    select.addEventListener('change', () => ctx.switchPlan(select.value));

    // `.go` : meme style que le bouton Demarrer (fond lime, sans contour,
    // police --disp) — pas `.ghost`, reserve aux actions neutres.
    const shareBtn = el('button', {
      className: 'go share-btn',
      text: t('share.trigger'),
      attrs: { type: 'button' },
    });
    shareBtn.addEventListener('click', () => ctx.openShareDialog());

    // Pas de <label> visible : le <h2>Séances</h2> juste au-dessus dit deja
    // ce qu'est ce selecteur. Le nom accessible reste porte par l'aria-label
    // du select ci-dessus, pour un lecteur d'ecran qui n'a pas ce contexte
    // visuel. Partager est sur la meme ligne, a droite : c'est l'action
    // qui porte sur LA seance choisie ici, contrairement aux autres
    // (creer/dupliquer/renommer/supprimer) regroupees dans `.plan-actions`.
    const selectField = el('div', {
      className: 'session-row',
      children: [select, shareBtn],
    });

    // Une ligne, pas un mode d'emploi : ce qu'est cette seance, et ce qu'on
    // en fait. Le reste (rien n'est ecrit, donc rien a renommer ni a
    // supprimer) se voit aux deux boutons indisponibles juste apres — placee
    // AVANT eux, jamais apres, pour arriver dans cet ordre en lecture
    // lineaire comme au clavier.
    const note = preset
      ? el('p', {
          className: 'plan-note',
          attrs: { id: PRESET_NOTE_ID },
          children: [
            el('span', { className: 'plan-badge', text: t('presets.badge') }),
            el('span', { text: t('presets.note') }),
          ],
        })
      : null;

    const newBtn = el('button', {
      className: 'ghost',
      text: t('plans.new'),
      attrs: { type: 'button' },
    });
    const duplicateBtn = el('button', {
      className: 'ghost',
      // Sur un modele, dupliquer EST la creation de sa propre version : meme
      // geste, un libelle qui le dit.
      text: preset ? t('presets.makeMine') : t('plans.duplicate'),
      attrs: { type: 'button' },
    });
    const renameBtn = el('button', {
      className: 'ghost',
      text: t('plans.rename'),
      attrs: { type: 'button' },
    });
    const deleteBtn = el('button', {
      className: 'ghost',
      text: t('plans.delete'),
      attrs: { type: 'button' },
    });
    // Desactive plutot que confirme-puis-refuse : plus clair, evite une
    // confirmation qui ne mene a rien quand il ne reste qu'une seule seance —
    // ou quand la seance affichee est un modele, qui n'existe nulle part.
    deleteBtn.disabled = plans.length <= 1 || preset !== null;
    renameBtn.disabled = preset !== null;
    if (preset) {
      for (const button of [renameBtn, deleteBtn]) {
        button.setAttribute('aria-describedby', PRESET_NOTE_ID);
      }
    }

    createInlineInput(newBtn, {
      label: () => t('plans.namePrompt'),
      confirmLabel: () => t('actions.confirm'),
      cancelLabel: () => t('actions.cancel'),
      placeholder: () => t('plans.namePrompt'),
      onConfirm: (name) => ctx.createPlan(name),
    });

    // Rien a cabler sur un bouton indisponible : le formulaire de renommage
    // ne s'ouvrirait jamais, et il n'y aurait de toute facon aucun nom stocke
    // a changer sur un modele.
    if (!preset) {
      createInlineInput(renameBtn, {
        label: () => t('plans.namePrompt'),
        confirmLabel: () => t('actions.confirm'),
        cancelLabel: () => t('actions.cancel'),
        placeholder: () => t('plans.namePrompt'),
        initialValue: () => activePlan.name ?? '',
        onConfirm: (name) => ctx.renamePlan(activePlan.id, name),
      });
    }

    duplicateBtn.addEventListener('click', () => {
      if (preset) {
        ctx.adoptPreset();
        return;
      }
      ctx.duplicatePlan(activePlan.id);
    });

    deleteBtn.addEventListener('click', () => {
      if (plans.length <= 1 || preset) return;
      if (!window.confirm(t('plans.confirmDelete'))) return;
      ctx.deletePlan(activePlan.id);
    });

    // Le selecteur est recree a chaque rendu : sans ce report, changer de
    // seance au clavier renvoie le focus sur <body>, juste apres l'action ou
    // l'on en a le plus besoin. Lu AVANT `replaceChildren()`, qui detruit
    // l'element focalise.
    const keepFocus = document.activeElement?.id === 'planSelect';

    container.replaceChildren(
      selectField,
      ...(note ? [note] : []),
      el('div', {
        className: 'plan-actions',
        children: [newBtn, duplicateBtn, renameBtn, deleteBtn],
      }),
    );

    if (keepFocus) select.focus();
  }

  return { render };
}
