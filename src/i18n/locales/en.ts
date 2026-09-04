import type { Translations } from '../index';

export const en: Translations = {
  app: {
    title: 'Session — bodyweight comeback',
    eyebrow: 'Phase 1 · no equipment',
    heading: 'My session',
    tagline:
      'Build your workout, order the exercises, set the breaks. Everything stays on this device.',
    sourceCode: 'Source code',
  },

  lang: {
    label: 'Language',
  },

  plans: {
    label: 'Session',
    new: '+ New session',
    duplicate: 'Duplicate',
    rename: 'Rename',
    delete: 'Delete',
    unnamed: 'Untitled session',
    namePrompt: 'Session name?',
    confirmDelete: 'Delete this session and its plan?',
  },

  share: {
    trigger: 'Share',
    title: 'Share this session',
    hint: 'Scan this code with a phone, or copy the link below.',
    qrTooLarge: 'This session is too large for a QR code: use the link below instead.',
    linkLabel: 'Share link',
    copy: 'Copy',
    copied: 'Link copied',
    importTitle: 'Import a shared session',
    importSummary: {
      one: '"{name}" — {count} exercise.',
      other: '"{name}" — {count} exercises.',
    },
    importConfirm: 'Import',
  },

  about: {
    title: 'About Séance',
    intro:
      'Séance is a bodyweight workout planner and timer, built for easing back into training without equipment. You build your running order from a library of exercises — incline push-ups, chair squats, wall sits, planks, dead bugs, standing calf raises, external shoulder rotations, walking — then set the sets, the reps or durations, and the rest periods.',
    modes:
      'Two ways to chain the sets. In classic mode, you complete every set of one exercise before moving to the next, with the rest set on each row. In circuit mode, sets alternate muscle groups and a break only appears when two efforts from the same group unavoidably follow each other — the preview shows the computed sequence before you start.',
    privacy:
      'During the session, a full-screen player shows the timer, the progress ring and the execution cue, keeps the screen awake and signals the end of each interval. No account, no server, no data sent: your session and history are stored in the browser. The interface is available in French, English, Spanish, German and Italian.',
  },

  exerciseInfo: {
    trigger: 'Exercise information',
    close: 'Close',
    muscles: 'Muscles worked',
    keyPoints: 'Key points',
    moreInfo: 'More information',
    unavailable: 'Detailed page coming soon in this language — showing French.',
    loading: 'Loading…',
    loadError: 'Could not load this exercise’s page.',
  },

  mode: {
    classic: 'Classic',
    circuit: 'Circuit',
    hintClassic:
      'Every set of one exercise, then on to the next, with the rest set on each row.',
    hintCircuit:
      'Sets follow one another while alternating muscle groups. A break only appears when two efforts from the same group have to follow each other.',
  },

  settings: {
    pause: 'Required break (s)',
    transition: 'Transition between exercises (s)',
  },

  section: {
    plan: 'Running order',
    library: 'Library',
    allGuides: 'All exercise guides',
  },

  library: {
    search: 'Search for an exercise…',
    filterLabel: 'Filter by muscle group',
    filterAll: 'All groups',
    noResults: 'No exercise matches this search.',
  },

  empty: {
    title: 'No exercises yet',
    body: 'Pick from the list below to build your session.',
  },

  preview: {
    title: 'Computed sequence',
    lead: {
      one: '{count} set chained while alternating groups.',
      other: '{count} sets chained while alternating groups.',
    },
    noneForced: 'No required break: every set lands on a different group from the one before.',
    forced: {
      one: '{count} required break — at that point two efforts from the same group unavoidably follow each other. Add an exercise from another group to remove it.',
      other:
        '{count} required breaks — at those points two efforts from the same group unavoidably follow each other. Add an exercise from another group to remove them.',
    },
  },

  actions: {
    addRest: '+ Add a break',
    addCustom: '+ Custom exercise',
    loadDefault: 'Load the sample session',
    clearAll: 'Clear everything',
    confirm: 'Confirm',
    cancel: 'Cancel',
  },

  storage: {
    saved: 'Saved',
    unavailable: 'Cannot save: local storage is disabled in this browser.',
  },

  toast: {
    deleted: 'Deleted',
    undo: 'Undo',
  },

  item: {
    restName: 'Break',
    restSeconds: 'Duration (s)',
    sets: 'Sets',
    effort: 'Type',
    reps: 'Reps',
    seconds: 'Duration (s)',
    group: 'Muscle group',
    rest: 'Rest between sets (s)',
    delete: 'Delete',
    moveUp: 'Move up',
    moveDown: 'Move down',
  },

  effort: {
    reps: 'Reps',
    time: 'Duration',
  },

  group: {
    push: 'Chest / arms',
    shoulders: 'Shoulders',
    back: 'Back',
    legs: 'Thighs',
    calves: 'Calves',
    core: 'Core',
    cardio: 'Cardio',
    glutes: 'Glutes',
  },

  duration: {
    minutes: '{count} min',
    seconds: '{count} s',
  },

  summary: {
    sets: '{sets} × {effort}',
  },

  bar: {
    emptyTitle: 'Empty session',
    emptySub: 'Add an exercise to get started',
    exercises: {
      one: '{count} exercise',
      other: '{count} exercises',
    },
    subtitle: '{mode} · ≈ {duration}',
    start: 'Start',
  },

  prompt: {
    customName: 'Exercise name?',
    loadDefault: 'Replace the current session with the sample one?',
    clearAll: 'Clear the whole session?',
  },

  history: {
    summary: {
      one: '{count} session completed. Latest: {dates}',
      other: '{count} sessions completed. Latest: {dates}',
    },
  },

  rest: {
    manual: 'Break',
    betweenSets: 'Rest',
    forced: 'Required break',
    transition: 'Transition',
  },

  runner: {
    quit: 'Quit',
    step: 'Step {current} / {total}',
    next: 'Next — {name}',
    lastEffort: 'Last effort',
    then: 'Then {name}',
    recover: 'Recover',
    forcedCue: 'Two efforts from the same group follow each other: this break is necessary.',
    transitionCue: 'Get set for the next exercise.',
    addTime: '+15 s',
    skip: 'Skip',
    setOf: 'Set {current} of {total}',
    setDone: 'Set done',
    reps: {
      one: '{count} rep',
      other: '{count} reps',
    },
    readyHint: 'Get into position, then start the timer.',
    startTimer: 'Start the timer',
    done: 'Done',
    finished: 'Session complete',
    finishedCue: 'Note how you feel tomorrow morning: the stiffness should be back to normal.',
    close: 'Close',
  },


  page: {
    titleSuffix: 'how to do it',
    description:
      'How to do {name} correctly: muscles worked, step-by-step technique and the common mistakes to avoid.',
    back: '← Back to the app',
    breadcrumb: 'Breadcrumb',
    howTo: 'How to do it',
    mistakes: 'Common mistakes',
    sensation: 'Where you should feel it',
    rangeOfMotion: 'Range of motion',
    tempo: 'Tempo and breathing',
    anatomy: 'What works, precisely',
    mechanics: 'Movement mechanics',
    benefits: 'Benefits',
    progression: 'Adapt and progress',
    easier: 'Easier',
    harder: 'Harder',
    readyWhen: 'Move on when',
    precautions: 'Precautions',
    similar: 'Similar exercises',
    tagline: 'bodyweight workout planner and timer.',
    disclaimer:
      'This is general information and does not replace advice from a health professional. If you have pain, an injury or a known condition, seek medical advice before starting.',
  },

  exercise: {
    inclined: {
      name: 'Incline push-ups',
      cue: 'Elbows at about 45° from the body, never flared to 90°.',
    },
    chairsquat: {
      name: 'Chair squat',
      cue: 'Knees in line with the feet, control the way down.',
    },
    calf: {
      name: 'Standing calf raises',
      cue: '3 s up, 3 s down. The slowness is what does the work.',
    },
    wallsit: {
      name: 'Wall sit',
      cue: 'If the knee complains, open the angle to 120°.',
    },
    rotation: {
      name: 'External shoulder rotation',
      cue: 'On your side, water bottle in hand, elbow pinned to the body. Short range.',
    },
    deadbug: {
      name: 'Dead bug',
      cue: 'Lower back pressed to the floor at all times.',
    },
    plank: {
      name: 'Plank',
      cue: 'Glutes tight. If the hips move, the set is over.',
    },
    walk: {
      name: 'Walking',
      cue: 'Brisk pace. Your cardio base, without the impact.',
    },
    kneePushup: {
      name: 'Knee push-ups',
      cue: 'Knees on the floor, body aligned from knees to shoulders. Lower the chest close to the floor.',
    },
    wallPushup: {
      name: 'Wall push-ups',
      cue: 'Hands shoulder-height on the wall, body leaning and braced. A great starting point.',
    },
    chairDips: {
      name: 'Chair tricep dips',
      cue: 'Hands on the chair edge, elbows pointing back. Don’t go lower than 90°.',
    },
    armCircles: {
      name: 'Arm circles',
      cue: 'Arms out at shoulder height, small steady circles. Switch direction halfway through.',
    },
    wallSlides: {
      name: 'Wall slides',
      cue: 'Back and arms against the wall, slide the arms up without the elbows lifting off.',
    },
    superman: {
      name: 'Superman',
      cue: 'Lying face down, lift arms and legs together. Look down to protect the neck.',
    },
    reverseSnowAngel: {
      name: 'Reverse snow angel',
      cue: 'Lying face down, arms out straight, sweep a wide arc down to the hips.',
    },
    birdDog: {
      name: 'Bird dog',
      cue: 'On all fours, extend one arm and the opposite leg. Keep the hips still.',
    },
    catCow: {
      name: 'Cat-cow',
      cue: 'On all fours, alternate rounding and arching the back with your breath.',
    },
    reverseLunge: {
      name: 'Reverse lunge',
      cue: 'Step one leg back, lower until the knee nearly touches the floor. Torso upright.',
    },
    stepUp: {
      name: 'Chair step-up',
      cue: 'Step one foot then the other onto a stable chair, step back down with control.',
    },
    lateralLunge: {
      name: 'Lateral lunge',
      cue: 'Big step to the side, bend the leading knee while keeping the other leg straight.',
    },
    gluteBridge: {
      name: 'Glute bridge',
      cue: 'Lying down, knees bent, push through the heels and squeeze the glutes at the top.',
    },
    donkeyKick: {
      name: 'Donkey kick',
      cue: 'On all fours, push one foot toward the ceiling with the knee bent, without arching the back.',
    },
    hipAbduction: {
      name: 'Standing hip abduction',
      cue: 'Standing, lift one straight leg out to the side without leaning the torso.',
    },
    sidePlank: {
      name: 'Side plank',
      cue: 'Resting on one forearm, body in a straight line from feet to head.',
    },
    standingKneeRaise: {
      name: 'Standing knee raise',
      cue: 'Standing, lift one knee toward the chest while keeping the back straight.',
    },
    crunch: {
      name: 'Crunch',
      cue: 'Lying down, knees bent, lift the shoulder blades while exhaling. Don’t pull on the neck.',
    },
    highKneeMarch: {
      name: 'High-knee march in place',
      cue: 'March in place, knees up to hip height, controlled pace.',
    },
    buttKickMarch: {
      name: 'Butt-kick march in place',
      cue: 'March in place, heels flicking back toward the glutes at a moderate pace.',
    },
    custom: {
      name: 'Custom exercise',
      cue: '',
    },
  },
};
