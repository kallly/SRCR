import type { Translations } from '../index';

export const it: Translations = {
  app: {
    title: 'Seduta — ripresa a corpo libero',
    eyebrow: 'Fase 1 · senza attrezzi',
    heading: 'La mia seduta',
    tagline: 'Costruisci il tuo allenamento, ordina gli esercizi, regola le pause.',
    sourceCode: 'Codice sorgente',
  },

  lang: {
    label: 'Lingua',
  },

  plans: {
    label: 'Seduta',
    new: '+ Nuova seduta',
    duplicate: 'Duplica',
    rename: 'Rinomina',
    delete: 'Elimina',
    unnamed: 'Seduta senza nome',
    namePrompt: 'Nome della seduta?',
    confirmDelete: 'Eliminare questa seduta e il suo programma?',
    copyName: '{name} - copia',
  },

  share: {
    trigger: 'Condividi',
    title: 'Condividi questa seduta',
    hint: 'Scansiona questo codice con uno smartphone, oppure copia il link qui sotto.',
    qrTooLarge: 'Questa seduta è troppo grande per un codice QR: usa il link qui sotto.',
    linkLabel: 'Link di condivisione',
    copy: 'Copia',
    copied: 'Link copiato',
    importTitle: 'Importa una seduta condivisa',
    importSummary: {
      one: '«{name}» — {count} esercizio.',
      other: '«{name}» — {count} esercizi.',
    },
    importConfirm: 'Importa come nuova seduta',
    importAppend: 'Aggiungi alla seduta attiva',
    importReplace: 'Sostituisci «{name}»',
    importInvalid:
      'Questo link non descrive una seduta valida. Se proviene da un’intelligenza artificiale, chiedile di rigenerarlo seguendo il formato indicato in fondo alla pagina iniziale.',
    replaced: 'Seduta sostituita',
    appended: {
      one: '{count} esercizio aggiunto',
      other: '{count} esercizi aggiunti',
    },
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

  aiPlan: {
    title: 'Creare una seduta tramite link (per un’IA)',
    intro:
      'Questa pagina sa ricevere una seduta descritta nel proprio indirizzo: aprire un link del genere propone di importarla, e nulla viene salvato senza conferma. Un’intelligenza artificiale può quindi comporre una seduta e consegnartela sotto forma di link, senza account né server. Basta darle l’indirizzo di questa pagina.',
    format:
      'Il link atteso ha la forma qui sotto: un oggetto JSON che porta il nome della seduta, la modalità di concatenamento e l’elenco delle righe, codificato in base64url nel parametro s.',
    keys:
      'La chiave da usare per ciascun esercizio è indicata in piccolo sotto il suo nome, nell’elenco «Tutte le schede degli esercizi» qui sopra (per esempio catCow sotto «Gatto-mucca») — mai la parola con cui termina l’indirizzo della sua scheda. Il gruppo muscolare, il tipo di sforzo e i valori mancanti sono dedotti dalla libreria. Una chiave sconosciuta diventa un esercizio personalizzato con quel nome. Una riga senza chiave inserisce una pausa.',
    rawLink:
      'Dai sempre questo link così com’è — mai avvolto in una ricerca (google.com/search) né accorciato. Alcuni assistenti aggiungono questo involucro automaticamente: se il link che stai per dare ne contiene uno, toglilo prima di rispondere — l’importazione in un clic funziona solo con il link esatto.',
    spec: 'Specifica completa del formato',
  },

  aiHelp: {
    trigger: 'IA',
    triggerLabel: 'Creare o modificare una seduta con un’IA',
    title: 'Creare o modificare con un’IA',
    intro: 'ChatGPT, Claude e Gemini possono creare o modificare la tua seduta: dagli solo un link.',
    createTitle: 'Creare una seduta',
    createText: 'Copia questo messaggio:',
    createPrompt:
      'Ecco un sito di sedute a corpo libero: https://kallly.github.io/SRCR/. Creami una seduta per la parte superiore del corpo di 20 minuti e dammi il link per importarla.',
    modifyTitle: 'Modificare una seduta',
    modifyText: 'Usa il link di condivisione della tua seduta per chiedere all’IA di modificarla:',
    modifyPrompt:
      'Ecco il link della mia seduta attuale: {link}. Aggiungi un esercizio per i polpacci e rimandami il link aggiornato.',
    linkMask: '[il tuo link]',
    copied: 'Messaggio copiato',
  },

  exerciseInfo: {
    trigger: 'Informazioni sull’esercizio',
    close: 'Chiudi',
    muscles: 'Muscoli coinvolti',
    keyPoints: 'Punti chiave',
    moreInfo: 'Maggiori informazioni',
    unavailable: 'Scheda dettagliata presto disponibile in questa lingua — visualizzazione in francese.',
    loading: 'Caricamento…',
    loadError: 'Impossibile caricare la scheda di questo esercizio.',
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
    sessions: 'Sedute',
    plan: 'Svolgimento',
    library: 'Libreria',
    allGuides: 'Tutte le schede degli esercizi',
    quicknav: 'Sezioni',
  },

  library: {
    search: 'Cerca un esercizio…',
    filterLabel: 'Filtra per gruppo muscolare',
    filterAll: 'Tutti i gruppi',
    noResults: 'Nessun esercizio corrisponde a questa ricerca.',
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
    confirm: 'Conferma',
    cancel: 'Annulla',
  },

  storage: {
    saved: 'Salvato',
    unavailable: 'Salvataggio impossibile: la memoria locale è disattivata in questo browser.',
  },

  toast: {
    deleted: 'Eliminato',
    undo: 'Annulla',
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
    restShort: 's riposo',
    delete: 'Elimina',
    moveUp: 'Sposta su',
    moveDown: 'Sposta giù',
  },

  effort: {
    reps: 'Ripetizioni',
    time: 'Secondi',
    repsShort: 'rip',
    timeShort: 's',
  },

  group: {
    push: 'Petto / braccia',
    shoulders: 'Spalle',
    back: 'Schiena',
    legs: 'Cosce',
    calves: 'Polpacci',
    core: 'Core',
    cardio: 'Cardio',
    glutes: 'Glutei',
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
    readyHint: 'Avviando il cronometro avrai 5 secondi per metterti in posizione.',
    startTimer: 'Avvia il cronometro',
    startingSoon: 'Preparati, si parte tra un istante.',
    skipSetup: 'Inizia subito',
    done: 'Fatto',
    finished: 'Seduta completata',
    finishedCue:
      'Osserva come ti senti domani mattina: la rigidità deve essere tornata alla normalità.',
    close: 'Chiudi',
  },


  page: {
    titleSuffix: 'come si fa',
    description:
      'Come fare {name} correttamente: muscoli coinvolti, tecnica passo dopo passo ed errori frequenti da evitare.',
    back: '← Torna all’app',
    breadcrumb: 'Percorso di navigazione',
    howTo: 'Come eseguire l’esercizio',
    mistakes: 'Errori frequenti',
    sensation: 'Dove deve lavorare',
    rangeOfMotion: 'Ampiezza',
    tempo: 'Ritmo e respirazione',
    anatomy: 'Cosa lavora, di preciso',
    mechanics: 'Meccanica del movimento',
    benefits: 'Benefici',
    progression: 'Adattare e progredire',
    easier: 'Più accessibile',
    harder: 'Più impegnativo',
    readyWhen: 'Passare al livello successivo',
    precautions: 'Precauzioni',
    similar: 'Esercizi simili',
    tagline: 'pianificatore e cronometro per l’allenamento a corpo libero.',
    disclaimer:
      'Queste informazioni sono di carattere generale e non sostituiscono il parere di un professionista sanitario. In caso di dolore, infortunio o patologia nota, chiedi un parere medico prima di iniziare.',
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
    kneePushup: {
      name: 'Piegamenti sulle ginocchia',
      cue: 'Ginocchia a terra, corpo allineato dalle ginocchia alle spalle. Abbassa il petto vicino al pavimento.',
    },
    wallPushup: {
      name: 'Piegamenti al muro',
      cue: 'Mani all’altezza delle spalle sul muro, corpo inclinato e stabile. Ottimo per iniziare.',
    },
    chairDips: {
      name: 'Dip tricipiti sulla sedia',
      cue: 'Mani sul bordo della sedia, gomiti verso dietro. Non scendere oltre i 90°.',
    },
    armCircles: {
      name: 'Circonduzioni delle braccia',
      cue: 'Braccia tese all’altezza delle spalle, cerchi piccoli e regolari. Cambia senso a metà serie.',
    },
    wallSlides: {
      name: 'Scivolamenti al muro',
      cue: 'Schiena e braccia contro il muro, fai scorrere le braccia verso l’alto senza staccare i gomiti.',
    },
    superman: {
      name: 'Superman',
      cue: 'Prono a terra, solleva braccia e gambe insieme. Guarda verso il basso per proteggere il collo.',
    },
    reverseSnowAngel: {
      name: 'Angelo rovesciato a terra',
      cue: 'Prono a terra, braccia tese, disegna un ampio arco fino ai fianchi.',
    },
    birdDog: {
      name: 'Bird dog',
      cue: 'Carponi, distendi un braccio e la gamba opposta. Tieni il bacino fermo.',
    },
    catCow: {
      name: 'Gatto-mucca',
      cue: 'Carponi, alterna schiena arrotondata e incurvata seguendo il respiro.',
    },
    reverseLunge: {
      name: 'Affondo indietro',
      cue: 'Fai un passo indietro con una gamba, scendi finché il ginocchio sfiora il pavimento. Busto eretto.',
    },
    stepUp: {
      name: 'Step-up sulla sedia',
      cue: 'Sali con un piede poi l’altro su una sedia stabile, scendi con controllo.',
    },
    lateralLunge: {
      name: 'Affondo laterale',
      cue: 'Grande passo laterale, piega la gamba d’appoggio mantenendo l’altra tesa.',
    },
    gluteBridge: {
      name: 'Ponte glutei',
      cue: 'Sdraiato, ginocchia piegate, spingi sui talloni e contrai i glutei in alto.',
    },
    donkeyKick: {
      name: 'Donkey kick',
      cue: 'Carponi, spingi un piede verso il soffitto con il ginocchio piegato, senza inarcare la schiena.',
    },
    hipAbduction: {
      name: 'Abduzione d’anca in piedi',
      cue: 'In piedi, solleva una gamba tesa lateralmente senza inclinare il busto.',
    },
    sidePlank: {
      name: 'Plank laterale',
      cue: 'Appoggio su un avambraccio, corpo in linea retta dai piedi alla testa.',
    },
    standingKneeRaise: {
      name: 'Sollevamento ginocchia in piedi',
      cue: 'In piedi, solleva un ginocchio verso il petto mantenendo la schiena dritta.',
    },
    crunch: {
      name: 'Crunch',
      cue: 'Sdraiato, ginocchia piegate, solleva le scapole espirando. Non tirare il collo.',
    },
    highKneeMarch: {
      name: 'Marcia sul posto ginocchia alte',
      cue: 'Marcia sul posto, ginocchia all’altezza dell’anca, ritmo controllato.',
    },
    buttKickMarch: {
      name: 'Marcia sul posto calcio ai glutei',
      cue: 'Marcia sul posto, porta i talloni verso i glutei a ritmo moderato.',
    },
    custom: {
      name: 'Esercizio personale',
      cue: '',
    },
  },
};
