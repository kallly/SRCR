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
    tagline: 'Construis ton entraînement, ordonne les exercices, règle les pauses.',
    sourceCode: 'Code source',
  },

  lang: {
    label: 'Langue',
  },

  plans: {
    label: 'Séance',
    new: '+ Nouvelle séance',
    duplicate: 'Dupliquer',
    rename: 'Renommer',
    delete: 'Supprimer',
    unnamed: 'Séance sans nom',
    namePrompt: 'Nom de la séance ?',
    confirmDelete: 'Supprimer cette séance et son déroulé ?',
    copyName: '{name} - copie',
  },

  share: {
    trigger: 'Partager',
    title: 'Partager cette séance',
    hint: 'Scannez ce code avec un téléphone, ou copiez le lien ci-dessous.',
    qrTooLarge: 'Cette séance est trop grande pour un QR code : utilisez le lien ci-dessous.',
    linkLabel: 'Lien de partage',
    copy: 'Copier',
    copied: 'Lien copié',
    importTitle: 'Importer une séance partagée',
    importSummary: {
      one: '« {name} » — {count} exercice.',
      other: '« {name} » — {count} exercices.',
    },
    importConfirm: 'Importer comme nouvelle séance',
    importAppend: 'Ajouter à la séance active',
    importReplace: 'Remplacer « {name} »',
    importInvalid:
      'Ce lien ne décrit pas une séance valide. S’il vient d’une intelligence artificielle, demandez-lui de le régénérer en suivant le format indiqué en bas de la page d’accueil.',
    replaced: 'Séance remplacée',
    appended: {
      one: '{count} exercice ajouté',
      other: '{count} exercices ajoutés',
    },
  },

  about: {
    title: 'À propos de Séance',
    intro:
      'Séance est un planificateur et un minuteur d’entraînement au poids du corps, pensé pour une reprise sans matériel. On compose son déroulé à partir d’une bibliothèque d’exercices — pompes inclinées, squat sur chaise, wall sit, planche, dead bug, mollets debout, rotation externe d’épaule, marche — puis on règle les séries, les répétitions ou les durées, et les temps de repos.',
    modes:
      'Deux façons d’enchaîner les séries. En mode classique, on fait toutes les séries d’un exercice avant de passer au suivant, avec le repos réglé sur chaque ligne. En mode circuit, les séries alternent les groupes musculaires et une pause n’apparaît que lorsque deux efforts du même groupe doivent forcément se suivre — l’aperçu affiche l’enchaînement calculé avant de commencer.',
    privacy:
      'Pendant la séance, un lecteur plein écran affiche le chrono, l’anneau de progression et la consigne d’exécution, garde l’écran allumé et signale la fin de chaque temps. Aucun compte, aucun serveur, aucune donnée envoyée : la séance et l’historique sont enregistrés dans le navigateur. L’interface existe en français, anglais, espagnol, allemand et italien.',
  },

  aiPlan: {
    title: 'Créer une séance par lien (pour une IA)',
    intro:
      'Cette page sait recevoir une séance décrite dans son adresse : ouvrir un tel lien propose de l’importer, rien n’est enregistré sans confirmation. Une intelligence artificielle peut donc composer une séance et vous la livrer sous forme de lien, sans compte ni serveur. Donnez-lui simplement l’adresse de cette page.',
    format:
      'Le lien attendu est de la forme ci-dessous : un objet JSON qui porte le nom de la séance, le mode d’enchaînement et la liste des lignes, compressé en base64url dans le paramètre s.',
    keys:
      'La valeur à mettre dans le champ clé est l’attribut data-key des liens « Toutes les fiches d’exercice » ci-dessus, et data-group donne le groupe musculaire de chacun. Le groupe, le type d’effort et les valeurs manquantes sont déduits de la bibliothèque. Une clé inconnue devient un exercice personnalisé portant ce nom. Une ligne sans clé insère une pause.',
    spec: 'Spécification complète du format',
  },

  aiHelp: {
    trigger: 'IA',
    triggerLabel: 'Créer ou modifier une séance avec une IA',
    title: 'Créer ou modifier avec une IA',
    intro: 'ChatGPT, Claude et Gemini peuvent créer ou modifier votre séance : donnez-leur un lien.',
    createTitle: 'Créer une séance',
    createText: 'Copiez ce message :',
    createPrompt:
      'Voici un site de séances au poids du corps : https://kallly.github.io/SRCR/. Crée-moi une séance haut du corps de 20 minutes, puis donne-moi le lien à ouvrir pour l’importer.',
    modifyTitle: 'Modifier une séance',
    modifyText: 'Utilisez le lien de partage de votre séance pour demander à l’IA de la modifier :',
    modifyPrompt:
      'Voici le lien de ma séance actuelle : {link}. Ajoute un exercice pour les mollets, puis renvoie-moi le lien mis à jour.',
    linkMask: '[votre lien]',
    copied: 'Message copié',
  },

  exerciseInfo: {
    trigger: 'Informations sur l’exercice',
    close: 'Fermer',
    muscles: 'Muscles sollicités',
    keyPoints: 'Points clés',
    moreInfo: 'Plus d’informations',
    unavailable: 'Fiche détaillée bientôt disponible dans cette langue — affichage en français.',
    loading: 'Chargement…',
    loadError: 'Impossible de charger la fiche de cet exercice.',
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
    sessions: 'Séances',
    plan: 'Déroulé',
    library: 'Bibliothèque',
    allGuides: 'Toutes les fiches d’exercice',
  },

  library: {
    search: 'Rechercher un exercice…',
    filterLabel: 'Filtrer par groupe musculaire',
    filterAll: 'Tous les groupes',
    noResults: 'Aucun exercice ne correspond à cette recherche.',
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
    confirm: 'Valider',
    cancel: 'Annuler',
  },

  storage: {
    saved: 'Enregistré',
    unavailable: 'Sauvegarde impossible : le stockage local est désactivé dans ce navigateur.',
  },

  toast: {
    deleted: 'Supprimé',
    undo: 'Annuler',
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
    /** Suffixe court affiche a cote du champ ; `rest` reste l'aria-label complet. */
    restShort: 's repos',
    delete: 'Supprimer',
    moveUp: 'Monter',
    moveDown: 'Descendre',
  },

  effort: {
    reps: 'Répétitions',
    time: 'Secondes',
    /** Formes courtes : le select sert d'unite juste apres le nombre. */
    repsShort: 'reps',
    timeShort: 's',
  },

  group: {
    push: 'Poitrine / bras',
    shoulders: 'Épaules',
    back: 'Dos',
    legs: 'Cuisses',
    calves: 'Mollets',
    core: 'Gainage',
    cardio: 'Cardio',
    glutes: 'Fessiers',
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


  page: {
    titleSuffix: 'comment le faire',
    description:
      'Comment faire {name} correctement : muscles sollicités, étapes détaillées et erreurs fréquentes à éviter.',
    back: '← Retour à l’app',
    breadcrumb: 'Fil d’Ariane',
    howTo: 'Comment faire l’exercice',
    mistakes: 'Erreurs fréquentes',
    sensation: 'Où ça doit travailler',
    rangeOfMotion: 'Amplitude',
    tempo: 'Rythme et respiration',
    anatomy: 'Ce qui travaille, précisément',
    mechanics: 'Mécanique du mouvement',
    benefits: 'Bienfaits',
    progression: 'Adapter et progresser',
    easier: 'Plus accessible',
    harder: 'Plus exigeant',
    readyWhen: 'Passer à la suite',
    precautions: 'Précautions',
    similar: 'Exercices similaires',
    tagline: 'planificateur et minuteur de séance au poids du corps.',
    disclaimer:
      'Ces informations sont d’ordre général et ne remplacent pas l’avis d’un professionnel de santé. En cas de douleur, de blessure ou de pathologie connue, demandez un avis médical avant de vous lancer.',
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
    kneePushup: {
      name: 'Pompes genoux',
      cue: 'Genoux au sol, corps aligné des genoux aux épaules. Descends la poitrine près du sol.',
    },
    wallPushup: {
      name: 'Pompes contre le mur',
      cue: 'Mains à hauteur d’épaules sur le mur, corps incliné et gainé. Idéal pour débuter.',
    },
    chairDips: {
      name: 'Dips triceps sur chaise',
      cue: 'Mains sur le bord de la chaise, coudes vers l’arrière. Ne descends pas plus bas que 90°.',
    },
    armCircles: {
      name: 'Moulinets de bras',
      cue: 'Bras tendus à l’horizontale, petits cercles réguliers. Alterne le sens à mi-série.',
    },
    wallSlides: {
      name: 'Glissés au mur',
      cue: 'Dos et bras contre le mur, fais glisser les bras vers le haut sans décoller les coudes.',
    },
    superman: {
      name: 'Superman',
      cue: 'Allongé sur le ventre, lève bras et jambes ensemble. Regarde le sol pour protéger la nuque.',
    },
    reverseSnowAngel: {
      name: 'Ange inversé au sol',
      cue: 'Allongé sur le ventre, bras tendus, dessine un grand cercle jusqu’aux hanches.',
    },
    birdDog: {
      name: 'Chien-oiseau',
      cue: 'À quatre pattes, tends un bras et la jambe opposée. Garde le bassin immobile.',
    },
    catCow: {
      name: 'Chat-vache',
      cue: 'À quatre pattes, alterne dos rond et dos creux au rythme de la respiration.',
    },
    reverseLunge: {
      name: 'Fente arrière',
      cue: 'Recule une jambe, descends jusqu’à un genou proche du sol. Buste droit.',
    },
    stepUp: {
      name: 'Montée sur chaise',
      cue: 'Monte un pied puis l’autre sur une chaise stable, redescends avec contrôle.',
    },
    lateralLunge: {
      name: 'Fente latérale',
      cue: 'Grand pas sur le côté, plie la jambe d’appui en gardant l’autre tendue.',
    },
    gluteBridge: {
      name: 'Pont fessier',
      cue: 'Allongé, genoux pliés, pousse par les talons et serre les fessiers en haut.',
    },
    donkeyKick: {
      name: 'Lever de jambe à 4 pattes',
      cue: 'À quatre pattes, pousse un pied vers le plafond genou plié, sans creuser le dos.',
    },
    hipAbduction: {
      name: 'Abduction de hanche debout',
      cue: 'Debout, lève une jambe tendue sur le côté sans pencher le buste.',
    },
    sidePlank: {
      name: 'Planche latérale',
      cue: 'Appui sur un avant-bras, corps aligné en ligne droite des pieds à la tête.',
    },
    standingKneeRaise: {
      name: 'Montées de genoux debout',
      cue: 'Debout, monte un genou vers la poitrine en gardant le dos droit.',
    },
    crunch: {
      name: 'Crunch',
      cue: 'Allongé, genoux pliés, décolle les omoplates en soufflant. Ne tire pas sur la nuque.',
    },
    highKneeMarch: {
      name: 'Marche genoux hauts sur place',
      cue: 'Sur place, monte les genoux à hauteur de hanche, rythme contrôlé.',
    },
    buttKickMarch: {
      name: 'Talons-fesses sur place',
      cue: 'Sur place, ramène les talons vers les fessiers à un rythme modéré.',
    },
    custom: {
      name: 'Exercice perso',
      cue: '',
    },
  },
} satisfies Dictionary;
