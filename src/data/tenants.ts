// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

import type { CategoryId, EffortMode, GroupId } from '../core/types';
import type { TenantPreset } from './presets';

/**
 * Variantes du site par sous-domaine — une salle de sport par hote, servie par
 * le meme deploiement que cirkali.fr.
 *
 * Rien n'est fork, rien n'est reconstruit : c'est le MEME `index.html`, le meme
 * bundle et les memes 310 fiches qui repondent sur `<salle>.cirkali.fr`. Seules
 * changent des DONNEES, resolues au demarrage depuis l'hote (`main.ts`) :
 * quelques exercices en plus dans la bibliotheque, et eventuellement d'autres
 * seances toutes faites.
 *
 * Ce qui NE peut pas se faire ainsi, et demandera le jour venu une page generee
 * au build par salle : un theme et des textes propres (ils doivent etre dans
 * les octets servis, sinon le theme clignote et un robot lit le texte
 * generique), le retrait des encarts publicitaires, et la reservation de
 * hauteur de la bibliotheque — `--lib-rows`, injectee au build depuis
 * `LIBRARY.length` (vite.config.ts), ne compte pas les exercices d'une salle.
 * Une poignee de machines en plus decale donc la page de quelques dizaines de
 * pixels au premier rendu ; une vingtaine, c'est le signal qu'il faut passer a
 * la variante generee.
 *
 * `TENANTS` est vide aujourd'hui : aucune salle n'existe, donc `activeTenant()`
 * renvoie toujours `null` et l'app se comporte exactement comme avant.
 *
 * Trois choses valent d'etre sues avant d'ajouter une salle :
 *
 * 1. **La sauvegarde en ligne est commune.** Un compte Google porte UN document
 *    Firestore, quel que soit le sous-domaine ou l'on s'est connecte : les
 *    seances faites a la salle et celles faites chez soi arrivent dans la meme
 *    liste. C'est voulu — elles suivent la personne, pas le lieu.
 * 2. **Un exercice de salle est une ligne PERSO** (`key: 'custom'` + son nom),
 *    pas une nouvelle cle de bibliotheque. Consequence directe : il traverse
 *    sans dommage le stockage, les liens de partage et le nuage, et s'affiche
 *    correctement sur cirkali.fr — le nom voyage avec la ligne. Aucun schema a
 *    migrer, aucun format a etendre, et la contrepartie est mince : pas de
 *    fiche detaillee (il n'y a pas de contenu long a montrer) et la figure
 *    generique.
 * 3. **Promouvoir un exercice de salle vers CIRKALI** se fait en deplacant son
 *    entree d'ici vers `LIBRARY`, puis en lui donnant ce que le catalogue
 *    public exige : une cle dans `ExerciseKey`, un nom et un conseil dans les 5
 *    langues, une figure, et du contenu long (skill `add-exercise`). C'est a ce
 *    moment-la qu'il gagne sa fiche et ses pages generees, pas avant.
 */
export interface TenantExercise {
  /**
   * Identifiant local, utilise seulement pour retrouver l'entree au clic
   * (`data-add`). Jamais persiste, jamais dans un lien de partage : ce qui est
   * enregistre, c'est une ligne perso portant `name`.
   */
  key: string;
  /**
   * Nom affiche, tel quel. Ce n'est PAS une cle de traduction : le nom d'une
   * machine est un nom propre local, il a le meme statut que le `customName`
   * saisi par un utilisateur (regle n°2 de CLAUDE.md). Une salle qui voudrait
   * son catalogue en cinq langues releverait de `LIBRARY`, pas d'ici.
   */
  name: string;
  group: GroupId;
  /** Filtre par materiel de la bibliotheque : le plus souvent `machine`. */
  category: CategoryId;
  mode: EffortMode;
  sets: number;
  reps: number;
  seconds: number;
  rest: number;
}

export interface Tenant {
  /** Premier libelle de l'hote : `basicfit.cirkali.fr` -> `basicfit`. */
  slug: string;
  /** Ajoutes a la bibliotheque CIRKALI, jamais a sa place. */
  exercises?: readonly TenantExercise[];
  /**
   * Remplace les seances CIRKALI proposees dans le selecteur. Chacune porte son
   * nom en clair (`TenantPreset`), jamais une cle de traduction.
   *
   * Leurs lignes ne peuvent citer que des exercices de `LIBRARY` : `PresetLine`
   * est typee sur les cles publiques, volontairement, pour qu'une faute de
   * frappe dans nos propres modeles reste une erreur de compilation. Le jour ou
   * une salle voudra ses machines dans ses seances, c'est ce type-la qu'il
   * faudra elargir — pas contourner.
   */
  presets?: readonly TenantPreset[];
}

/** Aucune salle pour l'instant : le site se comporte comme s'il n'y avait pas de mecanisme. */
export const TENANTS: readonly Tenant[] = [];

let active: Tenant | null = null;

/**
 * Le slug porte par l'hote, s'il y en a un : `basicfit.cirkali.fr` ->
 * `basicfit`, `cirkali.fr` -> aucun.
 *
 * Aucune precaution n'est prise contre un premier libelle absurde (une IP
 * locale en developpement donne "192") : c'est la recherche dans `TENANTS` qui
 * fait foi, et elle ne peut rien activer qui n'ait ete declare ici.
 */
export function tenantSlugFromHost(hostname: string): string | undefined {
  const labels = hostname.split('.');
  return labels.length > 2 ? labels[0] : undefined;
}

/**
 * Fixe la salle active, une fois au demarrage. Meme motif que `setLocale()` :
 * un etat de module, pose tot, lu partout ensuite — plutot que de faire passer
 * la salle de main en main dans chaque signature.
 */
export function setActiveTenant(slug: string | undefined): void {
  active = TENANTS.find((tenant) => tenant.slug === slug) ?? null;
}

/** `null` sur cirkali.fr et partout ailleurs qu'une salle declaree. */
export function activeTenant(): Tenant | null {
  return active;
}
