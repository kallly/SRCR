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
    custom: {
      name: 'Eigene Übung',
      cue: '',
    },
  },
};
