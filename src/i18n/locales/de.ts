import type { Translations } from '../index';

export const de: Translations = {
  app: {
    title: 'Einheit — Wiedereinstieg mit Körpergewicht',
    eyebrow: 'Phase 1 · ohne Geräte',
    heading: 'Meine Einheit',
    tagline:
      'Stell dein Training zusammen, ordne die Übungen, leg die Pausen fest. Alles bleibt auf diesem Gerät.',
    sourceCode: 'Quellcode',
  },

  lang: {
    label: 'Sprache',
  },

  about: {
    title: 'Über Séance',
    intro:
      'Séance ist ein Planer und Timer für das Training mit dem eigenen Körpergewicht, gedacht für den Wiedereinstieg ohne Geräte. Du stellst deinen Ablauf aus einer Übungsbibliothek zusammen — erhöhte Liegestütze, Kniebeuge zum Stuhl, Wandsitz, Unterarmstütz, Dead Bug, Wadenheben, Außenrotation der Schulter, Gehen — und legst dann Sätze, Wiederholungen oder Dauer sowie die Pausen fest.',
    modes:
      'Zwei Arten, die Sätze aneinanderzureihen. Im klassischen Modus absolvierst du alle Sätze einer Übung, bevor die nächste folgt, mit der Pause aus der jeweiligen Zeile. Im Zirkelmodus wechseln die Sätze die Muskelgruppen, und eine Pause erscheint nur, wenn zwei Belastungen derselben Gruppe zwangsläufig aufeinanderfolgen — die Vorschau zeigt die berechnete Abfolge vor dem Start.',
    privacy:
      'Während der Einheit zeigt ein Vollbild-Player die Uhr, den Fortschrittsring und den Ausführungshinweis, hält den Bildschirm wach und meldet das Ende jedes Intervalls. Kein Konto, kein Server, keine gesendeten Daten: Einheit und Verlauf werden im Browser gespeichert. Die Oberfläche gibt es auf Französisch, Englisch, Spanisch, Deutsch und Italienisch.',
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
    plan: 'Ablauf',
    library: 'Bibliothek',
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
    loadDefault: 'MusterEinheit laden',
    clearAll: 'Alles löschen',
  },

  storage: {
    saved: 'Gespeichert',
    unavailable: 'Speichern nicht möglich: Der lokale Speicher ist in diesem Browser deaktiviert.',
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
    delete: 'Löschen',
    moveUp: 'Nach oben',
    moveDown: 'Nach unten',
  },

  effort: {
    reps: 'Wiederholungen',
    time: 'Dauer',
  },

  group: {
    push: 'Brust / Arme',
    shoulders: 'Schultern',
    back: 'Rücken',
    legs: 'Oberschenkel',
    calves: 'Waden',
    core: 'Rumpf',
    cardio: 'Ausdauer',
    glutes: 'Gesäß',
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
    loadDefault: 'Die aktuelle Einheit durch die Muster-Einheit ersetzen?',
    clearAll: 'Die gesamte Einheit löschen?',
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
    readyHint: 'Geh in Position, dann starte die Uhr.',
    startTimer: 'Uhr starten',
    done: 'Fertig',
    finished: 'Einheit beendet',
    finishedCue:
      'Achte darauf, wie du dich morgen früh fühlst: Die Steifheit sollte wieder normal sein.',
    close: 'Schließen',
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
    custom: {
      name: 'Eigene Übung',
      cue: '',
    },
  },
};
