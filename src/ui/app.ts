import { onLocaleChange, setLocale as applyLocale, t } from '../i18n';
import { createCustom, createRest, defaultPlan, uid } from '../core/plan';
import { DEFAULT_SESSION_CONFIG, saveLocale, saveState, type State } from '../core/storage';
import type { ExerciseKey, Locale, PlanItem, SavedPlan, SessionMode } from '../core/types';
import { applyStaticTranslations, byId } from './dom';
import { createExerciseInfo } from './exercise-info';
import { createGuidesIndex } from './guides-index';
import { createHistory } from './history';
import { createInlineInput } from './inline-input';
import { createLangSwitch } from './langswitch';
import { createLibrary } from './library';
import { createPlanner } from './planner';
import { createPlanSwitcher } from './plan-switcher';
import { createPreview } from './preview';
import { createRunner } from './runner';
import { createStatusBar } from './statusbar';
import { createToast, type Toast } from './toast';

/** Duree d'affichage du message « Enregistré ». */
const SAVED_TOAST_MS = 1600;

/** Duree par defaut d'une pause ajoutee manuellement, en secondes. */
const DEFAULT_REST_SECONDS = 120;

/** En dessous, la section « A propos » est repliee pour ne pas allonger la page. */
const ABOUT_COLLAPSE_BELOW = '(max-width: 759px)';

/**
 * Ce que les modules d'interface partagent : l'etat, la persistance et les
 * deux niveaux de rendu.
 *
 * `state.plans` contient plusieurs seances sauvegardees ; `activePlan()` est
 * l'accesseur a utiliser partout ailleurs plutot que de re-chercher
 * `state.plans.find(...)` a chaque fois (invariant garanti : il y a toujours
 * au moins une seance).
 */
export interface Context {
  state: State;
  activePlan(): SavedPlan;
  /** Une seance precise par id, si elle existe encore (ex. apres suppression). */
  getPlan(id: string): SavedPlan | undefined;
  /** Remplace le deroule de la seance active par un autre tableau. */
  setPlanItems(items: PlanItem[]): void;
  createPlan(name: string | null): void;
  duplicatePlan(id: string): void;
  renamePlan(id: string, name: string | null): void;
  deletePlan(id: string): void;
  switchPlan(id: string): void;
  setLocale(locale: Locale): void;
  /** Persiste l'etat et signale le resultat a l'utilisateur. */
  save(): void;
  /** Rendu complet, apres un changement de structure ou de langue. */
  renderAll(): void;
  /** Apercu et barre de statut seulement, apres une simple saisie chiffree. */
  renderDerived(): void;
  startSession(): void;
  /** Ouvre la modal d'info sur un exercice de la bibliotheque. */
  showExerciseInfo(key: ExerciseKey): void;
  toast: Toast;
}

export function createApp(state: State): { render: () => void } {
  const modeHint = byId('modeHint');
  const settings = byId('settings');
  const pauseInput = byId<HTMLInputElement>('setPause');
  const transInput = byId<HTMLInputElement>('setTrans');
  const savedNote = byId('saved');

  let savedTimer: number | null = null;

  // La section « A propos » est livree ouverte : sans JavaScript elle reste
  // lisible partout. Ici on la replie sur petit ecran, ou elle pousserait le
  // contenu utile trop bas. Le contenu reste dans le DOM dans les deux cas.
  // Appel defensif : replier une section est cosmetique et ne doit jamais
  // pouvoir empecher l'app de demarrer la ou matchMedia manque.
  if (window.matchMedia?.(ABOUT_COLLAPSE_BELOW).matches) {
    byId<HTMLDetailsElement>('about').open = false;
  }

  const toast = createToast();

  const ctx: Context = {
    state,
    activePlan: () => {
      const found = ctx.state.plans.find((plan) => plan.id === ctx.state.activePlanId);
      // Invariant garanti par `loadState()` : `plans` n'est jamais vide.
      return found ?? (ctx.state.plans[0] as SavedPlan);
    },
    getPlan: (id) => ctx.state.plans.find((plan) => plan.id === id),
    setPlanItems: (items) => {
      ctx.activePlan().items = items;
    },
    createPlan: (name) => {
      const plan: SavedPlan = { id: uid(), name, items: [], config: { ...DEFAULT_SESSION_CONFIG } };
      ctx.state.plans.push(plan);
      ctx.state.activePlanId = plan.id;
      save();
      renderAll();
    },
    duplicatePlan: (id) => {
      const source = ctx.state.plans.find((plan) => plan.id === id);
      if (!source) return;
      const copy: SavedPlan = {
        id: uid(),
        // Copie exacte, jamais un suffixe « (copie) » : ce serait du texte
        // traduit fige dans une donnee persistee (regle CLAUDE.md n°2).
        name: source.name,
        items: source.items.map((item) => ({ ...item, id: uid() })),
        config: { ...source.config },
      };
      ctx.state.plans.push(copy);
      ctx.state.activePlanId = copy.id;
      save();
      renderAll();
    },
    renamePlan: (id, name) => {
      const plan = ctx.state.plans.find((entry) => entry.id === id);
      if (!plan) return;
      plan.name = name;
      save();
      renderAll();
    },
    deletePlan: (id) => {
      // On ne supprime jamais la derniere seance restante.
      if (ctx.state.plans.length <= 1) return;
      const index = ctx.state.plans.findIndex((plan) => plan.id === id);
      if (index === -1) return;
      ctx.state.plans.splice(index, 1);
      if (ctx.state.activePlanId === id) {
        ctx.state.activePlanId = (ctx.state.plans[0] as SavedPlan).id;
      }
      save();
      renderAll();
    },
    switchPlan: (id) => {
      if (!ctx.state.plans.some((plan) => plan.id === id)) return;
      ctx.state.activePlanId = id;
      save();
      renderAll();
    },
    setLocale: (locale) => {
      // applyLocale() notifie deja les abonnes onLocaleChange (voir plus
      // bas), qui declenche renderAll() : pas besoin de l'appeler ici aussi.
      applyLocale(locale);
      saveLocale(locale);
    },
    save: () => save(),
    renderAll: () => renderAll(),
    renderDerived: () => renderDerived(),
    startSession: () => runner.start(),
    showExerciseInfo: (key) => exerciseInfo.open(key),
    toast,
  };

  const planSwitcher = createPlanSwitcher(ctx);
  const planner = createPlanner(ctx);
  const preview = createPreview(ctx);
  const statusBar = createStatusBar(ctx);
  const history = createHistory(ctx);
  const library = createLibrary(ctx);
  const langSwitch = createLangSwitch(ctx);
  const runner = createRunner(ctx);
  const guidesIndex = createGuidesIndex();
  const exerciseInfo = createExerciseInfo();

  function save(): void {
    const ok = saveState(ctx.state);
    if (savedTimer !== null) window.clearTimeout(savedTimer);
    savedNote.textContent = ok ? t('storage.saved') : t('storage.unavailable');
    if (!ok) return;
    savedTimer = window.setTimeout(() => {
      savedNote.textContent = '';
    }, SAVED_TOAST_MS);
  }

  function renderDerived(): void {
    preview.render();
    statusBar.render();
  }

  function renderAll(): void {
    const { config } = ctx.activePlan();

    applyStaticTranslations();
    byId('modeClassic').classList.toggle('on', config.mode === 'classic');
    byId('modeCircuit').classList.toggle('on', config.mode === 'circuit');
    settings.classList.toggle('on', config.mode === 'circuit');
    pauseInput.value = String(config.pause);
    transInput.value = String(config.trans);
    modeHint.textContent =
      config.mode === 'circuit' ? t('mode.hintCircuit') : t('mode.hintClassic');

    langSwitch.render();
    planSwitcher.render();
    guidesIndex.render();
    planner.render();
    library.render();
    history.render();
    renderDerived();
    runner.render();
  }

  function setMode(mode: SessionMode): void {
    ctx.activePlan().config.mode = mode;
    save();
    renderAll();
  }

  byId('modeClassic').addEventListener('click', () => setMode('classic'));
  byId('modeCircuit').addEventListener('click', () => setMode('circuit'));

  pauseInput.addEventListener('change', () => {
    ctx.activePlan().config.pause = Math.max(0, Number.parseInt(pauseInput.value, 10) || 0);
    save();
    renderDerived();
  });

  transInput.addEventListener('change', () => {
    ctx.activePlan().config.trans = Math.max(0, Number.parseInt(transInput.value, 10) || 0);
    save();
    renderDerived();
  });

  byId('addRest').addEventListener('click', () => {
    ctx.activePlan().items.push(createRest(DEFAULT_REST_SECONDS));
    save();
    renderAll();
  });

  createInlineInput(byId('addCustom'), {
    label: () => t('prompt.customName'),
    confirmLabel: () => t('actions.confirm'),
    cancelLabel: () => t('actions.cancel'),
    placeholder: () => t('prompt.customName'),
    onConfirm: (name) => {
      ctx.activePlan().items.push(createCustom(name));
      save();
      renderAll();
    },
  });

  byId('loadDefault').addEventListener('click', () => {
    if (ctx.activePlan().items.length > 0 && !window.confirm(t('prompt.loadDefault'))) return;
    ctx.setPlanItems(defaultPlan());
    save();
    renderAll();
  });

  byId('clearAll').addEventListener('click', () => {
    if (ctx.activePlan().items.length === 0 || !window.confirm(t('prompt.clearAll'))) return;
    ctx.setPlanItems([]);
    save();
    renderAll();
  });

  // Un changement de langue retraduit tout, y compris une seance en cours.
  onLocaleChange(() => renderAll());

  return { render: renderAll };
}
