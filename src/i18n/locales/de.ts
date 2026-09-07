import type { Translations } from '../index';

export const de: Translations = {
  app: {
    title: 'CIRKALI — Trainingsplaner und Timer',
    eyebrow: 'Mit oder ohne Geräte',
    heading: 'CIRKALI',
    tagline: 'Stell dein Training zusammen, ordne die Übungen, leg die Pausen fest.',
  },

  lang: {
    label: 'Sprache',
  },

  plans: {
    label: 'Einheit',
    new: '+ Neue Einheit',
    duplicate: 'Duplizieren',
    rename: 'Umbenennen',
    delete: 'Löschen',
    unnamed: 'Unbenannte Einheit',
    namePrompt: 'Name der Einheit?',
    confirmDelete: 'Diese Einheit und ihren Ablauf löschen?',
    copyName: '{name} - Kopie',
  },

  account: {
    label: 'Konto',
    title: 'Online-Sicherung',
    intro:
      'Ohne Anmeldung liegen deine Einheiten nur in diesem Browser: Wer ihn leert oder das Gerät wechselt, verliert sie. Mit einer Google-Anmeldung werden sie automatisch gesichert und du findest sie überall wieder.',
    signIn: 'Mit Google anmelden',
    signOut: 'Abmelden',
    signOutNotice:
      'Abmelden löscht nichts: Deine Einheiten bleiben in diesem Browser, sie werden nur nicht mehr online gesichert.',
    lastSync: 'Zuletzt synchronisiert: {time}',
    neverSynced: 'Noch nicht synchronisiert.',
    statusSynced: 'synchronisiert',
    statusSyncing: 'wird synchronisiert…',
    statusOffline: 'offline, wird bei Netz fortgesetzt',
    statusError: 'Synchronisierung nicht möglich, Einheiten bleiben hier',
    signInError: 'Anmeldung fehlgeschlagen. Versuche es gleich noch einmal.',
    merged: {
      one: '{count} Einheit aus deinem Konto geholt',
      other: '{count} Einheiten aus deinem Konto geholt',
    },
  },

  share: {
    trigger: 'Teilen',
    title: 'Diese Einheit teilen',
    hint: 'Diesen Code mit einem Smartphone scannen oder den Link unten kopieren.',
    qrTooLarge: 'Diese Einheit ist zu groß für einen QR-Code: verwende stattdessen den Link unten.',
    linkLabel: 'Freigabelink',
    copy: 'Kopieren',
    copied: 'Link kopiert',
    importTitle: 'Geteilte Einheit importieren',
    importSummary: {
      one: '„{name}“ — {count} Übung.',
      other: '„{name}“ — {count} Übungen.',
    },
    importConfirm: 'Als neue Einheit importieren',
    importAppend: 'Zur aktiven Einheit hinzufügen',
    importReplace: '„{name}“ ersetzen',
    importInvalid:
      'Dieser Link beschreibt keine gültige Einheit. Wenn er von einer KI stammt, bitte sie, den Link erneut im Format zu erzeugen, das unten auf der Startseite beschrieben ist.',
    replaced: 'Einheit ersetzt',
    appended: {
      one: '{count} Übung hinzugefügt',
      other: '{count} Übungen hinzugefügt',
    },
  },

  about: {
    title: 'Über CIRKALI',
    intro:
      'CIRKALI ist ein Trainingsplaner und Timer. Du stellst deinen Ablauf aus einer Übungsbibliothek zusammen, die sich nach der verfügbaren Ausrüstung filtern lässt — Körpergewicht, Widerstandsband, Kurzhanteln, Gerät — oder nach dem Moment der Einheit, Aufwärmen und Dehnen eingeschlossen. Jede Zeile wird danach in Sätzen, Wiederholungen oder Dauer eingestellt, mit ihrer eigenen Pause.',
    modes:
      'Zwei Arten, die Sätze aneinanderzureihen. Im klassischen Modus absolvierst du alle Sätze einer Übung, bevor die nächste folgt, mit der Pause aus der jeweiligen Zeile. Im Zirkelmodus wechseln die Sätze die Muskelgruppen, und eine Pause erscheint nur, wenn zwei Belastungen derselben Gruppe zwangsläufig aufeinanderfolgen — die Vorschau zeigt die berechnete Abfolge vor dem Start.',
    privacy:
      'Während der Einheit zeigt ein Vollbild-Player die Uhr, den Fortschrittsring und den Ausführungshinweis, hält den Bildschirm wach und meldet das Ende jedes Intervalls. Kein Konto nötig: Einheit und Verlauf werden im Browser gespeichert. Eine optionale Google-Anmeldung sichert sie online, damit du sie auf jedem Gerät wiederfindest. Die Oberfläche gibt es auf Französisch, Englisch, Spanisch, Deutsch und Italienisch.',
  },

  aiPlan: {
    title: 'Eine Einheit mit einer KI erstellen',
    intro:
      'Bitte ChatGPT, Claude oder Gemini, dir eine Einheit zusammenzustellen: Gib ihnen die Adresse dieser Seite, und du bekommst einen Link zurück. Beim Öffnen zeigt die App die Einheit und fragt, ob du sie behalten möchtest — ohne deine Zustimmung wird nichts gespeichert. Die Schaltfläche „KI“ oben auf der Seite legt die Nachricht zum Kopieren bereit.',
    forAi: 'Das Folgende richtet sich an die KI. Menschliche Leser können es überspringen.',
    format:
      'Der erwartete Link hat die unten gezeigte Form: ein JSON-Objekt mit dem Namen der Einheit, dem Ablaufmodus und der Liste der Zeilen, als base64url im Parameter s abgelegt.',
    keys:
      'Der zu verwendende Schlüssel steht klein unter dem Namen jeder Übung, in der Liste „Alle Übungsseiten“ oben (z. B. catCow unter „Katze-Kuh“) — niemals das Wort am Ende der Adresse ihrer Seite. Muskelgruppe, Belastungsart und fehlende Werte stammen aus der Bibliothek. Ein unbekannter Schlüssel wird zu einer eigenen Übung mit diesem Namen. Eine Zeile ohne Schlüssel fügt eine Pause ein.',
    rawLink:
      'Gib diesen Link immer genau so an — niemals in eine Suche verpackt (google.com/search) oder gekürzt. Manche Assistenten fügen diese Hülle automatisch hinzu: enthält der Link, den du gerade geben willst, eine solche, entferne sie vor der Antwort — der Import per Klick funktioniert nur mit dem exakten Link.',
    spec: 'Vollständige Formatspezifikation',
  },

  aiHelp: {
    trigger: 'KI',
    triggerLabel: 'Eine Einheit mit einer KI erstellen oder ändern',
    title: 'Erstellen oder ändern mit einer KI',
    intro: 'ChatGPT, Claude und Gemini können deine Einheit erstellen oder ändern: gib ihnen einfach einen Link.',
    createTitle: 'Eine Einheit erstellen',
    createText: 'Kopiere diese Nachricht:',
    createPrompt:
      'Hier ist eine Seite zum Zusammenstellen von Trainingseinheiten: https://cirkali.fr/. Erstelle mir eine 20-minütige Oberkörper-Einheit und gib mir den Link zum Importieren.',
    modifyTitle: 'Eine Einheit ändern',
    modifyText: 'Nutze den Freigabelink deiner Einheit, um die KI um eine Änderung zu bitten:',
    modifyPrompt:
      'Hier ist der Link zu meiner aktuellen Einheit: {link}. Füge eine Wadenübung hinzu und schick mir den aktualisierten Link zurück.',
    linkMask: '[dein Link]',
    copied: 'Nachricht kopiert',
  },

  exerciseInfo: {
    trigger: 'Informationen zur Übung',
    close: 'Schließen',
    equipment: 'Ausrüstung',
    muscles: 'Beanspruchte Muskeln',
    keyPoints: 'Wichtigste Punkte',
    moreInfo: 'Mehr erfahren',
    unavailable: 'Ausführliche Seite in dieser Sprache bald verfügbar — Anzeige auf Französisch.',
    loading: 'Wird geladen…',
    loadError: 'Die Seite zu dieser Übung konnte nicht geladen werden.',
  },

  mode: {
    classic: 'Klassisch',
    circuit: 'Zirkel',
    hintClassic:
      'Alle Sätze einer Übung, dann weiter zur nächsten, mit der Pause aus der jeweiligen Zeile.',
    hintCircuit:
      'Die Sätze folgen aufeinander und wechseln dabei die Muskelgruppen. Eine Pause erscheint nur, wenn zwei Belastungen derselben Gruppe aufeinanderfolgen müssen.',
  },

  settings: {
    pause: 'Erzwungene Pause (s)',
    transition: 'Übergang zwischen Übungen (s)',
  },

  section: {
    sessions: 'Einheiten',
    plan: 'Ablauf',
    library: 'Bibliothek',
    allGuides: 'Alle Übungsanleitungen',
    quicknav: 'Abschnitte',
  },

  library: {
    search: 'Übung suchen…',
    filterLabel: 'Nach Muskelgruppe filtern',
    filterAll: 'Alle Gruppen',
    filterCategoryLabel: 'Nach Ausrüstung filtern',
    noResults: 'Keine Übung entspricht dieser Suche.',
  },

  empty: {
    title: 'Noch keine Übungen',
    body: 'Wähle unten aus der Liste, um deine Einheit aufzubauen.',
  },

  preview: {
    title: 'Berechnete Abfolge',
    lead: {
      one: '{count} Satz im Wechsel der Gruppen aneinandergereiht.',
      other: '{count} Sätze im Wechsel der Gruppen aneinandergereiht.',
    },
    noneForced: 'Keine erzwungene Pause: Jeder Satz trifft eine andere Gruppe als der vorige.',
    forced: {
      one: '{count} erzwungene Pause — an dieser Stelle folgen zwangsläufig zwei Belastungen derselben Gruppe aufeinander. Füge eine Übung einer anderen Gruppe hinzu, damit sie verschwindet.',
      other:
        '{count} erzwungene Pausen — an diesen Stellen folgen zwangsläufig zwei Belastungen derselben Gruppe aufeinander. Füge eine Übung einer anderen Gruppe hinzu, damit sie verschwinden.',
    },
  },

  actions: {
    addRest: '+ Pause hinzufügen',
    addCustom: '+ Eigene Übung',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
  },

  storage: {
    saved: 'Gespeichert',
    unavailable: 'Speichern nicht möglich: Der lokale Speicher ist in diesem Browser deaktiviert.',
  },

  toast: {
    deleted: 'Gelöscht',
    undo: 'Rückgängig',
  },

  item: {
    restName: 'Pause',
    restSeconds: 'Dauer (s)',
    sets: 'Sätze',
    effort: 'Art',
    reps: 'Wiederholungen',
    seconds: 'Dauer (s)',
    group: 'Muskelgruppe',
    rest: 'Pause zwischen Sätzen (s)',
    restShort: 's Pause',
    delete: 'Löschen',
    moveUp: 'Nach oben',
    moveDown: 'Nach unten',
  },

  effort: {
    reps: 'Wiederholungen',
    time: 'Sekunden',
    repsShort: 'Wdh',
    timeShort: 's',
  },

  group: {
    push: 'Brust',
    shoulders: 'Schultern',
    back: 'Rücken',
    arms: 'Arme',
    legs: 'Oberschenkel',
    calves: 'Waden',
    core: 'Rumpf',
    cardio: 'Ausdauer',
    glutes: 'Gesäß',
  },

  category: {
    warmup: 'Aufwärmen',
    stretching: 'Dehnen',
    bodyweight: 'Körpergewicht',
    band: 'Widerstandsband',
    dumbbell: 'Kurzhanteln',
    machine: 'Gerät',
  },

  duration: {
    minutes: '{count} Min.',
    seconds: '{count} s',
  },

  summary: {
    sets: '{sets} × {effort}',
  },

  bar: {
    emptyTitle: 'Leere Einheit',
    emptySub: 'Füge eine Übung hinzu, um zu starten',
    exercises: {
      one: '{count} Übung',
      other: '{count} Übungen',
    },
    subtitle: '{mode} · ≈ {duration}',
    start: 'Starten',
  },

  prompt: {
    customName: 'Name der Übung?',
  },

  history: {
    summary: {
      one: '{count} Einheit abgeschlossen. Zuletzt: {dates}',
      other: '{count} Einheiten abgeschlossen. Zuletzt: {dates}',
    },
  },

  rest: {
    manual: 'Pause',
    betweenSets: 'Erholung',
    forced: 'Erzwungene Pause',
    transition: 'Übergang',
  },

  runner: {
    quit: 'Beenden',
    step: 'Schritt {current} / {total}',
    next: 'Danach — {name}',
    lastEffort: 'Letzte Belastung',
    then: 'Dann {name}',
    recover: 'Erhol dich',
    forcedCue:
      'Zwei Belastungen derselben Gruppe folgen aufeinander: Diese Pause ist notwendig.',
    transitionCue: 'Stell dich für die nächste Übung bereit.',
    addTime: '+15 s',
    skip: 'Überspringen',
    setOf: 'Satz {current} von {total}',
    setDone: 'Satz beendet',
    reps: {
      one: '{count} Wdh.',
      other: '{count} Wdh.',
    },
    readyHint: 'Wenn du die Uhr startest, hast du 5 Sekunden, um in Position zu gehen.',
    startTimer: 'Uhr starten',
    startingSoon: 'Mach dich bereit, es geht gleich los.',
    skipSetup: 'Jetzt starten',
    done: 'Fertig',
    finished: 'Einheit beendet',
    finishedCue:
      'Achte darauf, wie du dich morgen früh fühlst: Die Steifheit sollte wieder normal sein.',
    close: 'Schließen',
  },


  page: {
    titleSuffix: 'so geht’s',
    description:
      'Wie du {name} richtig ausführst: beanspruchte Muskeln, Technik Schritt für Schritt und die häufigsten Fehler.',
    back: '← Zurück zur App',
    breadcrumb: 'Brotkrümelnavigation',
    howTo: 'So führst du die Übung aus',
    mistakes: 'Häufige Fehler',
    sensation: 'Wo es arbeiten soll',
    rangeOfMotion: 'Bewegungsumfang',
    tempo: 'Tempo und Atmung',
    anatomy: 'Was genau arbeitet',
    mechanics: 'Mechanik der Bewegung',
    benefits: 'Nutzen',
    progression: 'Anpassen und steigern',
    easier: 'Leichter',
    harder: 'Anspruchsvoller',
    readyWhen: 'Weitergehen, wenn',
    precautions: 'Vorsichtsmaßnahmen',
    similar: 'Ähnliche Übungen',
    tagline: 'Trainingsplaner und Timer, mit oder ohne Geräte.',
    disclaimer:
      'Diese Informationen sind allgemeiner Art und ersetzen keine ärztliche Beratung. Bei Schmerzen, Verletzungen oder bekannten Vorerkrankungen hole vor dem Start ärztlichen Rat ein.',
  },

  exercise: {
    inclined: {
      name: 'Liegestütze erhöht',
      cue: 'Ellbogen etwa 45° zum Körper, nie auf 90° abgespreizt.',
    },
    chairsquat: {
      name: 'Kniebeuge zum Stuhl',
      cue: 'Knie in der Achse der Füße, die Abwärtsbewegung kontrollieren.',
    },
    calf: {
      name: 'Wadenheben im Stehen',
      cue: '3 s hoch, 3 s runter. Die Langsamkeit macht die Arbeit.',
    },
    wallsit: {
      name: 'Wandsitz',
      cue: 'Wenn das Knie zieht, öffne den Winkel auf 120°.',
    },
    rotation: {
      name: 'Außenrotation der Schulter',
      cue: 'In Seitenlage, mit einer Wasserflasche, Ellbogen am Körper. Kleiner Bewegungsumfang.',
    },
    deadbug: {
      name: 'Dead Bug',
      cue: 'Der untere Rücken bleibt durchgehend am Boden.',
    },
    plank: {
      name: 'Unterarmstütz',
      cue: 'Gesäß fest anspannen. Wenn das Becken wandert, ist der Satz vorbei.',
    },
    walk: {
      name: 'Gehen',
      cue: 'Zügiges Tempo. Deine Ausdauerbasis, ohne Stoßbelastung.',
    },
    kneePushup: {
      name: 'Liegestütze auf Knien',
      cue: 'Knie am Boden, Körper von den Knien bis zu den Schultern ausgerichtet. Brust nah zum Boden senken.',
    },
    wallPushup: {
      name: 'Liegestütze an der Wand',
      cue: 'Hände auf Schulterhöhe an der Wand, Körper geneigt und angespannt. Guter Einstieg.',
    },
    chairDips: {
      name: 'Trizeps-Dips am Stuhl',
      cue: 'Hände auf der Stuhlkante, Ellbogen zeigen nach hinten. Nicht tiefer als 90° gehen.',
    },
    armCircles: {
      name: 'Armkreisen',
      cue: 'Arme auf Schulterhöhe ausgestreckt, kleine gleichmäßige Kreise. Nach der Hälfte die Richtung wechseln.',
    },
    wallSlides: {
      name: 'Wandgleiten',
      cue: 'Rücken und Arme an der Wand, Arme nach oben gleiten lassen, ohne die Ellbogen abzuheben.',
    },
    superman: {
      name: 'Superman',
      cue: 'Bauchlage, Arme und Beine gleichzeitig heben. Nach unten schauen, um den Nacken zu schonen.',
    },
    reverseSnowAngel: {
      name: 'Umgekehrter Schneeengel',
      cue: 'Bauchlage, Arme gestreckt, einen weiten Bogen bis zu den Hüften ziehen.',
    },
    birdDog: {
      name: 'Vogelhund (Bird Dog)',
      cue: 'Im Vierfüßlerstand einen Arm und das gegenüberliegende Bein ausstrecken. Becken ruhig halten.',
    },
    catCow: {
      name: 'Katze-Kuh',
      cue: 'Im Vierfüßlerstand abwechselnd den Rücken runden und durchhängen lassen, im Atemrhythmus.',
    },
    reverseLunge: {
      name: 'Rückwärtsausfallschritt',
      cue: 'Ein Bein nach hinten setzen, absenken bis das Knie fast den Boden berührt. Oberkörper aufrecht.',
    },
    stepUp: {
      name: 'Aufsteigen auf den Stuhl',
      cue: 'Einen Fuß, dann den anderen auf einen stabilen Stuhl stellen, kontrolliert zurücksteigen.',
    },
    lateralLunge: {
      name: 'Seitlicher Ausfallschritt',
      cue: 'Großer Schritt zur Seite, das Standbein beugen, das andere Bein bleibt gestreckt.',
    },
    gluteBridge: {
      name: 'Gesäßbrücke',
      cue: 'Rückenlage, Knie gebeugt, durch die Fersen drücken und die Gesäßmuskeln oben anspannen.',
    },
    donkeyKick: {
      name: 'Eselstritt (Donkey Kick)',
      cue: 'Im Vierfüßlerstand einen Fuß mit gebeugtem Knie Richtung Decke drücken, ohne den Rücken durchzuwölben.',
    },
    hipAbduction: {
      name: 'Hüftabduktion im Stehen',
      cue: 'Im Stehen ein gestrecktes Bein zur Seite heben, ohne den Oberkörper zu neigen.',
    },
    sidePlank: {
      name: 'Seitstütz',
      cue: 'Abstützen auf einem Unterarm, Körper in einer geraden Linie von den Füßen bis zum Kopf.',
    },
    standingKneeRaise: {
      name: 'Knieheben im Stehen',
      cue: 'Im Stehen ein Knie Richtung Brust heben, Rücken dabei gerade halten.',
    },
    crunch: {
      name: 'Crunch',
      cue: 'Rückenlage, Knie gebeugt, beim Ausatmen die Schulterblätter anheben. Nicht am Nacken ziehen.',
    },
    highKneeMarch: {
      name: 'Kniehebelauf auf der Stelle',
      cue: 'Auf der Stelle marschieren, Knie bis Hüfthöhe, kontrolliertes Tempo.',
    },
    buttKickMarch: {
      name: 'Anfersen auf der Stelle',
      cue: 'Auf der Stelle marschieren, Fersen im moderaten Tempo Richtung Gesäß führen.',
    },
    bandPullApart: {
      name: 'Band Pull-Apart',
      cue: 'Arme vor dem Körper gestreckt, Band zwischen den Händen gespannt, auseinanderziehen und Schulterblätter zusammenziehen.',
    },
    bandSquat: {
      name: 'Kniebeuge mit Band',
      cue: 'Band unter den Füßen und über den Schultern, wie bei einer normalen Kniebeuge absenken, Rücken gerade.',
    },
    dumbbellGobletSquat: {
      name: 'Goblet Squat',
      cue: 'Kurzhantel mit beiden Händen vor der Brust halten, absenken und Ellbogen zwischen den Knien führen.',
    },
    dumbbellRow: {
      name: 'Einarmiges Kurzhantelrudern',
      cue: 'Ein Knie und eine Hand auf einer Bank abstützen, Kurzhantel zur Hüfte ziehen, Rücken dabei flach halten.',
    },
    legPressMachine: {
      name: 'Beinpresse',
      cue: 'Füße flach auf der Platte, schulterbreit, drücken ohne die Knie ganz durchzustrecken.',
    },
    latPulldownMachine: {
      name: 'Latzug',
      cue: 'Stange breiter als schulterbreit greifen und zur oberen Brust ziehen, Oberkörper dabei aufrecht halten.',
    },
    hamstringStretch: {
      name: 'Dehnung der Beinrückseite',
      cue: 'Ferse auf einer Erhöhung ablegen, Bein gestreckt, Oberkörper nach vorne beugen ohne den Rücken zu runden.',
    },
    chestDoorwayStretch: {
      name: 'Brustdehnung im Türrahmen',
      cue: 'Unterarm gegen den Türrahmen, Ellbogen auf Schulterhöhe, Oberkörper sanft nach vorne bewegen.',
    },
    squat: {
      name: 'Kniebeuge',
      cue: 'Füße hüftbreit, Hüfte nach hinten schieben und absenken, bis die Oberschenkel fast waagerecht sind, Oberkörper aufrecht.',
    },
    pushup: {
      name: 'Liegestütz',
      cue: 'Hände unter den Schultern, Körper von Fersen bis Kopf gerade, absenken bis knapp über den Boden.',
    },
    pikePushup: {
      name: 'Pike-Liegestütz',
      cue: 'Hüfte hoch im umgekehrten V, den Scheitel zwischen den Händen Richtung Boden senken.',
    },
    mountainClimber: {
      name: 'Bergsteiger',
      cue: 'In der Liegestützposition abwechselnd ein Knie zur Brust ziehen, ohne die Hüfte anzuheben.',
    },
    legSwing: {
      name: 'Beinpendeln',
      cue: 'Mit einer Hand abstützen, ein Bein vor und zurück schwingen, Umfang steigern, Becken ruhig.',
    },
    torsoTwist: {
      name: 'Rumpfrotation',
      cue: 'Im Stand, Füße fest, den Oberkörper abwechselnd zur Seite drehen, Arme locker.',
    },
    quadStretch: {
      name: 'Quadrizepsdehnung im Stand',
      cue: 'Im Stand den Knöchel greifen und die Ferse zum Gesäß ziehen, Knie nebeneinander.',
    },
    gluteStretch: {
      name: 'Gesäßdehnung (Vierer-Position)',
      cue: 'In Rückenlage den Knöchel über das andere Knie legen und den stützenden Oberschenkel zu dir ziehen.',
    },
    calfStretch: {
      name: 'Wadendehnung an der Wand',
      cue: 'Hände an die Wand, hinteres Bein gestreckt, Ferse am Boden, Becken nach vorne schieben.',
    },
    childPose: {
      name: 'Stellung des Kindes',
      cue: 'Im Knien auf die Fersen setzen und die Arme weit nach vorne strecken, Stirn Richtung Boden.',
    },
    tricepsStretch: {
      name: 'Trizepsdehnung über Kopf',
      cue: 'Ellbogen gebeugt zur Decke, Hand zwischen die Schulterblätter, den Ellbogen mit der anderen Hand sanft schieben.',
    },
    bandChestPress: {
      name: 'Brustdrücken mit Band',
      cue: 'Band um den Rücken, Hände auf Brusthöhe, nach vorne bis zur vollen Armstreckung drücken.',
    },
    bandLateralRaise: {
      name: 'Seitheben mit Band',
      cue: 'Band unter den Füßen, gestreckte Arme seitlich bis auf Schulterhöhe heben.',
    },
    bandLateralWalk: {
      name: 'Seitschritte mit Band',
      cue: 'Band über den Knien, halbe Kniebeuge, Schritte zur Seite ohne die Knie einknicken zu lassen.',
    },
    bandCurl: {
      name: 'Bizepscurl mit Band',
      cue: 'Band unter den Füßen, Ellbogen am Körper, die Hände zu den Schultern führen.',
    },
    dumbbellShoulderPress: {
      name: 'Schulterdrücken mit Kurzhanteln',
      cue: 'Kurzhanteln auf Schulterhöhe, über den Kopf drücken ohne im unteren Rücken ins Hohlkreuz zu gehen.',
    },
    dumbbellFloorPress: {
      name: 'Kurzhantel-Bodendrücken',
      cue: 'Auf dem Boden liegend, Knie gebeugt, Kurzhanteln nach oben drücken; unten berühren die Ellbogen den Boden.',
    },
    dumbbellRomanianDeadlift: {
      name: 'Rumänisches Kreuzheben',
      cue: 'Knie nur leicht gebeugt, Hüfte nach hinten schieben und die Kurzhanteln an den Beinen entlang absenken, Rücken flach.',
    },
    dumbbellCalfRaise: {
      name: 'Wadenheben mit Kurzhanteln',
      cue: 'Kurzhanteln seitlich, auf die Fußballen hochgehen und langsam absenken.',
    },
    dumbbellCurl: {
      name: 'Bizepscurl mit Kurzhantel',
      cue: 'Ellbogen am Körper, die Kurzhantel ohne Schwung aus dem Oberkörper hochführen.',
    },
    dumbbellTricepsExtension: {
      name: 'Trizepsstrecken über Kopf',
      cue: 'Kurzhantel mit beiden Händen über dem Kopf, hinter den Nacken absenken, Ellbogen eng.',
    },
    chestPressMachine: {
      name: 'Brustpresse',
      cue: 'Rücken angelehnt, Griffe auf Brusthöhe, drücken ohne die Ellbogen ganz durchzustrecken.',
    },
    legCurlMachine: {
      name: 'Beinbeuger',
      cue: 'Rolle an den unteren Waden, die Knie kontrolliert beugen, Becken flach.',
    },
    treadmill: {
      name: 'Laufband',
      cue: 'Ein Tempo, bei dem Sprechen möglich, aber etwas außer Atem ist; nicht an den Griffen hängen.',
    },
    stationaryBike: {
      name: 'Heimtrainer',
      cue: 'Sattel so eingestellt, dass das Knie unten leicht gebeugt bleibt; gleichmäßige Trittfrequenz.',
    },
    rowingMachine: {
      name: 'Rudergerät',
      cue: 'Zuerst mit den Beinen drücken, dann den Oberkörper öffnen, dann mit den Armen ziehen — beim Zurück umgekehrt.',
    },
    custom: {
      name: 'Eigene Übung',
      cue: '',
    },
  },
};
