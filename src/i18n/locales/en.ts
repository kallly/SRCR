import type { Translations } from '../index';

export const en: Translations = {
  app: {
    title: 'CIRKALI — workout planner and timer',
    eyebrow: 'With or without equipment',
    heading: 'CIRKALI',
    tagline: 'Build your workout, order the exercises, set the breaks.',
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
    copyName: '{name} - copy',
  },

  presets: {
    groupMine: 'My sessions',
    group: 'CIRKALI sessions',
    badge: 'CIRKALI session',
    note: 'Ready-made session. Change it to make it yours.',
    makeMine: 'Make my version',
    adoptTitle: 'Create your version?',
    adoptText: 'Your changes will go into your own copy of "{name}".',
    adoptConfirm: 'Make my version',
    adopted: '"{name}" added to your sessions',
    name: {
      fullBody: 'Full body, no equipment',
      beginner: 'Gentle start',
      upperBody: 'Upper body',
      lowerBody: 'Lower body and glutes',
      core: 'Quick core',
      stretching: 'Evening stretches',
    },
  },

  account: {
    label: 'Account',
    title: 'Online backup',
    intro:
      'Without signing in, your sessions live in this browser only: clearing it or switching devices loses them. Sign in with Google and they are saved automatically, so you find them everywhere.',
    signIn: 'Sign in with Google',
    signOut: 'Sign out',
    signOutNotice:
      'Signing out erases nothing: your sessions stay in this browser, they simply stop being backed up online.',
    lastSync: 'Last synced: {time}',
    neverSynced: 'Not synced yet.',
    statusSynced: 'synced',
    statusSyncing: 'syncing…',
    statusOffline: 'offline, will resume when back online',
    statusError: 'sync unavailable, sessions kept here',
    statusTooLarge: 'too many sessions for online backup',
    storageNotice: 'This browser erases sessions after 7 days without a visit. An account keeps them.',
    signInError: 'Sign-in failed. Try again in a moment.',
    merged: {
      one: '{count} session restored from your account',
      other: '{count} sessions restored from your account',
    },
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
    importConfirm: 'Import as a new session',
    importAppend: 'Add to the active session',
    importReplace: 'Replace "{name}"',
    importInvalid:
      'This link does not describe a valid session. If it came from an AI, ask it to generate the link again using the format shown at the bottom of the home page.',
    replaced: 'Session replaced',
    appended: {
      one: '{count} exercise added',
      other: '{count} exercises added',
    },
  },

  about: {
    title: 'About CIRKALI',
    intro:
      'CIRKALI is a workout planner and timer. You build your running order from a library of exercises you can filter by the equipment you have — bodyweight, resistance band, dumbbells, machine — or by the moment in the session, warm-up and stretching included. Each row is then set in sets, reps or duration, with its own rest period.',
    modes:
      'Two ways to chain the sets. In classic mode, you complete every set of one exercise before moving to the next, with the rest set on each row. In circuit mode, sets alternate muscle groups and a break only appears when two efforts from the same group unavoidably follow each other — the preview shows the computed sequence before you start.',
    privacy:
      'During the session, a full-screen player shows the timer, the progress ring and the execution cue, keeps the screen awake and signals the end of each interval. No account required: your session and history are stored in the browser. An optional Google sign-in backs them up online so you find them on every device. The interface is available in French, English, Spanish, German and Italian.',
  },

  ads: {
    label: 'Advertisement',
    none: 'CIRKALI shows no advertising on mobile: on a phone no slot is created and no advertising script is downloaded. On a large screen, two units sit in the margins the layout leaves empty — they never break up the content and stay hidden during a session.',
  },

  notFound: {
    title: 'Page not found',
    lead: 'This address matches no page on the site. The link may contain a typo, or the page may have moved.',
  },

  privacy: {
    title: 'Privacy',
    lead: 'CIRKALI works without an account and without a server: the session you build lives in your browser. This page states what is stored, what leaves the device, and on what conditions.',
    updated: 'Last updated: {date}',
    localTitle: 'What stays on your device',
    libraryTitle: 'The exercises you create yourself',
    libraryText: 'When you add an exercise that is not in the library, its name and the muscle group you picked are sent to us. They serve one purpose: spotting the exercises the catalogue is missing, so they can be added. Nothing else is sent — no identifier, no session, nothing about your device — and these entries cannot be traced back to you.',
    localText: 'Your sessions, your settings, the language you picked and the history of finished sessions are stored in the browser’s local storage. They are sent nowhere and nobody but you can read them. Clearing the site data deletes them for good.',
    accountTitle: 'Signing in with Google, optional',
    accountText: 'Signing in with Google is a choice, never a requirement: until you do, the Firebase kit is not even downloaded. If you do sign in, your email address and your sessions are stored with Google (Firebase Authentication and Cloud Firestore) so you can find them on your other devices. Signing out stops the sync; the online copy remains until you ask for its deletion.',
    analyticsTitle: 'Audience measurement',
    analyticsText: 'The site uses Google Analytics (measurement ID {ga}) to count visits and see which pages are read. The script only loads once the page has been painted, so that it does not slow down your arrival. From the European Economic Area, the United Kingdom and Switzerland, measurement starts in the “denied” state: no measurement cookie is set until you have accepted.',
    adsTitle: 'Advertising',
    adsText: 'On large screens only, the site shows Google AdSense adverts. Google and its partners may set cookies to measure and personalise them; a consent dialog collects your agreement before anything is set, and you can change it at any time. On mobile no advertising code is downloaded, so no advertising cookie is set there.',
    adsOptOut: 'Google ad personalisation can be adjusted from your Google account settings page.',
    rightsTitle: 'Your rights',
    rightsText: 'You may access, correct or have deleted the data tied to your account, and withdraw your consent whenever you wish. For what stayed in the browser, clearing the site data is enough. For the online copy, write to us.',
    contactTitle: 'Contact',
    contactText: 'For any question about this data: {email}',
  },

  aiPlan: {
    title: 'Create a session with an AI',
    intro:
      'Ask ChatGPT, Claude or Gemini to put a session together for you: give them the address of this page and they reply with a link. You open it, the app shows you the session and asks whether to keep it — nothing is saved without your say-so. The “AI” button at the top of the page prepares the message to copy.',
    forAi: 'What follows is addressed to the AI. A human reader can skip it.',
    format:
      'The expected link has the shape below: a JSON object carrying the session name, the sequencing mode and the list of rows, encoded as base64url in the s parameter.',
    keys:
      'The key to use for each exercise is shown in small print under its name, in the "All exercise guides" list above (e.g. catCow under "Cat-cow") — never the word at the end of its guide\'s address. The muscle group, effort type and any missing values are taken from the library. An unknown key becomes a custom exercise with that name.',
    rawLink:
      'Always give this link exactly as is — never wrapped in a search (google.com/search) or shortened. Some assistants add this wrapper automatically: if the link you are about to give contains one, strip it before answering — one-click import only works with the exact link.',
    spec: 'Full format specification',
  },

  aiHelp: {
    trigger: 'AI',
    triggerLabel: 'Create or edit a session with an AI',
    title: 'Create or edit with an AI',
    intro: 'ChatGPT, Claude and Gemini can create or edit your session: just give them a link.',
    createTitle: 'Create a session',
    createText: 'Copy this message:',
    createPrompt:
      'Here is a site for building workout sessions: https://cirkali.fr/. Build me a 20-minute upper body session, then give me the link to open to import it.',
    modifyTitle: 'Edit a session',
    modifyText: 'Use your session’s share link to ask the AI to edit it:',
    modifyPrompt:
      'Here is the link to my current session: {link}. Add a calf exercise, then send me back the updated link.',
    linkMask: '[your link]',
    copied: 'Message copied',
  },

  install: {
    title: 'Install the app',
    chrome:
      'On Android, open this site in Chrome, then the ⋮ menu at the top right and “Install app”. CIRKALI joins your home screen with its own icon, opens full screen without an address bar, and works offline.',
    ios: 'On iPhone and iPad, use Safari: the Share button, then “Add to Home Screen”.',
    native:
      'Android and iOS versions are in the works. Publishing them on the app stores costs money — developer account, identity verification, yearly fees — which the site does not cover yet.',
    support: 'Help fund the store release on Ko-fi',
  },

  support: {
    title: 'Support CIRKALI',
    text:
      'CIRKALI is free, works without an account and shows no ads on mobile. If the app is useful to you, you can buy a coffee: it pays for hosting and for the app store fees.',
    link: 'Buy a coffee on Ko-fi',
  },

  exerciseInfo: {
    trigger: 'Exercise information',
    close: 'Close',
    equipment: 'Equipment',
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
    sessions: 'Sessions',
    plan: 'Running order',
    library: 'Library',
    allGuides: 'All exercise guides',
  },

  library: {
    search: 'Search for an exercise…',
    filterLabel: 'Filter by muscle group',
    filterAll: 'All groups',
    filterCategoryLabel: 'Filter by equipment',
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
    addCustom: '+ Custom exercise',
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
    restShort: 's rest',
    weight: 'Load (kg)',
    weightShort: 'kg',
    delete: 'Delete',
    moveUp: 'Move up',
    moveDown: 'Move down',
  },

  effort: {
    reps: 'Repetitions',
    time: 'Seconds',
    repsShort: 'reps',
    timeShort: 's',
  },

  group: {
    upper: 'Upper body',
    push: 'Chest',
    shoulders: 'Shoulders',
    back: 'Back',
    arms: 'Arms',
    core: 'Core',
    lower: 'Legs',
    legs: 'Thighs',
    glutes: 'Glutes',
    calves: 'Calves',
    cardio: 'Cardio',
    fullbody: 'Full body',
  },

  category: {
    warmup: 'Warm-up',
    stretching: 'Stretching',
    bodyweight: 'Bodyweight',
    band: 'Resistance band',
    dumbbell: 'Dumbbells',
    machine: 'Machine',
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
    customTitle: 'New exercise',
    customName: 'Exercise name',
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
    previous: 'Previous exercise',
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
    load: '{weight} kg',
    setDone: 'Set done',
    reps: {
      one: '{count} rep',
      other: '{count} reps',
    },
    readyHint: 'Starting the timer gives you 5 seconds to get into position.',
    startTimer: 'Start the timer',
    startingSoon: 'Get set, it starts in a moment.',
    skipSetup: 'Start now',
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
    tagline: 'workout planner and timer, with or without equipment.',
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
    bandPullApart: {
      name: 'Band pull-apart',
      cue: 'Arms extended in front, band stretched between your hands, pull it apart while squeezing your shoulder blades.',
    },
    bandSquat: {
      name: 'Band squat',
      cue: 'Band under your feet and over your shoulders, squat down as usual, back straight.',
    },
    dumbbellGobletSquat: {
      name: 'Dumbbell goblet squat',
      cue: 'Hold a dumbbell with both hands against your chest, squat down keeping your elbows between your knees.',
    },
    dumbbellRow: {
      name: 'Single-arm dumbbell row',
      cue: 'One knee and one hand on a bench, pull the dumbbell toward your hip while keeping your back flat.',
    },
    legPressMachine: {
      name: 'Leg press',
      cue: 'Feet flat on the plate, shoulder-width apart, push without fully locking your knees.',
    },
    latPulldownMachine: {
      name: 'Lat pulldown',
      cue: 'Grip the bar wider than your shoulders, pull it down to your upper chest while keeping your torso upright.',
    },
    hamstringStretch: {
      name: 'Hamstring stretch',
      cue: 'Heel resting on a support, leg straight, hinge your torso forward without rounding your back.',
    },
    chestDoorwayStretch: {
      name: 'Doorway chest stretch',
      cue: 'Forearm against the doorframe, elbow at shoulder height, lean your torso forward gently.',
    },
    squat: {
      name: 'Squat',
      cue: 'Feet hip-width apart, push your hips back and lower until the thighs are near parallel, torso upright.',
    },
    pushup: {
      name: 'Push-up',
      cue: 'Hands under the shoulders, body aligned from heels to head, lower until you brush the floor.',
    },
    pikePushup: {
      name: 'Pike push-up',
      cue: 'Hips high in an inverted V, lower the crown of your head toward the floor between your hands.',
    },
    mountainClimber: {
      name: 'Mountain climber',
      cue: 'In a push-up position, drive one knee at a time toward your chest without letting the hips rise.',
    },
    legSwing: {
      name: 'Leg swing',
      cue: 'Hold a support with one hand, swing one leg front to back, building range gradually, hips steady.',
    },
    torsoTwist: {
      name: 'Torso twist',
      cue: 'Standing, feet planted, rotate your torso side to side with the arms relaxed.',
    },
    quadStretch: {
      name: 'Standing quad stretch',
      cue: 'Standing, grab your ankle and draw the heel toward your glute, knees side by side.',
    },
    gluteStretch: {
      name: 'Figure-four glute stretch',
      cue: 'Lying down, ankle across the opposite knee, pull the supporting thigh toward you.',
    },
    calfStretch: {
      name: 'Wall calf stretch',
      cue: 'Hands on the wall, back leg straight, heel down, push your hips forward.',
    },
    childPose: {
      name: 'Child’s pose',
      cue: 'Kneeling, sit back on your heels and reach the arms far forward, forehead toward the floor.',
    },
    tricepsStretch: {
      name: 'Overhead triceps stretch',
      cue: 'Elbow bent and pointing at the ceiling, hand between the shoulder blades, ease the elbow back with the other hand.',
    },
    bandChestPress: {
      name: 'Band chest press',
      cue: 'Band across your back, hands at chest height, press forward to full arm extension.',
    },
    bandLateralRaise: {
      name: 'Band lateral raise',
      cue: 'Band under your feet, raise straight arms out to the sides up to shoulder height.',
    },
    bandLateralWalk: {
      name: 'Banded lateral walk',
      cue: 'Band above the knees, half-squat, step sideways without letting the knees cave in.',
    },
    bandCurl: {
      name: 'Band biceps curl',
      cue: 'Band under your feet, elbows tight to the body, curl your hands toward your shoulders.',
    },
    dumbbellShoulderPress: {
      name: 'Dumbbell shoulder press',
      cue: 'Dumbbells at shoulder height, press overhead without arching the lower back.',
    },
    dumbbellFloorPress: {
      name: 'Dumbbell floor press',
      cue: 'Lying on the floor, knees bent, press the dumbbells up; the elbows touch the floor at the bottom.',
    },
    dumbbellRomanianDeadlift: {
      name: 'Romanian deadlift',
      cue: 'Knees barely bent, push the hips back and lower the dumbbells along your legs, back flat.',
    },
    dumbbellCalfRaise: {
      name: 'Dumbbell calf raise',
      cue: 'Dumbbells at your sides, rise onto the balls of your feet then lower slowly.',
    },
    dumbbellCurl: {
      name: 'Dumbbell biceps curl',
      cue: 'Elbows tight to the body, curl the dumbbell without swinging your torso.',
    },
    dumbbellTricepsExtension: {
      name: 'Overhead triceps extension',
      cue: 'Dumbbell in both hands overhead, lower it behind your neck keeping the elbows in.',
    },
    chestPressMachine: {
      name: 'Chest press machine',
      cue: 'Back against the pad, handles at chest height, press without fully locking the elbows.',
    },
    legCurlMachine: {
      name: 'Leg curl',
      cue: 'Roller on your lower calves, bend the knees under control, hips flat.',
    },
    treadmill: {
      name: 'Treadmill',
      cue: 'A pace where talking stays possible but slightly breathless; do not hang on the rails.',
    },
    stationaryBike: {
      name: 'Stationary bike',
      cue: 'Saddle set so the knee keeps a slight bend at the bottom; steady cadence.',
    },
    rowingMachine: {
      name: 'Rowing machine',
      cue: 'Push with the legs first, then open the torso, then pull with the arms — and the reverse on the way back.',
    },
    custom: {
      name: 'Custom exercise',
      cue: '',
    },
  },
};
