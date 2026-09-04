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
      'Il progresso si misura in secondi, un’unità più chiara di "una ripetizione in più" per seguire un ritorno all’attività.',
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
      'Locomozione ciclica in catena chiusa alternata: ogni gamba attraversa una fase di appoggio e una di volo dell’arto. A differenza della corsa, c’è sempre un piede a terra, e questa assenza di fase aerea elimina l’impatto e rende il camminare accessibile in un ritorno all’attività.',
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
      'Funziona ovunque, senza attrezzi e senza bisogno di un pavimento pulito, il che si adatta a un ritorno graduale.',
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
      'Rinforza la stabilità lombare senza carico compressivo sulla colonna, il che lo rende spesso ben tollerato in un ritorno all’attività.',
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
      'La versione all’indietro è nettamente più delicata per il ginocchio dell’affondo in avanti, il che si adatta meglio a un ritorno all’attività.',
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
      'Senza impatto, a differenza dei salti: praticabile in appartamento e compatibile con un ritorno all’attività.',
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
};
