import { onLocaleChange, t } from '../i18n';
import { createCustom, createRest, defaultPlan } from '../core/plan';
import { saveState, type State } from '../core/storage';
import { applyStaticTranslations, byId } from './dom';
import { createHistory } from './history';
import { createLangSwitch } from './langswitch';
import { createLibrary } from './library';
import { createPlanner } from './planner';
import { createPreview } from './preview';
import { createRunner } from './runner';
import { createStatusBar } from './statusbar';

/** Duree d'affichage du message « Enregistré ». */
const SAVED_TOAST_MS = 1600;

/** Duree par defaut d'une pause ajoutee manuellement, en secondes. */
const DEFAULT_REST_SECONDS = 120;

/**
 * Ce que les modules d'interface partagent : l'etat, la persistance et les
 * deux niveaux de rendu.
 */
export interface Context {
  state: State;
  /** Persiste l'etat et signale le resultat a l'utilisateur. */
  save(): void;
  /** Rendu complet, apres un changement de structure ou de langue. */
  renderAll(): void;
  /** Apercu et barre de statut seulement, apres une simple saisie chiffree. */
  renderDerived(): void;
  startSession(): void;
}

export function createApp(state: State): { render: () => void } {
  const modeHint = byId('modeHint');
  const settings = byId('settings');
  const pauseInput = byId<HTMLInputElement>('setPause');
  const transInput = byId<HTMLInputElement>('setTrans');
  const savedNote = byId('saved');

  let savedTimer: number | null = null;

  const ctx: Context = {
    state,
    save: () => save(),
    renderAll: () => renderAll(),
    renderDerived: () => renderDerived(),
    startSession: () => runner.start(),
  };

  const planner = createPlanner(ctx);
  const preview = createPreview(ctx);
  const statusBar = createStatusBar(ctx);
  const history = createHistory(ctx);
  const library = createLibrary(ctx);
  const langSwitch = createLangSwitch(ctx);
  const runner = createRunner(ctx);

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
    const { config } = ctx.state;

    applyStaticTranslations();
    byId('modeClassic').classList.toggle('on', config.mode === 'classic');
    byId('modeCircuit').classList.toggle('on', config.mode === 'circuit');
    settings.classList.toggle('on', config.mode === 'circuit');
    pauseInput.value = String(config.pause);
    transInput.value = String(config.trans);
    modeHint.textContent =
      config.mode === 'circuit' ? t('mode.hintCircuit') : t('mode.hintClassic');

    langSwitch.render();
    planner.render();
    library.render();
    history.render();
    renderDerived();
    runner.render();
  }

  function setMode(mode: State['config']['mode']): void {
    ctx.state.config.mode = mode;
    save();
    renderAll();
  }

  byId('modeClassic').addEventListener('click', () => setMode('classic'));
  byId('modeCircuit').addEventListener('click', () => setMode('circuit'));

  pauseInput.addEventListener('change', () => {
    ctx.state.config.pause = Math.max(0, Number.parseInt(pauseInput.value, 10) || 0);
    save();
    renderDerived();
  });

  transInput.addEventListener('change', () => {
    ctx.state.config.trans = Math.max(0, Number.parseInt(transInput.value, 10) || 0);
    save();
    renderDerived();
  });

  byId('addRest').addEventListener('click', () => {
    ctx.state.plan.push(createRest(DEFAULT_REST_SECONDS));
    save();
    renderAll();
  });

  byId('addCustom').addEventListener('click', () => {
    const name = window.prompt(t('prompt.customName'));
    if (!name || !name.trim()) return;
    ctx.state.plan.push(createCustom(name));
    save();
    renderAll();
  });

  byId('loadDefault').addEventListener('click', () => {
    if (ctx.state.plan.length > 0 && !window.confirm(t('prompt.loadDefault'))) return;
    ctx.state.plan = defaultPlan();
    save();
    renderAll();
  });

  byId('clearAll').addEventListener('click', () => {
    if (ctx.state.plan.length === 0 || !window.confirm(t('prompt.clearAll'))) return;
    ctx.state.plan = [];
    save();
    renderAll();
  });

  // Un changement de langue retraduit tout, y compris une seance en cours.
  onLocaleChange(() => renderAll());

  return { render: renderAll };
}
