// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

import type { Translations } from '../index';

export const it: Translations = {
  app: {
    title: 'CIRKALI — pianificatore e cronometro di allenamento',
    eyebrow: 'Con o senza attrezzi',
    heading: 'CIRKALI',
    tagline: 'Costruisci il tuo allenamento, ordina gli esercizi, regola le pause.',
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

  presets: {
    groupMine: 'Le mie sedute',
    group: 'Sedute CIRKALI',
    badge: 'Seduta CIRKALI',
    note: 'Seduta tipo. Modificala per farla tua.',
    makeMine: 'Crea la mia versione',
    adoptTitle: 'Creare la tua versione?',
    adoptText: 'Le tue modifiche andranno nella tua copia di «{name}».',
    adoptConfirm: 'Crea la mia versione',
    adopted: '«{name}» aggiunta alle tue sedute',
    name: {
      fullBody: 'Total body senza attrezzi',
      beginner: 'Iniziare con dolcezza',
      upperBody: 'Parte superiore',
      lowerBody: 'Gambe e glutei',
      core: 'Core espresso',
      stretching: 'Stretching della sera',
    },
  },

  account: {
    label: 'Account',
    title: 'Backup online',
    intro:
      'Senza accesso le tue sedute restano solo in questo browser: svuotarlo o cambiare dispositivo le fa sparire. Accedendo con Google vengono salvate automaticamente e le ritrovi ovunque.',
    signIn: 'Accedi con Google',
    signOut: 'Esci',
    signOutNotice:
      'Uscire non cancella nulla: le tue sedute restano in questo browser, semplicemente smettono di essere salvate online.',
    lastSync: 'Ultima sincronizzazione: {time}',
    neverSynced: 'Non ancora sincronizzato.',
    statusSynced: 'sincronizzato',
    statusSyncing: 'sincronizzazione…',
    statusOffline: 'offline, riprenderà al ritorno della rete',
    statusError: 'sincronizzazione non riuscita, sedute conservate qui',
    statusTooLarge: 'troppe sedute per il salvataggio online',
    storageNotice: 'Questo browser cancella le sedute dopo 7 giorni senza visite. Un account le conserva.',
    signInError: 'Accesso non riuscito. Riprova tra un istante.',
    merged: {
      one: '{count} seduta recuperata dal tuo account',
      other: '{count} sedute recuperate dal tuo account',
    },
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
    title: 'Informazioni su CIRKALI',
    intro:
      'CIRKALI è un pianificatore e un cronometro di allenamento. Componi il tuo svolgimento a partire da una libreria di esercizi filtrabile in base all’attrezzatura di cui disponi — corpo libero, elastico, manubri, macchina — o in base al momento della seduta, riscaldamento e allungamento compresi. Ogni riga si regola poi in serie, ripetizioni o durata, con il proprio recupero.',
    modes:
      'Due modi di concatenare le serie. In modalità classica esegui tutte le serie di un esercizio prima di passare al successivo, con il recupero impostato su ogni riga. In modalità circuito le serie alternano i gruppi muscolari e una pausa compare solo quando due sforzi dello stesso gruppo devono per forza susseguirsi — l’anteprima mostra la sequenza calcolata prima di iniziare.',
    privacy:
      'Durante la seduta, un lettore a schermo intero mostra il cronometro, l’anello di avanzamento e l’indicazione di esecuzione, mantiene lo schermo acceso e segnala la fine di ogni intervallo. Nessun account obbligatorio: seduta e cronologia sono salvate nel browser. Un accesso con Google, facoltativo, le salva online per ritrovarle su ogni dispositivo. L’interfaccia è disponibile in francese, inglese, spagnolo, tedesco e italiano.',
  },

  ads: {
    label: 'Pubblicità',
    none: 'CIRKALI non mostra alcuna pubblicità su mobile: su un telefono non viene creato nessuno spazio e non viene scaricato nessuno script pubblicitario. Su schermo grande, due annunci occupano i margini che l’impaginazione lascia vuoti: non spezzano mai il contenuto e restano nascosti durante la sessione.',
  },

  notFound: {
    title: 'Pagina non trovata',
    lead: 'Questo indirizzo non corrisponde a nessuna pagina del sito. Forse il link contiene un errore, oppure la pagina ha cambiato indirizzo.',
  },

  privacy: {
    title: 'Riservatezza',
    lead: 'CIRKALI funziona senza account e senza server: la sessione che componi vive nel tuo browser. Questa pagina dice che cosa viene salvato, che cosa esce dal dispositivo e a quali condizioni.',
    updated: 'Ultimo aggiornamento: {date}',
    localTitle: 'Ciò che resta sul tuo dispositivo',
    libraryTitle: 'Gli esercizi che crei tu',
    libraryText: 'Quando aggiungi un esercizio che non è nella libreria, ci vengono trasmessi il suo nome e il gruppo muscolare che hai scelto. Servono a una cosa sola: individuare gli esercizi che mancano al catalogo e aggiungerli. Non parte nient’altro — nessun identificativo, nessuna sessione, nessuna informazione sul tuo dispositivo — e questi invii non possono essere ricondotti a te.',
    localText: 'Le tue sessioni, le tue impostazioni, la lingua scelta e lo storico delle sessioni concluse sono salvati nella memoria locale del browser. Non vengono inviati da nessuna parte e nessuno oltre a te può leggerli. Cancellare i dati del sito li elimina definitivamente.',
    accountTitle: 'L’accesso con Google, facoltativo',
    accountText: 'Accedere con Google è una scelta, mai un obbligo: finché non lo fai, il kit Firebase non viene nemmeno scaricato. Se accedi, il tuo indirizzo e-mail e le tue sessioni sono salvati presso Google (Firebase Authentication e Cloud Firestore) per ritrovarli sugli altri dispositivi. Disconnettersi ferma la sincronizzazione; la copia online resta finché non ne chiedi la cancellazione.',
    analyticsTitle: 'Misurazione del pubblico',
    analyticsText: 'Il sito usa Google Analytics (identificativo di misurazione {ga}) per contare le visite e sapere quali pagine vengono lette. Lo script viene caricato solo dopo che la pagina è stata disegnata, per non rallentare il tuo arrivo. Dallo Spazio economico europeo, dal Regno Unito e dalla Svizzera la misurazione parte nello stato «rifiutato»: nessun cookie di misurazione viene depositato finché non hai accettato.',
    adsTitle: 'Pubblicità',
    adsText: 'Solo su schermo grande, il sito mostra annunci Google AdSense. Google e i suoi partner possono usare cookie per misurarli e personalizzarli; una finestra di consenso raccoglie il tuo accordo prima di qualsiasi deposito e puoi modificarlo in qualunque momento. Su mobile non viene scaricato alcun codice pubblicitario, quindi non vi è depositato alcun cookie pubblicitario.',
    adsOptOut: 'La personalizzazione degli annunci Google si regola dalla pagina delle impostazioni del tuo account Google.',
    rightsTitle: 'I tuoi diritti',
    rightsText: 'Puoi consultare, correggere o far cancellare i dati legati al tuo account e revocare il consenso quando vuoi. Per ciò che è rimasto nel browser basta cancellare i dati del sito. Per la copia online, scrivici.',
    contactTitle: 'Contatti',
    contactText: 'Per qualsiasi domanda su questi dati: {email}',
  },

  aiPlan: {
    title: 'Creare una seduta con un’IA',
    intro:
      'Chiedi a ChatGPT, Claude o Gemini di comporti una seduta: dai loro l’indirizzo di questa pagina e ti rispondono con un link. Aprendolo, l’applicazione mostra la seduta e ti chiede se vuoi conservarla: non viene salvato nulla senza il tuo consenso. Il pulsante «IA», in alto, prepara il messaggio da copiare.',
    forAi: 'Quanto segue è rivolto all’IA. Un lettore umano può saltarlo.',
    format:
      'Il link atteso ha la forma qui sotto: un oggetto JSON che porta il nome della seduta, la modalità di concatenamento e l’elenco delle righe, codificato in base64url nel parametro s.',
    keys:
      'La chiave da usare per ciascun esercizio è indicata in piccolo sotto il suo nome, nell’elenco «Tutte le schede degli esercizi» qui sopra (per esempio catCow sotto «Gatto-mucca») — mai la parola con cui termina l’indirizzo della sua scheda. Il gruppo muscolare, il tipo di sforzo e i valori mancanti sono dedotti dalla libreria. Una chiave sconosciuta diventa un esercizio personalizzato con quel nome.',
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
      'Ecco un sito per comporre sedute di allenamento: https://cirkali.fr/. Creami una seduta per la parte superiore del corpo di 20 minuti e dammi il link per importarla.',
    modifyTitle: 'Modificare una seduta',
    modifyText: 'Usa il link di condivisione della tua seduta per chiedere all’IA di modificarla:',
    modifyPrompt:
      'Ecco il link della mia seduta attuale: {link}. Aggiungi un esercizio per i polpacci e rimandami il link aggiornato.',
    linkMask: '[il tuo link]',
    copied: 'Messaggio copiato',
  },

  install: {
    title: 'Installare l’applicazione',
    chrome:
      'Su Android, apri questo sito in Chrome, poi il menu ⋮ in alto a destra e «Installa app». CIRKALI arriva sulla schermata Home con la sua icona, si apre a schermo intero senza barra degli indirizzi e funziona senza connessione.',
    ios: 'Su iPhone e iPad si fa da Safari: il pulsante Condividi, poi «Aggiungi a Home».',
    native:
      'Le versioni Android e iOS sono in preparazione. Pubblicarle sugli store ha un costo — account sviluppatore, verifica dell’identità, quote annuali — che il sito non copre ancora.',
    support: 'Aiutare a finanziare la pubblicazione su Ko-fi',
  },

  support: {
    title: 'Sostenere CIRKALI',
    text:
      'CIRKALI è gratuito, si usa senza account e non mostra pubblicità su mobile. Se l’applicazione ti è utile, puoi offrire un caffè: finanzia l’hosting e le spese degli store.',
    link: 'Offrire un caffè su Ko-fi',
  },

  exerciseInfo: {
    trigger: 'Informazioni sull’esercizio',
    close: 'Chiudi',
    equipment: 'Attrezzatura',
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
  },

  library: {
    search: 'Cerca un esercizio…',
    filterLabel: 'Filtra per gruppo muscolare',
    filterAll: 'Tutti i gruppi',
    filterCategoryLabel: 'Filtra per attrezzatura',
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
    addCustom: '+ Esercizio personale',
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
    weight: 'Carico (kg)',
    weightShort: 'kg',
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
    upper: 'Parte superiore',
    push: 'Petto',
    shoulders: 'Spalle',
    back: 'Schiena',
    arms: 'Braccia',
    core: 'Core',
    lower: 'Gambe',
    legs: 'Cosce',
    glutes: 'Glutei',
    calves: 'Polpacci',
    cardio: 'Cardio',
    fullbody: 'Corpo intero',
  },

  category: {
    warmup: 'Riscaldamento',
    stretching: 'Allungamento',
    bodyweight: 'Corpo libero',
    band: 'Elastico',
    dumbbell: 'Manubri',
    machine: 'Macchina',
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
    customTitle: 'Nuovo esercizio',
    customName: 'Nome dell’esercizio',
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
    previous: 'Esercizio precedente',
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
    load: '{weight} kg',
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
    tagline: 'pianificatore e cronometro di allenamento, con o senza attrezzi.',
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
    bandPullApart: {
      name: 'Apertura con elastico',
      cue: 'Braccia tese davanti a te, elastico teso tra le mani, apri le braccia stringendo le scapole.',
    },
    bandSquat: {
      name: 'Squat con elastico',
      cue: 'Elastico sotto i piedi e sulle spalle, scendi come in uno squat classico, schiena dritta.',
    },
    dumbbellGobletSquat: {
      name: 'Goblet squat',
      cue: 'Manubrio tenuto con due mani contro il petto, scendi mantenendo i gomiti tra le ginocchia.',
    },
    dumbbellRow: {
      name: 'Rematore con manubrio a un braccio',
      cue: 'Un ginocchio e una mano in appoggio su una panca, tira il manubrio verso il fianco mantenendo la schiena piatta.',
    },
    legPressMachine: {
      name: 'Leg press',
      cue: 'Piedi piatti sulla pedana, larghezza spalle, spingi senza estendere del tutto le ginocchia.',
    },
    latPulldownMachine: {
      name: 'Lat machine',
      cue: 'Afferra la barra più larga delle spalle e tirala verso la parte alta del petto mantenendo il busto dritto.',
    },
    hamstringStretch: {
      name: 'Allungamento dei femorali',
      cue: 'Tallone appoggiato su un rialzo, gamba tesa, piega il busto in avanti senza inarcare la schiena.',
    },
    chestDoorwayStretch: {
      name: 'Allungamento del petto sullo stipite',
      cue: 'Avambraccio contro lo stipite della porta, gomito all’altezza della spalla, avanza il busto delicatamente.',
    },
    squat: {
      name: 'Squat',
      cue: 'Piedi alla larghezza dei fianchi, spingi i fianchi indietro e scendi finché le cosce sono quasi orizzontali, busto dritto.',
    },
    pushup: {
      name: 'Piegamenti',
      cue: 'Mani sotto le spalle, corpo allineato dai talloni alla testa, scendi fino a sfiorare il pavimento.',
    },
    pikePushup: {
      name: 'Piegamenti a V',
      cue: 'Bacino alto a V rovesciata, scendi con la sommità del capo verso il pavimento tra le mani.',
    },
    mountainClimber: {
      name: 'Mountain climber',
      cue: 'In posizione di piegamento, porta alternativamente un ginocchio al petto senza alzare i fianchi.',
    },
    legSwing: {
      name: 'Slanci della gamba',
      cue: 'Appoggiati con una mano e fai oscillare una gamba avanti e indietro, ampiezza progressiva, bacino fermo.',
    },
    torsoTwist: {
      name: 'Rotazioni del busto',
      cue: 'In piedi, piedi fermi, ruota il busto da un lato all’altro con le braccia rilassate.',
    },
    quadStretch: {
      name: 'Allungamento dei quadricipiti in piedi',
      cue: 'In piedi, afferra la caviglia e porta il tallone al gluteo, ginocchia affiancate.',
    },
    gluteStretch: {
      name: 'Allungamento dei glutei (figura 4)',
      cue: 'Sdraiato, caviglia sopra il ginocchio opposto, tira verso di te la coscia d’appoggio.',
    },
    calfStretch: {
      name: 'Allungamento dei polpacci al muro',
      cue: 'Mani al muro, gamba dietro tesa, tallone a terra, spingi il bacino in avanti.',
    },
    childPose: {
      name: 'Posizione del bambino',
      cue: 'In ginocchio, siediti sui talloni e allunga le braccia in avanti, fronte verso il pavimento.',
    },
    tricepsStretch: {
      name: 'Allungamento dei tricipiti sopra la testa',
      cue: 'Gomito piegato verso il soffitto, mano tra le scapole, spingi delicatamente il gomito con l’altra mano.',
    },
    bandChestPress: {
      name: 'Spinte per il petto con elastico',
      cue: 'Elastico dietro la schiena, mani all’altezza del petto, spingi in avanti fino a distendere le braccia.',
    },
    bandLateralRaise: {
      name: 'Alzate laterali con elastico',
      cue: 'Elastico sotto i piedi, alza le braccia tese lateralmente fino all’altezza delle spalle.',
    },
    bandLateralWalk: {
      name: 'Camminata laterale con elastico',
      cue: 'Elastico sopra le ginocchia, mezzo squat, passi laterali senza far cedere le ginocchia.',
    },
    bandCurl: {
      name: 'Curl per i bicipiti con elastico',
      cue: 'Elastico sotto i piedi, gomiti aderenti al corpo, porta le mani verso le spalle.',
    },
    dumbbellShoulderPress: {
      name: 'Lento avanti con manubri',
      cue: 'Manubri all’altezza delle spalle, spingi sopra la testa senza inarcare la zona lombare.',
    },
    dumbbellFloorPress: {
      name: 'Distensioni con manubri a terra',
      cue: 'Sdraiato a terra, ginocchia piegate, spingi i manubri verso l’alto; in basso i gomiti toccano il pavimento.',
    },
    dumbbellRomanianDeadlift: {
      name: 'Stacco rumeno',
      cue: 'Ginocchia appena flesse, spingi i fianchi indietro e scendi con i manubri lungo le gambe, schiena piatta.',
    },
    dumbbellCalfRaise: {
      name: 'Calf raise con manubri',
      cue: 'Manubri lungo i fianchi, sali sulle punte e scendi lentamente.',
    },
    dumbbellCurl: {
      name: 'Curl per i bicipiti con manubri',
      cue: 'Gomiti aderenti al corpo, solleva il manubrio senza slanciare il busto.',
    },
    dumbbellTricepsExtension: {
      name: 'Estensione dei tricipiti',
      cue: 'Manubrio con entrambe le mani sopra la testa, scendi dietro la nuca tenendo i gomiti stretti.',
    },
    chestPressMachine: {
      name: 'Chest press',
      cue: 'Schiena appoggiata, impugnature all’altezza del petto, spingi senza bloccare del tutto i gomiti.',
    },
    legCurlMachine: {
      name: 'Leg curl',
      cue: 'Rullo sulla parte bassa dei polpacci, fletti le ginocchia con controllo, bacino aderente.',
    },
    treadmill: {
      name: 'Tapis roulant',
      cue: 'Un ritmo in cui parlare resta possibile ma con un po’ di fiatone; non aggrapparti alle maniglie.',
    },
    stationaryBike: {
      name: 'Cyclette',
      cue: 'Sella regolata perché il ginocchio resti leggermente piegato in basso; cadenza regolare.',
    },
    rowingMachine: {
      name: 'Vogatore',
      cue: 'Spingi prima con le gambe, poi apri il busto, poi tira con le braccia — e l’inverso al ritorno.',
    },
    custom: {
      name: 'Esercizio personale',
      cue: '',
    },
  },
};
