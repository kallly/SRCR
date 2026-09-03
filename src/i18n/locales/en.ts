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
  },

  storage: {
    saved: 'Saved',
    unavailable: 'Cannot save: local storage is disabled in this browser.',
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
    custom: {
      name: 'Custom exercise',
      cue: '',
    },
  },
};
