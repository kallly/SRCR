import type { ExerciseKey } from '../../core/types';
import type { ExerciseDetail } from './fr';

/**
 * Contenu long en anglais. Meme regle de redaction que fr.ts : uniquement du
 * verifiable et du stable (anatomie, biomecanique, principes d'entrainement
 * etablis), jamais de citation d'etude ni de pourcentage d'activation EMG.
 *
 * Les slugs sont en anglais : ces pages vivent sous exercises/en/ et une URL
 * francaise y serait incoherente pour un lecteur anglophone.
 */
export const en: Partial<Record<ExerciseKey, ExerciseDetail>> = {
  inclined: {
    slug: 'incline-push-ups',
    muscles: { primary: 'Chest, triceps', secondary: 'Shoulders, core' },
    steps: [
      'Place your hands on a stable raised surface (chair, bench, table edge), slightly wider than your shoulders.',
      'Step your feet back until your body forms a straight line from ankles to head.',
      'Brace your abs and glutes to keep the hips steady throughout the movement.',
      'Bend your elbows to about 45° from the body and lower your chest towards the support, without arching the back.',
      'Push back to the starting position without snapping the elbows straight.',
    ],
    mistakes: [
      'Elbows flared out to 90°: shifts load onto the shoulders and strains them.',
      'Hips sagging or arching: breaks the line and loads the lower back.',
      'Cutting the range short: far less effective than a full, controlled descent.',
    ],
    sensation:
      'The effort belongs in the chest and the back of the arms. If you mostly feel it at the front of the shoulder, in the wrist or in the neck, the elbows are drifting outwards or the shoulders are creeping up towards the ears.',
    rangeOfMotion:
      'Lower until your chest is a few centimetres from the support. Do not go further than the shoulder allows without rolling forwards. At the top, straighten the arms without locking the elbow abruptly.',
    tempo:
      'Two seconds down, one second up. Inhale on the way down, exhale as you push. The controlled descent is the useful half of the movement: dropping into it means doing only half the work.',
    anatomy:
      'The pectoralis major is the prime mover: it draws the arm towards the midline. The triceps brachii extends the elbow, and the anterior deltoid assists at the start of the push. In the background, the serratus anterior keeps the shoulder blade flat against the ribcage while the transverse abdominis and glutes lock the pelvis so the body stays a rigid plank.',
    mechanics:
      'A horizontal push in the sagittal plane, combining shoulder flexion with elbow extension. The descent is an eccentric contraction — the muscle lengthens under tension — and the return is concentric. The higher the support, the smaller the share of bodyweight you move: that, precisely, is this exercise’s difficulty dial.',
    benefits: [
      'Builds upper-body pushing strength with no equipment, and far less strain on wrists and shoulders than a floor push-up.',
      'Strengthens the plank position, which carries over to anything you push or carry in front of you.',
      'Adjusts finely by changing the height of the support, which is what makes it a reliable entry point after time away from training.',
    ],
    progression: {
      easier: 'Raise the support: a kitchen counter or a wall is far more accessible than a chair.',
      harder: 'Lower the support towards the floor, or stretch the descent out to four seconds.',
      readyWhen:
        'When three sets of twelve go by with a controlled descent and hips that never move, drop the support one level.',
    },
    precautions:
      'If the front of the shoulder hurts, reduce the range and bring the elbows closer to the body before trying to go lower.',
  },

  chairsquat: {
    slug: 'chair-squat',
    muscles: { primary: 'Quadriceps, glutes', secondary: 'Hamstrings, core' },
    steps: [
      'Stand in front of a stable chair, feet about hip-width apart.',
      'Push your hips back as if sitting down, knees tracking in line with the feet.',
      'Lower under control until you brush the seat, weight in the heels.',
      'Touch briefly without sitting down, chest upright.',
      'Drive back up through the heels until the legs are fully extended.',
    ],
    mistakes: [
      'Knees caving inwards: unstable and hard on the joints.',
      'Dropping onto the chair instead of controlling the descent.',
      'Chest tipping too far forward: shifts the effort onto the lower back.',
    ],
    sensation:
      'You should feel the front of the thighs and the glutes, with clear pressure through the heels. Tension at the front of the knee or in the lower back means the hips are not travelling back enough and the torso is compensating.',
    rangeOfMotion:
      'Lower until you brush the seat without settling onto it. The chair is a consistent depth marker, not a seat: that is what makes the exercise measurable from one session to the next.',
    tempo:
      'Three seconds down, one to two seconds up. Inhale on the way down, exhale as you drive through the heels. A one-second pause at the touch removes any bounce.',
    anatomy:
      'The quadriceps extend the knee and the gluteus maximus extends the hip: two prime movers working together. The hamstrings and adductors stabilise, the gluteus medius stops the knee falling inwards, and the erector spinae with the abdominal wall keep the torso braced.',
    mechanics:
      'Simultaneous flexion then extension of hip and knee in the sagittal plane. The descent is eccentric, the ascent concentric. Sending the hips back places your centre of mass over the heels, which is what shares the load between thighs and glutes instead of concentrating it on the knee.',
    benefits: [
      'Rebuilds the most-used movement in daily life: getting out of a chair, into a car, or picking something off the floor.',
      'Strengthens thighs and glutes at once — the first things to fade during a sedentary spell.',
      'The chair gives an objective depth marker, so you can progress without having to judge by eye whether you went low enough.',
    ],
    progression: {
      easier: 'Use a higher seat, or actually sit down between each repetition.',
      harder: 'Work towards a lower seat, slow the descent to five seconds, or hold three seconds at the bottom.',
      readyWhen:
        'When three sets of fifteen go by without the knees caving and without pushing off with your hands, lower the seat.',
    },
    precautions:
      'If the knee is sore, reduce the depth rather than the number of repetitions: a pain-free partial range beats a full range that hurts.',
  },

  calf: {
    slug: 'standing-calf-raises',
    muscles: { primary: 'Calves (gastrocnemius, soleus)' },
    steps: [
      'Stand with feet hip-width apart, optionally resting a hand lightly on a wall or chair for balance.',
      'Rise onto the balls of your feet over three seconds, pushing through the big toe.',
      'Pause at the top with the calves fully contracted.',
      'Lower over three seconds until the heels return to the floor.',
    ],
    mistakes: [
      'Moving too fast: the slowness is what makes the muscle work.',
      'Bouncing at the bottom instead of controlling the full range.',
      'Ankles rolling outwards or inwards as you rise.',
    ],
    sensation:
      'A clear contraction in the calf, from the heel up to just below the knee. If the effort drifts to the front of the shin or the outside of the ankle, the foot is rolling instead of pushing straight.',
    rangeOfMotion:
      'Rise as high as the ankle allows without the foot tipping outwards, then lower until the heel touches down. Cutting the bottom short is the most common error — yet that is exactly where the muscle lengthens under tension.',
    tempo:
      'Three seconds up, one second squeezed at the top, three seconds down. This is the one exercise here where slowness does not merely make it harder: it *is* the load, since bodyweight alone would not be enough.',
    anatomy:
      'Two muscles share the work. The gastrocnemius, superficial and visible, crosses the knee and works mostly with the leg straight; the soleus, underneath it, contributes more with the knee bent. Both converge on the Achilles tendon to produce ankle extension.',
    mechanics:
      'Plantar flexion of the ankle in the sagittal plane, in a closed chain (the foot stays on the ground). Concentric on the way up, eccentric on the way down. The joint range is short: it is time under tension, not distance travelled, that produces the effect.',
    benefits: [
      'The calf is the primary propulsor in walking and stair climbing, so strengthening it directly improves walking endurance.',
      'Strengthens the Achilles tendon and the ankle, two structures that quickly lose tolerance after a period of inactivity.',
      'Contributes to standing balance, the ankle being the first joint to correct a wobble.',
    ],
    progression: {
      easier: 'Keep two fingers on a wall for support, or reduce the height you rise to.',
      harder:
        'Work one leg at a time, or place the ball of the foot on a step so the heel can drop below toe level.',
      readyWhen: 'When three sets of twenty go by at a slow tempo with no hand support, switch to one leg.',
    },
  },

  wallsit: {
    slug: 'wall-sit',
    muscles: { primary: 'Quadriceps', secondary: 'Glutes, core' },
    steps: [
      'Stand with your back against a wall, feet hip-width apart, about a step away from it.',
      'Slide down the wall until your thighs are parallel to the floor, knees at 90°.',
      'Keep your whole back flat against the wall and your knees stacked over your ankles.',
      'Hold the position breathing normally, without holding your breath.',
      'Push through the heels to come back up out of the position.',
    ],
    mistakes: [
      'Knees travelling past the toes: too much pressure on the joint.',
      'Back peeling off the wall: you lose the support and load the lower back.',
      'Forcing a 90° angle when the knee complains: open to 120° instead.',
    ],
    sensation:
      'A burn building steadily in the front of the thighs, rising evenly until the end of the hold. A sharp pain in the knee, by contrast, is not the expected signal: open the angle.',
    rangeOfMotion:
      'The knee angle sets the difficulty: 90° is the reference version, 120° a markedly more accessible one. Knees stay over the ankles, never pushed past the toes, and the back keeps contact with the wall along its whole length.',
    tempo:
      'No tempo — this is a hold. Breathe normally, out loud if it helps you check you are not holding your breath: that is the most common reflex on an isometric exercise, and it raises blood pressure for nothing.',
    anatomy:
      'The quadriceps work isometrically to stop the knee bending further under bodyweight. The glutes and hamstrings help hold the hip, and the abdominals stabilise the pelvis against the wall.',
    mechanics:
      'An isometric contraction: the muscle produces force without changing length and without the joint moving. The wall removes the balance demand, which lets you load the thighs without the coordination a free-standing squat hold would require.',
    benefits: [
      'Builds strength endurance in the thighs — the quality that runs out going down stairs or standing for a long time.',
      'Loads the quadriceps without joint movement, which often makes it tolerable when a full range movement is not yet.',
      'Progress is measured in seconds, a clearer unit than "one more rep" for tracking progress.',
    ],
    progression: {
      easier: 'Open the knee angle to 110–120°, or split it into two shorter holds.',
      harder: 'Work towards 90°, extend the duration, or lift one heel slightly then the other.',
      readyWhen:
        'When three sixty-second holds at 90° go by without the back lifting off, extend further or move to a dynamic load.',
    },
    precautions:
      'If the knee pulls, open the angle before anything else. This exercise is easy to make gentler; there is no point in enduring it as it is.',
  },

  rotation: {
    slug: 'external-shoulder-rotation',
    muscles: { primary: 'Rotator cuff (shoulder)' },
    steps: [
      'Lie on your side, elbow bent to 90° and tucked against your ribs, a light weight (a water bottle) in hand.',
      'Rest the forearm across your stomach — that is the starting position.',
      'Rotate the forearm upwards, elbow staying glued to the body, without moving the shoulder itself.',
      'Pause at the top of the movement.',
      'Lower under control back to the start.',
    ],
    mistakes: [
      'Elbow drifting off the ribs: shifts the effort somewhere other than the shoulder.',
      'Too much weight: this movement targets a small muscle, the load stays light.',
      'Forcing range beyond what the shoulder finds comfortable.',
    ],
    sensation:
      'A quiet effort at the back and top of the shoulder, never dramatic. If you feel it in the trapezius or the neck, the shoulder is riding up; if you feel it in the biceps, the weight is too heavy and the arm is pulling instead of rotating.',
    rangeOfMotion:
      'Rotate only as far as the shoulder goes without the elbow leaving the ribs — often much less far than you would expect. The useful range here is short: going past it makes something else do the work.',
    tempo:
      'Two seconds in each direction, no jerking, with a one-second pause at the top. This is an exercise in control, not power: speed defeats its purpose.',
    anatomy:
      'The rotator cuff is four deep muscles that keep the head of the humerus centred in its socket. This movement targets mainly the infraspinatus and teres minor, the two external rotators. The deltoid, which is more superficial, is precisely what should *not* take over.',
    mechanics:
      'External rotation of the shoulder in the transverse plane, with the elbow fixed at 90°. Keeping the elbow against the body is a mechanical lock: it stops the shoulder compensating with abduction, which would hand the work to the deltoid.',
    benefits: [
      'Maintains the deep shoulder stabilisers, often neglected because they are invisible and produce no dramatic sensation.',
      'Counterbalances the forward-rolled posture that desk work and prolonged screen use install.',
      'Prepares the shoulder to tolerate pushing movements: this is a maintenance exercise, not a performance one.',
    ],
    progression: {
      easier: 'Do it with no weight at all, empty-handed, looking only for range and control.',
      harder:
        'Move to a slightly heavier bottle, or extend the pause at the top. Stay modest on load: this muscle is small.',
      readyWhen: 'When three sets of fifteen go by with the elbow never lifting and no trapezius compensation.',
    },
    precautions:
      'No pain should appear in the shoulder. If it does, cut the range first, then the load; if it persists, this is not the exercise your session is missing.',
  },

  deadbug: {
    slug: 'dead-bug',
    muscles: { primary: 'Deep core (transverse abdominis)', secondary: 'Hips' },
    steps: [
      'Lie on your back, arms reaching towards the ceiling, hips and knees bent to 90°.',
      'Press your lower back into the floor and keep it there for the whole movement.',
      'Slowly lower one arm overhead and the opposite leg towards the floor, without touching down.',
      'Return to the start under control.',
      'Repeat on the other side.',
    ],
    mistakes: [
      'Lower back lifting off the floor: a sign the range has gone too far.',
      'Moving too fast: you lose control and the core disengages.',
      'Holding your breath: keep breathing normally throughout.',
    ],
    sensation:
      'A deep, continuous tension in the lower abdomen, below the navel. If the lower back arches or pulls, the range has exceeded what your core can hold: that is the stop signal, not a detail.',
    rangeOfMotion:
      'Lower the arm and leg only to the point where the lower back stays pressed to the floor. That point is personal and moves over the weeks — it, not the distance to the floor, is your unit of measure.',
    tempo:
      'Three to four seconds per repetition, never speeding up. Exhale as you extend, inhale as you return: the exhale mechanically helps keep the ribs down and the back flat.',
    anatomy:
      'The transverse abdominis, the deepest muscle of the abdominal wall, acts like a belt stabilising the pelvis. The obliques resist the rotation the cross-body movement creates, and the rectus abdominis holds the ribcage down. The hip flexors work in control on the extending leg.',
    mechanics:
      'This is an anti-extension exercise: the core’s job is not to produce a movement but to prevent one — here, the lower-back extension caused by the weight of the limbs travelling away. The cross-body pattern adds a resistance to rotation.',
    benefits: [
      'Teaches what the core actually does — stabilise rather than flex — more clearly than any conventional abdominal movement.',
      'Works the lower back without putting it under compression, unlike repeated sit-ups.',
      'Carries over directly to walking and running, where opposite arm and leg already work in alternation.',
    ],
    progression: {
      easier: 'Move one limb at a time, arm alone or leg alone, keeping the other in position.',
      harder:
        'Fully extend the leg just above the floor, slow down further, or hold two seconds in the low position.',
      readyWhen:
        'When three sets of ten per side go by with the lower back never lifting and the leg extended a few centimetres off the floor.',
    },
  },

  plank: {
    slug: 'plank',
    muscles: { primary: 'Core (abdominals, lower back)', secondary: 'Shoulders' },
    steps: [
      'Place your forearms on the floor, elbows under the shoulders, and extend your legs behind you.',
      'Line the body up straight from heels to head.',
      'Squeeze the glutes and draw the navel in slightly to lock the core.',
      'Hold the position breathing normally, eyes towards the floor.',
    ],
    mistakes: [
      'Hips riding up into a peak: reduces the work on the abdominals.',
      'Hips sagging: loads the lower back — that is the signal to end the set.',
      'Holding your breath instead of breathing normally.',
    ],
    sensation:
      'Tension spread across the whole abdominal wall and the glutes. If the load shifts to the lower back or the shoulders, the position has degraded: holding on has no value any more, better to end the set.',
    rangeOfMotion:
      'No range — it is the quality of the alignment that counts. A straight line from heels to head, neither hips peaked nor sagging, eyes down so the neck stays in line with the back.',
    tempo:
      'A continuous hold, breathing normally and audibly. The stopping criterion is not the clock but the position: as soon as the hips go, the set is over, even with ten seconds left.',
    anatomy:
      'The transverse abdominis and rectus abdominis hold ribcage and pelvis aligned, the obliques prevent rotation. The glutes slightly extend the hip to remove the arch, and the serratus anterior keeps the shoulder blades flat. The erector spinae work in co-contraction with the abdominals.',
    mechanics:
      'An isometric anti-extension exercise: gravity pulls the pelvis towards the floor and the abdominal wall stops it. No joint moves, which makes the position highly dependent on alignment — a few degrees of pelvic tilt completely changes which muscle carries the load.',
    benefits: [
      'Builds core endurance, the quality that protects the back when standing for a long time or carrying a load.',
      'Involves no repeated spinal flexion, unlike conventional abdominal work.',
      'The hold teaches you to breathe under tension, a reflex that pays off in every other exercise.',
    ],
    progression: {
      easier: 'Put the knees down, or place the forearms on a raised surface.',
      harder: 'Extend the duration, or briefly lift one foot then the other while keeping the hips still.',
      readyWhen:
        'When three forty-five-second holds go by with no loss of position, extend or add complexity.',
    },
    precautions:
      'Do not hold your breath. If the lower back pulls, the position has already sagged: come down and restart rather than gritting it out.',
  },

  walk: {
    slug: 'walking',
    muscles: { primary: 'Cardiovascular, legs' },
    steps: [
      'Pick a brisk pace where talking is still possible but you are slightly out of breath.',
      'Keep the chest upright, eyes on the horizon, shoulders relaxed.',
      'Let the arms swing naturally with your stride.',
      'Hold that pace for the planned duration, varying the terrain if you can.',
    ],
    mistakes: [
      'A pace too slow to have any real cardiovascular effect.',
      'Eyes glued to the ground or a phone: bad for posture.',
      'Unsuitable footwear on uneven ground.',
    ],
    sensation:
      'Moderate breathlessness: you should be able to hold a conversation but not sing. It is the most reliable way to set intensity without any measuring device.',
    rangeOfMotion:
      'No range to set, but a stride: land on the heel, roll through the foot, push off with the front. The arms swing freely from the shoulder, not pinned in pockets.',
    tempo:
      'A steady, sustained rhythm held throughout, rather than bursts followed by pauses. Consistency is what builds the endurance base.',
    anatomy:
      'Every muscle of the posterior chain contributes in alternation: glutes and hamstrings to propel, quadriceps to absorb, calves for the final push. The core stabilises the pelvis on each single-leg stance, and the foot muscles manage the landing.',
    mechanics:
      'Cyclic locomotion in an alternating closed chain: each leg passes through a stance phase then a swing phase. Unlike running, one foot is always on the ground — that absence of a flight phase is what removes the impact and makes walking practicable every day.',
    benefits: [
      'Builds cardiovascular capacity with no joint impact, which makes it practicable almost daily.',
      'The only activity here that stacks naturally onto everyday life: commutes, errands, stairs.',
      'Improves recovery between strength sessions rather than adding fatigue.',
    ],
    progression: {
      easier: 'Cut the duration before cutting the pace: ten brisk minutes beat thirty dragged ones.',
      harder: 'Extend the duration, seek out hills, or lift the pace slightly on sections.',
      readyWhen: 'When thirty minutes pass with no noticeable breathlessness, look for hills rather than extra time.',
    },
  },

  kneePushup: {
    slug: 'knee-push-ups',
    muscles: { primary: 'Chest, triceps', secondary: 'Shoulders, core' },
    steps: [
      'Get onto all fours, then walk your hands forward slightly wider than your shoulders.',
      'Cross your ankles and keep your knees on the floor as the pivot point.',
      'Line the body up straight from knees to head, without breaking at the hips.',
      'Bend the elbows to about 45° from the body and lower your chest close to the floor.',
      'Push back up without snapping the elbows straight.',
    ],
    mistakes: [
      'Hips too high or too low: breaks the line of the torso.',
      'Elbows flared to 90°: overloads the shoulders.',
      'An incomplete descent: reduces the effect of the movement.',
    ],
    sensation:
      'Chest and triceps, with the core working from hips to shoulders. Wrist discomfort almost always comes from the hands being too far back: they belong under the shoulders, not in front of them.',
    rangeOfMotion:
      'Lower until your chest is a fist’s height from the floor. If the full range costs you the alignment, shorten it: a clean half range builds more than a full one that folds at the hips.',
    tempo:
      'Two seconds down, one up, with no pause at the bottom so the tension stays. Inhale down, exhale on the push.',
    anatomy:
      'The same prime movers as the standard push-up — pectoralis major, triceps brachii, anterior deltoid — but with a shortened lever. The serratus anterior stabilises the shoulder blade while the abdominals and glutes stop the hips sagging.',
    mechanics:
      'A horizontal push, like the incline push-up, but the knee contact shortens the lever: the share of bodyweight actually lifted drops by roughly a third. This is a regression of the lever, not of the range — an important distinction, because the range stays full.',
    benefits: [
      'Lets you train the full range of a push-up while the floor version is still out of reach.',
      'Loads the core over a shorter segment, so it is easier to keep aligned late in a set.',
      'Forms the natural intermediate step between the incline push-up and the floor push-up.',
    ],
    progression: {
      easier: 'Go back to an incline push-up on a high support, where the core is less taxed.',
      harder: 'Walk the knees forward to lengthen the lever, or move to a floor push-up.',
      readyWhen:
        'When three sets of twelve go by with a perfectly straight line from knees to head, try a floor push-up.',
    },
    precautions:
      'Put a cushion or mat under the knees: discomfort on a hard floor ends the set before the muscle tires.',
  },

  wallPushup: {
    slug: 'wall-push-ups',
    muscles: { primary: 'Chest, triceps', secondary: 'Shoulders' },
    steps: [
      'Place your hands on a wall, slightly wider than your shoulders, at chest height.',
      'Step your feet back to lean the body, straight from ankles to head.',
      'Bend the elbows and bring your chest towards the wall under control.',
      'Push back to the starting position.',
    ],
    mistakes: [
      'Feet too close to the wall: reduces the intensity of the exercise.',
      'The back arching during the descent.',
      'Moving too fast, with no controlled moment at the bottom.',
    ],
    sensation:
      'A light but clear effort in the chest and triceps. If you feel almost nothing, step the feet further back: the lean, and only the lean, sets the intensity.',
    rangeOfMotion:
      'Bring the chest to within a few centimetres of the wall, then push back to straight arms without snapping them. A full range is easy to reach here — which is precisely the point of this version.',
    tempo:
      'Two seconds in each direction. The low intensity makes slowness all the more useful: it is what makes the exercise demanding enough to produce an effect.',
    anatomy:
      'Pectoralis major, triceps brachii and anterior deltoid, exactly as in the other push-up variants. The core does little here, the body being close to vertical.',
    mechanics:
      'A horizontal push at a very shallow lean: the closer the body is to vertical, the smaller the fraction of bodyweight to move. This is the most accessible end of the same continuum as the incline push-up and then the floor push-up.',
    benefits: [
      'Makes the push-up pattern practicable from day one, whatever the starting level.',
      'Lets you learn elbow placement and body alignment without being limited by strength.',
      'Works anywhere, with no equipment and no need for a clean floor, which suits a gradual return.',
    ],
    progression: {
      easier: 'Bring the feet closer to the wall, until you are almost upright.',
      harder: 'Step the feet back, then move to a lower support: a counter, then a chair.',
      readyWhen: 'When three sets of fifteen feel easy, move to a lower support rather than adding repetitions.',
    },
  },

  chairDips: {
    slug: 'chair-tricep-dips',
    muscles: { primary: 'Triceps', secondary: 'Shoulders, chest' },
    steps: [
      'Sit on the edge of a stable chair, hands beside your hips.',
      'Slide your hips off the chair, legs straight or slightly bent in front of you.',
      'Bend the elbows backwards to lower your torso, not past 90°.',
      'Push through the hands to come back up to straight arms.',
    ],
    mistakes: [
      'Going too low: puts excessive strain on the shoulders.',
      'Shoulders riding up towards the ears instead of staying down.',
      'An unstable or sliding chair: check the support before you start.',
    ],
    sensation:
      'The back of the arm, distinctly. Tension at the front of the shoulder means the descent went too far or the shoulders rolled forward: that is the limit not to cross on this exercise.',
    rangeOfMotion:
      'Lower until the elbow reaches about 90°, no further. This is the one exercise in this library where maximum range is not desirable: past 90°, strain on the front of the shoulder rises quickly for very little gain.',
    tempo:
      'Two seconds down, one up. Keep the shoulders down and away from the ears throughout.',
    anatomy:
      'The triceps brachii is the prime mover: it extends the elbow. The lower portion of the pectoralis major and the anterior deltoid assist, and the shoulder-blade muscles work to stop the shoulder rolling forward.',
    mechanics:
      'Elbow extension in a closed chain, the body travelling around fixed hands. Leg position sets the load: the further they extend, the greater the share of bodyweight the arms support.',
    benefits: [
      'Targets the triceps more directly than push-up variants, where the chest takes a large share of the work.',
      'Strengthens the ability to push up out of a low support — getting out of a bath, or a deep armchair.',
      'Scales with no equipment, simply by moving the feet closer or further away.',
    ],
    progression: {
      easier: 'Bring the feet closer, knees bent: the load on the arms drops markedly.',
      harder: 'Extend the legs further, or rest the heels on a second support at the same height.',
      readyWhen: 'When three sets of twelve go by with straight legs and no shoulder rolling.',
    },
    precautions:
      'Demanding for the front of the shoulder. With any history or discomfort there, cut the range sharply or replace it with a push-up variant.',
  },

  armCircles: {
    slug: 'arm-circles',
    muscles: { primary: 'Shoulders', secondary: 'Upper back' },
    steps: [
      'Stand with your arms extended horizontally out to each side.',
      'Draw small, steady circles with the arms, shoulders down and relaxed.',
      'Continue for the planned duration, then reverse the direction.',
    ],
    mistakes: [
      'Shoulders creeping up towards the ears during the movement.',
      'Circles too large or too fast: you lose control.',
      'Arching the back to compensate for tiring shoulders.',
    ],
    sensation:
      'A burn building gradually over the top and back of the shoulder. If the traps take over and the shoulders ride up, slow down or shrink the circles.',
    rangeOfMotion:
      'Small, regular circles about the size of a plate, not big windmills. Range is not the objective: it is time under tension, arms held horizontal against gravity.',
    tempo:
      'A constant, slow rhythm with normal breathing. Switch direction halfway through to balance the work between the front and rear portions of the deltoid.',
    anatomy:
      'The deltoid, across all three portions, holds the arm horizontal — that is endurance work in abduction. The supraspinatus contributes to the hold, and the lower and middle trapezius stabilise the shoulder blade. The upper trapezius should stay relaxed.',
    mechanics:
      'A static hold in shoulder abduction with a circular component in the frontal and transverse planes. The arm acts as a long lever: the straighter it is, the greater the torque the shoulder must support, with no external load required.',
    benefits: [
      'Builds shoulder endurance, heavily taxed in every overhead task of daily life.',
      'Works as an effective warm-up before any pushing exercise.',
      'Needs no equipment and no floor: practicable in any standing space.',
    ],
    progression: {
      easier: 'Shorten the duration, or bend the elbows slightly to shorten the lever.',
      harder: 'Extend the duration, or hold a small water bottle in each hand.',
      readyWhen: 'When a minute in each direction goes by without the shoulders rising, add a light load.',
    },
  },

  wallSlides: {
    slug: 'wall-slides',
    muscles: { primary: 'Shoulders, upper back' },
    steps: [
      'Stand with your back to a wall, lower back, upper back and head in contact with it.',
      'Place the arms in a "W", elbows and wrists against the wall.',
      'Slide the arms upwards keeping contact with the wall, towards a "Y".',
      'Lower under control back to the starting position.',
    ],
    mistakes: [
      'The lower back arching and lifting off the wall.',
      'Elbows or wrists losing contact with the wall on the way up.',
      'Forcing range beyond what the shoulder allows without pain.',
    ],
    sensation:
      'Work between the shoulder blades and at the back of the shoulders, often with a stretch across the front of the chest. That is exactly the intent: open at the front, switch on at the back.',
    rangeOfMotion:
      'Go as high as you can while keeping elbows and wrists on the wall. The point where contact breaks is your limit for the day — going past it by lifting the arms removes the entire point of the exercise.',
    tempo:
      'Three seconds up, three seconds down. The wall is the constraint: it is what prevents compensation, provided you stay slow.',
    anatomy:
      'The lower and middle trapezius along with the rhomboids draw the shoulder blades together and down. The external rotators of the shoulder hold the "W" position. On the opposite side, the pectoralis minor and the shoulder flexors are placed under stretch.',
    mechanics:
      'A combination of shoulder-blade elevation and rotation coordinated with shoulder abduction in the frontal plane. The wall imposes a reference plane: it makes any compensation by arching or rolling visible and impossible to ignore.',
    benefits: [
      'Directly counterbalances the rolled-forward posture that prolonged sitting installs.',
      'Restores the shoulder mobility needed before any overhead pushing work.',
      'The wall gives immediate feedback on execution quality, with no mirror or outside eye required.',
    ],
    progression: {
      easier:
        'Step the feet slightly away from the wall and bend the knees: this reduces the arch and makes contact easier to hold.',
      harder: 'Slow down further, or hold two seconds at the highest point.',
      readyWhen: 'When the full range goes by without the elbows lifting, add the pause.',
    },
    precautions:
      'Losing contact with the wall is not a failure but information: it is your current mobility. Forcing past it by arching does not improve that mobility.',
  },

  superman: {
    slug: 'superman',
    muscles: { primary: 'Lower back, glutes', secondary: 'Upper back' },
    steps: [
      'Lie face down, arms extended in front of you, legs extended behind.',
      'Look at the floor to keep the neck neutral throughout the movement.',
      'Lift arms, chest and legs a few centimetres at the same time.',
      'Pause at the top, then lower under control.',
    ],
    mistakes: [
      'Lifting the head to look ahead instead of keeping the eyes down: compresses the neck.',
      'Going too high, too fast, in jerks rather than under control.',
      'Holding your breath during the effort.',
    ],
    sensation:
      'A contraction in the lower back and glutes. Painful compression in the lumbar area, on the other hand, means you are lifting too high: height is not the success criterion.',
    rangeOfMotion:
      'A few centimetres is enough. The aim is a light, controlled extension, not maximum arching — the last degrees add no muscular work, only joint compression.',
    tempo:
      'Two seconds up, one second held, two seconds down. Exhale as you lift. The eyes stay on the floor from start to finish.',
    anatomy:
      'The erector spinae, the long muscles either side of the spine, produce the extension. The gluteus maximus and hamstrings extend the hip on the leg side, and the lower trapezius contributes on the arm side.',
    mechanics:
      'Simultaneous extension of spine and hips against gravity, face down. Concentric on the way up, eccentric on the way down. Without equipment, this is one of the few ways to load the posterior chain directly.',
    benefits: [
      'Strengthens the lower back, often neglected even though it is exactly the area that complains after a sedentary spell.',
      'Works the whole posterior chain, which sitting shortens and weakens.',
      'Requires no equipment and no support: practicable anywhere you can lie down.',
    ],
    progression: {
      easier: 'Lift only the arms, or only the legs, rather than both together.',
      harder: 'Extend the hold at the top, or lift opposite arm and leg alternately.',
      readyWhen: 'When three sets of twelve go by with no compression in the lower back.',
    },
    precautions:
      'Lifting the head to look ahead compresses the neck: keep the eyes down. With established lower-back pain, this is not the right starting point.',
  },

  reverseSnowAngel: {
    slug: 'reverse-snow-angel',
    muscles: { primary: 'Upper back, shoulders' },
    steps: [
      'Lie face down, arms extended in front of you, palms towards the floor.',
      'Lift the chest and arms slightly off the floor.',
      'Sweep the arms outwards in a wide arc down to the hips, like a snow angel in reverse.',
      'Bring the arms back forward along the same arc, under control.',
    ],
    mistakes: [
      'Lifting the chest too high: over-arches the lower back.',
      'A jerky movement instead of one wide, continuous arc.',
      'Shoulders riding up towards the ears during the sweep.',
    ],
    sensation:
      'Work concentrated between the shoulder blades and at the back of the shoulders, with a sense of opening across the chest. It is one of the rare equipment-free exercises that genuinely reaches this area.',
    rangeOfMotion:
      'The wide arc runs from arms extended in front all the way to the hips, staying as close to the floor as possible without touching. The useful range stops where the shoulder starts to roll forward.',
    tempo:
      'Slow and continuous, about three seconds per pass. This is not a strength exercise but a control exercise over a long range: speed would let momentum do the work instead of the muscles.',
    anatomy:
      'The middle and lower trapezius along with the rhomboids draw the shoulder blades together. The posterior deltoid works across the whole path, and the external rotators keep the arm oriented. The erector spinae hold the chest slightly lifted.',
    mechanics:
      'Horizontal adduction and abduction of the shoulder face down, with gravity resisting throughout the path. Unlike a standing movement where resistance varies sharply with angle, lying on the floor keeps resistance relatively constant from one end of the arc to the other.',
    benefits: [
      'Targets the upper back, the hardest area to reach without a pull-up bar or a resistance band.',
      'Directly complements wall slides in reclaiming the shoulder range lost to sitting.',
      'Trains postural endurance rather than maximal strength, which matches how these muscles are actually used.',
    ],
    progression: {
      easier: 'Bend the elbows to shorten the lever, or reduce the arc travelled.',
      harder: 'Fully extend the arms, slow down, or pause at both ends of the arc.',
      readyWhen: 'When three sets of twelve go by with straight arms and no shoulder rolling.',
    },
  },

  birdDog: {
    slug: 'bird-dog',
    muscles: { primary: 'Core, lower back', secondary: 'Glutes, shoulders' },
    steps: [
      'Get on all fours, hands under the shoulders, knees under the hips.',
      'Brace the core to keep the back flat, in line with the head.',
      'Extend one arm in front of you and the opposite leg behind you at the same time.',
      'Pause, keeping the hips still and level.',
      'Return to the start and repeat on the other side.',
    ],
    mistakes: [
      'The pelvis rotating or tipping to one side during the extension.',
      'The lower back arching to gain more range.',
      'Moving too fast: stability matters more than speed.',
    ],
    sensation:
      'A deep stabilising effort in the trunk and in the glute of the extended leg, more than a sense of strength in the limbs themselves. If you feel nothing in the trunk, the pelvis is probably moving and absorbing the work.',
    rangeOfMotion:
      'Extend arm and leg to horizontal, no higher. Lifting the leg further arches the lower back without adding anything — horizontal is the useful limit.',
    tempo:
      'Two seconds to extend, one to two seconds held, two seconds to return. The hold is the part that counts: that is when stabilisation is genuinely working.',
    anatomy:
      'The erector spinae and the multifidus, a deep segmental muscle of the spine, keep the back neutral. The obliques resist pelvic rotation, the gluteus maximus extends the hip, and the deltoid with the lower trapezius hold the arm horizontal.',
    mechanics:
      'An anti-rotation and anti-extension exercise: the weight of the opposing limbs creates a torque that tends to twist and arch the trunk, and the entire task is to prevent it. It is cross-body motor control — the same pattern as walking.',
    benefits: [
      'Strengthens lumbar stability with no compressive load on the spine, which often makes it well tolerated even with a sensitive back.',
      'Trains cross-body coordination of opposite arm and leg, directly transferable to walking.',
      'Reveals asymmetries immediately: one side will often be noticeably less stable than the other.',
    ],
    progression: {
      easier: 'Extend one limb at a time, arm alone then leg alone.',
      harder: 'Extend the hold, or add a knee-to-elbow draw under the body between each extension.',
      readyWhen:
        'When ten repetitions per side go by with a perfectly still pelvis, extend the hold to five seconds.',
    },
    precautions:
      'A mat or cushion under the knees stops joint discomfort ending the set before the muscles tire.',
  },

  catCow: {
    slug: 'cat-cow',
    muscles: { primary: 'Spine, back mobility' },
    steps: [
      'Get on all fours, hands under the shoulders, knees under the hips.',
      'Inhaling, drop the back downwards and lift the head (the "cow" position).',
      'Exhaling, round the back upwards and look towards your navel (the "cat" position).',
      'Flow between the two positions slowly, in time with your breathing.',
    ],
    mistakes: [
      'Moving too fast, disconnected from the breath.',
      'Forcing range beyond comfort, especially in the lower back.',
      'Letting the shoulders collapse instead of staying active in the hands.',
    ],
    sensation:
      'A progressive unrolling along the spine, vertebra by vertebra, rather than a muscular effort. What you are after is a sense of mobility opening up, not a contraction.',
    rangeOfMotion:
      'Go to the end of comfort in both directions, never forcing. The range opens naturally over the repetitions: this is the one exercise here where the day’s range is meant to grow during the set itself.',
    tempo:
      'The breath sets the tempo, not the other way round: inhale as you drop, exhale as you round. Count three to four seconds per position, with no dead time.',
    anatomy:
      'This is not a strengthening exercise. The erector spinae and the abdominals alternate between contraction and stretch to mobilise each vertebral segment. The deep intersegmental muscles work across the whole range.',
    mechanics:
      'Successive flexion then extension of the spine in the sagittal plane, unloaded — bodyweight rests on hands and knees, not on the spine. That is what allows free mobilisation, with no axial compression.',
    benefits: [
      'Restores the segmental spinal mobility that prolonged sitting stiffens.',
      'Makes an excellent warm-up before any back work, and a gentle transition at the end of a session.',
      'Explicitly pairs movement with breathing, which helps stop you holding your breath in other exercises.',
    ],
    precautions:
      'No pain should appear: this is mobility, not a forced stretch. If a segment stays stuck, reduce the range rather than pressing into it.',
  },

  reverseLunge: {
    slug: 'reverse-lunge',
    muscles: { primary: 'Quadriceps, glutes', secondary: 'Hamstrings' },
    steps: [
      'Stand with your feet hip-width apart.',
      'Step one leg back in a long stride, keeping the chest upright.',
      'Bend both knees until the back knee grazes the floor.',
      'Drive through the front heel to return to the start.',
      'Repeat on the other side.',
    ],
    mistakes: [
      'The front knee travelling well past the toes.',
      'The chest tipping forward instead of staying upright.',
      'Too short a step: reduces the range and the work on the glutes.',
    ],
    sensation:
      'Quadriceps and glute of the front leg, with a stretch across the front of the rear hip. Balance takes constant effort: that is normal, and it is part of the work.',
    rangeOfMotion:
      'Lower until the back knee grazes the floor without touching, front knee around 90°. Too short a step concentrates everything on the front knee; too long a step makes the return unstable.',
    tempo:
      'Two seconds down, one to two seconds up, with a brief pause at the bottom to remove any bounce. Exhale as you drive through the front heel.',
    anatomy:
      'The quadriceps and gluteus maximus of the front leg do most of the work. The gluteus medius stabilises the pelvis in the frontal plane — that is what stops the knee falling inwards. The psoas of the rear leg is placed under stretch, and the abdominals keep the torso vertical.',
    mechanics:
      'A unilateral lunge combining hip and knee flexion-extension in the sagittal plane, with a strong frontal stabilisation demand. Stepping back rather than forward reduces strain on the front knee: your weight stays on the leg already in place instead of being braked by the leg travelling forward.',
    benefits: [
      'Works each leg separately, which reveals and corrects the asymmetries a squat hides.',
      'Heavily taxes balance and the hip stabilisers, essential for walking and stairs.',
      'The reverse version is markedly kinder to the knee than the forward lunge, which suits a sensitive knee better.',
    ],
    progression: {
      easier: 'Keep one hand on a wall or chair back, and reduce the depth.',
      harder: 'Go lower, slow down, or raise the front foot on a small step.',
      readyWhen:
        'When ten repetitions per leg go by with no hand support and no knee falling inwards.',
    },
    precautions:
      'The front knee must stay in line with the foot. If it consistently caves inwards, the gluteus medius lacks strength: work standing hip abduction alongside it.',
  },

  stepUp: {
    slug: 'chair-step-up',
    muscles: { primary: 'Quadriceps, glutes', secondary: 'Hamstrings, balance' },
    steps: [
      'Stand in front of a low, stable chair, firmly planted on the floor.',
      'Place one foot fully on the seat.',
      'Push through that foot to bring your whole body up onto the chair.',
      'Step back down under control on the same foot, without dropping.',
      'Repeat, alternating legs.',
    ],
    mistakes: [
      'Pushing off with the leg on the floor instead of driving with the leg on the chair.',
      'The knee drifting inwards on the way up.',
      'An unstable or too-high chair: check that it does not tip.',
    ],
    sensation:
      'The quadriceps and glute of the driving leg, both going up and coming down. If you mostly feel the calf of the leg still on the floor, you are pushing off with it instead of driving with the top leg.',
    rangeOfMotion:
      'Rise to full extension of the supporting leg, then lower until the foot touches the floor without transferring your weight onto it. Step height sets the difficulty: mid-calf to begin, knee height for demanding work.',
    tempo:
      'One to two seconds up, two to three seconds down. The controlled descent is the most useful and most often rushed part — it is what reproduces going down stairs.',
    anatomy:
      'The quadriceps of the leg on the step extends the knee, the gluteus maximus extends the hip. The gluteus medius stabilises the pelvis in single-leg stance, stopping the opposite hip dropping. The calves contribute to the final push.',
    mechanics:
      'A unilateral closed-chain hip and knee extension against gravity, over the full height of the step. It reproduces the stair-climbing action exactly — one of the rare exercises whose carry-over to daily life is literal.',
    benefits: [
      'Directly reproduces an everyday action: climbing stairs, a kerb, or getting into a high vehicle.',
      'Loads one leg at a time, doubling the relative load with no equipment at all.',
      'The lowering phase trains eccentric control, precisely what is missing when going down stairs becomes hard.',
    ],
    progression: {
      easier: 'Choose a lower step and keep one hand for balance.',
      harder: 'Use a higher step, slow the descent, or pause at the top on one leg.',
      readyWhen:
        'When ten repetitions per leg go by with no hand support and no push-off from the floor leg, move up a level.',
    },
    precautions:
      'The stability of the support is non-negotiable: a chair that slides or tips makes this exercise dangerous. A stair step is often the better choice.',
  },

  lateralLunge: {
    slug: 'lateral-lunge',
    muscles: { primary: 'Quadriceps, glutes', secondary: 'Adductors' },
    steps: [
      'Stand with your feet together.',
      'Take a long step out to one side.',
      'Bend the knee of that leg while pushing the hips back, the other leg staying straight.',
      'Drive through the bent leg’s heel to return to the start.',
      'Repeat on the other side.',
    ],
    mistakes: [
      'The bent knee drifting inwards instead of staying in line with the foot.',
      'The heel of the bent leg lifting off the floor.',
      'The chest collapsing forward instead of staying upright.',
    ],
    sensation:
      'Quadriceps and glute of the bent leg, plus a distinct stretch on the inside of the straight thigh. That last sensation is often the most striking at first: the adductors are rarely worked through this range.',
    rangeOfMotion:
      'Lower as far as the inside of the opposite thigh allows without the bent leg’s heel lifting. Adductor flexibility is the limit at first, not strength — the range will open on its own.',
    tempo:
      'Two to three seconds down, one to two seconds up. Keep the chest upright and the toes pointing forward on both sides.',
    anatomy:
      'The quadriceps and gluteus maximus of the bent leg produce the movement. The adductors of the straight leg work under stretch, and the gluteus medius stabilises the pelvis. The movement runs in a plane that almost all conventional exercises ignore.',
    mechanics:
      'Hip and knee flexion-extension in the frontal plane, unlike the squat and the lunge which stay in the sagittal plane. That orientation is exactly what makes it complementary: it recruits muscles and ranges the others leave out.',
    benefits: [
      'Works the frontal plane, the great absentee from equipment-free programmes — hence its real value despite apparent overlap with the squat.',
      'Strengthens the adductors and lateral hip mobility, useful for avoiding stumbles and sideways loss of balance.',
      'Improves the ability to move sideways, a common daily action never otherwise trained.',
    ],
    progression: {
      easier: 'Narrow the step and reduce the depth, or keep one hand on a support.',
      harder: 'Widen the step, go lower, or slow the return.',
      readyWhen: 'When ten repetitions per side go by with the heel down and the chest upright.',
    },
    precautions:
      'With any discomfort on the inside of the thigh, narrow the stance sharply: adductors strain easily when maximum range is chased too soon.',
  },

  gluteBridge: {
    slug: 'glute-bridge',
    muscles: { primary: 'Glutes', secondary: 'Hamstrings, lower back' },
    steps: [
      'Lie on your back, knees bent, feet flat on the floor close to your glutes.',
      'Push through your heels to lift the hips towards the ceiling.',
      'Squeeze the glutes hard at the top, body aligned from knees to shoulders.',
      'Lower under control without dropping the hips.',
    ],
    mistakes: [
      'Pushing through the toes instead of the heels.',
      'Over-arching the lower back instead of finishing with a glute contraction.',
      'Not lifting high enough: the body should be in line at the top.',
    ],
    sensation:
      'The glutes, distinctly, with some hamstring. If the lower back works harder than the glutes, the lift is coming from lumbar arching rather than hip extension — the most widespread fault on this exercise.',
    rangeOfMotion:
      'Lift until knees, hips and shoulders are aligned, no higher. Trying to go further only adds arching: alignment is the useful ceiling.',
    tempo:
      'Two seconds up, one to two seconds squeezed at the top, two to three seconds down. The pause at the top with the glutes tight is what separates an effective bridge from a simple pelvic swing.',
    anatomy:
      'The gluteus maximus is the prime mover: it is the body’s most powerful hip extensor. The hamstrings assist, the erector spinae stabilise the spine without having to produce the movement, and the abdominals prevent excessive arching at the top.',
    mechanics:
      'Closed-chain hip extension with the back on the floor. The floor removes any balance demand and unloads the spine, which allows the gluteus maximus to be targeted in isolation — hard to do standing, where quadriceps and calves always join in.',
    benefits: [
      'Targets the gluteus maximus more directly than the squat, where the quadriceps take a large share of the work.',
      'Counterbalances the glute inhibition installed by prolonged sitting.',
      'Works with no load on the spine, which often makes it accessible even when standing movements are not yet.',
    ],
    progression: {
      easier: 'Reduce the height of the lift, or bring the feet closer to the glutes.',
      harder: 'Move to one leg, the other knee drawn to the chest, or extend the top squeeze to five seconds.',
      readyWhen:
        'When three sets of fifteen go by with a firm squeeze at the top and no hamstring cramp, move to one leg.',
    },
    precautions:
      'A hamstring cramp at the top usually means the glutes are not taking their share: bring the feet closer and focus on pushing through the heels.',
  },

  donkeyKick: {
    slug: 'donkey-kick',
    muscles: { primary: 'Glutes', secondary: 'Core' },
    steps: [
      'Get on all fours, hands under the shoulders, knees under the hips.',
      'Keep one knee bent at 90° and push that foot towards the ceiling.',
      'Squeeze the glute at the top, without arching the lower back.',
      'Lower under control without resting the knee down between repetitions.',
      'Finish the set, then switch sides.',
    ],
    mistakes: [
      'Arching the lower back to gain height.',
      'Moving too fast, swinging the leg instead of pushing it under control.',
      'The torso rotating instead of staying square to the floor.',
    ],
    sensation:
      'The glute of the lifting leg, in isolation. If the lower back hollows to gain height, the exercise has changed nature: it is no longer working the glute but the lumbar muscles.',
    rangeOfMotion:
      'Lift until the thigh reaches the line of the torso, no further. The stopping point is where the pelvis would start to tip — often much lower than you would think.',
    tempo:
      'Two seconds to push, one second squeezed at the top, two seconds down without resting the knee. The movement must be pushed, never thrown.',
    anatomy:
      'The gluteus maximus extends the hip, with the knee held bent to shorten the hamstrings and stop them taking over. The gluteus medius and the obliques on the opposite side stabilise the pelvis against rotation.',
    mechanics:
      'Open-chain hip extension with a bent knee. Keeping the knee flexed is a deliberate mechanical constraint: it places the hamstrings in active insufficiency, concentrating the extension on the gluteus maximus.',
    benefits: [
      'Isolates the glute with very little help from other groups, which is rare without equipment.',
      'Teaches the dissociation between hip extension and lumbar arching — a distinction that pays off in every other posterior-chain exercise.',
      'Puts no load on the spine, the quadruped position spreading bodyweight across four points of support.',
    ],
    progression: {
      easier: 'Reduce the range and focus on the contraction rather than the height.',
      harder: 'Extend the squeeze at the top, or move onto the forearms, which raises the stabilisation demand.',
      readyWhen:
        'When fifteen repetitions per side go by with no hollowing of the lower back and no pelvic rotation.',
    },
  },

  hipAbduction: {
    slug: 'standing-hip-abduction',
    muscles: { primary: 'Gluteus medius (side of the hip)' },
    steps: [
      'Stand up, resting lightly on a chair or wall if you need balance.',
      'Keep the supporting leg slightly bent and the chest upright.',
      'Lift the other leg out to the side, straight, without leaning the torso.',
      'Lower under control without dropping the foot down.',
      'Finish the set, then switch legs.',
    ],
    mistakes: [
      'Leaning the torso the other way to gain height: that is cheating, not extra effect.',
      'Swinging the leg forward instead of lifting it squarely out to the side.',
      'Moving too fast, in a swing.',
    ],
    sensation:
      'On the side of the hip, above the joint — an area few exercises reach. On the supporting leg, a quiet but real stabilising effort.',
    rangeOfMotion:
      'Lift the leg to roughly 30–45°, no more. Beyond that the quadratus lumborum takes over by tilting the torso: the apparent range grows, the gluteus medius work does not.',
    tempo:
      'Two seconds up, one second at the top, two seconds down. This muscle responds better to control and volume than to speed.',
    anatomy:
      'The gluteus medius is the prime mover, assisted by the gluteus minimus and the tensor fasciae latae. On the supporting leg, those same muscles work isometrically to stop the pelvis dropping on the lifted side.',
    mechanics:
      'Hip abduction in the frontal plane, open-chain on the working side and isometric stabilisation on the supporting side. Both hips therefore work at once, but in two different ways — a point often overlooked.',
    benefits: [
      'Strengthens the gluteus medius, whose weakness is a frequent cause of the knee caving inwards in squats, lunges and stair descents.',
      'Improves single-leg stability, which is to say half of every walking stride.',
      'Directly complements squats and lunges by correcting what makes them degrade.',
    ],
    progression: {
      easier: 'Hold a support with both hands and reduce the range.',
      harder:
        'Let go of the support, extend the hold at the top, or move to a side-lying position to remove all compensation.',
      readyWhen: 'When fifteen repetitions per side go by with no support and no torso lean.',
    },
  },

  sidePlank: {
    slug: 'side-plank',
    muscles: { primary: 'Obliques, lateral core' },
    steps: [
      'Lie on your side, resting on the forearm placed under the shoulder.',
      'Stack the feet one on the other, or stagger them for more stability.',
      'Lift the hips off the floor to line the body up straight.',
      'Hold the position breathing normally, without letting the hips drop.',
      'Finish the set, then switch sides.',
    ],
    mistakes: [
      'Hips sagging towards the floor during the hold.',
      'The shoulder sinking towards the ear instead of staying stacked over the elbow.',
      'The body rotating forwards or backwards.',
    ],
    sensation:
      'The side of the trunk, between the ribs and the hip, on the floor side. The supporting shoulder works too: if it sinks towards the ear, actively push the floor away to keep it stable.',
    rangeOfMotion:
      'No range, an alignment: ear, shoulder, hip and ankle on one line seen from the front. The hip is the point that gives way first — that is what to watch.',
    tempo:
      'A continuous hold, breathing normally. As with the standard plank, the stopping criterion is the position, not the clock: as soon as the hip drops, the set is over.',
    anatomy:
      'The internal and external obliques on the floor side drive the hold, assisted by the quadratus lumborum. The gluteus medius stabilises the pelvis in the frontal plane, and the serratus anterior keeps the supporting shoulder blade flat against the ribs.',
    mechanics:
      'An anti-lateral-flexion isometric: gravity pulls the hip towards the floor and the lateral chain stops it. It is the direct complement to the standard plank, which barely works this plane.',
    benefits: [
      'Works the lateral chain, forgotten by the standard plank and by most abdominal exercises.',
      'Strengthens pelvic stability in single-leg stance, which carries over to walking and to carrying a load on one side.',
      'Makes left-right asymmetries very visible: the time held often differs markedly.',
    ],
    progression: {
      easier: 'Bend the knees and rest on them rather than the feet: the lever shortens sharply.',
      harder: 'Extend the duration, lift the free arm to the ceiling, or lift the top leg.',
      readyWhen:
        'When thirty seconds per side go by with no hip drop, add complexity rather than extending indefinitely.',
    },
    precautions:
      'The elbow must be exactly under the shoulder. Too far forward or back and the strain shifts onto the joint instead of staying on the muscle.',
  },

  standingKneeRaise: {
    slug: 'standing-knee-raise',
    muscles: { primary: 'Core, hip flexors' },
    steps: [
      'Stand with your feet hip-width apart.',
      'Lift one knee towards your chest, keeping the back straight.',
      'Pause briefly at the top, core engaged.',
      'Lower under control and repeat, or alternate sides.',
    ],
    mistakes: [
      'The back rounding to lift the knee higher.',
      'Leaning back to compensate instead of keeping the chest upright.',
      'A thrown rather than controlled movement.',
    ],
    sensation:
      'The lower abdomen and the front of the hip on the lifting side, with a balance effort on the supporting leg. If the back arches or the chest tips back, the core is no longer holding the pelvis.',
    rangeOfMotion:
      'Lift the knee to hip height, no more. Going higher tips the pelvis backwards and transfers the work from the hip flexors to the lower back.',
    tempo:
      'One to two seconds up, a brief pause at the top, two seconds down. The controlled descent counts as much as the lift.',
    anatomy:
      'The iliopsoas and rectus femoris flex the hip. The abdominals, especially the transverse, stop the pelvis tipping — that co-contraction is what separates a genuine standing core exercise from a simple knee lift.',
    mechanics:
      'Open-chain hip flexion, doubled with a single-leg stabilisation demand. Standing adds a balance requirement absent from floor core work, which brings it closer to the real constraints of walking.',
    benefits: [
      'Works the core standing up, which is where it actually does its job.',
      'Trains single-leg balance, directly tied to walking stability.',
      'Needs no clean floor and no mat: practicable in street clothes, anywhere.',
    ],
    progression: {
      easier: 'Keep one hand lightly on a wall or chair back.',
      harder: 'Let go of the support, close your eyes, or extend the hold at the top.',
      readyWhen: 'When fifteen repetitions per leg go by with no support and no backward lean.',
    },
  },

  crunch: {
    slug: 'crunch',
    muscles: { primary: 'Abdominals (rectus abdominis)' },
    steps: [
      'Lie on your back, knees bent, feet flat on the floor.',
      'Place your hands lightly behind your ears or crossed on your chest, without pulling on the neck.',
      'Lift the shoulder blades off the floor as you exhale, contracting the abdominals.',
      'Lower under control until you brush the floor without releasing all your weight onto it.',
    ],
    mistakes: [
      'Pulling on the head with the hands to get higher: loads the neck instead of the abdominals.',
      'Coming all the way up to sitting: that is no longer a crunch, and the effect on the abdominals drops.',
      'Holding your breath instead of exhaling through the contraction.',
    ],
    sensation:
      'The upper abdominal wall, over a short range. Tension in the neck always means the hands are pulling on the head: they should only accompany it.',
    rangeOfMotion:
      'Lift the shoulder blades off the floor, nothing more. Continuing up to sitting shifts the work to the hip flexors — the short range is not a concession, it is the correct movement.',
    tempo:
      'Two seconds up as you exhale, two seconds down as you inhale, without fully releasing at the bottom so the tension stays.',
    anatomy:
      'The rectus abdominis draws the sternum towards the pelvis: that is the movement’s driver. The obliques contribute to stabilisation. The psoas barely intervenes as long as the range stays short — which is exactly what distinguishes a crunch from a full sit-up.',
    mechanics:
      'Spinal flexion in the sagittal plane, over a deliberately limited range. The movement puts the lumbar spine through repeated flexion: that is why it complements, but never replaces, anti-extension work like the plank or the dead bug.',
    benefits: [
      'Recruits the rectus abdominis directly, which isometric core exercises do not.',
      'Short range and floor position make it one of the most accessible ways to resume abdominal work.',
      'Combines well with the plank and the dead bug, which train stabilisation rather than flexion.',
    ],
    progression: {
      easier: 'Cross the arms on the chest rather than behind the head, and reduce the range.',
      harder: 'Slow down, pause at the top, or extend the arms overhead.',
      readyWhen: 'When three sets of twenty go by with no pull on the neck.',
    },
    precautions:
      'Repeated spinal flexion does not suit everyone. With any lumbar sensitivity, favour the dead bug and the plank, which produce abdominal work without flexing the spine.',
  },

  highKneeMarch: {
    slug: 'high-knee-march-in-place',
    muscles: { primary: 'Cardiovascular, hip flexors' },
    steps: [
      'Stand with your feet hip-width apart.',
      'Lift one knee to hip height, then set the foot down under control.',
      'Alternate legs at a steady rhythm, like marching on the spot.',
      'Keep the chest upright and let the arms move with you.',
    ],
    mistakes: [
      'A rushed rhythm that costs you control and balance.',
      'The chest leaning back to get the knee higher.',
      'Landing heavily on the foot at each step.',
    ],
    sensation:
      'Progressive breathlessness, plus work in the front of the hips and the calves. This is a cardio exercise, not a strength one: the fatigue should be respiratory before it is muscular.',
    rangeOfMotion:
      'Knee to hip height, foot fully down between each lift. Lifting higher adds nothing to the cardiovascular work and tips the pelvis.',
    tempo:
      'A steady rhythm you can sustain for the whole planned duration, not an acceleration followed by a collapse. The arms move naturally, in opposition to the legs.',
    anatomy:
      'The iliopsoas and rectus femoris flex the hip, the calves handle propulsion and landing. The abdominals stabilise the pelvis on each stance, and the gluteus medius of the supporting leg stops the opposite hip dropping.',
    mechanics:
      'Locomotion on the spot, with no travel and no flight phase: each foot returns to the ground before the other leaves it. That absence of suspension removes the impact, which clearly separates it from high-knee running.',
    benefits: [
      'Raises the heart rate with no travel and no equipment, in a single square metre.',
      'Serves as a complete warm-up at the start of a session, or a cardio boost between two strength exercises.',
      'Impact-free, unlike jumping: practicable in a flat and at any hour.',
    ],
    progression: {
      easier: 'Lower the knees and the rhythm, down to a simple march on the spot.',
      harder: 'Pick up the rhythm, extend the duration, or add an overhead arm movement.',
      readyWhen: 'When two sixty-second rounds go by with no marked breathlessness, extend the duration.',
    },
  },

  buttKickMarch: {
    slug: 'butt-kick-march-in-place',
    muscles: { primary: 'Cardiovascular, hamstrings' },
    steps: [
      'Stand with your feet hip-width apart.',
      'Bend one knee to bring the heel towards your glute.',
      'Set the foot down under control and repeat on the other side.',
      'Keep a moderate, steady rhythm, like marching on the spot.',
    ],
    mistakes: [
      'Too fast a rhythm, which shrinks the range of movement.',
      'The chest tipping forward during the exercise.',
      'The heel not coming up far enough: reduces the point of the movement.',
    ],
    sensation:
      'Moderate breathlessness and work at the back of the thighs. It is the natural counterpart to the high-knee march: where that one works the front of the hip, this one mobilises the back of the thigh.',
    rangeOfMotion:
      'Bring the heel as close to the glute as flexibility allows, without the knee travelling forward or the pelvis tipping. The chest stays upright throughout.',
    tempo:
      'A moderate, steady rhythm. The aim is endurance and mobilisation, not top speed: too fast and the range shrinks, and the exercise loses its point.',
    anatomy:
      'The hamstrings flex the knee — their primary action, and one rarely trained without equipment. The glutes maintain hip extension, and the abdominals prevent compensatory arching.',
    mechanics:
      'Repeated open-chain knee flexion, alternating, with no impact and no flight phase. Standing adds a single-leg balance component at each stance, absent from equivalent floor work.',
    benefits: [
      'Recruits the hamstrings in flexion, which no other equipment-free exercise in this library does directly.',
      'Complements the high-knee march to balance the front and back of the thigh.',
      'An excellent warm-up before any leg work, and impact-free.',
    ],
    progression: {
      easier: 'Slow down and reduce the range, down to a simple march on the spot.',
      harder: 'Pick up the pace slightly, extend the duration, or pause with the heel at the glute.',
      readyWhen: 'When two sixty-second rounds go by with the full range held throughout.',
    },
    precautions:
      'A cramp at the back of the thigh usually signals insufficient warm-up: start with a simple march on the spot before adding the range.',
  },

  bandPullApart: {
    slug: 'band-pull-apart',
    muscles: { primary: 'Rear deltoids, rhomboids', secondary: 'Middle trapezius' },
    steps: [
      'Hold the band with both hands, arms extended in front of you at chest height, with slight tension already present.',
      'Pull your arms apart, keeping the elbows straight, until the band touches your chest.',
      'Squeeze your shoulder blades together at the end of the movement.',
      'Return slowly to the start position, controlling the band’s tension.',
    ],
    mistakes: [
      'Elbows bending during the pull-apart: it turns the movement into a row and reduces the work on the rear shoulder.',
      'Swinging the torso to help pull the arms apart.',
      'Snapping back on the return instead of controlling the band’s tension.',
    ],
    sensation:
      'The work should be felt between the shoulder blades and at the back of the shoulders, not in the forearms or biceps. Tension in the upper trapezius signals the shoulders rising instead of staying down.',
    rangeOfMotion:
      'Pull apart until the band touches your chest or upper torso, no further: beyond that, the tension drops and the shoulders take over.',
    tempo:
      'One to two seconds to pull apart, two to three to return while controlling the tension. Exhale pulling apart, inhale on the return.',
    anatomy:
      'The rear deltoids and rhomboids draw the shoulder blades toward the spine, the middle and lower trapezius stabilize the shoulder blade against the rib cage. The elbow extensors stay isometrically engaged to keep the arms straight throughout.',
    mechanics:
      'Horizontal shoulder abduction in the transverse plane, against increasing resistance: the band’s tension is lowest with arms extended in front and highest with arms apart — the opposite of a bodyweight load, which stays constant through the range.',
    benefits: [
      'Strengthens the back of the shoulder, often under-worked compared to the front in everyday movements.',
      'Balances the shoulders when several pushing movements (push-ups, presses) are already present in the session.',
      'Needs only a band and a square metre of floor.',
    ],
    progression: {
      easier: 'Use a lighter band, or hold it wider to reduce resistance.',
      harder: 'Use a stronger band, or slow the return down to four seconds.',
      readyWhen: 'When three sets of fifteen go by without the shoulders creeping up toward the ears.',
    },
    precautions:
      'Stop the movement if pain shows up at the front of the shoulder rather than between the shoulder blades: that signals a poor shoulder position.',
  },

  bandSquat: {
    slug: 'band-squat',
    muscles: { primary: 'Quadriceps, glutes', secondary: 'Glute medius, hamstrings' },
    steps: [
      'Place the band just above your knees, feet hip-width apart.',
      'Push your hips back and lower into a squat as usual, knees pressing the band outward.',
      'Lower until the thighs are close to parallel with the floor, weight on the heels.',
      'Push through the heels back to full extension, without letting the knees cave in.',
    ],
    mistakes: [
      'Letting the knees cave inward instead of pressing the band outward.',
      'Dropping down without control, letting the band snap the knees back in.',
      'Torso tipping too far forward.',
    ],
    sensation:
      'The work should be felt at the front of the thighs and on the side of the glutes, which have to actively press the band outward. Tension at the knee signals the knee-foot alignment isn’t being held.',
    rangeOfMotion:
      'Lower until the thighs are close to parallel with the floor, without exceeding what comfortable hip mobility allows.',
    tempo:
      'Three seconds to lower, one to two to rise. Inhale going down, exhale pushing through the heels.',
    anatomy:
      'The quadriceps and gluteus maximus remain the main movers of the squat; the band adds a lateral resistance that the gluteus medius must continuously counter to stop the knee caving in — something a bodyweight squat doesn’t demand in the same way.',
    mechanics:
      'Double flexion then double extension of the hip and knee in the sagittal plane, combined with resistance to hip abduction from the band in the frontal plane.',
    benefits: [
      'Builds on the classic squat by adding active gluteus medius work, useful for knee stability while walking and running.',
      'Gives immediate tactile feedback on knee alignment: if the band goes slack, the knee has caved in.',
      'Light, inexpensive equipment that’s easy to bring along.',
    ],
    progression: {
      easier: 'Use a less resistant band, or reduce how deep you lower.',
      harder: 'Use a stronger band, or add a two-second pause at the bottom.',
      readyWhen: 'When three sets of fifteen go by without the band ever going slack.',
    },
    precautions:
      'Pick a resistance that lets you keep the knees aligned for the whole set: a band strong enough to force them inward is counterproductive.',
  },

  dumbbellGobletSquat: {
    slug: 'dumbbell-goblet-squat',
    muscles: { primary: 'Quadriceps, glutes', secondary: 'Core, upper back' },
    steps: [
      'Hold a dumbbell vertically with both hands against your chest, elbows pointing down.',
      'Feet a little wider than hip-width, toes slightly turned out.',
      'Lower by pushing your hips back, elbows brushing the inside of the knees.',
      'Push through the heels back to full leg extension.',
    ],
    mistakes: [
      'Torso collapsing forward under the dumbbell’s weight.',
      'Heels lifting off the floor on the way down.',
      'Stopping short of full range due to ankle mobility rather than choice.',
    ],
    sensation:
      'The work should be felt at the front of the thighs and the glutes, plus isometric tension in the upper back and forearms holding the dumbbell. The torso should stay upright from start to finish.',
    rangeOfMotion:
      'Lower until the elbows touch or brush the inside of the knees: holding the load in front of the body naturally allows a deeper squat than one with empty hands.',
    tempo:
      'Two to three seconds to lower, one to two to rise. Inhale going down, exhale pushing through the heels.',
    anatomy:
      'The quadriceps and gluteus maximus remain the main movers; holding the load against the chest forces the spinal erectors and abdominals to keep the torso upright against the tendency to tip forward — core work a bodyweight squat doesn’t demand to the same degree.',
    mechanics:
      'Double flexion then double extension of the hip and knee in the sagittal plane. Holding the load close to the centre of gravity, against the chest, keeps the torso more upright than a squat loaded on the back.',
    benefits: [
      'Adds progressive external load to a movement already mastered with bodyweight — the logical next step once the chair squat feels easy.',
      'Holding the load against the chest teaches an upright squat posture, useful for every loaded squat to come.',
      'Needs only a single dumbbell or an equivalent weight (a weighted bottle, a kettlebell).',
    ],
    progression: {
      easier: 'Use a lighter load, or go back to the unweighted chair squat for a while.',
      harder: 'Increase the load gradually, or slow the descent down to four seconds.',
      readyWhen: 'When three sets of ten go by with an upright torso and heels that never lift.',
    },
    precautions:
      'Increase the load in small steps: depth and control should stay intact first, not the number on the dumbbell.',
  },

  dumbbellRow: {
    slug: 'single-arm-dumbbell-row',
    muscles: { primary: 'Latissimus dorsi, trapezius', secondary: 'Biceps, core' },
    steps: [
      'Place one knee and the same-side hand on a stable bench or chair, back parallel to the floor.',
      'Hold the dumbbell in the other hand, arm extended toward the floor.',
      'Pull the dumbbell toward your hip, keeping the elbow close to the body, shoulder blade drawing toward the spine.',
      'Lower back down with control to full arm extension.',
    ],
    mistakes: [
      'Rotating the torso to help pull the dumbbell instead of letting the back do the work.',
      'Elbow flaring out from the body, turning the row into a shoulder movement.',
      'Back rounding instead of staying flat.',
    ],
    sensation:
      'The work should be felt in the middle of the back and under the armpit, with the shoulder blade clearly drawing toward the spine at the top of the movement. Tension in the lower back signals the bench support isn’t holding the torso enough.',
    rangeOfMotion:
      'Pull until the dumbbell touches or brushes the hip, elbow slightly past the back. Lower back to full arm extension to use the whole available range.',
    tempo:
      'One second to pull, two to three to lower while controlling the load. Exhale pulling, inhale lowering.',
    anatomy:
      'The latissimus dorsi and teres major draw the arm toward the body and extend it backward, the rhomboids and middle trapezius draw the shoulder blade toward the spine, the biceps assist by flexing the elbow. The knee-and-hand support on the bench stabilizes the torso to isolate the back’s work.',
    mechanics:
      'Shoulder extension and adduction in the sagittal plane, combined with shoulder blade retraction. The one-sided bench support removes the leg contribution present in a standing row.',
    benefits: [
      'Builds the pulling pattern, rarely present in a bodyweight session where back exercises stay isometric (superman, bird dog).',
      'The one-sided support lets each side work independently and reveals any strength difference between arms.',
      'A useful counterbalance to the pushing movements (push-ups, presses) already present in most sessions.',
    ],
    progression: {
      easier: 'Use a lighter load, or keep the torso more horizontal to reduce the range.',
      harder: 'Increase the load, or pause for one second at the top of the movement.',
      readyWhen: 'When three sets of ten go by with no torso rotation, on both sides.',
    },
    precautions:
      'Keep the back flat from start to finish: if the torso has to round to pull the load up, it’s too heavy.',
  },

  legPressMachine: {
    slug: 'leg-press',
    muscles: { primary: 'Quadriceps, glutes', secondary: 'Hamstrings' },
    steps: [
      'Sit on the machine, back and head firmly against the pad.',
      'Place your feet flat on the plate, hip-width apart.',
      'Release the safety catches and lower by bending the knees to close to a 90° angle.',
      'Push through the feet to full leg extension, without fully locking the knees.',
    ],
    mistakes: [
      'Fully locking the knees at the top of the push, shifting the load onto the joint.',
      'Lower back lifting off the pad on the way down.',
      'Lowering too deep, knees passing well beyond the chest.',
    ],
    sensation:
      'The work should be felt at the front of the thighs and the glutes, with no tension in the lower back: the pad supports the whole torso. Discomfort in the lower back signals a range too deep for the hip mobility of the day.',
    rangeOfMotion:
      'Lower to a knee angle close to 90°, or less if the lower back lifts off before that: the machine lets you fix this limit precisely from one session to the next.',
    tempo:
      'Two to three seconds to lower, one to push. Inhale going down, exhale pushing.',
    anatomy:
      'The quadriceps extend the knee, the gluteus maximus extends the hip — the same movers as a squat, but the machine’s back pad removes all the core and stabilizing work the squat asks of the torso.',
    mechanics:
      'Double extension of the hip and knee in the sagittal plane, on a guided path: unlike the squat, the torso stays fixed and only the load moves.',
    benefits: [
      'Lets the legs be loaded heavily without taxing the core or balance, useful alongside or as a temporary substitute for the squat.',
      'The guided path reduces the risk of technique error compared with a loaded free movement.',
      'Makes fine adjustments to the load easy, step by step.',
    ],
    progression: {
      easier: 'Reduce the load, or limit the descent to a 70-80° bend.',
      harder: 'Increase the load, or slow the descent down to four seconds.',
      readyWhen: 'When three sets of ten go by without the lower back lifting off the pad.',
    },
    precautions:
      'Never fully lock the knees at the top of the push, and never let the lower back lift off the pad: those are the machine’s two safety points.',
  },

  latPulldownMachine: {
    slug: 'lat-pulldown',
    muscles: { primary: 'Latissimus dorsi', secondary: 'Biceps, trapezius' },
    steps: [
      'Sit facing the machine, thighs braced under the rollers if the machine has them.',
      'Grip the bar wider than your shoulders, arms extended.',
      'Pull the bar down to your upper chest, keeping the torso upright, elbows dropping toward the hips.',
      'Rise back up with control to full arm extension.',
    ],
    mistakes: [
      'Leaning far back to help pull the bar down.',
      'Pulling the bar behind the neck instead of to the front of the chest.',
      'Rising back up too fast, without controlling the load.',
    ],
    sensation:
      'The work should be felt in the middle and lower back, down under the armpit. Tension in the upper trapezius or neck signals the shoulders rising instead of staying down.',
    rangeOfMotion:
      'Pull until the bar touches the upper chest, elbows dropping alongside the body. Rise back to full arm extension to use the whole range.',
    tempo:
      'One to two seconds to pull, two to three to rise while controlling the load. Exhale pulling, inhale rising.',
    anatomy:
      'The latissimus dorsi adducts and extends the shoulder, the rhomboids and middle trapezius draw the shoulder blade toward the spine, the biceps assist by flexing the elbow. It’s the vertical-pull equivalent of a pull-up, guided and progressively loadable.',
    mechanics:
      'Shoulder adduction and extension in the sagittal plane, combined with shoulder blade depression and retraction, on a machine-guided path.',
    benefits: [
      'Builds the vertical pulling strength needed to progress toward a pull-up, a movement bodyweight alone makes hard to access.',
      'Lets the load be dosed precisely, unlike a bodyweight pull-up where only total body weight can be adjusted.',
      'Strengthens the back as a mirror to the pushing movements already present in most sessions.',
    ],
    progression: {
      easier: 'Reduce the load, or use a narrower grip to shorten the lever arm.',
      harder: 'Increase the load, or pause for one second at the bottom of the movement.',
      readyWhen: 'When three sets of ten go by without the torso leaning back.',
    },
    precautions:
      'Always pull the bar to the front of the chest, never behind the neck: that older variant puts the shoulder in a risky position for minimal gain.',
  },

  hamstringStretch: {
    slug: 'hamstring-stretch',
    muscles: { primary: 'Hamstrings' },
    steps: [
      'Rest one heel on a stable support (a step, a low chair), leg straight.',
      'Keep the other leg slightly bent, foot firmly planted.',
      'Hinge your torso forward from the hips, back flat, until you feel tension at the back of the thigh.',
      'Hold the position steadily, breathing calmly.',
    ],
    mistakes: [
      'Rounding the back to reach further instead of hinging from the hips.',
      'Bouncing in the stretch instead of holding a steady position.',
      'Fully locking the knee of the straight leg.',
    ],
    sensation:
      'The tension should be felt along the whole back of the thigh, never in the knee or lower back. Sharp pain rather than tension signals to stop and reduce the range.',
    rangeOfMotion:
      'Hinge forward until you feel a clear but tolerable tension, never pain. The comfortable range naturally increases from one session to the next.',
    tempo:
      'No execution rhythm: the position is held still. Breathe slowly and deeply for the whole hold.',
    anatomy:
      'The hamstrings, which flex the knee and extend the hip, are put under passive tension by hip flexion combined with knee extension. No active muscle contraction is sought here, only progressive release under tension.',
    mechanics:
      'Passive tensioning of the hamstrings through simultaneous hip flexion and knee extension, in the sagittal plane, with no load and no repeated movement.',
    benefits: [
      'Maintains flexibility at the back of the thigh, often shortened by prolonged sitting.',
      'Eases the range of hip-flexion movements (lunges, deep squats) done elsewhere in the session.',
      'Can be done anywhere with a simple step or ledge as support.',
    ],
    precautions:
      'Never force past a tolerable tension, and avoid this stretch cold before an intense effort: it fits better at the end of a session or away from the effort.',
  },

  chestDoorwayStretch: {
    slug: 'doorway-chest-stretch',
    muscles: { primary: 'Pectorals', secondary: 'Front deltoids' },
    steps: [
      'Stand in a doorway, forearm against the frame, elbow at shoulder height.',
      'Feet slightly staggered, one in front of the other for stability.',
      'Gently lean your torso forward through the doorway until you feel tension at the front of the shoulder and across the chest.',
      'Hold the position steadily, breathing calmly.',
    ],
    mistakes: [
      'Elbow placed too high or too low, shifting the tension toward the shoulder instead of the chest.',
      'Leaning in too abruptly instead of easing forward gradually.',
      'Arching the lower back excessively to reach further.',
    ],
    sensation:
      'The tension should be felt at the front of the shoulder and across the chest of the engaged arm, never in the joint itself. Pain at the front of the shoulder signals to ease back slightly.',
    rangeOfMotion:
      'Lean in until you feel a clear but tolerable tension. Elbow height changes what’s stretched: lower reaches the lower chest, higher moves toward the upper chest and shoulder.',
    tempo:
      'No execution rhythm: the position is held still. Breathe slowly — exhaling often helps release the tension a little further.',
    anatomy:
      'The pectoralis major, which adducts and flexes the shoulder forward, is put under passive tension by the open position the doorframe imposes. The front deltoid, often shortened by the same repetitive movements, is stretched in the same position.',
    mechanics:
      'Passive tensioning of the chest through horizontal shoulder extension fixed by the doorframe’s contact point, with no load and no repeated movement.',
    benefits: [
      'Counters the chest shortening caused by prolonged closed-forward positions (screens, driving, repeated pushing).',
      'Eases the range of pushing and chest-opening movements done elsewhere in the session.',
      'Needs no equipment at all, just a doorway.',
    ],
    precautions:
      'Never force past a tolerable tension, especially with a known shoulder issue: ease the arm position back first before giving up on the stretch.',
  },

  squat: {
    slug: 'squat',
    muscles: { primary: 'Quadriceps, glutes', secondary: 'Hamstrings, core' },
    steps: [
      'Stand with your feet hip-width apart, toes slightly turned out.',
      'Push your hips back, then bend the knees, keeping them tracking over the feet.',
      'Lower until the thighs are close to parallel, weight spread across the whole foot.',
      'Keep the torso upright and the gaze forward, without rounding the lower back.',
      'Drive back up through the heels to full hip extension.',
    ],
    mistakes: [
      'Knees caving inward on the way up.',
      'Heels lifting: a sign of limited ankle mobility, not of missing strength.',
      'Lower back rounding at the bottom, when the depth exceeds available hip mobility.',
    ],
    sensation:
      'The work is felt in the front of the thighs and the glutes, with solid pressure across the whole foot. Tension isolated at the front of the knee signals that the hips are not moving back enough and the movement is starting from the knee alone.',
    rangeOfMotion:
      'Go as low as your mobility allows without the lower back rounding — the back is the cue, not a target angle. Thighs close to parallel is enough to load the whole chain.',
    tempo:
      'Two to three seconds down, one to two up. Inhale on the way down, exhale pushing through the heels.',
    anatomy:
      'The quadriceps extend the knee and the gluteus maximus extends the hip: both movers work together. Hamstrings and adductors stabilize, the gluteus medius stops the knee caving in, and the spinal erectors with the abdominal wall keep the torso braced.',
    mechanics:
      'Double flexion then double extension of the hip and knee in the sagittal plane, in a closed chain. The descent is eccentric, the ascent concentric. With no chair or external marker, ankle and hip mobility set the depth you can reach.',
    benefits: [
      'The base movement of the whole lower chain: it is the free version the chair squat prepares you for.',
      'Needs no equipment and no support, so it travels anywhere once the depth is under control.',
      'Serves as the foundation for every loaded variation — goblet squat, leg press — which change the load, not the movement.',
    ],
    progression: {
      easier: 'Go back to the chair squat, which gives a constant depth marker.',
      harder: 'Slow the descent to five seconds, pause at the bottom, or move to a loaded goblet squat.',
      readyWhen: 'When three sets of fifteen go by with no knee cave and no heel lift, add load.',
    },
    precautions:
      'If the knee hurts, reduce the depth rather than the number of repetitions: a pain-free partial range beats a full range that hurts.',
  },

  pushup: {
    slug: 'push-ups',
    muscles: { primary: 'Chest, triceps', secondary: 'Shoulders, core' },
    steps: [
      'Support yourself on your hands and toes, hands slightly wider than the shoulders and under the shoulder line.',
      'Squeeze the glutes and brace the abdominals to align the body from heels to head.',
      'Lower with the elbows around 45° from the torso, until the chest brushes the floor.',
      'Push back up to full arm extension without letting the back sag.',
    ],
    mistakes: [
      'Hips sagging: the core gives out before the arms, and the lower back takes it.',
      'Elbows flaring to 90° out to the sides, which puts the shoulder in a poor position.',
      'Cutting the range short for lack of strength, when an easier variation through the full range progresses better.',
    ],
    sensation:
      'The work is felt in the chest, the back of the arms and the core, which holds the body line from start to finish. Tension in the lower back means the hips have dropped.',
    rangeOfMotion:
      'Lower until the chest brushes the floor, then push back to straight arms without snapping the elbows locked. The full range is what separates a push-up from a partial movement.',
    tempo:
      'Two seconds down, one up. Inhale on the way down, exhale pushing.',
    anatomy:
      'The pectoralis major and the triceps brachii are the movers, with the front deltoid assisting. The serratus anterior keeps the shoulder blade flat against the rib cage; abdominals and glutes stop the hips sagging, which makes the push-up as much a bracing exercise as a pressing one.',
    mechanics:
      'Elbow flexion and extension combined with horizontal shoulder adduction, in a closed chain, the body moving around a fixed support. It is the top rung of the ladder that wall, incline and knee push-ups prepare: the lever lengthens at each step, so relative load rises without the movement changing.',
    benefits: [
      'The reference pressing movement, with no equipment and no support: it is the target every assisted variation leads to.',
      'Strengthens pressing and bracing at once, which no press machine does.',
      'Adjusts finely by changing the height of the support, with no load to add.',
    ],
    progression: {
      easier: 'Go back to knee or incline push-ups: the body line stays the same, only the lever shortens.',
      harder: 'Elevate the feet, slow the descent to four seconds, or pause at the bottom.',
      readyWhen: 'When three sets of twelve go by with the body aligned throughout, elevate the feet.',
    },
    precautions:
      'A sore wrist is often relieved by pressing on closed fists or on handles, which keeps the wrist in line with the forearm.',
  },

  pikePushup: {
    slug: 'pike-push-ups',
    muscles: { primary: 'Shoulders', secondary: 'Triceps, core' },
    steps: [
      'Start in a push-up position, then walk the feet in and push the hips up into an inverted V.',
      'Hands slightly wider than the shoulders, head relaxed between the arms.',
      'Bend the elbows to lower the crown of your head toward the floor, between the hands.',
      'Push back up to straight arms with the hips still high.',
    ],
    mistakes: [
      'Hips dropping mid-set: the movement turns back into a plain push-up and leaves the shoulders.',
      'Elbows flaring wide instead of staying in line with the movement.',
      'Lowering to the forehead rather than the crown, which cuts the range short.',
    ],
    sensation:
      'The work is felt clearly in the shoulders and the back of the arms, not in the chest. If the chest takes over, the hips are not high enough.',
    rangeOfMotion:
      'Lower until the crown of the head brushes the floor. The closer the feet are to the hands, the more of your weight passes through the shoulders: that is the difficulty dial.',
    tempo:
      'Two seconds down, one up. Exhale pushing.',
    anatomy:
      'The front deltoid and the triceps are the movers, while the upper trapezius and the serratus anterior stabilize the shoulder blade as the arm travels overhead. The core holds the V position, which is what steers the load toward the shoulder rather than the chest.',
    mechanics:
      'Vertical pressing in a closed chain: the bodyweight equivalent of an overhead press, torso angle standing in for load selection. Elbow flexion and extension combined with overhead shoulder flexion.',
    benefits: [
      'The only bodyweight shoulder exercise in this library: without it, filtering by "bodyweight" offered no shoulder work at all.',
      'Builds overhead pressing without needing dumbbells.',
      'Adjusts finely by walking the feet in or out, with no equipment.',
    ],
    progression: {
      easier: 'Put the hands on a raised surface: less weight passes through the shoulders.',
      harder: 'Walk the feet closer to the hands, or elevate the feet to make the torso more vertical.',
      readyWhen: 'When three sets of twelve go by with the hips high throughout, elevate the feet.',
    },
    precautions:
      'This movement takes the arms overhead: if the shoulder hurts there, keep the press to a shorter range rather than forcing the V position.',
  },

  mountainClimber: {
    slug: 'mountain-climbers',
    muscles: { primary: 'Cardio, core', secondary: 'Shoulders, hip flexors' },
    steps: [
      'Set up in a straight-arm push-up position, hands under the shoulders, body aligned.',
      'Drive one knee toward the chest without the hips rising or sagging.',
      'Put the foot back down and switch straight to the other leg.',
      'Hold a steady rhythm for the whole duration, breathing continuously.',
    ],
    mistakes: [
      'Hips rising with every leg switch: the core has given out and the exercise becomes a bounce.',
      'Hands too far forward of the shoulders, which loads the wrist and shoulder for nothing.',
      'Rhythm too fast at the cost of knee range.',
    ],
    sensation:
      'The breath climbs quickly, and the core works continuously to stop the hips moving. The shoulders carry the weight of the upper body for the whole set.',
    rangeOfMotion:
      'Drive the knee as far as the hips can stay still — the hips set the range, not the wish to go further.',
    tempo:
      'A steady rhythm you can hold for the whole duration, rather than a fast start followed by a collapse. Breathe continuously: holding your breath is the first sign the pace is too high.',
    anatomy:
      'The hip flexors draw the knee toward the chest, while the abdominals and the gluteus maximus of the supporting side stop the pelvis tipping. Shoulders and triceps work isometrically to hold the high plank.',
    mechanics:
      'Alternating open-chain hip flexion and extension on a high-plank base, so with a closed support on the hands. It is a cardio exercise whose main constraint stays trunk stability: the pace raises the heart rate, the bracing decides the quality.',
    benefits: [
      'Raises the heart rate without moving anywhere and without equipment, in very little space.',
      'Combines cardio work with dynamic bracing, which neither walking nor the plank does alone.',
      'Scales by rhythm rather than by load, so it fits every level without changing anything.',
    ],
    progression: {
      easier: 'Slow right down, or put the hands on a raised surface to unload the shoulders.',
      harder: 'Raise the pace or extend the duration, as long as the hips stay still.',
      readyWhen: 'When three rounds of forty seconds go by with no hip rise, extend the duration.',
    },
    precautions:
      'Sensitive wrists or shoulders: raise the hands onto a bench or a step, which markedly reduces the load on the support without changing the leg work.',
  },

  legSwing: {
    slug: 'leg-swings',
    muscles: { primary: 'Hips, mobility', secondary: 'Glutes, hamstrings' },
    steps: [
      'Stand sideways to a wall or a chair back, one hand resting on it.',
      'Shift your weight onto the inside leg, leaving the other free to swing.',
      'Swing the free leg front to back, without forcing at the end of the range.',
      'Build the range gradually across the repetitions, keeping the pelvis still.',
      'Switch sides halfway through the time.',
    ],
    mistakes: [
      'Pelvis tipping to reach further, instead of letting the hip do the work alone.',
      'Going to maximum range immediately, when it is meant to open up gradually.',
      'Lower back arching as the leg travels backward.',
    ],
    sensation:
      'A hip loosening up, with no marked muscular effort. This is getting moving, not strengthening: if it pulls hard, the range is already too big for the start of a session.',
    rangeOfMotion:
      'Go as far as the pelvis stays still. Today’s range is meant to grow during the set itself, exactly as with cat-cow.',
    tempo:
      'A steady, controlled swing, never thrown. The movement stays driven, not left to momentum.',
    anatomy:
      'The hip flexors and the gluteus maximus alternate dynamic contraction and lengthening, while the standing leg and the core stabilize the pelvis. The work is on hip joint mobility, not on strength.',
    mechanics:
      'Alternating open-chain hip flexion and extension in the sagittal plane, with no load. The controlled ballistic movement prepares the range that lunges and squats will then use under load.',
    benefits: [
      'Prepares the hip before any leg work, which no other warm-up in this library did — they were all upper body.',
      'Done anywhere with a simple support, in thirty seconds a side.',
      'Opens the hip range used by the lunges, squats and step-ups that follow.',
    ],
    precautions:
      'No jerking at the end of the range: this is a driven swing, not a throw. If the hip catches, reduce the range rather than pushing through.',
  },

  torsoTwist: {
    slug: 'torso-twists',
    muscles: { primary: 'Obliques, trunk mobility', secondary: 'Spine' },
    steps: [
      'Stand with your feet shoulder-width apart, firmly planted.',
      'Bend the knees slightly and let the arms hang relaxed.',
      'Rotate the torso to one side, letting the arms follow rather than throwing them.',
      'Continue to the other side at a steady rhythm, the pelvis staying square to the front.',
    ],
    mistakes: [
      'Pelvis turning with the torso: the rotation stops happening in the trunk and moves to the hips.',
      'Thrown arms dragging the torso instead of following it.',
      'A rhythm fast enough to turn mobilization into a jolt.',
    ],
    sensation:
      'A rotation that frees up progressively along the trunk, with no marked muscular effort and no jolt in the lower back.',
    rangeOfMotion:
      'Turn to the end of what is comfortable, without forcing. As with any mobility work, the range opens up across the repetitions.',
    tempo:
      'Steady and moderate, roughly one rotation per second. Breathe freely, without holding your breath at the end of the turn.',
    anatomy:
      'The external and internal obliques produce trunk rotation, while the deep intersegmental muscles mobilize each vertebral level. The glutes and legs stabilize the pelvis, which is precisely what forces the rotation to come from the trunk.',
    mechanics:
      'Alternating spinal rotation in the transverse plane, under light load (the weight of the torso alone). The fixed pelvis is the reference: it is what separates a true trunk rotation from a simple hip pivot.',
    benefits: [
      'The only trunk warm-up in this library, complementing cat-cow which works flexion and extension rather than rotation.',
      'Prepares the anti-rotation bracing exercises such as the dead bug and the bird dog.',
      'Done standing, with no equipment and no mat.',
    ],
    precautions:
      'The lower back should never be the engine of the rotation: if discomfort appears there, reduce the range and check that the pelvis is still square to the front.',
  },

  quadStretch: {
    slug: 'standing-quad-stretch',
    muscles: { primary: 'Quadriceps' },
    steps: [
      'Standing, put one hand on a wall for balance.',
      'Grab the ankle on the same side as the leg you are stretching and draw the heel toward the glute.',
      'Keep both knees side by side and the pelvis slightly tucked.',
      'Hold steadily, breathing calmly, then switch sides.',
    ],
    mistakes: [
      'The stretched knee drifting forward or out to the side, which moves the tension off the quadriceps.',
      'Arching the lower back to gain range.',
      'Yanking on the ankle instead of holding a steady position.',
    ],
    sensation:
      'The tension is felt across the whole front of the thigh, never in the knee itself. Pain at the front of the knee means release immediately.',
    rangeOfMotion:
      'Draw the heel in until you feel a clear but tolerable tension. Bringing the knee back level with the other and tucking the pelvis increases the stretch without loading the joint.',
    tempo:
      'No rhythm: the position is held still. Breathe slowly for the whole hold.',
    anatomy:
      'The quadriceps, which extends the knee, is put under passive tension by knee flexion; the rectus femoris, the only head that also crosses the hip, is stretched further when the hip is extended — hence the value of not letting the knee drift forward.',
    mechanics:
      'Passive tensioning through simultaneous knee flexion and hip extension, in the sagittal plane, with no load and no repeated movement.',
    benefits: [
      'Complements the hamstring stretch to cover both faces of the thigh.',
      'Maintains knee flexion range, often reduced by prolonged sitting.',
      'Needs nothing but a support for balance.',
    ],
    precautions:
      'If you cannot reach the ankle, loop a strap or a towel around the foot rather than leaning the torso back to get to it.',
  },

  gluteStretch: {
    slug: 'figure-four-glute-stretch',
    muscles: { primary: 'Glutes', secondary: 'Hip rotators' },
    steps: [
      'Lie on your back, knees bent, feet on the floor.',
      'Rest one ankle across the opposite knee, forming a figure four.',
      'Reach your hands behind the supporting thigh and draw it gently toward you.',
      'Keep the head and shoulders on the floor, then switch sides.',
    ],
    mistakes: [
      'Head and shoulders lifting off the floor, which tenses the neck without adding anything to the stretch.',
      'Pulling in jerks instead of settling into steady traction.',
      'Pushing the crossed knee inward, which closes the hip instead of opening it.',
    ],
    sensation:
      'The tension is felt deep in the glute on the crossed side, sometimes out toward the side of the hip. Nothing should pull in the crossed knee.',
    rangeOfMotion:
      'Draw the supporting thigh in until you feel a clear but tolerable tension. The closer the thigh comes to the chest, the stronger the stretch.',
    tempo:
      'No rhythm: the position is held still, breathing slowly. Exhaling often helps release a little further.',
    anatomy:
      'The gluteus maximus and the deep external hip rotators, including the piriformis, are put under passive tension by the combination of hip flexion and external rotation the figure-four position creates.',
    mechanics:
      'Passive tensioning through hip flexion combined with external rotation, fully unloaded — the back stays on the floor, which avoids any spinal compression during the stretch.',
    benefits: [
      'Targets an area the thigh stretches do not reach, and one that stiffens with prolonged sitting.',
      'Done on the floor with no balance to hold, so it stays accessible even when the hip is stiff.',
      'Complements the glute work (bridge, abduction) with the matching mobility.',
    ],
    precautions:
      'If the crossed hip catches or pinches, ease off the traction: a shallower, pain-free position beats a forced one.',
  },

  calfStretch: {
    slug: 'wall-calf-stretch',
    muscles: { primary: 'Calves' },
    steps: [
      'Place your hands flat on a wall at chest height.',
      'Step one leg back, keeping it straight, heel down and foot pointing forward.',
      'Bend the front leg and push your hips forward until you feel the stretch in the back calf.',
      'Hold steadily, then switch legs.',
    ],
    mistakes: [
      'The back heel lifting: the stretch disappears instantly.',
      'The back foot turned out, which shifts the strain onto the ankle.',
      'Hips moving backward instead of forward, which cancels the tension.',
    ],
    sensation:
      'The tension is felt down the back of the rear leg, from behind the knee to the heel. Bending the back knee slightly moves the tension lower into the calf.',
    rangeOfMotion:
      'Push the hips forward to a clear but tolerable tension, heel still down — the heel sets the limit, not the distance between the feet.',
    tempo:
      'No rhythm: the position is held still, with slow steady breathing.',
    anatomy:
      'The triceps surae — the gastrocnemius and the soleus — is put under tension by ankle dorsiflexion. With the back knee straight the tension falls mainly on the gastrocnemius, which also crosses the knee; with the knee slightly bent it shifts to the soleus.',
    mechanics:
      'Passive tensioning through ankle dorsiflexion against a fixed support, with no load and no repeated movement.',
    benefits: [
      'Maintains ankle dorsiflexion, the lack of which is the first cause of heels lifting in a squat.',
      'Takes the calves out of isolation: it was the only group with a single exercise in the library.',
      'Needs nothing but a wall.',
    ],
    precautions:
      'A sharp, localized tension in the Achilles tendon is not the stretch you are looking for: move the hips back and reduce the range.',
  },

  childPose: {
    slug: 'childs-pose',
    muscles: { primary: 'Back, mobility', secondary: 'Hips, shoulders' },
    steps: [
      'Start on all fours, knees about hip-width apart.',
      'Sit back progressively onto your heels, leaving the hands where they are.',
      'Reach the arms far forward and let the forehead lower toward the floor.',
      'Breathe slowly, letting the back round a little more with each exhale.',
    ],
    mistakes: [
      'Shoulders hunched toward the ears instead of letting the torso release.',
      'Forcing the hips onto the heels when ankle or knee mobility does not allow it.',
      'Holding the breath, when it is the breathing that opens the position up.',
    ],
    sensation:
      'A diffuse stretch along the back and across the back of the shoulders, with a sense of release rather than traction. Nothing should pull in the knees.',
    rangeOfMotion:
      'Sit back as far as comfort allows; how wide the knees are set decides how much room the torso has. The position opens on its own across the breaths.',
    tempo:
      'No execution rhythm: the position is held. It is the exhales that grow the range, not effort.',
    anatomy:
      'This is not strengthening: the spinal erectors and the latissimus dorsi are passively lengthened while the hips move into full flexion. It is the static counterpart of cat-cow, which mobilizes the same area dynamically.',
    mechanics:
      'Global flexion of the spine and hips while unloaded, the bodyweight resting on the thighs and arms rather than on the spine.',
    benefits: [
      'The only back stretch in this library, the static complement to cat-cow.',
      'Works as a transition at the end of a session, or as recovery between two demanding back sets.',
      'Needs no equipment, just a comfortable floor.',
    ],
    precautions:
      'A knee that hurts in this position is relieved by sliding a cushion between the hips and the heels, rather than by giving up on the pose.',
  },

  tricepsStretch: {
    slug: 'overhead-triceps-stretch',
    muscles: { primary: 'Triceps', secondary: 'Shoulders' },
    steps: [
      'Standing or seated, raise one arm and bend the elbow to place the hand between the shoulder blades.',
      'The elbow points at the ceiling, as close to the head as possible.',
      'Grasp that elbow with the other hand and ease it gently backward.',
      'Hold without jerking, then switch arms.',
    ],
    mistakes: [
      'Arching the lower back to give the illusion of a further-back elbow.',
      'Pushing the elbow in jerks instead of applying steady pressure.',
      'Letting the arm push the head forward, which tenses the neck.',
    ],
    sensation:
      'The tension is felt at the back of the arm, from the elbow toward the shoulder. Discomfort in the shoulder joint itself means ease off the pressure.',
    rangeOfMotion:
      'Ease the elbow back to a clear but tolerable tension. What limits you is overhead shoulder range, not the strength of the pushing hand.',
    tempo:
      'No rhythm: the position is held still, breathing slowly.',
    anatomy:
      'The triceps brachii, the only elbow extensor, is tensioned by full elbow flexion; its long head, which also crosses the shoulder, is stretched further with the arm raised overhead — which is why the elbow points at the ceiling.',
    mechanics:
      'Passive tensioning through elbow flexion and overhead shoulder flexion, with no load and no repeated movement.',
    benefits: [
      'Complements the pressing work (push-ups, dips, presses) by stretching the muscle that works hardest in it.',
      'Done standing or seated, with no equipment and no space.',
      'Maintains overhead shoulder range, useful for pike push-ups and presses.',
    ],
    precautions:
      'If raising the arm overhead hurts, keep the elbow lower and push less: this position is not worth forcing.',
  },

  bandChestPress: {
    slug: 'band-chest-press',
    muscles: { primary: 'Chest, triceps', secondary: 'Shoulders' },
    steps: [
      'Run the band across your back at shoulder-blade height and hold one end in each hand.',
      'Hands at chest height, elbows bent and close to the torso, one foot slightly forward for stability.',
      'Press the hands forward to full arm extension.',
      'Return slowly, controlling the tension, until the hands are back at the chest.',
    ],
    mistakes: [
      'Torso drifting forward to help the press: the body moves instead of the arms.',
      'Elbows rising to shoulder height, which puts the shoulder in a poor position.',
      'Letting the return snap back instead of braking it.',
    ],
    sensation:
      'The work is felt in the chest and the back of the arms, with resistance that grows as the arms extend. Tension in the lower back means the torso is compensating.',
    rangeOfMotion:
      'Press to straight arms without locking the elbows, and let the hands come back to the chest. The range is the same as any press; only the resistance profile changes.',
    tempo:
      'One to two seconds to press, two to three to return under control. Exhale pressing.',
    anatomy:
      'The pectoralis major and the triceps are the movers, the front deltoid assists, and the serratus anterior keeps the shoulder blade flat. The core and the forward foot resist the band pulling the torso backward.',
    mechanics:
      'Horizontal shoulder adduction with elbow extension against rising resistance: the band is tightest with the arms extended, exactly where bodyweight or a dumbbell would be easiest. It is the precise inverse of a push-up profile.',
    benefits: [
      'Brings horizontal pressing without floor space or heavy equipment, useful when push-ups are not practical.',
      'The rising resistance loads the end of the movement, where a push-up gets easy.',
      'A band travels anywhere, unlike a pair of dumbbells.',
    ],
    progression: {
      easier: 'Use a lighter band, or take a wider grip along it.',
      harder: 'Use a stronger band, step the front foot further forward, or slow the return to four seconds.',
      readyWhen: 'When three sets of fifteen go by with no forward torso drift, increase the resistance.',
    },
    precautions:
      'Check the band before every set: a worn band can snap suddenly, and it is stretched at face height.',
  },

  bandLateralRaise: {
    slug: 'band-lateral-raise',
    muscles: { primary: 'Shoulders' },
    steps: [
      'Stand on the middle of the band with one or both feet, one end in each hand.',
      'Arms at your sides, elbows barely bent, palms facing in.',
      'Raise the arms out to the sides up to shoulder height, no higher.',
      'Lower slowly, controlling the band pulling back.',
    ],
    mistakes: [
      'Going above shoulder height, which hands over to the upper trapezius.',
      'Using torso momentum to launch the arms.',
      'Shoulders creeping up toward the ears on the way up.',
    ],
    sensation:
      'The work is felt on the side of the shoulder. Tension in the upper trapezius or neck means the shoulders are rising instead of staying down.',
    rangeOfMotion:
      'Raise until the arms are horizontal, no further: that is where the middle deltoid finishes its work and other muscles would take over.',
    tempo:
      'One to two seconds up, two to three down. Exhale on the way up.',
    anatomy:
      'The middle deltoid is the main mover of arm abduction; the supraspinatus initiates the first degrees. The lower and middle trapezius must keep the shoulder blade down, which is why letting the shoulders rise shifts the work.',
    mechanics:
      'Shoulder abduction in the frontal plane against resistance that grows with elevation — the band tightens exactly when the lever arm is longest, which makes the end of the movement markedly harder than with a dumbbell.',
    benefits: [
      'The only shoulder isolation work in the library that needs no dumbbells.',
      'Complements the pressing movements, which mostly load the front of the shoulder.',
      'Adjusts finely by changing how much band you hold, with no change of equipment.',
    ],
    progression: {
      easier: 'Hold the band higher along its length, or stand on it with one foot only.',
      harder: 'Shorten the length you hold, stand on the band with both feet, or pause for a second at the top.',
      readyWhen: 'When three sets of fifteen go by with no shoulder shrug, shorten the band.',
    },
    precautions:
      'This movement is unloaded by definition: if the shoulder pinches at the top, cut the range rather than pushing on — a pinch is not something to train through.',
  },

  bandLateralWalk: {
    slug: 'banded-lateral-walk',
    muscles: { primary: 'Gluteus medius', secondary: 'Quadriceps, gluteus maximus' },
    steps: [
      'Place the band just above the knees, feet hip-width apart.',
      'Bend the knees and hips slightly into a half squat, torso upright.',
      'Step to the side, actively pushing the knee outward against the band.',
      'Bring the other foot across without letting the band go slack, and continue in the same direction before returning.',
    ],
    mistakes: [
      'Knees caving as the foot lands: the band takes over and the gluteus medius gives up.',
      'Torso standing fully upright, which unloads the glutes.',
      'Steps too long, which loses control of the alignment.',
    ],
    sensation:
      'The work is felt on the side of the hip and glute, with a burn that builds gradually. Nothing should pull in the knee.',
    rangeOfMotion:
      'Take steps of roughly shoulder width, keeping the band tension constant across the whole set — it is the continuous tension that does the work, not the length of the step.',
    tempo:
      'Steady and controlled, each step placed without bouncing. Breathe normally: this is continuous-tension work, not a sprint.',
    anatomy:
      'The gluteus medius and minimus abduct the hip and stabilize the pelvis at every step; the tensor fasciae latae assists. The half squat keeps the quadriceps and gluteus maximus isometrically loaded throughout the walk.',
    mechanics:
      'Hip abduction in the frontal plane against band resistance, with alternating support. It is one of the few exercises in the library to work that plane, while squats and lunges work almost entirely in the sagittal plane.',
    benefits: [
      'Strengthens the lateral hip stabilizer, directly involved in knee alignment when walking and running.',
      'Gives immediate tactile feedback: if the band goes slack, the knee has caved.',
      'Complements the band squat by isolating the lateral component that the squat only resists.',
    ],
    progression: {
      easier: 'Move the band above the ankles rather than the knees, or use a lighter band.',
      harder: 'Move the band above the knees, sit lower in the half squat, or extend the set.',
      readyWhen: 'When three sets of fifteen steps a side go by with the band never slack, increase the resistance.',
    },
    precautions:
      'If the outside of the knee heats up more than the hip, the movement is coming from the knee: lower the band and restart with shorter steps.',
  },

  bandCurl: {
    slug: 'band-biceps-curl',
    muscles: { primary: 'Biceps', secondary: 'Forearms' },
    steps: [
      'Stand on the middle of the band with one or both feet, one end in each hand.',
      'Arms at your sides, elbows pinned to the ribs, palms facing forward.',
      'Curl the hands toward the shoulders while keeping the elbows still.',
      'Lower slowly to full arm extension.',
    ],
    mistakes: [
      'Elbows drifting forward on the way up: the movement leaves the biceps for the shoulder.',
      'Swinging the torso to launch the load.',
      'A dropped descent, when the braked part is where most of the work happens.',
    ],
    sensation:
      'The work is felt at the front of the arm, from the elbow to the shoulder. The forearms heat up too, which is normal: they are what holds the band.',
    rangeOfMotion:
      'Curl until the hands approach the shoulders, and lower to fully straight arms. Cutting the descent short is the most common way to reduce the work without noticing.',
    tempo:
      'One second up, two to three braking on the way down. Exhale curling.',
    anatomy:
      'The biceps brachii flexes the elbow and helps supinate the forearm; the brachialis underneath is the most consistent flexor whatever the hand position. The brachioradialis of the forearm assists.',
    mechanics:
      'Open-chain elbow flexion against rising resistance: the band is tightest at the top, where the lever arm is short, giving an almost inverted load profile compared with a dumbbell.',
    benefits: [
      'The first biceps exercise in the library, in an "Arms" group that did not exist before this batch.',
      'Complements the pulling movements (rows, pulldowns), where the biceps only assists.',
      'Needs nothing but a band and fits in a bag.',
    ],
    progression: {
      easier: 'Hold the band higher along its length, or stand on it with one foot only.',
      harder: 'Shorten the length you hold, or pause for a second at the top of each repetition.',
      readyWhen: 'When three sets of fifteen go by with no elbow drift, shorten the band.',
    },
    precautions:
      'Pain in the crease of the elbow is not the burn you are after: reduce the resistance and check that the descent is braked rather than dropped.',
  },

  dumbbellShoulderPress: {
    slug: 'dumbbell-shoulder-press',
    muscles: { primary: 'Shoulders', secondary: 'Triceps, core' },
    steps: [
      'Standing or seated, a dumbbell in each hand at shoulder height, palms facing forward.',
      'Squeeze the glutes and brace the abdominals to lock the pelvis.',
      'Press the dumbbells overhead to full arm extension, without arching.',
      'Lower under control until the elbows drop back below shoulder height.',
    ],
    mistakes: [
      'Lower back arching to make up for limited shoulder range.',
      'Elbows flaring far out to the sides instead of staying slightly in front of the torso.',
      'A cut-short descent, which removes the most useful part of the movement.',
    ],
    sensation:
      'The work is felt in the shoulders and the back of the arms, with the core active from start to finish. Tension in the lower back means the pelvis is no longer locked.',
    rangeOfMotion:
      'Lower until the elbows pass below shoulder height, press to straight arms without snapping them locked. Seated against a high back rest, the lower back is mechanically protected.',
    tempo:
      'One to two seconds to press, two to three to lower under control. Exhale pressing.',
    anatomy:
      'The front deltoid and the triceps are the movers, with the middle deltoid assisting. The trapezius and serratus anterior rotate the shoulder blade upward, the condition for the arm to travel freely overhead; the abdominals prevent the compensatory arch.',
    mechanics:
      'Overhead shoulder flexion combined with elbow extension, in an open chain, with constant load through the whole range — unlike a band, whose resistance grows at the end of the movement.',
    benefits: [
      'The reference vertical pressing movement as soon as a pair of dumbbells is available.',
      'Loads the shoulders progressively, which pike push-ups can only do by changing body position.',
      'Works each arm independently, so the strong side cannot cover for the weak one.',
    ],
    progression: {
      easier: 'Reduce the load, or sit against a back rest to remove the bracing work.',
      harder: 'Increase the load, or pause for a second at the top of each repetition.',
      readyWhen: 'When three sets of twelve go by with no arching, increase the load.',
    },
    precautions:
      'If raising the arms overhead hurts, reduce the range or turn the palms inward: this position is not one to force.',
  },

  dumbbellFloorPress: {
    slug: 'dumbbell-floor-press',
    muscles: { primary: 'Chest, triceps', secondary: 'Shoulders' },
    steps: [
      'Lie on your back, knees bent, feet flat, a dumbbell in each hand.',
      'Elbows on the floor at around 45° from the torso, dumbbells at chest height.',
      'Press the dumbbells toward the ceiling to full arm extension.',
      'Lower under control until the elbows touch the floor, pause, then press again.',
    ],
    mistakes: [
      'Letting the elbows bounce off the floor instead of pausing.',
      'Elbows flared to 90°, which puts the shoulder in a poor position.',
      'Lower back lifting off the floor instead of staying in contact.',
    ],
    sensation:
      'The work is felt in the chest and the back of the arms. The floor gives a constant depth marker that a bench press does not have.',
    rangeOfMotion:
      'The floor limits the descent: that is exactly the point, it fixes the same depth every repetition and stops the shoulder travelling too far into extension.',
    tempo:
      'One to two seconds to press, two to three to lower. A one-second pause on contact with the floor removes any bounce.',
    anatomy:
      'The pectoralis major and the triceps are the movers, the front deltoid assists. With the range bounded by the floor, the shoulder never goes into excessive extension — which is what makes this variation more forgiving than a bench press.',
    mechanics:
      'Horizontal shoulder adduction with elbow extension, open chain and constant load. The floor truncates the bottom of the movement, turning a free range into a bounded one, reproducible from session to session.',
    benefits: [
      'Brings loaded horizontal pressing without a bench, with a simple pair of dumbbells and a mat.',
      'The floor marker makes the depth identical every set, so progress is measurable.',
      'Each arm works independently, unlike with a barbell.',
    ],
    progression: {
      easier: 'Reduce the load, or press one arm at a time to focus on the path.',
      harder: 'Increase the load, extend the pause on the floor, or slow the descent to four seconds.',
      readyWhen: 'When three sets of twelve go by with a clean pause on the floor every repetition, increase the load.',
    },
    precautions:
      'Never let the elbows drop in free fall: contact with the floor should be placed, not absorbed.',
  },

  dumbbellRomanianDeadlift: {
    slug: 'romanian-deadlift',
    muscles: { primary: 'Glutes, hamstrings', secondary: 'Lower back, core' },
    steps: [
      'Stand with a dumbbell in each hand in front of the thighs, feet hip-width apart.',
      'Bend the knees very slightly and keep that angle constant throughout.',
      'Push the hips back and lower the dumbbells along the legs, back flat.',
      'Lower until you feel the tension at the back of the thighs, then return by driving the hips forward.',
    ],
    mistakes: [
      'Bending the knees progressively during the descent: the movement turns into a squat and leaves the hamstrings.',
      'Back rounding as soon as hip mobility runs out.',
      'Dumbbells drifting away from the legs, which increases the strain on the lower back.',
    ],
    sensation:
      'A clear tension at the back of the thighs on the way down, then the glutes taking over on the way up. The lower back works as a brace, never as a mover.',
    rangeOfMotion:
      'Lower to the end of the hamstring stretch, no further: hamstring flexibility sets the range, not how low the dumbbells go. The moment the back rounds, the limit has been passed.',
    tempo:
      'Three seconds down, one to two up. Inhale on the way down, exhale driving the hips forward.',
    anatomy:
      'The hamstrings and the gluteus maximus extend the hip: they are the movers. The spinal erectors work isometrically to keep the back flat — they should never produce the movement, only prevent it. This is the only exercise in the library that trains the hip hinge under load.',
    mechanics:
      'A pure hip hinge: hip flexion then extension with the knee near-fixed, in the sagittal plane. That is what separates it from the squat — the squat bends hip AND knee, the hinge bends only the hip.',
    benefits: [
      'Teaches the hip hinge, the movement pattern that protects the back every time you pick something up off the floor.',
      'Loads the hamstrings in hip extension, the direct complement to the leg curl which trains them in knee flexion.',
      'Strengthens the whole posterior chain in a single movement.',
    ],
    progression: {
      easier: 'Reduce the load, or lower less far to stay in the range where the back stays flat.',
      harder: 'Increase the load, or slow the descent to five seconds.',
      readyWhen: 'When three sets of twelve go by with a flat back through the whole range, increase the load.',
    },
    precautions:
      'A flat back is not negotiable: if holding the position requires bending the back, the load is too heavy or the range too big.',
  },

  dumbbellCalfRaise: {
    slug: 'dumbbell-calf-raise',
    muscles: { primary: 'Calves' },
    steps: [
      'Stand with a dumbbell in each hand at your sides, feet hip-width apart.',
      'Rise slowly onto the balls of your feet, as high as you can.',
      'Pause at the top with the calves contracted.',
      'Lower slowly until the heels touch the floor.',
    ],
    mistakes: [
      'Bouncing at the bottom instead of controlling the descent.',
      'Ankles rolling outward: the weight should stay over the big toe.',
      'A cut-short range at the top, which is exactly where the calf contracts hardest.',
    ],
    sensation:
      'A clear burn in the calf, which builds quickly. The load is also felt in the forearms, which hold the dumbbells for the whole set.',
    rangeOfMotion:
      'Rise as high as the ankle allows and lower until the heels touch. Standing on a step with the heels hanging, the range extends further downward.',
    tempo:
      'One to two seconds up, a pause at the top, two to three down. It is the slowness that does the work, not the load.',
    anatomy:
      'The triceps surae — gastrocnemius and soleus — produces plantar flexion. With the knee straight the gastrocnemius dominates, which is why the standing version complements any seated work well, where the soleus takes over.',
    mechanics:
      'Closed-chain ankle plantar flexion with an external load added to bodyweight. The range is short by nature, which makes time under tension more decisive than the number of repetitions.',
    benefits: [
      'Loads the calves beyond bodyweight, which the unloaded version can no longer do once fifteen repetitions feel easy.',
      'Takes the calves out of isolation in the library, alongside the matching stretch.',
      'Strengthens the final push of walking and running.',
    ],
    progression: {
      easier: 'Do it without dumbbells, or hold a support with one hand so you only manage one weight.',
      harder: 'Increase the load, stand on a step to extend the range, or move to one leg.',
      readyWhen: 'When three sets of twenty go by with a pause at the top, increase the load or move to one leg.',
    },
    precautions:
      'A cramp late in the set is common in this muscle: reduce the range and extend the rest rather than forcing the next repetition.',
  },

  dumbbellCurl: {
    slug: 'dumbbell-biceps-curl',
    muscles: { primary: 'Biceps', secondary: 'Forearms' },
    steps: [
      'Stand with a dumbbell in each hand, arms at your sides, palms facing forward.',
      'Elbows pinned to the ribs, shoulders down and torso still.',
      'Curl the dumbbell toward the shoulder without the elbow drifting forward.',
      'Lower slowly to full arm extension.',
    ],
    mistakes: [
      'Swinging the torso to launch the load: the back is working, not the biceps.',
      'Elbows drifting forward at the top, which brings the shoulder in.',
      'A dropped descent, when the braked phase is the most productive one.',
    ],
    sensation:
      'The work is felt at the front of the arm, from the crease of the elbow to the shoulder. The torso should stay perfectly still: that is the best sign the load is right.',
    rangeOfMotion:
      'Curl until the dumbbell approaches the shoulder and lower to a fully straight arm. Cutting the bottom short is the most common way to cheat without noticing.',
    tempo:
      'One second up, two to three down. Exhale curling.',
    anatomy:
      'The biceps brachii flexes the elbow and supinates the forearm — hence the forward-facing palm, which puts it in a favourable position. The brachialis, underneath the biceps, flexes the elbow whatever the hand position; the brachioradialis assists.',
    mechanics:
      'Open-chain elbow flexion at constant load: unlike a band, the resistance does not vary, but the lever arm is longest when the forearm is horizontal — which is where the movement is hardest.',
    benefits: [
      'The most direct biceps movement, with load adjustable in fine steps.',
      'Complements the pulls (rows, pulldowns), where the biceps is only secondary.',
      'Each arm works separately, which reveals and corrects an imbalance.',
    ],
    progression: {
      easier: 'Reduce the load, or rest your back against a wall to remove any chance of swinging.',
      harder: 'Increase the load, slow the descent to four seconds, or pause halfway up.',
      readyWhen: 'When three sets of twelve go by with the torso still, increase the load.',
    },
    precautions:
      'Pain in the crease of the elbow, distinct from muscular burn, calls for less load: the elbow tendons tolerate sudden overload poorly in this movement.',
  },

  dumbbellTricepsExtension: {
    slug: 'overhead-triceps-extension',
    muscles: { primary: 'Triceps' },
    steps: [
      'Standing or seated, hold one dumbbell with both hands, arms extended overhead.',
      'Elbows squeezed forward, as close to the ears as possible.',
      'Bend the elbows to lower the dumbbell behind the neck, without letting the elbows flare.',
      'Press back to full arm extension, elbows still squeezed in.',
    ],
    mistakes: [
      'Elbows flaring outward, which moves the load from the triceps to the shoulder.',
      'Lower back arching to make up for limited shoulder range.',
      'Lowering too fast, with the load behind the head.',
    ],
    sensation:
      'The work is felt at the back of the arm, from the elbow to the shoulder. Discomfort in the shoulder joint means the elbows have flared or the load is too heavy.',
    rangeOfMotion:
      'Lower until you feel the stretch at the back of the arm, without forcing, then press back to straight arms. With the arms overhead the long head of the triceps is already pre-stretched, so the useful range is shorter than it looks.',
    tempo:
      'One to two seconds up, two to three lowering under control. Exhale pressing.',
    anatomy:
      'The triceps brachii is the only elbow extensor. Its long head also crosses the shoulder: the overhead position puts it under tension before the movement even starts, which is why this variation loads it more than an extension with the arm at the side.',
    mechanics:
      'Open-chain elbow extension, with the shoulder flexed overhead and held fixed. That is the job of the bracing and the squeezed elbows: to stop the shoulder joining in, so that only the elbow moves.',
    benefits: [
      'Targets the triceps in a position dips and push-ups do not reproduce.',
      'Done with a single dumbbell, standing or seated, with no bench.',
      'Complements the curl to cover both faces of the arm in the "Arms" group.',
    ],
    progression: {
      easier: 'Reduce the load, or do the movement one arm at a time to control the path better.',
      harder: 'Increase the load, or pause for a second in the bottom position.',
      readyWhen: 'When three sets of twelve go by with no elbow flare, increase the load.',
    },
    precautions:
      'Start light: the load sits behind the head, and losing control there is trickier than on a movement in front of the body. Seated with a back rest, the lower back is better protected.',
  },

  chestPressMachine: {
    slug: 'chest-press-machine',
    muscles: { primary: 'Chest, triceps', secondary: 'Shoulders' },
    steps: [
      'Set the seat height so the handles sit at chest height.',
      'Sit down with the back and shoulders firmly against the pad, feet flat on the floor.',
      'Press the handles forward to full arm extension, without locking the elbows.',
      'Return under control until the hands come back level with the chest.',
    ],
    mistakes: [
      'Shoulders lifting off the pad to gain a few centimetres of press.',
      'Locking the elbows at the end of the press, which shifts the load onto the joint.',
      'Returning too fast, when the braked phase is the most productive one.',
    ],
    sensation:
      'The work is felt in the chest and the back of the arms, with no stabilizing effort: the pad handles that. That is what separates this machine from a push-up.',
    rangeOfMotion:
      'Return until the hands are level with the chest, no further — beyond that the shoulder travels into excessive extension against a guided load, which adds nothing.',
    tempo:
      'One to two seconds to press, two to three to return. Exhale pressing.',
    anatomy:
      'The pectoralis major and the triceps are the movers, the front deltoid assists. The back pad replaces all the bracing work a push-up demands, which concentrates the effort on the pressing muscles and nothing else.',
    mechanics:
      'Horizontal shoulder adduction with elbow extension, on a path set by the machine. With the torso fixed, the variable is load rather than stability — the exact inverse of a push-up.',
    benefits: [
      'Lets horizontal pressing be loaded heavily with no partner and no bench, with fine load adjustment.',
      'The guided path reduces the risk of technique error compared with a loaded free movement.',
      'Useful alongside push-ups, or as a substitute when the wrist or the core is the limit.',
    ],
    progression: {
      easier: 'Reduce the load, or shorten the range by coming back a little less far.',
      harder: 'Increase the load, slow the return to four seconds, or pause in the bottom position.',
      readyWhen: 'When three sets of twelve go by with the shoulders never leaving the pad, increase the load.',
    },
    precautions:
      'Keep the shoulders in contact with the pad from start to finish: that contact is what protects the joint on a fixed path.',
  },

  legCurlMachine: {
    slug: 'leg-curl',
    muscles: { primary: 'Hamstrings', secondary: 'Calves' },
    steps: [
      'Set the machine so the roller rests on the lower calves, just above the heels.',
      'Get into position with the hips flat against the support, legs straight without locking the knees.',
      'Bend the knees to draw the heels toward the glutes, under control.',
      'Lower slowly back to extension, without letting the load drop.',
    ],
    mistakes: [
      'Hips lifting to help the curl: the movement leaves the hamstrings.',
      'An unbraked descent, with the load falling on its own.',
      'A badly placed roller, too high on the calf, which gets in the way instead of loading.',
    ],
    sensation:
      'A clear contraction at the back of the thigh, from the knee toward the glute. The lower back should feel nothing: if it does, the hips have lifted.',
    rangeOfMotion:
      'Curl as far as the machine allows without the hips moving, and lower to full extension but without locking. Full range matters more than load on this movement.',
    tempo:
      'One to two seconds to curl, two to three braking on the way down. Exhale curling.',
    anatomy:
      'The hamstrings flex the knee: that is their primary action, and precisely the one no bodyweight exercise in the library loads directly. The gastrocnemius, which also crosses the knee, assists.',
    mechanics:
      'Open-chain knee flexion with the hip fixed, on a guided path. It is the exact complement of the Romanian deadlift, which loads the same muscles but in hip extension with the knee near-fixed.',
    benefits: [
      'Fills the one glaring gap in the library: no exercise loaded the hamstrings in knee flexion.',
      'Balances the thigh work, which is heavily dominated by the quadriceps (squats, lunges, leg press).',
      'Guided path and adjustable load, so progress is measurable.',
    ],
    progression: {
      easier: 'Reduce the load, or shorten the range by curling a little less far.',
      harder: 'Increase the load, slow the descent to four seconds, or pause for a second in the flexed position.',
      readyWhen: 'When three sets of twelve go by with the hips never lifting, increase the load.',
    },
    precautions:
      'A cramp at the back of the thigh is common on this movement: reduce the load and extend the warm-up rather than pushing on.',
  },

  treadmill: {
    slug: 'treadmill',
    muscles: { primary: 'Cardio, legs' },
    steps: [
      'Step on with the belt stopped or very slow, then build speed gradually.',
      'Pick a pace where talking stays possible but slightly breathless.',
      'Keep the torso upright and the gaze far ahead, without holding the rails.',
      'Hold the pace for the whole duration, then slow down gradually before stepping off.',
    ],
    mistakes: [
      'Holding the side rails: part of your weight is carried, so the real effort drops while the displayed speed does not.',
      'Eyes fixed on the screen, which breaks the neck posture.',
      'Starting too fast instead of settling into the pace progressively.',
    ],
    sensation:
      'Moderate breathlessness, steady for the whole duration: conversation should stay possible but not comfortable.',
    rangeOfMotion:
      'No range to set, but a stride: land on the heel, roll through the foot, let the arms swing freely from the shoulder.',
    tempo:
      'A steady, held pace rather than surges followed by recovery — unless intervals are the point of the day.',
    anatomy:
      'The same muscular chain as walking: glutes and hamstrings propel, quadriceps absorb, calves provide the final push, and the core stabilizes the pelvis at each footfall.',
    mechanics:
      'Cyclic locomotion on a motorized belt. What separates it from outdoor walking is the adjustable incline: it, more than speed, raises the effort without raising the impact — a dial outdoor ground does not offer on demand.',
    benefits: [
      'Lets pace and incline be set precisely, so exactly the same effort can be reproduced from session to session.',
      'Incline loads the glutes and calves more without requiring a faster run.',
      'Independent of weather and time of day, unlike outdoor walking.',
    ],
    progression: {
      easier: 'Reduce the speed before reducing the duration: fifteen minutes held beats thirty endured.',
      harder: 'Raise the incline at a constant pace, extend the duration, or alternate faster segments.',
      readyWhen: 'When twenty minutes at a steady pace go by with conversation still possible, raise the incline.',
    },
    precautions:
      'Clip on the emergency stop before starting, and never step off a moving belt.',
  },

  stationaryBike: {
    slug: 'stationary-bike',
    muscles: { primary: 'Cardio, thighs', secondary: 'Glutes' },
    steps: [
      'Set the saddle so the knee keeps a slight bend when the pedal is at its lowest.',
      'Sit with the hands resting without gripping, back neither collapsed nor arched.',
      'Settle into a steady cadence, then adjust the resistance to find your working effort.',
      'Hold cadence and resistance for the whole duration, then finish with a few easy minutes.',
    ],
    mistakes: [
      'Saddle too low: the knee stays too bent at the bottom, which loads the joint for nothing.',
      'Hips rocking side to side, a sign the saddle is too high.',
      'Near-zero resistance with a very high cadence, which gives the illusion of effort without producing it.',
    ],
    sensation:
      'Moderate breathlessness and a gradual warmth in the thighs. Unlike walking or the treadmill, bodyweight never rests on the legs.',
    rangeOfMotion:
      'No range to set, but a saddle setting: the knee keeps a slight bend at the bottom of the stroke, without the hips having to rock to reach the pedal.',
    tempo:
      'A steady cadence held for the whole duration. Resistance is the real intensity dial, not pedalling speed.',
    anatomy:
      'The quadriceps and gluteus maximus produce knee and hip extension on every push; the hamstrings and calves contribute on the upstroke when the feet are fixed. The seated position fully unloads the spine and the weight-bearing joints.',
    mechanics:
      'Cyclic closed-chain pedalling with no weight-bearing: that is the axis that separates the bike from every other cardio option in the library — the body is carried by the saddle, so the knees, hips and back take no impact and no bodyweight compression.',
    benefits: [
      'The only cardio in the library that puts no weight through the legs, so it stays practical when walking or running bothers a joint.',
      'Resistance adjusts finely, which makes intensity reproducible from session to session.',
      'Allows long durations with no accumulated joint strain.',
    ],
    progression: {
      easier: 'Lower the resistance before cutting the duration, and keep a comfortable cadence.',
      harder: 'Increase the resistance at a constant cadence, extend the duration, or alternate harder blocks.',
      readyWhen: 'When twenty minutes go by without the cadence dropping at the end, increase the resistance.',
    },
    precautions:
      'A painful knee almost always comes from the saddle setting, not from the effort: check the height before reducing the intensity.',
  },

  rowingMachine: {
    slug: 'rowing-machine',
    muscles: { primary: 'Cardio, back, legs', secondary: 'Arms, core' },
    steps: [
      'Strap in the feet, grip the handle with straight arms, shins vertical, torso slightly forward: this is the catch.',
      'Push hard with the legs first, arms still straight and torso still.',
      'As the legs near extension, open the torso back, and only then pull the handle to the lower ribs.',
      'Return in reverse order: straighten the arms, bring the torso forward, then bend the legs.',
    ],
    mistakes: [
      'Pulling with the arms before the legs have pushed: the most common error, and it robs the movement of its main source of power.',
      'Opening the torso too early, which shifts the load onto the lower back.',
      'A rounded back at the catch, in the name of reaching further.',
    ],
    sensation:
      'The legs burn first, then the back and the arms. If the arms tire before the legs, the order of the stroke is reversed.',
    rangeOfMotion:
      'The handle arrives at the lower ribs, not the chest or the belly. At the catch the shins are vertical: going further gains nothing and strains the back.',
    tempo:
      'A steady rhythm, with the recovery around twice as slow as the drive. It is that ratio, not the stroke rate, that separates a clean stroke from a rushed one.',
    anatomy:
      'The quadriceps and glutes produce most of the power on the drive; the latissimus dorsi, rhomboids and middle trapezius then draw the shoulder blade toward the spine; the biceps finishes. The core transmits the force of the legs to the upper body, which makes rowing a full-chain movement.',
    mechanics:
      'A four-part sequence — catch, drive, finish, recovery — combining leg extension, hip extension and a horizontal pull. It is the only movement in the library where the order of the segments matters as much as the force produced: legs, then torso, then arms.',
    benefits: [
      'The only cardio in the library that is also a genuine skill: stroke quality improves alongside fitness.',
      'Trains the pulling chain, absent from the other cardio options.',
      'Impact-free while recruiting markedly more muscle mass than walking or cycling.',
    ],
    progression: {
      easier: 'Cut the duration before raising the stroke rate, and focus on the legs-torso-arms order.',
      harder: 'Extend the duration, raise the rate while keeping the recovery-to-drive ratio, or work in blocks.',
      readyWhen: 'When fifteen minutes go by with the stroke order respected throughout, extend the duration.',
    },
    precautions:
      'The lower back should never be the engine: if fatigue settles there, the torso is opening before the legs have finished pushing. Restart slower and lighter.',
  },
};
