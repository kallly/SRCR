import type { Dictionary } from '../index';

/**
 * Source de verite des traductions.
 *
 * On ajoute toujours une cle ici en premier : `Translations` en derive, ce qui
 * force les quatre autres langues a la fournir des le prochain `npm run
 * typecheck`.
 */
export const fr = {
  app: {
    title: 'Séance — reprise au poids du corps',
    eyebrow: 'Phase 1 · sans matériel',
    heading: 'Ma séance',
    tagline:
      'Construis ton entraînement, ordonne les exercices, règle les pauses. Tout reste enregistré sur cet appareil.',
    sourceCode: 'Code source',
  },

  lang: {
    label: 'Langue',
  },

  mode: {
    classic: 'Classique',
    circuit: 'Circuit',
    hintClassic:
      'Toutes les séries d’un exercice, puis on passe au suivant, avec le repos réglé sur chaque ligne.',
    hintCircuit:
      'Les séries s’enchaînent en alternant les groupes musculaires. Une pause n’apparaît que si deux efforts du même groupe doivent se suivre.',
  },

  settings: {
    pause: 'Pause imposée (s)',
    transition: 'Transition entre exercices (s)',
  },

  section: {
    plan: 'Déroulé',
    library: 'Bibliothèque',
  },

  empty: {
    title: 'Aucun exercice pour l’instant',
    body: 'Choisis dans la liste ci-dessous pour construire ta séance.',
  },

  preview: {
    title: 'Enchaînement calculé',
    lead: {
      one: '{count} série enchaînée en alternant les groupes.',
      other: '{count} séries enchaînées en alternant les groupes.',
    },
    noneForced:
      'Aucune pause imposée : chaque série tombe sur un groupe différent de la précédente.',
    forced: {
      one: '{count} pause imposée — à ce moment-là, deux efforts du même groupe se suivent forcément. Ajoute un exercice d’un autre groupe pour la faire disparaître.',
      other:
        '{count} pauses imposées — à ces moments-là, deux efforts du même groupe se suivent forcément. Ajoute un exercice d’un autre groupe pour les faire disparaître.',
    },
  },

  actions: {
    addRest: '+ Ajouter une pause',
    addCustom: '+ Exercice perso',
    loadDefault: 'Charger la séance type',
    clearAll: 'Tout effacer',
  },

  storage: {
    saved: 'Enregistré',
    unavailable: 'Sauvegarde impossible : le stockage local est désactivé dans ce navigateur.',
  },

  item: {
    restName: 'Pause',
    restSeconds: 'Durée (s)',
    sets: 'Séries',
    effort: 'Type',
    reps: 'Répétitions',
    seconds: 'Durée (s)',
    group: 'Groupe musculaire',
    rest: 'Repos entre séries (s)',
    delete: 'Supprimer',
    moveUp: 'Monter',
    moveDown: 'Descendre',
  },

  effort: {
    reps: 'Répétitions',
    time: 'Durée',
  },

  group: {
    push: 'Poitrine / bras',
    shoulders: 'Épaules',
    back: 'Dos',
    legs: 'Cuisses',
    calves: 'Mollets',
    core: 'Gainage',
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
    emptyTitle: 'Séance vide',
    emptySub: 'Ajoute un exercice pour commencer',
    exercises: {
      one: '{count} exercice',
      other: '{count} exercices',
    },
    subtitle: '{mode} · ≈ {duration}',
    start: 'Démarrer',
  },

  prompt: {
    customName: 'Nom de l’exercice ?',
    loadDefault: 'Remplacer la séance actuelle par la séance type ?',
    clearAll: 'Effacer toute la séance ?',
  },

  history: {
    summary: {
      one: '{count} séance terminée. Dernière : {dates}',
      other: '{count} séances terminées. Dernières : {dates}',
    },
  },

  rest: {
    manual: 'Pause',
    betweenSets: 'Repos',
    forced: 'Pause imposée',
    transition: 'Transition',
  },

  runner: {
    quit: 'Quitter',
    step: 'Étape {current} / {total}',
    next: 'Ensuite — {name}',
    lastEffort: 'Dernier effort',
    then: 'Puis {name}',
    recover: 'Récupère',
    forcedCue: 'Deux efforts du même groupe se suivent : cette pause est nécessaire.',
    transitionCue: 'Installe-toi pour le prochain exercice.',
    addTime: '+15 s',
    skip: 'Passer',
    setOf: 'Série {current} sur {total}',
    setDone: 'Série terminée',
    reps: {
      one: '{count} rep',
      other: '{count} reps',
    },
    readyHint: 'Mets-toi en position, puis lance le chrono.',
    startTimer: 'Démarrer le chrono',
    done: 'Terminé',
    finished: 'Séance terminée',
    finishedCue:
      'Note comment tu te sens demain matin : la raideur doit être revenue à la normale.',
    close: 'Fermer',
  },

  exercise: {
    inclined: {
      name: 'Pompes inclinées',
      cue: 'Coudes à ~45° du corps, jamais écartés à 90°.',
    },
    chairsquat: {
      name: 'Squat sur chaise',
      cue: 'Genoux dans l’axe des pieds, contrôle la descente.',
    },
    calf: {
      name: 'Mollets debout',
      cue: '3 s pour monter, 3 s pour descendre. La lenteur fait le travail.',
    },
    wallsit: {
      name: 'Wall sit',
      cue: 'Si le genou tire, ouvre l’angle à 120°.',
    },
    rotation: {
      name: 'Rotation externe d’épaule',
      cue: 'Sur le côté, bouteille d’eau, coude collé au corps. Amplitude courte.',
    },
    deadbug: {
      name: 'Dead bug',
      cue: 'Bas du dos collé au sol en permanence.',
    },
    plank: {
      name: 'Planche',
      cue: 'Fesses serrées. Si le bassin bouge, la série est finie.',
    },
    walk: {
      name: 'Marche',
      cue: 'Rythme soutenu. Ta base cardio, sans impact.',
    },
    custom: {
      name: 'Exercice perso',
      cue: '',
    },
  },
} satisfies Dictionary;
