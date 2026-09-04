import { t } from '../i18n';
import { isExercise } from '../core/plan';
import { decodeSharedPlan, encodeSharedPlan } from '../core/share';
import type { Context } from './app';
import { byId, wireDialogClose } from './dom';

/** Nom du parametre d'URL portant une seance partagee. Court, pour un lien plus lisible. */
const SHARE_QUERY_PARAM = 's';

/**
 * Le generateur de QR n'est utile qu'a la minorite de visiteurs qui cliquent
 * "Partager" — jamais a l'import (`decodeSharedPlan` ne s'en sert pas).
 * `import()` dynamique, meme raisonnement que le contenu long des exercices
 * (`ui/exercise-info.ts`) meme si le poids en jeu est bien moindre ici : pas
 * de raison de le faire payer a tout le monde au chargement.
 */
async function importQrFactory() {
  const mod = await import('qrcode-generator');
  return mod.default;
}

let qrFactory: ReturnType<typeof importQrFactory> | null = null;

function loadQrFactory(): ReturnType<typeof importQrFactory> {
  qrFactory ??= importQrFactory();
  return qrFactory;
}

function buildShareUrl(encoded: string): string {
  return `${location.origin}${location.pathname}?${SHARE_QUERY_PARAM}=${encoded}`;
}

/**
 * QR en SVG construit a la main (pas `qr.createSvgTag()`, qui fige des
 * dimensions en pixels) : meme convention que les figures d'exercice
 * (`data/figures.ts`), un viewBox mis a l'echelle par la CSS plutot que des
 * pixels fixes. Toujours noir sur blanc, quel que soit le theme de l'app —
 * c'est la seule combinaison fiable pour un lecteur de code-barres/QR.
 *
 * `null` si le chunk QR n'a pas pu etre charge (reseau) ou si la seance est
 * trop grande pour tenir dans un QR (au-dela de la version 40 du standard) :
 * le lien reste utilisable, seul le code est absent.
 */
async function qrSvg(text: string): Promise<string | null> {
  try {
    // L'import dynamique fait partie du try : un chunk qui echoue a charger
    // (reseau, hash de deploiement perime) doit degrader comme un QR trop
    // grand, pas planter en dehors de tout gestionnaire.
    const qrcode = await loadQrFactory();
    // Niveau de correction le plus bas ('L') : le code est affiche puis
    // scanne immediatement a l'ecran, jamais imprime/abime, et la seance
    // encodee peut etre longue — moins de redondance donne un QR moins
    // dense, donc plus facile a scanner depuis un ecran de telephone.
    const qr = qrcode(0, 'L');
    qr.addData(text);
    qr.make();
    const count = qr.getModuleCount();
    let cells = '';
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (qr.isDark(row, col)) cells += `<rect x="${col}" y="${row}" width="1" height="1"/>`;
      }
    }
    return `<svg viewBox="0 0 ${count} ${count}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><g fill="#111">${cells}</g></svg>`;
  } catch {
    // La bibliotheque leve une chaine brute (pas une Error) au depassement
    // de capacite — une tres grosse seance (30+ lignes) peut y arriver.
    // Ne jamais garder en cache un chargement rate : `??=` traiterait une
    // promesse rejetee comme deja resolue et casserait le partage pour le
    // reste de la session.
    qrFactory = null;
    return null;
  }
}

export interface Share {
  /** Ouvre la modal de partage (lien + QR) pour la seance active. */
  openShareDialog(): void;
  /** A appeler une fois au demarrage : propose l'import si l'URL en porte un. */
  checkIncomingShare(): void;
}

/**
 * Partage d'une seance sans backend : le lien porte la seance elle-meme
 * (voir core/share.ts). Fonctionnalite secondaire — pas de nouvel ecran, deux
 * <dialog> statiques comme la modal d'info exercice (ui/exercise-info.ts).
 */
export function createShare(ctx: Context): Share {
  const shareDialog = byId<HTMLDialogElement>('sharePlan');
  const shareQr = byId('shareQr');
  const shareLink = byId<HTMLInputElement>('shareLink');
  const shareCopyBtn = byId<HTMLButtonElement>('shareCopy');
  const shareCopied = byId('shareCopied');
  const shareQrError = byId('shareQrError');

  wireDialogClose(shareDialog, byId('shareClose'));

  function showCopied(): void {
    shareCopied.hidden = false;
    shareCopied.textContent = t('share.copied');
  }

  /**
   * Repli historique via `execCommand('copy')` : `navigator.clipboard`
   * exige un contexte securise (https, ou localhost) — absent par exemple
   * en testant l'app depuis un telephone via l'IP locale du serveur de dev
   * (`npm run dev`, en http). `execCommand` fonctionne encore dans ce cas
   * sur un champ selectionne, malgre son statut deprecie.
   */
  function copyWithExecCommand(): void {
    shareLink.select();
    if (document.execCommand('copy')) showCopied();
  }

  shareCopyBtn.addEventListener('click', () => {
    if (!navigator.clipboard) {
      copyWithExecCommand();
      return;
    }
    void navigator.clipboard.writeText(shareLink.value).then(showCopied, copyWithExecCommand);
  });

  async function openShare(): Promise<void> {
    // Un double clic/double tap avant la fin du premier appel tenterait un
    // second showModal() sur une <dialog> deja ouverte, qui leve — voir
    // CLAUDE.md.
    if (shareDialog.open) return;
    const url = buildShareUrl(encodeSharedPlan(ctx.activePlan()));
    shareLink.value = url;
    shareQr.innerHTML = '';
    shareQr.hidden = false;
    shareQrError.hidden = true;
    shareCopied.hidden = true;
    shareDialog.showModal();
    // Le lien est deja utilisable (copiable) pendant que le chunk QR charge.
    const svg = await qrSvg(url);
    if (svg) {
      shareQr.innerHTML = svg;
    } else {
      shareQr.hidden = true;
      shareQrError.hidden = false;
    }
  }

  const importDialog = byId<HTMLDialogElement>('importPlan');
  const importSummary = byId('importSummary');
  const importConfirmBtn = byId<HTMLButtonElement>('importConfirm');

  wireDialogClose(importDialog, byId('importClose'));
  byId('importCancel').addEventListener('click', () => importDialog.close());

  function checkIncomingShare(): void {
    const params = new URLSearchParams(location.search);
    const encoded = params.get(SHARE_QUERY_PARAM);
    if (!encoded) return;

    // Nettoyage immediat, que le lien soit valide ou non : recharger ou
    // repartager cette URL ne doit pas reproposer le meme import a l'infini.
    params.delete(SHARE_QUERY_PARAM);
    const query = params.toString();
    // location.hash preserve : un lien partage vers une ancre (#section-plan)
    // ne doit pas la perdre au nettoyage du parametre de partage.
    history.replaceState(
      null,
      '',
      location.pathname + (query ? `?${query}` : '') + location.hash,
    );

    const shared = decodeSharedPlan(encoded);
    if (!shared) return;

    const count = shared.items.filter(isExercise).length;
    importSummary.textContent = t('share.importSummary', {
      name: shared.name ?? t('plans.unnamed'),
      count,
    });

    importConfirmBtn.onclick = () => {
      ctx.importPlan(shared.name, shared.items, shared.config);
      importDialog.close();
    };

    importDialog.showModal();
  }

  return {
    // Ouverture declenchee depuis un clic synchrone ; le chargement du
    // generateur QR est asynchrone, meme schema que ui/exercise-info.ts.
    openShareDialog: () => {
      void openShare().catch(() => {});
    },
    checkIncomingShare,
  };
}
