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
    custom: {
      name: 'Ejercicio propio',
      cue: '',
    },
  },
};
