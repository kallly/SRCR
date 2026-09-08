// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import { t } from '../i18n';
import { isExercise } from '../core/plan';
import { decodeAiPlan } from '../core/ai-plan';
import { decodeSharedPlan, encodeSharedPlan } from '../core/share';
import type { SharedPlan } from '../core/share';
import type { SavedPlan } from '../core/types';
import type { Context } from './app';
import { byId, wireDialogClose } from './dom';
import { shareBase } from '../platform/native';

/** Nom du parametre d'URL portant une seance partagee. Court, pour un lien plus lisible. */
const SHARE_QUERY_PARAM = 's';

/**
 * Second parametre accepte a l'import : une seance en JSON lisible
 * (core/ai-plan.ts). C'est le filet du pilotage par une IA — le format
 * annonce reste `?s=`, mais un modele encode le base64 a la main et se
 * trompe. Ce parametre n'est JAMAIS produit par l'app, et jamais encode en
 * QR : sa verbosite est l'exact oppose de ce que cherche `?s=`.
 */
const AI_QUERY_PARAM = 'plan';

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
  return `${shareBase()}?${SHARE_QUERY_PARAM}=${encoded}`;
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
  /**
   * Ouvre le dialogue d'import sur une seance deja decodee. Utilise par
   * l'outil WebMCP (platform/webmcp.ts) : un agent decrit une seance, mais
   * rien ne s'ecrit sans que l'utilisateur ait choisi une destination.
   */
  proposeImport(shared: SharedPlan): void;
  /** Import depuis une URL complete (liens profonds de l'application native). */
  importFromUrl(rawUrl: string): boolean;
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
  const importAppendBtn = byId<HTMLButtonElement>('importAppend');
  const importReplaceBtn = byId<HTMLButtonElement>('importReplace');

  wireDialogClose(importDialog, byId('importClose'));
  byId('importCancel').addEventListener('click', () => importDialog.close());

  /**
   * Correspondance de nom, insensible a la casse et aux espaces de bord :
   * c'est ce qui fait apparaitre « Remplacer » plutot que d'accumuler trois
   * « Haut du corps » dans le selecteur. Une seance sans nom (`null`) ne
   * correspond jamais a rien — `plans.unnamed` est un libelle d'affichage,
   * pas une identite.
   */
  function findPlanByName(name: string): SavedPlan | undefined {
    const target = name.trim().toLowerCase();
    return ctx.state.plans.find((plan) => plan.name?.trim().toLowerCase() === target);
  }

  /**
   * Le dialogue d'import sert aussi de dialogue d'erreur : meme markup, meme
   * fermeture, aucun CSS de plus. Seules les destinations disparaissent.
   */
  function openImportError(): void {
    importSummary.textContent = t('share.importInvalid');
    importConfirmBtn.hidden = true;
    importAppendBtn.hidden = true;
    importReplaceBtn.hidden = true;
    // Contenu mis a jour meme si le dialogue est deja ouvert (WebMCP peut
    // rappeler cette fonction) ; seul le second showModal() est evite, il
    // leverait sur une <dialog> deja ouverte (meme garde que openShare()).
    if (!importDialog.open) importDialog.showModal();
  }

  function openImportDialog(shared: SharedPlan): void {
    const count = shared.items.filter(isExercise).length;
    importSummary.textContent = t('share.importSummary', {
      name: shared.name ?? t('plans.unnamed'),
      count,
    });

    importConfirmBtn.hidden = false;
    // `onclick =` plutot qu'addEventListener : la fonction peut etre rappelee
    // (WebMCP), et les handlers s'accumuleraient.
    importConfirmBtn.onclick = () => {
      ctx.importPlan(shared.name, shared.items, shared.config);
      importDialog.close();
    };
    importAppendBtn.onclick = () => {
      // Instantane avant ajout plutot qu'un `slice` de la fin a l'annulation :
      // ca reste juste meme si le deroule a bouge entre-temps, et ca vise la
      // seance par son id plutot que « celle qui est active maintenant ».
      const target = ctx.activePlan();
      const before = [...target.items];
      const preset = ctx.activePreset();
      // Ferme AVANT l'ajout : sur une seance CIRKALI, celui-ci ouvre aussitot
      // la question « en creer votre version ? », qui n'a pas a s'empiler
      // par-dessus ce dialogue.
      importDialog.close();
      ctx.appendToActive(shared.items);
      // Rien a annuler sur un modele : refuser la copie remet deja le modele
      // en etat, et l'accepter garde les lignes ajoutees dans la copie de la
      // personne. Meme raisonnement que la suppression d'une ligne
      // (ui/planner.ts).
      if (preset) return;
      ctx.toast.show(t('share.appended', { count }), t('toast.undo'), () => {
        const plan = ctx.getPlan(target.id);
        if (!plan) return;
        plan.items = before;
        ctx.save();
        ctx.renderAll();
      });
    };

    const target = shared.name ? findPlanByName(shared.name) : undefined;
    importReplaceBtn.hidden = target === undefined;
    // Quand le nom correspond a une seance existante, ce lien EST une
    // nouvelle version de cette seance (cas typique : une IA qui relit puis
    // renvoie « Haut du corps — 20 min » modifiee) — « Ajouter a la seance
    // active » n'a alors pas de sens a cote de « Remplacer », les deux
    // brouillant un choix qui n'en est en realite qu'un (remplacer, ou garder
    // les deux versions separement via « nouvelle seance »). Sans
    // correspondance de nom, l'ajout reste la seule facon de fusionner un
    // petit lot d'exercices partages dans la seance en cours.
    importAppendBtn.hidden = target !== undefined;
    if (!target) {
      importReplaceBtn.onclick = null;
      importReplaceBtn.textContent = '';
    } else {
      // Libelle parametre, donc rempli ici et non par
      // applyStaticTranslations() : meme statut que #importSummary.
      importReplaceBtn.textContent = t('share.importReplace', { name: target.name ?? '' });
      importReplaceBtn.onclick = () => {
        // Ecrasement irreversible sans ce filet. Un lien approximatif venu
        // d'une IA detruirait sinon une seance construite a la main.
        const before = { name: target.name, items: target.items, config: target.config };
        ctx.replacePlan(target.id, shared.name, shared.items, shared.config);
        ctx.toast.show(t('share.replaced'), t('toast.undo'), () => {
          ctx.replacePlan(target.id, before.name, before.items, before.config);
        });
        importDialog.close();
      };
    }

    // Contenu mis a jour meme si le dialogue est deja ouvert (WebMCP peut
    // rappeler proposeImport() avec une seance revisee) ; seul le second
    // showModal() est evite, il leverait sur une <dialog> deja ouverte —
    // meme garde que openShare(), qui l'a explicitement pour la meme raison.
    if (!importDialog.open) importDialog.showModal();
  }

  /**
   * Le coeur de l'import par lien, isole de l'endroit d'ou vient le lien.
   *
   * Deux appelants aujourd'hui : `checkIncomingShare()` au chargement de la
   * page (le cas du web), et le pont de liens profonds de l'application
   * native (`platform/deep-links.ts`), ou l'URL arrive par un evenement
   * systeme alors que la page, elle, n'a pas bouge.
   *
   * Retourne `true` des qu'un parametre de partage etait present, valide ou
   * non : c'est ce qui permet a l'appelant de savoir qu'il a affaire a un lien
   * de seance et pas a une adresse quelconque.
   */
  function importFromParams(params: URLSearchParams): boolean {
    const encoded = params.get(SHARE_QUERY_PARAM);
    const aiRaw = params.get(AI_QUERY_PARAM);
    if (encoded === null && aiRaw === null) return false;

    // `?s=` prioritaire : c'est le format que l'app produit elle-meme.
    const shared = encoded !== null ? decodeSharedPlan(encoded) : decodeAiPlan(aiRaw ?? '');
    if (!shared) {
      // Un lien casse echouait en silence. Acceptable tant qu'il venait d'un
      // tiers (messagerie qui tronque) et que l'utilisateur n'y pouvait rien ;
      // plus du tout depuis qu'il peut venir d'une IA a qui on peut demander
      // de recommencer — encore faut-il le savoir.
      openImportError();
      return true;
    }
    openImportDialog(shared);
    return true;
  }

  function checkIncomingShare(): void {
    const params = new URLSearchParams(location.search);
    if (params.get(SHARE_QUERY_PARAM) === null && params.get(AI_QUERY_PARAM) === null) return;

    // Nettoyage immediat, que le lien soit valide ou non : recharger ou
    // repartager cette URL ne doit pas reproposer le meme import a l'infini.
    // Fait AVANT l'import, sur une copie des parametres, pour que l'URL soit
    // deja propre si l'ouverture de la modale echouait.
    const kept = new URLSearchParams(location.search);
    kept.delete(SHARE_QUERY_PARAM);
    kept.delete(AI_QUERY_PARAM);
    const query = kept.toString();
    // location.hash preserve : un lien partage vers une ancre (#section-plan)
    // ne doit pas la perdre au nettoyage du parametre de partage.
    history.replaceState(
      null,
      '',
      location.pathname + (query ? `?${query}` : '') + location.hash,
    );

    importFromParams(params);
  }

  /**
   * Import depuis une URL complete, telle que la donne le systeme quand il
   * ouvre l'application sur un lien cirkali.fr. Rien n'est touche a l'URL
   * courante : dans l'application, la page ne navigue pas.
   */
  function importFromUrl(rawUrl: string): boolean {
    try {
      return importFromParams(new URL(rawUrl).searchParams);
    } catch {
      // Une URL illisible n'est pas une erreur d'import : c'est une adresse
      // qui ne nous concerne pas.
      return false;
    }
  }

  return {
    // Ouverture declenchee depuis un clic synchrone ; le chargement du
    // generateur QR est asynchrone, meme schema que ui/exercise-info.ts.
    openShareDialog: () => {
      void openShare().catch(() => {});
    },
    checkIncomingShare,
    importFromUrl,
    proposeImport: openImportDialog,
  };
}
