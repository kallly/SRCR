import { formatTime, t } from '../i18n';
import { evictsIdleStorage } from '../platform/storage';
import type { Context } from './app';
import { byId, el, wireDialogClose } from './dom';

/**
 * Compte Google et sauvegarde en ligne : le bouton d'en-tete et sa modal.
 *
 * Le module ne fait que rendre l'etat de `ctx.cloud` et lui transmettre deux
 * intentions (se connecter, se deconnecter). Toute la logique de
 * synchronisation vit dans src/cloud/ — y compris la sauvegarde automatique,
 * qui ne passe pas par ici du tout : elle est branchee dans `save()`
 * (ui/app.ts), donc elle a lieu que cette modal soit ouverte ou non.
 */
export function createAccount(ctx: Context): { render: () => void } {
  const trigger = byId<HTMLButtonElement>('accountBtn');
  const dialog = byId<HTMLDialogElement>('account');
  const signedOut = byId('accountSignedOut');
  const signedIn = byId('accountSignedIn');
  const identity = byId('accountIdentity');
  const statusNote = byId('accountStatus');
  const signInBtn = byId<HTMLButtonElement>('accountSignIn');
  const signOutBtn = byId<HTMLButtonElement>('accountSignOut');
  const errorNote = byId('accountError');
  const storageNotice = byId('storageNotice');

  // Evalue une fois : le navigateur ne change pas en cours de route, et ce
  // test lit l'UA — inutile de le refaire a chaque rendu.
  const fragileStorage = evictsIdleStorage();

  wireDialogClose(dialog, byId('accountClose'));

  trigger.addEventListener('click', () => {
    render();
    dialog.showModal();
  });

  signInBtn.addEventListener('click', () => {
    errorNote.hidden = true;
    signInBtn.disabled = true;
    void ctx.cloud
      .signIn()
      .catch(() => {
        // Une annulation volontaire est deja avalee par cloud/sync.ts : ce qui
        // arrive ici est une vraie panne, et merite d'etre dit.
        errorNote.textContent = t('account.signInError');
        errorNote.hidden = false;
      })
      .finally(() => {
        signInBtn.disabled = false;
        render();
      });
  });

  signOutBtn.addEventListener('click', () => {
    void ctx.cloud.signOut().finally(() => {
      render();
      dialog.close();
    });
  });

  function render(): void {
    const user = ctx.cloud.user();

    // WebKit efface le stockage d'un site non visite depuis sept jours, et
    // aucune API ne permet de s'y soustraire (voir platform/storage.ts) : la
    // seule chose a faire est de le dire, la ou c'est vrai et tant qu'aucun
    // compte ne met les seances a l'abri. Texte pose ici et non dans
    // index.html : il est conditionnel, donc transitoire par nature.
    const warn = user === null && fragileStorage;
    storageNotice.textContent = warn ? t('account.storageNotice') : '';
    storageNotice.hidden = !warn;

    // Le contenu du bouton d'en-tete est du texte transitoire, jamais du
    // markup statique : l'initiale depend du compte connecte. Sa TAILLE, elle,
    // est fixe en CSS — c'est ce qui fait qu'il ne decale rien en passant de
    // « deconnecte » a « connecte ».
    trigger.replaceChildren(
      user
        ? el('span', { className: 'account-initial', text: initial(user.name || user.email) })
        : el('span', { className: 'account-icon', attrs: { 'aria-hidden': 'true' } }),
    );
    trigger.classList.toggle('on', user !== null);

    signedOut.hidden = user !== null;
    signedIn.hidden = user === null;
    if (!user) return;

    // `el({ text })` donc textContent : un nom Google est du texte tiers, il ne
    // passe jamais par innerHTML (regle heritee du bug d'echappement du
    // monolithe).
    // Le nom seul quand Google ne donne que l'e-mail (il est alors deja
    // affiche en gras) : pas de ligne repetee a l'identique.
    const secondary = user.name && user.email ? el('span', { text: user.email }) : null;
    identity.replaceChildren(
      el('b', { text: user.name || user.email }),
      ...(secondary ? [secondary] : []),
    );

    const syncedAt = ctx.cloud.lastSyncedAt();
    const status = ctx.cloud.status();
    // `error`/`offline` d'abord : sinon une ecriture bloquee se lisait comme
    // « Derniere synchronisation : 14:32 », une date anodine qui masquait le
    // fait que la modification la plus recente n'est PAS partie. C'est
    // precisement ce que cette modal doit dire a qui l'ouvre pour comprendre
    // ce qui cloche.
    statusNote.textContent =
      status === 'syncing'
        ? t('account.statusSyncing')
        : status === 'offline'
          ? t('account.statusOffline')
          : status === 'error'
            ? t('account.statusError')
            : status === 'too-large'
              ? t('account.statusTooLarge')
              : syncedAt === null
                ? t('account.neverSynced')
                : t('account.lastSync', { time: formatTime(syncedAt) });
  }

  return { render };
}

/**
 * Premiere lettre du nom, en majuscule. `Array.from` et non `[0]` : un prenom
 * peut commencer par un caractere hors du plan de base (emoji, ideogramme),
 * qu'un index brut couperait en deux moities invalides.
 */
function initial(name: string): string {
  return (Array.from(name.trim())[0] ?? '?').toLocaleUpperCase();
}
