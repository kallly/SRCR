import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

/**
 * Configuration web du projet Firebase.
 *
 * Ce n'est PAS un secret, et il n'y a rien a mettre dans une variable
 * d'environnement : ces valeurs sont un identifiant de projet public, servi en
 * clair a tout navigateur qui charge la page — les cacher dans un `.env`
 * n'ajouterait qu'une etape de build. Ce qui protege reellement les donnees,
 * c'est le couple regles Firestore (`firestore.rules` : chacun ne lit et
 * n'ecrit que `users/{son propre uid}`) + liste des domaines autorises dans la
 * console Firebase.
 *
 * `measurementId` est volontairement omis : on ne charge pas Analytics. Ce
 * serait un chunk de plus, et surtout un traqueur qu'il faudrait declarer dans
 * les textes de confidentialite du site.
 */
const CONFIG = {
  apiKey: 'AIzaSyBoTZsGGwrU2ZRUr5cEHL-4MvDKLnjnbvY',
  authDomain: 'cirkali.firebaseapp.com',
  projectId: 'cirkali',
  storageBucket: 'cirkali.firebasestorage.app',
  messagingSenderId: '154209668174',
  appId: '1:154209668174:web:88b76d5884da70bcfbc71f',
} as const;

export interface Sdk {
  auth: Auth;
  db: Firestore;
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  onUserChange(listener: (user: User | null) => void): () => void;
}

let sdk: Promise<Sdk> | null = null;

/**
 * Charge le SDK Firebase, une seule fois.
 *
 * Motif de memoisation identique a `loadDetails()` (ui/exercise-info.ts) et
 * `loadQrFactory()` (ui/share.ts). Ce qui compte ici : `firebase/auth` et
 * `firebase/firestore` pesent a eux deux bien plus que tout le reste de l'app.
 * L'appelant (cloud/sync.ts) ne doit donc invoquer cette fonction QUE sur un
 * clic de connexion ou quand `session-hint` dit que la personne etait deja
 * connectee — un visiteur anonyme, un robot d'indexation ou une mesure
 * Lighthouse ne telechargent alors pas un octet de Firebase. Meme logique que
 * le test `'modelContext' in navigator` fait AVANT `import('./webmcp')` dans
 * ui/app.ts.
 */
export function loadSdk(): Promise<Sdk> {
  sdk ??= initialise();
  return sdk;
}

async function initialise(): Promise<Sdk> {
  const [appMod, authMod, dbMod] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
    import('firebase/firestore'),
  ]);

  const app = appMod.initializeApp(CONFIG);
  const auth = authMod.getAuth(app);
  const db = dbMod.getFirestore(app);

  await auth.setPersistence(authMod.browserLocalPersistence);

  // Retour d'un signInWithRedirect (voir signIn ci-dessous). A appeler avant
  // d'installer l'ecouteur, sinon la connexion qui vient d'aboutir arrive
  // avant que quiconque l'ecoute.
  await authMod.getRedirectResult(auth).catch(() => null);

  function provider(): InstanceType<typeof authMod.GoogleAuthProvider> {
    const google = new authMod.GoogleAuthProvider();
    // Toujours proposer le choix du compte : sur un ordinateur partage, une
    // reconnexion silencieuse sur le compte du voisin serait pire que le clic
    // en trop.
    google.setCustomParameters({ prompt: 'select_account' });
    return google;
  }

  return {
    auth,
    db,

    async signIn(): Promise<void> {
      try {
        await authMod.signInWithPopup(auth, provider());
      } catch (error) {
        // La popup n'est pas disponible partout : navigateurs in-app
        // (Instagram, Gmail...), iOS en mode autonome, bloqueurs. La redirection
        // marche dans ces cas la — au prix d'un rechargement de page, d'ou le
        // fait qu'elle ne soit qu'un repli.
        if (!isPopupUnavailable(error)) throw error;
        await authMod.signInWithRedirect(auth, provider());
      }
    },

    async signOut(): Promise<void> {
      await authMod.signOut(auth);
    },

    onUserChange(listener): () => void {
      return authMod.onAuthStateChanged(auth, listener);
    },
  };
}

/**
 * Uniquement les codes qui disent « ce navigateur ne SAIT pas ouvrir de
 * popup ». Surtout pas `auth/popup-closed-by-user` ni
 * `auth/cancelled-popup-request` : la personne vient d'annuler
 * volontairement, et basculer alors en redirection lui imposerait la
 * navigation qu'elle vient precisement de refuser.
 */
const POPUP_UNAVAILABLE = new Set([
  'auth/popup-blocked',
  'auth/operation-not-supported-in-environment',
]);

function isPopupUnavailable(error: unknown): boolean {
  const code = (error as { code?: unknown } | null)?.code;
  return typeof code === 'string' && POPUP_UNAVAILABLE.has(code);
}

/** Vrai quand la personne a ferme la popup elle-meme : a taire, pas a signaler comme une panne. */
export function isUserCancellation(error: unknown): boolean {
  const code = (error as { code?: unknown } | null)?.code;
  return (
    code === 'auth/popup-closed-by-user' ||
    code === 'auth/cancelled-popup-request' ||
    code === 'auth/user-cancelled'
  );
}
