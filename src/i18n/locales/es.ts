import type { Translations } from '../index';

export const es: Translations = {
  app: {
    title: 'Sesión — vuelta con peso corporal',
    eyebrow: 'Fase 1 · sin material',
    heading: 'Mi sesión',
    tagline:
      'Construye tu entrenamiento, ordena los ejercicios, ajusta las pausas. Todo se queda en este dispositivo.',
    sourceCode: 'Código fuente',
  },

  lang: {
    label: 'Idioma',
  },

  about: {
    title: 'Acerca de Séance',
    intro:
      'Séance es un planificador y cronómetro de entrenamiento con el peso corporal, pensado para retomar la actividad sin material. Compones tu sesión a partir de una biblioteca de ejercicios — flexiones inclinadas, sentadillas a la silla, sentadilla isométrica en pared, plancha, dead bug, elevación de gemelos, rotación externa de hombro, caminata — y luego ajustas las series, las repeticiones o las duraciones, y los descansos.',
    modes:
      'Dos formas de encadenar las series. En modo clásico, haces todas las series de un ejercicio antes de pasar al siguiente, con el descanso ajustado en cada línea. En modo circuito, las series alternan los grupos musculares y solo aparece una pausa cuando dos esfuerzos del mismo grupo tienen que seguirse forzosamente — la vista previa muestra la secuencia calculada antes de empezar.',
    privacy:
      'Durante la sesión, un reproductor a pantalla completa muestra el cronómetro, el anillo de progreso y la indicación de ejecución, mantiene la pantalla encendida y avisa del final de cada intervalo. Sin cuenta, sin servidor, sin datos enviados: la sesión y el historial se guardan en el navegador. La interfaz está disponible en francés, inglés, español, alemán e italiano.',
  },

  exerciseInfo: {
    trigger: 'Información del ejercicio',
    close: 'Cerrar',
    muscles: 'Músculos trabajados',
    keyPoints: 'Puntos clave',
    moreInfo: 'Más información',
    unavailable: 'Ficha detallada disponible próximamente en este idioma — mostrando en francés.',
  },

  mode: {
    classic: 'Clásico',
    circuit: 'Circuito',
    hintClassic:
      'Todas las series de un ejercicio y luego se pasa al siguiente, con el descanso ajustado en cada línea.',
    hintCircuit:
      'Las series se encadenan alternando los grupos musculares. Solo aparece una pausa si dos esfuerzos del mismo grupo deben seguirse.',
  },

  settings: {
    pause: 'Pausa obligada (s)',
    transition: 'Transición entre ejercicios (s)',
  },

  section: {
    plan: 'Desarrollo',
    library: 'Biblioteca',
  },

  library: {
    search: 'Buscar un ejercicio…',
    filterLabel: 'Filtrar por grupo muscular',
    filterAll: 'Todos los grupos',
    noResults: 'Ningún ejercicio coincide con esta búsqueda.',
  },

  empty: {
    title: 'Todavía no hay ejercicios',
    body: 'Elige de la lista de abajo para construir tu sesión.',
  },

  preview: {
    title: 'Secuencia calculada',
    lead: {
      one: '{count} serie encadenada alternando los grupos.',
      other: '{count} series encadenadas alternando los grupos.',
    },
    noneForced: 'Ninguna pausa obligada: cada serie cae en un grupo distinto del anterior.',
    forced: {
      one: '{count} pausa obligada: en ese momento dos esfuerzos del mismo grupo se siguen forzosamente. Añade un ejercicio de otro grupo para hacerla desaparecer.',
      other:
        '{count} pausas obligadas: en esos momentos dos esfuerzos del mismo grupo se siguen forzosamente. Añade un ejercicio de otro grupo para hacerlas desaparecer.',
    },
  },

  actions: {
    addRest: '+ Añadir una pausa',
    addCustom: '+ Ejercicio propio',
    loadDefault: 'Cargar la sesión tipo',
    clearAll: 'Borrar todo',
  },

  storage: {
    saved: 'Guardado',
    unavailable: 'No se puede guardar: el almacenamiento local está desactivado en este navegador.',
  },

  item: {
    restName: 'Pausa',
    restSeconds: 'Duración (s)',
    sets: 'Series',
    effort: 'Tipo',
    reps: 'Repeticiones',
    seconds: 'Duración (s)',
    group: 'Grupo muscular',
    rest: 'Descanso entre series (s)',
    delete: 'Eliminar',
    moveUp: 'Subir',
    moveDown: 'Bajar',
  },

  effort: {
    reps: 'Repeticiones',
    time: 'Duración',
  },

  group: {
    push: 'Pecho / brazos',
    shoulders: 'Hombros',
    back: 'Espalda',
    legs: 'Muslos',
    calves: 'Gemelos',
    core: 'Core',
    cardio: 'Cardio',
    glutes: 'Glúteos',
  },

  duration: {
    minutes: '{count} min',
    seconds: '{count} s',
  },

  summary: {
    sets: '{sets} × {effort}',
  },

  bar: {
    emptyTitle: 'Sesión vacía',
    emptySub: 'Añade un ejercicio para empezar',
    exercises: {
      one: '{count} ejercicio',
      other: '{count} ejercicios',
    },
    subtitle: '{mode} · ≈ {duration}',
    start: 'Empezar',
  },

  prompt: {
    customName: '¿Nombre del ejercicio?',
    loadDefault: '¿Sustituir la sesión actual por la sesión tipo?',
    clearAll: '¿Borrar toda la sesión?',
  },

  history: {
    summary: {
      one: '{count} sesión terminada. Última: {dates}',
      other: '{count} sesiones terminadas. Últimas: {dates}',
    },
  },

  rest: {
    manual: 'Pausa',
    betweenSets: 'Descanso',
    forced: 'Pausa obligada',
    transition: 'Transición',
  },

  runner: {
    quit: 'Salir',
    step: 'Paso {current} / {total}',
    next: 'Después — {name}',
    lastEffort: 'Último esfuerzo',
    then: 'Luego {name}',
    recover: 'Recupera',
    forcedCue: 'Dos esfuerzos del mismo grupo se siguen: esta pausa es necesaria.',
    transitionCue: 'Colócate para el siguiente ejercicio.',
    addTime: '+15 s',
    skip: 'Saltar',
    setOf: 'Serie {current} de {total}',
    setDone: 'Serie terminada',
    reps: {
      one: '{count} rep',
      other: '{count} reps',
    },
    readyHint: 'Ponte en posición y luego lanza el cronómetro.',
    startTimer: 'Iniciar el cronómetro',
    done: 'Terminado',
    finished: 'Sesión terminada',
    finishedCue:
      'Fíjate en cómo te sientes mañana por la mañana: la rigidez debe haber vuelto a la normalidad.',
    close: 'Cerrar',
  },

  exercise: {
    inclined: {
      name: 'Flexiones inclinadas',
      cue: 'Codos a unos 45° del cuerpo, nunca abiertos a 90°.',
    },
    chairsquat: {
      name: 'Sentadilla a la silla',
      cue: 'Rodillas en el eje de los pies, controla la bajada.',
    },
    calf: {
      name: 'Elevación de gemelos de pie',
      cue: '3 s para subir, 3 s para bajar. La lentitud es la que trabaja.',
    },
    wallsit: {
      name: 'Sentadilla isométrica en pared',
      cue: 'Si la rodilla molesta, abre el ángulo a 120°.',
    },
    rotation: {
      name: 'Rotación externa de hombro',
      cue: 'De lado, con una botella de agua, el codo pegado al cuerpo. Recorrido corto.',
    },
    deadbug: {
      name: 'Dead bug',
      cue: 'Zona lumbar pegada al suelo en todo momento.',
    },
    plank: {
      name: 'Plancha',
      cue: 'Glúteos apretados. Si la cadera se mueve, la serie ha terminado.',
    },
    walk: {
      name: 'Caminata',
      cue: 'Ritmo vivo. Tu base cardiovascular, sin impacto.',
    },
    kneePushup: {
      name: 'Flexiones de rodillas',
      cue: 'Rodillas en el suelo, cuerpo alineado de las rodillas a los hombros. Baja el pecho cerca del suelo.',
    },
    wallPushup: {
      name: 'Flexiones contra la pared',
      cue: 'Manos a la altura de los hombros en la pared, cuerpo inclinado y firme. Ideal para empezar.',
    },
    chairDips: {
      name: 'Fondos de tríceps en silla',
      cue: 'Manos en el borde de la silla, codos hacia atrás. No bajes más allá de 90°.',
    },
    armCircles: {
      name: 'Círculos de brazos',
      cue: 'Brazos extendidos a la altura de los hombros, círculos pequeños y constantes. Cambia de sentido a mitad de la serie.',
    },
    wallSlides: {
      name: 'Deslizamientos en la pared',
      cue: 'Espalda y brazos contra la pared, desliza los brazos hacia arriba sin despegar los codos.',
    },
    superman: {
      name: 'Superman',
      cue: 'Boca abajo, levanta brazos y piernas a la vez. Mira al suelo para proteger el cuello.',
    },
    reverseSnowAngel: {
      name: 'Ángel invertido en el suelo',
      cue: 'Boca abajo, brazos extendidos, dibuja un arco amplio hasta las caderas.',
    },
    birdDog: {
      name: 'Bird dog',
      cue: 'A cuatro patas, extiende un brazo y la pierna contraria. Mantén la cadera quieta.',
    },
    catCow: {
      name: 'Gato-vaca',
      cue: 'A cuatro patas, alterna arquear y redondear la espalda al ritmo de la respiración.',
    },
    reverseLunge: {
      name: 'Zancada atrás',
      cue: 'Da un paso atrás con una pierna, baja hasta que la rodilla casi toque el suelo. Torso erguido.',
    },
    stepUp: {
      name: 'Subida a la silla',
      cue: 'Sube un pie y luego el otro a una silla estable, baja con control.',
    },
    lateralLunge: {
      name: 'Zancada lateral',
      cue: 'Paso grande hacia el lado, flexiona la pierna de apoyo manteniendo la otra recta.',
    },
    gluteBridge: {
      name: 'Puente de glúteos',
      cue: 'Tumbado, rodillas flexionadas, empuja con los talones y aprieta los glúteos arriba.',
    },
    donkeyKick: {
      name: 'Patada de burro',
      cue: 'A cuatro patas, empuja un pie hacia el techo con la rodilla flexionada, sin arquear la espalda.',
    },
    hipAbduction: {
      name: 'Abducción de cadera de pie',
      cue: 'De pie, eleva una pierna recta hacia el lado sin inclinar el torso.',
    },
    sidePlank: {
      name: 'Plancha lateral',
      cue: 'Apoyo en un antebrazo, cuerpo en línea recta de los pies a la cabeza.',
    },
    standingKneeRaise: {
      name: 'Elevación de rodilla de pie',
      cue: 'De pie, sube una rodilla hacia el pecho manteniendo la espalda recta.',
    },
    crunch: {
      name: 'Crunch',
      cue: 'Tumbado, rodillas flexionadas, levanta los omóplatos al exhalar. No tires del cuello.',
    },
    highKneeMarch: {
      name: 'Marcha con rodillas altas',
      cue: 'Marcha en el sitio, rodillas a la altura de la cadera, ritmo controlado.',
    },
    buttKickMarch: {
      name: 'Marcha talón-glúteo',
      cue: 'Marcha en el sitio, lleva los talones hacia los glúteos a ritmo moderado.',
    },
    custom: {
      name: 'Ejercicio propio',
      cue: '',
    },
  },
};
