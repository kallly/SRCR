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
    title: 'CIRKALI — planificateur et minuteur d’entraînement',
    eyebrow: 'Avec ou sans matériel',
    heading: 'CIRKALI',
    tagline: 'Construis ton entraînement, ordonne les exercices, règle les pauses.',
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

  /**
   * Seances toutes faites proposees par CIRKALI (data/presets.ts). Leur nom
   * n'est jamais stocke : il se resout ici a chaque affichage, comme celui
   * d'une seance sans nom. Il n'est fige en texte qu'a la creation de la
   * version personnelle d'un modele — meme compromis assume que
   * `plans.copyName`.
   */
  presets: {
    groupMine: 'Mes séances',
    group: 'Séances CIRKALI',
    badge: 'Séance CIRKALI',
    note: 'Séance type. Modifiez-la pour en faire la vôtre.',
    makeMine: 'Créer ma version',
    adoptTitle: 'Créer votre version ?',
    adoptText: 'Vos modifications iront dans votre copie de « {name} ».',
    adoptConfirm: 'Créer ma version',
    adopted: '« {name} » ajoutée à vos séances',
    name: {
      fullBody: 'Full body sans matériel',
      beginner: 'Débuter en douceur',
      upperBody: 'Haut du corps',
      lowerBody: 'Bas du corps et fessiers',
      core: 'Gainage express',
      stretching: 'Étirements du soir',
    },
  },

  account: {
    label: 'Compte',
    title: 'Sauvegarde en ligne',
    intro:
      'Sans connexion, vos séances restent dans ce navigateur : les vider ou changer d’appareil les fait disparaître. En vous connectant avec Google, elles sont sauvegardées automatiquement et vous les retrouvez partout.',
    signIn: 'Se connecter avec Google',
    signOut: 'Se déconnecter',
    signOutNotice:
      'Se déconnecter n’efface rien : vos séances restent dans ce navigateur, elles cessent simplement d’être sauvegardées en ligne.',
    lastSync: 'Dernière synchronisation : {time}',
    neverSynced: 'Pas encore synchronisé.',
    statusSynced: 'synchronisé',
    statusSyncing: 'synchronisation…',
    statusOffline: 'hors ligne, reprise au retour du réseau',
    statusError: 'synchronisation impossible, séances gardées ici',
    statusTooLarge: 'trop de séances pour la sauvegarde en ligne',
    /**
     * Affichee seulement sous WebKit — Safari, et tout navigateur sur iOS — et
     * seulement deconnecte (ui/account.ts, platform/storage.ts) : c'est le seul
     * moteur qui efface le stockage d'un site non visite depuis sept jours, et
     * la seule parade depuis la page est de le dire. « Ce navigateur » et non
     * « Safari » : le message s'affiche aussi sur Chrome ou Firefox pour
     * iPhone, ou WebKit est impose. Deux lignes maximum sur un ecran etroit —
     * au-dela, la rangee grandit et decale la page.
     */
    storageNotice: 'Ce navigateur efface les séances après 7 jours sans visite. Un compte les garde.',
    signInError: 'Connexion impossible. Réessayez dans un instant.',
    merged: {
      one: '{count} séance récupérée depuis votre compte',
      other: '{count} séances récupérées depuis votre compte',
    },
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
    title: 'À propos de CIRKALI',
    intro:
      'CIRKALI est un planificateur et un minuteur d’entraînement. On compose son déroulé à partir d’une bibliothèque d’exercices filtrable selon le matériel dont on dispose — poids du corps, élastique, haltères, machine — ou selon le moment de la séance, échauffement et étirements compris. Chaque ligne se règle ensuite en séries, en répétitions ou en durée, avec son temps de repos.',
    modes:
      'Deux façons d’enchaîner les séries. En mode classique, on fait toutes les séries d’un exercice avant de passer au suivant, avec le repos réglé sur chaque ligne. En mode circuit, les séries alternent les groupes musculaires et une pause n’apparaît que lorsque deux efforts du même groupe doivent forcément se suivre — l’aperçu affiche l’enchaînement calculé avant de commencer.',
    privacy:
      'Pendant la séance, un lecteur plein écran affiche le chrono, l’anneau de progression et la consigne d’exécution, garde l’écran allumé et signale la fin de chaque temps. Aucun compte obligatoire : la séance et l’historique sont enregistrés dans le navigateur. Une connexion Google, facultative, les sauvegarde en ligne pour les retrouver sur tous ses appareils. L’interface existe en français, anglais, espagnol, allemand et italien.',
  },

  /*
    Textes publicitaires. `none` est affiche sur TOUS les ecrans, mobile
    compris : c'est precisement au visiteur mobile qu'il apprend qu'il n'y a
    rien a bloquer chez lui. `label` coiffe chaque encart — un libelle
    explicite est ce que demande la politique AdSense des lors qu'on en pose
    un, et il ne doit pas etre trompeur (« Publicite », pas « Partenaires »).
  */
  ads: {
    label: 'Publicité',
    none: 'CIRKALI n’affiche aucune publicité sur mobile : sur un téléphone, aucun emplacement n’est créé et aucun script publicitaire n’est téléchargé. Sur grand écran, deux encarts occupent les marges que la mise en page laisse vides — ils ne coupent jamais le contenu et restent cachés pendant la séance.',
  },

  /*
    Page de confidentialite, generee en cinq langues par
    scripts/build-exercise-pages.ts. `updated`, `contactText` et `analyticsText`
    portent des marqueurs ({date}, {email}) remplaces a la generation : ce ne
    sont pas des pluriels, `t()` n'intervient pas ici.
  */
  notFound: {
    title: 'Page introuvable',
    lead: 'Cette adresse ne correspond à aucune page du site. Le lien comporte peut-être une faute, ou la page a changé d’adresse.',
  },

  privacy: {
    title: 'Confidentialité',
    lead: 'CIRKALI fonctionne sans compte et sans serveur : la séance que vous composez vit dans votre navigateur. Cette page dit ce qui est enregistré, ce qui sort de l’appareil, et à quelles conditions.',
    updated: 'Dernière mise à jour : {date}',
    localTitle: 'Ce qui reste sur votre appareil',
    localText: 'Vos séances, vos réglages, la langue choisie et l’historique des séances terminées sont enregistrés dans le stockage local du navigateur. Ils ne sont envoyés nulle part et personne d’autre que vous n’y a accès. Effacer les données du site les supprime définitivement.',
    accountTitle: 'La connexion Google, facultative',
    accountText: 'Se connecter avec Google est un choix, jamais une obligation : tant que vous ne le faites pas, le kit Firebase n’est même pas téléchargé. Si vous vous connectez, votre adresse e-mail et vos séances sont enregistrées chez Google (Firebase Authentication et Cloud Firestore) pour être retrouvées sur vos autres appareils. Se déconnecter arrête la synchronisation ; la copie en ligne subsiste jusqu’à ce que vous en demandiez la suppression.',
    analyticsTitle: 'Mesure d’audience',
    analyticsText: 'Le site utilise Google Analytics (identifiant de mesure {ga}) pour compter les visites et savoir quelles pages sont lues. Le script n’est chargé qu’une fois la page affichée, afin de ne pas ralentir votre arrivée. Depuis l’Espace économique européen, le Royaume-Uni et la Suisse, la mesure démarre à l’état « refusé » : aucun cookie de mesure n’est déposé tant que vous n’avez pas accepté.',
    adsTitle: 'Publicité',
    adsText: 'Sur grand écran uniquement, le site affiche des annonces Google AdSense. Google et ses partenaires peuvent déposer des cookies pour mesurer et personnaliser ces annonces ; une fenêtre de consentement recueille votre accord avant tout dépôt, et vous pouvez le modifier à tout moment. Sur mobile, aucun code publicitaire n’est téléchargé : aucun cookie publicitaire n’y est donc déposé.',
    adsOptOut: 'La personnalisation des annonces Google se règle depuis la page des paramètres de votre compte Google.',
    rightsTitle: 'Vos droits',
    rightsText: 'Vous pouvez consulter, corriger ou faire supprimer les données liées à votre compte, et retirer votre consentement quand vous le souhaitez. Pour ce qui est resté dans le navigateur, il suffit d’effacer les données du site. Pour la copie en ligne, écrivez-nous.',
    contactTitle: 'Contact',
    contactText: 'Pour toute question sur ces données : {email}',
  },

  aiPlan: {
    title: 'Créer une séance avec une IA',
    intro:
      'Demandez à ChatGPT, Claude ou Gemini de vous composer une séance : donnez-leur l’adresse de cette page, ils vous répondent par un lien. Vous l’ouvrez, l’application affiche la séance et vous demande si vous voulez la garder — rien n’est enregistré sans votre accord. Le bouton « IA », en haut de page, prépare le message à copier.',
    forAi: 'La suite s’adresse à l’IA. Un lecteur humain peut la sauter.',
    format:
      'Le lien attendu est de la forme ci-dessous : un objet JSON qui porte le nom de la séance, le mode d’enchaînement et la liste des lignes, compressé en base64url dans le paramètre s.',
    keys:
      'La clé à utiliser pour chaque exercice est indiquée en petit sous son nom, dans la liste « Toutes les fiches d’exercice » ci-dessus (par exemple catCow sous « Chat-vache ») — ce n’est jamais le mot qui termine l’adresse de sa fiche. Le groupe musculaire, le type d’effort et les valeurs manquantes sont déduits de la bibliothèque. Une clé inconnue devient un exercice personnalisé portant ce nom.',
    rawLink:
      'Donnez toujours ce lien tel quel — jamais enveloppé dans une recherche (google.com/search) ni raccourci. Certains assistants ajoutent cette enveloppe automatiquement : si le lien que vous vous apprêtez à donner en contient une, retirez-la avant de répondre — l’import en un clic ne fonctionne qu’avec le lien exact.',
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
      'Voici un site pour composer des séances : https://cirkali.fr/. Crée-moi une séance haut du corps de 20 minutes, puis donne-moi le lien à ouvrir pour l’importer.',
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
    equipment: 'Équipement',
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
    /** Aria-label du groupe de puces ; pas d'option « tout » : aucune puce cochée = aucune restriction. */
    filterCategoryLabel: 'Filtrer par équipement',
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
    addCustom: '+ Exercice perso',
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
    push: 'Poitrine',
    shoulders: 'Épaules',
    back: 'Dos',
    arms: 'Bras',
    legs: 'Cuisses',
    calves: 'Mollets',
    core: 'Gainage',
    cardio: 'Cardio',
    glutes: 'Fessiers',
  },

  category: {
    warmup: 'Échauffement',
    stretching: 'Étirements',
    bodyweight: 'Poids du corps',
    band: 'Élastique',
    dumbbell: 'Haltères',
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
    previous: 'Exercice précédent',
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
    readyHint: 'Tu auras 5 secondes pour te mettre en position en lançant le chrono.',
    startTimer: 'Démarrer le chrono',
    startingSoon: 'Installe-toi, ça démarre dans un instant.',
    skipSetup: 'Commencer maintenant',
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
    tagline: 'planificateur et minuteur de séance, avec ou sans matériel.',
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
    bandPullApart: {
      name: 'Écarté élastique',
      cue: 'Bras tendus devant toi, élastique tendu entre les mains, écarte les bras en serrant les omoplates.',
    },
    bandSquat: {
      name: 'Squat élastique',
      cue: 'Élastique sous les pieds et posé sur les épaules, descends comme un squat classique, dos droit.',
    },
    dumbbellGobletSquat: {
      name: 'Squat gobelet',
      cue: 'Haltère tenu à deux mains contre la poitrine, descends en gardant les coudes entre les genoux.',
    },
    dumbbellRow: {
      name: 'Rowing haltère un bras',
      cue: 'Un genou et une main en appui sur un banc, tire l’haltère vers la hanche en gardant le dos plat.',
    },
    legPressMachine: {
      name: 'Presse à cuisses',
      cue: 'Pieds à plat sur la plaque, largeur d’épaules, pousse sans verrouiller complètement les genoux.',
    },
    latPulldownMachine: {
      name: 'Tirage vertical',
      cue: 'Barre saisie plus large que les épaules, tire-la vers le haut de la poitrine en gardant le buste droit.',
    },
    hamstringStretch: {
      name: 'Étirement des ischio-jambiers',
      cue: 'Talon posé sur un support, jambe tendue, penche le buste vers l’avant sans arrondir le dos.',
    },
    chestDoorwayStretch: {
      name: 'Étirement pectoraux (cadre de porte)',
      cue: 'Avant-bras contre le cadre de porte, coude à hauteur d’épaule, avance doucement le buste.',
    },
    squat: {
      name: 'Squat',
      cue: 'Pieds largeur de hanches, pousse les hanches en arrière et descends cuisses proches de l’horizontale, buste droit.',
    },
    pushup: {
      name: 'Pompes',
      cue: 'Mains sous les épaules, corps aligné des talons à la tête, descends jusqu’à frôler le sol.',
    },
    pikePushup: {
      name: 'Pompes piquées',
      cue: 'Bassin haut en V renversé, descends le sommet du crâne vers le sol entre les mains.',
    },
    mountainClimber: {
      name: 'Grimpeur',
      cue: 'En position de pompe, ramène alternativement un genou vers la poitrine sans lever les hanches.',
    },
    legSwing: {
      name: 'Balancements de jambe',
      cue: 'Appuie-toi d’une main, balance une jambe d’avant en arrière, amplitude progressive et bassin stable.',
    },
    torsoTwist: {
      name: 'Rotations du buste',
      cue: 'Debout, pieds ancrés, fais pivoter le buste d’un côté puis de l’autre, bras relâchés.',
    },
    quadStretch: {
      name: 'Étirement quadriceps debout',
      cue: 'Debout, attrape ta cheville et ramène le talon vers la fesse, genoux côte à côte.',
    },
    gluteStretch: {
      name: 'Étirement fessier (figure 4)',
      cue: 'Allongé, cheville posée sur le genou opposé, tire la cuisse d’appui vers toi.',
    },
    calfStretch: {
      name: 'Étirement mollets au mur',
      cue: 'Mains au mur, jambe arrière tendue, talon au sol, avance le bassin.',
    },
    childPose: {
      name: 'Posture de l’enfant',
      cue: 'À genoux, assieds-toi sur les talons et allonge les bras loin devant, front vers le sol.',
    },
    tricepsStretch: {
      name: 'Étirement triceps',
      cue: 'Coude plié pointé vers le plafond, main entre les omoplates, pousse doucement le coude avec l’autre main.',
    },
    bandChestPress: {
      name: 'Développé poitrine élastique',
      cue: 'Élastique dans le dos, mains à hauteur de poitrine, pousse vers l’avant jusqu’aux bras tendus.',
    },
    bandLateralRaise: {
      name: 'Élévations latérales élastique',
      cue: 'Élastique sous les pieds, monte les bras tendus sur les côtés jusqu’à hauteur d’épaule.',
    },
    bandLateralWalk: {
      name: 'Marche latérale élastique',
      cue: 'Élastique au-dessus des genoux, demi-squat, fais des pas de côté sans laisser les genoux rentrer.',
    },
    bandCurl: {
      name: 'Curl biceps élastique',
      cue: 'Élastique sous les pieds, coudes collés au corps, remonte les mains vers les épaules.',
    },
    dumbbellShoulderPress: {
      name: 'Développé militaire haltères',
      cue: 'Haltères à hauteur d’épaules, pousse au-dessus de la tête sans cambrer le bas du dos.',
    },
    dumbbellFloorPress: {
      name: 'Développé haltères au sol',
      cue: 'Allongé au sol, genoux pliés, pousse les haltères vers le plafond ; les coudes touchent le sol en bas.',
    },
    dumbbellRomanianDeadlift: {
      name: 'Soulevé de terre jambes tendues',
      cue: 'Genoux à peine fléchis, pousse les hanches en arrière et descends les haltères le long des jambes, dos plat.',
    },
    dumbbellCalfRaise: {
      name: 'Mollets debout avec haltères',
      cue: 'Haltères le long du corps, monte sur la pointe des pieds puis redescends lentement.',
    },
    dumbbellCurl: {
      name: 'Curl biceps haltères',
      cue: 'Coudes collés au corps, remonte l’haltère sans balancer le buste.',
    },
    dumbbellTricepsExtension: {
      name: 'Extension triceps',
      cue: 'Haltère à deux mains au-dessus de la tête, descends derrière la nuque en gardant les coudes serrés.',
    },
    chestPressMachine: {
      name: 'Développé poitrine machine',
      cue: 'Dos calé, poignées à hauteur de poitrine, pousse sans verrouiller complètement les coudes.',
    },
    legCurlMachine: {
      name: 'Leg curl (ischio-jambiers)',
      cue: 'Rouleau sur le bas des mollets, fléchis les genoux avec contrôle, bassin plaqué.',
    },
    treadmill: {
      name: 'Tapis de course',
      cue: 'Allure où parler reste possible mais devient un peu essoufflé ; ne t’accroche pas aux barres.',
    },
    stationaryBike: {
      name: 'Vélo d’appartement',
      cue: 'Selle réglée pour garder un léger pli du genou en bas ; cadence régulière.',
    },
    rowingMachine: {
      name: 'Rameur',
      cue: 'Pousse d’abord avec les jambes, puis ouvre le buste, puis tire avec les bras — et l’inverse au retour.',
    },
    custom: {
      name: 'Exercice perso',
      cue: '',
    },
  },
} satisfies Dictionary;
