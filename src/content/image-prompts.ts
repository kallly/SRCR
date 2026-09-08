// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

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
  bandPullApart:
    'Person standing, arms extended forward at chest height holding a resistance band stretched between the hands, pulling it apart, front view.',
  bandSquat:
    'Person in a squat, a resistance band looped around the ankles and stretched taut, knees pressing outward against it, side view.',
  dumbbellGobletSquat:
    'Person in a squat, holding a single dumbbell with both hands close to the chest, elbows tracking inside the knees, side view.',
  dumbbellRow:
    'Person bracing one knee and hand on a bench, the other arm pulling a dumbbell up towards the hip, back flat, side view.',
  legPressMachine:
    'Person seated on a leg press machine, back against the padded seat, feet pressing a weighted plate forward, side view.',
  latPulldownMachine:
    'Person seated at a lat pulldown machine, pulling a wide bar down towards the upper chest, torso upright, side view.',
  hamstringStretch:
    'Person with one heel resting on a raised support, leg straight, hinging the torso forward over it, standing leg planted, side view.',
  chestDoorwayStretch:
    'Person standing in a doorway, forearm braced against the frame at shoulder height, torso leaning gently forward, side view.',
  squat:
    'Person at the bottom of a bodyweight squat, thighs near parallel, hips pushed back, chest upright, side view.',
  pushup:
    'Person in a full push-up, body in a straight line from heels to head, chest near the floor, elbows at 45°, side view.',
  pikePushup:
    'Person in a pike push-up, hips high in an inverted V, head lowering toward the floor between the hands, side view.',
  mountainClimber:
    'Person in a push-up position driving one knee toward the chest, hips level, side view.',
  legSwing:
    'Person holding a support with one hand, one leg swinging forward and back, motion arc shown, side view.',
  torsoTwist:
    'Person standing with feet planted, torso rotated to one side, arms relaxed and following the turn, front view.',
  quadStretch:
    'Person standing on one leg, holding the other ankle with the heel drawn to the glute, knees side by side, side view.',
  gluteStretch:
    'Person lying on their back, one ankle crossed over the opposite knee in a figure four, hands pulling the supporting thigh, side view.',
  calfStretch:
    'Person with hands on a wall, back leg straight with the heel down, hips pushed forward, side view.',
  childPose:
    'Person kneeling with hips on the heels, arms stretched far forward on the floor, forehead down, side view.',
  tricepsStretch:
    'Person standing with one elbow bent and pointing at the ceiling, opposite hand easing the elbow back, front view.',
  bandChestPress:
    'Person standing with a resistance band behind the back, pressing both hands forward at chest height to full extension, side view.',
  bandLateralRaise:
    'Person standing on a resistance band, raising straight arms out to the sides to shoulder height, front view.',
  bandLateralWalk:
    'Person in a half squat with a band above the knees, stepping sideways with the band stretched taut, front view.',
  bandCurl:
    'Person standing on a resistance band, elbows tight to the body, curling both hands toward the shoulders, side view.',
  dumbbellShoulderPress:
    'Person pressing two dumbbells overhead from shoulder height, torso upright, front view.',
  dumbbellFloorPress:
    'Person lying on the floor with knees bent, pressing two dumbbells up from elbows resting on the floor, side view.',
  dumbbellRomanianDeadlift:
    'Person hinging at the hips with barely bent knees, dumbbells lowered along the front of the legs, back flat, side view.',
  dumbbellCalfRaise:
    'Person standing on the balls of the feet holding a dumbbell in each hand at the sides, heels raised, side view.',
  dumbbellCurl:
    'Person standing curling a dumbbell toward the shoulder, elbow tight to the body, torso still, side view.',
  dumbbellTricepsExtension:
    'Person holding a single dumbbell with both hands overhead, lowering it behind the neck with elbows kept close, side view.',
  chestPressMachine:
    'Person seated at a chest press machine, back against the pad, pressing the handles forward, side view.',
  legCurlMachine:
    'Person lying face down on a leg curl machine, heels curling the roller toward the glutes, side view.',
  treadmill:
    'Person walking briskly on a treadmill, upright posture, hands off the rails, side view.',
  stationaryBike:
    'Person pedalling a stationary bike, upright posture, knee slightly bent at the bottom of the stroke, side view.',
  rowingMachine:
    'Person mid-drive on a rowing machine, legs extending and torso opening, arms still straight, side view.',
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
