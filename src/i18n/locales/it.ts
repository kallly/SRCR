import type { Translations } from '../index';

export const it: Translations = {
  app: {
    title: 'Seduta — ripresa a corpo libero',
    eyebrow: 'Fase 1 · senza attrezzi',
    heading: 'La mia seduta',
    tagline:
      'Costruisci il tuo allenamento, ordina gli esercizi, regola le pause. Tutto resta su questo dispositivo.',
    sourceCode: 'Codice sorgente',
  },

  lang: {
    label: 'Lingua',
  },

  about: {
    title: 'Informazioni su Séance',
    intro:
      'Séance è un pianificatore e un cronometro per l’allenamento a corpo libero, pensato per riprendere senza attrezzi. Componi il tuo svolgimento a partire da una libreria di esercizi — piegamenti inclinati, squat sulla sedia, wall sit, plank, dead bug, polpacci in piedi, rotazione esterna di spalla, camminata — poi regoli serie, ripetizioni o durate e i tempi di recupero.',
    modes:
      'Due modi di concatenare le serie. In modalità classica esegui tutte le serie di un esercizio prima di passare al successivo, con il recupero impostato su ogni riga. In modalità circuito le serie alternano i gruppi muscolari e una pausa compare solo quando due sforzi dello stesso gruppo devono per forza susseguirsi — l’anteprima mostra la sequenza calcolata prima di iniziare.',
    privacy:
      'Durante la seduta, un lettore a schermo intero mostra il cronometro, l’anello di avanzamento e l’indicazione di esecuzione, mantiene lo schermo acceso e segnala la fine di ogni intervallo. Nessun account, nessun server, nessun dato inviato: seduta e cronologia sono salvate nel browser. L’interfaccia è disponibile in francese, inglese, spagnolo, tedesco e italiano.',
  },

  mode: {
    classic: 'Classico',
    circuit: 'Circuito',
    hintClassic:
      'Tutte le serie di un esercizio, poi si passa al successivo, con il recupero impostato su ogni riga.',
    hintCircuit:
      'Le serie si concatenano alternando i gruppi muscolari. Una pausa compare solo se due sforzi dello stesso gruppo devono susseguirsi.',
  },

  settings: {
    pause: 'Pausa obbligata (s)',
    transition: 'Transizione tra esercizi (s)',
  },

  section: {
    plan: 'Svolgimento',
    library: 'Libreria',
  },

  empty: {
    title: 'Ancora nessun esercizio',
    body: 'Scegli dall’elenco qui sotto per costruire la tua seduta.',
  },

  preview: {
    title: 'Sequenza calcolata',
    lead: {
      one: '{count} serie concatenata alternando i gruppi.',
      other: '{count} serie concatenate alternando i gruppi.',
    },
    noneForced: 'Nessuna pausa obbligata: ogni serie cade su un gruppo diverso dal precedente.',
    forced: {
      one: '{count} pausa obbligata: in quel momento due sforzi dello stesso gruppo si susseguono per forza. Aggiungi un esercizio di un altro gruppo per farla sparire.',
      other:
        '{count} pause obbligate: in quei momenti due sforzi dello stesso gruppo si susseguono per forza. Aggiungi un esercizio di un altro gruppo per farle sparire.',
    },
  },

  actions: {
    addRest: '+ Aggiungi una pausa',
    addCustom: '+ Esercizio personale',
    loadDefault: 'Carica la seduta tipo',
    clearAll: 'Cancella tutto',
  },

  storage: {
    saved: 'Salvato',
    unavailable: 'Salvataggio impossibile: la memoria locale è disattivata in questo browser.',
  },

  item: {
    restName: 'Pausa',
    restSeconds: 'Durata (s)',
    sets: 'Serie',
    effort: 'Tipo',
    reps: 'Ripetizioni',
    seconds: 'Durata (s)',
    group: 'Gruppo muscolare',
    rest: 'Recupero tra le serie (s)',
    delete: 'Elimina',
    moveUp: 'Sposta su',
    moveDown: 'Sposta giù',
  },

  effort: {
    reps: 'Ripetizioni',
    time: 'Durata',
  },

  group: {
    push: 'Petto / braccia',
    shoulders: 'Spalle',
    back: 'Schiena',
    legs: 'Cosce',
    calves: 'Polpacci',
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
    emptyTitle: 'Seduta vuota',
    emptySub: 'Aggiungi un esercizio per iniziare',
    exercises: {
      one: '{count} esercizio',
      other: '{count} esercizi',
    },
    subtitle: '{mode} · ≈ {duration}',
    start: 'Inizia',
  },

  prompt: {
    customName: 'Nome dell’esercizio?',
    loadDefault: 'Sostituire la seduta attuale con quella tipo?',
    clearAll: 'Cancellare tutta la seduta?',
  },

  history: {
    summary: {
      one: '{count} seduta completata. Ultima: {dates}',
      other: '{count} sedute completate. Ultime: {dates}',
    },
  },

  rest: {
    manual: 'Pausa',
    betweenSets: 'Recupero',
    forced: 'Pausa obbligata',
    transition: 'Transizione',
  },

  runner: {
    quit: 'Esci',
    step: 'Passo {current} / {total}',
    next: 'Poi — {name}',
    lastEffort: 'Ultimo sforzo',
    then: 'Poi {name}',
    recover: 'Recupera',
    forcedCue: 'Due sforzi dello stesso gruppo si susseguono: questa pausa è necessaria.',
    transitionCue: 'Mettiti in posizione per l’esercizio successivo.',
    addTime: '+15 s',
    skip: 'Salta',
    setOf: 'Serie {current} di {total}',
    setDone: 'Serie completata',
    reps: {
      one: '{count} rip.',
      other: '{count} rip.',
    },
    readyHint: 'Mettiti in posizione, poi avvia il cronometro.',
    startTimer: 'Avvia il cronometro',
    done: 'Fatto',
    finished: 'Seduta completata',
    finishedCue:
      'Osserva come ti senti domani mattina: la rigidità deve essere tornata alla normalità.',
    close: 'Chiudi',
  },

  exercise: {
    inclined: {
      name: 'Piegamenti inclinati',
      cue: 'Gomiti a circa 45° dal corpo, mai aperti a 90°.',
    },
    chairsquat: {
      name: 'Squat sulla sedia',
      cue: 'Ginocchia in asse con i piedi, controlla la discesa.',
    },
    calf: {
      name: 'Polpacci in piedi',
      cue: '3 s per salire, 3 s per scendere. È la lentezza a fare il lavoro.',
    },
    wallsit: {
      name: 'Wall sit',
      cue: 'Se il ginocchio tira, apri l’angolo a 120°.',
    },
    rotation: {
      name: 'Rotazione esterna di spalla',
      cue: 'Sul fianco, con una bottiglia d’acqua, gomito attaccato al corpo. Ampiezza breve.',
    },
    deadbug: {
      name: 'Dead bug',
      cue: 'Zona lombare sempre a contatto con il pavimento.',
    },
    plank: {
      name: 'Plank',
      cue: 'Glutei contratti. Se il bacino si muove, la serie è finita.',
    },
    walk: {
      name: 'Camminata',
      cue: 'Ritmo sostenuto. La tua base cardio, senza impatto.',
    },
    custom: {
      name: 'Esercizio personale',
      cue: '',
    },
  },
};
