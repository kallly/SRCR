// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import type { GuideSet } from './types';

export const en: GuideSet = {
  setsAndReps: {
    slug: 'sets-and-reps',
    title: 'How many sets and reps should you do?',
    lead: 'What the rep count actually changes, what sets are for, and why rest matters as much as either.',
    sections: [
      {
        heading: 'The rep count decides what you train',
        paragraphs: [
          'A repetition is one full cycle of the movement: down and up, pull and release. How many you can string together before your form breaks tells you how heavy the load is for you — and it is that relative difficulty, not the number itself, that determines what the body improves.',
          'In short sets, one to five reps, the load sits close to your maximum and most of the progress is neural: the nervous system learns to recruit more fibres, faster, with better coordination. You get stronger without necessarily getting bigger. It is also the most technically demanding zone, and the least suitable when you are starting out or coming back.',
          'Between six and fifteen reps, the set lasts long enough to accumulate tension and local fatigue in the muscle: this is where training volume piles up most efficiently, and where most people gain muscle. It is also the most forgiving of imperfect technique, which is no small thing.',
          'Past fifteen, the effort becomes mostly local muscular endurance: the muscle learns to keep going without giving out. Strength gains come more slowly, but this is often the only workable zone with bodyweight or a light band, and there is nothing inferior about it — a plank is counted in seconds, after all, not in reps.',
          'These ranges are conventions, not laws. They overlap heavily, and the border between two zones does not exist inside the body: the same exercise done seriously for twelve reps builds both strength and size.',
        ],
      },
      {
        heading: 'The set accumulates, it does not decide',
        paragraphs: [
          'A single set produces almost nothing. What drives progress is the total of hard sets accumulated across a week for a given muscle group — the best-established variable in training, and the one most often underestimated.',
          'Three sets per exercise is the sensible starting point, because it lands in the right weekly range as soon as the group is trained twice in the week. Two are enough if you are starting out or the session has to fit in twenty minutes. Five or six on a single exercise only make sense once you can already hold your form to the last one.',
          'A marker worth more than any number: a set is useful if the last reps are clearly harder than the first while staying clean. A set where nothing changed between the first rep and the last asked the body to adapt to nothing.',
        ],
      },
      {
        heading: 'Rest is not wasted time',
        paragraphs: [
          'Between two sets, rest serves to recover enough that the next set is still hard — not so that it becomes easy. Too short and the previous round’s fatigue caps your reps, so you do less work than planned. Too long and the session stretches out without adding anything.',
          'In practice: around a minute on a light or isolation exercise, ninety seconds to two minutes on anything involving several joints — squat, push-ups, rows. The heavier the load and the more mass the movement involves, the longer the rest.',
          'Circuit mode changes the rule: by alternating muscle groups, one muscle recovers while another works, and the enforced pause becomes far shorter. It is the simplest way to shorten a session without cutting the actual work.',
        ],
      },
      {
        heading: 'Progress means making the same exercise harder',
        paragraphs: [
          'The body only adapts to what slightly exceeds it. If this month’s session is identical to last month’s, it maintains: that is already a lot, but it is not progress.',
          'Four levers, from cheapest to most demanding: add a rep to a set, add a set to the exercise, slow the lowering phase to lengthen time under tension, and only then increase the load or move to a harder variant. One lever at a time, otherwise you will not know which one worked.',
          'A reliable signal to move on: when three sets reach the top of your range with no degradation on the last reps, the exercise has become too easy. CIRKALI’s exercise sheets carry that marker under “Moving on”.',
        ],
      },
    ],
    related: ['squat', 'pushup', 'plank', 'dumbbellRow'],
  },

  fullBodyNoEquipment: {
    slug: 'full-body-workout-no-equipment',
    title: 'Building a full body session with no equipment',
    lead: 'An order of play, a balance between muscle groups, and enough to run a complete session with a chair for equipment.',
    sections: [
      {
        heading: 'Why full body before splitting',
        paragraphs: [
          'Splitting the week into “chest day”, “back day”, “leg day” assumes four to six sessions a week: since each group is trained only once, you need plenty of sessions for each to come around often enough.',
          'On two or three sessions a week — what most people actually keep to — full body does better: every group gets hit two or three times, and a missed session costs far less. Missing the only “back day” of the week means a week without back work; missing one full body session means a third less volume everywhere.',
        ],
      },
      {
        heading: 'The five boxes to tick',
        paragraphs: [
          'A complete session covers five movement families, and one exercise per family is enough for nothing to be left out: an upper-body push, an upper-body pull, a leg push, a hip hinge, and some bracing work.',
          'The upper-body push: incline push-ups on a table edge if floor push-ups are not there yet, knee push-ups, then full push-ups. Pike push-ups move the work onto the shoulder when the movement comes over the front of the body.',
          'The pull is the box most often left empty without equipment, and it is the one that matters most: everything you push during a day has no counterweight. Without a bar, the superman and the reverse snow angel work the upper back, but a resistance band changes everything here — it is the one purchase that fills a real gap.',
          'Legs: bodyweight squat, chair squat to learn depth, reverse lunges to work one leg at a time. The hip hinge — where the hips travel back and the back stays flat — is covered by the glute bridge on the floor.',
          'Bracing holds the rest together: plank, side plank, dead bug. These are not abdominal exercises in the cosmetic sense; they are what stops the pelvis moving during everything else in the session.',
        ],
      },
      {
        heading: 'In what order',
        paragraphs: [
          'Put first what demands the most coordination and strength: the movements involving several joints and several groups at once. You do them well when fresh and badly when tired — and that is exactly where technique counts.',
          'Bracing and isolation work come at the end. A plank done first tires the stabilisers that the squat and the push-ups rely on, which degrades everything that follows.',
          'A five-minute warm-up is enough: something that raises the heart rate — high knee march, butt kicks — then two or three mobilisations of the joints the session will use. Long stretches belong at the end, not the start.',
        ],
      },
      {
        heading: 'A sample session, thirty minutes',
        paragraphs: [
          'Warm-up: high knee march, torso twists, cat-cow. Then five exercises for three sets: incline push-ups, superman, squat, glute bridge, plank.',
          'In classic mode, allow sixty to ninety seconds of rest between sets: the session runs about thirty minutes. In circuit, cycling through one exercise per family before coming back to the start, the same amount of work fits in twenty — because the back recovers while the legs work.',
          'Repeat the same session two or three times a week, with at least a day between. Keep it identical for three or four weeks while adding reps, then swap one exercise for a harder variant.',
        ],
      },
    ],
    related: ['inclined', 'superman', 'squat', 'gluteBridge', 'plank', 'highKneeMarch'],
  },

  bandsVsDumbbells: {
    slug: 'bands-dumbbells-or-bodyweight',
    title: 'Bands, dumbbells or bodyweight: which should you pick?',
    lead: 'Three ways of resisting a movement, three different difficulty curves — and what each does better than the other two.',
    sections: [
      {
        heading: 'What really separates them: the resistance curve',
        paragraphs: [
          'A dumbbell weighs the same from the start of the movement to the end. What changes through the rep is leverage: a curl is hard when the forearm is horizontal and easy at the top, because the distance between the load and the joint varies. Difficulty follows the mechanics of the body.',
          'A band does the opposite: its tension grows as it stretches. It is gentle where the movement begins and hardest where it ends — which is often where the muscles are shortest and strongest. A band squat is easy at the bottom and hard at the top; a barbell squat is exactly the reverse.',
          'Bodyweight is adjusted neither by kilos nor by a colour, but by angle and leverage. Putting your hands on a raised edge makes push-ups easier; hands on the floor with feet raised makes them harder. Same body, positioned differently.',
          'None of these three curves is better. They simply make the same exercise hard in different places, which is an argument for not locking yourself into one.',
        ],
      },
      {
        heading: 'What each does better',
        paragraphs: [
          'Bodyweight costs nothing, travels everywhere and teaches you to control your body in space. Its limit is well known: pulling. Without a bar or rings you can barely pull at all, while you can push endlessly — and a programme that only pushes unbalances the shoulder over time.',
          'A band fills exactly that gap, for a few euros and two hundred grams. It is the only equipment that makes rows, seated rows and shoulder rotations possible at home. It is also the gentlest on the rotator cuff: its resistance is lowest at the start of the movement, where a sensitive shoulder is most exposed.',
          'Dumbbells give the finest and most legible progression: you move from 8 to 10 kg and you know exactly what you added. Neither bands nor bodyweight allow that as simply — with a band, changing resistance means changing band.',
        ],
      },
      {
        heading: 'How to read the kilos on a band',
        paragraphs: [
          'Bands are sold rated in kilograms: light around 2 to 5 kg, medium 5 to 15, heavy 15 to 25, extra heavy beyond that. Most manufacturers use a colour code — yellow lightest, then green, blue, brown, black — but nobody standardises it: two brands will not agree.',
          'More importantly, that figure is not a constant load the way a dumbbell is. It describes the force the band opposes at a given stretch: the same band rated 10 kg may oppose 5 at rest and over 15 at the end of the range. It is a shelf label, not a measurement.',
          'In CIRKALI, the load field on a band exercise therefore records that label — which band you picked — exactly as it records the kilos of a dumbbell. That is what lets you find the right setting again next time.',
        ],
      },
      {
        heading: 'What to get first',
        paragraphs: [
          'If you have nothing: start with bodyweight. There are months of progression available without buying anything, and easier or harder variants exist for almost every movement.',
          'If you buy one thing: a set of bands. That is what unlocks pulling, therefore upper-body balance, and rotator cuff work — three things no bodyweight exercise really replaces.',
          'Dumbbells come later, when bodyweight progress slows on the legs and reps start being counted in twenties. One adjustable pair lasts a long time.',
        ],
      },
    ],
    related: ['bandRow', 'bandExternalRotation', 'pushup', 'dumbbellGobletSquat', 'bandSquat'],
  },

  classicVsCircuit: {
    slug: 'classic-or-circuit-training',
    title: 'Classic or circuit: how to sequence your sets',
    lead: 'Two ways of ordering exactly the same work, and what each costs or saves in time, load and breathlessness.',
    sections: [
      {
        heading: 'Classic: one exercise at a time',
        paragraphs: [
          'In classic mode you do all the sets of one exercise before moving to the next: three sets of squats, resting between each, then three sets of push-ups. It is the most common structure, and the simplest to follow.',
          'Its advantage is load. By giving the muscle time to recover between sets, you start each set with the most strength available, so you can lift heavier or do more reps. For building strength, it is the most direct route.',
          'Its cost is time. Three exercises of three sets with ninety seconds of rest is about fifteen minutes of pure pausing — longer than the effort itself.',
        ],
      },
      {
        heading: 'Circuit: rotating between groups',
        paragraphs: [
          'In circuit you alternate exercises before returning to the first: one set of squats, one of push-ups, one of rows, then round again. The idea fits in a sentence — while the legs work, the upper body recovers.',
          'This is not a free shortcut: the amount of work is the same, what changes is where the pauses sit. But because each muscle has recovered during the time the others spent working, the enforced pause becomes far shorter, and the same session fits into half the time.',
          'The trade-off is real. The heart never rests: circuits are markedly more breathless, and on the last rounds general fatigue can cap your reps before the muscle in question is genuinely tired. You lift slightly lighter than in classic.',
          'For a circuit to deliver, consecutive exercises must work different areas. Chaining squats and lunges is no circuit at all: they are the same muscles, nothing recovers, and you get a badly rested classic session.',
        ],
      },
      {
        heading: 'How CIRKALI picks the next exercise',
        paragraphs: [
          'In circuit mode the app does not simply run down the list in order. On each round it takes the exercise from another muscle group with the most sets left to do; on a tie, the order of your plan decides.',
          'Groups are compared by overlap rather than strict equality, because they form a tree: “legs” overlaps “calves”, “upper body” overlaps “back”. Two exercises where one contains the other are therefore not treated as two different areas, and the pause they are owed is not skipped.',
          'A pause is only enforced when no other group has a set available — in other words when there is nothing left to do that would let the current muscle recover. In circuit mode that pause comes from the session-wide setting rather than the rest set on each line, which is why that field disappears from the cards in this mode.',
        ],
      },
      {
        heading: 'Which to choose',
        paragraphs: [
          'Take classic when the goal is strength or size, when a movement is technically demanding, or when you are new to an exercise: better to learn a movement rested.',
          'Take circuit when time is the constraint, when you want a cardiovascular effect alongside the strength work, or when the session is made of simple exercises you already know well.',
          'Nothing forces a permanent choice. A pause placed mid-plan splits the circuit into independent segments: you can do the first two exercises classic and run the rest as a circuit, in the same session.',
        ],
      },
    ],
    related: ['squat', 'pushup', 'bandRow', 'plank'],
  },
};
