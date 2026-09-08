import { t } from '../i18n';
import { groupColor } from '../data/groups';
import { figureSvg } from '../data/figures';
import { exerciseCue, exerciseName } from '../core/plan';
import { buildQueue } from '../core/queue';
import { isLibraryKey } from '../data/library';
import type { ExerciseKey, RestStep, Step, WorkStep } from '../core/types';
import { beep, beepExerciseEnd, beepWarning, primeAudio } from '../platform/audio';
import { acquireWakeLock, releaseWakeLock } from '../platform/wakelock';
import { byId, dot, el } from './dom';
import { clock } from './format';
import type { Context } from './app';

const RING_RADIUS = 100;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Secondes ajoutees par le bouton secondaire pendant une pause. */
const EXTRA_SECONDS = 15;

/**
 * Secondes de mise en place entre l'appui sur « Demarrer le chrono » et le
 * vrai depart (bip + decompte de l'exercice) : le temps de lacher le
 * telephone et de se mettre en position. Un bouton permet de la sauter.
 */
const SETUP_SECONDS = 5;

/** Periode de rafraichissement du chrono : assez fine pour ne pas sauter de seconde. */
const TICK_MS = 250;

/** Bip d'avertissement quand il reste ce nombre de secondes ou moins. */
const WARNING_SECONDS = 3;

/**
 * Fleche du bouton « exercice precedent ». Un trace, pas le glyphe « ← » :
 * celui-ci change d'epaisseur, de longueur et d'inclinaison d'une police
 * systeme a l'autre, alors qu'un trait suit `currentColor` — donc la couleur
 * de survol et l'opacite de l'etat desactive — et garde la meme allure
 * partout. Meme langage que les figures d'exercice : trait, bouts arrondis,
 * et `fill: none` pose par la CSS (un <path> sans fill est peint en noir).
 * La pointe touche le fut : les deux s'arretent a x=5 une fois la moitie de
 * l'epaisseur du trait ajoutee par `stroke-linecap: round`.
 */
const BACK_ARROW =
  '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path d="M19 12H6" /><path d="m12 5-7 7 7 7" /></svg>';

/**
 * Phase courante du lecteur. Elle determine a la fois l'affichage et l'action
 * des deux boutons du bas, ce qui permet de repeindre l'ecran a tout moment
 * (changement de langue) sans toucher au chrono en cours.
 */
type Phase = 'rest' | 'ready' | 'countdown' | 'timing' | 'reps' | 'done';

const REST_LABELS: Record<RestStep['reason'], Parameters<typeof t>[0]> = {
  manual: 'rest.manual',
  'between-sets': 'rest.betweenSets',
  forced: 'rest.forced',
  transition: 'rest.transition',
};

export interface Runner {
  /** Repeint l'ecran courant, par exemple apres un changement de langue. */
  render(): void;
  start(): void;
  stop(): void;
  /**
   * Vrai tant que le lecteur plein ecran occupe l'ecran. Consulte avant
   * d'adopter un etat fusionne venu du nuage : le remplacer en pleine seance
   * reconstruirait le lecteur et le chrono avec.
   */
  isActive(): boolean;
}

export function createRunner(ctx: Context): Runner {
  const screen = byId('run');
  const stepLabel = byId('runStep');
  const progress = byId('runProgress');
  const label = byId('runLabel');
  const name = byId('runName');
  const setLine = byId('runSet');
  const figure = byId('runFigure');
  const ring = byId('runRing');
  const ringFill = byId('runRingFill');
  const time = byId('runTime');
  const reps = byId('runReps');
  const hint = byId('runHint');
  const cue = byId('runCue');
  const upNext = byId('runNext');
  const secondary = byId<HTMLButtonElement>('runSecondary');
  const primary = byId<HTMLButtonElement>('runPrimary');
  const infoBtn = byId<HTMLButtonElement>('runInfo');

  ringFill.setAttribute('stroke-dasharray', String(RING_CIRCUMFERENCE));

  let queue: Step[] = [];
  let index = 0;
  let phase: Phase = 'done';
  let active = false;
  let timer: number | null = null;
  let remaining = 0;
  let duration = 0;
  let endsAt = 0;
  let onCountdownEnd: () => void = next;
  let warned = false;
  /** Cle de l'exercice affichable dans la modal d'info, ou null si le bouton doit rester cache. */
  let infoKey: ExerciseKey | null = null;

  function clearTimer(): void {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
  }

  function setRing(fraction: number): void {
    ringFill.setAttribute(
      'stroke-dashoffset',
      String(RING_CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, fraction)))),
    );
  }

  function paintClock(): void {
    time.textContent = clock(remaining);
    setRing(duration > 0 ? remaining / duration : 0);
  }

  function tick(): void {
    remaining = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
    paintClock();
    // Pas d'avertissement pendant la mise en place : ses 5 secondes sont deja
    // toutes une preparation, un bip a 3 s n'y annoncerait rien de nouveau.
    if (!warned && phase !== 'countdown' && remaining > 0 && remaining <= WARNING_SECONDS) {
      warned = true;
      beepWarning();
    }
    if (remaining <= 0) {
      clearTimer();
      if (phase === 'timing') beepExerciseEnd();
      else beep();
      onCountdownEnd();
    }
  }

  function startCountdown(seconds: number, onEnd: () => void = next): void {
    clearTimer();
    duration = seconds;
    remaining = seconds;
    endsAt = Date.now() + seconds * 1000;
    onCountdownEnd = onEnd;
    warned = seconds <= WARNING_SECONDS;
    paintClock();
    timer = window.setInterval(tick, TICK_MS);
  }

  function currentStep(): Step | undefined {
    return queue[index];
  }

  /** Prochain effort de la file, pour l'annonce « Ensuite — … ». */
  function upcoming(): WorkStep | undefined {
    return queue.slice(index + 1).find((step): step is WorkStep => step.kind === 'work');
  }

  /**
   * Position de l'effort precedent, ou -1 s'il n'y en a pas. On revient a un
   * effort et jamais au repos qui le precede : le bouton sert a refaire une
   * serie lancee ou validee par erreur, et retomber sur un decompte de repos
   * obligerait a le passer a la main pour arriver la ou on voulait aller.
   */
  function previousWorkIndex(): number {
    for (let i = Math.min(index, queue.length) - 1; i >= 0; i -= 1) {
      if (queue[i]?.kind === 'work') return i;
    }
    return -1;
  }

  /**
   * Retour en arriere, c'est-a-dire le bouton secondaire du bas pendant un
   * effort. Il portait « Passer », qui ne servait a rien : le bouton
   * principal (« Termine », « Serie terminee ») avance deja d'une etape, et
   * personne n'a besoin de deux facons d'aller de l'avant — alors qu'une
   * serie validee par erreur, elle, n'avait aucun recours.
   *
   * Interdit une fois la seance terminee : `finish()` a deja inscrit la
   * seance dans l'historique, rouvrir le dernier effort permettrait de la
   * terminer une seconde fois et de l'y compter deux fois. Le bouton est de
   * toute facon masque sur cet ecran.
   */
  function goPrevious(): void {
    if (phase === 'done') return;
    const target = previousWorkIndex();
    if (target < 0) return;
    index = target;
    enterStep();
  }

  /**
   * Repos et effort ne se distinguaient qu'a la couleur (teinte de fond,
   * anneau, pastille) : illisible en plein soleil ou pour un daltonien.
   * Icone dediee, de forme differente du rond plein utilise pour l'effort.
   */
  function restIcon(): HTMLElement {
    return el('i', { className: 'rest-icon', attrs: { 'aria-hidden': 'true' } });
  }

  /**
   * Meme bouton "ⓘ" que dans le deroule/la bibliotheque (`ui/planner.ts`,
   * `ui/library.ts`), pose ici pour consulter la fiche de l'exercice EN
   * COURS sans quitter le lecteur. Cache pendant un repos (rien de precis a
   * montrer : l'ecran de repos annonce le prochain exercice, pas un exercice
   * en cours d'execution) et pour un exercice perso, comme partout ailleurs
   * (`isLibraryKey()` : aucun contenu n'existe pour la cle `custom`).
   */
  function paintInfoButton(key: ExerciseKey | null): void {
    infoKey = key && isLibraryKey(key) ? key : null;
    infoBtn.hidden = infoKey === null;
  }

  function paintRest(step: RestStep): void {
    paintInfoButton(null);
    label.replaceChildren(restIcon(), document.createTextNode(t(REST_LABELS[step.reason])));
    name.textContent = step.next
      ? t('runner.then', { name: exerciseName(step.next) })
      : t('runner.recover');
    setLine.textContent = '';
    figure.replaceChildren();
    cue.textContent =
      step.reason === 'forced'
        ? t('runner.forcedCue')
        : step.reason === 'transition'
          ? t('runner.transitionCue')
          : '';
    // Pendant un repos, le secondaire garde « +15 s » : c'est la seule
    // commande qui n'a pas d'equivalent ailleurs. `textContent` efface la
    // fleche laissee par l'effort precedent, et l'`aria-label` doit partir
    // avec elle — sinon il masquerait « +15 s » pour un lecteur d'ecran.
    secondary.disabled = false;
    secondary.removeAttribute('aria-label');
    secondary.textContent = t('runner.addTime');
    primary.textContent = t('runner.skip');
  }

  function paintWork(step: WorkStep): void {
    const { item } = step;
    paintInfoButton(item.key);
    label.replaceChildren(
      dot(groupColor(item.group)),
      document.createTextNode(t(`group.${item.group}`)),
    );
    name.textContent = exerciseName(item);
    setLine.textContent = t('runner.setOf', { current: step.set, total: step.sets });
    figure.innerHTML = figureSvg(item.key);
    cue.textContent = exerciseCue(item);
    // Desactive plutot que masque au tout premier effort : les deux boutons
    // du bas se partagent la largeur, en retirer un elargirait l'autre.
    // `innerHTML` sur un fragment que nous produisons nous-memes, comme la
    // figure juste au-dessus : le nom accessible passe par `aria-label`,
    // puisque le bouton n'a plus de texte.
    secondary.disabled = previousWorkIndex() < 0;
    secondary.innerHTML = BACK_ARROW;
    secondary.setAttribute('aria-label', t('runner.previous'));

    if (phase === 'reps') {
      reps.textContent = t('runner.reps', { count: item.reps });
      primary.textContent = t('runner.setDone');
      return;
    }
    hint.textContent = phase === 'countdown' ? t('runner.startingSoon') : t('runner.readyHint');
    primary.textContent =
      phase === 'ready'
        ? t('runner.startTimer')
        : phase === 'countdown'
          ? t('runner.skipSetup')
          : t('runner.done');
  }

  function paintDone(): void {
    paintInfoButton(null);
    label.replaceChildren();
    name.textContent = t('runner.finished');
    setLine.textContent = '';
    figure.replaceChildren();
    reps.textContent = '✓';
    cue.textContent = t('runner.finishedCue');
    upNext.textContent = '';
    primary.textContent = t('runner.close');
  }

  /**
   * Repeint entierement l'ecran a partir de la phase courante.
   * Ne touche jamais au chrono : appelable a tout moment.
   */
  function render(): void {
    if (!active) return;

    if (phase === 'done') {
      paintDone();
      return;
    }

    const step = currentStep();
    if (!step) return;

    stepLabel.textContent = t('runner.step', { current: index + 1, total: queue.length });
    const next = upcoming();
    upNext.textContent = next
      ? t('runner.next', { name: exerciseName(next.item) })
      : t('runner.lastEffort');

    if (step.kind === 'rest') paintRest(step);
    else paintWork(step);
  }

  /** Prepare et affiche l'etape courante. */
  function enterStep(): void {
    clearTimer();

    if (index >= queue.length) {
      finish();
      return;
    }
    const step = queue[index];
    if (!step) {
      finish();
      return;
    }

    screen.classList.toggle('resting', step.kind === 'rest');
    screen.classList.remove('done-state', 'ready', 'countdown');
    hint.classList.remove('on');
    secondary.style.display = '';
    progress.style.width = `${(index / queue.length) * 100}%`;

    const timed = step.kind === 'rest' || step.item.mode === 'time';
    ring.classList.toggle('on', timed);
    reps.classList.toggle('on', step.kind === 'work' && step.item.mode === 'reps');

    if (step.kind === 'rest') {
      phase = 'rest';
      render();
      startCountdown(step.seconds);
      return;
    }

    if (step.item.mode === 'time') {
      // Etape d'armement : le chrono ne part qu'une fois en position.
      phase = 'ready';
      screen.classList.add('ready');
      hint.classList.add('on');
      duration = step.item.seconds;
      remaining = step.item.seconds;
      paintClock();
      render();
      return;
    }

    phase = 'reps';
    render();
  }

  /** Appui sur « Demarrer le chrono » : lance la mise en place, pas l'exercice. */
  function beginSetup(): void {
    const step = currentStep();
    if (!step || step.kind !== 'work' || step.item.mode !== 'time') return;
    phase = 'countdown';
    screen.classList.remove('ready');
    screen.classList.add('countdown');
    render();
    startCountdown(SETUP_SECONDS, startTimer);
  }

  /**
   * Vrai depart de l'exercice : fin de la mise en place, spontanee ou sautee.
   * Ne bipe pas elle-meme : `tick()` l'a deja fait pour une fin naturelle, et
   * le bouton « Commencer maintenant » s'en charge pour une fin sautee — sans
   * quoi les deux chemins produiraient un double bip.
   */
  function startTimer(): void {
    const step = currentStep();
    if (!step || step.kind !== 'work' || step.item.mode !== 'time') return;
    phase = 'timing';
    screen.classList.remove('countdown');
    hint.classList.remove('on');
    render();
    startCountdown(step.item.seconds);
  }

  function next(): void {
    clearTimer();
    index += 1;
    enterStep();
  }

  function addTime(seconds: number): void {
    if (phase !== 'rest') return;
    duration += seconds;
    endsAt += seconds * 1000;
    remaining = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
    paintClock();
  }

  function finish(): void {
    clearTimer();
    phase = 'done';
    ctx.state.history.push(Date.now());
    ctx.save();

    screen.classList.remove('resting', 'ready', 'countdown');
    screen.classList.add('done-state');
    hint.classList.remove('on');
    ring.classList.remove('on');
    reps.classList.add('on');
    progress.style.width = '100%';
    secondary.style.display = 'none';
    render();
  }

  function stop(): void {
    clearTimer();
    active = false;
    phase = 'done';
    screen.classList.remove('on', 'resting', 'done-state', 'ready', 'countdown');
    hint.classList.remove('on');
    secondary.style.display = '';
    // Sans cette remise a zero, la barre gardait la position de la seance
    // precedente jusqu'au premier changement d'etape de la suivante.
    progress.style.width = '0';
    void releaseWakeLock();
    ctx.renderAll();
    // Une fusion avec le nuage arrivee pendant la seance a ete reportee pour ne
    // pas reconstruire le lecteur en plein chrono : l'ecran est libre, elle peut
    // s'appliquer.
    ctx.cloud.resumeDeferred();
  }

  function start(): void {
    queue = buildQueue(ctx.activePlan().items, ctx.activePlan().config);
    if (queue.length === 0) return;
    index = 0;
    active = true;
    screen.classList.add('on');
    primeAudio();
    void acquireWakeLock();
    enterStep();
  }

  primary.addEventListener('click', () => {
    if (phase === 'done') stop();
    else if (phase === 'ready') beginSetup();
    else if (phase === 'countdown') {
      beep();
      startTimer();
    }
    else next();
  });

  secondary.addEventListener('click', () => {
    if (phase === 'rest') addTime(EXTRA_SECONDS);
    else goPrevious();
  });

  byId('runQuit').addEventListener('click', stop);

  infoBtn.addEventListener('click', () => {
    if (infoKey) ctx.showExerciseInfo(infoKey);
  });

  document.addEventListener('keydown', (event) => {
    if (!active) return;
    // La modal d'info (ouverte depuis #runInfo) passe par-dessus le lecteur
    // dans le top layer du navigateur, mais ce gestionnaire ecoute tout le
    // document : sans ce garde, Echap fermerait la modal ET quitterait la
    // seance d'un seul appui, et Espace ferait avancer le chrono derriere
    // pendant la lecture de la fiche.
    if (document.querySelector('dialog[open]')) return;
    if (event.key === ' ') {
      event.preventDefault();
      primary.click();
    } else if (event.key === 'Escape') {
      stop();
    }
  });

  // `isActive` : le lecteur plein ecran est la seule zone de l'app qu'un
  // renderAll() venu d'ailleurs (une fusion avec le nuage) ne doit pas
  // reconstruire — il tournerait alors en plein chrono.
  return { render, start, stop, isActive: () => active };
}
