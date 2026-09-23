// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import type { ExerciseKey } from '../../core/types';

/**
 * Un guide editorial : une page qui repond a UNE question, ecrite a la main.
 *
 * Pourquoi ils existent. Tout le reste du contenu du site sort d'un gabarit —
 * 330 fiches, les memes onze sections, generees depuis `exercise-details/`.
 * C'est exactement ce qu'un examinateur AdSense lit comme « contenu
 * programmatique », et c'est le motif du refus recu. Un guide n'est pas
 * generable : il repond a une question qu'on tape dans un moteur, et son plan
 * lui appartient.
 *
 * Meme regle de redaction que le contenu long des fiches (skill
 * `seance-fiches-generees`) : uniquement du verifiable et du stable —
 * anatomie, biomecanique, principes d'entrainement etablis. JAMAIS d'etude
 * citee, de pourcentage d'activation EMG ni de chiffre a fausse precision.
 * Une fourchette de repetitions est un usage documente, pas une loi : elle
 * s'ecrit comme telle.
 *
 * Contrat STRICT, contrairement a `ExerciseDetail` qui est `Partial`. Ce
 * dernier l'est parce que la traduction des fiches a ete phasee dans le temps
 * ; les guides partent a cinq langues d'un coup, donc le typecheck doit
 * mordre si l'une manque. Le repli silencieux sur le francais n'aurait ici
 * aucune justification.
 */
export interface Guide {
  /** Slug de l'URL, TRADUIT par langue : la page vit a `guides/<locale>/<slug>`. */
  slug: string;
  title: string;
  /** Une phrase : chapeau de la page, et `<meta name="description">`. */
  lead: string;
  sections: { heading: string; paragraphs: string[] }[];
  /**
   * Fiches citees par le guide. Rendues en liens sous le texte : c'est le
   * maillage interne qui manquait, les fiches ne se pointant jusqu'ici que
   * par le carrousel « exercices similaires », toujours du meme groupe.
   */
  related: Exclude<ExerciseKey, 'custom'>[];
}

/** Les quatre guides. Ajouter une cle ici oblige les cinq langues a suivre. */
export type GuideKey =
  | 'setsAndReps'
  | 'fullBodyNoEquipment'
  | 'bandsVsDumbbells'
  | 'classicVsCircuit';

export type GuideSet = Record<GuideKey, Guide>;
