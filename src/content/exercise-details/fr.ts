// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

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
      'Le progrès se mesure en secondes, une unité plus lisible que « une répétition de plus » pour suivre sa progression.',
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
      'Locomotion cyclique en chaîne fermée alternée : chaque jambe passe par une phase d’appui puis une phase oscillante. Contrairement à la course, un pied reste toujours au sol — c’est cette absence de phase aérienne qui supprime l’impact et permet de la pratiquer quotidiennement.',
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
      'Se pratique partout, sans matériel ni sol au propre, ce qui en fait un bon point de départ pour construire la poussée.',
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
      'Renforce la stabilité lombaire sans aucune charge en compression sur la colonne, ce qui le rend souvent bien toléré même avec un dos sensible.',
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
      'La version arrière est nettement plus douce pour le genou que la fente avant, ce qui la rend plus adaptée quand le genou est sensible.',
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
      'Sans impact, contrairement aux sauts : praticable en appartement et à toute heure.',
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

  bandPullApart: {
    slug: 'ecarte-elastique',
    muscles: { primary: 'Deltoïdes postérieurs, rhomboïdes', secondary: 'Trapèzes moyens' },
    steps: [
      'Tiens l’élastique à deux mains, bras tendus devant toi à hauteur de poitrine, une légère tension déjà présente.',
      'Écarte les bras vers l’extérieur en gardant les coudes tendus, jusqu’à ce que l’élastique touche la poitrine.',
      'Serre les omoplates l’une vers l’autre au point final du mouvement.',
      'Reviens lentement à la position de départ en contrôlant la tension.',
    ],
    mistakes: [
      'Coudes qui se plient pendant l’écartement : ça transforme le mouvement en tirage et réduit le travail de l’arrière d’épaule.',
      'Élan du buste pour aider à écarter les bras.',
      'Relâchement brusque au retour au lieu de contrôler la tension de l’élastique.',
    ],
    sensation:
      'Le travail se sent entre les omoplates et à l’arrière des épaules, pas dans les avant-bras ni les biceps. Une tension dans le haut du trapèze signale que les épaules montent au lieu de rester basses.',
    rangeOfMotion:
      'Écarte jusqu’à ce que l’élastique touche la poitrine ou le haut du buste, sans chercher davantage : au-delà, la tension retombe et les épaules compensent.',
    tempo:
      'Une à deux secondes pour écarter, deux à trois pour revenir en contrôlant la tension. Souffle en écartant, inspire en revenant.',
    anatomy:
      'Les deltoïdes postérieurs et les rhomboïdes rapprochent les omoplates de la colonne, les trapèzes moyens et inférieurs stabilisent l’omoplate contre la cage thoracique. Les extenseurs du coude restent contractés en isométrie pour garder les bras tendus tout du long.',
    mechanics:
      'Abduction horizontale des épaules dans le plan transversal, contre une résistance croissante : la tension de l’élastique est la plus faible bras tendus devant soi, la plus forte bras écartés — l’inverse d’une charge au poids du corps, constante sur toute l’amplitude.',
    benefits: [
      'Renforce l’arrière de l’épaule, souvent sous-sollicité par rapport à l’avant dans les gestes du quotidien.',
      'Équilibre les épaules quand plusieurs mouvements de poussée (pompes, développé) sont déjà présents dans la séance.',
      'Ne demande qu’un élastique et un mètre carré au sol.',
    ],
    progression: {
      easier: 'Prends un élastique moins tendu, ou tiens-le plus large pour réduire la résistance.',
      harder: 'Prends un élastique plus tendu, ou ralentis le retour à quatre secondes.',
      readyWhen: 'Quand trois séries de quinze passent sans que les épaules remontent vers les oreilles.',
    },
    precautions:
      'Arrête le mouvement si une douleur apparaît à l’avant de l’épaule plutôt qu’entre les omoplates : c’est le signe d’une mauvaise position de l’épaule.',
  },

  bandSquat: {
    slug: 'squat-elastique',
    muscles: { primary: 'Quadriceps, fessiers', secondary: 'Moyen fessier, ischio-jambiers' },
    steps: [
      'Place l’élastique juste au-dessus des genoux, pieds écartés à la largeur des hanches.',
      'Pousse les hanches vers l’arrière et descends comme un squat classique, genoux qui repoussent l’élastique vers l’extérieur.',
      'Descends jusqu’à ce que les cuisses soient proches de l’horizontale, poids sur les talons.',
      'Remonte en poussant dans les talons jusqu’à l’extension complète, sans laisser les genoux rentrer.',
    ],
    mistakes: [
      'Laisser les genoux rentrer vers l’intérieur au lieu de repousser l’élastique.',
      'Descendre sans contrôle, en laissant l’élastique ramener brutalement les genoux.',
      'Buste qui bascule trop en avant.',
    ],
    sensation:
      'Le travail se sent dans l’avant des cuisses et sur le côté des fessiers, qui doivent activement repousser l’élastique. Une tension au genou signale que l’alignement genou-pied n’est pas maintenu.',
    rangeOfMotion:
      'Descends jusqu’à ce que les cuisses soient proches de l’horizontale, sans dépasser ce que permet une mobilité de hanche confortable.',
    tempo:
      'Trois secondes pour descendre, une à deux pour remonter. Inspire en descendant, souffle en poussant dans les talons.',
    anatomy:
      'Les quadriceps et le grand fessier restent les moteurs principaux du squat ; l’élastique ajoute une résistance latérale que le moyen fessier doit contrer en continu pour empêcher le genou de rentrer, ce qu’un squat au poids du corps ne sollicite pas de la même façon.',
    mechanics:
      'Double flexion puis double extension de la hanche et du genou dans le plan sagittal, combinée à une résistance en abduction de hanche imposée par l’élastique dans le plan frontal.',
    benefits: [
      'Renforce le squat classique en ajoutant un travail actif du moyen fessier, utile pour la stabilité du genou à la marche et à la course.',
      'Donne un retour tactile immédiat sur l’alignement du genou : si l’élastique se relâche, le genou est rentré.',
      'Équipement léger et peu coûteux, facile à emporter.',
    ],
    progression: {
      easier: 'Utilise un élastique moins résistant, ou réduis la profondeur de la descente.',
      harder: 'Prends un élastique plus résistant, ou ajoute un temps d’arrêt de deux secondes en bas.',
      readyWhen: 'Quand trois séries de quinze passent sans que l’élastique se relâche à aucun moment.',
    },
    precautions:
      'Choisis une résistance qui permette de garder les genoux alignés sur toute la série : un élastique trop fort qui force à les laisser rentrer est contre-productif.',
  },

  dumbbellGobletSquat: {
    slug: 'squat-gobelet',
    muscles: { primary: 'Quadriceps, fessiers', secondary: 'Gainage, haut du dos' },
    steps: [
      'Tiens un haltère verticalement à deux mains contre la poitrine, coudes pointant vers le bas.',
      'Pieds écartés un peu plus que la largeur des hanches, pointes légèrement ouvertes.',
      'Descends en poussant les hanches vers l’arrière, coudes qui viennent frôler l’intérieur des genoux.',
      'Remonte en poussant dans les talons jusqu’à l’extension complète des jambes.',
    ],
    mistakes: [
      'Buste qui s’effondre vers l’avant sous le poids de l’haltère.',
      'Talons qui décollent en descente.',
      'Descente incomplète par manque de mobilité de cheville plutôt que par choix.',
    ],
    sensation:
      'Le travail se sent dans l’avant des cuisses et les fessiers, avec en plus une tension isométrique dans le haut du dos et les avant-bras qui tiennent l’haltère. Le buste doit rester vertical du début à la fin.',
    rangeOfMotion:
      'Descends jusqu’à ce que les coudes touchent ou frôlent l’intérieur des genoux : la charge tenue devant le corps permet naturellement une descente plus profonde qu’un squat à mains libres.',
    tempo:
      'Deux à trois secondes pour descendre, une à deux pour remonter. Inspire en descendant, souffle en poussant dans les talons.',
    anatomy:
      'Les quadriceps et le grand fessier restent les moteurs principaux ; tenir la charge devant la poitrine oblige les érecteurs du rachis et les abdominaux à maintenir le buste vertical contre la tendance à basculer en avant, un travail de gainage que le squat au poids du corps ne demande pas au même degré.',
    mechanics:
      'Double flexion puis double extension de la hanche et du genou dans le plan sagittal. La charge tenue près du centre de gravité, contre la poitrine, garde le buste plus vertical qu’un squat avec charge dans le dos.',
    benefits: [
      'Ajoute une charge externe progressive à un mouvement déjà maîtrisé au poids du corps, la suite logique quand le squat sur chaise devient facile.',
      'La position de la charge contre la poitrine enseigne une posture de squat verticale, utile pour tous les squats chargés à venir.',
      'Ne demande qu’un seul haltère ou une charge équivalente (bouteille lestée, kettlebell).',
    ],
    progression: {
      easier: 'Utilise une charge plus légère, ou reviens temporairement au squat sur chaise sans charge.',
      harder: 'Augmente la charge progressivement, ou ralentis la descente à quatre secondes.',
      readyWhen: 'Quand trois séries de dix passent avec un buste qui reste vertical et des talons qui ne décollent jamais.',
    },
    precautions:
      'Augmente la charge par petits paliers : c’est la profondeur et le contrôle qui doivent rester intacts en premier, pas le poids affiché.',
  },

  dumbbellRow: {
    slug: 'rowing-haltere-un-bras',
    muscles: { primary: 'Grand dorsal, trapèzes', secondary: 'Biceps, gainage' },
    steps: [
      'Place un genou et la main du même côté sur un banc ou une chaise stable, dos parallèle au sol.',
      'Tiens l’haltère dans l’autre main, bras tendu vers le sol.',
      'Tire l’haltère vers la hanche en gardant le coude proche du corps, omoplate qui se rapproche de la colonne.',
      'Redescends avec contrôle jusqu’à l’extension complète du bras.',
    ],
    mistakes: [
      'Rotation du buste pour aider à tirer l’haltère plutôt que de laisser le dos faire le travail.',
      'Coude qui s’écarte du corps, transformant le rowing en mouvement d’épaule.',
      'Dos qui s’arrondit au lieu de rester plat.',
    ],
    sensation:
      'Le travail se sent dans le milieu du dos et sous l’aisselle, avec l’omoplate qui se rapproche nettement de la colonne au sommet du mouvement. Une tension dans le bas du dos signale que l’appui sur le banc ne soutient pas assez le buste.',
    rangeOfMotion:
      'Tire jusqu’à ce que l’haltère touche ou frôle la hanche, coude qui dépasse légèrement le dos. Redescends jusqu’à l’extension complète du bras pour utiliser toute l’amplitude disponible.',
    tempo:
      'Une seconde pour tirer, deux à trois pour redescendre en contrôlant la charge. Souffle en tirant, inspire en redescendant.',
    anatomy:
      'Le grand dorsal et le grand rond rapprochent le bras du corps et l’étendent vers l’arrière, les rhomboïdes et le trapèze moyen rapprochent l’omoplate de la colonne, le biceps assiste en fléchissant le coude. L’appui genou-main sur le banc stabilise le buste pour isoler le travail du dos.',
    mechanics:
      'Extension et adduction de l’épaule dans le plan sagittal, associée à une rétraction de l’omoplate. L’appui unilatéral sur le banc élimine la contribution des jambes présente dans un rowing debout.',
    benefits: [
      'Renforce le tirage, un schéma de mouvement peu présent dans une séance au poids du corps où les exercices de dos restent isométriques (superman, oiseau-chien).',
      'L’appui unilatéral permet de travailler chaque côté indépendamment et de repérer une différence de force entre les deux bras.',
      'Contrepoids utile face aux mouvements de poussée (pompes, développé) déjà présents dans la plupart des séances.',
    ],
    progression: {
      easier: 'Utilise une charge plus légère, ou fais reposer le buste plus horizontalement pour réduire l’amplitude.',
      harder: 'Augmente la charge, ou marque un temps d’arrêt d’une seconde en haut du mouvement.',
      readyWhen: 'Quand trois séries de dix passent sans rotation du buste, des deux côtés.',
    },
    precautions:
      'Garde le dos plat du début à la fin : si le buste doit s’arrondir pour tirer la charge, elle est trop lourde.',
  },

  legPressMachine: {
    slug: 'presse-a-cuisses',
    muscles: { primary: 'Quadriceps, fessiers', secondary: 'Ischio-jambiers' },
    steps: [
      'Assieds-toi sur la machine, dos et tête bien calés contre le dossier.',
      'Place les pieds à plat sur la plaque, à la largeur des hanches.',
      'Déverrouille les cales de sécurité et descends en pliant les genoux jusqu’à un angle proche de 90°.',
      'Pousse dans les pieds jusqu’à l’extension des jambes, sans verrouiller complètement les genoux.',
    ],
    mistakes: [
      'Verrouiller complètement les genoux en fin de poussée, ce qui reporte la charge sur l’articulation.',
      'Bas du dos qui décolle du dossier en descente.',
      'Descendre trop profondément, genoux qui dépassent largement la poitrine.',
    ],
    sensation:
      'Le travail se sent dans l’avant des cuisses et les fessiers, sans tension dans le bas du dos : le dossier soutient tout le buste. Une gêne au bas du dos signale une amplitude trop importante pour la mobilité de hanche du moment.',
    rangeOfMotion:
      'Descends jusqu’à un angle de genou proche de 90°, ou moins si le bas du dos décolle avant : la machine permet de fixer précisément cette limite d’une séance à l’autre.',
    tempo:
      'Deux à trois secondes pour descendre, une pour pousser. Inspire en descendant, souffle en poussant.',
    anatomy:
      'Les quadriceps étendent le genou, le grand fessier étend la hanche : les mêmes moteurs qu’un squat, mais le dossier de la machine élimine tout le travail de gainage et de stabilisation que le squat demande au buste.',
    mechanics:
      'Double extension de la hanche et du genou dans le plan sagittal, sur une trajectoire guidée : contrairement au squat, le buste reste fixe et seule la charge se déplace.',
    benefits: [
      'Permet de charger fortement les jambes sans solliciter le gainage ni l’équilibre, utile en complément ou en remplacement temporaire du squat.',
      'La trajectoire guidée réduit le risque d’erreur technique par rapport à un mouvement libre chargé.',
      'Facilite l’ajustement fin de la charge, palier par palier.',
    ],
    progression: {
      easier: 'Réduis la charge, ou limite l’angle de descente à 70-80° de flexion.',
      harder: 'Augmente la charge, ou ralentis la descente à quatre secondes.',
      readyWhen: 'Quand trois séries de dix passent sans que le bas du dos décolle du dossier.',
    },
    precautions:
      'Ne verrouille jamais complètement les genoux en fin de poussée, et ne laisse jamais le bas du dos décoller du dossier : ce sont les deux points de sécurité de cette machine.',
  },

  latPulldownMachine: {
    slug: 'tirage-vertical',
    muscles: { primary: 'Grand dorsal', secondary: 'Biceps, trapèzes' },
    steps: [
      'Assieds-toi face à la machine, cuisses calées sous les rouleaux si la machine en a.',
      'Saisis la barre plus large que les épaules, bras tendus.',
      'Tire la barre vers le haut de la poitrine en gardant le buste droit, coudes qui descendent vers les hanches.',
      'Remonte avec contrôle jusqu’à l’extension complète des bras.',
    ],
    mistakes: [
      'Se pencher fortement en arrière pour aider à tirer la barre.',
      'Tirer la barre derrière la nuque plutôt que devant la poitrine.',
      'Remontée trop rapide, sans contrôler la charge.',
    ],
    sensation:
      'Le travail se sent dans le milieu et le bas du dos, jusque sous l’aisselle. Une tension dans le haut du trapèze ou la nuque signale que les épaules remontent au lieu de rester basses.',
    rangeOfMotion:
      'Tire jusqu’à ce que la barre touche le haut de la poitrine, coudes qui descendent le long du corps. Remonte jusqu’à l’extension complète des bras pour utiliser toute l’amplitude.',
    tempo:
      'Une à deux secondes pour tirer, deux à trois pour remonter en contrôlant la charge. Souffle en tirant, inspire en remontant.',
    anatomy:
      'Le grand dorsal adduit et étend l’épaule, les rhomboïdes et le trapèze moyen rapprochent l’omoplate de la colonne, le biceps assiste en fléchissant le coude. C’est l’équivalent en tirage vertical du mouvement de traction, en version guidée et chargeable progressivement.',
    mechanics:
      'Adduction et extension de l’épaule dans le plan sagittal, associée à une dépression et une rétraction de l’omoplate, sur une trajectoire guidée par la machine.',
    benefits: [
      'Construit la force de traction verticale utile pour progresser vers la traction à la barre fixe, un mouvement que le poids du corps seul rend difficile d’accès.',
      'Permet de doser précisément la charge, contrairement à une traction au poids du corps où seul le poids total peut être ajusté.',
      'Renforce le dos en miroir des mouvements de poussée déjà présents dans la plupart des séances.',
    ],
    progression: {
      easier: 'Réduis la charge, ou utilise une prise plus étroite pour raccourcir le bras de levier.',
      harder: 'Augmente la charge, ou marque un temps d’arrêt d’une seconde en bas du mouvement.',
      readyWhen: 'Quand trois séries de dix passent sans que le buste bascule en arrière.',
    },
    precautions:
      'Tire toujours la barre devant la poitrine, jamais derrière la nuque : cette variante ancienne place l’épaule dans une position à risque pour un gain minime.',
  },

  hamstringStretch: {
    slug: 'etirement-ischio-jambiers',
    muscles: { primary: 'Ischio-jambiers' },
    steps: [
      'Place un talon sur un support stable (marche, chaise basse), jambe tendue.',
      'Garde l’autre jambe légèrement fléchie, pied bien ancré au sol.',
      'Penche le buste vers l’avant depuis les hanches, dos plat, jusqu’à sentir une tension à l’arrière de la cuisse.',
      'Maintiens la position sans à-coups, en respirant calmement.',
    ],
    mistakes: [
      'Arrondir le dos pour aller chercher plus d’amplitude au lieu de plier depuis les hanches.',
      'Rebondir dans l’étirement au lieu de tenir une position stable.',
      'Verrouiller complètement le genou de la jambe tendue.',
    ],
    sensation:
      'La tension doit se sentir sur toute la longueur de l’arrière de la cuisse, jamais dans le genou ni le bas du dos. Une douleur vive plutôt qu’une tension signale d’arrêter et de réduire l’amplitude.',
    rangeOfMotion:
      'Penche-toi jusqu’à sentir une tension nette mais tolérable, jamais douloureuse. L’amplitude confortable augmente naturellement d’une séance à l’autre.',
    tempo:
      'Aucun rythme d’exécution : la position se tient immobile. Respire lentement et profondément pendant toute la durée du maintien.',
    anatomy:
      'Les ischio-jambiers, qui fléchissent le genou et étendent la hanche, sont mis en tension passive par la flexion de hanche combinée à l’extension du genou. Aucune contraction musculaire active n’est recherchée ici, seulement un relâchement progressif sous tension.',
    mechanics:
      'Mise en tension passive des ischio-jambiers par flexion de hanche et extension de genou simultanées, dans le plan sagittal, sans charge ni mouvement répété.',
    benefits: [
      'Entretient la souplesse de l’arrière de cuisse, souvent raccourcie par la position assise prolongée.',
      'Facilite l’amplitude des mouvements de flexion de hanche (fentes, squats profonds) réalisés ailleurs dans la séance.',
      'Se pratique n’importe où avec une simple marche ou un rebord comme support.',
    ],
    precautions:
      'Ne force jamais au-delà d’une tension tolérable, et évite cet étirement à froid avant un effort intense : il trouve mieux sa place en fin de séance ou à distance de l’effort.',
  },

  chestDoorwayStretch: {
    slug: 'etirement-pectoraux-cadre-de-porte',
    muscles: { primary: 'Pectoraux', secondary: 'Deltoïdes antérieurs' },
    steps: [
      'Place-toi dans l’encadrement d’une porte, avant-bras contre le montant, coude à hauteur d’épaule.',
      'Pieds légèrement décalés, un pied devant l’autre pour la stabilité.',
      'Avance doucement le buste à travers l’encadrement jusqu’à sentir une tension à l’avant de l’épaule et sur le pectoral.',
      'Maintiens la position sans à-coups, en respirant calmement.',
    ],
    mistakes: [
      'Coude placé trop haut ou trop bas, ce qui déplace la tension vers l’épaule plutôt que le pectoral.',
      'Avancer trop brusquement au lieu de progresser doucement.',
      'Cambrer excessivement le bas du dos pour aller chercher plus d’amplitude.',
    ],
    sensation:
      'La tension doit se sentir à l’avant de l’épaule et sur le pectoral du bras engagé, jamais dans l’articulation elle-même. Une douleur à l’avant de l’épaule signale de reculer légèrement.',
    rangeOfMotion:
      'Avance jusqu’à sentir une tension nette mais tolérable. La hauteur du coude change la zone étirée : plus bas, l’étirement descend vers le bas du pectoral, plus haut, il remonte vers le haut du pectoral et l’épaule.',
    tempo:
      'Aucun rythme d’exécution : la position se tient immobile. Respire lentement, l’expiration aide souvent à relâcher un peu plus la tension.',
    anatomy:
      'Le grand pectoral, qui adduit et fléchit l’épaule vers l’avant, est mis en tension passive par la position d’ouverture imposée par le cadre. Le deltoïde antérieur, souvent raccourci par les mêmes gestes répétitifs, est étiré dans la même position.',
    mechanics:
      'Mise en tension passive du pectoral par une extension horizontale de l’épaule fixée par le point d’appui du cadre, sans charge ni mouvement répété.',
    benefits: [
      'Compense le raccourcissement du pectoral causé par les positions prolongées en fermeture (écrans, volant, poussée répétée).',
      'Facilite l’amplitude des mouvements de poussée et d’ouverture du buste réalisés ailleurs dans la séance.',
      'Ne demande aucun équipement, juste un encadrement de porte.',
    ],
    precautions:
      'Ne force jamais au-delà d’une tension tolérable, surtout en cas de gêne déjà connue à l’épaule : recule d’abord la position du bras avant de renoncer à l’étirement.',
  },

  squat: {
    slug: 'squat',
    muscles: { primary: 'Quadriceps, fessiers', secondary: 'Ischio-jambiers, gainage' },
    steps: [
      'Debout, pieds écartés à la largeur des hanches, pointes légèrement ouvertes.',
      'Pousse les hanches vers l’arrière puis fléchis les genoux, qui restent dans l’axe des pieds.',
      'Descends jusqu’à ce que les cuisses soient proches de l’horizontale, poids réparti sur tout le pied.',
      'Garde le buste droit et le regard devant, sans arrondir le bas du dos.',
      'Remonte en poussant dans les talons jusqu’à l’extension complète des hanches.',
    ],
    mistakes: [
      'Genoux qui rentrent vers l’intérieur pendant la remontée.',
      'Talons qui décollent : signe d’un manque de mobilité de cheville, pas d’un manque de force.',
      'Bas du dos qui s’arrondit en fin de descente, quand la profondeur dépasse la mobilité de hanche.',
    ],
    sensation:
      'Le travail se sent dans l’avant des cuisses et les fessiers, avec un appui franc dans tout le pied. Une tension isolée à l’avant du genou signale que les hanches ne reculent pas assez et que le mouvement part du genou seul.',
    rangeOfMotion:
      'Descends aussi bas que la mobilité le permet sans que le bas du dos s’arrondisse — le repère est le dos, pas un angle théorique. Cuisses proches de l’horizontale suffisent à travailler toute la chaîne.',
    tempo:
      'Deux à trois secondes pour descendre, une à deux pour remonter. Inspire en descendant, souffle en poussant dans les talons.',
    anatomy:
      'Les quadriceps étendent le genou, le grand fessier étend la hanche : les deux moteurs travaillent ensemble. Les ischio-jambiers et les adducteurs stabilisent, le moyen fessier empêche le genou de rentrer, et les érecteurs du rachis avec la sangle abdominale maintiennent le buste gainé.',
    mechanics:
      'Double flexion puis double extension de la hanche et du genou dans le plan sagittal, en chaîne fermée. La descente est excentrique, la remontée concentrique. Sans chaise ni repère externe, c’est la mobilité de cheville et de hanche qui fixe la profondeur atteignable.',
    benefits: [
      'Le mouvement de base de toute la chaîne inférieure : c’est la version libre que le squat sur chaise prépare.',
      'Ne demande ni matériel ni appui, donc praticable partout dès que la profondeur est maîtrisée.',
      'Sert de socle à toutes les variantes chargées — squat gobelet, presse à cuisses — qui ne changent que la charge, pas le geste.',
    ],
    progression: {
      easier: 'Reviens au squat sur chaise, qui donne un repère de profondeur constant.',
      harder: 'Ralentis la descente à cinq secondes, marque un arrêt en bas, ou passe au squat gobelet avec charge.',
      readyWhen: 'Quand trois séries de quinze passent sans que les genoux rentrent ni que les talons décollent, ajoute une charge.',
    },
    precautions:
      'Si le genou est douloureux, réduis la profondeur plutôt que le nombre de répétitions : une amplitude partielle indolore vaut mieux qu’une amplitude complète qui fait mal.',
  },

  pushup: {
    slug: 'pompes',
    muscles: { primary: 'Pectoraux, triceps', secondary: 'Épaules, gainage' },
    steps: [
      'En appui sur les mains et les pointes de pieds, mains un peu plus larges que les épaules, sous la ligne des épaules.',
      'Serre les fessiers et la sangle abdominale pour aligner le corps des talons à la tête.',
      'Descends en pliant les coudes à environ 45° du buste, jusqu’à frôler le sol de la poitrine.',
      'Remonte en poussant dans les mains jusqu’à l’extension complète des bras, sans creuser le dos.',
    ],
    mistakes: [
      'Bassin qui s’affaisse : le gainage lâche avant les bras, et le bas du dos encaisse.',
      'Coudes qui partent à 90° sur les côtés, ce qui met l’épaule en position défavorable.',
      'Descente partielle par manque de force, alors qu’une variante plus facile en amplitude complète progresse mieux.',
    ],
    sensation:
      'Le travail se sent dans la poitrine, l’arrière du bras et le gainage, qui tient la ligne du corps du début à la fin. Une tension dans le bas du dos signale que le bassin s’est affaissé.',
    rangeOfMotion:
      'Descends jusqu’à ce que la poitrine frôle le sol, puis remonte jusqu’aux bras tendus sans verrouiller brutalement les coudes. L’amplitude complète est ce qui distingue une pompe d’un mouvement partiel.',
    tempo:
      'Deux secondes pour descendre, une pour remonter. Inspire en descendant, souffle en poussant.',
    anatomy:
      'Le grand pectoral et le triceps brachial sont les moteurs, l’avant de l’épaule assiste. Le grand dentelé maintient l’omoplate plaquée contre la cage thoracique ; abdominaux et fessiers empêchent le bassin de s’affaisser, ce qui fait de la pompe autant un exercice de gainage qu’un exercice de poussée.',
    mechanics:
      'Flexion puis extension du coude combinées à une adduction horizontale de l’épaule, en chaîne fermée, le corps se déplaçant autour d’un appui fixe. C’est le dernier barreau de l’échelle que les pompes contre le mur, inclinées puis à genoux préparent : le levier s’allonge à chaque étape, la charge relative augmente sans changer le geste.',
    benefits: [
      'Le mouvement de poussée de référence, sans matériel ni appui : c’est la cible vers laquelle mènent toutes les variantes assistées.',
      'Renforce simultanément la poussée et le gainage, ce qu’aucune machine de développé ne fait.',
      'Se dose finement en changeant la hauteur des appuis, sans avoir à ajouter de charge.',
    ],
    progression: {
      easier: 'Reviens aux pompes à genoux ou aux pompes inclinées : la ligne du corps reste la même, seul le levier raccourcit.',
      harder: 'Surélève les pieds, ralentis la descente à quatre secondes, ou marque un arrêt en bas.',
      readyWhen: 'Quand trois séries de douze passent avec le corps aligné du début à la fin, surélève les pieds.',
    },
    precautions:
      'Un poignet douloureux se soulage souvent en appuyant sur les poings fermés ou sur des poignées, ce qui garde le poignet dans l’axe de l’avant-bras.',
  },

  pikePushup: {
    slug: 'pompes-piquees',
    muscles: { primary: 'Épaules', secondary: 'Triceps, gainage' },
    steps: [
      'Pars en position de pompe puis recule les pieds en poussant les hanches vers le haut, corps en V renversé.',
      'Mains un peu plus larges que les épaules, tête relâchée entre les bras.',
      'Fléchis les coudes pour descendre le sommet du crâne vers le sol, entre les mains.',
      'Remonte en poussant dans les mains jusqu’à l’extension des bras, hanches toujours hautes.',
    ],
    mistakes: [
      'Hanches qui redescendent en cours de série : le mouvement redevient une pompe classique et quitte les épaules.',
      'Coudes qui s’écartent largement au lieu de rester dans l’axe du mouvement.',
      'Descente jusqu’au front plutôt que jusqu’au sommet du crâne, ce qui raccourcit l’amplitude.',
    ],
    sensation:
      'Le travail se sent nettement dans les épaules et l’arrière des bras, pas dans la poitrine. Si la poitrine domine, c’est que les hanches ne sont pas assez hautes.',
    rangeOfMotion:
      'Descends jusqu’à frôler le sol du sommet du crâne. Plus les pieds sont proches des mains, plus la part du poids qui passe sur les épaules augmente : c’est le réglage de difficulté.',
    tempo:
      'Deux secondes pour descendre, une pour remonter. Souffle en poussant.',
    anatomy:
      'Le deltoïde antérieur et le triceps sont les moteurs, le trapèze supérieur et le grand dentelé stabilisent l’omoplate pendant que le bras passe au-dessus de la tête. Le gainage maintient la position en V, qui est ce qui oriente la charge vers l’épaule plutôt que vers la poitrine.',
    mechanics:
      'Poussée verticale en chaîne fermée : c’est l’équivalent au poids du corps du développé au-dessus de la tête, l’inclinaison du buste remplaçant le réglage de la charge. Flexion-extension du coude combinée à une flexion d’épaule au-dessus de la tête.',
    benefits: [
      'Le seul exercice d’épaules au poids du corps de cette bibliothèque : sans lui, filtrer « poids du corps » ne proposait aucun travail d’épaule.',
      'Prépare la poussée au-dessus de la tête sans avoir besoin d’haltères.',
      'Se règle finement en avançant ou reculant les pieds, sans matériel.',
    ],
    progression: {
      easier: 'Pose les mains sur une surface surélevée : moins de poids passe sur les épaules.',
      harder: 'Rapproche les pieds des mains, ou surélève les pieds pour verticaliser davantage le buste.',
      readyWhen: 'Quand trois séries de douze passent avec les hanches hautes du début à la fin, surélève les pieds.',
    },
    precautions:
      'Ce mouvement demande de lever les bras au-dessus de la tête : si l’épaule y est douloureuse, garde le développé sur une amplitude plus courte plutôt que de forcer la position en V.',
  },

  mountainClimber: {
    slug: 'grimpeur',
    muscles: { primary: 'Cardio, gainage', secondary: 'Épaules, fléchisseurs de hanche' },
    steps: [
      'Place-toi en position de pompe bras tendus, mains sous les épaules, corps aligné.',
      'Ramène un genou vers la poitrine sans que les hanches montent ni ne s’affaissent.',
      'Repose le pied et enchaîne immédiatement avec l’autre jambe.',
      'Garde un rythme régulier sur toute la durée prévue, la respiration continue.',
    ],
    mistakes: [
      'Hanches qui montent à chaque changement de jambe : le gainage a lâché, l’exercice devient un rebond.',
      'Mains trop en avant des épaules, ce qui charge inutilement le poignet et l’épaule.',
      'Rythme trop rapide au détriment de l’amplitude du genou.',
    ],
    sensation:
      'Le souffle monte vite, et le gainage travaille en continu pour empêcher le bassin de bouger. Les épaules encaissent le poids du haut du corps pendant toute la série.',
    rangeOfMotion:
      'Ramène le genou aussi loin que le bassin peut rester immobile — c’est le bassin qui fixe l’amplitude, pas la volonté d’aller loin.',
    tempo:
      'Un rythme régulier et tenable sur toute la durée, plutôt qu’un départ rapide suivi d’un effondrement. Respire en continu : bloquer le souffle est le premier signe d’un rythme trop élevé.',
    anatomy:
      'Les fléchisseurs de hanche amènent le genou vers la poitrine, pendant que les abdominaux et le grand fessier du côté en appui empêchent le bassin de basculer. Les épaules et le triceps travaillent en isométrie pour tenir la position de planche haute.',
    mechanics:
      'Flexion-extension alternée de la hanche en chaîne ouverte, sur une base de planche haute donc en appui fermé sur les mains. C’est un exercice cardio dont la contrainte principale reste la stabilité du tronc : le rythme monte le rythme cardiaque, le gainage décide de la qualité.',
    benefits: [
      'Fait monter le rythme cardiaque sans se déplacer et sans matériel, dans très peu d’espace.',
      'Combine travail cardio et gainage dynamique, ce que ni la marche ni la planche ne font seuls.',
      'Se règle par le rythme plutôt que par la charge, donc s’adapte à tous les niveaux sans rien changer au matériel.',
    ],
    progression: {
      easier: 'Ralentis franchement, ou pose les mains sur une surface surélevée pour alléger les épaules.',
      harder: 'Augmente le rythme ou allonge la durée, tant que le bassin reste immobile.',
      readyWhen: 'Quand trois fois quarante secondes passent sans que les hanches montent, allonge la durée.',
    },
    precautions:
      'Poignets ou épaules sensibles : surélève les mains sur un banc ou une marche, ce qui réduit nettement la charge sur l’appui sans changer le travail des jambes.',
  },

  legSwing: {
    slug: 'balancements-de-jambe',
    muscles: { primary: 'Hanches, mobilité', secondary: 'Fessiers, ischio-jambiers' },
    steps: [
      'Place-toi de côté par rapport à un mur ou un dossier, une main en appui.',
      'Transfère le poids sur la jambe intérieure, l’autre jambe libre de balancer.',
      'Balance la jambe libre d’avant en arrière, sans forcer en fin d’amplitude.',
      'Augmente progressivement l’amplitude au fil des répétitions, bassin immobile.',
      'Change de côté à la moitié du temps prévu.',
    ],
    mistakes: [
      'Bassin qui bascule pour aller chercher de l’amplitude, au lieu de laisser la hanche travailler seule.',
      'Amplitude maximale d’emblée, alors qu’elle doit s’ouvrir progressivement.',
      'Bas du dos qui se cambre quand la jambe part en arrière.',
    ],
    sensation:
      'Une hanche qui se délie, sans effort musculaire marqué. C’est une mise en mouvement, pas un renforcement : si ça tire fort, l’amplitude est déjà trop grande pour un début de séance.',
    rangeOfMotion:
      'Va jusqu’où le bassin reste immobile. L’amplitude du jour est censée augmenter pendant la série elle-même, exactement comme pour le chat-vache.',
    tempo:
      'Un balancement régulier et contrôlé, jamais lancé. Le mouvement reste piloté, pas laissé à l’élan.',
    anatomy:
      'Les fléchisseurs de hanche et le grand fessier alternent contraction et étirement dynamiques, pendant que la jambe d’appui et le gainage stabilisent le bassin. Le travail porte sur la mobilité articulaire de la hanche, pas sur la force.',
    mechanics:
      'Flexion et extension alternées de la hanche en chaîne ouverte, dans le plan sagittal, sans charge. Le mouvement balistique contrôlé prépare l’amplitude que les fentes et les squats vont ensuite utiliser sous charge.',
    benefits: [
      'Prépare la hanche avant tout travail de jambes, ce qu’aucun autre échauffement de cette bibliothèque ne faisait — ils portaient tous sur le haut du corps.',
      'Se fait n’importe où avec un simple appui, en trente secondes par côté.',
      'Ouvre l’amplitude de hanche utile aux fentes, squats et montées de chaise qui suivent.',
    ],
    precautions:
      'Aucun à-coup en fin d’amplitude : c’est un balancement piloté, pas un lancer. Si la hanche accroche, réduis l’amplitude plutôt que d’insister.',
  },

  torsoTwist: {
    slug: 'rotations-du-buste',
    muscles: { primary: 'Obliques, mobilité du tronc', secondary: 'Colonne vertébrale' },
    steps: [
      'Debout, pieds écartés à la largeur des épaules et bien ancrés au sol.',
      'Fléchis légèrement les genoux et laisse les bras relâchés le long du corps.',
      'Fais pivoter le buste d’un côté, en laissant les bras suivre le mouvement sans les lancer.',
      'Enchaîne de l’autre côté, à un rythme régulier, le bassin restant face à l’avant.',
    ],
    mistakes: [
      'Bassin qui pivote avec le buste : la rotation ne se fait plus dans le tronc mais dans les hanches.',
      'Bras lancés qui entraînent le buste au lieu de le suivre.',
      'Rythme trop rapide, qui transforme une mobilisation en secousse.',
    ],
    sensation:
      'Une rotation qui se libère progressivement le long du tronc, sans effort musculaire marqué et sans à-coup dans le bas du dos.',
    rangeOfMotion:
      'Tourne jusqu’au bout du confort, sans forcer. Comme pour toute mobilité, l’amplitude s’ouvre au fil des répétitions.',
    tempo:
      'Régulier et modéré, une rotation par seconde environ. Respire librement, sans bloquer le souffle en fin de rotation.',
    anatomy:
      'Les obliques externes et internes produisent la rotation du tronc, les muscles profonds intersegmentaires mobilisent chaque étage vertébral. Les fessiers et les jambes stabilisent le bassin, ce qui est précisément ce qui oblige la rotation à venir du tronc.',
    mechanics:
      'Rotation alternée du rachis dans le plan transversal, en charge légère (le poids du buste seul). Le bassin fixe sert de référence : c’est lui qui distingue une vraie rotation du tronc d’un simple pivot des hanches.',
    benefits: [
      'Le seul échauffement du tronc de cette bibliothèque, complémentaire du chat-vache qui travaille la flexion-extension et non la rotation.',
      'Prépare les exercices de gainage anti-rotation comme le dead bug et le chien-oiseau.',
      'Se fait debout, sans matériel ni tapis.',
    ],
    precautions:
      'Le bas du dos ne doit jamais être le moteur de la rotation : si une gêne y apparaît, réduis l’amplitude et vérifie que le bassin reste bien face à l’avant.',
  },

  quadStretch: {
    slug: 'etirement-quadriceps-debout',
    muscles: { primary: 'Quadriceps' },
    steps: [
      'Debout, appuie-toi d’une main à un mur pour l’équilibre.',
      'Attrape la cheville du même côté que la jambe à étirer et ramène le talon vers la fesse.',
      'Garde les deux genoux côte à côte et le bassin en rétroversion légère.',
      'Maintiens la position sans à-coups, en respirant calmement, puis change de côté.',
    ],
    mistakes: [
      'Genou étiré qui part vers l’avant ou sur le côté, ce qui déplace la tension hors du quadriceps.',
      'Bas du dos cambré pour gagner de l’amplitude.',
      'Tirer sur la cheville par à-coups au lieu de tenir une position stable.',
    ],
    sensation:
      'La tension se sent sur toute la face avant de la cuisse, jamais dans le genou lui-même. Une douleur à l’avant du genou signale de relâcher immédiatement.',
    rangeOfMotion:
      'Ramène le talon jusqu’à sentir une tension nette mais tolérable. Rapprocher le genou de l’autre et pousser légèrement le bassin en avant augmente l’étirement sans forcer sur l’articulation.',
    tempo:
      'Aucun rythme : la position se tient immobile. Respire lentement pendant tout le maintien.',
    anatomy:
      'Le quadriceps, qui étend le genou, est mis en tension passive par la flexion du genou ; le droit fémoral, seul chef à croiser aussi la hanche, l’est davantage encore quand la hanche est en extension — d’où l’intérêt de ne pas laisser le genou partir en avant.',
    mechanics:
      'Mise en tension passive par flexion de genou et extension de hanche simultanées, dans le plan sagittal, sans charge ni mouvement répété.',
    benefits: [
      'Complète l’étirement des ischio-jambiers pour couvrir les deux faces de la cuisse.',
      'Entretient l’amplitude de flexion du genou, souvent réduite par la position assise prolongée.',
      'Ne demande qu’un appui pour l’équilibre.',
    ],
    precautions:
      'Si attraper la cheville est impossible, passe une sangle ou une serviette autour du pied plutôt que de tirer le buste vers l’arrière pour aller la chercher.',
  },

  gluteStretch: {
    slug: 'etirement-fessier-figure-4',
    muscles: { primary: 'Fessiers', secondary: 'Rotateurs de hanche' },
    steps: [
      'Allonge-toi sur le dos, genoux fléchis, pieds au sol.',
      'Pose la cheville d’un côté sur le genou opposé, en formant un 4.',
      'Passe les mains derrière la cuisse d’appui et tire-la doucement vers toi.',
      'Garde la tête et les épaules au sol, puis change de côté.',
    ],
    mistakes: [
      'Épaules et tête décollées du sol, ce qui crispe la nuque sans rien ajouter à l’étirement.',
      'Tirer par à-coups au lieu d’installer une traction constante.',
      'Genou de la jambe croisée poussé vers l’intérieur, ce qui ferme la hanche au lieu de l’ouvrir.',
    ],
    sensation:
      'La tension se sent profondément dans la fesse du côté croisé, parfois jusqu’à l’extérieur de la hanche. Rien ne doit tirer dans le genou croisé.',
    rangeOfMotion:
      'Tire la cuisse d’appui jusqu’à une tension nette mais tolérable. Plus la cuisse vient vers la poitrine, plus l’étirement est marqué.',
    tempo:
      'Aucun rythme : la position se tient immobile, respiration lente. L’expiration aide souvent à relâcher un peu plus.',
    anatomy:
      'Le grand fessier et les rotateurs externes profonds de la hanche, dont le piriforme, sont mis en tension passive par la combinaison flexion + rotation externe de hanche que produit la position en 4.',
    mechanics:
      'Mise en tension passive par flexion de hanche associée à une rotation externe, en décharge complète — le dos reste au sol, ce qui évite toute compression de la colonne pendant l’étirement.',
    benefits: [
      'Cible une zone que les étirements de cuisse ne touchent pas, et qui se raidit avec la position assise prolongée.',
      'Se pratique au sol, sans équilibre à tenir, donc accessible même quand la hanche est raide.',
      'Complète le travail des fessiers (pont, abduction) par la mobilité correspondante.',
    ],
    precautions:
      'Si la hanche croisée accroche ou pince, réduis la traction : une position moins profonde et indolore vaut mieux qu’une position forcée.',
  },

  calfStretch: {
    slug: 'etirement-mollets-au-mur',
    muscles: { primary: 'Mollets' },
    steps: [
      'Place les mains à plat sur un mur, à hauteur de poitrine.',
      'Recule une jambe, tendue, talon posé au sol et pied dans l’axe.',
      'Fléchis la jambe avant et avance le bassin jusqu’à sentir l’étirement dans le mollet arrière.',
      'Maintiens la position sans à-coups, puis change de jambe.',
    ],
    mistakes: [
      'Talon arrière qui décolle : l’étirement disparaît instantanément.',
      'Pied arrière tourné vers l’extérieur, ce qui reporte la contrainte sur la cheville.',
      'Bassin qui recule au lieu d’avancer, ce qui annule la mise en tension.',
    ],
    sensation:
      'La tension se sent à l’arrière de la jambe arrière, du creux du genou jusqu’au talon. Fléchir légèrement le genou arrière déplace la tension vers le bas du mollet.',
    rangeOfMotion:
      'Avance le bassin jusqu’à une tension nette mais tolérable, talon toujours au sol — c’est le talon qui fixe la limite, pas la distance des pieds.',
    tempo:
      'Aucun rythme : position tenue immobile, respiration lente et régulière.',
    anatomy:
      'Le triceps sural — gastrocnémiens et soléaire — est mis en tension par la flexion dorsale de cheville. Genou arrière tendu, la tension porte surtout sur les gastrocnémiens, qui croisent aussi le genou ; genou légèrement fléchi, elle se déplace vers le soléaire.',
    mechanics:
      'Mise en tension passive par flexion dorsale de cheville contre un appui fixe, sans charge ni mouvement répété.',
    benefits: [
      'Entretient la flexion dorsale de cheville, dont le manque est la première cause de talons qui décollent au squat.',
      'Sort les mollets de leur isolement : c’était le seul groupe avec un unique exercice dans la bibliothèque.',
      'Ne demande qu’un mur.',
    ],
    precautions:
      'Une tension vive et localisée au tendon d’Achille n’est pas l’étirement recherché : recule le bassin et réduis l’amplitude.',
  },

  childPose: {
    slug: 'posture-de-l-enfant',
    muscles: { primary: 'Dos, mobilité', secondary: 'Hanches, épaules' },
    steps: [
      'Place-toi à quatre pattes, genoux écartés à la largeur des hanches.',
      'Assieds-toi progressivement sur les talons en laissant les mains posées devant toi.',
      'Allonge les bras loin devant et laisse le front descendre vers le sol.',
      'Respire lentement en laissant le dos s’arrondir à chaque expiration.',
    ],
    mistakes: [
      'Épaules crispées vers les oreilles au lieu de laisser le buste se relâcher.',
      'Forcer les fesses vers les talons quand la mobilité de cheville ou de genou ne le permet pas.',
      'Respiration bloquée, alors que c’est elle qui ouvre progressivement la position.',
    ],
    sensation:
      'Un étirement diffus le long du dos et à l’arrière des épaules, avec une sensation de relâchement plutôt que de traction. Rien ne doit tirer dans les genoux.',
    rangeOfMotion:
      'Descends jusqu’où le confort le permet ; l’écart des genoux règle la place laissée au buste. La position s’ouvre d’elle-même au fil des respirations.',
    tempo:
      'Aucun rythme d’exécution : la position se tient. Ce sont les expirations qui font progresser l’amplitude, pas la force.',
    anatomy:
      'Ce n’est pas un renforcement : les érecteurs du rachis et le grand dorsal sont mis en allongement passif, pendant que les hanches partent en flexion complète. C’est le pendant statique du chat-vache, qui mobilise la même zone en dynamique.',
    mechanics:
      'Flexion globale du rachis et des hanches en décharge, le poids du corps reposant sur les cuisses et les bras plutôt que sur la colonne.',
    benefits: [
      'Le seul étirement du dos de cette bibliothèque, complément statique du chat-vache.',
      'Sert de transition en fin de séance, ou de récupération entre deux séries exigeantes pour le dos.',
      'Ne demande aucun matériel, juste un sol confortable.',
    ],
    precautions:
      'Un genou douloureux dans cette position se soulage en glissant un coussin entre les fesses et les talons, plutôt qu’en renonçant à la posture.',
  },

  tricepsStretch: {
    slug: 'etirement-triceps',
    muscles: { primary: 'Triceps', secondary: 'Épaules' },
    steps: [
      'Debout ou assis, lève un bras et plie le coude pour poser la main entre les omoplates.',
      'Le coude pointe vers le plafond, le plus près possible de la tête.',
      'Attrape ce coude avec l’autre main et pousse-le doucement vers l’arrière.',
      'Maintiens sans à-coups, puis change de bras.',
    ],
    mistakes: [
      'Cambrer le bas du dos pour donner l’illusion d’un coude plus reculé.',
      'Pousser le coude par à-coups au lieu d’une pression constante.',
      'Tête poussée vers l’avant par le bras, ce qui crispe la nuque.',
    ],
    sensation:
      'La tension se sent à l’arrière du bras, du coude vers l’épaule. Une gêne dans l’articulation de l’épaule elle-même signale de réduire la poussée.',
    rangeOfMotion:
      'Pousse le coude jusqu’à une tension nette mais tolérable. C’est l’amplitude de l’épaule au-dessus de la tête qui limite, pas la force de la main qui pousse.',
    tempo:
      'Aucun rythme : position tenue immobile, respiration lente.',
    anatomy:
      'Le triceps brachial, seul extenseur du coude, est mis en tension par la flexion complète du coude ; sa longue portion, qui croise aussi l’épaule, l’est davantage quand le bras est levé au-dessus de la tête — ce qui explique la position du coude vers le plafond.',
    mechanics:
      'Mise en tension passive par flexion de coude et flexion d’épaule au-dessus de la tête, sans charge ni mouvement répété.',
    benefits: [
      'Complète le travail de poussée (pompes, dips, développés) par l’étirement du muscle qui y travaille le plus.',
      'Se pratique debout comme assis, sans matériel et sans place.',
      'Entretient l’amplitude de l’épaule au-dessus de la tête, utile aux pompes piquées et aux développés.',
    ],
    precautions:
      'Si lever le bras au-dessus de la tête est douloureux, garde le coude plus bas et pousse moins : la position ne vaut pas la peine d’être forcée.',
  },

  bandChestPress: {
    slug: 'developpe-poitrine-elastique',
    muscles: { primary: 'Pectoraux, triceps', secondary: 'Épaules' },
    steps: [
      'Passe l’élastique dans le dos, au niveau des omoplates, et tiens une extrémité dans chaque main.',
      'Mains à hauteur de poitrine, coudes fléchis et proches du buste, un pied légèrement avancé pour la stabilité.',
      'Pousse les mains vers l’avant jusqu’à l’extension complète des bras.',
      'Reviens lentement en contrôlant la tension jusqu’à ce que les mains retrouvent la poitrine.',
    ],
    mistakes: [
      'Buste qui part en avant pour aider la poussée : c’est le corps qui bouge au lieu des bras.',
      'Coudes qui montent à hauteur d’épaules, ce qui met l’épaule en position défavorable.',
      'Retour relâché d’un coup au lieu d’un retour freiné.',
    ],
    sensation:
      'Le travail se sent dans la poitrine et l’arrière des bras, avec une résistance qui augmente à mesure que les bras s’étendent. Une tension dans le bas du dos signale que le buste compense.',
    rangeOfMotion:
      'Pousse jusqu’aux bras tendus sans verrouiller les coudes, et laisse revenir les mains jusqu’à la poitrine. L’amplitude est la même qu’en développé ; seul le profil de résistance change.',
    tempo:
      'Une à deux secondes pour pousser, deux à trois pour revenir en freinant. Souffle en poussant.',
    anatomy:
      'Le grand pectoral et le triceps sont les moteurs, l’avant de l’épaule assiste, et le grand dentelé maintient l’omoplate plaquée. Le gainage et la jambe avancée résistent au rappel de l’élastique, qui tire le buste vers l’arrière.',
    mechanics:
      'Adduction horizontale de l’épaule avec extension du coude, contre une résistance croissante : l’élastique est le plus tendu bras tendus, là où le poids du corps ou un haltère seraient au contraire les plus faciles. C’est l’inverse exact du profil d’une pompe.',
    benefits: [
      'Apporte un travail de poussée horizontale sans sol ni matériel lourd, utile quand les pompes ne sont pas praticables.',
      'La résistance croissante charge la fin du mouvement, là où une pompe devient facile.',
      'Un élastique se transporte partout, contrairement à une paire d’haltères.',
    ],
    progression: {
      easier: 'Prends un élastique moins tendu, ou écarte davantage les mains sur la bande.',
      harder: 'Prends un élastique plus tendu, avance le pied d’appui, ou ralentis le retour à quatre secondes.',
      readyWhen: 'Quand trois séries de quinze passent sans que le buste avance, augmente la résistance.',
    },
    precautions:
      'Vérifie l’état de l’élastique avant chaque série : une bande usée peut céder brutalement, et elle est tendue à hauteur de visage.',
  },

  bandLateralRaise: {
    slug: 'elevations-laterales-elastique',
    muscles: { primary: 'Épaules' },
    steps: [
      'Place-toi debout au milieu de l’élastique, un pied ou les deux dessus, une extrémité dans chaque main.',
      'Bras le long du corps, coudes à peine fléchis, paumes vers l’intérieur.',
      'Monte les bras sur les côtés jusqu’à hauteur d’épaule, pas plus haut.',
      'Redescends lentement en contrôlant le rappel de l’élastique.',
    ],
    mistakes: [
      'Monter plus haut que l’épaule, ce qui fait prendre le relais au trapèze supérieur.',
      'Élan du buste pour lancer les bras.',
      'Épaules qui remontent vers les oreilles pendant la montée.',
    ],
    sensation:
      'Le travail se sent sur le côté de l’épaule. Une tension dans le haut du trapèze ou la nuque signale que les épaules montent au lieu de rester basses.',
    rangeOfMotion:
      'Monte jusqu’à ce que les bras soient à l’horizontale, pas au-delà : c’est là que le deltoïde moyen finit son travail et que d’autres muscles prendraient le relais.',
    tempo:
      'Une à deux secondes pour monter, deux à trois pour redescendre. Souffle en montant.',
    anatomy:
      'Le deltoïde moyen est le moteur principal de l’abduction du bras ; le sus-épineux initie le mouvement sur les premiers degrés. Les trapèzes inférieur et moyen doivent maintenir l’omoplate basse, ce qui explique pourquoi laisser monter les épaules déplace le travail.',
    mechanics:
      'Abduction de l’épaule dans le plan frontal, contre une résistance qui croît avec l’élévation — l’élastique se tend au moment exact où le bras de levier est le plus long, ce qui rend la fin du mouvement nettement plus dure qu’avec un haltère.',
    benefits: [
      'Le seul travail d’isolation de l’épaule accessible sans haltères de la bibliothèque.',
      'Complète les mouvements de poussée, qui sollicitent surtout l’avant de l’épaule.',
      'Se dose finement en changeant la longueur d’élastique tenue, sans changer de matériel.',
    ],
    progression: {
      easier: 'Tiens l’élastique plus haut sur sa longueur, ou pose un seul pied dessus.',
      harder: 'Raccourcis la longueur tenue, mets les deux pieds sur la bande, ou marque un arrêt d’une seconde en haut.',
      readyWhen: 'Quand trois séries de quinze passent sans que les épaules montent, raccourcis l’élastique.',
    },
    precautions:
      'Ce mouvement se fait sans charge lourde par définition : si l’épaule pince en haut, réduis l’amplitude plutôt que d’insister — la douleur d’un pincement ne se travaille pas.',
  },

  bandLateralWalk: {
    slug: 'marche-laterale-elastique',
    muscles: { primary: 'Moyen fessier', secondary: 'Quadriceps, grand fessier' },
    steps: [
      'Place l’élastique juste au-dessus des genoux, pieds à la largeur des hanches.',
      'Fléchis légèrement les genoux et les hanches, en demi-squat, buste droit.',
      'Fais un pas de côté en poussant activement le genou vers l’extérieur contre l’élastique.',
      'Ramène l’autre pied sans laisser l’élastique se détendre, et enchaîne dans la même direction avant de revenir.',
    ],
    mistakes: [
      'Genoux qui rentrent quand le pied se repose : l’élastique reprend le dessus et le moyen fessier lâche.',
      'Buste qui se redresse complètement, ce qui allège le travail des fessiers.',
      'Pas trop grands, qui font perdre le contrôle de l’alignement.',
    ],
    sensation:
      'Le travail se sent sur le côté de la hanche et de la fesse, avec une brûlure qui monte progressivement. Rien ne doit tirer dans le genou.',
    rangeOfMotion:
      'Fais des pas d’une largeur d’épaules environ, en gardant la tension de l’élastique constante sur toute la série — c’est la tension continue qui fait le travail, pas l’amplitude du pas.',
    tempo:
      'Régulier et contrôlé, chaque pas posé sans rebond. Respire normalement : c’est un exercice de tension continue, pas un sprint.',
    anatomy:
      'Le moyen fessier et le petit fessier abduisent la hanche et stabilisent le bassin à chaque appui ; le tenseur du fascia lata assiste. Le demi-squat maintient quadriceps et grand fessier sous tension en isométrie pendant toute la marche.',
    mechanics:
      'Abduction de hanche dans le plan frontal contre résistance élastique, en appui alterné. C’est un des rares exercices de la bibliothèque à travailler ce plan, alors que squats et fentes travaillent presque tous dans le plan sagittal.',
    benefits: [
      'Renforce le stabilisateur latéral de la hanche, directement impliqué dans l’alignement du genou à la marche et à la course.',
      'Donne un retour tactile immédiat : si l’élastique se détend, le genou est rentré.',
      'Complète le squat élastique en isolant la composante latérale que celui-ci ne fait que résister.',
    ],
    progression: {
      easier: 'Descends l’élastique au-dessus des chevilles plutôt que des genoux, ou prends une bande plus souple.',
      harder: 'Remonte l’élastique au-dessus des genoux, descends plus bas en demi-squat, ou allonge la série.',
      readyWhen: 'Quand trois séries de quinze pas par côté passent sans que l’élastique se détende, augmente la résistance.',
    },
    precautions:
      'Si l’extérieur du genou chauffe plus que la hanche, c’est que le mouvement part du genou : rabaisse l’élastique et repars sur une amplitude plus courte.',
  },

  bandCurl: {
    slug: 'curl-biceps-elastique',
    muscles: { primary: 'Biceps', secondary: 'Avant-bras' },
    steps: [
      'Debout au milieu de l’élastique, un pied ou les deux dessus, une extrémité dans chaque main.',
      'Bras le long du corps, coudes collés aux côtes, paumes vers l’avant.',
      'Remonte les mains vers les épaules en gardant les coudes immobiles.',
      'Redescends lentement jusqu’à l’extension complète des bras.',
    ],
    mistakes: [
      'Coudes qui avancent pendant la montée : le mouvement quitte le biceps pour l’épaule.',
      'Buste qui se balance pour lancer la charge.',
      'Descente relâchée, alors que c’est la partie freinée qui fait le plus de travail.',
    ],
    sensation:
      'Le travail se sent à l’avant du bras, du coude à l’épaule. Les avant-bras chauffent aussi, ce qui est normal : ce sont eux qui tiennent l’élastique.',
    rangeOfMotion:
      'Monte jusqu’à ce que les mains approchent les épaules, redescends jusqu’aux bras complètement tendus. Écourter la descente est la façon la plus répandue de réduire le travail sans s’en rendre compte.',
    tempo:
      'Une seconde pour monter, deux à trois pour redescendre en freinant. Souffle en montant.',
    anatomy:
      'Le biceps brachial fléchit le coude et participe à la supination de l’avant-bras ; le brachial, situé dessous, est le fléchisseur le plus constant quelle que soit la position de la main. Le brachio-radial de l’avant-bras assiste.',
    mechanics:
      'Flexion du coude en chaîne ouverte contre une résistance croissante : l’élastique est le plus tendu en haut, là où le bras de levier est court, ce qui donne un profil de charge presque inverse de celui d’un haltère.',
    benefits: [
      'Le premier exercice de biceps de la bibliothèque, dans un groupe « Bras » qui n’existait pas avant ce lot.',
      'Complète les mouvements de tirage (rowing, tirage vertical), où le biceps ne travaille qu’en assistance.',
      'Ne demande qu’un élastique et tient dans un sac.',
    ],
    progression: {
      easier: 'Tiens l’élastique plus haut sur sa longueur, ou pose un seul pied dessus.',
      harder: 'Raccourcis la longueur tenue, ou marque un arrêt d’une seconde en haut de chaque répétition.',
      readyWhen: 'Quand trois séries de quinze passent sans que les coudes avancent, raccourcis l’élastique.',
    },
    precautions:
      'Une douleur au pli du coude n’est pas la brûlure recherchée : réduis la résistance et vérifie que la descente est freinée plutôt que subie.',
  },

  dumbbellShoulderPress: {
    slug: 'developpe-militaire-halteres',
    muscles: { primary: 'Épaules', secondary: 'Triceps, gainage' },
    steps: [
      'Debout ou assis, un haltère dans chaque main à hauteur d’épaules, paumes vers l’avant.',
      'Serre les fessiers et la sangle abdominale pour verrouiller le bassin.',
      'Pousse les haltères au-dessus de la tête jusqu’à l’extension des bras, sans cambrer.',
      'Redescends avec contrôle jusqu’à ce que les coudes repassent sous la hauteur des épaules.',
    ],
    mistakes: [
      'Bas du dos cambré pour compenser un manque d’amplitude d’épaule.',
      'Coudes qui partent loin sur les côtés au lieu de rester légèrement en avant du buste.',
      'Descente écourtée, qui supprime la partie la plus utile du mouvement.',
    ],
    sensation:
      'Le travail se sent dans les épaules et l’arrière des bras, avec un gainage actif du début à la fin. Une tension dans le bas du dos signale que le bassin n’est plus verrouillé.',
    rangeOfMotion:
      'Descends jusqu’à ce que les coudes passent sous la hauteur des épaules, remonte jusqu’aux bras tendus sans verrouiller brutalement. Assis dossier haut, le bas du dos est mécaniquement protégé.',
    tempo:
      'Une à deux secondes pour pousser, deux à trois pour descendre en contrôlant. Souffle en poussant.',
    anatomy:
      'Le deltoïde antérieur et le triceps sont les moteurs, le deltoïde moyen assiste. Le trapèze et le grand dentelé font tourner l’omoplate vers le haut, condition pour que le bras monte librement au-dessus de la tête ; les abdominaux empêchent la cambrure compensatoire.',
    mechanics:
      'Flexion d’épaule au-dessus de la tête associée à une extension du coude, en chaîne ouverte, avec une charge constante sur toute l’amplitude — contrairement à l’élastique, dont la résistance croît en fin de mouvement.',
    benefits: [
      'Le mouvement de poussée verticale de référence dès qu’une paire d’haltères est disponible.',
      'Charge progressivement les épaules, ce que les pompes piquées ne permettent qu’en changeant la position du corps.',
      'Travaille chaque bras indépendamment, ce qui empêche le côté fort de compenser le faible.',
    ],
    progression: {
      easier: 'Réduis la charge, ou passe en position assise avec dossier pour supprimer le travail de gainage.',
      harder: 'Augmente la charge, ou marque un arrêt d’une seconde en haut de chaque répétition.',
      readyWhen: 'Quand trois séries de douze passent sans cambrure, augmente la charge.',
    },
    precautions:
      'Si lever les bras au-dessus de la tête est douloureux, réduis l’amplitude ou tourne les paumes vers l’intérieur : la position ne se force pas.',
  },

  dumbbellFloorPress: {
    slug: 'developpe-halteres-au-sol',
    muscles: { primary: 'Pectoraux, triceps', secondary: 'Épaules' },
    steps: [
      'Allonge-toi sur le dos, genoux fléchis, pieds à plat, un haltère dans chaque main.',
      'Coudes au sol à environ 45° du buste, haltères à hauteur de poitrine.',
      'Pousse les haltères vers le plafond jusqu’à l’extension des bras.',
      'Redescends avec contrôle jusqu’à ce que les coudes touchent le sol, marque un temps, puis repousse.',
    ],
    mistakes: [
      'Laisser les coudes rebondir sur le sol au lieu de marquer un arrêt.',
      'Coudes ouverts à 90°, qui placent l’épaule en position défavorable.',
      'Bas du dos décollé du sol au lieu de rester en contact.',
    ],
    sensation:
      'Le travail se sent dans la poitrine et l’arrière des bras. Le sol donne un repère de profondeur constant qu’un développé sur banc n’a pas.',
    rangeOfMotion:
      'Le sol limite la descente : c’est précisément l’intérêt, il fixe la même profondeur à chaque répétition et empêche d’aller trop loin en extension d’épaule.',
    tempo:
      'Une à deux secondes pour pousser, deux à trois pour descendre. Un temps d’arrêt d’une seconde au contact du sol supprime tout rebond.',
    anatomy:
      'Le grand pectoral et le triceps sont les moteurs, l’avant de l’épaule assiste. L’amplitude étant bornée par le sol, l’épaule ne part jamais en extension excessive — c’est ce qui rend cette variante plus tolérante que le développé couché sur banc.',
    mechanics:
      'Adduction horizontale de l’épaule avec extension du coude, en chaîne ouverte et charge constante. Le sol tronque le bas du mouvement, transformant une amplitude libre en amplitude bornée, reproductible d’une séance à l’autre.',
    benefits: [
      'Apporte le développé horizontal chargé sans banc, avec une simple paire d’haltères et un tapis.',
      'Le repère du sol rend la profondeur identique à chaque série, donc la progression mesurable.',
      'Chaque bras travaille indépendamment, contrairement à une barre.',
    ],
    progression: {
      easier: 'Réduis la charge, ou pousse un bras après l’autre pour te concentrer sur la trajectoire.',
      harder: 'Augmente la charge, allonge le temps d’arrêt au sol, ou ralentis la descente à quatre secondes.',
      readyWhen: 'Quand trois séries de douze passent avec un arrêt net au sol à chaque répétition, augmente la charge.',
    },
    precautions:
      'Ne laisse jamais les coudes retomber en chute libre : le contact avec le sol doit être posé, pas encaissé.',
  },

  dumbbellRomanianDeadlift: {
    slug: 'souleve-de-terre-jambes-tendues',
    muscles: { primary: 'Fessiers, ischio-jambiers', secondary: 'Bas du dos, gainage' },
    steps: [
      'Debout, un haltère dans chaque main devant les cuisses, pieds à la largeur des hanches.',
      'Fléchis à peine les genoux et garde cet angle constant sur tout le mouvement.',
      'Pousse les hanches vers l’arrière et descends les haltères le long des jambes, dos plat.',
      'Descends jusqu’à sentir la tension à l’arrière des cuisses, puis reviens en poussant les hanches vers l’avant.',
    ],
    mistakes: [
      'Fléchir les genoux progressivement pendant la descente : le mouvement devient un squat et quitte les ischio-jambiers.',
      'Dos qui s’arrondit dès que la mobilité de hanche est dépassée.',
      'Haltères qui s’éloignent des jambes, ce qui augmente la contrainte sur le bas du dos.',
    ],
    sensation:
      'Une tension nette à l’arrière des cuisses pendant la descente, puis les fessiers qui prennent le relais à la remontée. Le bas du dos travaille en gainage, jamais en mouvement.',
    rangeOfMotion:
      'Descends jusqu’au bout de l’étirement des ischio-jambiers, pas plus bas : c’est la souplesse de l’arrière de cuisse qui fixe l’amplitude, pas la hauteur des haltères. Le jour où le dos s’arrondit, la limite est dépassée.',
    tempo:
      'Trois secondes pour descendre, une à deux pour remonter. Inspire en descendant, souffle en poussant les hanches vers l’avant.',
    anatomy:
      'Les ischio-jambiers et le grand fessier étendent la hanche : ce sont les moteurs. Les érecteurs du rachis travaillent en isométrie pour garder le dos plat — ils ne doivent jamais produire le mouvement, seulement l’empêcher. C’est le seul exercice de la bibliothèque à travailler la charnière de hanche sous charge.',
    mechanics:
      'Charnière de hanche pure : flexion puis extension de hanche à genou quasi fixe, dans le plan sagittal. La distinction avec le squat est là — le squat plie hanche ET genou, la charnière ne plie que la hanche.',
    benefits: [
      'Apprend la charnière de hanche, le schéma moteur qui protège le dos dès qu’on ramasse quelque chose au sol.',
      'Sollicite les ischio-jambiers en extension de hanche, complément direct du leg curl qui les travaille en flexion de genou.',
      'Renforce toute la chaîne postérieure avec un seul mouvement.',
    ],
    progression: {
      easier: 'Réduis la charge, ou descends moins bas pour rester dans l’amplitude où le dos reste plat.',
      harder: 'Augmente la charge, ou ralentis la descente à cinq secondes.',
      readyWhen: 'Quand trois séries de douze passent avec le dos plat sur toute l’amplitude, augmente la charge.',
    },
    precautions:
      'Le dos plat n’est pas négociable : si maintenir la position demande de plier le dos, la charge est trop lourde ou l’amplitude trop grande.',
  },

  dumbbellCalfRaise: {
    slug: 'mollets-debout-avec-halteres',
    muscles: { primary: 'Mollets' },
    steps: [
      'Debout, un haltère dans chaque main le long du corps, pieds à la largeur des hanches.',
      'Monte lentement sur la pointe des pieds, le plus haut possible.',
      'Marque un temps en haut, mollets contractés.',
      'Redescends lentement jusqu’à ce que les talons touchent le sol.',
    ],
    mistakes: [
      'Rebondir en bas au lieu de contrôler la descente.',
      'Chevilles qui basculent vers l’extérieur : le poids doit rester sur le gros orteil.',
      'Amplitude écourtée en haut, alors que c’est là que le mollet se contracte le plus.',
    ],
    sensation:
      'Une brûlure nette dans le mollet, qui monte vite. La charge se sent aussi dans les avant-bras, qui tiennent les haltères sur toute la série.',
    rangeOfMotion:
      'Monte aussi haut que la cheville le permet et redescends jusqu’au contact du sol. Debout sur une marche, talons dans le vide, l’amplitude s’allonge encore vers le bas.',
    tempo:
      'Une à deux secondes pour monter, un temps d’arrêt en haut, deux à trois pour redescendre. C’est la lenteur qui fait le travail, pas la charge.',
    anatomy:
      'Le triceps sural — gastrocnémiens et soléaire — produit la flexion plantaire. Genou tendu, les gastrocnémiens dominent ; c’est pourquoi la version debout complète bien tout travail assis, où le soléaire prend le relais.',
    mechanics:
      'Flexion plantaire de la cheville en chaîne fermée, avec une charge externe qui s’ajoute au poids du corps. L’amplitude est courte par nature, ce qui rend le temps sous tension plus déterminant que le nombre de répétitions.',
    benefits: [
      'Charge les mollets au-delà du poids du corps, ce que la version sans haltères ne permet plus une fois quinze répétitions faciles.',
      'Sort les mollets de leur isolement dans la bibliothèque, avec l’étirement correspondant.',
      'Renforce la poussée finale de la marche et de la course.',
    ],
    progression: {
      easier: 'Fais-le sans haltères, ou tiens-toi d’une main pour ne gérer qu’un seul poids.',
      harder: 'Augmente la charge, monte sur une marche pour allonger l’amplitude, ou passe sur une seule jambe.',
      readyWhen: 'Quand trois séries de vingt passent avec un temps d’arrêt en haut, augmente la charge ou passe sur une jambe.',
    },
    precautions:
      'Une crampe en fin de série est fréquente sur ce muscle : réduis l’amplitude et allonge le repos plutôt que de forcer la répétition suivante.',
  },

  dumbbellCurl: {
    slug: 'curl-biceps-halteres',
    muscles: { primary: 'Biceps', secondary: 'Avant-bras' },
    steps: [
      'Debout, un haltère dans chaque main, bras le long du corps, paumes vers l’avant.',
      'Coudes collés aux côtes, épaules basses et buste immobile.',
      'Remonte l’haltère vers l’épaule sans que le coude avance.',
      'Redescends lentement jusqu’à l’extension complète du bras.',
    ],
    mistakes: [
      'Balancement du buste pour lancer la charge : c’est le dos qui travaille, plus le biceps.',
      'Coudes qui avancent en fin de montée, ce qui fait intervenir l’épaule.',
      'Descente relâchée, alors que la phase freinée est la plus productive.',
    ],
    sensation:
      'Le travail se sent à l’avant du bras, du pli du coude à l’épaule. Le buste doit rester parfaitement immobile : c’est le meilleur indicateur d’une charge adaptée.',
    rangeOfMotion:
      'Monte jusqu’à ce que l’haltère approche l’épaule, redescends jusqu’au bras complètement tendu. Écourter le bas est la façon la plus courante de tricher sans s’en apercevoir.',
    tempo:
      'Une seconde pour monter, deux à trois pour redescendre. Souffle en montant.',
    anatomy:
      'Le biceps brachial fléchit le coude et supine l’avant-bras — d’où la paume vers l’avant, qui le place en position favorable. Le brachial, sous le biceps, fléchit le coude quelle que soit la position de la main ; le brachio-radial assiste.',
    mechanics:
      'Flexion du coude en chaîne ouverte à charge constante : contrairement à l’élastique, la résistance ne varie pas, mais le bras de levier, lui, est maximal quand l’avant-bras est à l’horizontale — c’est là que le mouvement est le plus dur.',
    benefits: [
      'Le mouvement de biceps le plus direct, avec une charge réglable finement.',
      'Complète les tirages (rowing, tirage vertical), où le biceps n’est que secondaire.',
      'Chaque bras travaille séparément, ce qui révèle et corrige un déséquilibre.',
    ],
    progression: {
      easier: 'Réduis la charge, ou appuie le dos contre un mur pour supprimer toute possibilité de balancement.',
      harder: 'Augmente la charge, ralentis la descente à quatre secondes, ou marque un arrêt à mi-hauteur.',
      readyWhen: 'Quand trois séries de douze passent sans que le buste bouge, augmente la charge.',
    },
    precautions:
      'Une douleur au pli du coude, distincte de la brûlure musculaire, demande de réduire la charge : les tendons du coude tolèrent mal la surcharge brutale sur ce mouvement.',
  },

  dumbbellTricepsExtension: {
    slug: 'extension-triceps',
    muscles: { primary: 'Triceps' },
    steps: [
      'Debout ou assis, tiens un haltère à deux mains, bras tendus au-dessus de la tête.',
      'Coudes serrés vers l’avant, le plus proches possible des oreilles.',
      'Fléchis les coudes pour descendre l’haltère derrière la nuque, sans écarter les coudes.',
      'Remonte jusqu’à l’extension complète des bras, coudes toujours serrés.',
    ],
    mistakes: [
      'Coudes qui s’écartent vers l’extérieur, ce qui déplace la charge du triceps vers l’épaule.',
      'Bas du dos cambré pour compenser un manque d’amplitude d’épaule.',
      'Descente trop rapide, alors que la charge est derrière la tête.',
    ],
    sensation:
      'Le travail se sent à l’arrière du bras, du coude à l’épaule. Une gêne dans l’articulation de l’épaule signale que les coudes se sont écartés ou que la charge est trop lourde.',
    rangeOfMotion:
      'Descends jusqu’à sentir l’étirement à l’arrière du bras, sans forcer, puis remonte jusqu’aux bras tendus. Bras au-dessus de la tête, la longue portion du triceps est déjà pré-étirée : l’amplitude utile est donc plus courte qu’il n’y paraît.',
    tempo:
      'Une à deux secondes pour monter, deux à trois pour descendre en contrôlant. Souffle en poussant.',
    anatomy:
      'Le triceps brachial est le seul extenseur du coude. Sa longue portion croise aussi l’épaule : la position bras au-dessus de la tête la met en tension avant même le début du mouvement, ce qui explique que cette variante la sollicite plus qu’une extension bras le long du corps.',
    mechanics:
      'Extension du coude en chaîne ouverte, épaule fléchie au-dessus de la tête et maintenue fixe. C’est le rôle du gainage et des coudes serrés : empêcher l’épaule de participer, pour que seul le coude bouge.',
    benefits: [
      'Cible le triceps dans une position que les dips et les pompes ne reproduisent pas.',
      'Se fait avec un seul haltère, debout ou assis, sans banc.',
      'Complète le curl pour couvrir les deux faces du bras dans le groupe « Bras ».',
    ],
    progression: {
      easier: 'Réduis la charge, ou fais le mouvement un bras à la fois pour mieux contrôler la trajectoire.',
      harder: 'Augmente la charge, ou marque un arrêt d’une seconde en position basse.',
      readyWhen: 'Quand trois séries de douze passent sans que les coudes s’écartent, augmente la charge.',
    },
    precautions:
      'Commence léger : la charge est derrière la tête, et une perte de contrôle y est plus délicate que sur un mouvement devant le corps. Assis avec un dossier, le bas du dos est mieux protégé.',
  },

  chestPressMachine: {
    slug: 'developpe-poitrine-machine',
    muscles: { primary: 'Pectoraux, triceps', secondary: 'Épaules' },
    steps: [
      'Règle la hauteur du siège pour que les poignées arrivent à hauteur de poitrine.',
      'Assieds-toi, dos et épaules bien calés contre le dossier, pieds à plat au sol.',
      'Pousse les poignées vers l’avant jusqu’à l’extension des bras, sans verrouiller les coudes.',
      'Reviens avec contrôle jusqu’à ce que les mains repassent au niveau de la poitrine.',
    ],
    mistakes: [
      'Épaules qui décollent du dossier pour gagner quelques centimètres de poussée.',
      'Verrouiller les coudes en fin de poussée, ce qui reporte la charge sur l’articulation.',
      'Retour trop rapide, alors que la phase freinée est la plus productive.',
    ],
    sensation:
      'Le travail se sent dans la poitrine et l’arrière des bras, sans effort de stabilisation : le dossier s’en charge. C’est ce qui distingue cette machine d’une pompe.',
    rangeOfMotion:
      'Reviens jusqu’à ce que les mains soient au niveau de la poitrine, pas au-delà — au-delà, l’épaule part en extension excessive contre une charge guidée, ce qui n’apporte rien.',
    tempo:
      'Une à deux secondes pour pousser, deux à trois pour revenir. Souffle en poussant.',
    anatomy:
      'Le grand pectoral et le triceps sont les moteurs, l’avant de l’épaule assiste. Le dossier remplace tout le travail de gainage qu’une pompe demande, ce qui concentre l’effort sur les muscles de la poussée et rien d’autre.',
    mechanics:
      'Adduction horizontale de l’épaule avec extension du coude, sur une trajectoire imposée par la machine. Le buste étant fixé, la variable est la charge, pas la stabilité — l’inverse exact d’une pompe.',
    benefits: [
      'Permet de charger la poussée horizontale lourdement sans partenaire ni banc, avec un réglage fin de la charge.',
      'La trajectoire guidée réduit le risque d’erreur technique par rapport à un mouvement libre chargé.',
      'Utile en complément des pompes, ou en remplacement quand le poignet ou le gainage limitent.',
    ],
    progression: {
      easier: 'Réduis la charge, ou raccourcis l’amplitude en revenant un peu moins loin.',
      harder: 'Augmente la charge, ralentis le retour à quatre secondes, ou marque un arrêt en position basse.',
      readyWhen: 'Quand trois séries de douze passent sans que les épaules décollent du dossier, augmente la charge.',
    },
    precautions:
      'Garde les épaules en contact avec le dossier du début à la fin : c’est ce contact qui protège l’articulation sur une trajectoire imposée.',
  },

  legCurlMachine: {
    slug: 'leg-curl',
    muscles: { primary: 'Ischio-jambiers', secondary: 'Mollets' },
    steps: [
      'Règle la machine pour que le rouleau repose sur le bas des mollets, juste au-dessus des talons.',
      'Installe-toi, bassin bien plaqué contre l’appui, jambes tendues sans verrouiller les genoux.',
      'Fléchis les genoux pour amener les talons vers les fessiers, avec contrôle.',
      'Redescends lentement jusqu’à l’extension, sans laisser la charge retomber.',
    ],
    mistakes: [
      'Bassin qui décolle pour aider la flexion : le mouvement quitte les ischio-jambiers.',
      'Descente non freinée, la charge retombant seule.',
      'Rouleau mal placé, trop haut sur le mollet, ce qui gêne au lieu de charger.',
    ],
    sensation:
      'Une contraction nette à l’arrière de la cuisse, du genou vers la fesse. Le bas du dos ne doit rien ressentir : si c’est le cas, le bassin s’est décollé.',
    rangeOfMotion:
      'Fléchis autant que la machine le permet sans que le bassin bouge, et redescends jusqu’à l’extension complète mais sans verrouiller. L’amplitude complète compte plus que la charge sur ce mouvement.',
    tempo:
      'Une à deux secondes pour fléchir, deux à trois pour redescendre en freinant. Souffle en fléchissant.',
    anatomy:
      'Les ischio-jambiers fléchissent le genou : c’est leur action principale, et c’est précisément celle qu’aucun exercice au poids du corps de la bibliothèque ne charge directement. Les gastrocnémiens, qui croisent aussi le genou, assistent.',
    mechanics:
      'Flexion du genou en chaîne ouverte, hanche fixe, sur une trajectoire guidée. C’est le complément exact du soulevé de terre jambes tendues, qui sollicite les mêmes muscles mais en extension de hanche, genou quasi fixe.',
    benefits: [
      'Comble le seul manque criant de la bibliothèque : aucun exercice ne chargeait les ischio-jambiers en flexion de genou.',
      'Équilibre le travail des cuisses, largement dominé par les quadriceps (squats, fentes, presse).',
      'Trajectoire guidée et charge réglable, donc progression mesurable.',
    ],
    progression: {
      easier: 'Réduis la charge, ou raccourcis l’amplitude en fléchissant un peu moins.',
      harder: 'Augmente la charge, ralentis la descente à quatre secondes, ou marque un arrêt d’une seconde en position fléchie.',
      readyWhen: 'Quand trois séries de douze passent sans que le bassin décolle, augmente la charge.',
    },
    precautions:
      'Une crampe à l’arrière de la cuisse est fréquente sur ce mouvement : réduis la charge et allonge l’échauffement plutôt que d’insister.',
  },

  treadmill: {
    slug: 'tapis-de-course',
    muscles: { primary: 'Cardio, jambes' },
    steps: [
      'Monte sur le tapis à l’arrêt ou à vitesse très lente, avant d’accélérer progressivement.',
      'Choisis une allure où parler reste possible mais devient un peu essoufflé.',
      'Garde le buste droit, le regard loin devant, sans t’accrocher aux barres.',
      'Maintiens l’allure sur toute la durée prévue, puis ralentis progressivement avant de descendre.',
    ],
    mistakes: [
      'S’accrocher aux barres latérales : le poids est en partie porté, l’effort réel chute sans que la vitesse affichée bouge.',
      'Regard rivé à l’écran, ce qui casse la posture du cou.',
      'Démarrer trop vite au lieu d’installer l’allure progressivement.',
    ],
    sensation:
      'Un essoufflement modéré, stable sur toute la durée : la conversation doit rester possible mais pas confortable.',
    rangeOfMotion:
      'Pas d’amplitude à régler, mais une foulée : pose le talon, déroule le pied, laisse les bras balancer librement depuis l’épaule.',
    tempo:
      'Une allure régulière et tenue, plutôt que des accélérations suivies de récupérations — sauf si les intervalles sont l’objectif du jour.',
    anatomy:
      'La même chaîne musculaire que la marche : fessiers et ischio-jambiers propulsent, quadriceps amortissent, mollets assurent la poussée finale, et le gainage stabilise le bassin à chaque appui.',
    mechanics:
      'Locomotion cyclique sur un tapis motorisé. La différence avec la marche extérieure tient à la pente réglable : c’est elle, plus que la vitesse, qui augmente l’effort sans augmenter l’impact — un réglage que le terrain extérieur ne donne pas à volonté.',
    benefits: [
      'Permet de fixer précisément allure et pente, donc de reproduire exactement le même effort d’une séance à l’autre.',
      'La pente charge davantage fessiers et mollets sans exiger de courir plus vite.',
      'Indépendant de la météo et de l’heure, contrairement à la marche extérieure.',
    ],
    progression: {
      easier: 'Réduis la vitesse avant de réduire la durée : mieux vaut quinze minutes tenues que trente subies.',
      harder: 'Monte la pente à allure constante, allonge la durée, ou alterne des portions plus rapides.',
      readyWhen: 'Quand vingt minutes à allure constante passent en gardant une conversation possible, augmente la pente.',
    },
    precautions:
      'Règle l’arrêt d’urgence (pince aimantée) avant de démarrer, et ne descends jamais du tapis en marche.',
  },

  stationaryBike: {
    slug: 'velo-d-appartement',
    muscles: { primary: 'Cardio, cuisses', secondary: 'Fessiers' },
    steps: [
      'Règle la selle pour que le genou garde un léger pli quand la pédale est au plus bas.',
      'Assieds-toi, mains posées sans crispation, dos ni cassé ni cambré.',
      'Installe une cadence régulière, puis ajuste la résistance pour trouver l’allure de travail.',
      'Maintiens cadence et résistance sur toute la durée, puis termine par quelques minutes légères.',
    ],
    mistakes: [
      'Selle trop basse : le genou reste trop fléchi en bas, ce qui charge inutilement l’articulation.',
      'Bassin qui se balance d’un côté à l’autre, signe d’une selle trop haute.',
      'Résistance quasi nulle avec une cadence très élevée, qui donne l’illusion de l’effort sans le produire.',
    ],
    sensation:
      'Un essoufflement modéré et une chauffe progressive dans les cuisses. Contrairement à la marche ou au tapis, le poids du corps ne repose jamais sur les jambes.',
    rangeOfMotion:
      'Pas d’amplitude à régler, mais un réglage de selle : le genou garde un léger pli en bas de course, sans que le bassin ait à basculer pour atteindre la pédale.',
    tempo:
      'Une cadence régulière tenue sur toute la durée. La résistance est le vrai réglage d’intensité, pas la vitesse de pédalage.',
    anatomy:
      'Quadriceps et grand fessier produisent l’extension du genou et de la hanche à chaque poussée ; les ischio-jambiers et les mollets participent sur la remontée quand les pieds sont fixés. La position assise décharge complètement la colonne et les articulations porteuses.',
    mechanics:
      'Pédalage cyclique en chaîne fermée, sans mise en charge : c’est l’axe qui distingue le vélo de tout le reste du cardio de la bibliothèque — le corps est porté par la selle, donc les genoux, les hanches et le dos ne subissent aucun impact ni compression liée au poids.',
    benefits: [
      'Le seul cardio de la bibliothèque qui ne fait porter aucun poids aux jambes, donc praticable quand la marche ou la course gênent une articulation.',
      'La résistance se règle finement, ce qui rend l’intensité reproductible d’une séance à l’autre.',
      'Permet de tenir de longues durées sans contrainte articulaire cumulée.',
    ],
    progression: {
      easier: 'Baisse la résistance avant de réduire la durée, et garde une cadence confortable.',
      harder: 'Augmente la résistance à cadence constante, allonge la durée, ou alterne des blocs plus résistants.',
      readyWhen: 'Quand vingt minutes passent sans que la cadence chute en fin de séance, augmente la résistance.',
    },
    precautions:
      'Un genou douloureux vient presque toujours d’un réglage de selle, pas de l’effort : vérifie la hauteur avant de réduire l’intensité.',
  },

  rowingMachine: {
    slug: 'rameur',
    muscles: { primary: 'Cardio, dos, jambes', secondary: 'Bras, gainage' },
    steps: [
      'Attache les pieds, saisis la poignée bras tendus, tibias verticaux, buste légèrement en avant : c’est la position d’attaque.',
      'Pousse d’abord fort avec les jambes, bras encore tendus et buste immobile.',
      'Quand les jambes sont presque tendues, ouvre le buste vers l’arrière, puis seulement là tire la poignée vers le bas des côtes.',
      'Reviens dans l’ordre inverse : tends les bras, ramène le buste vers l’avant, puis plie les jambes.',
    ],
    mistakes: [
      'Tirer avec les bras avant que les jambes aient poussé : c’est l’erreur la plus répandue, et elle prive le mouvement de sa principale source de puissance.',
      'Ouvrir le buste trop tôt, ce qui reporte la charge sur le bas du dos.',
      'Dos arrondi en position d’attaque, sous prétexte d’aller chercher plus loin.',
    ],
    sensation:
      'Les jambes brûlent en premier, puis le dos et les bras. Si les bras fatiguent avant les jambes, l’ordre du coup est inversé.',
    rangeOfMotion:
      'La poignée arrive au bas des côtes, pas à la poitrine ni au ventre. En position d’attaque, les tibias sont verticaux : aller plus loin ne gagne rien et force le dos.',
    tempo:
      'Un rythme régulier, avec un retour environ deux fois plus lent que la poussée. C’est ce rapport, pas la cadence, qui distingue un coup propre d’un coup précipité.',
    anatomy:
      'Quadriceps et fessiers produisent l’essentiel de la puissance sur la poussée ; le grand dorsal, les rhomboïdes et le trapèze moyen tirent ensuite l’omoplate vers la colonne ; le biceps termine. Le gainage transmet la force des jambes au haut du corps, ce qui fait du rameur un mouvement de chaîne complète.',
    mechanics:
      'Séquence en quatre temps — attaque, poussée, finale, retour — combinant extension de jambes, extension de hanche et tirage horizontal. C’est le seul mouvement de la bibliothèque où l’ordre des segments compte autant que la force produite : jambes, puis buste, puis bras.',
    benefits: [
      'Le seul cardio de la bibliothèque qui est aussi un vrai geste technique : la qualité du coup progresse en même temps que la condition physique.',
      'Fait travailler la chaîne de tirage, absente des autres exercices cardio.',
      'Sans impact, tout en sollicitant nettement plus de masse musculaire que la marche ou le vélo.',
    ],
    progression: {
      easier: 'Réduis la durée avant d’augmenter la cadence, et concentre-toi sur l’ordre jambes-buste-bras.',
      harder: 'Allonge la durée, augmente le rythme en gardant le rapport retour/poussée, ou travaille par blocs.',
      readyWhen: 'Quand quinze minutes passent avec un ordre de coup respecté du début à la fin, allonge la durée.',
    },
    precautions:
      'Le bas du dos ne doit jamais être le moteur : si la fatigue s’y installe, c’est que le buste s’ouvre avant que les jambes aient fini de pousser. Reprends plus lentement, moins fort.',
  },
};
