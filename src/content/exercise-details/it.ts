// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import type { ExerciseKey } from '../../core/types';
import type { ExerciseDetail } from './fr';

/**
 * Contenu long en italien. Meme regle de redaction que fr.ts : uniquement du
 * verifiable et du stable (anatomie, biomecanique, principes d'entrainement
 * etablis), jamais de citation d'etude ni de pourcentage d'activation EMG.
 *
 * Les slugs sont en italien : ces pages vivent sous exercises/it/ et une URL
 * francaise y serait incoherente pour un lecteur italophone. Quelques termes
 * restent en anglais (dead bug, bird dog, crunch, wall sit) parce que c'est
 * sous ce nom qu'ils sont connus et cherches en italien.
 */
export const it: Partial<Record<ExerciseKey, ExerciseDetail>> = {
  inclined: {
    slug: 'piegamenti-inclinati',
    muscles: { primary: 'Petto, tricipiti', secondary: 'Spalle, core' },
    steps: [
      'Appoggia le mani su una superficie rialzata e stabile (sedia, panca, bordo di un tavolo), poco più larghe delle spalle.',
      'Arretra con i piedi finché il corpo forma una linea retta dalle caviglie alla testa.',
      'Contrai addome e glutei per mantenere il bacino fermo per tutto il movimento.',
      'Piega i gomiti a circa 45° dal corpo e abbassa il petto verso l’appoggio, senza inarcare la schiena.',
      'Spingi per tornare alla posizione di partenza senza bloccare i gomiti di scatto.',
    ],
    mistakes: [
      'Gomiti aperti a 90°: sposta il carico sulle spalle e le sollecita.',
      'Bacino che cede o si inarca: rompe la linea e carica la zona lombare.',
      'Escursione incompleta: molto meno efficace di una discesa completa e controllata.',
    ],
    sensation:
      'Lo sforzo deve stare nel petto e nella parte posteriore delle braccia. Se lo senti soprattutto davanti alla spalla, nel polso o nel collo, i gomiti stanno scivolando verso l’esterno oppure le spalle salgono verso le orecchie.',
    rangeOfMotion:
      'Scendi finché il petto è a pochi centimetri dall’appoggio. Non andare oltre ciò che la spalla consente senza ruotare in avanti. In alto distendi le braccia senza bloccare bruscamente il gomito.',
    tempo:
      'Due secondi in discesa, uno in salita. Inspira scendendo, espira spingendo. La discesa controllata è la metà utile del movimento: lasciarsi cadere significa fare solo metà del lavoro.',
    anatomy:
      'Il grande pettorale è il motore principale: avvicina il braccio alla linea mediana. Il tricipite brachiale estende il gomito e il deltoide anteriore aiuta all’inizio della spinta. Sullo sfondo, il dentato anteriore tiene la scapola aderente alla gabbia toracica mentre il trasverso dell’addome e i glutei fissano il bacino perché il corpo resti una tavola rigida.',
    mechanics:
      'Una spinta orizzontale sul piano sagittale, che combina flessione di spalla ed estensione di gomito. La discesa è una contrazione eccentrica — il muscolo si allunga sotto tensione — e il ritorno è concentrico. Più alto è l’appoggio, minore la quota di peso corporeo che sposti: è esattamente questa la manopola di difficoltà dell’esercizio.',
    benefits: [
      'Sviluppa la forza di spinta della parte alta senza attrezzi, con molto meno carico su polsi e spalle rispetto a un piegamento a terra.',
      'Rinforza la posizione di plank, che si trasferisce a tutto ciò che spingi o porti davanti a te.',
      'Si regola con precisione cambiando l’altezza dell’appoggio, e questo lo rende un punto di partenza affidabile dopo un periodo di stop.',
    ],
    progression: {
      easier: 'Alza l’appoggio: un piano di lavoro o un muro sono molto più accessibili di una sedia.',
      harder: 'Abbassa l’appoggio verso il pavimento, oppure allunga la discesa a quattro secondi.',
      readyWhen:
        'Quando tre serie da dodici passano con discesa controllata e bacino immobile, abbassa l’appoggio di un livello.',
    },
    precautions:
      'Se la parte anteriore della spalla fa male, riduci l’escursione e avvicina i gomiti al corpo prima di provare a scendere di più.',
  },

  chairsquat: {
    slug: 'squat-con-sedia',
    muscles: { primary: 'Quadricipiti, glutei', secondary: 'Femorali, core' },
    steps: [
      'Mettiti in piedi davanti a una sedia stabile, piedi alla larghezza dei fianchi.',
      'Spingi il bacino indietro come per sederti, con le ginocchia in linea con i piedi.',
      'Scendi in controllo fino a sfiorare la seduta, con il peso sui talloni.',
      'Tocca brevemente senza sederti, con il petto eretto.',
      'Risali spingendo dai talloni fino a distendere le gambe.',
    ],
    mistakes: [
      'Ginocchia che cedono verso l’interno: instabile e impegnativo per l’articolazione.',
      'Lasciarsi cadere sulla sedia invece di controllare la discesa.',
      'Petto troppo inclinato in avanti: sposta lo sforzo sulla zona lombare.',
    ],
    sensation:
      'Devi sentire la parte anteriore delle cosce e i glutei, con una pressione chiara sui talloni. Tensione davanti al ginocchio o nella zona lombare significa che il bacino non arretra abbastanza e il busto compensa.',
    rangeOfMotion:
      'Scendi fino a sfiorare la seduta senza appoggiarti. La sedia è un riferimento di profondità costante, non un sedile: è questo che rende l’esercizio misurabile da una sessione all’altra.',
    tempo:
      'Tre secondi in discesa, uno o due in salita. Inspira scendendo, espira spingendo sui talloni. Una pausa di un secondo al contatto elimina ogni rimbalzo.',
    anatomy:
      'Il quadricipite estende il ginocchio e il grande gluteo estende l’anca: due motori principali che lavorano insieme. Femorali e adduttori stabilizzano, il medio gluteo impedisce al ginocchio di cadere verso l’interno, e l’erettore spinale insieme alla parete addominale tengono il busto saldo.',
    mechanics:
      'Flessione e poi estensione simultanee di anca e ginocchio sul piano sagittale. La discesa è eccentrica, la risalita concentrica. Portare il bacino indietro sposta il centro di massa sui talloni, ed è questo che ripartisce il carico tra cosce e glutei invece di concentrarlo sul ginocchio.',
    benefits: [
      'Ricostruisce il movimento più usato della vita quotidiana: alzarsi da una sedia, salire in auto, raccogliere qualcosa da terra.',
      'Rinforza cosce e glutei insieme, le prime cose che si perdono in una fase sedentaria.',
      'La sedia dà un riferimento oggettivo di profondità, così progredisci senza dover giudicare a occhio se sei sceso abbastanza.',
    ],
    progression: {
      easier: 'Usa una seduta più alta, oppure siediti davvero tra una ripetizione e l’altra.',
      harder: 'Punta a una seduta più bassa, rallenta la discesa a cinque secondi, o mantieni tre secondi in basso.',
      readyWhen:
        'Quando tre serie da quindici passano senza che le ginocchia cedano e senza spingerti con le mani, abbassa la seduta.',
    },
    precautions:
      'Se il ginocchio è dolente, riduci la profondità prima del numero di ripetizioni: un’escursione parziale senza dolore vale più di una completa che fa male.',
  },

  calf: {
    slug: 'sollevamento-dei-talloni',
    muscles: { primary: 'Polpacci (gastrocnemio, soleo)' },
    steps: [
      'In piedi con i piedi alla larghezza dei fianchi, appoggiando leggermente una mano a un muro o a una sedia se serve.',
      'Sali sugli avampiedi in tre secondi, spingendo sull’alluce.',
      'Fai una pausa in alto con i polpacci completamente contratti.',
      'Scendi in tre secondi fino a riappoggiare i talloni a terra.',
    ],
    mistakes: [
      'Andare troppo veloce: è la lentezza a far lavorare il muscolo.',
      'Rimbalzare in basso invece di controllare tutta l’escursione.',
      'Lasciare che le caviglie cedano verso l’esterno o l’interno durante la salita.',
    ],
    sensation:
      'Una contrazione chiara nel polpaccio, dal tallone fino a sotto il ginocchio. Se lo sforzo si sposta sulla parte anteriore della tibia o all’esterno della caviglia, il piede sta ruotando invece di spingere dritto.',
    rangeOfMotion:
      'Sali quanto la caviglia consente senza che il piede si inclini verso l’esterno, poi scendi fino a toccare con il tallone. Tagliare la parte bassa è l’errore più comune, ed è proprio lì che il muscolo si allunga sotto tensione.',
    tempo:
      'Tre secondi in salita, uno di contrazione in alto, tre in discesa. È l’unico esercizio di questa libreria in cui la lentezza non lo rende solo più difficile: *è* il carico, perché il peso corporeo da solo non basterebbe.',
    anatomy:
      'Due muscoli si dividono il lavoro. Il gastrocnemio, superficiale e visibile, attraversa il ginocchio e lavora soprattutto a gamba tesa; il soleo, sottostante, contribuisce di più a ginocchio flesso. Entrambi convergono nel tendine d Achille per produrre l’estensione della caviglia.',
    mechanics:
      'Flessione plantare della caviglia sul piano sagittale, in catena chiusa (il piede resta a terra). Concentrica in salita, eccentrica in discesa. L’escursione articolare è breve: è il tempo sotto tensione, non la distanza percorsa, a produrre l’effetto.',
    benefits: [
      'Il polpaccio è il propulsore principale nel cammino e nella salita delle scale, quindi rinforzarlo migliora direttamente la resistenza nel camminare.',
      'Rinforza il tendine d Achille e la caviglia, due strutture che perdono tolleranza rapidamente dopo un periodo di inattività.',
      'Contribuisce all’equilibrio in piedi, essendo la caviglia la prima articolazione a correggere un’oscillazione.',
    ],
    progression: {
      easier: 'Tieni due dita appoggiate a un muro, o riduci l’altezza a cui sali.',
      harder:
        'Lavora su una gamba sola, oppure appoggia l’avampiede su un gradino perché il tallone possa scendere sotto il livello delle dita.',
      readyWhen:
        'Quando tre serie da venti passano a ritmo lento senza appoggio delle mani, passa a una gamba sola.',
    },
  },

  wallsit: {
    slug: 'wall-sit',
    muscles: { primary: 'Quadricipiti', secondary: 'Glutei, core' },
    steps: [
      'Mettiti con la schiena contro un muro, piedi alla larghezza dei fianchi e a circa un passo da esso.',
      'Scivola lungo il muro finché le cosce sono parallele al pavimento, ginocchia a 90°.',
      'Tieni tutta la schiena aderente al muro e le ginocchia sopra le caviglie.',
      'Mantieni la posizione respirando normalmente, senza trattenere il fiato.',
      'Spingi sui talloni per uscire dalla posizione.',
    ],
    mistakes: [
      'Ginocchia che superano le punte dei piedi: troppa pressione sull’articolazione.',
      'Schiena che si stacca dal muro: perdi l’appoggio e carichi la zona lombare.',
      'Forzare l’angolo di 90° quando il ginocchio protesta: apri invece a 120°.',
    ],
    sensation:
      'Un bruciore che cresce in modo costante nella parte anteriore delle cosce, salendo in modo uniforme fino alla fine. Un dolore acuto al ginocchio, invece, non è il segnale atteso: apri l’angolo.',
    rangeOfMotion:
      'L’angolo del ginocchio determina la difficoltà: 90° è la versione di riferimento, 120° una decisamente più accessibile. Le ginocchia restano sopra le caviglie, mai oltre le punte, e la schiena mantiene contatto con il muro per tutta la sua lunghezza.',
    tempo:
      'Nessun tempo: è un mantenimento. Respira normalmente, ad alta voce se ti aiuta a verificare che non stai trattenendo il fiato: è il riflesso più comune in un esercizio isometrico, e alza la pressione sanguigna senza alcun beneficio.',
    anatomy:
      'Il quadricipite lavora in isometria per impedire al ginocchio di flettersi ulteriormente sotto il peso del corpo. Glutei e femorali aiutano a sostenere l’anca, e gli addominali stabilizzano il bacino contro il muro.',
    mechanics:
      'Una contrazione isometrica: il muscolo produce forza senza cambiare lunghezza e senza che l’articolazione si muova. Il muro elimina la richiesta di equilibrio, il che permette di caricare le cosce senza la coordinazione che richiederebbe uno squat mantenuto senza appoggio.',
    benefits: [
      'Sviluppa la resistenza alla forza nelle cosce, la qualità che si esaurisce scendendo le scale o restando a lungo in piedi.',
      'Carica il quadricipite senza movimento articolare, il che spesso lo rende tollerabile quando un movimento completo non lo è ancora.',
      'Il progresso si misura in secondi, un’unità più chiara di "una ripetizione in più" per seguire i propri progressi.',
    ],
    progression: {
      easier: 'Apri l’angolo del ginocchio a 110-120°, oppure dividi il tempo in due mantenimenti più brevi.',
      harder: 'Avvicinati ai 90°, allunga la durata, o solleva leggermente un tallone e poi l’altro.',
      readyWhen:
        'Quando tre mantenimenti da sessanta secondi a 90° passano senza che la schiena si stacchi, allunga ancora o passa a un carico dinamico.',
    },
    precautions:
      'Se il ginocchio tira, apri l’angolo prima di ogni altra cosa. Questo esercizio è facile da addolcire; non ha senso subirlo così com’è.',
  },

  rotation: {
    slug: 'rotazione-esterna-di-spalla',
    muscles: { primary: 'Cuffia dei rotatori (spalla)' },
    steps: [
      'Sdraiati su un fianco, con il gomito piegato a 90° e aderente alle costole, un peso leggero (una bottiglia d’acqua) in mano.',
      'Appoggia l’avambraccio sull’addome: è la posizione di partenza.',
      'Ruota l’avambraccio verso l’alto, il gomito resta incollato al corpo, senza muovere la spalla.',
      'Fai una pausa al punto alto del movimento.',
      'Scendi in controllo fino alla posizione iniziale.',
    ],
    mistakes: [
      'Gomito che si stacca dalle costole: sposta lo sforzo altrove rispetto alla spalla.',
      'Troppo peso: questo movimento coinvolge un muscolo piccolo, il carico resta leggero.',
      'Forzare l’escursione oltre ciò che la spalla tollera comodamente.',
    ],
    sensation:
      'Uno sforzo discreto nella parte posteriore e alta della spalla, mai spettacolare. Se lo senti nel trapezio o nel collo, la spalla sta salendo; se lo senti nel bicipite, il peso è eccessivo e il braccio tira invece di ruotare.',
    rangeOfMotion:
      'Ruota solo fin dove la spalla arriva senza che il gomito lasci le costole, spesso molto meno di quanto ti aspetteresti. L’escursione utile qui è breve: andare oltre fa lavorare qualcos altro.',
    tempo:
      'Due secondi in ciascuna direzione, senza strappi, con una pausa di un secondo in alto. È un esercizio di controllo, non di potenza: la velocità ne annulla lo scopo.',
    anatomy:
      'La cuffia dei rotatori è formata da quattro muscoli profondi che tengono la testa dell’omero centrata nella sua cavità. Questo movimento coinvolge soprattutto l’infraspinato e il piccolo rotondo, i due rotatori esterni. Il deltoide, più superficiale, è proprio quello che *non* deve prendere il sopravvento.',
    mechanics:
      'Rotazione esterna della spalla sul piano trasversale, con il gomito fisso a 90°. Tenere il gomito contro il corpo è un blocco meccanico: impedisce alla spalla di compensare con un’abduzione, che affiderebbe il lavoro al deltoide.',
    benefits: [
      'Mantiene gli stabilizzatori profondi della spalla, spesso trascurati perché invisibili e privi di sensazioni vistose.',
      'Controbilancia la postura con le spalle in avanti che il lavoro alla scrivania e l’uso prolungato degli schermi installano.',
      'Prepara la spalla a tollerare i movimenti di spinta: è un esercizio di manutenzione, non di prestazione.',
    ],
    progression: {
      easier: 'Eseguilo senza alcun peso, a mano vuota, cercando solo escursione e controllo.',
      harder:
        'Passa a una bottiglia un po’ più pesante, o allunga la pausa in alto. Resta modesto sul carico: questo muscolo è piccolo.',
      readyWhen:
        'Quando tre serie da quindici passano senza che il gomito si sollevi e senza compensi del trapezio.',
    },
    precautions:
      'Nella spalla non deve comparire dolore. Se compare, riduci prima l’escursione e poi il carico; se persiste, non è questo l’esercizio che manca alla tua sessione.',
  },

  deadbug: {
    slug: 'dead-bug',
    muscles: { primary: 'Core profondo (trasverso dell’addome)', secondary: 'Anche' },
    steps: [
      'Sdraiati sulla schiena, con le braccia verso il soffitto e anche e ginocchia piegate a 90°.',
      'Premi la zona lombare contro il pavimento e mantienila così per tutto il movimento.',
      'Abbassa lentamente un braccio oltre la testa e la gamba opposta verso il pavimento, senza toccare.',
      'Torna alla posizione di partenza in controllo.',
      'Ripeti dall’altro lato.',
    ],
    mistakes: [
      'Zona lombare che si stacca dal pavimento: segno che l’escursione è andata troppo oltre.',
      'Andare troppo veloce: perdi il controllo e il core si disattiva.',
      'Trattenere il fiato: continua a respirare normalmente per tutto il tempo.',
    ],
    sensation:
      'Una tensione profonda e continua nel basso addome, sotto l’ombelico. Se la zona lombare si inarca o tira, l’escursione ha superato ciò che il tuo core riesce a tenere: è il segnale di stop, non un dettaglio.',
    rangeOfMotion:
      'Abbassa braccio e gamba solo fino al punto in cui la zona lombare resta premuta a terra. Quel punto è personale e si sposta con le settimane: è lui, non la distanza dal pavimento, la tua unità di misura.',
    tempo:
      'Da tre a quattro secondi per ripetizione, senza mai accelerare. Espira mentre estendi, inspira tornando: l’espirazione aiuta meccanicamente a tenere le costole basse e la schiena piatta.',
    anatomy:
      'Il trasverso dell’addome, il muscolo più profondo della parete addominale, agisce come una cintura che stabilizza il bacino. Gli obliqui resistono alla rotazione creata dal movimento incrociato, e il retto dell’addome tiene la gabbia toracica bassa. I flessori dell’anca lavorano in controllo sulla gamba che si estende.',
    mechanics:
      'È un esercizio anti-estensione: il compito del core non è produrre un movimento ma impedirne uno, qui l’estensione lombare causata dal peso degli arti che si allontanano. Lo schema incrociato aggiunge una resistenza alla rotazione.',
    benefits: [
      'Insegna cosa fa davvero il core — stabilizzare più che flettere — con più chiarezza di qualsiasi movimento addominale convenzionale.',
      'Lavora la zona lombare senza sottoporla a compressione, a differenza dei sit-up ripetuti.',
      'Si trasferisce direttamente al cammino e alla corsa, dove braccio e gamba opposti lavorano già in alternanza.',
    ],
    progression: {
      easier: 'Muovi un arto alla volta, solo il braccio o solo la gamba, tenendo l’altro in posizione.',
      harder:
        'Estendi completamente la gamba appena sopra il pavimento, rallenta ancora, o mantieni due secondi nella posizione bassa.',
      readyWhen:
        'Quando tre serie da dieci per lato passano senza che la zona lombare si stacchi e con la gamba estesa a pochi centimetri dal pavimento.',
    },
  },

  plank: {
    slug: 'plank',
    muscles: { primary: 'Core (addominali, zona lombare)', secondary: 'Spalle' },
    steps: [
      'Appoggia gli avambracci a terra, gomiti sotto le spalle, ed estendi le gambe dietro di te.',
      'Allinea il corpo in linea retta dai talloni alla testa.',
      'Contrai i glutei e richiama leggermente l’ombelico per fissare il core.',
      'Mantieni la posizione respirando normalmente, con lo sguardo verso il pavimento.',
    ],
    mistakes: [
      'Bacino che sale a formare una punta: riduce il lavoro degli addominali.',
      'Bacino che cede: carica la zona lombare, ed è il segnale per chiudere la serie.',
      'Trattenere il fiato invece di respirare normalmente.',
    ],
    sensation:
      'Tensione distribuita su tutta la parete addominale e sui glutei. Se il carico si sposta sulla zona lombare o sulle spalle, la posizione è degradata: resistere non ha più valore, meglio chiudere la serie.',
    rangeOfMotion:
      'Nessuna escursione: conta la qualità dell’allineamento. Una linea retta dai talloni alla testa, né punta né cedimento del bacino, e lo sguardo in basso perché il collo resti in linea con la schiena.',
    tempo:
      'Un mantenimento continuo, respirando normalmente e in modo udibile. Il criterio di stop non è l’orologio ma la posizione: appena il bacino cede, la serie è finita, anche se restano dieci secondi.',
    anatomy:
      'Il trasverso e il retto dell’addome tengono allineati gabbia toracica e bacino, gli obliqui impediscono la rotazione. I glutei estendono leggermente l’anca per eliminare l’inarcamento, e il dentato anteriore tiene le scapole aderenti. L’erettore spinale lavora in cocontrazione con gli addominali.',
    mechanics:
      'Un esercizio isometrico anti-estensione: la gravità tira il bacino verso il pavimento e la parete addominale lo impedisce. Nessuna articolazione si muove, il che rende la posizione molto dipendente dall’allineamento: pochi gradi di inclinazione del bacino cambiano completamente quale muscolo porta il carico.',
    benefits: [
      'Sviluppa la resistenza del core, la qualità che protegge la schiena stando a lungo in piedi o portando un carico.',
      'Non comporta flessione ripetuta della colonna, a differenza del lavoro addominale convenzionale.',
      'Il mantenimento insegna a respirare sotto tensione, un riflesso che ripaga in ogni altro esercizio.',
    ],
    progression: {
      easier: 'Appoggia le ginocchia, oppure metti gli avambracci su una superficie rialzata.',
      harder: 'Allunga la durata, o solleva brevemente un piede e poi l’altro mantenendo il bacino fermo.',
      readyWhen:
        'Quando tre mantenimenti da quarantacinque secondi passano senza perdita di posizione, allunga o aggiungi complessità.',
    },
    precautions:
      'Non trattenere il fiato. Se la zona lombare tira, la posizione è già ceduta: scendi e ricomincia invece di insistere.',
  },

  walk: {
    slug: 'camminare',
    muscles: { primary: 'Cardiovascolare, gambe' },
    steps: [
      'Scegli un passo sostenuto in cui parlare sia ancora possibile ma con un po’ di fiatone.',
      'Tieni il petto eretto, lo sguardo all’orizzonte, le spalle rilassate.',
      'Lascia che le braccia oscillino naturalmente con il passo.',
      'Mantieni quel ritmo per la durata prevista, variando il terreno se puoi.',
    ],
    mistakes: [
      'Un ritmo troppo lento per avere un reale effetto cardiovascolare.',
      'Sguardo incollato al suolo o al telefono: male per la postura.',
      'Calzature inadatte su terreno irregolare.',
    ],
    sensation:
      'Fiatone moderato: dovresti riuscire a sostenere una conversazione ma non a cantare. È il modo più affidabile di regolare l’intensità senza alcuno strumento di misura.',
    rangeOfMotion:
      'Nessuna escursione da regolare, ma un passo: appoggia il tallone, rulla il piede, spingi con l’avampiede. Le braccia oscillano libere dalla spalla, non bloccate nelle tasche.',
    tempo:
      'Un ritmo regolare e sostenuto per tutto il percorso, meglio di scatti seguiti da pause. È la costanza a costruire la base di resistenza.',
    anatomy:
      'Tutti i muscoli della catena posteriore contribuiscono in alternanza: glutei e femorali per propulsare, quadricipiti per ammortizzare, polpacci per la spinta finale. Il core stabilizza il bacino a ogni appoggio su una gamba, e la muscolatura del piede gestisce la ricezione.',
    mechanics:
      'Locomozione ciclica in catena chiusa alternata: ogni gamba attraversa una fase di appoggio e una di volo dell’arto. A differenza della corsa, c’è sempre un piede a terra, e questa assenza di fase aerea elimina l’impatto e rende il camminare praticabile ogni giorno.',
    benefits: [
      'Sviluppa la capacità cardiovascolare senza impatto articolare, il che la rende praticabile quasi ogni giorno.',
      'È l’unica attività di questa libreria che si somma naturalmente alla vita quotidiana: spostamenti, commissioni, scale.',
      'Migliora il recupero tra le sessioni di forza invece di aggiungere fatica.',
    ],
    progression: {
      easier: 'Riduci la durata prima del ritmo: dieci minuti sostenuti valgono più di trenta trascinati.',
      harder: 'Allunga la durata, cerca salite, o alza leggermente il ritmo su alcuni tratti.',
      readyWhen:
        'Quando trenta minuti passano senza fiatone percepibile, cerca dislivello piuttosto che tempo in più.',
    },
  },

  kneePushup: {
    slug: 'piegamenti-sulle-ginocchia',
    muscles: { primary: 'Petto, tricipiti', secondary: 'Spalle, core' },
    steps: [
      'Mettiti a quattro zampe, poi porta le mani in avanti poco più larghe delle spalle.',
      'Incrocia le caviglie e tieni le ginocchia a terra come punto di appoggio.',
      'Allinea il corpo in linea retta dalle ginocchia alla testa, senza spezzare all’altezza del bacino.',
      'Piega i gomiti a circa 45° dal corpo e abbassa il petto vicino al pavimento.',
      'Spingi per risalire senza bloccare i gomiti di scatto.',
    ],
    mistakes: [
      'Bacino troppo alto o troppo basso: rompe la linea del busto.',
      'Gomiti aperti a 90°: sovraccarica le spalle.',
      'Una discesa incompleta: riduce l’effetto del movimento.',
    ],
    sensation:
      'Petto e tricipiti, con il core che lavora dal bacino alle spalle. Il fastidio al polso viene quasi sempre da mani troppo arretrate: devono stare sotto le spalle, non davanti.',
    rangeOfMotion:
      'Scendi finché il petto è all’altezza di un pugno dal pavimento. Se l’escursione completa ti costa l’allineamento, accorciala: mezza escursione pulita costruisce più di una completa che si spezza al bacino.',
    tempo:
      'Due secondi in discesa, uno in salita, senza pausa in basso per non perdere la tensione. Inspira scendendo, espira spingendo.',
    anatomy:
      'Gli stessi motori principali del piegamento standard — grande pettorale, tricipite brachiale, deltoide anteriore — ma con una leva più corta. Il dentato anteriore stabilizza la scapola mentre addominali e glutei impediscono al bacino di cedere.',
    mechanics:
      'Una spinta orizzontale, come il piegamento inclinato, ma l’appoggio delle ginocchia accorcia la leva: la quota di peso corporeo realmente sollevata cala di circa un terzo. È una regressione della leva, non dell’escursione, e la distinzione conta perché l’escursione resta completa.',
    benefits: [
      'Permette di allenare l’escursione completa di un piegamento mentre la versione a terra è ancora fuori portata.',
      'Carica il core su un segmento più corto, quindi è più facile mantenere l’allineamento a fine serie.',
      'Costituisce il passaggio intermedio naturale tra il piegamento inclinato e quello a terra.',
    ],
    progression: {
      easier: 'Torna al piegamento inclinato su appoggio alto, dove il core è meno sollecitato.',
      harder: 'Porta le ginocchia più avanti per allungare la leva, oppure passa al piegamento a terra.',
      readyWhen:
        'Quando tre serie da dodici passano con una linea perfettamente retta dalle ginocchia alla testa, prova il piegamento a terra.',
    },
    precautions:
      'Metti un cuscino o un tappetino sotto le ginocchia: il fastidio su un pavimento duro chiude la serie prima che il muscolo si stanchi.',
  },

  wallPushup: {
    slug: 'piegamenti-al-muro',
    muscles: { primary: 'Petto, tricipiti', secondary: 'Spalle' },
    steps: [
      'Appoggia le mani a un muro, poco più larghe delle spalle, all’altezza del petto.',
      'Arretra con i piedi per inclinare il corpo, dritto dalle caviglie alla testa.',
      'Piega i gomiti e avvicina il petto al muro in controllo.',
      'Spingi per tornare alla posizione di partenza.',
    ],
    mistakes: [
      'Piedi troppo vicini al muro: riduce l’intensità dell’esercizio.',
      'La schiena che si inarca durante la discesa.',
      'Andare troppo veloce, senza alcun momento di controllo in basso.',
    ],
    sensation:
      'Uno sforzo leggero ma chiaro nel petto e nei tricipiti. Se non senti quasi nulla, arretra di più con i piedi: l’inclinazione, e solo quella, determina l’intensità.',
    rangeOfMotion:
      'Avvicina il petto a pochi centimetri dal muro, poi torna a braccia distese senza bloccarle. L’escursione completa è facile da raggiungere qui, ed è proprio questo il senso della variante.',
    tempo:
      'Due secondi in ciascuna direzione. La bassa intensità rende la lentezza ancora più utile: è ciò che rende l’esercizio abbastanza impegnativo da produrre un effetto.',
    anatomy:
      'Grande pettorale, tricipite brachiale e deltoide anteriore, esattamente come nelle altre varianti di piegamento. Il core lavora poco qui, essendo il corpo vicino alla verticale.',
    mechanics:
      'Una spinta orizzontale con inclinazione molto ridotta: più il corpo è vicino alla verticale, minore la frazione di peso da spostare. È l’estremo più accessibile dello stesso continuum del piegamento inclinato e poi di quello a terra.',
    benefits: [
      'Rende praticabile lo schema del piegamento fin dal primo giorno, qualunque sia il livello di partenza.',
      'Permette di imparare la posizione dei gomiti e l’allineamento del corpo senza essere limitati dalla forza.',
      'Funziona ovunque, senza attrezzi e senza bisogno di un pavimento pulito, il che ne fa un buon punto di partenza per costruire la spinta.',
    ],
    progression: {
      easier: 'Avvicina i piedi al muro, fino a restare quasi in verticale.',
      harder: 'Arretra con i piedi, poi passa a un appoggio più basso: un piano di lavoro, poi una sedia.',
      readyWhen:
        'Quando tre serie da quindici risultano facili, passa a un appoggio più basso invece di aggiungere ripetizioni.',
    },
  },

  chairDips: {
    slug: 'dip-per-tricipiti-su-sedia',
    muscles: { primary: 'Tricipiti', secondary: 'Spalle, petto' },
    steps: [
      'Siediti sul bordo di una sedia stabile, con le mani accanto ai fianchi.',
      'Fai scivolare il bacino fuori dalla sedia, gambe distese o leggermente piegate davanti a te.',
      'Piega i gomiti all’indietro per abbassare il busto, senza superare i 90°.',
      'Spingi con le mani per risalire a braccia distese.',
    ],
    mistakes: [
      'Scendere troppo: sottopone le spalle a una tensione eccessiva.',
      'Spalle che salgono verso le orecchie invece di restare basse.',
      'Una sedia instabile o che scivola: verifica l’appoggio prima di iniziare.',
    ],
    sensation:
      'La parte posteriore del braccio, distintamente. Tensione davanti alla spalla significa che la discesa è andata troppo oltre o che le spalle sono ruotate in avanti: è il limite da non superare in questo esercizio.',
    rangeOfMotion:
      'Scendi finché il gomito raggiunge circa 90°, non oltre. È l’unico esercizio di questa libreria in cui l’escursione massima non è desiderabile: oltre i 90°, la sollecitazione della parte anteriore della spalla sale rapidamente a fronte di un guadagno minimo.',
    tempo:
      'Due secondi in discesa, uno in salita. Tieni le spalle basse e lontane dalle orecchie per tutto il tempo.',
    anatomy:
      'Il tricipite brachiale è il motore principale: estende il gomito. La porzione inferiore del grande pettorale e il deltoide anteriore aiutano, e i muscoli della scapola lavorano per impedire alla spalla di ruotare in avanti.',
    mechanics:
      'Estensione del gomito in catena chiusa, con il corpo che si sposta attorno a mani fisse. La posizione delle gambe determina il carico: più sono distese, maggiore la quota di peso corporeo sostenuta dalle braccia.',
    benefits: [
      'Coinvolge i tricipiti più direttamente delle varianti di piegamento, dove il petto assume gran parte del lavoro.',
      'Rinforza la capacità di sollevarsi da un appoggio basso: uscire da una vasca o da una poltrona profonda.',
      'Si dosa senza attrezzi, semplicemente avvicinando o allontanando i piedi.',
    ],
    progression: {
      easier: 'Avvicina i piedi con le ginocchia piegate: il carico sulle braccia cala nettamente.',
      harder: 'Distendi di più le gambe, oppure appoggia i talloni su un secondo supporto alla stessa altezza.',
      readyWhen:
        'Quando tre serie da dodici passano con le gambe distese e senza rotazione in avanti delle spalle.',
    },
    precautions:
      'Impegnativo per la parte anteriore della spalla. Con qualsiasi precedente o fastidio in quella zona, riduci molto l’escursione o sostituiscilo con una variante di piegamento.',
  },

  armCircles: {
    slug: 'circonduzioni-delle-braccia',
    muscles: { primary: 'Spalle', secondary: 'Parte alta della schiena' },
    steps: [
      'In piedi, con le braccia distese in orizzontale ai lati.',
      'Disegna cerchi piccoli e regolari con le braccia, spalle basse e rilassate.',
      'Continua per la durata prevista, poi inverti il senso.',
    ],
    mistakes: [
      'Spalle che salgono verso le orecchie durante il movimento.',
      'Cerchi troppo ampi o troppo veloci: perdi il controllo.',
      'Inarcare la schiena per compensare le spalle che si stancano.',
    ],
    sensation:
      'Un bruciore che cresce gradualmente sulla parte alta e posteriore della spalla. Se il trapezio prende il sopravvento e le spalle salgono, rallenta o riduci i cerchi.',
    rangeOfMotion:
      'Cerchi piccoli e regolari, delle dimensioni di un piatto, non grandi mulinelli. L’escursione non è l’obiettivo: lo è il tempo sotto tensione, con le braccia tenute in orizzontale contro la gravità.',
    tempo:
      'Un ritmo costante e lento, con respirazione normale. Cambia senso a metà per ripartire il lavoro tra le porzioni anteriore e posteriore del deltoide.',
    anatomy:
      'Il deltoide, in tutte e tre le porzioni, tiene il braccio in orizzontale: è lavoro di resistenza in abduzione. Il sovraspinato contribuisce al mantenimento, e i trapezi inferiore e medio stabilizzano la scapola. Il trapezio superiore dovrebbe restare rilassato.',
    mechanics:
      'Un mantenimento statico in abduzione di spalla con una componente circolare sui piani frontale e trasversale. Il braccio agisce come una leva lunga: più è disteso, maggiore il momento che la spalla deve sostenere, senza alcun carico esterno.',
    benefits: [
      'Sviluppa la resistenza della spalla, molto sollecitata in ogni compito sopra la testa nella vita quotidiana.',
      'Funziona come riscaldamento efficace prima di qualsiasi esercizio di spinta.',
      'Non richiede attrezzi né pavimento: praticabile in qualunque spazio in piedi.',
    ],
    progression: {
      easier: 'Accorcia la durata, oppure piega leggermente i gomiti per accorciare la leva.',
      harder: 'Allunga la durata, oppure tieni una piccola bottiglia in ciascuna mano.',
      readyWhen:
        'Quando un minuto per senso passa senza che le spalle salgano, aggiungi un carico leggero.',
    },
  },

  wallSlides: {
    slug: 'scivolamenti-al-muro',
    muscles: { primary: 'Spalle, parte alta della schiena' },
    steps: [
      'Mettiti con la schiena a un muro, zona lombare, parte alta della schiena e testa in contatto con esso.',
      'Porta le braccia a formare una "W", con gomiti e polsi contro il muro.',
      'Fai scivolare le braccia verso l’alto mantenendo il contatto con il muro, verso una "Y".',
      'Scendi in controllo fino alla posizione di partenza.',
    ],
    mistakes: [
      'La zona lombare che si inarca e si stacca dal muro.',
      'Gomiti o polsi che perdono il contatto con il muro durante la salita.',
      'Forzare l’escursione oltre ciò che la spalla consente senza dolore.',
    ],
    sensation:
      'Lavoro tra le scapole e nella parte posteriore delle spalle, spesso con un allungamento sulla parte anteriore del petto. È esattamente l’intento: aprire davanti, attivare dietro.',
    rangeOfMotion:
      'Sali il più possibile mantenendo gomiti e polsi al muro. Il punto in cui il contatto si perde è il tuo limite del giorno, e superarlo staccando le braccia elimina tutto il senso dell’esercizio.',
    tempo:
      'Tre secondi in salita, tre in discesa. Il muro è il vincolo: è ciò che impedisce i compensi, a patto di restare lenti.',
    anatomy:
      'I trapezi inferiore e medio insieme ai romboidi avvicinano e abbassano le scapole. I rotatori esterni della spalla mantengono la posizione a "W". Sul lato opposto, il piccolo pettorale e i flessori della spalla vengono messi in allungamento.',
    mechanics:
      'Una combinazione di elevazione e rotazione scapolare coordinata con l’abduzione di spalla sul piano frontale. Il muro impone un piano di riferimento: rende visibile e impossibile da ignorare ogni compenso per inarcamento o rotazione.',
    benefits: [
      'Controbilancia direttamente la postura con le spalle in avanti che lo stare seduti a lungo installa.',
      'Ripristina la mobilità di spalla necessaria prima di qualsiasi lavoro di spinta sopra la testa.',
      'Il muro dà un riscontro immediato sulla qualità dell’esecuzione, senza specchio né occhio esterno.',
    ],
    progression: {
      easier:
        'Allontana leggermente i piedi dal muro e piega le ginocchia: riduce l’inarcamento e rende più facile mantenere il contatto.',
      harder: 'Rallenta ancora, oppure mantieni due secondi nel punto più alto.',
      readyWhen: 'Quando l’escursione completa passa senza che i gomiti si stacchino, aggiungi la pausa.',
    },
    precautions:
      'Perdere il contatto con il muro non è un fallimento ma un’informazione: è la tua mobilità attuale. Forzare inarcando la schiena non migliora quella mobilità.',
  },

  superman: {
    slug: 'superman',
    muscles: { primary: 'Zona lombare, glutei', secondary: 'Parte alta della schiena' },
    steps: [
      'Sdraiati a pancia in giù, con le braccia distese davanti e le gambe distese dietro.',
      'Guarda il pavimento per mantenere il collo neutro per tutto il movimento.',
      'Solleva braccia, petto e gambe insieme di qualche centimetro.',
      'Fai una pausa in alto, poi scendi in controllo.',
    ],
    mistakes: [
      'Alzare la testa per guardare avanti invece di tenere lo sguardo basso: comprime il collo.',
      'Salire troppo, troppo in fretta, a strappi invece che in controllo.',
      'Trattenere il fiato durante lo sforzo.',
    ],
    sensation:
      'Una contrazione nella zona lombare e nei glutei. Una compressione dolorosa in zona lombare, invece, significa che stai salendo troppo: l’altezza non è il criterio di riuscita.',
    rangeOfMotion:
      'Bastano pochi centimetri. L’obiettivo è un’estensione leggera e controllata, non un inarcamento massimo: gli ultimi gradi non aggiungono lavoro muscolare, solo compressione articolare.',
    tempo:
      'Due secondi in salita, uno di mantenimento, due in discesa. Espira salendo. Lo sguardo resta a terra dall’inizio alla fine.',
    anatomy:
      'L’erettore spinale, i muscoli lunghi ai due lati della colonna, produce l’estensione. Il grande gluteo e i femorali estendono l’anca sul lato delle gambe, e il trapezio inferiore contribuisce sul lato delle braccia.',
    mechanics:
      'Estensione simultanea di colonna e anche contro la gravità, a pancia in giù. Concentrica in salita, eccentrica in discesa. Senza attrezzi, è uno dei pochi modi di caricare direttamente la catena posteriore.',
    benefits: [
      'Rinforza la zona lombare, spesso trascurata anche se è proprio quella che protesta dopo una fase sedentaria.',
      'Lavora tutta la catena posteriore, che lo stare seduti accorcia e indebolisce.',
      'Non richiede attrezzi né appoggi: praticabile ovunque ci si possa sdraiare.',
    ],
    progression: {
      easier: 'Solleva solo le braccia, o solo le gambe, invece di entrambe insieme.',
      harder: 'Allunga il mantenimento in alto, oppure solleva braccio e gamba opposti in alternanza.',
      readyWhen: 'Quando tre serie da dodici passano senza alcuna compressione in zona lombare.',
    },
    precautions:
      'Alzare la testa per guardare avanti comprime il collo: tieni lo sguardo basso. Con un mal di schiena lombare già presente, non è questo il punto di partenza giusto.',
  },

  reverseSnowAngel: {
    slug: 'angelo-invertito',
    muscles: { primary: 'Parte alta della schiena, spalle' },
    steps: [
      'Sdraiati a pancia in giù, con le braccia distese davanti e i palmi verso il pavimento.',
      'Solleva leggermente petto e braccia dal pavimento.',
      'Porta le braccia verso l’esterno in un arco ampio fino ai fianchi, come un angelo di neve al contrario.',
      'Riporta le braccia in avanti lungo lo stesso arco, in controllo.',
    ],
    mistakes: [
      'Sollevare troppo il petto: inarca eccessivamente la zona lombare.',
      'Un movimento a scatti invece di un arco ampio e continuo.',
      'Spalle che salgono verso le orecchie durante il passaggio.',
    ],
    sensation:
      'Lavoro concentrato tra le scapole e nella parte posteriore delle spalle, con una sensazione di apertura sul petto. È uno dei rari esercizi senza attrezzi che raggiunge davvero questa zona.',
    rangeOfMotion:
      'L’arco ampio va dalle braccia distese in avanti fino ai fianchi, restando il più vicino possibile al pavimento senza toccarlo. L’escursione utile si ferma dove la spalla inizia a ruotare in avanti.',
    tempo:
      'Lento e continuo, circa tre secondi per passaggio. Non è un esercizio di forza ma di controllo su un’escursione lunga: la velocità lascerebbe lavorare lo slancio invece dei muscoli.',
    anatomy:
      'I trapezi medio e inferiore insieme ai romboidi avvicinano le scapole. Il deltoide posteriore lavora lungo tutto il percorso, e i rotatori esterni mantengono l’orientamento del braccio. L’erettore spinale tiene il petto leggermente sollevato.',
    mechanics:
      'Adduzione e abduzione orizzontale della spalla a pancia in giù, con la gravità che oppone resistenza lungo tutto il percorso. A differenza di un movimento in piedi dove la resistenza varia molto con l’angolo, stare a terra la mantiene abbastanza costante da un estremo dell’arco all’altro.',
    benefits: [
      'Coinvolge la parte alta della schiena, la zona più difficile da raggiungere senza sbarra per trazioni o elastico.',
      'Completa direttamente gli scivolamenti al muro nel recuperare l’escursione di spalla persa stando seduti.',
      'Allena la resistenza posturale più che la forza massima, che corrisponde all’uso reale di questi muscoli.',
    ],
    progression: {
      easier: 'Piega i gomiti per accorciare la leva, oppure riduci l’arco percorso.',
      harder: 'Distendi completamente le braccia, rallenta, o fai una pausa ai due estremi dell’arco.',
      readyWhen: 'Quando tre serie da dodici passano a braccia distese e senza rotazione in avanti delle spalle.',
    },
  },

  birdDog: {
    slug: 'bird-dog',
    muscles: { primary: 'Core, zona lombare', secondary: 'Glutei, spalle' },
    steps: [
      'Mettiti a quattro zampe, mani sotto le spalle e ginocchia sotto i fianchi.',
      'Attiva il core per mantenere la schiena piatta, in linea con la testa.',
      'Estendi contemporaneamente un braccio in avanti e la gamba opposta all’indietro.',
      'Fai una pausa, tenendo il bacino fermo e in bolla.',
      'Torna alla posizione di partenza e ripeti dall’altro lato.',
    ],
    mistakes: [
      'Il bacino che ruota o si inclina da un lato durante l’estensione.',
      'La zona lombare che si inarca per guadagnare escursione.',
      'Andare troppo veloce: la stabilità conta più della velocità.',
    ],
    sensation:
      'Uno sforzo profondo di stabilizzazione nel tronco e nel gluteo della gamba estesa, più che una sensazione di forza negli arti stessi. Se non senti nulla nel tronco, probabilmente il bacino si sta muovendo e assorbe il lavoro.',
    rangeOfMotion:
      'Estendi braccio e gamba fino all’orizzontale, non più in alto. Sollevare di più la gamba inarca la zona lombare senza aggiungere nulla: l’orizzontale è il limite utile.',
    tempo:
      'Due secondi per estendere, uno o due di mantenimento, due per tornare. Il mantenimento è la parte che conta: è lì che la stabilizzazione lavora davvero.',
    anatomy:
      'L’erettore spinale e il multifido, muscolo profondo e segmentale della colonna, mantengono la schiena neutra. Gli obliqui resistono alla rotazione del bacino, il grande gluteo estende l’anca, e il deltoide con il trapezio inferiore sostengono il braccio in orizzontale.',
    mechanics:
      'Un esercizio anti-rotazione e anti-estensione: il peso degli arti opposti crea un momento che tende a torcere e inarcare il tronco, e tutto il compito consiste nell’impedirlo. È controllo motorio incrociato, lo stesso schema del cammino.',
    benefits: [
      'Rinforza la stabilità lombare senza carico compressivo sulla colonna, il che lo rende spesso ben tollerato anche con una schiena sensibile.',
      'Allena la coordinazione incrociata di braccio e gamba opposti, direttamente trasferibile al cammino.',
      'Rivela subito le asimmetrie: un lato è spesso nettamente meno stabile dell’altro.',
    ],
    progression: {
      easier: 'Estendi un arto alla volta, prima il braccio e poi la gamba.',
      harder: 'Allunga il mantenimento, oppure aggiungi un avvicinamento ginocchio-gomito sotto il corpo tra un’estensione e l’altra.',
      readyWhen:
        'Quando dieci ripetizioni per lato passano con il bacino perfettamente fermo, allunga il mantenimento a cinque secondi.',
    },
    precautions:
      'Un tappetino o un cuscino sotto le ginocchia evita che il fastidio articolare chiuda la serie prima che i muscoli si stanchino.',
  },

  catCow: {
    slug: 'gatto-mucca',
    muscles: { primary: 'Colonna, mobilità della schiena' },
    steps: [
      'Mettiti a quattro zampe, mani sotto le spalle e ginocchia sotto i fianchi.',
      'Inspirando, lascia scendere la schiena verso il basso e solleva la testa (la posizione della "mucca").',
      'Espirando, arrotonda la schiena verso l’alto e guarda l’ombelico (la posizione del "gatto").',
      'Alterna le due posizioni lentamente, al ritmo del respiro.',
    ],
    mistakes: [
      'Andare troppo veloce, scollegati dal respiro.',
      'Forzare l’escursione oltre il comfort, soprattutto in zona lombare.',
      'Lasciare cedere le spalle invece di restare attivi nelle mani.',
    ],
    sensation:
      'Uno srotolamento progressivo lungo la colonna, vertebra dopo vertebra, più che uno sforzo muscolare. Quello che cerchi è una sensazione di mobilità che si apre, non una contrazione.',
    rangeOfMotion:
      'Vai fino al limite del comfort in entrambe le direzioni, senza mai forzare. L’escursione si apre naturalmente con le ripetizioni: è l’unico esercizio qui in cui il raggio del giorno è pensato per crescere durante la serie stessa.',
    tempo:
      'Il respiro detta il tempo, non il contrario: inspira scendendo, espira arrotondando. Conta tre o quattro secondi per posizione, senza tempi morti.',
    anatomy:
      'Non è un esercizio di rinforzo. L’erettore spinale e gli addominali alternano contrazione e allungamento per mobilizzare ogni segmento vertebrale. I muscoli intersegmentali profondi lavorano su tutta l’escursione.',
    mechanics:
      'Flessione e poi estensione successive della colonna sul piano sagittale, senza carico: il peso del corpo poggia su mani e ginocchia, non sulla colonna. È questo che permette di mobilizzare liberamente, senza compressione assiale.',
    benefits: [
      'Ripristina la mobilità segmentale della colonna che lo stare seduti a lungo irrigidisce.',
      'È un ottimo riscaldamento prima di qualsiasi lavoro sulla schiena, e una transizione dolce a fine sessione.',
      'Accoppia esplicitamente movimento e respiro, il che aiuta a non trattenere il fiato negli altri esercizi.',
    ],
    precautions:
      'Non deve comparire dolore: questa è mobilità, non uno stretching forzato. Se un segmento resta bloccato, riduci l’escursione invece di insistere.',
  },

  reverseLunge: {
    slug: 'affondo-indietro',
    muscles: { primary: 'Quadricipiti, glutei', secondary: 'Femorali' },
    steps: [
      'In piedi, con i piedi alla larghezza dei fianchi.',
      'Porta una gamba indietro con un passo lungo, mantenendo il petto eretto.',
      'Piega entrambe le ginocchia finché quella posteriore sfiora il pavimento.',
      'Spingi sul tallone della gamba anteriore per tornare alla posizione di partenza.',
      'Ripeti dall’altro lato.',
    ],
    mistakes: [
      'Il ginocchio anteriore che supera ampiamente la punta del piede.',
      'Il petto che si inclina in avanti invece di restare eretto.',
      'Un passo troppo corto: riduce l’escursione e il lavoro dei glutei.',
    ],
    sensation:
      'Quadricipite e gluteo della gamba anteriore, con un allungamento davanti all’anca posteriore. L’equilibrio richiede uno sforzo costante: è normale, e fa parte del lavoro.',
    rangeOfMotion:
      'Scendi finché il ginocchio posteriore sfiora il pavimento senza toccarlo, con quello anteriore intorno ai 90°. Un passo troppo corto concentra tutto sul ginocchio anteriore; uno troppo lungo rende instabile il ritorno.',
    tempo:
      'Due secondi in discesa, uno o due in salita, con una breve pausa in basso per eliminare il rimbalzo. Espira spingendo sul tallone anteriore.',
    anatomy:
      'Quadricipite e grande gluteo della gamba anteriore svolgono la maggior parte del lavoro. Il medio gluteo stabilizza il bacino sul piano frontale, ed è questo che impedisce al ginocchio di cadere verso l’interno. Lo psoas della gamba posteriore viene messo in allungamento, e gli addominali mantengono il busto verticale.',
    mechanics:
      'Un affondo unilaterale che combina flessione ed estensione di anca e ginocchio sul piano sagittale, con una forte richiesta di stabilizzazione frontale. Fare il passo indietro invece che in avanti riduce la sollecitazione del ginocchio anteriore: il peso resta sulla gamba già in posizione, invece di essere frenato da quella che avanza.',
    benefits: [
      'Lavora ogni gamba separatamente, il che rivela e corregge le asimmetrie che uno squat nasconde.',
      'Sollecita molto l’equilibrio e gli stabilizzatori dell’anca, essenziali per il cammino e per le scale.',
      'La versione all’indietro è nettamente più delicata per il ginocchio dell’affondo in avanti, il che si adatta meglio a un ginocchio sensibile.',
    ],
    progression: {
      easier: 'Tieni una mano a un muro o allo schienale di una sedia, e riduci la profondità.',
      harder: 'Scendi di più, rallenta, o solleva il piede anteriore su un piccolo gradino.',
      readyWhen:
        'Quando dieci ripetizioni per gamba passano senza appoggio delle mani e senza che il ginocchio ceda verso l’interno.',
    },
    precautions:
      'Il ginocchio anteriore deve restare in linea con il piede. Se cede sistematicamente verso l’interno, manca forza nel medio gluteo: lavora in parallelo l’abduzione d’anca in piedi.',
  },

  stepUp: {
    slug: 'salita-su-sedia',
    muscles: { primary: 'Quadricipiti, glutei', secondary: 'Femorali, equilibrio' },
    steps: [
      'Mettiti davanti a una sedia bassa e stabile, ben appoggiata al pavimento.',
      'Appoggia un piede per intero sulla seduta.',
      'Spingi su quel piede per portare tutto il corpo sulla sedia.',
      'Scendi in controllo con lo stesso piede, senza lasciarti cadere.',
      'Ripeti alternando le gambe.',
    ],
    mistakes: [
      'Darsi la spinta con la gamba a terra invece di spingere con quella sulla sedia.',
      'Il ginocchio che cede verso l’interno durante la salita.',
      'Una sedia instabile o troppo alta: verifica che non si ribalti.',
    ],
    sensation:
      'Il quadricipite e il gluteo della gamba che spinge, sia salendo sia scendendo. Se senti soprattutto il polpaccio della gamba rimasta a terra, ti stai dando la spinta con quella invece di spingere con la gamba in alto.',
    rangeOfMotion:
      'Sali fino alla completa estensione della gamba di appoggio, poi scendi finché il piede tocca il pavimento senza trasferirvi il peso. L’altezza del gradino determina la difficoltà: metà polpaccio per iniziare, altezza del ginocchio per un lavoro impegnativo.',
    tempo:
      'Uno o due secondi in salita, due o tre in discesa. La discesa controllata è la parte più utile e più spesso affrettata: è quella che riproduce lo scendere le scale.',
    anatomy:
      'Il quadricipite della gamba sul gradino estende il ginocchio, il grande gluteo estende l’anca. Il medio gluteo stabilizza il bacino nell’appoggio su una gamba, impedendo all’anca opposta di abbassarsi. I polpacci contribuiscono alla spinta finale.',
    mechanics:
      'Estensione unilaterale di anca e ginocchio in catena chiusa contro la gravità, lungo tutta l’altezza del gradino. Riproduce esattamente il gesto di salire le scale: uno dei rari esercizi il cui trasferimento alla vita quotidiana è letterale.',
    benefits: [
      'Riproduce direttamente un gesto quotidiano: salire le scale, un marciapiede, o salire su un veicolo alto.',
      'Carica una gamba alla volta, raddoppiando il carico relativo senza alcun attrezzo.',
      'La fase di discesa allena il controllo eccentrico, proprio ciò che manca quando scendere le scale diventa difficile.',
    ],
    progression: {
      easier: 'Scegli un gradino più basso e tieni una mano per l’equilibrio.',
      harder: 'Usa un gradino più alto, rallenta la discesa, o fai una pausa in alto su una gamba sola.',
      readyWhen:
        'Quando dieci ripetizioni per gamba passano senza appoggio delle mani e senza spinta dalla gamba a terra, sali di livello.',
    },
    precautions:
      'La stabilità dell’appoggio non è negoziabile: una sedia che scivola o si ribalta rende pericoloso questo esercizio. Un gradino di una scala è spesso la scelta migliore.',
  },

  lateralLunge: {
    slug: 'affondo-laterale',
    muscles: { primary: 'Quadricipiti, glutei', secondary: 'Adduttori' },
    steps: [
      'In piedi, con i piedi uniti.',
      'Fai un passo lungo di lato.',
      'Piega il ginocchio di quella gamba portando il bacino indietro, l’altra gamba resta tesa.',
      'Spingi sul tallone della gamba piegata per tornare alla posizione di partenza.',
      'Ripeti dall’altro lato.',
    ],
    mistakes: [
      'Il ginocchio piegato che cede verso l’interno invece di restare in linea con il piede.',
      'Il tallone della gamba piegata che si stacca dal pavimento.',
      'Il petto che crolla in avanti invece di restare eretto.',
    ],
    sensation:
      'Quadricipite e gluteo della gamba piegata, più un allungamento netto sulla parte interna della coscia tesa. Quest’ultima sensazione è spesso la più evidente all’inizio: gli adduttori sono raramente sollecitati in questa escursione.',
    rangeOfMotion:
      'Scendi fin dove l’interno della coscia opposta consente, senza che il tallone della gamba piegata si stacchi. All’inizio il limite è la flessibilità degli adduttori, non la forza: l’escursione si aprirà da sola.',
    tempo:
      'Due o tre secondi in discesa, uno o due in salita. Tieni il petto eretto e le punte dei piedi in avanti su entrambi i lati.',
    anatomy:
      'Quadricipite e grande gluteo della gamba piegata producono il movimento. Gli adduttori della gamba tesa lavorano in allungamento, e il medio gluteo stabilizza il bacino. Il movimento si svolge su un piano che quasi tutti gli esercizi convenzionali ignorano.',
    mechanics:
      'Flessione ed estensione di anca e ginocchio sul piano frontale, a differenza di squat e affondo che restano sul piano sagittale. È proprio questo orientamento a renderlo complementare: recluta muscoli ed escursioni che gli altri lasciano fuori.',
    benefits: [
      'Lavora il piano frontale, il grande assente dei programmi senza attrezzi, da cui il suo reale valore malgrado l’apparente sovrapposizione con lo squat.',
      'Rinforza gli adduttori e la mobilità laterale dell’anca, utili per evitare inciampi e perdite di equilibrio di lato.',
      'Migliora la capacità di spostarsi lateralmente, un gesto quotidiano che non viene mai allenato altrimenti.',
    ],
    progression: {
      easier: 'Accorcia il passo e riduci la profondità, oppure tieni una mano su un appoggio.',
      harder: 'Allarga il passo, scendi di più, o rallenta il ritorno.',
      readyWhen: 'Quando dieci ripetizioni per lato passano con il tallone a terra e il petto eretto.',
    },
    precautions:
      'A qualsiasi fastidio sulla parte interna della coscia, accorcia nettamente il passo: gli adduttori si risentono facilmente quando si cerca troppo presto l’escursione massima.',
  },

  gluteBridge: {
    slug: 'ponte-per-glutei',
    muscles: { primary: 'Glutei', secondary: 'Femorali, zona lombare' },
    steps: [
      'Sdraiati sulla schiena, ginocchia piegate e piedi appoggiati vicino ai glutei.',
      'Spingi sui talloni per sollevare il bacino verso il soffitto.',
      'Contrai forte i glutei in alto, con il corpo allineato dalle ginocchia alle spalle.',
      'Scendi in controllo senza lasciar cadere il bacino.',
    ],
    mistakes: [
      'Spingere sulle punte dei piedi invece che sui talloni.',
      'Inarcare eccessivamente la zona lombare invece di concludere con una contrazione dei glutei.',
      'Non salire abbastanza: in alto il corpo deve essere allineato.',
    ],
    sensation:
      'I glutei, distintamente, con un po’ di femorali. Se la zona lombare lavora più dei glutei, la salita viene da un inarcamento lombare e non da un’estensione d’anca: è l’errore più diffuso in questo esercizio.',
    rangeOfMotion:
      'Sali finché ginocchia, bacino e spalle sono allineati, non oltre. Cercare di andare più su aggiunge solo inarcamento: l’allineamento è il tetto utile.',
    tempo:
      'Due secondi in salita, uno o due di contrazione in alto, due o tre in discesa. La pausa in alto con i glutei contratti è ciò che separa un ponte efficace da una semplice oscillazione del bacino.',
    anatomy:
      'Il grande gluteo è il motore principale: è l’estensore d’anca più potente del corpo. I femorali aiutano, l’erettore spinale stabilizza la colonna senza dover produrre il movimento, e gli addominali impediscono un inarcamento eccessivo in alto.',
    mechanics:
      'Estensione d’anca in catena chiusa con la schiena a terra. Il pavimento elimina ogni richiesta di equilibrio e scarica la colonna, il che permette di mirare al grande gluteo in isolamento: difficile in piedi, dove quadricipiti e polpacci partecipano sempre.',
    benefits: [
      'Coinvolge il grande gluteo più direttamente dello squat, dove il quadricipite assume gran parte del lavoro.',
      'Controbilancia l’inibizione del gluteo installata dallo stare seduti a lungo.',
      'Lavora senza carico sulla colonna, il che lo rende spesso accessibile quando i movimenti in piedi non lo sono ancora.',
    ],
    progression: {
      easier: 'Riduci l’altezza della salita, oppure avvicina i piedi ai glutei.',
      harder: 'Passa a una gamba sola, con l’altro ginocchio al petto, o allunga la contrazione in alto a cinque secondi.',
      readyWhen:
        'Quando tre serie da quindici passano con una contrazione decisa in alto e senza crampi ai femorali, passa a una gamba sola.',
    },
    precautions:
      'Un crampo ai femorali in alto significa di solito che i glutei non stanno facendo la loro parte: avvicina i piedi e concentrati sulla spinta dai talloni.',
  },

  donkeyKick: {
    slug: 'slancio-del-gluteo',
    muscles: { primary: 'Glutei', secondary: 'Core' },
    steps: [
      'Mettiti a quattro zampe, mani sotto le spalle e ginocchia sotto i fianchi.',
      'Tieni un ginocchio piegato a 90° e spingi quel piede verso il soffitto.',
      'Contrai il gluteo in alto, senza inarcare la zona lombare.',
      'Scendi in controllo senza appoggiare il ginocchio tra una ripetizione e l’altra.',
      'Chiudi la serie, poi cambia lato.',
    ],
    mistakes: [
      'Inarcare la zona lombare per guadagnare altezza.',
      'Andare troppo veloce, lanciando la gamba invece di spingerla in controllo.',
      'Il busto che ruota invece di restare parallelo al pavimento.',
    ],
    sensation:
      'Il gluteo della gamba che sale, in isolamento. Se la zona lombare si incava per guadagnare altezza, l’esercizio ha cambiato natura: non lavora più il gluteo ma la muscolatura lombare.',
    rangeOfMotion:
      'Sali finché la coscia raggiunge la linea del busto, non oltre. Il punto di arresto è dove il bacino inizierebbe a inclinarsi, spesso molto più in basso di quanto si pensi.',
    tempo:
      'Due secondi per spingere, uno di contrazione in alto, due in discesa senza appoggiare il ginocchio. Il movimento va spinto, mai lanciato.',
    anatomy:
      'Il grande gluteo estende l’anca, con il ginocchio tenuto piegato per accorciare i femorali e impedire loro di prendere il sopravvento. Il medio gluteo e gli obliqui del lato opposto stabilizzano il bacino contro la rotazione.',
    mechanics:
      'Estensione d’anca in catena aperta con ginocchio flesso. Tenere il ginocchio piegato è un vincolo meccanico deliberato: mette i femorali in insufficienza attiva, concentrando l’estensione sul grande gluteo.',
    benefits: [
      'Isola il gluteo con pochissimo aiuto da altri gruppi, cosa rara senza attrezzi.',
      'Insegna a dissociare l’estensione d’anca dall’inarcamento lombare, una distinzione che ripaga in ogni altro esercizio della catena posteriore.',
      'Non carica la colonna, poiché la posizione a quattro zampe distribuisce il peso su quattro punti di appoggio.',
    ],
    progression: {
      easier: 'Riduci l’escursione e concentrati sulla contrazione più che sull’altezza.',
      harder: 'Allunga la contrazione in alto, oppure appoggiati sugli avambracci, il che aumenta la richiesta di stabilizzazione.',
      readyWhen:
        'Quando quindici ripetizioni per lato passano senza incavare la zona lombare e senza rotazione del bacino.',
    },
  },

  hipAbduction: {
    slug: 'abduzione-anca-in-piedi',
    muscles: { primary: 'Medio gluteo (lato dell’anca)' },
    steps: [
      'In piedi, appoggiandoti leggermente a una sedia o a un muro se ti serve equilibrio.',
      'Tieni la gamba di appoggio leggermente piegata e il petto eretto.',
      'Solleva l’altra gamba di lato, tesa, senza inclinare il busto.',
      'Scendi in controllo senza lasciar cadere il piede.',
      'Chiudi la serie, poi cambia gamba.',
    ],
    mistakes: [
      'Inclinare il busto dall’altra parte per guadagnare altezza: è un trucco, non un effetto in più.',
      'Portare la gamba in avanti invece di sollevarla esattamente di lato.',
      'Andare troppo veloce, a slancio.',
    ],
    sensation:
      'Sul lato dell’anca, sopra l’articolazione, una zona che pochi esercizi raggiungono. Sulla gamba di appoggio, uno sforzo di stabilizzazione discreto ma reale.',
    rangeOfMotion:
      'Solleva la gamba a circa 30-45°, non di più. Oltre, il quadrato dei lombi prende il sopravvento inclinando il busto: l’escursione apparente cresce, il lavoro del medio gluteo no.',
    tempo:
      'Due secondi in salita, uno in alto, due in discesa. Questo muscolo risponde meglio al controllo e al volume che alla velocità.',
    anatomy:
      'Il medio gluteo è il motore principale, aiutato dal piccolo gluteo e dal tensore della fascia lata. Sulla gamba di appoggio, gli stessi muscoli lavorano in isometria per impedire al bacino di abbassarsi dal lato sollevato.',
    mechanics:
      'Abduzione d’anca sul piano frontale, in catena aperta sul lato che lavora e con stabilizzazione isometrica sul lato di appoggio. Entrambe le anche lavorano quindi insieme, ma in due modi diversi: un punto spesso trascurato.',
    benefits: [
      'Rinforza il medio gluteo, la cui debolezza è una causa frequente del cedimento del ginocchio verso l’interno in squat, affondi e discese di scale.',
      'Migliora la stabilità su una gamba, cioè metà di ogni passo del cammino.',
      'Completa direttamente squat e affondi correggendo ciò che li fa degradare.',
    ],
    progression: {
      easier: 'Tieniti all’appoggio con entrambe le mani e riduci l’escursione.',
      harder:
        'Lascia l’appoggio, allunga il mantenimento in alto, oppure passa in posizione su un fianco per eliminare ogni compenso.',
      readyWhen: 'Quando quindici ripetizioni per lato passano senza appoggio e senza inclinare il busto.',
    },
  },

  sidePlank: {
    slug: 'plank-laterale',
    muscles: { primary: 'Obliqui, core laterale' },
    steps: [
      'Sdraiati su un fianco, appoggiato sull’avambraccio posto sotto la spalla.',
      'Sovrapponi i piedi uno sull’altro, oppure sfalsali per più stabilità.',
      'Solleva il bacino da terra per allineare il corpo in linea retta.',
      'Mantieni la posizione respirando normalmente, senza lasciar cadere il bacino.',
      'Chiudi la serie, poi cambia lato.',
    ],
    mistakes: [
      'Il bacino che cede verso il pavimento durante il mantenimento.',
      'La spalla che sprofonda verso l’orecchio invece di restare sopra il gomito.',
      'Il corpo che ruota in avanti o all’indietro.',
    ],
    sensation:
      'Il lato del tronco, tra le costole e l’anca, sul lato a terra. Anche la spalla di appoggio lavora: se sprofonda verso l’orecchio, spingi attivamente il pavimento per tenerla stabile.',
    rangeOfMotion:
      'Nessuna escursione, un allineamento: orecchio, spalla, anca e caviglia su una stessa linea vista di fronte. Il bacino è il punto che cede per primo, ed è quello da sorvegliare.',
    tempo:
      'Un mantenimento continuo, respirando normalmente. Come nel plank standard, il criterio di stop è la posizione e non l’orologio: appena il bacino cede, la serie è finita.',
    anatomy:
      'Gli obliqui interno ed esterno del lato a terra guidano il mantenimento, aiutati dal quadrato dei lombi. Il medio gluteo stabilizza il bacino sul piano frontale, e il dentato anteriore tiene la scapola di appoggio aderente alle costole.',
    mechanics:
      'Un isometrico anti-flessione laterale: la gravità tira il bacino verso il pavimento e la catena laterale lo impedisce. È il complemento diretto del plank standard, che lavora poco questo piano.',
    benefits: [
      'Lavora la catena laterale, dimenticata dal plank standard e dalla maggior parte degli esercizi addominali.',
      'Rinforza la stabilità del bacino nell’appoggio su una gamba, che si trasferisce al cammino e al portare un carico da un solo lato.',
      'Rende molto visibili le asimmetrie destra-sinistra: il tempo di tenuta spesso differisce parecchio.',
    ],
    progression: {
      easier: 'Piega le ginocchia e appoggiati su quelle invece che sui piedi: la leva si accorcia molto.',
      harder: 'Allunga la durata, solleva il braccio libero verso il soffitto, o solleva la gamba superiore.',
      readyWhen:
        'Quando trenta secondi per lato passano senza cedimento del bacino, aggiungi complessità invece di allungare all’infinito.',
    },
    precautions:
      'Il gomito deve stare esattamente sotto la spalla. Troppo avanti o indietro, la sollecitazione si sposta sull’articolazione invece di restare sul muscolo.',
  },

  standingKneeRaise: {
    slug: 'sollevamento-ginocchia-in-piedi',
    muscles: { primary: 'Core, flessori dell’anca' },
    steps: [
      'In piedi, con i piedi alla larghezza dei fianchi.',
      'Solleva un ginocchio verso il petto, mantenendo la schiena dritta.',
      'Fai una breve pausa in alto, con il core attivo.',
      'Scendi in controllo e ripeti, oppure alterna i lati.',
    ],
    mistakes: [
      'La schiena che si arrotonda per sollevare più in alto il ginocchio.',
      'Inclinarsi all’indietro per compensare invece di tenere il petto eretto.',
      'Un movimento lanciato invece che controllato.',
    ],
    sensation:
      'Il basso addome e la parte anteriore dell’anca del lato che sale, con uno sforzo di equilibrio sulla gamba di appoggio. Se la schiena si inarca o il petto va indietro, il core non tiene più il bacino.',
    rangeOfMotion:
      'Solleva il ginocchio fino all’altezza dell’anca, non di più. Andare più su inclina il bacino all’indietro e trasferisce il lavoro dai flessori dell’anca alla zona lombare.',
    tempo:
      'Uno o due secondi in salita, una breve pausa in alto, due in discesa. La discesa controllata conta quanto la salita.',
    anatomy:
      'L’ileopsoas e il retto femorale flettono l’anca. Gli addominali, soprattutto il trasverso, impediscono al bacino di inclinarsi: questa cocontrazione è ciò che distingue un vero esercizio di core in piedi da un semplice sollevamento di ginocchio.',
    mechanics:
      'Flessione d’anca in catena aperta, raddoppiata da una richiesta di stabilizzazione su una gamba. Stare in piedi aggiunge un requisito di equilibrio assente dal lavoro di core a terra, il che lo avvicina ai vincoli reali del cammino.',
    benefits: [
      'Lavora il core in piedi, che è dove svolge davvero la sua funzione.',
      'Allena l’equilibrio su una gamba, direttamente legato alla stabilità nel cammino.',
      'Non richiede un pavimento pulito né un tappetino: praticabile in abiti da città e ovunque.',
    ],
    progression: {
      easier: 'Tieni una mano appoggiata leggermente a un muro o allo schienale di una sedia.',
      harder: 'Lascia l’appoggio, chiudi gli occhi, o allunga il mantenimento in alto.',
      readyWhen: 'Quando quindici ripetizioni per gamba passano senza appoggio e senza inclinarsi all’indietro.',
    },
  },

  crunch: {
    slug: 'crunch',
    muscles: { primary: 'Addominali (retto dell’addome)' },
    steps: [
      'Sdraiati sulla schiena, con le ginocchia piegate e i piedi appoggiati a terra.',
      'Metti le mani leggermente dietro le orecchie o incrociate sul petto, senza tirare il collo.',
      'Solleva le scapole dal pavimento espirando, contraendo gli addominali.',
      'Scendi in controllo fino a sfiorare il pavimento senza scaricarvi tutto il peso.',
    ],
    mistakes: [
      'Tirare la testa con le mani per salire di più: carica il collo invece degli addominali.',
      'Salire fino a sedersi: quello non è più un crunch, e l’effetto sugli addominali cala.',
      'Trattenere il fiato invece di espirare durante la contrazione.',
    ],
    sensation:
      'La parte alta della parete addominale, su un’escursione breve. Una tensione al collo significa sempre che le mani stanno tirando la testa: devono solo accompagnarla.',
    rangeOfMotion:
      'Solleva le scapole dal pavimento, nulla di più. Continuare fino a sedersi sposta il lavoro sui flessori dell’anca: l’escursione breve non è una concessione, è il movimento corretto.',
    tempo:
      'Due secondi in salita espirando, due in discesa inspirando, senza rilasciare del tutto in basso per non perdere la tensione.',
    anatomy:
      'Il retto dell’addome avvicina lo sterno al bacino: è il motore del movimento. Gli obliqui contribuiscono alla stabilizzazione. Lo psoas interviene appena finché l’escursione resta breve, ed è proprio questo a distinguere un crunch da un sit-up completo.',
    mechanics:
      'Flessione della colonna sul piano sagittale, su un’escursione volutamente limitata. Il movimento sottopone la colonna lombare a una flessione ripetuta: per questo completa, ma non sostituisce mai, il lavoro anti-estensione come il plank o il dead bug.',
    benefits: [
      'Recluta il retto dell’addome in modo diretto, cosa che gli esercizi isometrici di core non fanno.',
      'Escursione breve e posizione a terra ne fanno uno dei modi più accessibili di riprendere il lavoro addominale.',
      'Si combina bene con il plank e il dead bug, che allenano la stabilizzazione invece della flessione.',
    ],
    progression: {
      easier: 'Incrocia le braccia sul petto invece di tenerle dietro la testa, e riduci l’escursione.',
      harder: 'Rallenta, fai una pausa in alto, oppure distendi le braccia oltre la testa.',
      readyWhen: 'Quando tre serie da venti passano senza tirare il collo.',
    },
    precautions:
      'La flessione ripetuta della colonna non è adatta a tutti. Con qualsiasi sensibilità lombare, privilegia il dead bug e il plank, che producono lavoro addominale senza flettere la colonna.',
  },

  highKneeMarch: {
    slug: 'marcia-con-ginocchia-alte',
    muscles: { primary: 'Cardiovascolare, flessori dell’anca' },
    steps: [
      'In piedi, con i piedi alla larghezza dei fianchi.',
      'Solleva un ginocchio fino all’altezza dell’anca, poi appoggia il piede in controllo.',
      'Alterna le gambe a ritmo regolare, come una marcia sul posto.',
      'Tieni il petto eretto e lascia che le braccia accompagnino il movimento.',
    ],
    mistakes: [
      'Un ritmo affrettato che ti fa perdere controllo ed equilibrio.',
      'Il petto che si inclina all’indietro per alzare di più il ginocchio.',
      'Appoggiare il piede pesantemente a ogni passo.',
    ],
    sensation:
      'Fiatone progressivo, più lavoro nella parte anteriore delle anche e nei polpacci. È un esercizio cardiovascolare, non di forza: la fatica deve essere respiratoria prima che muscolare.',
    rangeOfMotion:
      'Ginocchio all’altezza dell’anca, con il piede completamente appoggiato tra un sollevamento e l’altro. Salire di più non aggiunge nulla al lavoro cardiovascolare e inclina il bacino.',
    tempo:
      'Un ritmo regolare che riesci a sostenere per tutta la durata prevista, non un’accelerazione seguita da un crollo. Le braccia si muovono naturalmente, in opposizione alle gambe.',
    anatomy:
      'L’ileopsoas e il retto femorale flettono l’anca, i polpacci gestiscono propulsione e ricezione. Gli addominali stabilizzano il bacino a ogni appoggio, e il medio gluteo della gamba di appoggio impedisce all’anca opposta di abbassarsi.',
    mechanics:
      'Locomozione sul posto, senza spostamento e senza fase aerea: ogni piede torna a terra prima che l’altro la lasci. Questa assenza di sospensione elimina l’impatto, il che la distingue nettamente dalla corsa con ginocchia alte.',
    benefits: [
      'Alza la frequenza cardiaca senza spostamento e senza attrezzi, in un solo metro quadrato.',
      'Serve come riscaldamento completo a inizio sessione, o come spinta cardiovascolare tra due esercizi di forza.',
      'Senza impatto, a differenza dei salti: praticabile in appartamento e a qualsiasi ora.',
    ],
    progression: {
      easier: 'Abbassa le ginocchia e il ritmo, fino a una semplice marcia sul posto.',
      harder: 'Alza il ritmo, allunga la durata, o aggiungi un movimento delle braccia sopra la testa.',
      readyWhen:
        'Quando due round da sessanta secondi passano senza fiatone marcato, allunga la durata.',
    },
  },

  buttKickMarch: {
    slug: 'marcia-calciata-dietro',
    muscles: { primary: 'Cardiovascolare, femorali' },
    steps: [
      'In piedi, con i piedi alla larghezza dei fianchi.',
      'Piega un ginocchio per portare il tallone verso il gluteo.',
      'Appoggia il piede in controllo e ripeti dall’altro lato.',
      'Mantieni un ritmo moderato e regolare, come una marcia sul posto.',
    ],
    mistakes: [
      'Un ritmo troppo veloce, che riduce l’ampiezza del movimento.',
      'Il petto che si inclina in avanti durante l’esercizio.',
      'Il tallone che non sale abbastanza: riduce il senso del movimento.',
    ],
    sensation:
      'Fiatone moderato e lavoro nella parte posteriore delle cosce. È il naturale contraltare della marcia con ginocchia alte: dove quella lavora la parte anteriore dell’anca, questa mobilizza la parte posteriore della coscia.',
    rangeOfMotion:
      'Porta il tallone il più vicino possibile al gluteo, per quanto la flessibilità consente, senza che il ginocchio avanzi o il bacino si inclini. Il petto resta eretto per tutto il tempo.',
    tempo:
      'Un ritmo moderato e regolare. L’obiettivo è resistenza e mobilizzazione, non velocità massima: troppo veloce, l’ampiezza si riduce e l’esercizio perde il suo senso.',
    anatomy:
      'I femorali flettono il ginocchio — la loro azione principale, e una di quelle raramente allenate senza attrezzi. I glutei mantengono l’estensione d’anca, e gli addominali impediscono un inarcamento di compenso.',
    mechanics:
      'Flessione ripetuta di ginocchio in catena aperta, alternata, senza impatto e senza fase aerea. Stare in piedi aggiunge una componente di equilibrio su una gamba a ogni appoggio, assente dal lavoro equivalente a terra.',
    benefits: [
      'Recluta i femorali in flessione, cosa che nessun altro esercizio senza attrezzi di questa libreria fa direttamente.',
      'Completa la marcia con ginocchia alte per bilanciare la parte anteriore e posteriore della coscia.',
      'Un ottimo riscaldamento prima di qualsiasi lavoro sulle gambe, e senza impatto.',
    ],
    progression: {
      easier: 'Rallenta e riduci l’escursione, fino a una semplice marcia sul posto.',
      harder: 'Alza leggermente il ritmo, allunga la durata, o fai una pausa con il tallone al gluteo.',
      readyWhen: 'Quando due round da sessanta secondi passano mantenendo l’ampiezza completa.',
    },
    precautions:
      'Un crampo nella parte posteriore della coscia segnala di solito un riscaldamento insufficiente: inizia con una semplice marcia sul posto prima di aggiungere ampiezza.',
  },

  bandPullApart: {
    slug: 'apertura-con-elastico',
    muscles: { primary: 'Deltoide posteriore, romboidi', secondary: 'Trapezio medio' },
    steps: [
      'Tieni l’elastico con entrambe le mani, braccia tese davanti a te all’altezza del petto, con una leggera tensione già presente.',
      'Apri le braccia verso l’esterno mantenendo i gomiti tesi, finché l’elastico non tocca il petto.',
      'Stringi le scapole tra loro al termine del movimento.',
      'Torna lentamente alla posizione di partenza controllando la tensione dell’elastico.',
    ],
    mistakes: [
      'Gomiti che si piegano durante l’apertura: trasforma il movimento in un rematore e riduce il lavoro della parte posteriore della spalla.',
      'Usare lo slancio del busto per aiutare ad aprire le braccia.',
      'Rilascio brusco al ritorno invece di controllare la tensione dell’elastico.',
    ],
    sensation:
      'Il lavoro si sente tra le scapole e nella parte posteriore delle spalle, non negli avambracci né nei bicipiti. Una tensione nella parte alta del trapezio segnala che le spalle si alzano invece di restare basse.',
    rangeOfMotion:
      'Apri le braccia finché l’elastico tocca il petto o la parte alta del busto, senza cercare di più: oltre, la tensione cala e le spalle compensano.',
    tempo:
      'Uno o due secondi per aprire, due o tre per tornare controllando la tensione. Espira aprendo, inspira tornando.',
    anatomy:
      'Il deltoide posteriore e i romboidi avvicinano le scapole alla colonna, il trapezio medio e inferiore stabilizzano la scapola contro la gabbia toracica. Gli estensori del gomito restano contratti in isometria per mantenere le braccia tese per tutto il movimento.',
    mechanics:
      'Abduzione orizzontale della spalla nel piano trasversale, contro una resistenza crescente: la tensione dell’elastico è minima a braccia tese davanti al corpo e massima a braccia aperte — l’opposto di un carico a corpo libero, costante lungo tutta l’ampiezza.',
    benefits: [
      'Rinforza la parte posteriore della spalla, spesso poco sollecitata rispetto alla parte anteriore nei gesti quotidiani.',
      'Bilancia le spalle quando nella seduta sono già presenti diversi movimenti di spinta (piegamenti, distensioni).',
      'Richiede solo un elastico e un metro quadrato di spazio.',
    ],
    progression: {
      easier: 'Usa un elastico meno teso, o tienilo più largo per ridurre la resistenza.',
      harder: 'Usa un elastico più teso, o rallenta il ritorno a quattro secondi.',
      readyWhen: 'Quando tre serie da quindici passano senza che le spalle salgano verso le orecchie.',
    },
    precautions:
      'Interrompi il movimento se compare dolore nella parte anteriore della spalla invece che tra le scapole: è il segno di una posizione scorretta della spalla.',
  },

  bandSquat: {
    slug: 'squat-con-elastico',
    muscles: { primary: 'Quadricipiti, glutei', secondary: 'Medio gluteo, femorali' },
    steps: [
      'Posiziona l’elastico appena sopra le ginocchia, piedi larghi quanto le anche.',
      'Spingi le anche indietro e scendi come in uno squat classico, le ginocchia spingono l’elastico verso l’esterno.',
      'Scendi finché le cosce sono vicine all’orizzontale, peso sui talloni.',
      'Risali spingendo sui talloni fino all’estensione completa, senza lasciare che le ginocchia cedano verso l’interno.',
    ],
    mistakes: [
      'Lasciare che le ginocchia cedano verso l’interno invece di spingere l’elastico verso l’esterno.',
      'Scendere senza controllo, lasciando che l’elastico riporti le ginocchia bruscamente verso l’interno.',
      'Busto che si inclina troppo in avanti.',
    ],
    sensation:
      'Il lavoro si sente nella parte anteriore delle cosce e sul lato dei glutei, che devono spingere attivamente l’elastico. Una tensione al ginocchio segnala che l’allineamento ginocchio-piede non viene mantenuto.',
    rangeOfMotion:
      'Scendi finché le cosce sono vicine all’orizzontale, senza superare ciò che consente una mobilità dell’anca confortevole.',
    tempo:
      'Tre secondi per scendere, uno o due per risalire. Inspira scendendo, espira spingendo sui talloni.',
    anatomy:
      'Il quadricipite e il grande gluteo restano i motori principali dello squat; l’elastico aggiunge una resistenza laterale che il medio gluteo deve contrastare in continuazione per impedire al ginocchio di cedere verso l’interno, cosa che uno squat a corpo libero non richiede allo stesso modo.',
    mechanics:
      'Doppia flessione poi doppia estensione di anca e ginocchio nel piano sagittale, combinata a una resistenza in abduzione d’anca imposta dall’elastico nel piano frontale.',
    benefits: [
      'Rinforza lo squat classico aggiungendo un lavoro attivo del medio gluteo, utile per la stabilità del ginocchio nella camminata e nella corsa.',
      'Dà un riscontro tattile immediato sull’allineamento del ginocchio: se l’elastico si allenta, il ginocchio è ceduto verso l’interno.',
      'Attrezzatura leggera ed economica, facile da portare ovunque.',
    ],
    progression: {
      easier: 'Usa un elastico meno resistente, o riduci la profondità della discesa.',
      harder: 'Usa un elastico più resistente, o aggiungi una pausa di due secondi in basso.',
      readyWhen: 'Quando tre serie da quindici passano senza che l’elastico si allenti mai.',
    },
    precautions:
      'Scegli una resistenza che permetta di mantenere le ginocchia allineate per tutta la serie: un elastico troppo forte che le costringe a cedere è controproducente.',
  },

  dumbbellGobletSquat: {
    slug: 'goblet-squat',
    muscles: { primary: 'Quadricipiti, glutei', secondary: 'Core, schiena alta' },
    steps: [
      'Tieni un manubrio in verticale con entrambe le mani contro il petto, gomiti rivolti verso il basso.',
      'Piedi un po’ più larghi delle anche, punte leggermente aperte.',
      'Scendi spingendo le anche indietro, gomiti che sfiorano l’interno delle ginocchia.',
      'Risali spingendo sui talloni fino all’estensione completa delle gambe.',
    ],
    mistakes: [
      'Il busto crolla in avanti sotto il peso del manubrio.',
      'I talloni si sollevano durante la discesa.',
      'Discesa incompleta per scarsa mobilità della caviglia invece che per scelta.',
    ],
    sensation:
      'Il lavoro si sente nella parte anteriore delle cosce e nei glutei, con in più una tensione isometrica nella schiena alta e negli avambracci che tengono il manubrio. Il busto deve restare verticale dall’inizio alla fine.',
    rangeOfMotion:
      'Scendi finché i gomiti toccano o sfiorano l’interno delle ginocchia: tenere il carico davanti al corpo permette naturalmente una discesa più profonda rispetto a uno squat a mani libere.',
    tempo:
      'Due o tre secondi per scendere, uno o due per risalire. Inspira scendendo, espira spingendo sui talloni.',
    anatomy:
      'Il quadricipite e il grande gluteo restano i motori principali; tenere il carico contro il petto obbliga gli erettori spinali e gli addominali a mantenere il busto verticale contro la tendenza a inclinarsi in avanti, un lavoro di core che uno squat a corpo libero non richiede allo stesso grado.',
    mechanics:
      'Doppia flessione poi doppia estensione di anca e ginocchio nel piano sagittale. Il carico tenuto vicino al baricentro, contro il petto, mantiene il busto più verticale rispetto a uno squat con carico sulla schiena.',
    benefits: [
      'Aggiunge un carico esterno progressivo a un movimento già padroneggiato a corpo libero: il passo successivo logico quando lo squat sulla sedia diventa facile.',
      'La posizione del carico contro il petto insegna una postura di squat verticale, utile per tutti gli squat caricati a venire.',
      'Richiede solo un manubrio o un carico equivalente (una bottiglia zavorrata, un kettlebell).',
    ],
    progression: {
      easier: 'Usa un carico più leggero, o torna temporaneamente allo squat sulla sedia senza peso.',
      harder: 'Aumenta il carico gradualmente, o rallenta la discesa a quattro secondi.',
      readyWhen: 'Quando tre serie da dieci passano con il busto verticale e i talloni che non si sollevano mai.',
    },
    precautions:
      'Aumenta il carico a piccoli passi: profondità e controllo devono restare intatti per primi, non il peso indicato sul manubrio.',
  },

  dumbbellRow: {
    slug: 'rematore-con-manubrio-a-un-braccio',
    muscles: { primary: 'Grande dorsale, trapezio', secondary: 'Bicipiti, core' },
    steps: [
      'Appoggia un ginocchio e la mano dello stesso lato su una panca o una sedia stabile, schiena parallela al suolo.',
      'Tieni il manubrio nell’altra mano, braccio teso verso il pavimento.',
      'Tira il manubrio verso il fianco mantenendo il gomito vicino al corpo, la scapola che si avvicina alla colonna.',
      'Scendi con controllo fino all’estensione completa del braccio.',
    ],
    mistakes: [
      'Ruotare il busto per aiutare a tirare il manubrio invece di lasciar lavorare la schiena.',
      'Il gomito si allontana dal corpo, trasformando il rematore in un movimento di spalla.',
      'La schiena si incurva invece di restare piatta.',
    ],
    sensation:
      'Il lavoro si sente al centro della schiena e sotto l’ascella, con la scapola che si avvicina chiaramente alla colonna nella parte alta del movimento. Una tensione nella parte bassa della schiena segnala che l’appoggio sulla panca non sostiene abbastanza il busto.',
    rangeOfMotion:
      'Tira finché il manubrio tocca o sfiora il fianco, gomito che supera leggermente la schiena. Scendi fino all’estensione completa del braccio per usare tutta l’ampiezza disponibile.',
    tempo:
      'Un secondo per tirare, due o tre per scendere controllando il carico. Espira tirando, inspira scendendo.',
    anatomy:
      'Il grande dorsale e il grande rotondo avvicinano il braccio al corpo e lo estendono all’indietro, i romboidi e il trapezio medio avvicinano la scapola alla colonna, il bicipite assiste flettendo il gomito. L’appoggio ginocchio-mano sulla panca stabilizza il busto per isolare il lavoro della schiena.',
    mechanics:
      'Estensione e adduzione della spalla nel piano sagittale, associata a una retrazione scapolare. L’appoggio unilaterale sulla panca elimina il contributo delle gambe presente in un rematore in piedi.',
    benefits: [
      'Rinforza lo schema di trazione, poco presente in una seduta a corpo libero dove gli esercizi per la schiena restano isometrici (superman, quadrupedia con estensione).',
      'L’appoggio unilaterale permette di lavorare ogni lato in modo indipendente e di individuare differenze di forza tra le braccia.',
      'Un contrappeso utile rispetto ai movimenti di spinta (piegamenti, distensioni) già presenti nella maggior parte delle sedute.',
    ],
    progression: {
      easier: 'Usa un carico più leggero, o mantieni il busto più orizzontale per ridurre l’ampiezza.',
      harder: 'Aumenta il carico, o mantieni una pausa di un secondo in alto.',
      readyWhen: 'Quando tre serie da dieci passano senza rotazione del busto, su entrambi i lati.',
    },
    precautions:
      'Mantieni la schiena piatta dall’inizio alla fine: se il busto deve incurvarsi per tirare su il carico, è troppo pesante.',
  },

  legPressMachine: {
    slug: 'leg-press',
    muscles: { primary: 'Quadricipiti, glutei', secondary: 'Femorali' },
    steps: [
      'Siediti sulla macchina, schiena e testa ben appoggiate allo schienale.',
      'Posiziona i piedi piatti sulla pedana, larghi quanto le anche.',
      'Sblocca i fermi di sicurezza e scendi piegando le ginocchia fino a un angolo vicino ai 90°.',
      'Spingi con i piedi fino all’estensione delle gambe, senza bloccare completamente le ginocchia.',
    ],
    mistakes: [
      'Bloccare completamente le ginocchia a fine spinta, spostando il carico sull’articolazione.',
      'La parte bassa della schiena si stacca dallo schienale in discesa.',
      'Scendere troppo in profondità, ginocchia che superano ampiamente il petto.',
    ],
    sensation:
      'Il lavoro si sente nella parte anteriore delle cosce e nei glutei, senza tensione nella parte bassa della schiena: lo schienale sostiene tutto il busto. Un fastidio lombare segnala un’ampiezza eccessiva per la mobilità dell’anca del momento.',
    rangeOfMotion:
      'Scendi fino a un angolo del ginocchio vicino ai 90°, o meno se la parte bassa della schiena si stacca prima: la macchina permette di fissare questo limite con precisione da una seduta all’altra.',
    tempo:
      'Due o tre secondi per scendere, uno per spingere. Inspira scendendo, espira spingendo.',
    anatomy:
      'Il quadricipite estende il ginocchio, il grande gluteo estende l’anca: gli stessi motori di uno squat, ma lo schienale della macchina elimina tutto il lavoro di core e stabilizzazione che lo squat richiede al busto.',
    mechanics:
      'Doppia estensione di anca e ginocchio nel piano sagittale, su una traiettoria guidata: a differenza dello squat, il busto resta fisso e si muove solo il carico.',
    benefits: [
      'Permette di caricare fortemente le gambe senza sollecitare core o equilibrio, utile come complemento o sostituto temporaneo dello squat.',
      'La traiettoria guidata riduce il rischio di errore tecnico rispetto a un movimento libero caricato.',
      'Facilita la regolazione fine del carico, gradino per gradino.',
    ],
    progression: {
      easier: 'Riduci il carico, o limita l’angolo di discesa a 70-80° di flessione.',
      harder: 'Aumenta il carico, o rallenta la discesa a quattro secondi.',
      readyWhen: 'Quando tre serie da dieci passano senza che la parte bassa della schiena si stacchi dallo schienale.',
    },
    precautions:
      'Non bloccare mai completamente le ginocchia a fine spinta, e non lasciare mai che la parte bassa della schiena si stacchi dallo schienale: sono i due punti di sicurezza di questa macchina.',
  },

  latPulldownMachine: {
    slug: 'lat-machine',
    muscles: { primary: 'Grande dorsale', secondary: 'Bicipiti, trapezio' },
    steps: [
      'Siediti di fronte alla macchina, cosce bloccate sotto i rulli se presenti.',
      'Afferra la barra più larga delle spalle, braccia tese.',
      'Tira la barra verso la parte alta del petto mantenendo il busto dritto, gomiti che scendono verso i fianchi.',
      'Risali con controllo fino all’estensione completa delle braccia.',
    ],
    mistakes: [
      'Inclinarsi molto all’indietro per aiutare a tirare giù la barra.',
      'Tirare la barra dietro la nuca invece che davanti al petto.',
      'Risalita troppo rapida, senza controllare il carico.',
    ],
    sensation:
      'Il lavoro si sente al centro e nella parte bassa della schiena, fino sotto l’ascella. Una tensione nella parte alta del trapezio o nel collo segnala che le spalle si alzano invece di restare basse.',
    rangeOfMotion:
      'Tira finché la barra tocca la parte alta del petto, gomiti che scendono lungo il corpo. Risali fino all’estensione completa delle braccia per usare tutta l’ampiezza.',
    tempo:
      'Uno o due secondi per tirare, due o tre per risalire controllando il carico. Espira tirando, inspira risalendo.',
    anatomy:
      'Il grande dorsale adduce ed estende la spalla, i romboidi e il trapezio medio avvicinano la scapola alla colonna, il bicipite assiste flettendo il gomito. È l’equivalente in trazione verticale della trazione alla sbarra, in versione guidata e caricabile progressivamente.',
    mechanics:
      'Adduzione ed estensione della spalla nel piano sagittale, associata a depressione e retrazione scapolare, su una traiettoria guidata dalla macchina.',
    benefits: [
      'Costruisce la forza di trazione verticale utile per progredire verso la trazione alla sbarra, un movimento che il corpo libero da solo rende difficile da raggiungere.',
      'Permette di dosare con precisione il carico, a differenza di una trazione a corpo libero dove si può regolare solo il peso totale.',
      'Rinforza la schiena come specchio dei movimenti di spinta già presenti nella maggior parte delle sedute.',
    ],
    progression: {
      easier: 'Riduci il carico, o usa una presa più stretta per accorciare il braccio di leva.',
      harder: 'Aumenta il carico, o mantieni una pausa di un secondo in basso.',
      readyWhen: 'Quando tre serie da dieci passano senza che il busto si inclini all’indietro.',
    },
    precautions:
      'Tira sempre la barra davanti al petto, mai dietro la nuca: questa variante datata mette la spalla in una posizione rischiosa per un guadagno minimo.',
  },

  hamstringStretch: {
    slug: 'allungamento-dei-femorali',
    muscles: { primary: 'Femorali' },
    steps: [
      'Appoggia un tallone su un rialzo stabile (uno scalino, una sedia bassa), gamba tesa.',
      'Mantieni l’altra gamba leggermente piegata, piede ben saldo a terra.',
      'Piega il busto in avanti dalle anche, schiena piatta, finché non senti tensione nella parte posteriore della coscia.',
      'Mantieni la posizione senza rimbalzi, respirando con calma.',
    ],
    mistakes: [
      'Incurvare la schiena per guadagnare più ampiezza invece di piegarsi dalle anche.',
      'Rimbalzare nell’allungamento invece di mantenere una posizione stabile.',
      'Bloccare completamente il ginocchio della gamba tesa.',
    ],
    sensation:
      'La tensione deve sentirsi lungo tutta la parte posteriore della coscia, mai al ginocchio né nella parte bassa della schiena. Un dolore acuto invece di tensione segnala di fermarsi e ridurre l’ampiezza.',
    rangeOfMotion:
      'Piegati finché senti una tensione netta ma tollerabile, mai dolorosa. L’ampiezza confortevole aumenta naturalmente da una seduta all’altra.',
    tempo:
      'Nessun ritmo di esecuzione: la posizione si mantiene immobile. Respira lentamente e profondamente per tutta la durata del mantenimento.',
    anatomy:
      'I femorali, che flettono il ginocchio ed estendono l’anca, vengono messi in tensione passiva dalla flessione dell’anca combinata con l’estensione del ginocchio. Qui non si cerca alcuna contrazione muscolare attiva, solo un rilascio progressivo sotto tensione.',
    mechanics:
      'Messa in tensione passiva dei femorali tramite flessione dell’anca ed estensione del ginocchio simultanee, nel piano sagittale, senza carico né movimento ripetuto.',
    benefits: [
      'Mantiene la flessibilità della parte posteriore della coscia, spesso accorciata dalla posizione seduta prolungata.',
      'Facilita l’ampiezza dei movimenti di flessione dell’anca (affondi, squat profondi) eseguiti in altre parti della seduta.',
      'Si pratica ovunque con un semplice scalino o bordo come appoggio.',
    ],
    precautions:
      'Non forzare mai oltre una tensione tollerabile, ed evita questo allungamento a freddo prima di uno sforzo intenso: trova posto meglio a fine seduta o lontano dallo sforzo.',
  },

  chestDoorwayStretch: {
    slug: 'allungamento-del-petto-sullo-stipite',
    muscles: { primary: 'Pettorali', secondary: 'Deltoide anteriore' },
    steps: [
      'Posizionati sullo stipite di una porta, avambraccio contro lo stipite, gomito all’altezza della spalla.',
      'Piedi leggermente sfalsati, uno davanti all’altro per stabilità.',
      'Avanza dolcemente il busto attraverso lo stipite finché non senti tensione nella parte anteriore della spalla e sul pettorale.',
      'Mantieni la posizione senza rimbalzi, respirando con calma.',
    ],
    mistakes: [
      'Gomito posizionato troppo in alto o troppo in basso, il che sposta la tensione verso la spalla invece che il pettorale.',
      'Avanzare in modo troppo brusco invece di procedere gradualmente.',
      'Inarcare eccessivamente la parte bassa della schiena per guadagnare più ampiezza.',
    ],
    sensation:
      'La tensione deve sentirsi nella parte anteriore della spalla e sul pettorale del braccio coinvolto, mai nell’articolazione stessa. Un dolore nella parte anteriore della spalla segnala di arretrare leggermente.',
    rangeOfMotion:
      'Avanza finché senti una tensione netta ma tollerabile. L’altezza del gomito cambia la zona allungata: più in basso, l’allungamento scende verso la parte inferiore del pettorale; più in alto, sale verso la parte superiore del pettorale e la spalla.',
    tempo:
      'Nessun ritmo di esecuzione: la posizione si mantiene immobile. Respira lentamente: espirare aiuta spesso a rilasciare un po’ più la tensione.',
    anatomy:
      'Il grande pettorale, che adduce e flette la spalla in avanti, viene messo in tensione passiva dalla posizione di apertura imposta dallo stipite. Il deltoide anteriore, spesso accorciato dagli stessi gesti ripetitivi, viene allungato nella stessa posizione.',
    mechanics:
      'Messa in tensione passiva del pettorale tramite un’estensione orizzontale della spalla fissata dal punto d’appoggio sullo stipite, senza carico né movimento ripetuto.',
    benefits: [
      'Compensa l’accorciamento del pettorale causato da posizioni prolungate di chiusura in avanti (schermi, guida, spinta ripetuta).',
      'Facilita l’ampiezza dei movimenti di spinta e apertura del busto eseguiti in altre parti della seduta.',
      'Non richiede alcuna attrezzatura, solo lo stipite di una porta.',
    ],
    precautions:
      'Non forzare mai oltre una tensione tollerabile, soprattutto in caso di fastidio già noto alla spalla: arretra prima la posizione del braccio prima di rinunciare all’allungamento.',
  },

  squat: {
    slug: 'squat',
    muscles: { primary: 'Quadricipiti, glutei', secondary: 'Femorali, core' },
    steps: [
      'In piedi, piedi alla larghezza dei fianchi, punte leggermente aperte.',
      'Spingi i fianchi indietro e piega le ginocchia, che restano in linea con i piedi.',
      'Scendi finché le cosce sono vicine all’orizzontale, con il peso distribuito su tutto il piede.',
      'Mantieni il busto dritto e lo sguardo avanti, senza incurvare la zona lombare.',
      'Risali spingendo sui talloni fino alla completa estensione delle anche.',
    ],
    mistakes: [
      'Ginocchia che cedono verso l’interno durante la risalita.',
      'Talloni che si sollevano: segno di poca mobilità di caviglia, non di forza mancante.',
      'Zona lombare che si incurva in basso, quando la profondità supera la mobilità dell’anca.',
    ],
    sensation:
      'Il lavoro si sente nella parte anteriore delle cosce e nei glutei, con un appoggio pieno su tutto il piede. Una tensione isolata davanti al ginocchio indica che le anche non arretrano abbastanza e che il movimento parte solo dal ginocchio.',
    rangeOfMotion:
      'Scendi quanto la mobilità consente senza che la zona lombare si incurvi: il riferimento è la schiena, non un angolo teorico. Cosce vicine all’orizzontale bastano a caricare tutta la catena.',
    tempo:
      'Due o tre secondi per scendere, uno o due per risalire. Inspira scendendo, espira spingendo sui talloni.',
    anatomy:
      'Il quadricipite estende il ginocchio e il grande gluteo estende l’anca: i due motori lavorano insieme. Femorali e adduttori stabilizzano, il medio gluteo impedisce al ginocchio di cedere, ed erettori spinali e parete addominale mantengono il busto compatto.',
    mechanics:
      'Doppia flessione poi doppia estensione di anca e ginocchio nel piano sagittale, in catena chiusa. La discesa è eccentrica, la risalita concentrica. Senza sedia né riferimento esterno, sono la mobilità di caviglia e anca a fissare la profondità raggiungibile.',
    benefits: [
      'Il movimento base di tutta la catena inferiore: è la versione libera che lo squat sulla sedia prepara.',
      'Non richiede attrezzi né appoggi, quindi si pratica ovunque una volta padroneggiata la profondità.',
      'Fa da base a tutte le varianti caricate — goblet squat, leg press — che cambiano il carico, non il gesto.',
    ],
    progression: {
      easier: 'Torna allo squat sulla sedia, che dà un riferimento di profondità costante.',
      harder: 'Rallenta la discesa a cinque secondi, fai una pausa in basso, o passa al goblet squat con carico.',
      readyWhen: 'Quando tre serie da quindici passano senza che le ginocchia cedano né i talloni si sollevino, aggiungi carico.',
    },
    precautions:
      'Se il ginocchio fa male, riduci la profondità prima del numero di ripetizioni: un’escursione parziale indolore vale più di una completa che fa male.',
  },

  pushup: {
    slug: 'piegamenti',
    muscles: { primary: 'Pettorali, tricipiti', secondary: 'Spalle, core' },
    steps: [
      'In appoggio su mani e punte dei piedi, mani poco più larghe delle spalle e sotto la loro linea.',
      'Contrai glutei e addome per allineare il corpo dai talloni alla testa.',
      'Scendi con i gomiti a circa 45° dal busto, fino a sfiorare il pavimento con il petto.',
      'Risali spingendo fino alla completa estensione delle braccia, senza inarcare la schiena.',
    ],
    mistakes: [
      'Bacino che cede: il core molla prima delle braccia, e la zona lombare ne paga il prezzo.',
      'Gomiti aperti a 90° sui lati, il che mette la spalla in posizione sfavorevole.',
      'Escursione ridotta per mancanza di forza, quando una variante più facile a escursione completa fa progredire meglio.',
    ],
    sensation:
      'Il lavoro si sente nel petto, nella parte posteriore del braccio e nel core, che tiene la linea del corpo dall’inizio alla fine. Una tensione lombare indica che il bacino è ceduto.',
    rangeOfMotion:
      'Scendi fino a sfiorare il pavimento con il petto, poi risali a braccia tese senza bloccare di scatto i gomiti. L’escursione completa è ciò che distingue un piegamento da un movimento parziale.',
    tempo:
      'Due secondi per scendere, uno per risalire. Inspira scendendo, espira spingendo.',
    anatomy:
      'Il grande pettorale e il tricipite brachiale sono i motori, con il deltoide anteriore che assiste. Il dentato anteriore mantiene la scapola aderente alla gabbia toracica; addominali e glutei impediscono al bacino di cedere, il che rende il piegamento tanto un esercizio di core quanto di spinta.',
    mechanics:
      'Flessione ed estensione del gomito combinate con adduzione orizzontale della spalla, in catena chiusa, con il corpo che si muove attorno a un appoggio fisso. È l’ultimo gradino della scala che piegamenti al muro, inclinati e sulle ginocchia preparano: la leva si allunga a ogni passo, quindi il carico relativo sale senza che il gesto cambi.',
    benefits: [
      'Il movimento di spinta di riferimento, senza attrezzi né appoggi: è l’obiettivo verso cui portano tutte le varianti assistite.',
      'Rinforza insieme la spinta e il core, cosa che nessuna macchina per le distensioni fa.',
      'Si dosa con precisione cambiando l’altezza dell’appoggio, senza aggiungere carico.',
    ],
    progression: {
      easier: 'Torna ai piegamenti sulle ginocchia o inclinati: la linea del corpo resta la stessa, si accorcia solo la leva.',
      harder: 'Rialza i piedi, rallenta la discesa a quattro secondi, o fai una pausa in basso.',
      readyWhen: 'Quando tre serie da dodici passano con il corpo allineato dall’inizio alla fine, rialza i piedi.',
    },
    precautions:
      'Un polso dolorante si allevia spesso appoggiandosi sui pugni chiusi o su maniglie, il che mantiene il polso in linea con l’avambraccio.',
  },

  pikePushup: {
    slug: 'piegamenti-a-v',
    muscles: { primary: 'Spalle', secondary: 'Tricipiti, core' },
    steps: [
      'Parti in posizione di piegamento, poi avvicina i piedi spingendo il bacino in alto, corpo a V rovesciata.',
      'Mani poco più larghe delle spalle, testa rilassata tra le braccia.',
      'Piega i gomiti per abbassare la sommità del capo verso il pavimento, tra le mani.',
      'Risali spingendo fino a braccia tese, con il bacino ancora alto.',
    ],
    mistakes: [
      'Bacino che scende durante la serie: il movimento torna a essere un piegamento normale e lascia le spalle.',
      'Gomiti molto aperti invece di restare nella linea del movimento.',
      'Scendere fino alla fronte invece che alla sommità del capo, il che accorcia l’escursione.',
    ],
    sensation:
      'Il lavoro si sente chiaramente nelle spalle e nella parte posteriore delle braccia, non nel petto. Se domina il petto, il bacino non è abbastanza alto.',
    rangeOfMotion:
      'Scendi fino a sfiorare il pavimento con la sommità del capo. Più i piedi sono vicini alle mani, più peso passa dalle spalle: è questa la regolazione della difficoltà.',
    tempo:
      'Due secondi per scendere, uno per risalire. Espira spingendo.',
    anatomy:
      'Il deltoide anteriore e il tricipite sono i motori, mentre il trapezio superiore e il dentato anteriore stabilizzano la scapola mentre il braccio passa sopra la testa. Il core mantiene la posizione a V, che è ciò che indirizza il carico alla spalla anziché al petto.',
    mechanics:
      'Spinta verticale in catena chiusa: l’equivalente a corpo libero della distensione sopra la testa, dove l’inclinazione del busto sostituisce la scelta del carico. Flessione-estensione del gomito combinata con flessione di spalla sopra la testa.',
    benefits: [
      'L’unico esercizio per le spalle a corpo libero di questa libreria: senza di esso, filtrare per «corpo libero» non offriva alcun lavoro di spalla.',
      'Prepara la spinta sopra la testa senza bisogno di manubri.',
      'Si regola con precisione avvicinando o allontanando i piedi, senza attrezzi.',
    ],
    progression: {
      easier: 'Appoggia le mani su una superficie rialzata: meno peso passa dalle spalle.',
      harder: 'Avvicina i piedi alle mani, o rialza i piedi per verticalizzare di più il busto.',
      readyWhen: 'Quando tre serie da dodici passano con il bacino alto per tutta la durata, rialza i piedi.',
    },
    precautions:
      'Questo movimento porta le braccia sopra la testa: se la spalla fa male in quella posizione, mantieni la spinta su un’escursione più corta invece di forzare la posizione a V.',
  },

  mountainClimber: {
    slug: 'mountain-climber',
    muscles: { primary: 'Cardio, core', secondary: 'Spalle, flessori dell’anca' },
    steps: [
      'Mettiti in posizione di piegamento a braccia tese, mani sotto le spalle, corpo allineato.',
      'Porta un ginocchio verso il petto senza che i fianchi salgano né cedano.',
      'Riappoggia il piede e passa subito all’altra gamba.',
      'Mantieni un ritmo costante per tutta la durata, respirando senza interruzioni.',
    ],
    mistakes: [
      'Fianchi che salgono a ogni cambio di gamba: il core ha ceduto e l’esercizio diventa un rimbalzo.',
      'Mani troppo avanti rispetto alle spalle, il che carica inutilmente polso e spalla.',
      'Ritmo troppo veloce a scapito dell’escursione del ginocchio.',
    ],
    sensation:
      'Il respiro sale in fretta, e il core lavora di continuo per impedire al bacino di muoversi. Le spalle reggono il peso della parte superiore del corpo per tutta la serie.',
    rangeOfMotion:
      'Porta il ginocchio fin dove il bacino riesce a restare fermo: è il bacino a fissare l’escursione, non la voglia di arrivare più lontano.',
    tempo:
      'Un ritmo costante e sostenibile per tutta la durata, meglio di una partenza rapida seguita da un crollo. Respira senza interruzioni: bloccare il respiro è il primo segnale di un ritmo eccessivo.',
    anatomy:
      'I flessori dell’anca portano il ginocchio verso il petto, mentre gli addominali e il grande gluteo del lato in appoggio impediscono al bacino di ruotare. Spalle e tricipiti lavorano in isometria per tenere il plank alto.',
    mechanics:
      'Flessione ed estensione alternate dell’anca in catena aperta, su una base di plank alto, quindi con appoggio chiuso sulle mani. È un esercizio cardio il cui vincolo principale resta la stabilità del tronco: il ritmo alza le pulsazioni, il core decide la qualità.',
    benefits: [
      'Alza le pulsazioni senza spostarsi e senza attrezzi, in pochissimo spazio.',
      'Unisce lavoro cardio e core dinamico, cosa che né la camminata né il plank fanno da soli.',
      'Si regola sul ritmo anziché sul carico, quindi si adatta a ogni livello senza cambiare nulla.',
    ],
    progression: {
      easier: 'Rallenta nettamente, o appoggia le mani su una superficie rialzata per alleggerire le spalle.',
      harder: 'Aumenta il ritmo o allunga la durata, purché il bacino resti fermo.',
      readyWhen: 'Quando tre round da quaranta secondi passano senza che i fianchi salgano, allunga la durata.',
    },
    precautions:
      'Polsi o spalle sensibili: rialza le mani su una panca o uno scalino, il che riduce molto il carico sull’appoggio senza cambiare il lavoro delle gambe.',
  },

  legSwing: {
    slug: 'slanci-della-gamba',
    muscles: { primary: 'Anche, mobilità', secondary: 'Glutei, femorali' },
    steps: [
      'Mettiti di lato rispetto a un muro o allo schienale di una sedia, con una mano in appoggio.',
      'Sposta il peso sulla gamba interna, lasciando l’altra libera di oscillare.',
      'Fai oscillare la gamba libera avanti e indietro, senza forzare a fine escursione.',
      'Aumenta gradualmente l’ampiezza nel corso delle ripetizioni, con il bacino fermo.',
      'Cambia lato a metà del tempo previsto.',
    ],
    mistakes: [
      'Bacino che si inclina per guadagnare ampiezza, invece di lasciar lavorare la sola anca.',
      'Ampiezza massima fin dal primo slancio, quando deve aprirsi gradualmente.',
      'Zona lombare che si inarca quando la gamba va indietro.',
    ],
    sensation:
      'Un’anca che si scioglie, senza sforzo muscolare marcato. È una messa in movimento, non un rinforzo: se tira forte, l’ampiezza è già eccessiva per l’inizio di una seduta.',
    rangeOfMotion:
      'Arriva fin dove il bacino riesce a restare fermo. L’ampiezza del giorno deve crescere durante la serie stessa, esattamente come nel gatto-mucca.',
    tempo:
      'Un’oscillazione regolare e controllata, mai lanciata. Il movimento resta guidato, non affidato allo slancio.',
    anatomy:
      'I flessori dell’anca e il grande gluteo alternano contrazione e allungamento dinamici, mentre la gamba d’appoggio e il core stabilizzano il bacino. Il lavoro riguarda la mobilità articolare dell’anca, non la forza.',
    mechanics:
      'Flessione ed estensione alternate dell’anca in catena aperta, nel piano sagittale e senza carico. Il movimento balistico controllato prepara l’ampiezza che affondi e squat useranno poi sotto carico.',
    benefits: [
      'Prepara l’anca prima di ogni lavoro di gambe, cosa che nessun altro riscaldamento di questa libreria faceva: erano tutti per la parte alta.',
      'Si fa ovunque con un semplice appoggio, in trenta secondi per lato.',
      'Apre l’ampiezza d’anca utile agli affondi, agli squat e alle salite che seguono.',
    ],
    precautions:
      'Nessuno strattone a fine escursione: è un’oscillazione guidata, non un lancio. Se l’anca si blocca, riduci l’ampiezza invece di insistere.',
  },

  torsoTwist: {
    slug: 'rotazioni-del-busto',
    muscles: { primary: 'Obliqui, mobilità del tronco', secondary: 'Colonna vertebrale' },
    steps: [
      'In piedi, piedi alla larghezza delle spalle e ben saldi a terra.',
      'Fletti leggermente le ginocchia e lascia le braccia rilassate lungo i fianchi.',
      'Ruota il busto da un lato, lasciando che le braccia seguano il movimento senza lanciarle.',
      'Prosegui dall’altro lato a ritmo costante, con il bacino rivolto in avanti.',
    ],
    mistakes: [
      'Bacino che ruota con il busto: la rotazione non avviene più nel tronco ma nelle anche.',
      'Braccia lanciate che trascinano il busto invece di seguirlo.',
      'Ritmo troppo veloce, che trasforma una mobilizzazione in uno scossone.',
    ],
    sensation:
      'Una rotazione che si libera progressivamente lungo il tronco, senza sforzo muscolare marcato e senza strattoni nella zona lombare.',
    rangeOfMotion:
      'Ruota fino al limite del comfort, senza forzare. Come per ogni mobilità, l’ampiezza si apre nel corso delle ripetizioni.',
    tempo:
      'Regolare e moderato, circa una rotazione al secondo. Respira liberamente, senza bloccare il fiato a fine rotazione.',
    anatomy:
      'Gli obliqui esterni e interni producono la rotazione del tronco, mentre i muscoli profondi intersegmentari mobilizzano ogni livello vertebrale. Glutei e gambe stabilizzano il bacino, ed è proprio questo a costringere la rotazione a partire dal tronco.',
    mechanics:
      'Rotazione alternata del rachide nel piano trasversale, con carico leggero (il solo peso del busto). Il bacino fermo è il riferimento: è ciò che distingue una vera rotazione del tronco da una semplice torsione delle anche.',
    benefits: [
      'L’unico riscaldamento del tronco di questa libreria, complementare al gatto-mucca che lavora flessione ed estensione ma non la rotazione.',
      'Prepara gli esercizi di core antirotazione come il dead bug e la quadrupedia con estensione.',
      'Si fa in piedi, senza attrezzi né tappetino.',
    ],
    precautions:
      'La zona lombare non deve mai essere il motore della rotazione: se compare un fastidio lì, riduci l’ampiezza e verifica che il bacino resti rivolto in avanti.',
  },

  quadStretch: {
    slug: 'allungamento-quadricipiti-in-piedi',
    muscles: { primary: 'Quadricipiti' },
    steps: [
      'In piedi, appoggia una mano al muro per l’equilibrio.',
      'Afferra la caviglia dallo stesso lato della gamba da allungare e porta il tallone verso il gluteo.',
      'Tieni le due ginocchia affiancate e il bacino leggermente retroverso.',
      'Mantieni la posizione senza strattoni, respirando con calma, poi cambia lato.',
    ],
    mistakes: [
      'Il ginocchio allungato che va in avanti o di lato, il che sposta la tensione fuori dal quadricipite.',
      'Inarcare la zona lombare per guadagnare ampiezza.',
      'Tirare la caviglia a scatti invece di tenere una posizione stabile.',
    ],
    sensation:
      'La tensione si sente su tutta la faccia anteriore della coscia, mai nel ginocchio stesso. Un dolore davanti al ginocchio indica di rilasciare subito.',
    rangeOfMotion:
      'Porta il tallone fino a una tensione netta ma tollerabile. Avvicinare il ginocchio all’altro e portare leggermente il bacino avanti aumenta l’allungamento senza caricare l’articolazione.',
    tempo:
      'Nessun ritmo: la posizione si mantiene immobile. Respira lentamente per tutta la durata.',
    anatomy:
      'Il quadricipite, che estende il ginocchio, viene messo in tensione passiva dalla flessione del ginocchio; il retto femorale, l’unico capo che incrocia anche l’anca, lo è ancora di più quando l’anca è estesa — da qui l’utilità di non lasciare che il ginocchio vada in avanti.',
    mechanics:
      'Messa in tensione passiva mediante flessione del ginocchio ed estensione dell’anca simultanee, nel piano sagittale, senza carico né movimento ripetuto.',
    benefits: [
      'Completa l’allungamento dei femorali coprendo entrambe le facce della coscia.',
      'Mantiene l’ampiezza di flessione del ginocchio, spesso ridotta dalla posizione seduta prolungata.',
      'Richiede solo un appoggio per l’equilibrio.',
    ],
    precautions:
      'Se non riesci ad afferrare la caviglia, passa una fascia o un asciugamano attorno al piede invece di inclinare il busto indietro per arrivarci.',
  },

  gluteStretch: {
    slug: 'allungamento-gluteo-figura-4',
    muscles: { primary: 'Glutei', secondary: 'Rotatori dell’anca' },
    steps: [
      'Sdraiati sulla schiena, ginocchia piegate e piedi a terra.',
      'Appoggia la caviglia di un lato sul ginocchio opposto, formando un 4.',
      'Passa le mani dietro la coscia d’appoggio e tirala delicatamente verso di te.',
      'Tieni testa e spalle a terra, poi cambia lato.',
    ],
    mistakes: [
      'Testa e spalle sollevate da terra, il che contrae il collo senza aggiungere nulla all’allungamento.',
      'Tirare a scatti invece di installare una trazione costante.',
      'Spingere il ginocchio incrociato verso l’interno, il che chiude l’anca invece di aprirla.',
    ],
    sensation:
      'La tensione si sente in profondità nel gluteo del lato incrociato, a volte fino all’esterno dell’anca. Nulla deve tirare nel ginocchio incrociato.',
    rangeOfMotion:
      'Tira la coscia d’appoggio fino a una tensione netta ma tollerabile. Più la coscia si avvicina al petto, più l’allungamento è marcato.',
    tempo:
      'Nessun ritmo: la posizione si mantiene immobile, con respirazione lenta. L’espirazione aiuta spesso a rilasciare un po’ di più.',
    anatomy:
      'Il grande gluteo e i rotatori esterni profondi dell’anca, tra cui il piriforme, vengono messi in tensione passiva dalla combinazione di flessione e rotazione esterna d’anca che la posizione a 4 produce.',
    mechanics:
      'Messa in tensione passiva mediante flessione d’anca associata a rotazione esterna, in scarico completo: la schiena resta a terra, il che evita ogni compressione della colonna durante l’allungamento.',
    benefits: [
      'Raggiunge una zona che gli allungamenti della coscia non toccano e che si irrigidisce con la posizione seduta prolungata.',
      'Si pratica a terra, senza equilibrio da mantenere, quindi resta accessibile anche con l’anca rigida.',
      'Completa il lavoro dei glutei (ponte, abduzione) con la mobilità corrispondente.',
    ],
    precautions:
      'Se l’anca incrociata si blocca o pizzica, riduci la trazione: una posizione meno profonda e indolore vale più di una forzata.',
  },

  calfStretch: {
    slug: 'allungamento-polpacci-al-muro',
    muscles: { primary: 'Polpacci' },
    steps: [
      'Appoggia le mani piatte al muro, all’altezza del petto.',
      'Porta una gamba indietro, tesa, con il tallone a terra e il piede dritto.',
      'Fletti la gamba davanti e porta il bacino in avanti fino a sentire l’allungamento nel polpaccio dietro.',
      'Mantieni la posizione senza strattoni, poi cambia gamba.',
    ],
    mistakes: [
      'Il tallone dietro che si solleva: l’allungamento sparisce all’istante.',
      'Piede dietro ruotato verso l’esterno, il che sposta il carico sulla caviglia.',
      'Bacino che arretra invece di avanzare, il che annulla la messa in tensione.',
    ],
    sensation:
      'La tensione si sente nella parte posteriore della gamba dietro, dal cavo popliteo al tallone. Piegare leggermente il ginocchio dietro sposta la tensione più in basso nel polpaccio.',
    rangeOfMotion:
      'Porta il bacino avanti fino a una tensione netta ma tollerabile, con il tallone sempre a terra: è il tallone a fissare il limite, non la distanza tra i piedi.',
    tempo:
      'Nessun ritmo: posizione immobile, respirazione lenta e regolare.',
    anatomy:
      'Il tricipite surale — gastrocnemi e soleo — viene messo in tensione dalla flessione dorsale della caviglia. Con il ginocchio dietro teso la tensione ricade soprattutto sui gastrocnemi, che incrociano anche il ginocchio; con il ginocchio leggermente piegato si sposta sul soleo.',
    mechanics:
      'Messa in tensione passiva mediante flessione dorsale della caviglia contro un appoggio fisso, senza carico né movimento ripetuto.',
    benefits: [
      'Mantiene la flessione dorsale della caviglia, la cui mancanza è la prima causa dei talloni che si sollevano nello squat.',
      'Toglie i polpacci dal loro isolamento: erano l’unico gruppo con un solo esercizio nella libreria.',
      'Non richiede altro che un muro.',
    ],
    precautions:
      'Una tensione acuta e localizzata al tendine d’Achille non è l’allungamento cercato: arretra il bacino e riduci l’ampiezza.',
  },

  childPose: {
    slug: 'posizione-del-bambino',
    muscles: { primary: 'Schiena, mobilità', secondary: 'Anche, spalle' },
    steps: [
      'Mettiti a quattro zampe, ginocchia alla larghezza dei fianchi.',
      'Siediti progressivamente sui talloni lasciando le mani dove sono.',
      'Allunga le braccia lontano in avanti e lascia scendere la fronte verso il pavimento.',
      'Respira lentamente lasciando che la schiena si arrotondi un po’ di più a ogni espirazione.',
    ],
    mistakes: [
      'Spalle contratte verso le orecchie invece di lasciare che il busto si rilasci.',
      'Forzare i glutei verso i talloni quando la mobilità di caviglia o ginocchio non lo consente.',
      'Respirazione bloccata, quando è proprio essa ad aprire progressivamente la posizione.',
    ],
    sensation:
      'Un allungamento diffuso lungo la schiena e nella parte posteriore delle spalle, con una sensazione di rilascio più che di trazione. Nulla deve tirare nelle ginocchia.',
    rangeOfMotion:
      'Scendi fin dove il comfort lo consente; la distanza tra le ginocchia regola lo spazio lasciato al busto. La posizione si apre da sola nel corso dei respiri.',
    tempo:
      'Nessun ritmo di esecuzione: la posizione si mantiene. Sono le espirazioni a far crescere l’ampiezza, non la forza.',
    anatomy:
      'Non è un rinforzo: gli erettori spinali e il gran dorsale vengono allungati passivamente mentre le anche vanno in flessione completa. È il corrispettivo statico del gatto-mucca, che mobilizza la stessa zona in dinamica.',
    mechanics:
      'Flessione globale del rachide e delle anche in scarico, con il peso del corpo che poggia sulle cosce e sulle braccia anziché sulla colonna.',
    benefits: [
      'L’unico allungamento della schiena di questa libreria, complemento statico del gatto-mucca.',
      'Fa da transizione a fine seduta, o da recupero tra due serie impegnative per la schiena.',
      'Non richiede attrezzatura, solo un pavimento comodo.',
    ],
    precautions:
      'Un ginocchio dolorante in questa posizione si allevia infilando un cuscino tra i glutei e i talloni, invece di rinunciare alla postura.',
  },

  tricepsStretch: {
    slug: 'allungamento-tricipiti-sopra-la-testa',
    muscles: { primary: 'Tricipiti', secondary: 'Spalle' },
    steps: [
      'In piedi o seduto, alza un braccio e piega il gomito per posare la mano tra le scapole.',
      'Il gomito punta al soffitto, il più vicino possibile alla testa.',
      'Afferra quel gomito con l’altra mano e spingilo delicatamente indietro.',
      'Mantieni senza strattoni, poi cambia braccio.',
    ],
    mistakes: [
      'Inarcare la zona lombare per dare l’illusione di un gomito più arretrato.',
      'Spingere il gomito a scatti invece di applicare una pressione costante.',
      'Lasciare che il braccio spinga la testa in avanti, il che contrae il collo.',
    ],
    sensation:
      'La tensione si sente nella parte posteriore del braccio, dal gomito verso la spalla. Un fastidio nell’articolazione della spalla stessa indica di ridurre la spinta.',
    rangeOfMotion:
      'Spingi il gomito fino a una tensione netta ma tollerabile. A limitare è l’ampiezza della spalla sopra la testa, non la forza della mano che spinge.',
    tempo:
      'Nessun ritmo: posizione immobile, respirazione lenta.',
    anatomy:
      'Il tricipite brachiale, unico estensore del gomito, viene messo in tensione dalla flessione completa del gomito; il suo capo lungo, che incrocia anche la spalla, lo è di più con il braccio sopra la testa — il che spiega il gomito rivolto al soffitto.',
    mechanics:
      'Messa in tensione passiva mediante flessione del gomito e flessione di spalla sopra la testa, senza carico né movimento ripetuto.',
    benefits: [
      'Completa il lavoro di spinta (piegamenti, dip, distensioni) allungando il muscolo che vi lavora di più.',
      'Si pratica in piedi come da seduti, senza attrezzi e senza spazio.',
      'Mantiene l’ampiezza della spalla sopra la testa, utile ai piegamenti a V e alle distensioni.',
    ],
    precautions:
      'Se alzare il braccio sopra la testa fa male, tieni il gomito più basso e spingi meno: questa posizione non vale la pena di essere forzata.',
  },

  bandChestPress: {
    slug: 'spinte-per-il-petto-con-elastico',
    muscles: { primary: 'Pettorali, tricipiti', secondary: 'Spalle' },
    steps: [
      'Fai passare l’elastico dietro la schiena, all’altezza delle scapole, e tieni un’estremità per mano.',
      'Mani all’altezza del petto, gomiti piegati e vicini al busto, un piede leggermente avanti per la stabilità.',
      'Spingi le mani in avanti fino alla completa estensione delle braccia.',
      'Torna lentamente controllando la tensione finché le mani non tornano al petto.',
    ],
    mistakes: [
      'Busto che va in avanti per aiutare la spinta: si muove il corpo invece delle braccia.',
      'Gomiti che salgono all’altezza delle spalle, il che mette la spalla in posizione sfavorevole.',
      'Ritorno lasciato andare di colpo invece che frenato.',
    ],
    sensation:
      'Il lavoro si sente nel petto e nella parte posteriore delle braccia, con una resistenza che cresce man mano che le braccia si estendono. Una tensione lombare segnala che il busto sta compensando.',
    rangeOfMotion:
      'Spingi fino a braccia tese senza bloccare i gomiti, e lascia tornare le mani al petto. L’escursione è quella di qualsiasi distensione; cambia solo il profilo di resistenza.',
    tempo:
      'Uno o due secondi per spingere, due o tre per tornare frenando. Espira spingendo.',
    anatomy:
      'Il grande pettorale e il tricipite sono i motori, il deltoide anteriore assiste e il dentato anteriore mantiene la scapola aderente. Il core e la gamba avanzata resistono al richiamo dell’elastico, che tira il busto all’indietro.',
    mechanics:
      'Adduzione orizzontale della spalla con estensione del gomito contro una resistenza crescente: l’elastico è più teso a braccia distese, proprio dove il corpo libero o un manubrio sarebbero più facili. È l’esatto contrario del profilo di un piegamento.',
    benefits: [
      'Porta una spinta orizzontale senza spazio a terra né attrezzi pesanti, utile quando i piegamenti non sono praticabili.',
      'La resistenza crescente carica la fine del movimento, dove un piegamento diventa facile.',
      'Un elastico si porta ovunque, a differenza di un paio di manubri.',
    ],
    progression: {
      easier: 'Usa un elastico meno teso, o allarga la presa sulla banda.',
      harder: 'Usa un elastico più teso, porta più avanti il piede d’appoggio, o rallenta il ritorno a quattro secondi.',
      readyWhen: 'Quando tre serie da quindici passano senza che il busto avanzi, aumenta la resistenza.',
    },
    precautions:
      'Controlla lo stato dell’elastico prima di ogni serie: una banda usurata può cedere di colpo, ed è tesa all’altezza del viso.',
  },

  bandLateralRaise: {
    slug: 'alzate-laterali-con-elastico',
    muscles: { primary: 'Spalle' },
    steps: [
      'In piedi al centro dell’elastico, con uno o entrambi i piedi sopra, un’estremità per mano.',
      'Braccia lungo i fianchi, gomiti appena piegati, palmi verso l’interno.',
      'Alza le braccia lateralmente fino all’altezza delle spalle, non oltre.',
      'Scendi lentamente controllando il richiamo dell’elastico.',
    ],
    mistakes: [
      'Salire sopra la spalla, il che passa il testimone al trapezio superiore.',
      'Slancio del busto per lanciare le braccia.',
      'Spalle che salgono verso le orecchie durante la salita.',
    ],
    sensation:
      'Il lavoro si sente sul lato della spalla. Una tensione nel trapezio superiore o nel collo segnala che le spalle salgono invece di restare basse.',
    rangeOfMotion:
      'Sali finché le braccia sono orizzontali, non oltre: è lì che il deltoide medio finisce il suo lavoro e altri muscoli subentrerebbero.',
    tempo:
      'Uno o due secondi per salire, due o tre per scendere. Espira salendo.',
    anatomy:
      'Il deltoide medio è il motore principale dell’abduzione del braccio; il sovraspinato avvia i primi gradi. Il trapezio inferiore e medio devono tenere bassa la scapola, ed è per questo che lasciar salire le spalle sposta il lavoro.',
    mechanics:
      'Abduzione della spalla nel piano frontale contro una resistenza che cresce con l’elevazione: l’elastico si tende proprio quando il braccio di leva è più lungo, il che rende la fine del movimento nettamente più dura che con un manubrio.',
    benefits: [
      'L’unico lavoro di isolamento della spalla accessibile senza manubri nella libreria.',
      'Completa i movimenti di spinta, che caricano soprattutto la parte anteriore della spalla.',
      'Si dosa con precisione cambiando la lunghezza di elastico impugnata, senza cambiare attrezzo.',
    ],
    progression: {
      easier: 'Impugna l’elastico più in alto lungo la sua lunghezza, o appoggia un solo piede.',
      harder: 'Accorcia la lunghezza impugnata, appoggia entrambi i piedi, o mantieni una pausa di un secondo in alto.',
      readyWhen: 'Quando tre serie da quindici passano senza che le spalle salgano, accorcia l’elastico.',
    },
    precautions:
      'Questo movimento è per definizione senza carichi pesanti: se la spalla pizzica in alto, riduci l’escursione invece di insistere — un pizzicamento non si allena.',
  },

  bandLateralWalk: {
    slug: 'camminata-laterale-con-elastico',
    muscles: { primary: 'Medio gluteo', secondary: 'Quadricipiti, grande gluteo' },
    steps: [
      'Posiziona l’elastico appena sopra le ginocchia, piedi alla larghezza dei fianchi.',
      'Fletti leggermente ginocchia e anche in mezzo squat, busto dritto.',
      'Fai un passo laterale spingendo attivamente il ginocchio verso l’esterno contro l’elastico.',
      'Avvicina l’altro piede senza lasciare che l’elastico si allenti, e prosegui nella stessa direzione prima di tornare.',
    ],
    mistakes: [
      'Ginocchia che cedono quando il piede si appoggia: l’elastico prende il sopravvento e il medio gluteo molla.',
      'Busto che si raddrizza del tutto, il che alleggerisce il lavoro dei glutei.',
      'Passi troppo lunghi, che fanno perdere il controllo dell’allineamento.',
    ],
    sensation:
      'Il lavoro si sente sul lato dell’anca e del gluteo, con un bruciore che sale progressivamente. Nulla deve tirare nel ginocchio.',
    rangeOfMotion:
      'Fai passi larghi all’incirca quanto le spalle, mantenendo costante la tensione dell’elastico per tutta la serie: è la tensione continua a fare il lavoro, non la lunghezza del passo.',
    tempo:
      'Regolare e controllato, ogni passo appoggiato senza rimbalzo. Respira normalmente: è un esercizio a tensione continua, non uno sprint.',
    anatomy:
      'Il medio e il piccolo gluteo abducono l’anca e stabilizzano il bacino a ogni appoggio; il tensore della fascia lata assiste. Il mezzo squat tiene quadricipiti e grande gluteo in isometria per tutta la camminata.',
    mechanics:
      'Abduzione dell’anca nel piano frontale contro resistenza elastica, con appoggio alternato. È uno dei pochi esercizi della libreria a lavorare su questo piano, mentre squat e affondi lavorano quasi tutti nel piano sagittale.',
    benefits: [
      'Rinforza lo stabilizzatore laterale dell’anca, direttamente coinvolto nell’allineamento del ginocchio nel camminare e nel correre.',
      'Dà un riscontro tattile immediato: se l’elastico si allenta, il ginocchio è ceduto.',
      'Completa lo squat con elastico isolando la componente laterale a cui quello si limita a resistere.',
    ],
    progression: {
      easier: 'Abbassa l’elastico sopra le caviglie invece che sopra le ginocchia, o usa una banda più morbida.',
      harder: 'Risali con l’elastico sopra le ginocchia, scendi più in basso nel mezzo squat, o allunga la serie.',
      readyWhen: 'Quando tre serie da quindici passi per lato passano senza che l’elastico si allenti, aumenta la resistenza.',
    },
    precautions:
      'Se la parte esterna del ginocchio scalda più dell’anca, il movimento parte dal ginocchio: abbassa l’elastico e riparti con passi più corti.',
  },

  bandCurl: {
    slug: 'curl-bicipiti-con-elastico',
    muscles: { primary: 'Bicipiti', secondary: 'Avambracci' },
    steps: [
      'In piedi al centro dell’elastico, con uno o entrambi i piedi sopra, un’estremità per mano.',
      'Braccia lungo i fianchi, gomiti aderenti alle costole, palmi in avanti.',
      'Porta le mani verso le spalle mantenendo i gomiti fermi.',
      'Scendi lentamente fino alla completa estensione delle braccia.',
    ],
    mistakes: [
      'Gomiti che avanzano durante la salita: il movimento lascia il bicipite e passa alla spalla.',
      'Busto che oscilla per lanciare il carico.',
      'Discesa lasciata andare, quando è la parte frenata a produrre più lavoro.',
    ],
    sensation:
      'Il lavoro si sente nella parte anteriore del braccio, dal gomito alla spalla. Anche gli avambracci scaldano, ed è normale: sono loro a tenere l’elastico.',
    rangeOfMotion:
      'Sali finché le mani si avvicinano alle spalle, e scendi fino a braccia completamente tese. Accorciare la discesa è il modo più comune di ridurre il lavoro senza accorgersene.',
    tempo:
      'Un secondo per salire, due o tre per scendere frenando. Espira salendo.',
    anatomy:
      'Il bicipite brachiale flette il gomito e partecipa alla supinazione dell’avambraccio; il brachiale, situato sotto, è il flessore più costante qualunque sia la posizione della mano. Il brachioradiale dell’avambraccio assiste.',
    mechanics:
      'Flessione del gomito in catena aperta contro una resistenza crescente: l’elastico è più teso in alto, dove il braccio di leva è corto, il che dà un profilo di carico quasi inverso a quello di un manubrio.',
    benefits: [
      'Il primo esercizio per i bicipiti della libreria, in un gruppo «Braccia» che prima di questo lotto non esisteva.',
      'Completa i movimenti di trazione (rematore, lat machine), dove il bicipite lavora solo in assistenza.',
      'Non richiede altro che un elastico e sta in una borsa.',
    ],
    progression: {
      easier: 'Impugna l’elastico più in alto lungo la sua lunghezza, o appoggia un solo piede.',
      harder: 'Accorcia la lunghezza impugnata, o mantieni una pausa di un secondo in alto a ogni ripetizione.',
      readyWhen: 'Quando tre serie da quindici passano senza che i gomiti avanzino, accorcia l’elastico.',
    },
    precautions:
      'Un dolore alla piega del gomito non è il bruciore cercato: riduci la resistenza e verifica che la discesa sia frenata anziché subita.',
  },

  dumbbellShoulderPress: {
    slug: 'lento-avanti-con-manubri',
    muscles: { primary: 'Spalle', secondary: 'Tricipiti, core' },
    steps: [
      'In piedi o seduto, un manubrio per mano all’altezza delle spalle, palmi in avanti.',
      'Contrai glutei e addome per bloccare il bacino.',
      'Spingi i manubri sopra la testa fino a estendere le braccia, senza inarcare.',
      'Scendi con controllo finché i gomiti tornano sotto l’altezza delle spalle.',
    ],
    mistakes: [
      'Zona lombare inarcata per compensare una scarsa ampiezza di spalla.',
      'Gomiti che si aprono molto lateralmente invece di restare leggermente davanti al busto.',
      'Discesa accorciata, che elimina la parte più utile del movimento.',
    ],
    sensation:
      'Il lavoro si sente nelle spalle e nella parte posteriore delle braccia, con il core attivo dall’inizio alla fine. Una tensione lombare segnala che il bacino non è più bloccato.',
    rangeOfMotion:
      'Scendi finché i gomiti passano sotto l’altezza delle spalle, e spingi fino a braccia tese senza bloccarle di scatto. Da seduti con schienale alto, la zona lombare è protetta meccanicamente.',
    tempo:
      'Uno o due secondi per spingere, due o tre per scendere con controllo. Espira spingendo.',
    anatomy:
      'Il deltoide anteriore e il tricipite sono i motori, con il deltoide medio che assiste. Trapezio e dentato anteriore ruotano la scapola verso l’alto, condizione perché il braccio salga liberamente sopra la testa; gli addominali impediscono l’inarcamento compensatorio.',
    mechanics:
      'Flessione di spalla sopra la testa unita a estensione del gomito, in catena aperta e con carico costante su tutta l’escursione — a differenza dell’elastico, la cui resistenza cresce a fine movimento.',
    benefits: [
      'Il movimento di spinta verticale di riferimento non appena si dispone di una coppia di manubri.',
      'Carica progressivamente le spalle, cosa che i piegamenti a V ottengono solo cambiando la posizione del corpo.',
      'Lavora ogni braccio in modo indipendente, così il lato forte non compensa quello debole.',
    ],
    progression: {
      easier: 'Riduci il carico, o siediti con schienale per togliere il lavoro di core.',
      harder: 'Aumenta il carico, o mantieni una pausa di un secondo in alto a ogni ripetizione.',
      readyWhen: 'Quando tre serie da dodici passano senza inarcamenti, aumenta il carico.',
    },
    precautions:
      'Se alzare le braccia sopra la testa fa male, riduci l’escursione o ruota i palmi verso l’interno: questa posizione non si forza.',
  },

  dumbbellFloorPress: {
    slug: 'distensioni-con-manubri-a-terra',
    muscles: { primary: 'Pettorali, tricipiti', secondary: 'Spalle' },
    steps: [
      'Sdraiati sulla schiena, ginocchia piegate, piedi appoggiati, un manubrio per mano.',
      'Gomiti a terra a circa 45° dal busto, manubri all’altezza del petto.',
      'Spingi i manubri verso il soffitto fino a estendere le braccia.',
      'Scendi con controllo finché i gomiti toccano il pavimento, fai una pausa, poi spingi di nuovo.',
    ],
    mistakes: [
      'Lasciare che i gomiti rimbalzino a terra invece di fare una pausa.',
      'Gomiti aperti a 90°, che mettono la spalla in posizione sfavorevole.',
      'Zona lombare staccata da terra invece di restare in contatto.',
    ],
    sensation:
      'Il lavoro si sente nel petto e nella parte posteriore delle braccia. Il pavimento dà un riferimento di profondità costante che una panca non ha.',
    rangeOfMotion:
      'Il pavimento limita la discesa: è proprio questo il punto, fissa la stessa profondità a ogni ripetizione e impedisce alla spalla di andare troppo in estensione.',
    tempo:
      'Uno o due secondi per spingere, due o tre per scendere. Una pausa di un secondo al contatto col pavimento elimina ogni rimbalzo.',
    anatomy:
      'Il grande pettorale e il tricipite sono i motori, con il deltoide anteriore che assiste. Poiché l’escursione è delimitata dal pavimento, la spalla non va mai in estensione eccessiva: è questo a rendere la variante più tollerante della panca.',
    mechanics:
      'Adduzione orizzontale della spalla con estensione del gomito, in catena aperta e a carico costante. Il pavimento tronca la parte bassa del movimento, trasformando un’escursione libera in una delimitata e riproducibile da una seduta all’altra.',
    benefits: [
      'Porta la distensione orizzontale caricata senza panca, con una semplice coppia di manubri e un tappetino.',
      'Il riferimento del pavimento rende la profondità identica in ogni serie, quindi il progresso misurabile.',
      'Ogni braccio lavora in modo indipendente, a differenza del bilanciere.',
    ],
    progression: {
      easier: 'Riduci il carico, o spingi un braccio alla volta per concentrarti sulla traiettoria.',
      harder: 'Aumenta il carico, allunga la pausa a terra, o rallenta la discesa a quattro secondi.',
      readyWhen: 'Quando tre serie da dodici passano con una pausa netta a terra a ogni ripetizione, aumenta il carico.',
    },
    precautions:
      'Non lasciare mai cadere i gomiti in caduta libera: il contatto col pavimento va appoggiato, non subito.',
  },

  dumbbellRomanianDeadlift: {
    slug: 'stacco-rumeno',
    muscles: { primary: 'Glutei, femorali', secondary: 'Zona lombare, core' },
    steps: [
      'In piedi, un manubrio per mano davanti alle cosce, piedi alla larghezza dei fianchi.',
      'Fletti appena le ginocchia e mantieni quell’angolo costante per tutto il movimento.',
      'Spingi i fianchi indietro e scendi con i manubri lungo le gambe, schiena piatta.',
      'Scendi fino a sentire la tensione dietro le cosce, poi torna spingendo i fianchi in avanti.',
    ],
    mistakes: [
      'Flettere progressivamente le ginocchia durante la discesa: il movimento diventa uno squat e lascia i femorali.',
      'Schiena che si incurva appena finisce la mobilità dell’anca.',
      'Manubri che si allontanano dalle gambe, il che aumenta il carico sulla zona lombare.',
    ],
    sensation:
      'Una tensione netta dietro le cosce durante la discesa, poi i glutei che subentrano nella risalita. La zona lombare lavora in isometria, mai come motore.',
    rangeOfMotion:
      'Scendi fino al termine dell’allungamento dei femorali, non oltre: è la flessibilità posteriore a fissare l’escursione, non l’altezza dei manubri. Nel momento in cui la schiena si incurva, il limite è superato.',
    tempo:
      'Tre secondi per scendere, uno o due per risalire. Inspira scendendo, espira spingendo i fianchi in avanti.',
    anatomy:
      'I femorali e il grande gluteo estendono l’anca: sono i motori. Gli erettori spinali lavorano in isometria per tenere la schiena piatta — non devono mai produrre il movimento, solo impedirlo. È l’unico esercizio della libreria che allena la cerniera d’anca sotto carico.',
    mechanics:
      'Una cerniera d’anca pura: flessione poi estensione dell’anca con il ginocchio quasi fisso, nel piano sagittale. È questo a distinguerla dallo squat: lo squat piega anca E ginocchio, la cerniera solo l’anca.',
    benefits: [
      'Insegna la cerniera d’anca, lo schema motorio che protegge la schiena ogni volta che si raccoglie qualcosa da terra.',
      'Carica i femorali in estensione d’anca, complemento diretto del leg curl che li lavora in flessione di ginocchio.',
      'Rinforza tutta la catena posteriore con un solo movimento.',
    ],
    progression: {
      easier: 'Riduci il carico, o scendi meno per restare nell’escursione in cui la schiena resta piatta.',
      harder: 'Aumenta il carico, o rallenta la discesa a cinque secondi.',
      readyWhen: 'Quando tre serie da dodici passano con la schiena piatta su tutta l’escursione, aumenta il carico.',
    },
    precautions:
      'La schiena piatta non è negoziabile: se mantenere la posizione richiede di incurvarla, il carico è troppo pesante o l’escursione troppo ampia.',
  },

  dumbbellCalfRaise: {
    slug: 'calf-raise-con-manubri',
    muscles: { primary: 'Polpacci' },
    steps: [
      'In piedi, un manubrio per mano lungo i fianchi, piedi alla larghezza dei fianchi.',
      'Sali lentamente sulle punte, il più in alto possibile.',
      'Fai una pausa in alto, con i polpacci contratti.',
      'Scendi lentamente finché i talloni toccano il pavimento.',
    ],
    mistakes: [
      'Rimbalzare in basso invece di controllare la discesa.',
      'Caviglie che cedono verso l’esterno: il peso deve restare sull’alluce.',
      'Escursione accorciata in alto, proprio dove il polpaccio si contrae di più.',
    ],
    sensation:
      'Un bruciore netto nel polpaccio, che sale in fretta. Il carico si sente anche negli avambracci, che tengono i manubri per tutta la serie.',
    rangeOfMotion:
      'Sali quanto la caviglia consente e scendi fino al contatto col pavimento. In piedi su uno scalino, con i talloni nel vuoto, l’escursione si allunga ancora verso il basso.',
    tempo:
      'Uno o due secondi per salire, una pausa in alto, due o tre per scendere. È la lentezza a fare il lavoro, non il carico.',
    anatomy:
      'Il tricipite surale — gastrocnemi e soleo — produce la flessione plantare. Con il ginocchio teso dominano i gastrocnemi, ed è per questo che la versione in piedi completa bene ogni lavoro da seduti, dove subentra il soleo.',
    mechanics:
      'Flessione plantare della caviglia in catena chiusa, con un carico esterno che si aggiunge al peso del corpo. L’escursione è breve per natura, il che rende il tempo sotto tensione più determinante del numero di ripetizioni.',
    benefits: [
      'Carica i polpacci oltre il peso corporeo, cosa che la versione senza manubri non consente più quando quindici ripetizioni risultano facili.',
      'Toglie i polpacci dal loro isolamento nella libreria, insieme all’allungamento corrispondente.',
      'Rinforza la spinta finale della camminata e della corsa.',
    ],
    progression: {
      easier: 'Fallo senza manubri, o tieniti con una mano per gestire un solo peso.',
      harder: 'Aumenta il carico, sali su uno scalino per allungare l’escursione, o passa su una gamba sola.',
      readyWhen: 'Quando tre serie da venti passano con una pausa in alto, aumenta il carico o passa su una gamba.',
    },
    precautions:
      'Un crampo a fine serie è frequente in questo muscolo: riduci l’escursione e allunga il recupero invece di forzare la ripetizione successiva.',
  },

  dumbbellCurl: {
    slug: 'curl-bicipiti-con-manubri',
    muscles: { primary: 'Bicipiti', secondary: 'Avambracci' },
    steps: [
      'In piedi, un manubrio per mano, braccia lungo i fianchi, palmi in avanti.',
      'Gomiti aderenti alle costole, spalle basse e busto fermo.',
      'Porta il manubrio verso la spalla senza che il gomito avanzi.',
      'Scendi lentamente fino alla completa estensione del braccio.',
    ],
    mistakes: [
      'Oscillazione del busto per lanciare il carico: lavora la schiena, non il bicipite.',
      'Gomiti che avanzano a fine salita, il che coinvolge la spalla.',
      'Discesa lasciata andare, quando la fase frenata è la più produttiva.',
    ],
    sensation:
      'Il lavoro si sente nella parte anteriore del braccio, dalla piega del gomito alla spalla. Il busto deve restare perfettamente fermo: è il miglior indicatore di un carico adeguato.',
    rangeOfMotion:
      'Sali finché il manubrio si avvicina alla spalla, e scendi fino al braccio completamente teso. Accorciare in basso è il modo più comune di barare senza accorgersene.',
    tempo:
      'Un secondo per salire, due o tre per scendere. Espira salendo.',
    anatomy:
      'Il bicipite brachiale flette il gomito e supina l’avambraccio — da qui il palmo in avanti, che lo mette in posizione favorevole. Il brachiale, sotto il bicipite, flette il gomito qualunque sia la posizione della mano; il brachioradiale assiste.',
    mechanics:
      'Flessione del gomito in catena aperta a carico costante: a differenza dell’elastico la resistenza non varia, ma il braccio di leva è massimo con l’avambraccio orizzontale, ed è lì che il movimento è più duro.',
    benefits: [
      'Il movimento per i bicipiti più diretto, con un carico regolabile con precisione.',
      'Completa le trazioni (rematore, lat machine), dove il bicipite è solo secondario.',
      'Ogni braccio lavora separatamente, il che rivela e corregge uno squilibrio.',
    ],
    progression: {
      easier: 'Riduci il carico, o appoggia la schiena al muro per eliminare ogni oscillazione.',
      harder: 'Aumenta il carico, rallenta la discesa a quattro secondi, o fai una pausa a metà salita.',
      readyWhen: 'Quando tre serie da dodici passano senza che il busto si muova, aumenta il carico.',
    },
    precautions:
      'Un dolore alla piega del gomito, distinto dal bruciore muscolare, impone di ridurre il carico: i tendini del gomito tollerano male il sovraccarico brusco in questo movimento.',
  },

  dumbbellTricepsExtension: {
    slug: 'estensione-tricipiti',
    muscles: { primary: 'Tricipiti' },
    steps: [
      'In piedi o seduto, tieni un manubrio con entrambe le mani, braccia tese sopra la testa.',
      'Gomiti stretti in avanti, il più vicino possibile alle orecchie.',
      'Fletti i gomiti per scendere con il manubrio dietro la nuca, senza aprirli.',
      'Risali fino alla completa estensione delle braccia, gomiti ancora stretti.',
    ],
    mistakes: [
      'Gomiti che si aprono verso l’esterno, il che sposta il carico dal tricipite alla spalla.',
      'Zona lombare inarcata per compensare la scarsa ampiezza di spalla.',
      'Discesa troppo rapida, con il carico dietro la testa.',
    ],
    sensation:
      'Il lavoro si sente nella parte posteriore del braccio, dal gomito alla spalla. Un fastidio nell’articolazione della spalla segnala che i gomiti si sono aperti o che il carico è eccessivo.',
    rangeOfMotion:
      'Scendi fino a sentire l’allungamento dietro il braccio, senza forzare, poi risali fino a braccia tese. Con le braccia sopra la testa il capo lungo del tricipite è già preallungato, quindi l’escursione utile è più breve di quanto sembri.',
    tempo:
      'Uno o due secondi per salire, due o tre per scendere con controllo. Espira spingendo.',
    anatomy:
      'Il tricipite brachiale è l’unico estensore del gomito. Il suo capo lungo incrocia anche la spalla: la posizione con le braccia sopra la testa lo mette in tensione ancora prima dell’inizio del movimento, ed è per questo che questa variante lo sollecita più di un’estensione con il braccio lungo il fianco.',
    mechanics:
      'Estensione del gomito in catena aperta, con la spalla flessa sopra la testa e mantenuta fissa. È il compito del core e dei gomiti stretti: impedire alla spalla di partecipare, così che si muova solo il gomito.',
    benefits: [
      'Colpisce il tricipite in una posizione che dip e piegamenti non riproducono.',
      'Si fa con un solo manubrio, in piedi o seduti, senza panca.',
      'Completa il curl per coprire entrambe le facce del braccio nel gruppo «Braccia».',
    ],
    progression: {
      easier: 'Riduci il carico, o esegui il movimento un braccio alla volta per controllare meglio la traiettoria.',
      harder: 'Aumenta il carico, o mantieni una pausa di un secondo nella posizione bassa.',
      readyWhen: 'Quando tre serie da dodici passano senza che i gomiti si aprano, aumenta il carico.',
    },
    precautions:
      'Comincia leggero: il carico è dietro la testa, e perderne il controllo lì è più delicato che in un movimento davanti al corpo. Da seduti con schienale, la zona lombare è meglio protetta.',
  },

  chestPressMachine: {
    slug: 'chest-press',
    muscles: { primary: 'Pettorali, tricipiti', secondary: 'Spalle' },
    steps: [
      'Regola l’altezza del sedile perché le impugnature arrivino all’altezza del petto.',
      'Siediti con schiena e spalle ben appoggiate allo schienale, piedi piatti a terra.',
      'Spingi le impugnature in avanti fino a estendere le braccia, senza bloccare i gomiti.',
      'Torna con controllo finché le mani non tornano all’altezza del petto.',
    ],
    mistakes: [
      'Spalle che si staccano dallo schienale per guadagnare qualche centimetro di spinta.',
      'Bloccare i gomiti a fine spinta, il che sposta il carico sull’articolazione.',
      'Ritorno troppo rapido, quando la fase frenata è la più produttiva.',
    ],
    sensation:
      'Il lavoro si sente nel petto e nella parte posteriore delle braccia, senza sforzo di stabilizzazione: se ne occupa lo schienale. È questo a distinguere la macchina da un piegamento.',
    rangeOfMotion:
      'Torna finché le mani sono all’altezza del petto, non oltre: oltre quel punto la spalla va in estensione eccessiva contro un carico guidato, e questo non aggiunge nulla.',
    tempo:
      'Uno o due secondi per spingere, due o tre per tornare. Espira spingendo.',
    anatomy:
      'Il grande pettorale e il tricipite sono i motori, con il deltoide anteriore che assiste. Lo schienale sostituisce tutto il lavoro di core che un piegamento richiede, il che concentra lo sforzo sui muscoli della spinta e su nient’altro.',
    mechanics:
      'Adduzione orizzontale della spalla con estensione del gomito, su una traiettoria imposta dalla macchina. Con il busto fissato, la variabile è il carico e non la stabilità: l’esatto contrario di un piegamento.',
    benefits: [
      'Permette di caricare molto la spinta orizzontale senza compagno né panca, con una regolazione fine del carico.',
      'La traiettoria guidata riduce il rischio di errore tecnico rispetto a un movimento libero caricato.',
      'Utile come complemento ai piegamenti, o come sostituto quando il polso o il core sono il limite.',
    ],
    progression: {
      easier: 'Riduci il carico, o accorcia l’escursione tornando un po’ meno indietro.',
      harder: 'Aumenta il carico, rallenta il ritorno a quattro secondi, o fai una pausa nella posizione bassa.',
      readyWhen: 'Quando tre serie da dodici passano senza che le spalle si stacchino dallo schienale, aumenta il carico.',
    },
    precautions:
      'Tieni le spalle a contatto con lo schienale dall’inizio alla fine: è quel contatto a proteggere l’articolazione su una traiettoria imposta.',
  },

  legCurlMachine: {
    slug: 'leg-curl',
    muscles: { primary: 'Femorali', secondary: 'Polpacci' },
    steps: [
      'Regola la macchina perché il rullo poggi sulla parte bassa dei polpacci, appena sopra i talloni.',
      'Sistemati con il bacino ben aderente all’appoggio, gambe tese senza bloccare le ginocchia.',
      'Fletti le ginocchia per portare i talloni verso i glutei, con controllo.',
      'Scendi lentamente fino all’estensione, senza lasciar cadere il carico.',
    ],
    mistakes: [
      'Bacino che si stacca per aiutare la flessione: il movimento lascia i femorali.',
      'Discesa non frenata, con il carico che ricade da solo.',
      'Rullo mal posizionato, troppo in alto sul polpaccio, che ostacola invece di caricare.',
    ],
    sensation:
      'Una contrazione netta dietro la coscia, dal ginocchio verso il gluteo. La zona lombare non deve sentire nulla: se lo fa, il bacino si è staccato.',
    rangeOfMotion:
      'Fletti quanto la macchina consente senza che il bacino si muova, e scendi fino alla completa estensione ma senza bloccare. In questo movimento l’escursione completa conta più del carico.',
    tempo:
      'Uno o due secondi per flettere, due o tre per scendere frenando. Espira flettendo.',
    anatomy:
      'I femorali flettono il ginocchio: è la loro azione principale, ed è esattamente quella che nessun esercizio a corpo libero della libreria carica direttamente. I gastrocnemi, che incrociano anch’essi il ginocchio, assistono.',
    mechanics:
      'Flessione del ginocchio in catena aperta con anca fissa, su traiettoria guidata. È il complemento esatto dello stacco rumeno, che carica gli stessi muscoli ma in estensione d’anca con il ginocchio quasi fisso.',
    benefits: [
      'Colma l’unica lacuna evidente della libreria: nessun esercizio caricava i femorali in flessione di ginocchio.',
      'Bilancia il lavoro della coscia, largamente dominato dai quadricipiti (squat, affondi, leg press).',
      'Traiettoria guidata e carico regolabile, quindi progresso misurabile.',
    ],
    progression: {
      easier: 'Riduci il carico, o accorcia l’escursione flettendo un po’ meno.',
      harder: 'Aumenta il carico, rallenta la discesa a quattro secondi, o mantieni una pausa di un secondo in flessione.',
      readyWhen: 'Quando tre serie da dodici passano senza che il bacino si stacchi, aumenta il carico.',
    },
    precautions:
      'Un crampo dietro la coscia è frequente in questo movimento: riduci il carico e allunga il riscaldamento invece di insistere.',
  },

  treadmill: {
    slug: 'tapis-roulant',
    muscles: { primary: 'Cardio, gambe' },
    steps: [
      'Sali sul tappeto fermo o molto lento, e accelera poi progressivamente.',
      'Scegli un’andatura in cui parlare resta possibile ma con un po’ di fiatone.',
      'Mantieni il busto dritto e lo sguardo lontano davanti, senza aggrapparti alle maniglie.',
      'Mantieni l’andatura per tutta la durata, poi rallenta gradualmente prima di scendere.',
    ],
    mistakes: [
      'Aggrapparsi alle maniglie laterali: parte del peso viene sostenuta, quindi lo sforzo reale cala mentre la velocità indicata non cambia.',
      'Sguardo fisso sullo schermo, che rovina la postura del collo.',
      'Partire troppo forte invece di installare l’andatura gradualmente.',
    ],
    sensation:
      'Un fiatone moderato e stabile per tutta la durata: la conversazione deve restare possibile ma non comoda.',
    rangeOfMotion:
      'Nessuna escursione da regolare, ma una falcata: appoggia il tallone, srotola il piede, lascia oscillare liberamente le braccia dalla spalla.',
    tempo:
      'Un’andatura regolare e mantenuta, meglio di accelerazioni seguite da recuperi — a meno che gli intervalli non siano l’obiettivo del giorno.',
    anatomy:
      'La stessa catena muscolare della camminata: glutei e femorali spingono, i quadricipiti ammortizzano, i polpacci danno la spinta finale e il core stabilizza il bacino a ogni appoggio.',
    mechanics:
      'Locomozione ciclica su un tappeto motorizzato. Ciò che la distingue dal camminare all’aperto è la pendenza regolabile: è lei, più della velocità, ad aumentare lo sforzo senza aumentare l’impatto — una regolazione che il terreno esterno non offre a piacere.',
    benefits: [
      'Permette di fissare con precisione andatura e pendenza, quindi di riprodurre esattamente lo stesso sforzo da una seduta all’altra.',
      'La pendenza carica di più glutei e polpacci senza dover correre più veloce.',
      'Indipendente dal meteo e dall’ora, a differenza della camminata all’aperto.',
    ],
    progression: {
      easier: 'Riduci la velocità prima della durata: meglio quindici minuti tenuti che trenta subiti.',
      harder: 'Alza la pendenza ad andatura costante, allunga la durata, o alterna tratti più veloci.',
      readyWhen: 'Quando venti minuti ad andatura costante passano mantenendo possibile una conversazione, alza la pendenza.',
    },
    precautions:
      'Aggancia l’arresto di emergenza prima di partire, e non scendere mai da un tappeto in movimento.',
  },

  stationaryBike: {
    slug: 'cyclette',
    muscles: { primary: 'Cardio, cosce', secondary: 'Glutei' },
    steps: [
      'Regola la sella perché il ginocchio mantenga una leggera flessione quando il pedale è al punto più basso.',
      'Siediti con le mani appoggiate senza contrarsi, la schiena né afflosciata né inarcata.',
      'Trova una cadenza regolare, poi regola la resistenza per individuare il tuo sforzo di lavoro.',
      'Mantieni cadenza e resistenza per tutta la durata, poi chiudi con qualche minuto leggero.',
    ],
    mistakes: [
      'Sella troppo bassa: il ginocchio resta troppo flesso in basso, il che carica inutilmente l’articolazione.',
      'Bacino che oscilla da un lato all’altro, segno di una sella troppo alta.',
      'Resistenza quasi nulla con una cadenza altissima, che dà l’illusione dello sforzo senza produrlo.',
    ],
    sensation:
      'Un fiatone moderato e un riscaldamento progressivo nelle cosce. A differenza della camminata o del tapis roulant, il peso del corpo non grava mai sulle gambe.',
    rangeOfMotion:
      'Nessuna escursione da regolare, ma un’altezza di sella: il ginocchio conserva una leggera flessione in basso, senza che il bacino debba oscillare per raggiungere il pedale.',
    tempo:
      'Una cadenza regolare mantenuta per tutta la durata. La resistenza è la vera regolazione dell’intensità, non la velocità di pedalata.',
    anatomy:
      'Quadricipiti e grande gluteo producono l’estensione di ginocchio e anca a ogni spinta; femorali e polpacci partecipano nella risalita quando i piedi sono fissati. La posizione seduta scarica completamente la colonna e le articolazioni portanti.',
    mechanics:
      'Pedalata ciclica in catena chiusa, senza carico del peso: è l’asse che distingue la cyclette da tutto il resto del cardio della libreria — il corpo è sostenuto dalla sella, quindi ginocchia, anche e schiena non subiscono impatto né compressione dovuta al peso.',
    benefits: [
      'L’unico cardio della libreria che non fa portare peso alle gambe, quindi praticabile quando camminare o correre infastidisce un’articolazione.',
      'La resistenza si regola con precisione, il che rende l’intensità riproducibile da una seduta all’altra.',
      'Permette di sostenere durate lunghe senza carico articolare accumulato.',
    ],
    progression: {
      easier: 'Abbassa la resistenza prima di ridurre la durata, e mantieni una cadenza comoda.',
      harder: 'Aumenta la resistenza a cadenza costante, allunga la durata, o alterna blocchi più duri.',
      readyWhen: 'Quando venti minuti passano senza che la cadenza cali alla fine, aumenta la resistenza.',
    },
    precautions:
      'Un ginocchio dolorante viene quasi sempre dalla regolazione della sella, non dallo sforzo: verifica l’altezza prima di ridurre l’intensità.',
  },

  rowingMachine: {
    slug: 'vogatore',
    muscles: { primary: 'Cardio, schiena, gambe', secondary: 'Braccia, core' },
    steps: [
      'Allaccia i piedi, afferra l’impugnatura a braccia tese, tibie verticali, busto leggermente in avanti: è la posizione di attacco.',
      'Spingi prima con forza con le gambe, braccia ancora tese e busto fermo.',
      'Quando le gambe sono quasi tese, apri il busto all’indietro e solo allora tira l’impugnatura verso la parte bassa delle costole.',
      'Torna nell’ordine inverso: distendi le braccia, riporta il busto in avanti, poi piega le gambe.',
    ],
    mistakes: [
      'Tirare con le braccia prima che le gambe abbiano spinto: è l’errore più diffuso, e priva il movimento della sua principale fonte di potenza.',
      'Aprire il busto troppo presto, il che sposta il carico sulla zona lombare.',
      'Schiena curva in posizione di attacco, con la scusa di andare più lontano.',
    ],
    sensation:
      'Bruciano prima le gambe, poi la schiena e le braccia. Se le braccia si stancano prima delle gambe, l’ordine del colpo è invertito.',
    rangeOfMotion:
      'L’impugnatura arriva alla parte bassa delle costole, non al petto né alla pancia. In posizione di attacco le tibie sono verticali: andare oltre non guadagna nulla e sollecita la schiena.',
    tempo:
      'Un ritmo regolare, con un ritorno circa due volte più lento della spinta. È questo rapporto, non la cadenza, a distinguere un colpo pulito da uno affrettato.',
    anatomy:
      'Quadricipiti e glutei producono la maggior parte della potenza nella spinta; poi il gran dorsale, i romboidi e il trapezio medio portano la scapola verso la colonna; il bicipite conclude. Il core trasmette la forza delle gambe alla parte alta, il che fa del vogatore un movimento di catena completa.',
    mechanics:
      'Sequenza in quattro tempi — attacco, spinta, finale, ritorno — che combina estensione delle gambe, estensione dell’anca e trazione orizzontale. È l’unico movimento della libreria in cui l’ordine dei segmenti conta quanto la forza prodotta: gambe, poi busto, poi braccia.',
    benefits: [
      'L’unico cardio della libreria che è anche un vero gesto tecnico: la qualità del colpo migliora insieme alla condizione fisica.',
      'Allena la catena di trazione, assente negli altri esercizi cardio.',
      'Senza impatto, pur reclutando nettamente più massa muscolare della camminata o della cyclette.',
    ],
    progression: {
      easier: 'Riduci la durata prima di alzare la cadenza, e concentrati sull’ordine gambe-busto-braccia.',
      harder: 'Allunga la durata, alza il ritmo mantenendo il rapporto ritorno/spinta, o lavora a blocchi.',
      readyWhen: 'Quando quindici minuti passano con l’ordine del colpo rispettato dall’inizio alla fine, allunga la durata.',
    },
    precautions:
      'La zona lombare non deve mai essere il motore: se la fatica si installa lì, significa che il busto si apre prima che le gambe abbiano finito di spingere. Riprendi più lentamente e più leggero.',
  },
};
