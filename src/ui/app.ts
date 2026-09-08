import { createCloudSync, type CloudSync } from '../cloud/sync';
import { getLocale, onLocaleChange, setLocale as applyLocale, t } from '../i18n';
import { createCustom, createRest, presetName, presetToPlan, uid } from '../core/plan';
import { DEFAULT_PRESET, findPresetByPlanId, type PresetPlan } from '../data/presets';
import {
  DEFAULT_SESSION_CONFIG,
  forgetPlanFingerprint,
  reseedFingerprints,
  saveLocale,
  saveState,
  type State,
} from '../core/storage';
import type { ExerciseKey, Locale, PlanItem, SavedPlan, SessionConfig, SessionMode } from '../core/types';
import { requestPersistentStorage } from '../platform/storage';
import { applyStaticTranslations, byId } from './dom';
import { createExerciseInfo } from './exercise-info';
import { createGuidesIndex } from './guides-index';
import { createHistory } from './history';
import { createInlineInput } from './inline-input';
import { createLangSwitch } from './langswitch';
import { createLibrary } from './library';
import { createPlanner } from './planner';
import { createPlanSwitcher } from './plan-switcher';
import { createPresetDialog } from './preset-dialog';
import { createPreview } from './preview';
import { createRunner } from './runner';
import { createAccount } from './account';
import { createAiHelp } from './ai-help';
import { createShare } from './share';
import { createStatusBar } from './statusbar';
import { createToast, type Toast } from './toast';

/** Duree d'affichage du message « Enregistré ». */
const SAVED_TOAST_MS = 1600;

/** Duree par defaut d'une pause ajoutee manuellement, en secondes. */
const DEFAULT_REST_SECONDS = 120;

/** En dessous, « A propos » et « Creer une seance par lien » sont repliees pour ne pas allonger la page. */
const ABOUT_COLLAPSE_BELOW = '(max-width: 759px)';

/**
 * Ce que les modules d'interface partagent : l'etat, la persistance et les
 * deux niveaux de rendu.
 *
 * `state.plans` contient les seances de la personne — et PEUT etre vide : une
 * premiere visite n'ecrit rien, elle s'ouvre sur un modele CIRKALI.
 * `activePlan()` est l'accesseur a utiliser partout ailleurs plutot que de
 * re-chercher `state.plans.find(...)` a chaque fois ; l'invariant qu'il tient
 * n'est pas « il y a au moins une seance enregistree » mais « il y a toujours
 * une seance AFFICHEE », a soi ou modele (voir `ensureActive()`).
 */
export interface Context {
  state: State;
  activePlan(): SavedPlan;
  /** Une seance precise par id, si elle existe encore (ex. apres suppression). */
  getPlan(id: string): SavedPlan | undefined;
  /** Remplace le deroule de la seance active par un autre tableau. */
  setPlanItems(items: PlanItem[]): void;
  createPlan(name: string | null): void;
  /** Cree une seance a partir d'un lien/QR code partage (ui/share.ts). */
  importPlan(name: string | null, items: PlanItem[], config: SessionConfig): void;
  /**
   * Ecrase une seance existante par le contenu d'un lien importe. Distinct
   * d'`importPlan()`, qui cree toujours : ici l'id est conserve, donc les
   * references du selecteur de seance restent valides.
   */
  replacePlan(id: string, name: string | null, items: PlanItem[], config: SessionConfig): void;
  /** Ajoute des lignes a la fin du deroule actif, sans toucher a ses reglages. */
  appendToActive(items: PlanItem[]): void;
  duplicatePlan(id: string): void;
  /**
   * Le modele CIRKALI actuellement affiche, `null` quand la seance active
   * appartient a la personne. C'est le seul test a faire dans un module
   * d'interface : ni comparaison d'id ni recherche dans `PRESETS`.
   */
  activePreset(): PresetPlan | null;
  /**
   * Fait entrer le modele affiche — avec ses eventuelles modifications — dans
   * les seances de la personne. C'est le seul chemin par lequel une seance
   * CIRKALI est un jour ecrite quelque part.
   */
  adoptPreset(): void;
  /** Rend au modele affiche son contenu d'origine (refus de la copie). */
  discardPresetEdits(): void;
  renamePlan(id: string, name: string | null): void;
  deletePlan(id: string): void;
  switchPlan(id: string): void;
  setLocale(locale: Locale): void;
  /**
   * Persiste l'etat, signale le resultat a l'utilisateur, et — si un compte
   * est connecte — declenche la sauvegarde en ligne. Tous les chemins de
   * modification de l'app passent par ici : c'est ce qui rend la sauvegarde
   * automatique exhaustive sans cablage par site d'appel.
   */
  save(): void;
  /**
   * Remplace l'integralite de l'etat apres une fusion avec le nuage. Ne rend
   * pas : l'appelant enchaine `renderAll()`.
   */
  adoptState(next: State): void;
  /** Vrai pendant une seance : le lecteur occupe l'ecran, on ne le reconstruit pas. */
  isSessionActive(): boolean;
  /** Sauvegarde en ligne, facultative (src/cloud/). */
  cloud: CloudSync;
  /** Rendu complet, apres un changement de structure ou de langue. */
  renderAll(): void;
  /** Apercu et barre de statut seulement, apres une simple saisie chiffree. */
  renderDerived(): void;
  startSession(): void;
  /** Ouvre la modal d'info sur un exercice de la bibliotheque. */
  showExerciseInfo(key: ExerciseKey): void;
  /** Ouvre la modal de partage (lien + QR code) de la seance active. */
  openShareDialog(): void;
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
    byId<HTMLDetailsElement>('aiPlan').open = false;
    byId<HTMLDetailsElement>('allGuides').open = false;
  }

  const toast = createToast();

  /**
   * Le modele CIRKALI en cours de consultation, s'il y en a un.
   *
   * `plan` est une seance ordinaire, materialisee en memoire a la selection
   * (`presetToPlan()`) et JAMAIS poussee dans `state.plans` : c'est ce qui
   * fait qu'une seance CIRKALI n'existe ni dans le localStorage ni dans le
   * nuage, et qu'elle repart intacte au chargement suivant. Toute l'interface
   * la manipule comme n'importe quelle autre seance — c'est `save()` qui
   * arbitre, en refusant d'ecrire un modele modifie sans que la personne ait
   * accepte d'en creer sa copie.
   *
   * `pristine` exclut le NOM : celui-ci suit la langue active (il est refait a
   * chaque changement de langue), et l'inclure ferait passer une simple
   * traduction pour une modification de la personne.
   */
  interface PresetDraft {
    preset: PresetPlan;
    plan: SavedPlan;
    pristine: string;
  }

  let draft: PresetDraft | null = null;

  function presetFingerprint(plan: SavedPlan): string {
    return JSON.stringify([plan.items, plan.config]);
  }

  /** (Re)materialise un modele : c'est aussi le geste d'annulation des retouches. */
  function openPreset(preset: PresetPlan): void {
    const plan = presetToPlan(preset);
    draft = { preset, plan, pristine: presetFingerprint(plan) };
  }

  function presetEdited(): boolean {
    return draft !== null && presetFingerprint(draft.plan) !== draft.pristine;
  }

  /**
   * La seance a afficher : le modele ouvert s'il y en a un, sinon la seance
   * active de la personne. `undefined` seulement le temps qu'`ensureActive()`
   * tranche.
   *
   * Fonction a part et non deux lignes dans `activePlan()` : TypeScript garde
   * le retrecissement d'un `let` capture (`draft`) a travers un appel qui le
   * reaffecte, et lirait donc `draft` comme definitivement `null` juste apres
   * `ensureActive()`.
   */
  function currentPlan(): SavedPlan | undefined {
    if (draft) return draft.plan;
    return ctx.state.plans.find((plan) => plan.id === ctx.state.activePlanId);
  }

  /**
   * Garantit qu'il y a toujours une seance a l'ecran.
   *
   * Remplace l'ancien invariant « `loadState()` fabrique une seance type pour
   * que `plans` ne soit jamais vide » : plus rien n'est fabrique ni ecrit, on
   * ouvre le modele d'accueil (`DEFAULT_PRESET`). C'est ce qui rend une
   * premiere visite gratuite en stockage, et ce qui a permis de retirer de
   * `cloud/merge.ts` la reconnaissance des seances types dupliquees d'un
   * appareil a l'autre : plus aucun appareil n'en cree.
   *
   * A appeler apres tout ce qui peut faire disparaitre la seance active :
   * demarrage, suppression, fusion avec le nuage.
   */
  function ensureActive(): void {
    if (draft) return;
    if (ctx.state.plans.some((plan) => plan.id === ctx.state.activePlanId)) return;
    const fallback = ctx.state.plans[0];
    if (fallback) {
      ctx.state.activePlanId = fallback.id;
      return;
    }
    openPreset(DEFAULT_PRESET);
  }

  // Cree avant le Context, mais ses rappels (`state`, `adopt`...) ne sont
  // invoques qu'apres coup, sur un evenement reseau : ils peuvent donc
  // referencer `ctx` en toute securite.
  const cloud = createCloudSync({
    state: () => ctx.state,
    isBusy: () => ctx.isSessionActive(),
    adopt: (next) => ctx.adoptState(next),
    onPulled: (added) => toast.show(t('account.merged', { count: added })),
  });

  const ctx: Context = {
    state,
    activePlan: () => {
      // Un modele CIRKALI passe AVANT `activePlanId`, qui continue de designer
      // la derniere seance de la personne : on y revient telle quelle en
      // sortant du modele, et le document distant n'a jamais a connaitre un id
      // de modele.
      const current = currentPlan();
      if (current) return current;
      // Filet. `ensureActive()` a normalement deja tranche (au demarrage,
      // apres une suppression, apres une fusion) ; s'il restait quelque chose
      // a resoudre, mieux vaut le faire ici que renvoyer une seance qui
      // n'existe pas.
      ensureActive();
      return currentPlan() ?? presetToPlan(DEFAULT_PRESET);
    },
    getPlan: (id) =>
      draft && draft.plan.id === id
        ? draft.plan
        : ctx.state.plans.find((plan) => plan.id === id),
    setPlanItems: (items) => {
      ctx.activePlan().items = items;
    },
    createPlan: (name) => {
      registerPlan({ id: uid(), name, items: [], config: { ...DEFAULT_SESSION_CONFIG } });
    },
    importPlan: (name, items, config) => {
      registerPlan({ id: uid(), name, items, config });
    },
    replacePlan: (id, name, items, config) => {
      const plan = ctx.state.plans.find((entry) => entry.id === id);
      // Un modele n'est jamais une cible d'ecrasement : il n'apparait pas dans
      // `state.plans`, donc pas non plus dans les destinations d'import.
      if (!plan) return;
      draft = null;
      plan.name = name;
      plan.items = items;
      plan.config = config;
      ctx.state.activePlanId = plan.id;
      save();
      renderAll();
    },
    appendToActive: (items) => {
      ctx.activePlan().items.push(...items);
      save();
      renderAll();
    },
    duplicatePlan: (id) => {
      // Dupliquer le modele affiche, c'est exactement en creer sa version :
      // un seul chemin, donc un seul comportement a expliquer.
      if (draft && draft.plan.id === id) {
        ctx.adoptPreset();
        return;
      }
      const source = ctx.state.plans.find((plan) => plan.id === id);
      if (!source) return;
      registerPlan({
        id: uid(),
        // Suffixe ajoute une seule fois, a la duplication : comme
        // `customName`, c'est ensuite du texte fige (regle CLAUDE.md n°2,
        // meme compromis que « Copie de … » dans un tableur). Rien a
        // suffixer sur une seance qui n'a pas de nom.
        name: source.name ? t('plans.copyName', { name: source.name }) : null,
        items: source.items.map((item) => ({ ...item, id: uid() })),
        config: { ...source.config },
      });
    },
    activePreset: () => draft?.preset ?? null,
    adoptPreset: () => {
      const current = draft;
      if (!current) return;
      // Avant `registerPlan()`, qui appelle `save()` : sans ca, le modele
      // serait encore affiche et `save()` redemanderait la confirmation.
      draft = null;
      const name = current.plan.name;
      registerPlan({
        id: uid(),
        // Nom traduit fige a cet instant, comme le suffixe de
        // `duplicatePlan()` : a partir d'ici c'est une seance de la personne,
        // qu'elle peut renommer. Meme compromis assume (CLAUDE.md, regle n°2).
        name,
        items: current.plan.items,
        config: current.plan.config,
      });
      toast.show(t('presets.adopted', { name: name ?? '' }));
    },
    discardPresetEdits: () => {
      if (!draft) return;
      openPreset(draft.preset);
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
      // Rien a proteger, meme sur la derniere : la liste peut rester vide, et
      // l'app se rabat alors sur le modele d'accueil (`ensureActive()`).
      const index = ctx.state.plans.findIndex((plan) => plan.id === id);
      if (index === -1) return;
      ctx.state.plans.splice(index, 1);
      // Seul chemin de suppression de l'app : c'est donc ici, et seulement
      // ici, qu'on pose la pierre tombale. Sans elle, la seance reviendrait du
      // nuage a la prochaine synchronisation, indistinguable d'une seance que
      // cet appareil n'aurait jamais recue.
      ctx.state.deleted[id] = Date.now();
      forgetPlanFingerprint(id);
      ensureActive();
      save();
      renderAll();
    },
    switchPlan: (id) => {
      const preset = findPresetByPlanId(id);
      if (preset) {
        // Rien a persister : consulter un modele ne modifie pas l'etat, et
        // `activePlanId` doit continuer de designer une vraie seance (le
        // document distant n'accepterait pas un id de modele).
        openPreset(preset);
        renderAll();
        return;
      }
      if (!ctx.state.plans.some((plan) => plan.id === id)) return;
      draft = null;
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
    adoptState: (next) => {
      // Muter les champs plutot que reaffecter `ctx.state` : les modules ont
      // capture `ctx`, pas `state`, mais muter reste le geste le plus sur si
      // l'un d'eux venait a garder une reference.
      ctx.state.plans = next.plans;
      ctx.state.activePlanId = next.activePlanId;
      ctx.state.history = next.history;
      ctx.state.deleted = next.deleted;
      // L'etat adopte EST celui qu'on s'apprete a ecrire : sans ce reamorcage,
      // la sauvegarde suivante redaterait chaque seance venue du nuage comme
      // si cet appareil l'avait modifiee, et elle gagnerait a tort la fusion
      // d'apres.
      reseedFingerprints(ctx.state.plans);
      // La fusion a pu emporter la seance active (supprimee depuis un autre
      // appareil), voire toutes les seances.
      ensureActive();
      saveState(ctx.state);
      renderAll();
    },
    isSessionActive: () => runner.isActive(),
    cloud,
    renderAll: () => renderAll(),
    renderDerived: () => renderDerived(),
    startSession: () => {
      // Le lecteur va occuper l'ecran plusieurs dizaines de minutes : ce qui
      // attend dans le differe part maintenant, pas a la fin de la seance.
      void cloud.flush();
      runner.start();
    },
    showExerciseInfo: (key) => exerciseInfo.open(key),
    openShareDialog: () => share.openShareDialog(),
    toast,
  };

  const planSwitcher = createPlanSwitcher(ctx);
  const presetDialog = createPresetDialog(ctx);
  const planner = createPlanner(ctx);
  const preview = createPreview(ctx);
  const statusBar = createStatusBar(ctx);
  const history = createHistory(ctx);
  const library = createLibrary(ctx);
  const langSwitch = createLangSwitch(ctx);
  const runner = createRunner(ctx);
  const guidesIndex = createGuidesIndex();
  const exerciseInfo = createExerciseInfo();
  const share = createShare(ctx);
  const account = createAccount(ctx);
  createAiHelp(ctx);

  /**
   * Sequence commune a createPlan/importPlan/duplicatePlan : enregistrer,
   * activer, sauvegarder, tout rafraichir.
   *
   * `updatedAt` est pose ici et nulle part ailleurs : les appelants decrivent
   * une seance, pas sa date. Ensuite c'est `saveState()` qui la tient a jour
   * tout seul (core/storage.ts).
   */
  function registerPlan(plan: Omit<SavedPlan, 'updatedAt'>): void {
    // Creer, importer ou dupliquer une seance fait sortir du modele affiche :
    // la nouvelle seance devient l'active, et `activePlan()` doit la rendre.
    draft = null;
    ctx.state.plans.push({ ...plan, updatedAt: Date.now() });
    ctx.state.activePlanId = plan.id;
    save();
    renderAll();
  }

  function save(): void {
    // Seul endroit ou une seance CIRKALI est protegee, et il suffit : toute
    // modification de l'app passe par save() (c'est deja ce qui rend la
    // sauvegarde en ligne exhaustive). Le modele modifie reste affiche tel
    // quel pendant la question — la personne voit ce qu'elle s'apprete a
    // garder — et le dialogue conclut par `adoptPreset()` ou
    // `discardPresetEdits()`.
    if (presetEdited()) {
      presetDialog.open();
      return;
    }
    const ok = saveState(ctx.state);
    // Premiere ecriture reussie : le moment ou demander un stockage durable
    // (src/platform/storage.ts). Pas au chargement — Firefox pose la question
    // a l'utilisateur, et un visiteur qui n'a encore rien enregistre n'a pas a
    // se la voir poser.
    if (ok) requestPersistentStorage();
    // Sauvegarde en ligne : toute modification passant par save(), il suffit de
    // brancher ici pour que TOUT parte dans le nuage — y compris ce qu'un
    // module futur ajoutera. Sans effet si personne n'est connecte.
    cloud.notifyLocalChange();
    showSaveStatus(ok);
  }

  /**
   * Etat de la sauvegarde, locale puis en ligne. Un echec local reste affiche
   * (pas de minuteur) : c'est un probleme que la personne doit voir. Un echec
   * de synchronisation aussi, mais il est moins grave — le localStorage a
   * ecrit, la modification est en retard, pas perdue.
   */
  function showSaveStatus(localOk: boolean): void {
    if (savedTimer !== null) window.clearTimeout(savedTimer);
    if (!localOk) {
      savedNote.textContent = t('storage.unavailable');
      return;
    }
    const cloudNote = cloudStatusNote();
    savedNote.textContent = cloudNote ? `${t('storage.saved')} · ${cloudNote}` : t('storage.saved');
    // Un ennui de synchronisation reste affiche (pas de minuteur) : il est
    // moins grave qu'un echec local — le localStorage a ecrit, la modification
    // est en retard, pas perdue — mais il doit rester lisible. Teste sur le
    // STATUT et non sur le libelle traduit : deux traductions egales par
    // hasard suffiraient a fausser une comparaison de chaines.
    const status = cloud.status();
    if (status === 'offline' || status === 'error' || status === 'too-large') return;
    savedTimer = window.setTimeout(() => {
      savedNote.textContent = '';
    }, SAVED_TOAST_MS);
  }

  /** Suffixe de `#saved`. `null` quand personne n'est connecte : rien a dire de plus. */
  function cloudStatusNote(): string | null {
    switch (cloud.status()) {
      case 'syncing':
      case 'signing-in':
        return t('account.statusSyncing');
      case 'synced':
        return t('account.statusSynced');
      case 'offline':
        return t('account.statusOffline');
      case 'error':
        return t('account.statusError');
      case 'too-large':
        return t('account.statusTooLarge');
      case 'off':
        return null;
    }
  }

  function renderDerived(): void {
    preview.render();
    statusBar.render();
  }

  function renderAll(): void {
    const { config } = ctx.activePlan();

    applyStaticTranslations();
    // La page de confidentialite est generee en cinq fichiers, un par langue :
    // le libelle du lien suit la langue via `data-i18n`, mais pas sa cible.
    // Meme motif que l'index des fiches (`ui/guides-index.ts`), en plus simple
    // — ici il n'y a qu'une URL a recomposer, sans slug traduit.
    byId('privacyLink').setAttribute('href', `confidentialite/${getLocale()}`);
    byId('modeClassic').classList.toggle('on', config.mode === 'classic');
    byId('modeCircuit').classList.toggle('on', config.mode === 'circuit');
    settings.classList.toggle('on', config.mode === 'circuit');
    pauseInput.value = String(config.pause);
    transInput.value = String(config.trans);
    modeHint.textContent =
      config.mode === 'circuit' ? t('mode.hintCircuit') : t('mode.hintClassic');

    langSwitch.render();
    account.render();
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

  // La poussee aboutit une seconde ou deux apres que save() a peint
  // « Enregistré » : sans cet abonnement, le suffixe de synchronisation
  // n'apparaitrait qu'a la modification SUIVANTE, toujours en retard d'un cran.
  cloud.onChange(() => {
    account.render();
    if (savedNote.textContent !== '') showSaveStatus(true);
  });

  // Un changement de langue retraduit tout, y compris une seance en cours.
  onLocaleChange(() => {
    // Le nom d'un modele est resolu a l'affichage, jamais stocke : il doit
    // donc suivre la langue comme n'importe quel libelle de l'interface.
    // `pristine` ignore le nom, ce rafraichissement ne passe donc pas pour
    // une modification de la personne.
    if (draft) draft.plan.name = presetName(draft.preset);
    renderAll();
  });

  // Avant le premier rendu : sans seance enregistree (premiere visite, ou tout
  // supprime), c'est ici que le modele d'accueil s'ouvre.
  ensureActive();

  // Une seule fois au demarrage : un lien partage ouvert directement propose
  // son import, puis nettoie l'URL (voir ui/share.ts).
  share.checkIncomingShare();

  // Navigateur agentique : exposer les operations de l'app comme des outils
  // plutot que de laisser l'agent deviner le DOM (voir ui/webmcp.ts). Le test
  // est fait ICI, avant l'import : sans lui, tout le monde telechargerait un
  // module qu'aucun navigateur courant n'utilise. `catch` silencieux — une
  // API en origin trial ne doit jamais empecher l'app de demarrer.
  if ('modelContext' in navigator || 'modelContext' in document) {
    void import('./webmcp')
      .then((mod) => mod.installWebMcp(ctx, share))
      .catch(() => {});
  }

  return { render: renderAll };
}
