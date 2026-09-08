import type { State } from '../core/storage';
import type { SavedPlan } from '../core/types';

/**
 * Fusion de l'etat local et de l'etat distant, seance par seance.
 *
 * Pourquoi pas un simple « le plus recent des deux etats gagne » : deux
 * appareils qui travaillent chacun de leur cote hors ligne produisent chacun un
 * etat plus recent que l'autre sur des seances DIFFERENTES. Comparer les etats
 * en bloc ferait alors disparaitre le travail d'un des deux appareils d'un
 * coup. La comparaison se fait donc par `SavedPlan.id`, jamais par nom (deux
 * seances peuvent porter le meme nom, et un renommage ne doit pas casser le
 * lien).
 *
 * Fonction pure, sans import Firebase : c'est la seule partie de src/cloud/ qui
 * merite d'etre verifiee cas par cas, et elle doit pouvoir l'etre sans reseau.
 */
export function mergeStates(local: State, remote: State): State {
  // 1. Pierres tombales : union, en gardant la suppression la plus tardive.
  const deleted: Record<string, number> = { ...local.deleted };
  for (const [id, at] of Object.entries(remote.deleted)) {
    const known = deleted[id];
    if (known === undefined || at > known) deleted[id] = at;
  }

  // 2. Seances : indexees par id, la plus recemment modifiee gagne.
  const byId = new Map<string, SavedPlan>();
  for (const plan of local.plans) byId.set(plan.id, plan);
  for (const plan of remote.plans) {
    const mine = byId.get(plan.id);
    // A egalite parfaite d'horodatage on garde le local : c'est celui qui est
    // deja a l'ecran, et le remplacer ne changerait rien de visible tout en
    // risquant de faire clignoter l'interface.
    if (mine === undefined || plan.updatedAt > mine.updatedAt) byId.set(plan.id, plan);
  }

  // 3. On ecarte ce qui a ete supprime — sauf si la seance a ete modifiee
  //    APRES la suppression sur un autre appareil : dans ce cas la personne a
  //    manifestement voulu la garder, et l'edition la plus recente l'emporte
  //    sur la suppression la plus ancienne.
  const plans: SavedPlan[] = [];
  for (const plan of byId.values()) {
    const removedAt = deleted[plan.id];
    if (removedAt !== undefined && removedAt >= plan.updatedAt) continue;
    plans.push(plan);
  }

  // 4. Une liste vide est une reponse valide : tout supprime des deux cotes
  //    veut dire qu'il ne reste rien, et l'app s'ouvre alors sur un modele
  //    CIRKALI (voir data/presets.ts). C'est ce qui a permis de retirer d'ici
  //    la fabrication d'une seance type et la reconnaissance de ses copies :
  //    plus aucun appareil n'en cree, donc il n'y en a plus a dedupliquer.
  const activePlanId = [local.activePlanId, remote.activePlanId].find((id) =>
    plans.some((plan) => plan.id === id),
  );

  return {
    plans,
    activePlanId: activePlanId ?? plans[0]?.id ?? '',
    // 5. L'historique n'est qu'une liste d'horodatages de seances terminees :
    //    aucun conflit possible, l'union dedoublonnee est la bonne reponse.
    history: mergeHistory(local.history, remote.history),
    deleted,
  };
}

/** Plafond repris de core/storage.ts (MAX_HISTORY), volontairement identique. */
const MAX_HISTORY = 200;

function mergeHistory(local: number[], remote: number[]): number[] {
  return [...new Set([...local, ...remote])].sort((a, b) => a - b).slice(-MAX_HISTORY);
}
