import type { ExerciseKey } from '../../core/types';

/**
 * Contenu long d'un exercice : matiere de la page detaillee statique
 * (voir scripts/build-exercise-pages.ts) et de la modal d'info.
 *
 * Delibirement hors du contrat `Translations` strict d'i18n/index.ts : ce
 * contenu est long, et son deploiement dans les 5 langues est phase dans le
 * temps (francais d'abord). Contrairement au nom/conseil court de chaque
 * exercice (dans i18n/locales/*, exiges dans les 5 langues des l'ajout d'une
 * cle), une page detaillee peut legitimement manquer pour une langue tant
 * qu'elle n'a pas ete traduite — la resolution retombe sur le francais.
 */
export interface ExerciseDetail {
  /** Slug de l'URL, francais et lisible : "pompes-genoux", pas la cle interne. */
  slug: string;
  muscles: { primary: string; secondary?: string };
  /** 4 a 7 etapes ordonnees. Reste en tete de page : c'est ce qu'on vient chercher. */
  steps: string[];
  /** 2 a 4 erreurs frequentes ou points de securite. Reste en tete aussi. */
  mistakes: string[];

  /*
    Contenu approfondi. Regle de redaction : uniquement du verifiable et du
    stable — anatomie (noms et roles musculaires), biomecanique (actions
    articulaires, plans, types de contraction), principes d'entrainement
    etablis. JAMAIS de citation d'etude, de pourcentage d'activation EMG ni
    de chiffre a fausse precision : ca sonnerait scientifique en etant
    invente. Champs optionnels quand ils ne s'appliquent pas (une mobilite
    ou du cardio n'ont pas de "progression" au sens d'un exercice de force) :
    mieux vaut une section absente qu'une section de remplissage.
  */

  /** Ou l'effort doit se faire sentir, et ou il ne doit PAS. */
  sensation: string;
  /** Jusqu'ou aller, ou s'arreter. Source d'erreur la plus frequente. */
  rangeOfMotion: string;
  /** Rythme d'execution et respiration. */
  tempo: string;
  /** Role precis de chaque muscle : moteur, stabilisateur, antagoniste. */
  anatomy: string;
  /** Actions articulaires, plan de mouvement, type de contraction. */
  mechanics: string;
  /** Ce que l'exercice developpe, et son transfert concret hors seance. */
  benefits: string[];
  /** Adapter dans les deux sens, et signal concret pour passer a la suite. */
  progression?: { easier?: string; harder?: string; readyWhen?: string };
  /** Precautions pratiques. Jamais de diagnostic ni de conseil medical. */
  precautions?: string;
}

/**
 * Prefixe commun a tous les prompts : garde une direction artistique
 * coherente d'un exercice a l'autre, meme generes separement dans Gemini.
 */
export const fr: Partial<Record<ExerciseKey, ExerciseDetail>> = {
  inclined: {
    slug: 'pompes-inclinees',
    muscles: { primary: 'Pectoraux, triceps', secondary: 'Épaules, gainage' },
    steps: [
      'Place tes mains sur une surface stable et surélevée (chaise, banc, rebord de table), un peu plus larges que les épaules.',
      'Recule les pieds jusqu’à aligner le corps en ligne droite, des chevilles à la tête.',
      'Engage les abdominaux et les fessiers pour garder le bassin stable tout au long du mouvement.',
      'Plie les coudes à environ 45° du corps et descends la poitrine vers l’appui, sans creuser le dos.',
      'Pousse pour revenir à la position de départ, sans verrouiller les coudes brutalement en haut.',
    ],
    mistakes: [
      'Coudes écartés à 90° du corps : sollicite trop les épaules et les fragilise.',
      'Bassin qui s’affaisse ou se cambre : perd l’alignement et charge le bas du dos.',
      'Amplitude coupée à mi-chemin : moins efficace qu’une descente franche et contrôlée.',
    ],
    sensation:
      'L’effort se concentre dans les pectoraux et l’arrière des bras. Si tu le sens surtout à l’avant de l’épaule, dans le poignet ou dans la nuque, c’est que les coudes partent trop en dehors ou que les épaules remontent vers les oreilles.',
    rangeOfMotion:
      'Descends jusqu’à ce que la poitrine arrive à quelques centimètres de l’appui. N’aller pas plus bas que ce que l’épaule accepte sans que celle-ci s’enroule vers l’avant. En haut, tends les bras sans verrouiller le coude d’un coup sec.',
    tempo:
      'Deux secondes pour descendre, une pour remonter. Inspire pendant la descente, souffle pendant la poussée. La descente contrôlée est la moitié utile du mouvement : se laisser tomber revient à n’en faire que la moitié.',
    anatomy:
      'Le grand pectoral est le moteur principal : il ramène le bras vers l’axe du corps. Le triceps brachial étend le coude, le deltoïde antérieur assiste le début de la poussée. En arrière-plan, le dentelé antérieur maintient l’omoplate plaquée contre la cage thoracique, tandis que le transverse de l’abdomen et les fessiers verrouillent le bassin pour que le corps reste une planche rigide.',
    mechanics:
      'Poussée horizontale dans le plan sagittal, associant une flexion d’épaule et une extension de coude. La descente est une contraction excentrique — le muscle s’allonge en résistant —, la remontée une contraction concentrique. Plus l’appui est haut, plus la part du poids du corps à déplacer diminue : c’est exactement le réglage de difficulté de cet exercice.',
    benefits: [
      'Développe la force de poussée du haut du corps sans matériel, avec beaucoup moins de contrainte sur les poignets et les épaules qu’une pompe au sol.',
      'Renforce le gainage en position de planche, qui se retrouve dans tout ce qu’on pousse ou porte devant soi.',
      'Se dose finement en changeant simplement la hauteur de l’appui : c’est ce qui en fait un point d’entrée fiable après une période sans entraînement.',
    ],
    progression: {
      easier: 'Monte l’appui : un plan de travail ou un mur est bien plus accessible qu’une chaise.',
      harder: 'Baisse l’appui vers le sol, ou allonge la descente jusqu’à quatre secondes.',
      readyWhen:
        'Quand trois séries de douze passent avec une descente contrôlée et un bassin qui ne bouge pas, baisse l’appui d’un cran.',
    },
    precautions:
      'En cas de douleur à l’avant de l’épaule, réduis l’amplitude et rapproche les coudes du corps avant de chercher à descendre plus bas.',
  },

  chairsquat: {
    slug: 'squat-sur-chaise',
    muscles: { primary: 'Quadriceps, fessiers', secondary: 'Ischio-jambiers, gainage' },
    steps: [
      'Place-toi debout devant une chaise stable, pieds écartés à la largeur des hanches.',
      'Pousse les hanches vers l’arrière comme pour t’asseoir, genoux dans l’axe des pieds.',
      'Descends avec contrôle jusqu’à effleurer l’assise de la chaise, poids sur les talons.',
      'Marque un bref contact sans t’asseoir complètement, buste droit.',
      'Remonte en poussant dans les talons jusqu’à l’extension complète des jambes.',
    ],
    mistakes: [
      'Genoux qui rentrent vers l’intérieur : instable et mauvais pour les articulations.',
      'Se laisser tomber sur la chaise au lieu de contrôler la descente.',
      'Buste qui bascule trop en avant : reporte l’effort sur le bas du dos.',
    ],
    sensation:
      'Le travail se sent dans l’avant des cuisses et dans les fessiers, avec un appui net dans les talons. Une tension à l’avant du genou ou dans le bas du dos signale que les hanches ne reculent pas assez et que le buste bascule pour compenser.',
    rangeOfMotion:
      'Descends jusqu’à effleurer l’assise sans t’y poser. La chaise sert de repère de profondeur constant, pas de siège : c’est ce qui rend l’exercice mesurable d’une séance à l’autre.',
    tempo:
      'Trois secondes pour descendre, une à deux pour remonter. Inspire en descendant, souffle en poussant dans les talons. Un temps d’arrêt d’une seconde au contact supprime tout effet de rebond.',
    anatomy:
      'Les quadriceps étendent le genou, le grand fessier étend la hanche : ce sont les deux moteurs, et ils travaillent ensemble. Les ischio-jambiers et les adducteurs stabilisent, le moyen fessier empêche le genou de partir vers l’intérieur, et les érecteurs du rachis avec la sangle abdominale maintiennent le buste gainé.',
    mechanics:
      'Double flexion puis double extension, de la hanche et du genou, dans le plan sagittal. La descente est excentrique, la remontée concentrique. Reculer les hanches place le centre de gravité au-dessus des talons : c’est ce qui répartit l’effort entre cuisses et fessiers au lieu de tout concentrer sur le genou.',
    benefits: [
      'Reconstruit le geste le plus utilisé de la vie courante : se lever d’une chaise, monter en voiture, ramasser un objet au sol.',
      'Renforce simultanément cuisses et fessiers, dont l’affaiblissement est le premier effet d’une période sédentaire.',
      'La chaise donne un repère de profondeur objectif, ce qui permet de progresser sans avoir à juger « à l’œil » si on descend assez bas.',
    ],
    progression: {
      easier: 'Utilise une assise plus haute, ou pose-toi vraiment entre chaque répétition.',
      harder:
        'Descends vers une assise plus basse, ralentis à cinq secondes, ou marque trois secondes d’arrêt en bas.',
      readyWhen:
        'Quand trois séries de quinze passent sans que les genoux rentrent et sans appui des mains, baisse l’assise.',
    },
    precautions:
      'Si le genou est douloureux, réduis la profondeur plutôt que le nombre de répétitions : une amplitude partielle indolore vaut mieux qu’une amplitude complète qui fait mal.',
  },

  calf: {
    slug: 'mollets-debout',
    muscles: { primary: 'Mollets (gastrocnémiens, soléaire)' },
    steps: [
      'Tiens-toi debout, pieds à la largeur des hanches, éventuellement en appui léger sur un mur ou une chaise pour l’équilibre.',
      'Monte sur la pointe des pieds en 3 secondes, en poussant à travers le gros orteil.',
      'Marque un temps d’arrêt en haut, mollets bien contractés.',
      'Redescends en 3 secondes jusqu’à reposer les talons au sol.',
    ],
    mistakes: [
      'Mouvement trop rapide : la lenteur est ce qui fait travailler le muscle.',
      'Rebondir en bas au lieu de contrôler toute l’amplitude.',
      'Chevilles qui roulent vers l’extérieur ou l’intérieur en montant.',
    ],
    sensation:
      'Une contraction nette dans le mollet, du talon jusque sous le genou. Si l’effort se déplace vers l’avant du tibia ou vers l’extérieur de la cheville, c’est que le pied roule au lieu de pousser dans l’axe.',
    rangeOfMotion:
      'Monte aussi haut que la cheville le permet sans que le pied bascule vers l’extérieur, puis redescends jusqu’à ce que le talon touche le sol. Écourter le bas du mouvement est l’erreur la plus courante : c’est pourtant là que le muscle s’allonge sous tension.',
    tempo:
      'Trois secondes pour monter, une seconde de contraction en haut, trois secondes pour redescendre. C’est le seul exercice de la liste où la lenteur ne rend pas seulement plus difficile : elle est la charge, puisque le poids du corps seul ne suffirait pas.',
    anatomy:
      'Deux muscles se partagent le travail. Le gastrocnémien, superficiel et visible, croise le genou et travaille surtout jambe tendue ; le soléaire, situé dessous, travaille davantage genou fléchi. Ils convergent tous deux sur le tendon d’Achille pour produire l’extension de la cheville.',
    mechanics:
      'Flexion plantaire de la cheville dans le plan sagittal, en chaîne fermée (le pied reste au sol). Montée concentrique, descente excentrique. L’amplitude articulaire est courte : c’est la durée sous tension, pas la distance parcourue, qui produit l’effet.',
    benefits: [
      'Le mollet est le premier propulseur de la marche et de la montée d’escalier : le renforcer améliore directement l’endurance à la marche.',
      'Renforce le tendon d’Achille et la cheville, deux structures qui perdent vite en tolérance après une période d’inactivité.',
      'Contribue à l’équilibre en station debout, la cheville étant la première articulation à corriger un déséquilibre.',
    ],
    progression: {
      easier: 'Garde deux doigts en appui sur un mur, ou réduis la hauteur de montée.',
      harder:
        'Passe sur une jambe à la fois, ou place l’avant du pied sur une marche pour descendre le talon sous le niveau de l’orteil.',
      readyWhen:
        'Quand trois séries de vingt passent en tempo lent sans appui des mains, passe à une jambe.',
    },
  },

  wallsit: {
    slug: 'wall-sit',
    muscles: { primary: 'Quadriceps', secondary: 'Fessiers, gainage' },
    steps: [
      'Adosse-toi à un mur, pieds écartés à la largeur des hanches, à environ un pas du mur.',
      'Glisse le dos le long du mur jusqu’à ce que les cuisses soient parallèles au sol, genoux à 90°.',
      'Garde le dos entièrement plaqué au mur et les genoux alignés avec les chevilles.',
      'Maintiens la position en respirant normalement, sans bloquer la respiration.',
      'Remonte en poussant dans les talons pour sortir de la position.',
    ],
    mistakes: [
      'Genoux qui dépassent la pointe des pieds : trop de pression sur les articulations.',
      'Dos qui décolle du mur : perd le soutien et charge le bas du dos.',
      'Angle trop fermé si ça tire dans le genou : ouvrir à 120° plutôt que forcer à 90°.',
    ],
    sensation:
      'Une brûlure progressive à l’avant des cuisses, qui monte régulièrement jusqu’à la fin du temps. Une douleur ponctuelle dans le genou, elle, n’est pas le signal attendu : il faut ouvrir l’angle.',
    rangeOfMotion:
      'L’angle du genou fixe la difficulté : 90° est la version de référence, 120° une version nettement plus accessible. Les genoux restent au-dessus des chevilles, jamais projetés devant les orteils, et le dos garde le contact avec le mur sur toute sa longueur.',
    tempo:
      'Pas de tempo : c’est un maintien. Respire normalement et à voix haute si besoin pour vérifier que tu ne bloques pas la respiration — c’est le réflexe le plus courant sur un exercice isométrique, et il fait monter la tension artérielle inutilement.',
    anatomy:
      'Les quadriceps travaillent en isométrie pour empêcher le genou de se fléchir davantage sous le poids du corps. Les fessiers et les ischio-jambiers participent au maintien de la hanche, et les abdominaux stabilisent le bassin contre le mur.',
    mechanics:
      'Contraction isométrique : le muscle produit une force sans changer de longueur et sans que l’articulation bouge. Le mur supprime l’exigence d’équilibre, ce qui permet de charger les cuisses sans la coordination que demanderait un squat maintenu à vide.',
    benefits: [
      'Développe l’endurance de force des cuisses, celle qui manque dans une descente d’escalier ou une station debout prolongée.',
      'Charge les quadriceps sans mouvement articulaire, ce qui en fait souvent une option tolérable quand un mouvement complet ne l’est pas encore.',
      'Le progrès se mesure en secondes, une unité plus lisible que « une répétition de plus » pour suivre une reprise.',
    ],
    progression: {
      easier: 'Ouvre l’angle du genou à 110-120°, ou fractionne en deux maintiens plus courts.',
      harder: 'Descends vers 90°, allonge la durée, ou décolle légèrement un talon puis l’autre.',
      readyWhen:
        'Quand trois maintiens de soixante secondes à 90° passent sans que le dos décolle, allonge encore ou passe à une charge dynamique.',
    },
    precautions:
      'Si le genou tire, ouvre l’angle avant toute autre chose. Cet exercice est facile à rendre plus doux, il n’y a aucun intérêt à le subir tel quel.',
  },

  rotation: {
    slug: 'rotation-externe-epaule',
    muscles: { primary: 'Coiffe des rotateurs (épaule)' },
    steps: [
      'Allonge-toi sur le côté, coude plié à 90° et collé contre les côtes, une petite charge légère en main (bouteille d’eau).',
      'Garde l’avant-bras posé devant le ventre, c’est la position de départ.',
      'Fais pivoter l’avant-bras vers le haut, coude toujours collé au corps, sans bouger l’épaule.',
      'Marque un temps d’arrêt en haut du mouvement.',
      'Redescends avec contrôle jusqu’à la position de départ.',
    ],
    mistakes: [
      'Coude qui se décolle des côtes : transfère l’effort ailleurs que l’épaule.',
      'Charge trop lourde : ce mouvement cible un petit muscle, la charge reste légère.',
      'Amplitude trop grande, forcée au-delà du confort de l’épaule.',
    ],
    sensation:
      'Un travail discret à l’arrière et au-dessus de l’épaule, jamais spectaculaire. Si tu le sens dans le trapèze ou dans la nuque, l’épaule remonte ; si tu le sens dans le biceps, la charge est trop lourde et le bras tire au lieu de pivoter.',
    rangeOfMotion:
      'Pivote seulement jusqu’où l’épaule va sans que le coude quitte les côtes, souvent bien moins loin qu’on ne l’imagine. L’amplitude utile de ce mouvement est courte : la dépasser fait travailler autre chose.',
    tempo:
      'Deux secondes dans chaque sens, sans à-coup, avec une pause d’une seconde en haut. C’est un exercice de contrôle, pas de puissance : la vitesse ruine son intérêt.',
    anatomy:
      'La coiffe des rotateurs regroupe quatre muscles profonds qui tiennent la tête de l’humérus centrée dans son articulation. Ce mouvement cible surtout l’infra-épineux et le petit rond, les deux rotateurs externes. Le deltoïde, plus superficiel, ne doit justement pas prendre le relais.',
    mechanics:
      'Rotation externe de l’épaule dans le plan transverse, coude fixé à 90°. Le coude collé au corps sert de verrou mécanique : il empêche l’épaule de compenser par une abduction, ce qui reporterait l’effort sur le deltoïde.',
    benefits: [
      'Entretient les stabilisateurs profonds de l’épaule, souvent négligés parce qu’ils ne se voient pas et ne produisent pas de sensation forte.',
      'Contrebalance la position enroulée vers l’avant qu’installent le travail assis et l’usage prolongé d’un écran.',
      'Prépare l’épaule à supporter les mouvements de poussée : c’est un exercice d’entretien, pas de performance.',
    ],
    progression: {
      easier: 'Fais-le sans aucune charge, main vide, en cherchant seulement l’amplitude et le contrôle.',
      harder:
        'Passe à une bouteille légèrement plus lourde, ou allonge le temps de pause en haut. Reste modeste sur la charge : ce muscle est petit.',
      readyWhen:
        'Quand trois séries de quinze passent sans que le coude décolle et sans compensation du trapèze.',
    },
    precautions:
      'Aucune douleur ne doit apparaître dans l’épaule. Si c’est le cas, réduis d’abord l’amplitude, puis la charge ; si elle persiste, cet exercice n’est pas celui qui manque à ta séance.',
  },

  deadbug: {
    slug: 'dead-bug',
    muscles: { primary: 'Gainage profond (transverse)', secondary: 'Hanches' },
    steps: [
      'Allonge-toi sur le dos, bras tendus vers le plafond, hanches et genoux pliés à 90°.',
      'Plaque le bas du dos contre le sol et garde-le collé pendant tout le mouvement.',
      'Descends lentement un bras derrière la tête et la jambe opposée vers le sol, sans les toucher.',
      'Reviens à la position de départ avec contrôle.',
      'Répète de l’autre côté.',
    ],
    mistakes: [
      'Bas du dos qui se décolle du sol : signe que l’amplitude est trop grande.',
      'Mouvement trop rapide : perd le contrôle et l’engagement du gainage.',
      'Respiration bloquée : continue à respirer normalement pendant l’effort.',
    ],
    sensation:
      'Une tension profonde et continue dans le bas-ventre, sous le nombril. Si le bas du dos se creuse ou tire, l’amplitude dépasse ce que le gainage tient : c’est le signal d’arrêt, pas un détail.',
    rangeOfMotion:
      'Descends bras et jambe seulement jusqu’au point où le bas du dos reste plaqué au sol. Ce point est personnel et se déplace avec les semaines — c’est lui l’unité de mesure, pas la distance au sol.',
    tempo:
      'Trois à quatre secondes par répétition, sans jamais accélérer. Souffle en tendant, inspire en revenant : l’expiration aide mécaniquement à maintenir les côtes basses et le dos plaqué.',
    anatomy:
      'Le transverse de l’abdomen, muscle le plus profond de la sangle, agit comme une ceinture qui stabilise le bassin. Les obliques résistent à la rotation induite par le mouvement croisé, et le grand droit maintient la cage thoracique vers le bas. Les fléchisseurs de hanche travaillent en contrôle du côté de la jambe tendue.',
    mechanics:
      'C’est un exercice d’anti-extension : le rôle du gainage n’est pas de produire un mouvement mais d’en empêcher un — ici l’extension du bas du dos provoquée par le poids des membres qui s’éloignent. Le mouvement croisé ajoute une résistance à la rotation.',
    benefits: [
      'Enseigne le rôle réel du gainage — stabiliser plutôt que fléchir —, ce qu’aucun mouvement d’abdominaux classique ne fait aussi clairement.',
      'Sollicite le bas du dos sans le mettre en compression, contrairement aux relevés de buste répétés.',
      'Se transfère directement à la marche et à la course, où bras et jambes opposés travaillent déjà en alternance.',
    ],
    progression: {
      easier:
        'Ne bouge qu’un membre à la fois, bras seul ou jambe seule, en gardant l’autre en position.',
      harder:
        'Tends complètement la jambe au ras du sol, ralentis encore, ou marque deux secondes en position basse.',
      readyWhen:
        'Quand trois séries de dix par côté passent avec le bas du dos qui ne décolle jamais et une jambe tendue à quelques centimètres du sol.',
    },
  },

  plank: {
    slug: 'planche',
    muscles: { primary: 'Gainage (abdominaux, lombaires)', secondary: 'Épaules' },
    steps: [
      'Place les avant-bras au sol, coudes sous les épaules, et étends les jambes en arrière.',
      'Aligne le corps en ligne droite des talons à la tête.',
      'Serre les fessiers et rentre légèrement le nombril pour verrouiller le gainage.',
      'Maintiens la position en respirant normalement, regard vers le sol.',
    ],
    mistakes: [
      'Bassin qui monte (position en pic) : réduit le travail des abdominaux.',
      'Bassin qui s’affaisse : charge le bas du dos, c’est le signal d’arrêter la série.',
      'Retenir sa respiration au lieu de respirer normalement.',
    ],
    sensation:
      'Une tension répartie sur toute la sangle abdominale et dans les fessiers. Si la charge se déplace vers le bas du dos ou vers les épaules, la position s’est dégradée : le maintien n’a plus d’intérêt, il vaut mieux arrêter la série.',
    rangeOfMotion:
      'Pas d’amplitude : c’est la qualité de l’alignement qui compte. Une ligne droite des talons à la tête, ni bassin en pic ni bassin affaissé, regard vers le sol pour garder la nuque dans le prolongement du dos.',
    tempo:
      'Maintien continu, respiration normale et audible. Le critère d’arrêt n’est pas le chronomètre mais la position : dès que le bassin part, la série est finie, même s’il restait dix secondes.',
    anatomy:
      'Le transverse et le grand droit tiennent la cage thoracique et le bassin alignés, les obliques empêchent la rotation. Les fessiers extendent légèrement la hanche pour supprimer la cambrure, et le dentelé antérieur maintient les omoplates plaquées. Les érecteurs du rachis travaillent en co-contraction avec les abdominaux.',
    mechanics:
      'Exercice isométrique d’anti-extension : la gravité tire le bassin vers le sol, la sangle abdominale l’en empêche. Aucune articulation ne bouge, ce qui rend la position très dépendante de l’alignement — quelques degrés de bassin changent complètement quel muscle porte la charge.',
    benefits: [
      'Développe l’endurance du gainage, celle qui protège le dos en position debout prolongée ou lors du port de charge.',
      'N’implique aucune flexion répétée de la colonne, contrairement aux abdominaux classiques.',
      'Le maintien apprend à respirer sous tension, un réflexe utile dans tous les autres exercices.',
    ],
    progression: {
      easier: 'Pose les genoux au sol, ou place les avant-bras sur une surface surélevée.',
      harder: 'Allonge la durée, ou décolle brièvement un pied puis l’autre en gardant le bassin immobile.',
      readyWhen:
        'Quand trois maintiens de quarante-cinq secondes passent sans dégradation de la position, allonge ou complexifie.',
    },
    precautions:
      'Ne pas retenir sa respiration. Si le bas du dos tire, la position s’est déjà affaissée : redescends et recommence plutôt que de tenir coûte que coûte.',
  },

  walk: {
    slug: 'marche',
    muscles: { primary: 'Cardio, jambes' },
    steps: [
      'Choisis un rythme soutenu où parler reste possible mais devient un peu essoufflé.',
      'Garde le buste droit, le regard loin devant, les épaules relâchées.',
      'Laisse les bras balancer naturellement au rythme des pas.',
      'Maintiens ce rythme sur toute la durée prévue, en variant le terrain si possible.',
    ],
    mistakes: [
      'Rythme trop lent pour avoir un effet cardio réel.',
      'Regard rivé au sol ou au téléphone : nuit à la posture.',
      'Chaussures inadaptées sur terrain irrégulier.',
    ],
    sensation:
      'Un essoufflement modéré : tu dois pouvoir tenir une conversation, mais pas chanter. C’est le repère le plus fiable pour régler l’intensité sans matériel de mesure.',
    rangeOfMotion:
      'Pas d’amplitude à régler, mais une foulée : pose le talon, déroule le pied, pousse avec l’avant. Les bras balancent librement à partir de l’épaule, sans être bloqués dans des poches.',
    tempo:
      'Un rythme régulier et soutenu, tenu sur toute la durée, plutôt que des accélérations suivies de pauses. La régularité est ce qui construit la base d’endurance.',
    anatomy:
      'Tous les muscles de la chaîne postérieure participent en alternance : fessiers et ischio-jambiers pour propulser, quadriceps pour amortir, mollets pour la poussée finale. Le gainage stabilise le bassin à chaque appui unipodal, et les muscles du pied gèrent l’amorti.',
    mechanics:
      'Locomotion cyclique en chaîne fermée alternée : chaque jambe passe par une phase d’appui puis une phase oscillante. Contrairement à la course, un pied reste toujours au sol — c’est cette absence de phase aérienne qui supprime l’impact et rend la marche accessible en reprise.',
    benefits: [
      'Développe la capacité cardiovasculaire sans impact articulaire, ce qui la rend praticable quasiment tous les jours.',
      'Reste la seule activité de cette liste qui se cumule naturellement avec le quotidien : trajets, courses, escaliers.',
      'Améliore la récupération entre les séances de renforcement plutôt que d’ajouter de la fatigue.',
    ],
    progression: {
      easier: 'Réduis la durée avant de réduire le rythme : mieux vaut dix minutes soutenues que trente traînées.',
      harder: 'Allonge la durée, cherche du dénivelé, ou augmente légèrement l’allure sur des portions.',
      readyWhen:
        'Quand trente minutes passent sans essoufflement notable, cherche du dénivelé plutôt que de la durée supplémentaire.',
    },
  },

  kneePushup: {
    slug: 'pompes-genoux',
    muscles: { primary: 'Pectoraux, triceps', secondary: 'Épaules, gainage' },
    steps: [
      'Mets-toi à quatre pattes puis avance les mains un peu plus larges que les épaules.',
      'Croise les chevilles et garde les genoux au sol comme point d’appui.',
      'Aligne le corps en ligne droite des genoux à la tête, sans casser au niveau des hanches.',
      'Plie les coudes à environ 45° du corps et descends la poitrine près du sol.',
      'Pousse pour remonter, sans verrouiller les coudes brutalement.',
    ],
    mistakes: [
      'Hanches trop hautes ou trop basses : casse l’alignement du buste.',
      'Coudes écartés à 90° : sollicite trop les épaules.',
      'Descente incomplète : réduit l’efficacité du mouvement.',
    ],
    sensation:
      'Pectoraux et triceps, avec un gainage qui travaille du bassin aux épaules. Une gêne dans le poignet vient presque toujours d’un appui trop en arrière : les mains doivent être sous les épaules, pas devant.',
    rangeOfMotion:
      'Descends jusqu’à ce que la poitrine soit à un poing du sol. Si l’amplitude complète fait perdre l’alignement, réduis-la : une demi-amplitude propre construit davantage qu’une amplitude complète en cassant au niveau des hanches.',
    tempo:
      'Deux secondes en descente, une en remontée, sans temps mort en bas pour garder la tension. Inspire en descendant, souffle en poussant.',
    anatomy:
      'Mêmes moteurs que la pompe classique — grand pectoral, triceps brachial, deltoïde antérieur — mais avec un bras de levier raccourci. Le dentelé antérieur stabilise l’omoplate, les abdominaux et les fessiers empêchent le bassin de s’affaisser.',
    mechanics:
      'Poussée horizontale, comme la pompe inclinée, mais l’appui au genou raccourcit le levier : la portion du poids du corps réellement soulevée diminue d’environ un tiers. C’est une régression du levier, pas de l’amplitude — la différence est importante, car l’amplitude reste complète.',
    benefits: [
      'Permet de travailler l’amplitude complète d’une pompe alors que la version au sol n’est pas encore accessible.',
      'Charge le gainage sur un segment plus court, donc plus facile à tenir aligné en fin de série.',
      'Constitue l’étape intermédiaire naturelle entre la pompe inclinée et la pompe au sol.',
    ],
    progression: {
      easier: 'Reviens à une pompe inclinée sur un appui haut, où le gainage est moins sollicité.',
      harder: 'Avance les genoux pour allonger le levier, ou passe à la pompe au sol.',
      readyWhen:
        'Quand trois séries de douze passent avec un corps parfaitement aligné des genoux à la tête, tente une pompe au sol.',
    },
    precautions:
      'Place un coussin ou un tapis sous les genoux : l’inconfort au sol dur écourte la série avant que le muscle ne fatigue.',
  },

  wallPushup: {
    slug: 'pompes-contre-le-mur',
    muscles: { primary: 'Pectoraux, triceps', secondary: 'Épaules' },
    steps: [
      'Place les mains sur un mur, un peu plus larges que les épaules, à hauteur de poitrine.',
      'Recule les pieds pour incliner le corps, en ligne droite des chevilles à la tête.',
      'Plie les coudes et rapproche la poitrine du mur avec contrôle.',
      'Pousse pour revenir à la position de départ.',
    ],
    mistakes: [
      'Pieds trop proches du mur : réduit l’intensité de l’exercice.',
      'Dos qui se cambre pendant la descente.',
      'Mouvement trop rapide, sans temps de contrôle en bas.',
    ],
    sensation:
      'Un travail léger mais net dans les pectoraux et les triceps. Si tu ne sens presque rien, recule les pieds : c’est l’inclinaison, et elle seule, qui règle l’intensité.',
    rangeOfMotion:
      'Approche la poitrine jusqu’à quelques centimètres du mur, puis repousse jusqu’à bras tendus sans verrouiller sèchement. L’amplitude complète est facile à obtenir ici : c’est justement l’intérêt de cette version.',
    tempo:
      'Deux secondes dans chaque sens. La faible intensité rend la lenteur d’autant plus utile : c’est elle qui rend l’exercice suffisamment exigeant pour produire un effet.',
    anatomy:
      'Grand pectoral, triceps brachial et deltoïde antérieur, exactement comme les autres variantes de pompe. Le gainage intervient peu, l’angle étant très proche de la verticale.',
    mechanics:
      'Poussée horizontale à inclinaison très faible : plus le corps est proche de la verticale, plus la fraction du poids du corps à déplacer est réduite. C’est l’extrémité la plus accessible du même continuum que la pompe inclinée puis la pompe au sol.',
    benefits: [
      'Rend le mouvement de pompe praticable dès le premier jour, quel que soit le niveau de départ.',
      'Permet d’apprendre le placement des coudes et l’alignement du corps sans être limité par la force.',
      'Se pratique partout, sans matériel ni sol au propre, ce qui en fait un bon exercice de reprise progressive.',
    ],
    progression: {
      easier: 'Rapproche les pieds du mur, jusqu’à être presque debout.',
      harder: 'Recule les pieds, puis passe à un appui plus bas : plan de travail, puis chaise.',
      readyWhen:
        'Quand trois séries de quinze passent facilement, passe à un appui plus bas plutôt que d’ajouter des répétitions.',
    },
  },

  chairDips: {
    slug: 'dips-triceps-sur-chaise',
    muscles: { primary: 'Triceps', secondary: 'Épaules, pectoraux' },
    steps: [
      'Assieds-toi sur le bord d’une chaise stable, mains posées de chaque côté des hanches.',
      'Avance les fesses hors de la chaise, jambes tendues ou légèrement pliées devant toi.',
      'Plie les coudes vers l’arrière pour descendre le buste, sans dépasser 90°.',
      'Pousse dans les mains pour remonter jusqu’à l’extension des bras.',
    ],
    mistakes: [
      'Descendre trop bas : met une pression excessive sur les épaules.',
      'Épaules qui remontent vers les oreilles au lieu de rester basses.',
      'Chaise instable ou qui glisse : vérifie l’appui avant de commencer.',
    ],
    sensation:
      'L’arrière du bras, nettement. Une tension à l’avant de l’épaule signifie que la descente est allée trop bas ou que les épaules se sont enroulées vers l’avant : c’est la limite à ne pas franchir sur cet exercice.',
    rangeOfMotion:
      'Descends jusqu’à ce que le coude atteigne environ 90°, pas au-delà. C’est le seul exercice de cette bibliothèque où l’amplitude maximale n’est pas souhaitable : au-delà de 90°, la contrainte sur l’avant de l’épaule augmente rapidement pour un gain minime.',
    tempo:
      'Deux secondes en descente, une en remontée. Garde les épaules basses et éloignées des oreilles pendant tout le mouvement.',
    anatomy:
      'Le triceps brachial est le moteur principal : il étend le coude. Le grand pectoral dans sa portion basse et le deltoïde antérieur assistent, et les muscles de l’omoplate travaillent pour empêcher l’épaule de s’enrouler.',
    mechanics:
      'Extension de coude en chaîne fermée, le corps se déplaçant autour de mains fixes. La position des jambes règle la charge : plus elles sont tendues loin, plus la part du poids du corps supportée par les bras augmente.',
    benefits: [
      'Cible le triceps plus directement que les variantes de pompe, où le pectoral prend une grande part du travail.',
      'Renforce la capacité à se relever d’un appui bas — sortir d’un bain, se relever d’un fauteuil profond.',
      'Se dose sans matériel en avançant ou reculant simplement les pieds.',
    ],
    progression: {
      easier: 'Rapproche les pieds du corps, genoux pliés : la charge sur les bras diminue nettement.',
      harder: 'Tends les jambes plus loin, ou pose les talons sur un second appui à la même hauteur.',
      readyWhen: 'Quand trois séries de douze passent jambes tendues sans que les épaules s’enroulent.',
    },
    precautions:
      'Exercice exigeant pour l’avant de l’épaule. En cas d’antécédent ou de gêne à cet endroit, réduis franchement l’amplitude ou remplace-le par une variante de pompe.',
  },

  armCircles: {
    slug: 'moulinets-de-bras',
    muscles: { primary: 'Épaules', secondary: 'Haut du dos' },
    steps: [
      'Tiens-toi debout, bras tendus à l’horizontale de chaque côté du corps.',
      'Dessine de petits cercles réguliers avec les bras, épaules basses et relâchées.',
      'Poursuis pendant la durée prévue, puis inverse le sens de rotation.',
    ],
    mistakes: [
      'Épaules qui remontent vers les oreilles pendant le mouvement.',
      'Cercles trop grands ou trop rapides : perd le contrôle.',
      'Dos qui se cambre pour compenser la fatigue des épaules.',
    ],
    sensation:
      'Une brûlure qui s’installe progressivement sur le dessus et l’arrière de l’épaule. Si les trapèzes prennent le relais et que les épaules montent vers les oreilles, ralentis ou réduis le diamètre des cercles.',
    rangeOfMotion:
      'Des cercles petits et réguliers, de la taille d’une assiette, pas de grands moulinets. L’amplitude n’est pas l’objectif : c’est la durée sous tension, bras maintenus à l’horizontale contre la gravité.',
    tempo:
      'Rythme constant et lent, respiration normale. Change de sens à la moitié du temps pour équilibrer le travail entre les portions antérieure et postérieure du deltoïde.',
    anatomy:
      'Le deltoïde, dans ses trois portions, maintient le bras à l’horizontale — c’est un travail d’endurance en abduction. Le sus-épineux participe au maintien, et les trapèzes inférieurs et moyens stabilisent l’omoplate. Les trapèzes supérieurs doivent rester relâchés.',
    mechanics:
      'Maintien statique en abduction d’épaule avec une composante circulaire dans le plan frontal et transverse. Le bras agit comme un levier long : plus il est tendu, plus le couple à supporter à l’épaule est important, sans qu’aucune charge externe ne soit nécessaire.',
    benefits: [
      'Développe l’endurance des épaules, très sollicitée dans tous les gestes bras levés du quotidien.',
      'Sert d’échauffement efficace avant tout exercice de poussée.',
      'Ne nécessite aucun matériel ni aucun sol : praticable dans n’importe quel espace debout.',
    ],
    progression: {
      easier: 'Réduis la durée, ou fléchis légèrement les coudes pour raccourcir le levier.',
      harder: 'Allonge la durée, ou tiens une petite bouteille d’eau dans chaque main.',
      readyWhen: 'Quand une minute par sens passe sans que les épaules remontent, ajoute une charge légère.',
    },
  },

  wallSlides: {
    slug: 'glisses-au-mur',
    muscles: { primary: 'Épaules, haut du dos' },
    steps: [
      'Adosse-toi à un mur, bas du dos, haut du dos et tête en contact avec le mur.',
      'Place les bras en « W », coudes et poignets contre le mur.',
      'Fais glisser les bras vers le haut en gardant le contact avec le mur, jusqu’à un « Y ».',
      'Redescends avec contrôle jusqu’à la position de départ.',
    ],
    mistakes: [
      'Bas du dos qui se cambre et décolle du mur.',
      'Coudes ou poignets qui perdent le contact avec le mur en montant.',
      'Forcer l’amplitude au-delà de ce que l’épaule permet sans douleur.',
    ],
    sensation:
      'Un travail entre les omoplates et à l’arrière des épaules, souvent accompagné d’une sensation d’étirement à l’avant de la poitrine. C’est précisément l’effet recherché : ouvrir devant, activer derrière.',
    rangeOfMotion:
      'Monte aussi haut que possible en gardant coudes et poignets au contact du mur. Le point où le contact se perd est ta limite du jour — la dépasser en décollant les bras supprime tout l’intérêt de l’exercice.',
    tempo:
      'Trois secondes pour monter, trois pour descendre. Le mur sert de contrainte : c’est lui qui empêche les compensations, à condition de rester lent.',
    anatomy:
      'Les trapèzes inférieurs et moyens ainsi que les rhomboïdes rapprochent et abaissent les omoplates. Les rotateurs externes de l’épaule maintiennent la position en W. À l’opposé, le petit pectoral et les fléchisseurs d’épaule sont mis en étirement.',
    mechanics:
      'Combinaison d’élévation et de rotation de l’omoplate, coordonnée avec une abduction d’épaule dans le plan frontal. Le mur impose un plan de référence : il rend visible et impossible à ignorer toute compensation par cambrure ou par enroulement des épaules.',
    benefits: [
      'Contrebalance directement la posture enroulée installée par la position assise prolongée.',
      'Restaure la mobilité d’épaule nécessaire avant tout travail de poussée au-dessus de la tête.',
      'Le mur fournit un retour immédiat sur la qualité d’exécution, sans avoir besoin d’un miroir ni d’un regard extérieur.',
    ],
    progression: {
      easier:
        'Écarte légèrement les pieds du mur et fléchis les genoux : cela réduit la cambrure et rend le contact plus facile à tenir.',
      harder: 'Ralentis encore, ou marque deux secondes d’arrêt au point le plus haut.',
      readyWhen: 'Quand l’amplitude complète passe sans que les coudes décollent, ajoute le temps d’arrêt.',
    },
    precautions:
      'La perte de contact avec le mur n’est pas un échec mais une information : c’est ta mobilité actuelle. Forcer au-delà en cambrant ne fait pas progresser cette mobilité.',
  },

  superman: {
    slug: 'superman',
    muscles: { primary: 'Lombaires, fessiers', secondary: 'Haut du dos' },
    steps: [
      'Allonge-toi sur le ventre, bras tendus devant toi, jambes tendues derrière.',
      'Regarde le sol pour garder la nuque neutre pendant tout le mouvement.',
      'Lève simultanément les bras, la poitrine et les jambes de quelques centimètres.',
      'Marque un temps d’arrêt en haut, puis redescends avec contrôle.',
    ],
    mistakes: [
      'Relever la tête au lieu de garder le regard vers le sol : comprime la nuque.',
      'Monter trop haut, trop vite, par à-coups plutôt qu’avec contrôle.',
      'Retenir sa respiration pendant l’effort.',
    ],
    sensation:
      'Une contraction dans le bas du dos et les fessiers. Une compression douloureuse dans les lombaires, en revanche, signifie que tu montes trop haut : la hauteur n’est pas le critère de réussite.',
    rangeOfMotion:
      'Quelques centimètres suffisent. L’objectif est une extension légère et contrôlée, pas une cambrure maximale — les dernières amplitudes n’ajoutent pas de travail musculaire, seulement de la compression articulaire.',
    tempo:
      'Deux secondes pour monter, une seconde de maintien, deux secondes pour redescendre. Souffle en montant. Le regard reste dirigé vers le sol du début à la fin.',
    anatomy:
      'Les érecteurs du rachis, longs muscles de part et d’autre de la colonne, produisent l’extension. Le grand fessier et les ischio-jambiers extendent la hanche du côté des jambes, et les trapèzes inférieurs participent du côté des bras.',
    mechanics:
      'Extension simultanée de la colonne et des hanches, contre la gravité, en position ventrale. Le mouvement est concentrique à la montée, excentrique à la descente. Sans matériel, c’est l’un des rares moyens de solliciter directement la chaîne postérieure.',
    benefits: [
      'Renforce le bas du dos, souvent négligé alors que c’est précisément la zone qui se plaint après une période sédentaire.',
      'Travaille la chaîne postérieure complète, celle que la position assise raccourcit et affaiblit.',
      'Ne demande ni matériel ni appui : praticable partout où l’on peut s’allonger.',
    ],
    progression: {
      easier:
        'Lève seulement les bras, ou seulement les jambes, plutôt que les deux ensemble.',
      harder: 'Allonge le temps de maintien en haut, ou lève bras et jambe opposés en alternance.',
      readyWhen: 'Quand trois séries de douze passent sans compression dans le bas du dos.',
    },
    precautions:
      'Relever la tête pour regarder devant comprime la nuque : garde le regard au sol. En cas de douleur lombaire installée, cet exercice n’est pas le bon point de départ.',
  },

  reverseSnowAngel: {
    slug: 'ange-inverse-au-sol',
    muscles: { primary: 'Haut du dos, épaules' },
    steps: [
      'Allonge-toi sur le ventre, bras tendus devant toi, paumes vers le sol.',
      'Lève légèrement la poitrine et les bras du sol.',
      'Écarte les bras vers l’extérieur en un grand arc jusqu’aux hanches, comme un ange à l’envers.',
      'Ramène les bras vers l’avant en suivant le même arc, avec contrôle.',
    ],
    mistakes: [
      'Lever la poitrine trop haut : cambre excessivement le bas du dos.',
      'Mouvement saccadé plutôt qu’un arc large et continu.',
      'Épaules qui remontent vers les oreilles pendant le geste.',
    ],
    sensation:
      'Un travail concentré entre les omoplates et à l’arrière des épaules, avec une sensation d’ouverture à l’avant de la poitrine. C’est l’un des rares exercices sans matériel qui atteigne vraiment cette zone.',
    rangeOfMotion:
      'Le grand arc va des bras tendus devant jusqu’aux hanches, en restant le plus près possible du sol sans le toucher. L’amplitude utile s’arrête là où l’épaule commence à s’enrouler vers l’avant.',
    tempo:
      'Lent et continu, environ trois secondes par trajet. Ce n’est pas un exercice de force mais de contrôle sur une amplitude longue : la vitesse ferait travailler l’élan plutôt que les muscles.',
    anatomy:
      'Les trapèzes moyens et inférieurs ainsi que les rhomboïdes rapprochent les omoplates. Le deltoïde postérieur travaille sur toute la trajectoire, et les rotateurs externes maintiennent l’orientation du bras. Les érecteurs du rachis maintiennent la poitrine légèrement décollée.',
    mechanics:
      'Adduction et abduction horizontale d’épaule en position ventrale, la gravité résistant sur toute la trajectoire. Contrairement à un mouvement debout où la résistance varie fortement selon l’angle, la position au sol maintient une résistance relativement constante d’un bout à l’autre de l’arc.',
    benefits: [
      'Cible le haut du dos, la zone la plus difficile à atteindre sans barre de traction ni élastique.',
      'Complète directement les glissés au mur pour réoccuper l’amplitude d’épaule perdue en position assise.',
      'Travaille l’endurance posturale plutôt que la force maximale, ce qui correspond à l’usage réel de ces muscles.',
    ],
    progression: {
      easier: 'Fléchis les coudes pour raccourcir le levier, ou réduis l’arc parcouru.',
      harder: 'Tends complètement les bras, ralentis, ou marque une pause aux deux extrémités de l’arc.',
      readyWhen: 'Quand trois séries de douze passent bras tendus sans que les épaules s’enroulent.',
    },
  },

  birdDog: {
    slug: 'chien-oiseau',
    muscles: { primary: 'Gainage, lombaires', secondary: 'Fessiers, épaules' },
    steps: [
      'Place-toi à quatre pattes, mains sous les épaules, genoux sous les hanches.',
      'Engage le gainage pour garder le dos plat, dans le prolongement de la tête.',
      'Tends simultanément un bras devant toi et la jambe opposée derrière toi.',
      'Marque un temps d’arrêt en gardant les hanches immobiles et de niveau.',
      'Reviens à la position de départ et répète de l’autre côté.',
    ],
    mistakes: [
      'Bassin qui pivote ou penche d’un côté pendant l’extension.',
      'Bas du dos qui se cambre pour gagner en amplitude.',
      'Mouvement trop rapide : la stabilité compte plus que la vitesse.',
    ],
    sensation:
      'Un travail profond de stabilisation dans le tronc et le fessier de la jambe tendue, plus qu’une sensation de force dans les membres eux-mêmes. Si tu ne sens rien dans le tronc, c’est probablement que le bassin bouge et absorbe le travail.',
    rangeOfMotion:
      'Tends bras et jambe jusqu’à l’horizontale, pas plus haut. Monter davantage la jambe cambre le bas du dos sans rien ajouter — l’horizontale est la limite utile.',
    tempo:
      'Deux secondes pour tendre, une à deux secondes de maintien, deux secondes pour revenir. Le maintien est la partie qui compte : c’est là que la stabilisation travaille réellement.',
    anatomy:
      'Les érecteurs du rachis et le multifide, muscle profond segmentaire de la colonne, maintiennent le dos neutre. Les obliques résistent à la rotation du bassin, le grand fessier extend la hanche, et le deltoïde avec les trapèzes inférieurs maintiennent le bras à l’horizontale.',
    mechanics:
      'Exercice d’anti-rotation et d’anti-extension : le poids des membres opposés crée un couple qui tend à faire pivoter et cambrer le tronc, et tout le travail consiste à l’en empêcher. C’est un contrôle moteur croisé, le même schéma que celui de la marche.',
    benefits: [
      'Renforce la stabilité lombaire sans aucune charge en compression sur la colonne, ce qui le rend souvent bien toléré en reprise.',
      'Entraîne la coordination croisée bras-jambe opposés, directement transférable à la marche.',
      'Révèle immédiatement les asymétries : un côté sera souvent nettement moins stable que l’autre.',
    ],
    progression: {
      easier: 'Ne tends qu’un membre à la fois, bras seul puis jambe seule.',
      harder:
        'Allonge le maintien, ou ajoute un rapprochement coude-genou sous le corps entre chaque extension.',
      readyWhen:
        'Quand dix répétitions par côté passent avec un bassin parfaitement immobile, allonge le maintien à cinq secondes.',
    },
    precautions:
      'Un tapis ou un coussin sous les genoux évite que l’inconfort articulaire n’écourte la série avant la fatigue musculaire.',
  },

  catCow: {
    slug: 'chat-vache',
    muscles: { primary: 'Colonne vertébrale, mobilité du dos' },
    steps: [
      'Place-toi à quatre pattes, mains sous les épaules, genoux sous les hanches.',
      'En inspirant, creuse le dos vers le bas et relève la tête (position « vache »).',
      'En expirant, arrondis le dos vers le haut et regarde vers le nombril (position « chat »).',
      'Enchaîne les deux positions lentement, au rythme de la respiration.',
    ],
    mistakes: [
      'Mouvement trop rapide, déconnecté de la respiration.',
      'Amplitude forcée au-delà du confort, surtout dans le bas du dos.',
      'Épaules qui s’affaissent au lieu de rester actives dans l’appui des mains.',
    ],
    sensation:
      'Un déroulé progressif le long de la colonne, vertèbre après vertèbre, plutôt qu’un effort musculaire. La sensation recherchée est celle d’une mobilité qui se libère, pas d’une contraction.',
    rangeOfMotion:
      'Va jusqu’au bout du confort dans les deux sens, sans jamais forcer. L’amplitude s’ouvre naturellement au fil des répétitions : c’est le seul exercice de la liste où l’amplitude du jour est censée augmenter pendant la série elle-même.',
    tempo:
      'C’est la respiration qui donne le tempo, pas l’inverse : inspire en creusant, souffle en arrondissant. Compte trois à quatre secondes par position, sans temps mort.',
    anatomy:
      'Ce n’est pas un exercice de renforcement. Les érecteurs du rachis et les abdominaux alternent contraction et étirement pour mobiliser chaque segment vertébral. Les muscles profonds intersegmentaires travaillent sur toute l’amplitude.',
    mechanics:
      'Flexion puis extension successives de la colonne dans le plan sagittal, en décharge — le poids du corps repose sur les mains et les genoux, pas sur la colonne. C’est ce qui permet de mobiliser librement, sans compression axiale.',
    benefits: [
      'Restaure la mobilité vertébrale segmentaire que la position assise prolongée fige.',
      'Constitue un excellent échauffement avant tout exercice sollicitant le dos, et une transition douce en fin de séance.',
      'Associe explicitement mouvement et respiration, ce qui aide à ne pas bloquer la respiration dans les autres exercices.',
    ],
    precautions:
      'Aucune douleur ne doit apparaître : c’est une mobilité, pas un étirement forcé. Si un segment reste bloqué, réduis l’amplitude plutôt que d’insister dessus.',
  },

  reverseLunge: {
    slug: 'fente-arriere',
    muscles: { primary: 'Quadriceps, fessiers', secondary: 'Ischio-jambiers' },
    steps: [
      'Tiens-toi debout, pieds à la largeur des hanches.',
      'Recule une jambe en grand pas, en gardant le buste droit.',
      'Plie les deux genoux jusqu’à ce que le genou arrière frôle le sol.',
      'Pousse dans le talon avant pour revenir à la position de départ.',
      'Répète de l’autre côté.',
    ],
    mistakes: [
      'Genou avant qui dépasse largement la pointe du pied.',
      'Buste qui bascule vers l’avant au lieu de rester droit.',
      'Pas trop court : réduit l’amplitude et le travail des fessiers.',
    ],
    sensation:
      'Quadriceps et fessier de la jambe avant, avec un étirement à l’avant de la hanche arrière. L’équilibre demande un effort constant : c’est normal, et c’est une partie du travail.',
    rangeOfMotion:
      'Descends jusqu’à ce que le genou arrière frôle le sol sans le toucher, genou avant autour de 90°. Un pas trop court concentre tout sur le genou avant ; un pas trop long rend la remontée instable.',
    tempo:
      'Deux secondes en descente, une à deux en remontée, avec un temps d’arrêt bref en bas pour supprimer le rebond. Souffle en poussant dans le talon avant.',
    anatomy:
      'Le quadriceps et le grand fessier de la jambe avant produisent l’essentiel du travail. Le moyen fessier stabilise le bassin dans le plan frontal — c’est lui qui empêche le genou de partir vers l’intérieur. Le psoas de la jambe arrière est mis en étirement, et les abdominaux maintiennent le buste vertical.',
    mechanics:
      'Mouvement unilatéral en fente, combinant flexion-extension de hanche et de genou dans le plan sagittal, avec une exigence forte de stabilisation frontale. Reculer plutôt qu’avancer réduit la contrainte sur le genou avant : le poids reste sur la jambe déjà en place au lieu d’être freiné par la jambe qui avance.',
    benefits: [
      'Travaille chaque jambe séparément, ce qui révèle et corrige les asymétries qu’un squat masque.',
      'Sollicite fortement l’équilibre et les stabilisateurs de hanche, essentiels à la marche et aux escaliers.',
      'La version arrière est nettement plus douce pour le genou que la fente avant, ce qui la rend plus adaptée à une reprise.',
    ],
    progression: {
      easier: 'Garde une main en appui sur un mur ou un dossier, et réduis la profondeur de descente.',
      harder: 'Descends plus bas, ralentis, ou surélève le pied avant sur une petite marche.',
      readyWhen:
        'Quand dix répétitions par jambe passent sans appui des mains et sans que le genou parte vers l’intérieur.',
    },
    precautions:
      'Le genou avant doit rester dans l’axe du pied. S’il rentre systématiquement vers l’intérieur, c’est le moyen fessier qui manque de force : travaille l’abduction de hanche en parallèle.',
  },

  stepUp: {
    slug: 'montee-sur-chaise',
    muscles: { primary: 'Quadriceps, fessiers', secondary: 'Ischio-jambiers, équilibre' },
    steps: [
      'Place-toi devant une chaise basse et stable, bien fixée au sol.',
      'Pose un pied entièrement sur l’assise.',
      'Pousse dans ce pied pour monter tout le corps sur la chaise.',
      'Redescends avec contrôle par le même pied, sans te laisser tomber.',
      'Répète en alternant les jambes.',
    ],
    mistakes: [
      'Se propulser avec la jambe au sol au lieu de pousser avec la jambe sur la chaise.',
      'Genou qui part vers l’intérieur en montant.',
      'Chaise instable ou trop haute : vérifie qu’elle ne bascule pas.',
    ],
    sensation:
      'Le quadriceps et le fessier de la jambe qui pousse, en montée comme en descente. Si tu sens surtout le mollet de la jambe restée au sol, c’est que tu te propulses avec elle au lieu de pousser avec celle du dessus.',
    rangeOfMotion:
      'Monte jusqu’à extension complète de la jambe d’appui, puis redescends jusqu’à ce que le pied touche le sol sans y transférer le poids. La hauteur de la marche règle la difficulté : à mi-mollet pour commencer, au genou pour un travail exigeant.',
    tempo:
      'Une à deux secondes pour monter, deux à trois pour redescendre. La descente contrôlée est la partie la plus utile et la plus souvent bâclée — c’est elle qui reproduit la descente d’escalier.',
    anatomy:
      'Le quadriceps de la jambe sur la marche étend le genou, le grand fessier extend la hanche. Le moyen fessier stabilise le bassin en appui unipodal, empêchant la hanche opposée de s’affaisser. Les mollets participent à la poussée finale.',
    mechanics:
      'Mouvement unilatéral d’extension de hanche et de genou en chaîne fermée, contre la gravité et sur toute la hauteur de la marche. Il reproduit exactement le geste de la montée d’escalier — l’un des rares exercices dont le transfert au quotidien est littéral.',
    benefits: [
      'Reproduit directement un geste quotidien : monter un escalier, un trottoir, entrer dans un véhicule haut.',
      'Charge une jambe à la fois, ce qui double la charge relative sans aucun matériel.',
      'La phase de descente entraîne le contrôle excentrique, précisément ce qui manque quand descendre un escalier devient difficile.',
    ],
    progression: {
      easier: 'Choisis une marche plus basse et garde une main en appui pour l’équilibre.',
      harder: 'Monte sur une marche plus haute, ralentis la descente, ou marque un arrêt en haut sur une jambe.',
      readyWhen:
        'Quand dix répétitions par jambe passent sans appui des mains et sans élan de la jambe au sol, monte d’un niveau.',
    },
    precautions:
      'La stabilité du support est non négociable : une chaise qui glisse ou bascule rend cet exercice dangereux. Une marche d’escalier est souvent le meilleur choix.',
  },

  lateralLunge: {
    slug: 'fente-laterale',
    muscles: { primary: 'Quadriceps, fessiers', secondary: 'Adducteurs' },
    steps: [
      'Tiens-toi debout, pieds joints.',
      'Fais un grand pas sur le côté avec une jambe.',
      'Plie le genou de cette jambe en poussant les hanches vers l’arrière, l’autre jambe reste tendue.',
      'Pousse dans le talon plié pour revenir à la position de départ.',
      'Répète de l’autre côté.',
    ],
    mistakes: [
      'Genou plié qui part vers l’intérieur au lieu de rester aligné avec le pied.',
      'Talon de la jambe pliée qui se soulève du sol.',
      'Buste qui s’effondre vers l’avant au lieu de rester droit.',
    ],
    sensation:
      'Quadriceps et fessier de la jambe pliée, plus un étirement net à l’intérieur de la cuisse tendue. Cette dernière sensation est souvent la plus marquante au début : les adducteurs sont rarement sollicités dans cette amplitude.',
    rangeOfMotion:
      'Descends aussi bas que l’intérieur de la cuisse opposée le permet sans que le talon de la jambe pliée décolle. C’est la souplesse des adducteurs qui limite au début, pas la force — l’amplitude s’ouvrira d’elle-même.',
    tempo:
      'Deux à trois secondes en descente, une à deux en remontée. Garde le buste droit et les orteils pointés vers l’avant des deux côtés.',
    anatomy:
      'Le quadriceps et le grand fessier de la jambe pliée produisent le mouvement. Les adducteurs de la jambe tendue travaillent en étirement sous tension, et le moyen fessier stabilise le bassin. Le mouvement se déroule dans un plan que les exercices classiques ignorent presque tous.',
    mechanics:
      'Flexion-extension de hanche et de genou dans le plan frontal, contrairement au squat et à la fente qui restent dans le plan sagittal. C’est précisément cette orientation qui rend l’exercice complémentaire : il sollicite des muscles et des amplitudes que les autres laissent de côté.',
    benefits: [
      'Travaille le plan frontal, le grand absent des programmes sans matériel — d’où son intérêt réel malgré son apparente redondance avec le squat.',
      'Renforce les adducteurs et la mobilité de hanche latérale, utiles pour éviter les faux pas et les déséquilibres latéraux.',
      'Améliore la capacité à se déplacer de côté, geste fréquent au quotidien et jamais entraîné autrement.',
    ],
    progression: {
      easier: 'Réduis la largeur du pas et la profondeur, ou garde une main en appui.',
      harder: 'Élargis le pas, descends plus bas, ou ralentis la remontée.',
      readyWhen:
        'Quand dix répétitions par côté passent avec le talon qui reste au sol et le buste droit.',
    },
    precautions:
      'En cas de gêne à l’intérieur de la cuisse, réduis franchement l’écartement : les adducteurs se claquent facilement quand on cherche l’amplitude maximale trop tôt.',
  },

  gluteBridge: {
    slug: 'pont-fessier',
    muscles: { primary: 'Fessiers', secondary: 'Ischio-jambiers, bas du dos' },
    steps: [
      'Allonge-toi sur le dos, genoux pliés, pieds à plat au sol proches des fessiers.',
      'Pousse dans les talons pour lever les hanches vers le plafond.',
      'Serre fort les fessiers en haut du mouvement, corps aligné des genoux aux épaules.',
      'Redescends avec contrôle sans laisser tomber les hanches d’un coup.',
    ],
    mistakes: [
      'Pousser sur la pointe des pieds au lieu des talons.',
      'Cambrer excessivement le bas du dos au lieu de finir par la contraction des fessiers.',
      'Monter trop peu haut : le corps doit être aligné en haut du mouvement.',
    ],
    sensation:
      'Les fessiers, franchement, avec un peu d’ischio-jambiers. Si le bas du dos travaille plus que les fessiers, c’est que la montée vient de la cambrure lombaire plutôt que de l’extension de hanche — le défaut le plus répandu sur cet exercice.',
    rangeOfMotion:
      'Monte jusqu’à aligner genoux, hanches et épaules, pas plus haut. Chercher à monter davantage ne fait qu’ajouter de la cambrure : l’alignement est le plafond utile.',
    tempo:
      'Deux secondes pour monter, une à deux secondes de contraction en haut, deux à trois secondes pour redescendre. La pause en haut, fessiers serrés, est ce qui distingue un pont efficace d’un simple balancement de bassin.',
    anatomy:
      'Le grand fessier est le moteur principal : c’est le plus puissant extenseur de hanche du corps. Les ischio-jambiers assistent, les érecteurs du rachis stabilisent la colonne sans devoir produire le mouvement, et les abdominaux empêchent la cambrure excessive en haut.',
    mechanics:
      'Extension de hanche en chaîne fermée, dos au sol. Le sol supprime toute exigence d’équilibre et décharge la colonne, ce qui permet de cibler le grand fessier isolément — chose difficile debout, où quadriceps et mollets participent systématiquement.',
    benefits: [
      'Cible le grand fessier plus directement que le squat, où le quadriceps prend une grande part du travail.',
      'Contrebalance l’inhibition des fessiers installée par la position assise prolongée.',
      'Se pratique sans aucune charge sur la colonne, ce qui le rend souvent accessible même quand les mouvements debout ne le sont pas encore.',
    ],
    progression: {
      easier: 'Réduis la hauteur de montée, ou rapproche les pieds des fessiers.',
      harder:
        'Passe sur une jambe, l’autre genou ramené vers la poitrine, ou allonge la contraction en haut à cinq secondes.',
      readyWhen:
        'Quand trois séries de quinze passent avec une contraction franche en haut et sans crampe d’ischio-jambiers, passe à une jambe.',
    },
    precautions:
      'Une crampe dans les ischio-jambiers en haut du mouvement indique souvent que les fessiers ne prennent pas leur part : rapproche les pieds des fessiers et concentre-toi sur la poussée dans les talons.',
  },

  donkeyKick: {
    slug: 'lever-de-jambe-a-4-pattes',
    muscles: { primary: 'Fessiers', secondary: 'Gainage' },
    steps: [
      'Place-toi à quatre pattes, mains sous les épaules, genoux sous les hanches.',
      'Garde un genou plié à 90° et pousse le pied vers le plafond.',
      'Serre le fessier en haut du mouvement, sans creuser le bas du dos.',
      'Redescends avec contrôle sans reposer le genou au sol entre les répétitions.',
      'Termine la série puis change de côté.',
    ],
    mistakes: [
      'Cambrer le bas du dos pour monter plus haut.',
      'Mouvement trop rapide, en balançant la jambe au lieu de la pousser avec contrôle.',
      'Buste qui pivote au lieu de rester face au sol.',
    ],
    sensation:
      'Le fessier de la jambe qui monte, isolément. Si le bas du dos se creuse pour gagner de la hauteur, l’exercice a changé de nature : il ne travaille plus le fessier mais les lombaires.',
    rangeOfMotion:
      'Monte jusqu’à ce que la cuisse arrive dans le prolongement du buste, pas au-delà. Le point d’arrêt est celui où le bassin commencerait à basculer — souvent bien plus bas qu’on ne le croit.',
    tempo:
      'Deux secondes pour pousser, une seconde de contraction en haut, deux secondes pour redescendre sans reposer le genou. Le mouvement doit être poussé, jamais lancé.',
    anatomy:
      'Le grand fessier extend la hanche, genou maintenu fléchi pour raccourcir les ischio-jambiers et les empêcher de prendre le relais. Le moyen fessier et les obliques du côté opposé stabilisent le bassin contre la rotation.',
    mechanics:
      'Extension de hanche en chaîne ouverte, genou fléchi. Garder le genou plié est une contrainte mécanique délibérée : elle place les ischio-jambiers en insuffisance active, ce qui concentre l’extension sur le grand fessier.',
    benefits: [
      'Isole le fessier avec très peu de participation des autres groupes, ce qui est rare sans matériel.',
      'Enseigne la dissociation entre extension de hanche et cambrure lombaire — une distinction utile dans tous les autres exercices de chaîne postérieure.',
      'Ne charge pas la colonne, la position quadrupédique répartissant le poids sur quatre appuis.',
    ],
    progression: {
      easier: 'Réduis l’amplitude et concentre-toi sur la contraction plutôt que sur la hauteur.',
      harder:
        'Allonge la contraction en haut, ou passe en appui sur les avant-bras, ce qui augmente l’exigence de stabilisation.',
      readyWhen:
        'Quand quinze répétitions par côté passent sans que le bas du dos se creuse ni que le bassin pivote.',
    },
  },

  hipAbduction: {
    slug: 'abduction-de-hanche-debout',
    muscles: { primary: 'Fessier moyen (côté de la hanche)' },
    steps: [
      'Tiens-toi debout, en appui léger sur une chaise ou un mur si besoin d’équilibre.',
      'Garde la jambe d’appui légèrement fléchie et le buste droit.',
      'Lève l’autre jambe tendue sur le côté, sans pencher le torse.',
      'Redescends avec contrôle sans reposer le pied brusquement.',
      'Termine la série puis change de jambe.',
    ],
    mistakes: [
      'Pencher le buste du côté opposé pour gagner en hauteur : c’est de la triche, pas plus d’efficacité.',
      'Faire pivoter la jambe vers l’avant au lieu de la lever franchement sur le côté.',
      'Mouvement trop rapide, en balancier.',
    ],
    sensation:
      'Sur le côté de la hanche, au-dessus de l’articulation — une zone que peu d’exercices atteignent. Sur la jambe d’appui, un travail de stabilisation discret mais réel.',
    rangeOfMotion:
      'Lève la jambe jusqu’à 30 à 45° environ, pas davantage. Au-delà, c’est le carré des lombes qui prend le relais en inclinant le buste : l’amplitude apparente augmente, le travail du fessier moyen, non.',
    tempo:
      'Deux secondes pour monter, une seconde en haut, deux secondes pour redescendre. Ce muscle répond mieux au contrôle et au volume qu’à la vitesse.',
    anatomy:
      'Le moyen fessier est le moteur principal, assisté du petit fessier et du tenseur du fascia lata. Sur la jambe d’appui, ces mêmes muscles travaillent en isométrie pour empêcher le bassin de s’affaisser du côté levé.',
    mechanics:
      'Abduction de hanche dans le plan frontal, en chaîne ouverte du côté travaillé et en stabilisation isométrique du côté d’appui. Les deux hanches travaillent donc simultanément, mais de deux façons différentes — un point souvent ignoré.',
    benefits: [
      'Renforce le moyen fessier, dont la faiblesse est une cause fréquente de genou qui rentre vers l’intérieur en squat, en fente ou en descente d’escalier.',
      'Améliore la stabilité en appui unipodal, c’est-à-dire pendant la moitié de chaque pas de marche.',
      'Complète directement les exercices de squat et de fente en corrigeant ce qui les fait dégrader.',
    ],
    progression: {
      easier: 'Tiens-toi à un appui des deux mains et réduis l’amplitude.',
      harder:
        'Lâche l’appui, allonge le maintien en haut, ou passe en position allongée sur le côté pour supprimer toute compensation.',
      readyWhen:
        'Quand quinze répétitions par côté passent sans appui et sans que le buste s’incline.',
    },
  },

  sidePlank: {
    slug: 'planche-laterale',
    muscles: { primary: 'Obliques, gainage latéral' },
    steps: [
      'Allonge-toi sur le côté, appui sur l’avant-bras placé sous l’épaule.',
      'Empile les pieds l’un sur l’autre, ou décale-les pour plus de stabilité.',
      'Soulève les hanches du sol pour aligner le corps en ligne droite.',
      'Maintiens la position en respirant normalement, sans laisser les hanches redescendre.',
      'Termine la série puis change de côté.',
    ],
    mistakes: [
      'Hanches qui s’affaissent vers le sol pendant le maintien.',
      'Épaule qui s’enfonce vers l’oreille au lieu de rester stable au-dessus du coude.',
      'Corps qui part en rotation vers l’avant ou l’arrière.',
    ],
    sensation:
      'Le côté du tronc, entre les côtes et la hanche, du côté au sol. L’épaule d’appui travaille aussi : si elle s’enfonce vers l’oreille, repousse activement le sol pour la maintenir stable.',
    rangeOfMotion:
      'Pas d’amplitude, un alignement : oreille, épaule, hanche et cheville sur une même ligne vue de face. La hanche est le point qui lâche en premier — c’est elle qu’il faut surveiller.',
    tempo:
      'Maintien continu, respiration normale. Comme la planche classique, le critère d’arrêt est la position, pas le chronomètre : dès que la hanche descend, la série est finie.',
    anatomy:
      'Les obliques interne et externe du côté au sol sont les moteurs du maintien, assistés du carré des lombes. Le moyen fessier stabilise le bassin dans le plan frontal, et le dentelé antérieur maintient l’omoplate d’appui plaquée contre les côtes.',
    mechanics:
      'Isométrie d’anti-flexion latérale : la gravité tire la hanche vers le sol, la chaîne latérale l’en empêche. C’est le complément direct de la planche classique, qui ne sollicite quasiment pas ce plan.',
    benefits: [
      'Travaille la chaîne latérale, oubliée par la planche classique et par la plupart des exercices d’abdominaux.',
      'Renforce la stabilité du bassin en appui unipodal, ce qui se transfère à la marche et au port de charge d’un seul côté.',
      'Met en évidence les asymétries droite-gauche de façon très lisible : le temps tenu diffère souvent nettement.',
    ],
    progression: {
      easier:
        'Plie les genoux et prends appui dessus plutôt que sur les pieds : le levier raccourcit fortement.',
      harder: 'Allonge la durée, lève le bras libre vers le plafond, ou décolle la jambe du dessus.',
      readyWhen:
        'Quand trente secondes par côté passent sans que la hanche descende, complexifie plutôt que d’allonger indéfiniment.',
    },
    precautions:
      'Le coude doit être exactement sous l’épaule. Trop en avant ou trop en arrière, la contrainte se déplace sur l’articulation au lieu de rester sur le muscle.',
  },

  standingKneeRaise: {
    slug: 'montees-de-genoux-debout',
    muscles: { primary: 'Gainage, fléchisseurs de hanche' },
    steps: [
      'Tiens-toi debout, pieds à la largeur des hanches.',
      'Monte un genou vers la poitrine en gardant le dos droit.',
      'Marque un bref temps d’arrêt en haut, gainage engagé.',
      'Redescends avec contrôle et répète, ou alterne les côtés.',
    ],
    mistakes: [
      'Dos qui s’arrondit pour monter le genou plus haut.',
      'Se pencher en arrière pour compenser au lieu de garder le buste droit.',
      'Mouvement lancé plutôt que contrôlé.',
    ],
    sensation:
      'Le bas-ventre et l’avant de la hanche du côté qui monte, avec un travail d’équilibre sur la jambe d’appui. Si le dos se creuse ou que le buste part en arrière, c’est que le gainage ne tient plus le bassin.',
    rangeOfMotion:
      'Monte le genou jusqu’à hauteur de hanche, sans plus. Aller plus haut fait basculer le bassin en arrière et transfère le travail des fléchisseurs de hanche vers le bas du dos.',
    tempo:
      'Une à deux secondes pour monter, une brève pause en haut, deux secondes pour redescendre. La descente contrôlée compte autant que la montée.',
    anatomy:
      'Le psoas-iliaque et le droit fémoral fléchissent la hanche. Les abdominaux, surtout le transverse, empêchent le bassin de basculer — c’est cette co-contraction qui distingue un vrai exercice de gainage debout d’un simple lever de genou.',
    mechanics:
      'Flexion de hanche en chaîne ouverte, doublée d’une stabilisation en appui unipodal. La position debout ajoute une exigence d’équilibre absente des exercices de gainage au sol, ce qui la rend plus proche des contraintes réelles de la marche.',
    benefits: [
      'Travaille le gainage en position debout, celle où il sert réellement.',
      'Entraîne l’équilibre unipodal, directement lié à la stabilité de la marche.',
      'Ne demande ni sol au propre ni tapis : praticable en tenue de ville, n’importe où.',
    ],
    progression: {
      easier: 'Garde une main en appui léger sur un mur ou un dossier.',
      harder: 'Lâche l’appui, ferme les yeux, ou allonge le maintien du genou en haut.',
      readyWhen:
        'Quand quinze répétitions par jambe passent sans appui et sans que le buste bascule en arrière.',
    },
  },

  crunch: {
    slug: 'crunch',
    muscles: { primary: 'Abdominaux (grand droit)' },
    steps: [
      'Allonge-toi sur le dos, genoux pliés, pieds à plat au sol.',
      'Place les mains légèrement derrière les oreilles ou croisées sur la poitrine, sans tirer sur la nuque.',
      'Décolle les omoplates du sol en soufflant, en contractant les abdominaux.',
      'Redescends avec contrôle jusqu’à effleurer le sol sans y relâcher tout le poids.',
    ],
    mistakes: [
      'Tirer sur la tête avec les mains pour monter plus haut : sollicite la nuque au lieu des abdominaux.',
      'Monter trop haut, jusqu’à s’asseoir : ce n’est plus un crunch, l’effet sur les abdominaux diminue.',
      'Bloquer la respiration au lieu de souffler pendant la contraction.',
    ],
    sensation:
      'Le haut de la sangle abdominale, sur une amplitude courte. Une tension dans la nuque signifie systématiquement que les mains tirent sur la tête : elles doivent seulement l’accompagner.',
    rangeOfMotion:
      'Décolle les omoplates du sol, rien de plus. Continuer jusqu’à s’asseoir fait basculer le travail vers les fléchisseurs de hanche et réduit celui des abdominaux — l’amplitude courte n’est pas une facilité, c’est le mouvement correct.',
    tempo:
      'Deux secondes pour monter en soufflant, deux pour redescendre en inspirant, sans relâcher complètement en bas pour garder la tension.',
    anatomy:
      'Le grand droit de l’abdomen rapproche le sternum du bassin, c’est le moteur du mouvement. Les obliques participent à la stabilisation. Le psoas n’intervient quasiment pas tant que l’amplitude reste courte — c’est justement ce qui distingue un crunch d’un relevé de buste complet.',
    mechanics:
      'Flexion du rachis dans le plan sagittal, sur une amplitude volontairement limitée. Le mouvement met la colonne lombaire en flexion répétée : c’est pour cela qu’il complète, sans jamais remplacer, les exercices d’anti-extension comme la planche ou le dead bug.',
    benefits: [
      'Sollicite directement le grand droit, ce que les exercices de gainage isométrique ne font pas.',
      'Amplitude courte et position au sol : c’est l’un des exercices les plus accessibles pour reprendre un travail abdominal.',
      'Se combine bien avec la planche et le dead bug, qui travaillent la stabilisation plutôt que la flexion.',
    ],
    progression: {
      easier: 'Croise les bras sur la poitrine plutôt que derrière la tête, et réduis l’amplitude.',
      harder: 'Ralentis, marque une pause en haut, ou tends les bras au-dessus de la tête.',
      readyWhen: 'Quand trois séries de vingt passent sans traction sur la nuque.',
    },
    precautions:
      'La flexion répétée de la colonne ne convient pas à tout le monde. En cas de sensibilité lombaire, privilégie le dead bug et la planche, qui produisent un travail abdominal sans mettre la colonne en flexion.',
  },

  highKneeMarch: {
    slug: 'marche-genoux-hauts-sur-place',
    muscles: { primary: 'Cardio, fléchisseurs de hanche' },
    steps: [
      'Tiens-toi debout, pieds à la largeur des hanches.',
      'Monte un genou à hauteur de hanche, puis repose le pied avec contrôle.',
      'Alterne les jambes à un rythme régulier, comme une marche sur place.',
      'Garde le buste droit et les bras qui accompagnent le mouvement.',
    ],
    mistakes: [
      'Rythme trop précipité qui fait perdre le contrôle et l’équilibre.',
      'Buste qui se penche en arrière pour monter le genou plus haut.',
      'Retomber lourdement sur le pied à chaque pas.',
    ],
    sensation:
      'Un essoufflement progressif, plus un travail dans l’avant des hanches et les mollets. C’est un exercice cardio, pas un exercice de force : la fatigue doit être respiratoire avant d’être musculaire.',
    rangeOfMotion:
      'Genou à hauteur de hanche, pied qui se repose complètement entre chaque montée. Monter plus haut n’ajoute rien au travail cardiovasculaire et fait basculer le bassin.',
    tempo:
      'Un rythme régulier et soutenable sur toute la durée prévue, pas une accélération suivie d’un effondrement. Les bras accompagnent naturellement, en opposition avec les jambes.',
    anatomy:
      'Le psoas-iliaque et le droit fémoral fléchissent la hanche, les mollets assurent la propulsion et la réception. Les abdominaux stabilisent le bassin à chaque appui, et le moyen fessier de la jambe d’appui empêche la hanche opposée de s’affaisser.',
    mechanics:
      'Locomotion sur place, sans déplacement ni phase aérienne : chaque pied revient au sol avant que l’autre ne quitte le sol. Cette absence de temps de suspension supprime l’impact, ce qui la distingue nettement du montée de genoux en course.',
    benefits: [
      'Élève le rythme cardiaque sans aucun déplacement ni matériel, dans un espace d’un mètre carré.',
      'Sert d’échauffement complet en début de séance, ou de relance cardio entre deux exercices de force.',
      'Sans impact, contrairement aux sauts : praticable en appartement et compatible avec une reprise.',
    ],
    progression: {
      easier: 'Réduis la hauteur des genoux et le rythme, jusqu’à une simple marche sur place.',
      harder: 'Accélère le rythme, allonge la durée, ou ajoute une flexion des bras au-dessus de la tête.',
      readyWhen: 'Quand deux fois soixante secondes passent sans essoufflement marqué, allonge la durée.',
    },
  },

  buttKickMarch: {
    slug: 'talons-fesses-sur-place',
    muscles: { primary: 'Cardio, ischio-jambiers' },
    steps: [
      'Tiens-toi debout, pieds à la largeur des hanches.',
      'Plie un genou pour ramener le talon vers le fessier.',
      'Repose le pied avec contrôle et répète de l’autre côté.',
      'Maintiens un rythme modéré et régulier, comme une marche sur place.',
    ],
    mistakes: [
      'Rythme trop rapide qui réduit l’amplitude du mouvement.',
      'Buste qui se penche vers l’avant pendant l’exercice.',
      'Talon qui ne remonte pas assez : réduit l’intérêt du mouvement.',
    ],
    sensation:
      'Un essoufflement modéré et un travail à l’arrière des cuisses. C’est le pendant naturel de la marche genoux hauts : là où celle-ci sollicite l’avant de la hanche, celle-ci mobilise l’arrière de la cuisse.',
    rangeOfMotion:
      'Ramène le talon aussi près du fessier que la souplesse le permet, sans que le genou parte vers l’avant ni que le bassin bascule. Le buste reste droit du début à la fin.',
    tempo:
      'Rythme modéré et régulier. L’objectif est l’endurance et la mobilisation, pas la vitesse maximale : à rythme trop élevé, l’amplitude se réduit et l’exercice perd son intérêt.',
    anatomy:
      'Les ischio-jambiers fléchissent le genou — c’est leur action principale, rarement travaillée sans matériel. Les fessiers maintiennent l’extension de hanche, et les abdominaux empêchent la cambrure compensatoire.',
    mechanics:
      'Flexion répétée du genou en chaîne ouverte, alternée, sans impact ni phase aérienne. La position debout ajoute une composante d’équilibre unipodal à chaque appui, absente d’un travail équivalent au sol.',
    benefits: [
      'Sollicite les ischio-jambiers en flexion, ce qu’aucun autre exercice sans matériel de cette bibliothèque ne fait directement.',
      'Complète la marche genoux hauts pour équilibrer avant et arrière de la cuisse.',
      'Excellent échauffement avant tout travail de jambes, et sans impact.',
    ],
    progression: {
      easier: 'Ralentis et réduis l’amplitude, jusqu’à une simple marche sur place.',
      harder: 'Accélère légèrement, allonge la durée, ou marque une pause talon au contact du fessier.',
      readyWhen: 'Quand deux fois soixante secondes passent en gardant l’amplitude complète tout du long.',
    },
    precautions:
      'Une crampe à l’arrière de la cuisse indique généralement un manque d’échauffement : commence par une marche sur place simple avant d’ajouter l’amplitude.',
  },
};
