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
  /** 4 a 7 etapes ordonnees. */
  steps: string[];
  /** 2 a 4 erreurs frequentes ou points de securite. */
  mistakes: string[];
  /**
   * Prompt pour generer une illustration avec Gemini (voir docs/image-prompts.md,
   * genere depuis ce champ par scripts/build-exercise-pages.ts). Tant qu'aucune
   * image n'existe, la page detaillee n'en reference aucune : elle reutilise la
   * figure SVG existante, deja fiable.
   */
  imagePrompt: string;
}

/**
 * Prefixe commun a tous les prompts : garde une direction artistique
 * coherente d'un exercice a l'autre, meme generes separement dans Gemini.
 */
const ART_DIRECTION =
  'Illustration plate et minimaliste, fond uni vert tres sombre (#0e1210), ' +
  'silhouette humaine simplifiee en blanc casse (#f2f0e8), un seul accent ' +
  'vert citron (#d7ff3f) sur le groupe musculaire principal sollicite, trait ' +
  'epais et propre, aucun texte, aucun logo, cadrage carre. ';

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
    imagePrompt:
      ART_DIRECTION +
      'Personne faisant des pompes inclinées, mains posées sur un rebord surélevé, vue de profil, corps aligné en ligne droite des chevilles à la tête, coudes à 45°.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne en train de faire un squat devant une chaise, vue de profil, hanches reculées, genoux dans l’axe des pieds, buste droit, juste avant de toucher l’assise.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne debout sur la pointe des pieds, vue de face, talons levés, mollets contractés, bras légèrement écartés pour l’équilibre.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne assise contre un mur sans chaise, cuisses parallèles au sol, genoux à 90°, dos plaqué au mur, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne allongée sur le côté, coude plié collé au corps, avant-bras qui pivote vers le haut tenant une petite charge, vue de dessus légèrement en angle.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne allongée sur le dos, un bras et la jambe opposée tendus en diagonale vers le bas, l’autre bras et l’autre jambe repliés, vue de dessus.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne en planche sur les avant-bras, corps parfaitement aligné des talons à la tête, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne en pleine marche, vue de profil, buste droit, un bras en avant et l’autre en arrière, mi-foulée.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne faisant des pompes sur les genoux, vue de profil, corps aligné des genoux à la tête, coudes à 45°, poitrine proche du sol.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne debout inclinée vers un mur, mains posées sur le mur à hauteur de poitrine, corps en ligne droite, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne faisant des dips triceps sur une chaise, mains sur le bord de l’assise, jambes tendues devant, coudes pliés vers l’arrière, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne debout, bras tendus à l’horizontale de chaque côté, petites flèches circulaires autour des mains indiquant le mouvement, vue de face.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne debout dos au mur, bras pliés en position de W contre le mur glissant vers le haut, flèche verticale indiquant le mouvement, vue de face.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne allongée sur le ventre, bras et jambes levés simultanément en légère extension, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne allongée sur le ventre, bras dessinant un large arc depuis l’avant du corps vers les hanches, flèche courbe indiquant la trajectoire, vue de dessus.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne à quatre pattes, un bras tendu devant et la jambe opposée tendue derrière, dos plat, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne à quatre pattes, dos arqué vers le haut puis vers le bas, flèche indiquant le mouvement de va-et-vient de la colonne, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne en fente arrière, jambe arrière fléchie proche du sol, genou avant à 90°, buste droit, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne montant sur une chaise stable, un pied posé sur l’assise en pleine poussée, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne en fente latérale, une jambe pliée et l’autre tendue sur le côté, buste droit, vue de face.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne allongée sur le dos, genoux pliés, hanches levées en pont, fessiers contractés, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne à quatre pattes, un genou plié poussé vers le plafond, dos plat, vue de trois-quarts arrière.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne debout, une jambe tendue levée sur le côté, buste droit, flèche indiquant le mouvement latéral, vue de face.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne en planche latérale, appui sur un avant-bras, corps en ligne droite des pieds à la tête, autre bras levé, vue de face.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne debout, un genou levé vers la poitrine, dos droit, bras en équilibre, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne allongée sur le dos, genoux pliés, épaules légèrement décollées du sol en contraction abdominale, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne en train de marcher sur place, un genou levé à hauteur de hanche, bras en mouvement, vue de profil.',
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
    imagePrompt:
      ART_DIRECTION +
      'Personne en train de marcher sur place, un talon ramené vers le fessier, buste droit, vue de profil.',
  },
};
