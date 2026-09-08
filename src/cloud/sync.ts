// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import { parseDeleted, parseHistory, parsePlansList, type State } from '../core/storage';
import { isUserCancellation, loadSdk } from './firebase';
import { mergeStates } from './merge';
import { rememberSignedIn, wasSignedIn } from './session-hint';

/**
 * `off`      : personne n'est connecte — l'app se comporte comme avant.
 * `syncing`  : une lecture ou une ecriture est en cours.
 * `synced`   : le nuage porte l'etat courant.
 * `offline`  : une ecriture attend le retour du reseau (rien n'est perdu :
 *              le localStorage a deja ecrit).
 * `error`    : Firestore refuse (regles, quota) — meme filet local.
 * `too-large`: l'etat depasse le plafond d'un document Firestore. Distinct de
 *              `error` parce qu'il ne passera pas tout seul : reessayer eternellement
 *              n'y changerait rien, seule la personne peut alleger ses seances.
 */
export type SyncStatus =
  | 'off'
  | 'signing-in'
  | 'syncing'
  | 'synced'
  | 'offline'
  | 'error'
  | 'too-large';

export interface CloudUser {
  name: string;
  email: string;
}

export interface CloudSync {
  status(): SyncStatus;
  user(): CloudUser | null;
  /** Horodatage de la derniere synchronisation reussie, ou null. */
  lastSyncedAt(): number | null;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  /** Appele apres CHAQUE save() local : c'est la sauvegarde automatique. */
  notifyLocalChange(): void;
  /** Pousse tout de suite ce qui attend (onglet masque, page fermee, seance qui demarre). */
  flush(): Promise<void>;
  /** A appeler quand le lecteur se ferme : rejoue une fusion reportee (voir `isBusy`). */
  resumeDeferred(): void;
  onChange(listener: () => void): () => void;
}

/**
 * Delai de regroupement des ecritures.
 *
 * `save()` part a chaque `change` d'un champ nombre : monter les series de 3 a
 * 7 declenche quatre sauvegardes locales. Sans ce delai, ce serait quatre
 * ecritures Firestore facturees pour un seul geste. Comme on ecrit toujours
 * l'etat COMPLET et courant (jamais un delta), regrouper est sans risque : la
 * derniere ecriture contient tout.
 *
 * Quatre secondes et non une et demie : le quota gratuit se compte en
 * ECRITURES par jour (20 000, tous comptes confondus), pas en octets — et une
 * seance se construit par gestes espaces de deux a trois secondes (ajouter un
 * exercice, regler ses series, monter une ligne). A 1,5 s chacun de ces gestes
 * payait sa propre ecriture ; a 4 s ils se regroupent. Rien n'est risque au
 * passage : `flush()` force le depart au masquage de l'onglet, a la fermeture,
 * au demarrage d'une seance et a la deconnexion.
 */
const PUSH_DEBOUNCE_MS = 4000;

/**
 * Plafond d'un document Firestore : 1 Mio, limite dure du service. Au-dela,
 * `setDoc` echoue definitivement — sans ce garde-fou, chaque modification
 * relancerait une ecriture vouee a etre refusee, et l'interface afficherait
 * « synchronisation impossible » sans jamais dire pourquoi.
 *
 * Mesure faite sur le JSON, qui surestime d'environ 10 % ce que Firestore
 * compte vraiment (noms de champs + valeurs, sans guillemets ni virgules) : on
 * refuse donc vers 90 % du plafond reel, et cette marge est voulue. Pour fixer
 * l'ordre de grandeur : ~700 seances de douze lignes.
 */
const MAX_DOC_BYTES = 1024 * 1024;

/** Schema des donnees ecrites dans le document distant (cf. core/storage.ts). */
const REMOTE_SCHEMA = 6;

/** Ce dont le pilote a besoin de l'app, sans dependre de tout le `Context`. */
export interface SyncHost {
  /** L'etat courant, tel qu'il vient d'etre ecrit en local. */
  state(): State;
  /** Vrai pendant une seance : on ne remplace pas l'etat sous les pieds du lecteur. */
  isBusy(): boolean;
  /** Adopte l'etat fusionne et redessine. */
  adopt(next: State): void;
  /** Signale a l'utilisateur que des seances sont arrivees du nuage. */
  onPulled(added: number): void;
}

export function createCloudSync(host: SyncHost): CloudSync {
  let status: SyncStatus = 'off';
  let user: CloudUser | null = null;
  let uid: string | null = null;
  let lastSyncedAt: number | null = null;

  let pushTimer: number | null = null;
  /** Une modification attend d'etre poussee (differee, ou echouee et a rejouer). */
  let pending = false;
  /** Une fusion est arrivee pendant une seance : a rejouer a la fin. */
  let deferredPull = false;
  /** L'ecouteur d'authentification, installe au plus une fois (voir `attach`). */
  let attached: Promise<void> | null = null;

  const listeners = new Set<() => void>();

  function notify(next: SyncStatus): void {
    status = next;
    for (const listener of listeners) listener();
  }

  // ---------------------------------------------------------------- lecture

  /**
   * Le document distant est une entree NON FIABLE, au meme titre qu'un lien de
   * partage : il a pu etre ecrit par une version plus ancienne de l'app, ou par
   * n'importe quel outil ayant les droits du compte. Il repasse donc par les
   * parseurs tolerants de core/storage.ts plutot que par une seconde validation
   * vouee a diverger de celle-ci (meme regle que core/share.ts).
   */
  function parseRemote(raw: unknown): State | null {
    if (typeof raw !== 'object' || raw === null) return null;
    const source = raw as Record<string, unknown>;
    const plans = parsePlansList(source['plans']);
    // `null` = champ `plans` illisible, donc document inexploitable. Un tableau
    // VIDE est en revanche legitime : quelqu'un peut n'avoir aucune seance a
    // soi et n'utiliser que les modeles CIRKALI.
    if (!plans) return null;
    const activePlanId =
      typeof source['activePlanId'] === 'string' &&
      plans.some((plan) => plan.id === source['activePlanId'])
        ? source['activePlanId']
        : (plans[0]?.id ?? '');
    return {
      plans,
      activePlanId,
      history: parseHistory(source['history']),
      // `prune: false` : voir le commentaire de parseDeleted() dans
      // core/storage.ts — ce document distant fait foi pour les autres
      // appareils, cet appareil-ci ne doit pas en oublier une partie sous
      // pretexte que SA propre horloge la juge trop ancienne.
      deleted: parseDeleted(source['deleted'], Date.now(), false),
    };
  }

  /**
   * De quoi comparer deux etats sans tenir compte de l'habillage du document
   * (`schema`, `clientUpdatedAt`, `updatedAt`), qui change a chaque ecriture et
   * rendrait toute comparaison vraie.
   */
  function fingerprint(state: State): string {
    return JSON.stringify([state.plans, state.activePlanId, state.history, state.deleted]);
  }

  function snapshot(state: State): Record<string, unknown> {
    return {
      schema: REMOTE_SCHEMA,
      plans: state.plans,
      activePlanId: state.activePlanId,
      history: state.history,
      deleted: state.deleted,
      clientUpdatedAt: Date.now(),
    };
  }

  // ---------------------------------------------------------------- ecriture

  /**
   * Les ecritures sont serialisees sur cette chaine plutot que lancees en
   * parallele : deux `setDoc` concurrents ecrivent tous deux l'etat complet, et
   * rien ne garantit que c'est le plus recent qui arrive en dernier chez
   * Firestore. Une ecriture en retard ecraserait alors la plus fraiche.
   */
  let queue: Promise<void> = Promise.resolve();

  function push(): Promise<void> {
    queue = queue.then(pushNow);
    return queue;
  }

  async function pushNow(): Promise<void> {
    if (uid === null) return;
    const currentUid = uid;
    pending = false;
    notify('syncing');
    try {
      const payload = snapshot(host.state());
      // Avant le reseau : une ecriture au-dessus du plafond serait refusee de
      // toute facon, et ce refus-la ne se repare pas tout seul.
      if (new TextEncoder().encode(JSON.stringify(payload)).length > MAX_DOC_BYTES) {
        if (uid === currentUid) notify('too-large');
        report(new Error(`etat trop volumineux pour un document Firestore (> ${MAX_DOC_BYTES} o)`));
        return;
      }
      const sdk = await loadSdk();
      const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
      await setDoc(doc(sdk.db, 'users', currentUid), {
        ...payload,
        updatedAt: serverTimestamp(),
      });
      // Le compte a pu changer PENDANT l'ecriture (deconnexion, reconnexion sur
      // un autre compte) : le statut affiche doit alors parler du compte
      // ACTUEL, pas de celui pour qui cette ecriture partait — sinon le succes
      // ou l'echec d'un compte quitte s'affiche sur celui qui vient d'arriver.
      if (uid === currentUid) {
        lastSyncedAt = Date.now();
        notify('synced');
      }
    } catch (error) {
      // Jamais d'exception vers l'UI : le localStorage a deja ecrit, donc au
      // pire la modification est EN RETARD, jamais perdue. Elle repartira a la
      // modification suivante, au retour du reseau, ou au prochain chargement.
      pending = true;
      if (uid === currentUid) notify(navigator.onLine === false ? 'offline' : 'error');
      report(error);
    }
  }

  /**
   * Aller-retour complet : lire le distant, fusionner, adopter, repousser.
   *
   * Declenche a la CONNEXION uniquement — c'est-a-dire au chargement de la
   * page quand la session Firebase est restauree, ou juste apres un clic sur
   * « se connecter ». Il n'y a volontairement ni ecoute temps reel
   * (`onSnapshot`, qui ferait surgir un renderAll() en pleine saisie) ni
   * bouton « synchroniser maintenant » : recharger la page suffit a recuperer
   * ce qu'un autre appareil a ecrit. Dans l'autre sens, la poussee est
   * continue (voir `notifyLocalChange`), donc rien n'attend jamais ici pour
   * PARTIR.
   */
  async function pullMergePush(): Promise<void> {
    if (uid === null) return;
    const currentUid = uid;

    // Une fusion redessine tout (`renderAll()`) : l'appliquer pendant une
    // seance reconstruirait le lecteur en plein chrono. On la reporte a la fin.
    if (host.isBusy()) {
      deferredPull = true;
      return;
    }

    notify('syncing');
    try {
      const sdk = await loadSdk();
      const { doc, getDoc } = await import('firebase/firestore');
      const snap = await getDoc(doc(sdk.db, 'users', currentUid));
      // La connexion a pu changer pendant l'attente reseau.
      if (uid !== currentUid) return;
      // Et une seance a pu DEMARRER pendant ce meme aller-retour : le premier
      // test d'isBusy(), avant la requete, ne voit rien de ce qui se passe
      // ensuite. Sans ce second test, adopt() reconstruirait le lecteur en
      // plein chrono — exactement ce que le premier test visait a eviter.
      if (host.isBusy()) {
        deferredPull = true;
        return;
      }

      const remote = snap.exists() ? parseRemote(snap.data()) : null;
      if (remote) {
        const local = host.state();
        const before = new Set(local.plans.map((plan) => plan.id));
        const merged = mergeStates(local, remote);
        host.adopt(merged);
        const added = merged.plans.filter((plan) => !before.has(plan.id)).length;
        if (added > 0) host.onPulled(added);

        // Ne rien ecrire quand la fusion n'apporte rien au distant : c'etait
        // l'ecriture la plus chere du systeme (une par chargement, par compte,
        // meme sans la moindre modification) pour un document strictement
        // identique a celui qu'on vient de lire.
        //
        // La comparaison porte sur l'etat FUSIONNE, jamais sur « rien n'a
        // change localement » : une modification faite hors ligne puis perdue
        // avec l'onglet n'a justement pas ete poussee, et c'est la fusion qui
        // la fait ressortir ici — la comparer au distant est ce qui garantit
        // qu'elle repart.
        if (!pending && fingerprint(merged) === fingerprint(remote)) {
          lastSyncedAt = Date.now();
          notify('synced');
          return;
        }
      }
      await push();
    } catch (error) {
      pending = true;
      notify(navigator.onLine === false ? 'offline' : 'error');
      report(error);
    }
  }

  // ------------------------------------------------------------ declencheurs

  function schedulePush(): void {
    if (pushTimer !== null) window.clearTimeout(pushTimer);
    pushTimer = window.setTimeout(() => {
      pushTimer = null;
      void push();
    }, PUSH_DEBOUNCE_MS);
  }

  /**
   * Renvoie une promesse pour que `signOut()` puisse l'attendre : sans ca, la
   * derniere modification partirait APRES la deconnexion, avec un jeton
   * revoque, et Firestore la refuserait.
   */
  function flush(): Promise<void> {
    if (pushTimer !== null) {
      window.clearTimeout(pushTimer);
      pushTimer = null;
      return push();
    }
    if (pending) return push();
    // Ni minuteur en attente ni modification en attente : mais une ecriture
    // declenchee juste avant peut deja etre EN COURS (pushNow() remet `pending`
    // a false des son entree, avant meme d'attendre le reseau). Attendre `queue`
    // couvre ce cas — elle se resout toujours, `pushNow()` n'y propage jamais
    // d'erreur — sans quoi signOut() pourrait se deconnecter avant que cette
    // ecriture n'aboutisse, exactement ce que cette fonction existe a eviter.
    return queue;
  }

  // Le differe ouvre une fenetre ou la modification est en local mais pas
  // encore partie. Sur telephone, le cas qui compte n'est pas la fermeture de
  // l'onglet mais le verrouillage de l'ecran ou le passage a une autre app :
  // c'est `visibilitychange` qui le voit, et lui seul est fiable sur iOS.
  //
  // Rien ne garantit que l'ecriture aboutisse si la page est tuee dans la
  // foulee — et c'est acceptable : `updatedAt` rend le systeme auto-reparateur.
  // Au prochain chargement, la seance locale est plus recente que sa copie
  // distante, la fusion la fait gagner, et elle repart aussitot.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void flush();
  });
  window.addEventListener('pagehide', () => void flush());
  window.addEventListener('online', () => {
    if (pending) void push();
  });

  // ------------------------------------------------------------ cycle de vie

  /**
   * Installe l'ecouteur d'authentification, une seule fois.
   *
   * `attach()` est appele de deux endroits — au demarrage si la personne etait
   * connectee, et a chaque clic sur « se connecter ». Sans cette memoisation,
   * une deconnexion suivie d'une reconnexion empilerait un second ecouteur, et
   * chaque connexion suivante declencherait autant de fusions concurrentes
   * qu'il y a eu de clics.
   */
  function attach(): Promise<void> {
    attached ??= install();
    return attached;
  }

  async function install(): Promise<void> {
    const sdk = await loadSdk();
    sdk.onUserChange((account) => {
      if (account === null) {
        uid = null;
        user = null;
        lastSyncedAt = null;
        rememberSignedIn(false);
        notify('off');
        return;
      }
      uid = account.uid;
      user = {
        name: account.displayName ?? account.email ?? '',
        email: account.email ?? '',
      };
      rememberSignedIn(true);
      void pullMergePush();
    });
  }

  // Reprise silencieuse au demarrage, UNIQUEMENT si la personne etait
  // connectee la derniere fois — sinon on ne telecharge pas le SDK du tout.
  if (wasSignedIn()) {
    void attach().catch(report);
  }

  return {
    status: () => status,
    user: () => user,
    lastSyncedAt: () => lastSyncedAt,

    async signIn(): Promise<void> {
      notify('signing-in');
      try {
        const sdk = await loadSdk();
        await attach();
        await sdk.signIn();
        // `onUserChange` prend le relais : c'est lui qui declenche la fusion.
      } catch (error) {
        notify('off');
        // Une popup fermee a la main n'est pas une panne : rien a signaler.
        if (!isUserCancellation(error)) throw error;
      }
    },

    async signOut(): Promise<void> {
      // Attendre ce qui est en attente AVANT de se deconnecter : la derniere
      // modification doit partir tant que le jeton est encore valide.
      await flush().catch(() => {});
      const sdk = await loadSdk();
      await sdk.signOut();
      // Rien n'est efface en local : les seances restent dans ce navigateur.
    },

    notifyLocalChange(): void {
      if (uid === null) return;
      pending = true;
      schedulePush();
    },

    flush,

    /**
     * Une fusion reportee parce qu'une seance tournait : c'est le moment de la
     * rejouer, le lecteur vient de liberer l'ecran.
     */
    resumeDeferred(): void {
      if (!deferredPull) return;
      deferredPull = false;
      void pullMergePush();
    },

    onChange(listener): () => void {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/** Trace en console, jamais vers l'utilisateur : le statut suffit a l'informer. */
function report(error: unknown): void {
  console.warn('[cirkali] synchronisation :', error);
}
