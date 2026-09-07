import { getLocale, t } from '../i18n';
import { groupColor } from '../data/groups';
import { figureSvg } from '../data/figures';
import { LIBRARY } from '../data/library';
import type { ExerciseKey, GroupId } from '../core/types';
import { byId, el, wireDialogClose } from './dom';

/** Nombre de points cles resumes dans la modal (les etapes completes sont sur la page dediee). */
const KEY_POINTS = 3;

/**
 * Le contenu long des exercices pese plus lourd que tout le reste de
 * l'app reunie, et la modal n'en montre qu'un extrait — le charger au
 * demarrage ferait payer a chaque visiteur du texte que la plupart ne
 * liront jamais. `import()` dynamique : Vite en fait un chunk separe, tire
 * seulement a la premiere ouverture de la modal, puis mis en cache par le
 * navigateur. Source unique preservee : c'est le meme module que celui lu
 * par le generateur de pages statiques.
 */
type DetailsModule = typeof import('../content/exercise-details');
let detailsModule: Promise<DetailsModule> | null = null;

function loadDetails(): Promise<DetailsModule> {
  detailsModule ??= import('../content/exercise-details');
  return detailsModule;
}

export interface ExerciseInfo {
  open(key: ExerciseKey): void;
}

/**
 * Modal d'info sur un exercice : <dialog> natif, rempli a l'ouverture depuis
 * data/library.ts (groupe) et content/exercise-details (contenu long, avec
 * repli sur le francais tant que la langue active n'a pas ce contenu — voir
 * CLAUDE.md, section « Pages d'exercice »).
 */
export function createExerciseInfo(): ExerciseInfo {
  const dialog = byId<HTMLDialogElement>('exerciseInfo');
  const dot = dialog.querySelector<HTMLElement>('#infoChip i')!;
  const groupLabel = byId('infoGroup');
  const name = byId('infoName');
  const fig = byId('infoFig');
  const equipmentLine = byId('infoEquipment');
  const musclesLine = byId('infoMuscles');
  const unavailable = byId('infoUnavailable');
  const points = byId<HTMLUListElement>('infoPoints');
  const more = byId<HTMLAnchorElement>('infoMore');
  const closeBtn = byId('infoClose');

  // Etats transitoires (chargement, echec de l'import dynamique) : jamais
  // dans index.html, seulement construits ici — ce texte est generique,
  // toujours masque par defaut, et invisible pour tout crawler tant que la
  // <dialog> n'est pas ouverte (voir CLAUDE.md, section « Modal d'info »).
  const loadingMsg = el('p', { className: 'info-loading' });
  const errorMsg = el('p', { className: 'info-error' });
  loadingMsg.hidden = true;
  errorMsg.hidden = true;
  points.insertAdjacentElement('beforebegin', loadingMsg);
  loadingMsg.insertAdjacentElement('afterend', errorMsg);

  wireDialogClose(dialog, closeBtn);

  async function open(key: ExerciseKey): Promise<void> {
    const entry = LIBRARY.find((e) => e.key === key);
    if (!entry) return;

    // Le nom, le groupe et la figure sont connus sans attendre l'import :
    // affiches tout de suite, l'ouverture parait immediate.
    dot.style.background = groupColor(entry.group);
    groupLabel.textContent = t(`group.${entry.group as GroupId}`);
    name.textContent = t(`exercise.${key}.name`);
    fig.innerHTML = figureSvg(key);
    equipmentLine.textContent = t(`category.${entry.category}`);
    musclesLine.textContent = '';
    unavailable.hidden = true;
    points.replaceChildren();
    // Repli neutre : si le chargement echoue plus bas, ce lien ne doit
    // jamais garder l'URL du dernier exercice ouvert avec succes.
    more.href = '#section-library';
    errorMsg.hidden = true;
    loadingMsg.hidden = false;
    loadingMsg.textContent = t('exerciseInfo.loading');
    dialog.showModal();

    try {
      const locale = getLocale();
      const { DETAILS_BY_LOCALE, exerciseDetail } = await loadDetails();
      const native = DETAILS_BY_LOCALE[locale]?.[key];
      const detail = native ?? exerciseDetail(key, locale);
      if (!detail) throw new Error('missing detail');

      musclesLine.textContent = detail.muscles.secondary
        ? `${detail.muscles.primary} · ${detail.muscles.secondary}`
        : detail.muscles.primary;

      unavailable.hidden = !!native;

      points.replaceChildren(...detail.steps.slice(0, KEY_POINTS).map((s) => el('li', { text: s })));

      // La page detaillee vit sous la langue qui a reellement fourni ce
      // contenu : la locale active si elle a son propre contenu, le francais
      // sinon (c'est aussi ce que sert `detail` dans ce cas, via le repli).
      more.href = `exercises/${native ? locale : 'fr'}/${detail.slug}`;
      loadingMsg.hidden = true;
    } catch {
      loadingMsg.hidden = true;
      errorMsg.hidden = false;
      errorMsg.textContent = t('exerciseInfo.loadError');
    }
  }

  // Le chargement du contenu est asynchrone, l'ouverture reste declenchee
  // depuis un gestionnaire de clic synchrone : on laisse partir la promesse.
  // Un echec inattendu ne doit rien casser d'autre que cette modal.
  return {
    open: (key) => {
      void open(key).catch(() => {});
    },
  };
}
