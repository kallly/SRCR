import { createDefaultPlan, isPristineDefaultPlan } from '../core/storage';
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

  // 4. Invariant tenu partout dans l'app (`ctx.activePlan()`, `plans[0] as
  //    SavedPlan`) : il y a toujours au moins une seance. Une fusion qui rend
  //    la liste vide — tout supprime des deux cotes — ne doit pas etre ce qui
  //    le casse.
  if (plans.length === 0) plans.push(createDefaultPlan());

  // 5. Chaque appareil se cree sa propre seance type au tout premier
  //    lancement, avant meme d'avoir vu le compte. Sans ce filtre, se
  //    connecter depuis un deuxieme puis un troisieme appareil empilerait
  //    autant de copies de cette meme seance. Une seance type INTACTE ne porte
  //    aucun travail : la jeter ne perd rien, et des que la personne y touche
  //    elle cesse d'etre reconnue ici et redevient une seance comme une autre.
  const kept = dropPristineDefaults(plans, remote);

  const first = kept[0] as SavedPlan;
  const activePlanId = [local.activePlanId, remote.activePlanId].find((id) =>
    kept.some((plan) => plan.id === id),
  );

  return {
    plans: kept,
    activePlanId: activePlanId ?? first.id,
    // 6. L'historique n'est qu'une liste d'horodatages de seances terminees :
    //    aucun conflit possible, l'union dedoublonnee est la bonne reponse.
    history: mergeHistory(local.history, remote.history),
    deleted,
  };
}

/**
 * Retire les seances restees a l'etat de seance type, sauf s'il n'y a QUE ca.
 *
 * Quand tout est encore a l'etat de seance type, on en garde une seule, et de
 * preference celle qui vient deja du nuage : sinon chaque appareil imposerait
 * la sienne a tour de role, et l'id changerait a chaque connexion sans que
 * rien de visible ne bouge.
 */
function dropPristineDefaults(plans: SavedPlan[], remote: State): SavedPlan[] {
  const meaningful = plans.filter((plan) => !isPristineDefaultPlan(plan));
  if (meaningful.length > 0) return meaningful;

  const fromRemote = new Set(remote.plans.map((plan) => plan.id));
  return [plans.find((plan) => fromRemote.has(plan.id)) ?? (plans[0] as SavedPlan)];
}

/** Plafond repris de core/storage.ts (MAX_HISTORY), volontairement identique. */
const MAX_HISTORY = 200;

function mergeHistory(local: number[], remote: number[]): number[] {
  return [...new Set([...local, ...remote])].sort((a, b) => a - b).slice(-MAX_HISTORY);
}
