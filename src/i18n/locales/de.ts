import type { Translations } from '../index';

export const de: Translations = {
  app: {
    title: 'Einheit — Wiedereinstieg mit Körpergewicht',
    eyebrow: 'Phase 1 · ohne Geräte',
    heading: 'Meine Einheit',
    tagline: 'Stell dein Training zusammen, ordne die Übungen, leg die Pausen fest.',
    sourceCode: 'Quellcode',
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
    title: 'Über Séance',
    intro:
      'Séance ist ein Planer und Timer für das Training mit dem eigenen Körpergewicht, gedacht für den Wiedereinstieg ohne Geräte. Du stellst deinen Ablauf aus einer Übungsbibliothek zusammen — erhöhte Liegestütze, Kniebeuge zum Stuhl, Wandsitz, Unterarmstütz, Dead Bug, Wadenheben, Außenrotation der Schulter, Gehen — und legst dann Sätze, Wiederholungen oder Dauer sowie die Pausen fest.',
    modes:
      'Zwei Arten, die Sätze aneinanderzureihen. Im klassischen Modus absolvierst du alle Sätze einer Übung, bevor die nächste folgt, mit der Pause aus der jeweiligen Zeile. Im Zirkelmodus wechseln die Sätze die Muskelgruppen, und eine Pause erscheint nur, wenn zwei Belastungen derselben Gruppe zwangsläufig aufeinanderfolgen — die Vorschau zeigt die berechnete Abfolge vor dem Start.',
    privacy:
      'Während der Einheit zeigt ein Vollbild-Player die Uhr, den Fortschrittsring und den Ausführungshinweis, hält den Bildschirm wach und meldet das Ende jedes Intervalls. Kein Konto, kein Server, keine gesendeten Daten: Einheit und Verlauf werden im Browser gespeichert. Die Oberfläche gibt es auf Französisch, Englisch, Spanisch, Deutsch und Italienisch.',
  },

  aiPlan: {
    title: 'Eine Einheit per Link erstellen (für eine KI)',
    intro:
      'Diese Seite kann eine Einheit entgegennehmen, die in ihrer eigenen Adresse beschrieben ist: Beim Öffnen eines solchen Links wird der Import angeboten, und ohne Bestätigung wird nichts gespeichert. Eine KI kann also eine Einheit zusammenstellen und sie dir als Link liefern, ohne Konto und ohne Server. Gib ihr einfach die Adresse dieser Seite.',
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
      'Hier ist eine Seite für Körpergewichtseinheiten: https://kallly.github.io/SRCR/. Erstelle mir eine 20-minütige Oberkörper-Einheit und gib mir den Link zum Importieren.',
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
    loadDefault: 'MusterEinheit laden',
    clearAll: 'Alles löschen',
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
    tagline: 'Planer und Timer für das Training mit dem eigenen Körpergewicht.',
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
    custom: {
      name: 'Eigene Übung',
      cue: '',
    },
  },
};
