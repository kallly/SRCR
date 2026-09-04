import type { ExerciseKey } from '../core/types';

/**
 * Prompts d'illustration, source unique pour toutes les langues.
 *
 * Ils ne vivent PAS dans `exercise-details/<locale>.ts` : l'illustration est
 * la meme pour les cinq langues (la direction artistique impose « no text, no
 * logo », il n'y a donc rien a traduire dedans). Un champ par langue faisait
 * apparaitre 140 entrees dans docs/image-prompts.md pour 28 images reelles, et
 * surtout deux redactions concurrentes de la meme scene — une en francais, une
 * en anglais — qui auraient produit deux dessins differents du meme exercice.
 *
 * Redige en anglais : c'est la langue sur laquelle les generateurs d'images
 * sont les plus fiables, et ce texte n'est jamais affiche sur le site.
 */
const ART_DIRECTION =
  'Flat minimalist illustration, solid very dark green background (#0e1210), ' +
  'simplified human silhouette in off-white (#f2f0e8), a single lime-green ' +
  'accent (#d7ff3f) on the primary muscle worked, thick clean linework, no ' +
  'text, no logo, square crop. ';

/** La scene propre a chaque exercice, sans la direction artistique. */
const SCENES: Record<ExerciseKey, string> = {
  inclined:
    'Person doing incline push-ups, hands on a raised ledge, side view, body in a straight line from ankles to head, elbows at 45°.',
  chairsquat:
    'Person performing a squat in front of a chair, side view, hips pushed back, knees tracking over the feet, chest upright, just before touching the seat.',
  calf:
    'Person standing on the balls of their feet, front view, heels raised, calves contracted, arms slightly out for balance.',
  wallsit:
    'Person seated against a wall with no chair, thighs parallel to the floor, knees at 90°, back flat on the wall, side view.',
  rotation:
    'Person lying on their side, bent elbow tucked to the body, forearm rotating upwards holding a small weight, slightly angled top view.',
  deadbug:
    'Person lying on their back, one arm and the opposite leg extended diagonally towards the floor, the other arm and leg bent, top view.',
  plank:
    'Person in a forearm plank, body perfectly aligned from heels to head, side view.',
  walk:
    'Person mid-walk, side view, chest upright, one arm forward and one back, mid-stride.',
  kneePushup:
    'Person doing push-ups from the knees, side view, body aligned from knees to head, elbows at 45°, chest near the floor.',
  wallPushup:
    'Person standing leaning towards a wall, hands on the wall at chest height, body in a straight line, side view.',
  chairDips:
    'Person doing tricep dips on a chair, hands on the seat edge, legs extended in front, elbows bent backwards, side view.',
  armCircles:
    'Person standing, arms extended horizontally to each side, small circular arrows around the hands showing the movement, front view.',
  wallSlides:
    'Person standing with back to a wall, arms bent in a W against the wall sliding upwards, vertical arrow showing the movement, front view.',
  superman:
    'Person lying face down, arms and legs lifted simultaneously in a slight extension, side view.',
  reverseSnowAngel:
    'Person lying face down, arms tracing a wide arc from in front of the body down to the hips, curved arrow showing the path, top view.',
  birdDog:
    'Person on all fours, one arm extended forward and the opposite leg extended back, flat back, side view.',
  catCow:
    'Person on all fours, back arched upwards then downwards, arrow showing the back-and-forth movement of the spine, side view.',
  reverseLunge:
    'Person in a reverse lunge, rear leg bent close to the floor, front knee at 90°, chest upright, side view.',
  stepUp:
    'Person stepping up onto a stable chair, one foot on the seat mid-drive, side view.',
  lateralLunge:
    'Person in a lateral lunge, one leg bent and the other extended to the side, chest upright, front view.',
  gluteBridge:
    'Person lying on their back, knees bent, hips lifted into a bridge, glutes contracted, side view.',
  donkeyKick:
    'Person on all fours, one bent knee pushed towards the ceiling, flat back, rear three-quarter view.',
  hipAbduction:
    'Person standing, one straight leg lifted out to the side, chest upright, arrow showing the sideways movement, front view.',
  sidePlank:
    'Person in a side plank, resting on one forearm, body in a straight line from feet to head, other arm raised, front view.',
  standingKneeRaise:
    'Person standing, one knee lifted towards the chest, straight back, arms balanced, side view.',
  crunch:
    'Person lying on their back, knees bent, shoulders lifted slightly off the floor in an abdominal contraction, side view.',
  highKneeMarch:
    'Person marching on the spot, one knee lifted to hip height, arms in motion, side view.',
  buttKickMarch:
    'Person marching on the spot, one heel drawn up towards the glute, chest upright, side view.',
  custom: '',
};

/**
 * Prompt complet pour un exercice. Chaine vide pour `custom` : un exercice
 * saisi par l'utilisateur n'a pas d'illustration a generer.
 */
export function imagePrompt(key: ExerciseKey): string {
  const scene = SCENES[key];
  return scene ? ART_DIRECTION + scene : '';
}
