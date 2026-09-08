// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

/**
 * Remonte les exercices que les gens creent a la main, pour savoir ce qui
 * manque a `LIBRARY`.
 *
 * Quand quelqu'un ne trouve pas son exercice, il tape un nom. C'est le
 * meilleur signal disponible sur ce qu'il faudrait ajouter au catalogue, et il
 * etait entierement perdu : il restait dans le `localStorage` de la personne,
 * ou enfoui dans son document Firestore si elle avait un compte, sans qu'aucune
 * liste ne soit consultable.
 *
 * --- Pourquoi ce module n'importe RIEN de `firebase/*` ---
 *
 * La collecte vise tous les visiteurs, comptes ou non. Passer par le SDK
 * imposerait de le telecharger — ~200 Ko — a des gens qui ne se connecteront
 * jamais, ce que tout le reste de `src/cloud/` s'emploie a eviter (voir
 * `session-hint.ts`). L'API REST de Firestore fait le meme travail avec un
 * `fetch`, donc a cout nul pour qui ne cree aucun exercice.
 *
 * --- Ce qui part, et ce qui ne part pas ---
 *
 * Le nom saisi et le groupe musculaire. Rien d'autre : aucun identifiant de
 * personne, aucune seance, aucune empreinte d'appareil. Le nom reste du texte
 * libre ecrit par un humain, donc potentiellement personnel — c'est pour ca
 * qu'il est declare dans la page de confidentialite (bloc `privacy` des
 * dictionnaires) et que rien d'autre ne l'accompagne.
 *
 * --- Le point d'accroche est unique, et c'est deliberé ---
 *
 * Seul le formulaire « Exercice perso » (`ui/app.ts`) appelle cette fonction.
 * Ni `createFromTenant()` — le catalogue d'une salle, deja connu — ni les
 * lignes perso arrivant par un lien `?s=`/`?plan=`, souvent inventees par une
 * IA plutot que demandees par quelqu'un. Ajouter un second appelant, c'est
 * accepter de polluer la liste.
 */
import type { GroupId } from '../core/types';

/** Projet Firestore. Meme valeurs publiques que `cloud/firebase.ts`. */
const PROJECT_ID = 'cirkali';
const API_KEY = 'AIzaSyBoTZsGGwrU2ZRUr5cEHL-4MvDKLnjnbvY';
const COLLECTION = 'customExercises';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/**
 * Slugs deja envoyes depuis CE navigateur.
 *
 * C'est ce qui fait que `count` compte des appareils distincts et non des
 * clics : sans lui, quelqu'un qui recree dix fois le meme exercice pese dix
 * fois plus qu'une demande reelle. Accessoirement, ca borne le nombre
 * d'ecritures, ressource partagee avec la sauvegarde en ligne.
 */
const SENT_KEY = 'seance.customSent.v1';

/** Meme plafond que `MAX_NAME` (`core/plan.ts`). */
const MAX_NAME = 60;

/**
 * Nom saisi -> identifiant du document.
 *
 * C'est cette normalisation qui regroupe « Rameur », « rameur » et
 * « RAMEUR  » en une seule entree : sans elle la liste serait un tas de
 * variantes de casse impossible a exploiter. Les accents sont deplies plutot
 * que supprimes, pour que « développé » et « developpe » se rejoignent.
 *
 * Un identifiant Firestore ne peut contenir ni `/`, ni valoir `.` ou `..` :
 * ne garder que `[a-z0-9-]` regle les trois cas d'un coup.
 */
export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_NAME);
}

function alreadySent(slug: string): boolean {
  try {
    const raw = localStorage.getItem(SENT_KEY);
    return raw !== null && (JSON.parse(raw) as unknown[]).includes(slug);
  } catch {
    // Stockage illisible ou refuse : on considere que rien n'a ete envoye.
    // Au pire on reenvoie, ce qui gonfle un compteur — jamais bloquant.
    return false;
  }
}

function remember(slug: string): void {
  try {
    const raw = localStorage.getItem(SENT_KEY);
    const list = raw === null ? [] : (JSON.parse(raw) as string[]);
    if (!list.includes(slug)) list.push(slug);
    localStorage.setItem(SENT_KEY, JSON.stringify(list));
  } catch {
    // Le stockage peut etre plein ou refuse (navigation privee) : la collecte
    // n'a pas a en souffrir, elle est accessoire par nature.
  }
}

/**
 * Signale un exercice cree a la main. Ne rejette jamais, ne bloque jamais.
 *
 * Deux appels au pire, un seul dans le cas courant : on tente d'abord la
 * creation du document a l'identifiant du slug ; si Firestore repond 409, le
 * nom a deja ete demande par quelqu'un d'autre et on incremente son compteur.
 */
export async function reportCustomExercise(name: string, group: GroupId): Promise<void> {
  try {
    // Minuscules : la liste se lit d'un coup d'oeil dans la console, sans que
    // « Rameur », « rameur » et « RAMEUR » y paraissent trois entrees
    // differentes. Le slug les regroupait deja en un seul document, mais le
    // champ `name` gardait la casse du PREMIER a l'avoir ecrit, ce qui donnait
    // parfois un « RAMEUR » criard pour tous les suivants. Sans effet sur ce
    // que la personne voit : sa ligne garde le nom qu'elle a tape.
    const clean = name.trim().slice(0, MAX_NAME).toLowerCase();
    const slug = slugify(clean);
    // Un nom fait uniquement d'emoji ou de ponctuation ne donne rien
    // d'exploitable : inutile d'ecrire une ligne qu'on ne saura pas lire.
    if (slug === '' || alreadySent(slug)) return;

    const created = await fetch(
      `${BASE}/${COLLECTION}?documentId=${encodeURIComponent(slug)}&key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            name: { stringValue: clean },
            group: { stringValue: group },
            count: { integerValue: '1' },
            firstAt: { timestampValue: new Date().toISOString() },
            lastAt: { timestampValue: new Date().toISOString() },
          },
        }),
      },
    );

    if (created.ok) {
      remember(slug);
      return;
    }

    // 409 = le document existe deja, donc quelqu'un a demande le meme
    // exercice avant. Tout autre code est un refus (regle, quota, reseau) :
    // on n'insiste pas, la collecte est accessoire.
    if (created.status !== 409) return;

    const bumped = await fetch(`${BASE}:commit?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        writes: [
          {
            transform: {
              document: `projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${slug}`,
              fieldTransforms: [{ fieldPath: 'count', increment: { integerValue: '1' } }],
            },
          },
          {
            update: {
              name: `projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${slug}`,
              fields: { lastAt: { timestampValue: new Date().toISOString() } },
            },
            updateMask: { fieldPaths: ['lastAt'] },
          },
        ],
      }),
    });
    if (bumped.ok) remember(slug);
  } catch {
    // Hors ligne, DNS coupe, bloqueur de contenu : rien a signaler et rien a
    // reessayer. L'exercice est deja dans la seance de la personne, c'est la
    // seule chose qui compte pour elle.
  }
}
