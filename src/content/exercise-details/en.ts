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
      'Progress is measured in seconds, a clearer unit than "one more rep" for tracking a comeback.',
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
      'Cyclic locomotion in an alternating closed chain: each leg passes through a stance phase then a swing phase. Unlike running, one foot is always on the ground — that absence of a flight phase is what removes the impact and makes walking accessible during a comeback.',
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
      'Strengthens lumbar stability with no compressive load on the spine, which often makes it well tolerated during a comeback.',
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
      'The reverse version is markedly kinder to the knee than the forward lunge, which suits a comeback better.',
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
      'Impact-free, unlike jumping: practicable in a flat and compatible with a comeback.',
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
};
