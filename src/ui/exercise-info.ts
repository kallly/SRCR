import { getLocale, t } from '../i18n';
import { groupColor } from '../data/groups';
import { figureSvg } from '../data/figures';
import { LIBRARY } from '../data/library';
import { DETAILS_BY_LOCALE, exerciseDetail } from '../content/exercise-details';
import type { ExerciseKey, GroupId } from '../core/types';
import { byId, el } from './dom';

/** Nombre de points cles resumes dans la modal (les etapes completes sont sur la page dediee). */
const KEY_POINTS = 3;

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
  const musclesLine = byId('infoMuscles');
  const unavailable = byId('infoUnavailable');
  const points = byId<HTMLUListElement>('infoPoints');
  const more = byId<HTMLAnchorElement>('infoMore');
  const closeBtn = byId('infoClose');

  closeBtn.addEventListener('click', () => dialog.close());
  // Clic sur le fond (en dehors du contenu, qui occupe toute la boite de dialogue) : ferme aussi.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  function open(key: ExerciseKey): void {
    const entry = LIBRARY.find((e) => e.key === key);
    if (!entry) return;

    const locale = getLocale();
    const native = DETAILS_BY_LOCALE[locale]?.[key];
    const detail = native ?? exerciseDetail(key, locale);
    if (!detail) return;

    dot.style.background = groupColor(entry.group);
    groupLabel.textContent = t(`group.${entry.group as GroupId}`);
    name.textContent = t(`exercise.${key}.name`);
    fig.innerHTML = figureSvg(key);
    musclesLine.textContent = detail.muscles.secondary
      ? `${detail.muscles.primary} · ${detail.muscles.secondary}`
      : detail.muscles.primary;

    unavailable.hidden = !!native;

    points.replaceChildren(...detail.steps.slice(0, KEY_POINTS).map((s) => el('li', { text: s })));

    // La page detaillee vit sous la langue qui a reellement fourni ce
    // contenu : la locale active si elle a son propre contenu, le francais
    // sinon (c'est aussi ce que sert `detail` dans ce cas, via le repli).
    more.href = `exercises/${native ? locale : 'fr'}/${detail.slug}.html`;

    dialog.showModal();
  }

  return { open };
}
