import type { Translations } from '../index';

export const es: Translations = {
  app: {
    title: 'CIRKALI — planificador y cronómetro de entrenamiento',
    eyebrow: 'Con o sin material',
    heading: 'CIRKALI',
    tagline: 'Construye tu entrenamiento, ordena los ejercicios, ajusta las pausas.',
  },

  lang: {
    label: 'Idioma',
  },

  plans: {
    label: 'Sesión',
    new: '+ Nueva sesión',
    duplicate: 'Duplicar',
    rename: 'Renombrar',
    delete: 'Eliminar',
    unnamed: 'Sesión sin nombre',
    namePrompt: '¿Nombre de la sesión?',
    confirmDelete: '¿Eliminar esta sesión y su plan?',
    copyName: '{name} - copia',
  },

  presets: {
    groupMine: 'Mis sesiones',
    group: 'Sesiones CIRKALI',
    badge: 'Sesión CIRKALI',
    note: 'Sesión tipo. Modifícala para hacerla tuya.',
    makeMine: 'Crear mi versión',
    adoptTitle: '¿Crear tu versión?',
    adoptText: 'Tus cambios irán a tu propia copia de «{name}».',
    adoptConfirm: 'Crear mi versión',
    adopted: '«{name}» añadida a tus sesiones',
    name: {
      fullBody: 'Cuerpo completo sin material',
      beginner: 'Empezar con suavidad',
      upperBody: 'Tren superior',
      lowerBody: 'Tren inferior y glúteos',
      core: 'Core exprés',
      stretching: 'Estiramientos de la noche',
    },
  },

  account: {
    label: 'Cuenta',
    title: 'Copia de seguridad en línea',
    intro:
      'Sin iniciar sesión, tus sesiones solo viven en este navegador: al vaciarlo o cambiar de dispositivo se pierden. Si inicias sesión con Google, se guardan automáticamente y las recuperas en cualquier parte.',
    signIn: 'Iniciar sesión con Google',
    signOut: 'Cerrar sesión',
    signOutNotice:
      'Cerrar sesión no borra nada: tus sesiones siguen en este navegador, simplemente dejan de guardarse en línea.',
    lastSync: 'Última sincronización: {time}',
    neverSynced: 'Todavía sin sincronizar.',
    statusSynced: 'sincronizado',
    statusSyncing: 'sincronizando…',
    statusOffline: 'sin conexión, se reanudará al volver la red',
    statusError: 'sincronización no disponible, sesiones guardadas aquí',
    statusTooLarge: 'demasiadas sesiones para la copia en línea',
    storageNotice: 'Este navegador borra las sesiones tras 7 días sin visita. Una cuenta las conserva.',
    signInError: 'No se pudo iniciar sesión. Inténtalo de nuevo en un momento.',
    merged: {
      one: '{count} sesión recuperada de tu cuenta',
      other: '{count} sesiones recuperadas de tu cuenta',
    },
  },

  share: {
    trigger: 'Compartir',
    title: 'Compartir esta sesión',
    hint: 'Escanea este código con un teléfono, o copia el enlace de abajo.',
    qrTooLarge: 'Esta sesión es demasiado grande para un código QR: usa el enlace de abajo.',
    linkLabel: 'Enlace para compartir',
    copy: 'Copiar',
    copied: 'Enlace copiado',
    importTitle: 'Importar una sesión compartida',
    importSummary: {
      one: '«{name}» — {count} ejercicio.',
      other: '«{name}» — {count} ejercicios.',
    },
    importConfirm: 'Importar como sesión nueva',
    importAppend: 'Añadir a la sesión activa',
    importReplace: 'Reemplazar «{name}»',
    importInvalid:
      'Este enlace no describe una sesión válida. Si viene de una inteligencia artificial, pídele que lo genere de nuevo siguiendo el formato indicado al final de la página de inicio.',
    replaced: 'Sesión reemplazada',
    appended: {
      one: '{count} ejercicio añadido',
      other: '{count} ejercicios añadidos',
    },
  },

  about: {
    title: 'Acerca de CIRKALI',
    intro:
      'CIRKALI es un planificador y cronómetro de entrenamiento. Compones tu sesión a partir de una biblioteca de ejercicios que puedes filtrar según el material del que dispones — peso corporal, banda elástica, mancuernas, máquina — o según el momento de la sesión, calentamiento y estiramientos incluidos. Cada línea se ajusta después en series, repeticiones o duración, con su propio descanso.',
    modes:
      'Dos formas de encadenar las series. En modo clásico, haces todas las series de un ejercicio antes de pasar al siguiente, con el descanso ajustado en cada línea. En modo circuito, las series alternan los grupos musculares y solo aparece una pausa cuando dos esfuerzos del mismo grupo tienen que seguirse forzosamente — la vista previa muestra la secuencia calculada antes de empezar.',
    privacy:
      'Durante la sesión, un reproductor a pantalla completa muestra el cronómetro, el anillo de progreso y la indicación de ejecución, mantiene la pantalla encendida y avisa del final de cada intervalo. Sin cuenta obligatoria: la sesión y el historial se guardan en el navegador. Un acceso con Google, opcional, los respalda en línea para recuperarlos en cualquier dispositivo. La interfaz está disponible en francés, inglés, español, alemán e italiano.',
  },

  ads: {
    label: 'Publicidad',
    none: 'CIRKALI no muestra ninguna publicidad en móvil: en un teléfono no se crea ningún espacio ni se descarga ningún script publicitario. En pantalla grande, dos anuncios ocupan los márgenes que la maquetación deja vacíos: nunca cortan el contenido y quedan ocultos durante la sesión.',
  },

  notFound: {
    title: 'Página no encontrada',
    lead: 'Esta dirección no corresponde a ninguna página del sitio. Puede que el enlace tenga una errata o que la página haya cambiado de dirección.',
  },

  privacy: {
    title: 'Privacidad',
    lead: 'CIRKALI funciona sin cuenta y sin servidor: la sesión que compones vive en tu navegador. Esta página dice qué se guarda, qué sale del dispositivo y en qué condiciones.',
    updated: 'Última actualización: {date}',
    localTitle: 'Lo que se queda en tu dispositivo',
    localText: 'Tus sesiones, tus ajustes, el idioma elegido y el historial de sesiones terminadas se guardan en el almacenamiento local del navegador. No se envían a ninguna parte y nadie más que tú puede leerlos. Borrar los datos del sitio los elimina de forma definitiva.',
    accountTitle: 'El acceso con Google, opcional',
    accountText: 'Acceder con Google es una elección, nunca una obligación: mientras no lo hagas, el kit de Firebase ni siquiera se descarga. Si accedes, tu dirección de correo y tus sesiones se guardan en Google (Firebase Authentication y Cloud Firestore) para recuperarlas en tus demás dispositivos. Cerrar sesión detiene la sincronización; la copia en línea permanece hasta que pidas su supresión.',
    analyticsTitle: 'Medición de audiencia',
    analyticsText: 'El sitio usa Google Analytics (identificador de medición {ga}) para contar las visitas y saber qué páginas se leen. El script solo se carga una vez mostrada la página, para no ralentizar tu llegada. Desde el Espacio Económico Europeo, el Reino Unido y Suiza, la medición empieza en estado «denegado»: no se deposita ninguna cookie de medición mientras no hayas aceptado.',
    adsTitle: 'Publicidad',
    adsText: 'Solo en pantalla grande, el sitio muestra anuncios de Google AdSense. Google y sus socios pueden usar cookies para medirlos y personalizarlos; una ventana de consentimiento recoge tu acuerdo antes de cualquier depósito y puedes modificarlo cuando quieras. En móvil no se descarga ningún código publicitario, así que allí no se deposita ninguna cookie publicitaria.',
    adsOptOut: 'La personalización de los anuncios de Google se ajusta desde la página de configuración de tu cuenta de Google.',
    rightsTitle: 'Tus derechos',
    rightsText: 'Puedes consultar, corregir o hacer suprimir los datos vinculados a tu cuenta, y retirar tu consentimiento cuando lo desees. Para lo que se quedó en el navegador, basta con borrar los datos del sitio. Para la copia en línea, escríbenos.',
    contactTitle: 'Contacto',
    contactText: 'Para cualquier pregunta sobre estos datos: {email}',
  },

  aiPlan: {
    title: 'Crear una sesión con una IA',
    intro:
      'Pide a ChatGPT, Claude o Gemini que te componga una sesión: dales la dirección de esta página y te responderán con un enlace. Al abrirlo, la aplicación muestra la sesión y te pregunta si quieres conservarla: no se guarda nada sin tu consentimiento. El botón «IA», arriba, prepara el mensaje que hay que copiar.',
    forAi: 'Lo que sigue va dirigido a la IA. Un lector humano puede saltárselo.',
    format:
      'El enlace esperado tiene la forma de abajo: un objeto JSON con el nombre de la sesión, el modo de encadenamiento y la lista de líneas, codificado en base64url dentro del parámetro s.',
    keys:
      'La clave que hay que usar para cada ejercicio aparece en letra pequeña bajo su nombre, en la lista «Todas las fichas de ejercicio» de arriba (por ejemplo catCow bajo «Gato-vaca») — nunca la palabra con la que termina la dirección de su ficha. El grupo muscular, el tipo de esfuerzo y los valores que falten se deducen de la biblioteca. Una clave desconocida se convierte en un ejercicio personalizado con ese nombre. Una línea sin clave inserta una pausa.',
    rawLink:
      'Da siempre este enlace tal cual — nunca envuelto en una búsqueda (google.com/search) ni acortado. Algunos asistentes añaden esta envoltura automáticamente: si el enlace que vas a dar contiene una, quítala antes de responder — la importación en un clic solo funciona con el enlace exacto.',
    spec: 'Especificación completa del formato',
  },

  aiHelp: {
    trigger: 'IA',
    triggerLabel: 'Crear o modificar una sesión con una IA',
    title: 'Crear o modificar con una IA',
    intro: 'ChatGPT, Claude y Gemini pueden crear o modificar tu sesión: solo dales un enlace.',
    createTitle: 'Crear una sesión',
    createText: 'Copia este mensaje:',
    createPrompt:
      'Este es un sitio para componer sesiones de entrenamiento: https://cirkali.fr/. Crea una sesión de tren superior de 20 minutos y dame el enlace para importarla.',
    modifyTitle: 'Modificar una sesión',
    modifyText: 'Usa el enlace de tu sesión para pedirle a la IA que la modifique:',
    modifyPrompt:
      'Este es el enlace de mi sesión actual: {link}. Añade un ejercicio de gemelos y devuélveme el enlace actualizado.',
    linkMask: '[tu enlace]',
    copied: 'Mensaje copiado',
  },

  exerciseInfo: {
    trigger: 'Información del ejercicio',
    close: 'Cerrar',
    equipment: 'Equipamiento',
    muscles: 'Músculos trabajados',
    keyPoints: 'Puntos clave',
    moreInfo: 'Más información',
    unavailable: 'Ficha detallada disponible próximamente en este idioma — mostrando en francés.',
    loading: 'Cargando…',
    loadError: 'No se pudo cargar la ficha de este ejercicio.',
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
    sessions: 'Sesiones',
    plan: 'Desarrollo',
    library: 'Biblioteca',
    allGuides: 'Todas las fichas de ejercicio',
  },

  library: {
    search: 'Buscar un ejercicio…',
    filterLabel: 'Filtrar por grupo muscular',
    filterAll: 'Todos los grupos',
    filterCategoryLabel: 'Filtrar por equipamiento',
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
    confirm: 'Confirmar',
    cancel: 'Cancelar',
  },

  storage: {
    saved: 'Guardado',
    unavailable: 'No se puede guardar: el almacenamiento local está desactivado en este navegador.',
  },

  toast: {
    deleted: 'Eliminado',
    undo: 'Deshacer',
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
    restShort: 's descanso',
    delete: 'Eliminar',
    moveUp: 'Subir',
    moveDown: 'Bajar',
  },

  effort: {
    reps: 'Repeticiones',
    time: 'Segundos',
    repsShort: 'reps',
    timeShort: 's',
  },

  group: {
    push: 'Pecho',
    shoulders: 'Hombros',
    back: 'Espalda',
    arms: 'Brazos',
    legs: 'Muslos',
    calves: 'Gemelos',
    core: 'Core',
    cardio: 'Cardio',
    glutes: 'Glúteos',
  },

  category: {
    warmup: 'Calentamiento',
    stretching: 'Estiramientos',
    bodyweight: 'Peso corporal',
    band: 'Banda elástica',
    dumbbell: 'Mancuernas',
    machine: 'Máquina',
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
    readyHint: 'Al lanzar el cronómetro, tendrás 5 segundos para ponerte en posición.',
    startTimer: 'Iniciar el cronómetro',
    startingSoon: 'Colócate, empieza en un instante.',
    skipSetup: 'Empezar ahora',
    done: 'Terminado',
    finished: 'Sesión terminada',
    finishedCue:
      'Fíjate en cómo te sientes mañana por la mañana: la rigidez debe haber vuelto a la normalidad.',
    close: 'Cerrar',
  },


  page: {
    titleSuffix: 'cómo hacerlo',
    description:
      'Cómo hacer {name} correctamente: músculos trabajados, técnica paso a paso y errores frecuentes que evitar.',
    back: '← Volver a la app',
    breadcrumb: 'Ruta de navegación',
    howTo: 'Cómo hacer el ejercicio',
    mistakes: 'Errores frecuentes',
    sensation: 'Dónde debes notarlo',
    rangeOfMotion: 'Amplitud',
    tempo: 'Ritmo y respiración',
    anatomy: 'Qué trabaja, exactamente',
    mechanics: 'Mecánica del movimiento',
    benefits: 'Beneficios',
    progression: 'Adaptar y progresar',
    easier: 'Más accesible',
    harder: 'Más exigente',
    readyWhen: 'Pasar al siguiente nivel',
    precautions: 'Precauciones',
    similar: 'Ejercicios similares',
    tagline: 'planificador y cronómetro de entrenamiento, con o sin material.',
    disclaimer:
      'Esta información es de carácter general y no sustituye el consejo de un profesional sanitario. Si tienes dolor, una lesión o una patología conocida, consulta a un médico antes de empezar.',
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
    bandPullApart: {
      name: 'Apertura con banda elástica',
      cue: 'Brazos extendidos al frente, banda tensa entre las manos, ábrelos apretando los omóplatos.',
    },
    bandSquat: {
      name: 'Sentadilla con banda',
      cue: 'Banda bajo los pies y sobre los hombros, baja como en una sentadilla normal, espalda recta.',
    },
    dumbbellGobletSquat: {
      name: 'Sentadilla goblet',
      cue: 'Mancuerna sujeta con ambas manos contra el pecho, baja manteniendo los codos entre las rodillas.',
    },
    dumbbellRow: {
      name: 'Remo con mancuerna a un brazo',
      cue: 'Una rodilla y una mano apoyadas en un banco, tira de la mancuerna hacia la cadera manteniendo la espalda plana.',
    },
    legPressMachine: {
      name: 'Prensa de piernas',
      cue: 'Pies apoyados en la placa, separados al ancho de los hombros, empuja sin bloquear del todo las rodillas.',
    },
    latPulldownMachine: {
      name: 'Jalón al pecho',
      cue: 'Agarra la barra más ancho que los hombros y tira hacia la parte alta del pecho manteniendo el torso recto.',
    },
    hamstringStretch: {
      name: 'Estiramiento de isquiotibiales',
      cue: 'Talón apoyado en un soporte, pierna estirada, inclina el torso hacia adelante sin curvar la espalda.',
    },
    chestDoorwayStretch: {
      name: 'Estiramiento de pecho en el marco de la puerta',
      cue: 'Antebrazo contra el marco de la puerta, codo a la altura del hombro, avanza el torso suavemente.',
    },
    squat: {
      name: 'Sentadilla',
      cue: 'Pies al ancho de las caderas, empuja las caderas atrás y baja hasta que los muslos queden casi horizontales, torso recto.',
    },
    pushup: {
      name: 'Flexiones',
      cue: 'Manos bajo los hombros, cuerpo alineado de talones a cabeza, baja hasta rozar el suelo.',
    },
    pikePushup: {
      name: 'Flexiones en pica',
      cue: 'Cadera alta en V invertida, baja la coronilla hacia el suelo entre las manos.',
    },
    mountainClimber: {
      name: 'Escalador',
      cue: 'En posición de flexión, lleva una rodilla al pecho alternando, sin subir las caderas.',
    },
    legSwing: {
      name: 'Balanceo de pierna',
      cue: 'Apóyate con una mano y balancea una pierna adelante y atrás, ganando amplitud, cadera estable.',
    },
    torsoTwist: {
      name: 'Rotaciones de torso',
      cue: 'De pie, pies fijos, gira el torso a un lado y al otro con los brazos relajados.',
    },
    quadStretch: {
      name: 'Estiramiento de cuádriceps de pie',
      cue: 'De pie, agarra el tobillo y lleva el talón al glúteo, rodillas juntas.',
    },
    gluteStretch: {
      name: 'Estiramiento de glúteo (figura 4)',
      cue: 'Tumbado, tobillo sobre la rodilla opuesta, tira del muslo de apoyo hacia ti.',
    },
    calfStretch: {
      name: 'Estiramiento de gemelos en pared',
      cue: 'Manos en la pared, pierna trasera estirada, talón en el suelo, adelanta la cadera.',
    },
    childPose: {
      name: 'Postura del niño',
      cue: 'De rodillas, siéntate sobre los talones y estira los brazos al frente, frente hacia el suelo.',
    },
    tricepsStretch: {
      name: 'Estiramiento de tríceps',
      cue: 'Codo doblado apuntando al techo, mano entre las escápulas, empuja el codo suavemente con la otra mano.',
    },
    bandChestPress: {
      name: 'Press de pecho con banda',
      cue: 'Banda por la espalda, manos a la altura del pecho, empuja al frente hasta estirar los brazos.',
    },
    bandLateralRaise: {
      name: 'Elevaciones laterales con banda',
      cue: 'Banda bajo los pies, sube los brazos estirados por los lados hasta la altura del hombro.',
    },
    bandLateralWalk: {
      name: 'Marcha lateral con banda',
      cue: 'Banda por encima de las rodillas, media sentadilla, da pasos laterales sin que las rodillas se cierren.',
    },
    bandCurl: {
      name: 'Curl de bíceps con banda',
      cue: 'Banda bajo los pies, codos pegados al cuerpo, sube las manos hacia los hombros.',
    },
    dumbbellShoulderPress: {
      name: 'Press militar con mancuernas',
      cue: 'Mancuernas a la altura de los hombros, empuja por encima de la cabeza sin arquear la zona lumbar.',
    },
    dumbbellFloorPress: {
      name: 'Press con mancuernas en el suelo',
      cue: 'Tumbado en el suelo, rodillas dobladas, empuja las mancuernas hacia arriba; los codos tocan el suelo abajo.',
    },
    dumbbellRomanianDeadlift: {
      name: 'Peso muerto rumano',
      cue: 'Rodillas apenas flexionadas, empuja las caderas atrás y baja las mancuernas por las piernas, espalda plana.',
    },
    dumbbellCalfRaise: {
      name: 'Elevación de gemelos con mancuernas',
      cue: 'Mancuernas a los lados, sube de puntillas y baja despacio.',
    },
    dumbbellCurl: {
      name: 'Curl de bíceps con mancuernas',
      cue: 'Codos pegados al cuerpo, sube la mancuerna sin balancear el torso.',
    },
    dumbbellTricepsExtension: {
      name: 'Extensión de tríceps',
      cue: 'Mancuerna con ambas manos sobre la cabeza, bájala tras la nuca manteniendo los codos cerrados.',
    },
    chestPressMachine: {
      name: 'Press de pecho en máquina',
      cue: 'Espalda apoyada, agarres a la altura del pecho, empuja sin bloquear del todo los codos.',
    },
    legCurlMachine: {
      name: 'Curl femoral',
      cue: 'Rodillo sobre la parte baja de los gemelos, flexiona las rodillas con control, cadera pegada.',
    },
    treadmill: {
      name: 'Cinta de correr',
      cue: 'Un ritmo en el que hablar siga siendo posible pero algo entrecortado; no te agarres a las barras.',
    },
    stationaryBike: {
      name: 'Bicicleta estática',
      cue: 'Sillín ajustado para que la rodilla mantenga una ligera flexión abajo; cadencia regular.',
    },
    rowingMachine: {
      name: 'Máquina de remo',
      cue: 'Empuja primero con las piernas, luego abre el torso, luego tira con los brazos — y al revés al volver.',
    },
    custom: {
      name: 'Ejercicio propio',
      cue: '',
    },
  },
};
