import type { ExerciseKey } from '../../core/types';
import type { ExerciseDetail } from './fr';

/**
 * Contenu long en espagnol. Meme regle de redaction que fr.ts : uniquement du
 * verifiable et du stable (anatomie, biomecanique, principes d'entrainement
 * etablis), jamais de citation d'etude ni de pourcentage d'activation EMG.
 *
 * Les slugs sont en espagnol : ces pages vivent sous exercises/es/ et une URL
 * francaise y serait incoherente pour un lecteur hispanophone. Quelques termes
 * restent en anglais (dead bug, bird dog) parce que c'est sous ce nom qu'ils
 * sont connus et cherches en espagnol.
 */
export const es: Partial<Record<ExerciseKey, ExerciseDetail>> = {
  inclined: {
    slug: 'flexiones-inclinadas',
    muscles: { primary: 'Pecho, tríceps', secondary: 'Hombros, core' },
    steps: [
      'Apoya las manos en una superficie elevada y estable (silla, banco, borde de una mesa), algo más abiertas que los hombros.',
      'Retrocede con los pies hasta que el cuerpo forme una línea recta desde los tobillos hasta la cabeza.',
      'Aprieta abdomen y glúteos para mantener la cadera firme durante todo el movimiento.',
      'Flexiona los codos a unos 45° del cuerpo y baja el pecho hacia el apoyo, sin arquear la espalda.',
      'Empuja para volver a la posición inicial sin bloquear los codos de golpe.',
    ],
    mistakes: [
      'Codos abiertos a 90°: traslada la carga a los hombros y los castiga.',
      'Cadera hundida o arqueada: rompe la línea y carga la zona lumbar.',
      'Recorrido incompleto: mucho menos eficaz que una bajada completa y controlada.',
    ],
    sensation:
      'El esfuerzo debe notarse en el pecho y en la parte posterior de los brazos. Si lo notas sobre todo en la parte delantera del hombro, en la muñeca o en el cuello, los codos se están abriendo o los hombros suben hacia las orejas.',
    rangeOfMotion:
      'Baja hasta que el pecho quede a unos centímetros del apoyo. No vayas más allá de lo que el hombro permite sin rodar hacia delante. Arriba, estira los brazos sin bloquear el codo bruscamente.',
    tempo:
      'Dos segundos para bajar, uno para subir. Inspira al bajar, espira al empujar. La bajada controlada es la mitad útil del movimiento: dejarse caer es hacer solo la mitad del trabajo.',
    anatomy:
      'El pectoral mayor es el motor principal: acerca el brazo a la línea media. El tríceps braquial extiende el codo y el deltoides anterior ayuda al inicio del empuje. De fondo, el serrato anterior mantiene la escápula pegada a las costillas mientras el transverso abdominal y los glúteos fijan la pelvis para que el cuerpo siga siendo una tabla rígida.',
    mechanics:
      'Un empuje horizontal en el plano sagital, que combina flexión de hombro y extensión de codo. La bajada es una contracción excéntrica —el músculo se alarga bajo tensión— y la vuelta es concéntrica. Cuanto más alto el apoyo, menor la fracción del peso corporal que mueves: ese es justamente el regulador de dificultad de este ejercicio.',
    benefits: [
      'Desarrolla la fuerza de empuje del tren superior sin material y con mucha menos tensión en muñecas y hombros que una flexión en el suelo.',
      'Refuerza la posición de plancha, que se transfiere a cualquier cosa que empujes o cargues por delante del cuerpo.',
      'Se ajusta con precisión cambiando la altura del apoyo, lo que lo convierte en un punto de partida fiable tras un tiempo sin entrenar.',
    ],
    progression: {
      easier: 'Sube el apoyo: una encimera o una pared son mucho más accesibles que una silla.',
      harder: 'Baja el apoyo hacia el suelo, o alarga la bajada hasta cuatro segundos.',
      readyWhen:
        'Cuando hagas tres series de doce con bajada controlada y la cadera inmóvil, baja el apoyo un nivel.',
    },
    precautions:
      'Si duele la parte delantera del hombro, reduce el recorrido y acerca los codos al cuerpo antes de intentar bajar más.',
  },

  chairsquat: {
    slug: 'sentadilla-con-silla',
    muscles: { primary: 'Cuádriceps, glúteos', secondary: 'Isquiotibiales, core' },
    steps: [
      'Colócate de pie delante de una silla estable, con los pies a la anchura de las caderas.',
      'Lleva la cadera hacia atrás como si fueras a sentarte, con las rodillas alineadas con los pies.',
      'Baja de forma controlada hasta rozar el asiento, con el peso en los talones.',
      'Toca brevemente sin llegar a sentarte, con el pecho erguido.',
      'Empuja desde los talones hasta extender las piernas por completo.',
    ],
    mistakes: [
      'Rodillas que se meten hacia dentro: inestable y exigente para la articulación.',
      'Dejarse caer sobre la silla en lugar de controlar la bajada.',
      'Inclinar demasiado el pecho hacia delante: traslada el esfuerzo a la zona lumbar.',
    ],
    sensation:
      'Debes notar la parte delantera de los muslos y los glúteos, con una presión clara en los talones. Tensión en la parte delantera de la rodilla o en la zona lumbar significa que la cadera no retrocede lo suficiente y el tronco compensa.',
    rangeOfMotion:
      'Baja hasta rozar el asiento sin apoyarte en él. La silla es una marca de profundidad constante, no un asiento: eso es lo que hace el ejercicio medible de una sesión a otra.',
    tempo:
      'Tres segundos para bajar, uno o dos para subir. Inspira al bajar, espira al empujar con los talones. Una pausa de un segundo en el punto de contacto elimina cualquier rebote.',
    anatomy:
      'El cuádriceps extiende la rodilla y el glúteo mayor extiende la cadera: dos motores principales trabajando juntos. Los isquiotibiales y los aductores estabilizan, el glúteo medio impide que la rodilla caiga hacia dentro, y el erector de la columna junto con la pared abdominal mantienen el tronco firme.',
    mechanics:
      'Flexión y luego extensión simultáneas de cadera y rodilla en el plano sagital. La bajada es excéntrica y la subida concéntrica. Llevar la cadera atrás sitúa el centro de masas sobre los talones, y eso es lo que reparte la carga entre muslos y glúteos en lugar de concentrarla en la rodilla.',
    benefits: [
      'Reconstruye el movimiento más usado de la vida diaria: levantarse de una silla, entrar en el coche o recoger algo del suelo.',
      'Fortalece muslos y glúteos a la vez, lo primero que se pierde en una etapa sedentaria.',
      'La silla da una referencia objetiva de profundidad, así que progresas sin tener que juzgar a ojo si has bajado lo suficiente.',
    ],
    progression: {
      easier: 'Usa un asiento más alto, o siéntate realmente entre cada repetición.',
      harder: 'Busca un asiento más bajo, alarga la bajada a cinco segundos, o mantén tres segundos abajo.',
      readyWhen:
        'Cuando hagas tres series de quince sin que las rodillas se metan hacia dentro y sin ayudarte con las manos, baja el asiento.',
    },
    precautions:
      'Si la rodilla molesta, reduce la profundidad antes que el número de repeticiones: un recorrido parcial sin dolor vale más que uno completo que duele.',
  },

  calf: {
    slug: 'elevaciones-de-talones',
    muscles: { primary: 'Gemelos (gastrocnemio, sóleo)' },
    steps: [
      'De pie, con los pies a la anchura de las caderas, apoyando ligeramente una mano en una pared o una silla si lo necesitas.',
      'Sube sobre las puntas de los pies durante tres segundos, empujando con el dedo gordo.',
      'Haz una pausa arriba con los gemelos completamente contraídos.',
      'Baja durante tres segundos hasta apoyar de nuevo los talones en el suelo.',
    ],
    mistakes: [
      'Ir demasiado rápido: la lentitud es lo que hace trabajar al músculo.',
      'Rebotar abajo en lugar de controlar todo el recorrido.',
      'Dejar que los tobillos se vayan hacia fuera o hacia dentro al subir.',
    ],
    sensation:
      'Una contracción clara en el gemelo, desde el talón hasta justo debajo de la rodilla. Si el esfuerzo se desplaza a la parte delantera de la espinilla o al exterior del tobillo, el pie está rodando en lugar de empujar recto.',
    rangeOfMotion:
      'Sube todo lo que el tobillo permita sin que el pie bascule hacia fuera, y luego baja hasta apoyar el talón. Recortar la parte baja es el error más frecuente, y es justo ahí donde el músculo se alarga bajo tensión.',
    tempo:
      'Tres segundos para subir, uno de contracción arriba, tres para bajar. Es el único ejercicio de esta biblioteca donde la lentitud no solo lo hace más difícil: *es* la carga, ya que el peso corporal por sí solo no bastaría.',
    anatomy:
      'Dos músculos se reparten el trabajo. El gastrocnemio, superficial y visible, cruza la rodilla y trabaja sobre todo con la pierna estirada; el sóleo, situado debajo, aporta más con la rodilla flexionada. Ambos convergen en el tendón de Aquiles para producir la extensión del tobillo.',
    mechanics:
      'Flexión plantar del tobillo en el plano sagital, en cadena cerrada (el pie permanece en el suelo). Concéntrica al subir, excéntrica al bajar. El recorrido articular es corto: lo que produce el efecto es el tiempo bajo tensión, no la distancia recorrida.',
    benefits: [
      'El gemelo es el propulsor principal al caminar y al subir escaleras, así que fortalecerlo mejora directamente la resistencia al andar.',
      'Refuerza el tendón de Aquiles y el tobillo, dos estructuras que pierden tolerancia rápidamente tras un periodo de inactividad.',
      'Contribuye al equilibrio de pie, ya que el tobillo es la primera articulación que corrige un desequilibrio.',
    ],
    progression: {
      easier: 'Mantén dos dedos apoyados en una pared, o reduce la altura a la que subes.',
      harder:
        'Trabaja una pierna cada vez, o coloca la punta del pie en un escalón para que el talón pueda bajar por debajo del nivel de los dedos.',
      readyWhen:
        'Cuando hagas tres series de veinte a ritmo lento y sin apoyo de las manos, pasa a una sola pierna.',
    },
  },

  wallsit: {
    slug: 'sentadilla-isometrica-en-pared',
    muscles: { primary: 'Cuádriceps', secondary: 'Glúteos, core' },
    steps: [
      'Colócate de espaldas a una pared, con los pies a la anchura de las caderas y a un paso de ella.',
      'Deslízate por la pared hasta que los muslos queden paralelos al suelo, con las rodillas a 90°.',
      'Mantén toda la espalda pegada a la pared y las rodillas alineadas sobre los tobillos.',
      'Aguanta la posición respirando con normalidad, sin bloquear la respiración.',
      'Empuja con los talones para salir de la posición.',
    ],
    mistakes: [
      'Rodillas que sobrepasan las puntas de los pies: demasiada presión sobre la articulación.',
      'Espalda que se despega de la pared: pierdes el apoyo y cargas la zona lumbar.',
      'Forzar el ángulo de 90° cuando la rodilla protesta: abre a 120° en su lugar.',
    ],
    sensation:
      'Un ardor que crece de forma constante en la parte delantera de los muslos, subiendo de manera uniforme hasta el final. Un dolor agudo en la rodilla, en cambio, no es la señal esperada: abre el ángulo.',
    rangeOfMotion:
      'El ángulo de la rodilla marca la dificultad: 90° es la versión de referencia y 120° una claramente más accesible. Las rodillas quedan sobre los tobillos, nunca por delante de las puntas, y la espalda mantiene contacto con la pared en toda su longitud.',
    tempo:
      'Sin tempo: es un mantenimiento. Respira con normalidad, en voz alta si te ayuda a comprobar que no bloqueas el aire; ese es el reflejo más habitual en un ejercicio isométrico, y sube la tensión arterial sin ningún beneficio.',
    anatomy:
      'El cuádriceps trabaja de forma isométrica para impedir que la rodilla siga flexionándose bajo el peso del cuerpo. Los glúteos y los isquiotibiales ayudan a sostener la cadera, y los abdominales estabilizan la pelvis contra la pared.',
    mechanics:
      'Una contracción isométrica: el músculo produce fuerza sin cambiar de longitud y sin que la articulación se mueva. La pared elimina la exigencia de equilibrio, lo que permite cargar los muslos sin la coordinación que requeriría una sentadilla mantenida sin apoyo.',
    benefits: [
      'Desarrolla la resistencia a la fuerza en los muslos, la cualidad que se agota al bajar escaleras o al estar mucho rato de pie.',
      'Carga el cuádriceps sin movimiento articular, lo que a menudo lo hace tolerable cuando un movimiento completo todavía no lo es.',
      'El progreso se mide en segundos, una unidad más clara que "una repetición más" para seguir una vuelta al entrenamiento.',
    ],
    progression: {
      easier: 'Abre el ángulo de la rodilla a 110-120°, o divide el tiempo en dos series más cortas.',
      harder: 'Acércate a los 90°, alarga la duración, o levanta ligeramente un talón y luego el otro.',
      readyWhen:
        'Cuando aguantes tres veces sesenta segundos a 90° sin que la espalda se despegue, alarga más o pasa a una carga dinámica.',
    },
    precautions:
      'Si la rodilla tira, abre el ángulo antes que cualquier otra cosa. Este ejercicio es fácil de suavizar; no tiene sentido aguantarlo tal cual.',
  },

  rotation: {
    slug: 'rotacion-externa-de-hombro',
    muscles: { primary: 'Manguito rotador (hombro)' },
    steps: [
      'Túmbate de lado, con el codo flexionado a 90° y pegado a las costillas, y un peso ligero (una botella de agua) en la mano.',
      'Apoya el antebrazo sobre el abdomen: esa es la posición de partida.',
      'Gira el antebrazo hacia arriba manteniendo el codo pegado al cuerpo, sin mover el hombro.',
      'Haz una pausa en el punto alto del movimiento.',
      'Baja de forma controlada hasta la posición inicial.',
    ],
    mistakes: [
      'Codo que se separa de las costillas: desplaza el esfuerzo fuera del hombro.',
      'Demasiado peso: este movimiento trabaja un músculo pequeño, la carga se mantiene ligera.',
      'Forzar el recorrido más allá de lo que el hombro tolera con comodidad.',
    ],
    sensation:
      'Un esfuerzo discreto en la parte posterior y superior del hombro, nunca espectacular. Si lo notas en el trapecio o en el cuello, el hombro se está elevando; si lo notas en el bíceps, el peso es excesivo y el brazo tira en lugar de rotar.',
    rangeOfMotion:
      'Gira solo hasta donde el hombro llegue sin que el codo se despegue de las costillas, a menudo mucho menos de lo que esperarías. Aquí el recorrido útil es corto: pasarse hace que trabaje otra cosa.',
    tempo:
      'Dos segundos en cada dirección, sin tirones, con una pausa de un segundo arriba. Es un ejercicio de control, no de potencia: la velocidad lo desvirtúa.',
    anatomy:
      'El manguito rotador está formado por cuatro músculos profundos que mantienen la cabeza del húmero centrada en su cavidad. Este movimiento trabaja sobre todo el infraespinoso y el redondo menor, los dos rotadores externos. El deltoides, más superficial, es precisamente el que *no* debe tomar el relevo.',
    mechanics:
      'Rotación externa del hombro en el plano transversal, con el codo fijo a 90°. Mantener el codo contra el cuerpo es un bloqueo mecánico: impide que el hombro compense con una abducción, lo que traspasaría el trabajo al deltoides.',
    benefits: [
      'Mantiene los estabilizadores profundos del hombro, a menudo descuidados porque son invisibles y no dan una sensación llamativa.',
      'Contrarresta la postura de hombros adelantados que instalan el trabajo de oficina y el uso prolongado de pantallas.',
      'Prepara al hombro para tolerar los movimientos de empuje: es un ejercicio de mantenimiento, no de rendimiento.',
    ],
    progression: {
      easier: 'Hazlo sin ningún peso, con la mano vacía, buscando solo recorrido y control.',
      harder:
        'Pasa a una botella algo más pesada, o alarga la pausa arriba. Sé prudente con la carga: este músculo es pequeño.',
      readyWhen:
        'Cuando hagas tres series de quince sin que el codo se levante y sin compensación del trapecio.',
    },
    precautions:
      'No debe aparecer dolor en el hombro. Si aparece, reduce primero el recorrido y luego la carga; si persiste, no es este el ejercicio que le falta a tu sesión.',
  },

  deadbug: {
    slug: 'dead-bug',
    muscles: { primary: 'Core profundo (transverso abdominal)', secondary: 'Caderas' },
    steps: [
      'Túmbate boca arriba, con los brazos hacia el techo y caderas y rodillas flexionadas a 90°.',
      'Presiona la zona lumbar contra el suelo y mantenla así durante todo el movimiento.',
      'Baja lentamente un brazo por encima de la cabeza y la pierna contraria hacia el suelo, sin llegar a tocarlo.',
      'Vuelve al inicio de forma controlada.',
      'Repite con el otro lado.',
    ],
    mistakes: [
      'Zona lumbar que se despega del suelo: señal de que el recorrido ha ido demasiado lejos.',
      'Ir demasiado rápido: pierdes el control y el core se desconecta.',
      'Bloquear la respiración: sigue respirando con normalidad todo el tiempo.',
    ],
    sensation:
      'Una tensión profunda y continua en la parte baja del abdomen, por debajo del ombligo. Si la zona lumbar se arquea o tira, el recorrido ha superado lo que tu core puede sostener: esa es la señal de parada, no un detalle.',
    rangeOfMotion:
      'Baja el brazo y la pierna solo hasta el punto en que la zona lumbar siga pegada al suelo. Ese punto es personal y se desplaza con las semanas: es él, y no la distancia al suelo, tu unidad de medida.',
    tempo:
      'De tres a cuatro segundos por repetición, sin acelerar nunca. Espira al extender e inspira al volver: la espiración ayuda mecánicamente a mantener las costillas abajo y la espalda plana.',
    anatomy:
      'El transverso abdominal, el músculo más profundo de la pared abdominal, actúa como un cinturón que estabiliza la pelvis. Los oblicuos resisten la rotación que genera el movimiento cruzado, y el recto abdominal mantiene la caja torácica abajo. Los flexores de la cadera trabajan en control sobre la pierna que se extiende.',
    mechanics:
      'Es un ejercicio antiextensión: la función del core no es producir un movimiento sino impedirlo, aquí la extensión lumbar que provoca el peso de las extremidades al alejarse. El patrón cruzado añade una resistencia a la rotación.',
    benefits: [
      'Enseña lo que el core hace realmente —estabilizar más que flexionar— con más claridad que cualquier movimiento abdominal convencional.',
      'Trabaja la zona lumbar sin someterla a compresión, a diferencia de los abdominales repetidos.',
      'Se transfiere directamente a caminar y correr, donde brazo y pierna contrarios ya trabajan en alternancia.',
    ],
    progression: {
      easier: 'Mueve una extremidad cada vez, solo el brazo o solo la pierna, manteniendo la otra en posición.',
      harder:
        'Extiende la pierna por completo justo por encima del suelo, ve más despacio, o mantén dos segundos en la posición baja.',
      readyWhen:
        'Cuando hagas tres series de diez por lado sin que la zona lumbar se despegue y con la pierna extendida a unos centímetros del suelo.',
    },
  },

  plank: {
    slug: 'plancha',
    muscles: { primary: 'Core (abdominales, zona lumbar)', secondary: 'Hombros' },
    steps: [
      'Apoya los antebrazos en el suelo, con los codos bajo los hombros, y extiende las piernas por detrás.',
      'Alinea el cuerpo en línea recta desde los talones hasta la cabeza.',
      'Aprieta los glúteos y mete ligeramente el ombligo para fijar el core.',
      'Aguanta la posición respirando con normalidad, con la mirada hacia el suelo.',
    ],
    mistakes: [
      'Cadera elevada formando un pico: reduce el trabajo de los abdominales.',
      'Cadera hundida: carga la zona lumbar, y es la señal para terminar la serie.',
      'Bloquear la respiración en lugar de respirar con normalidad.',
    ],
    sensation:
      'Tensión repartida por toda la pared abdominal y los glúteos. Si la carga se desplaza a la zona lumbar o a los hombros, la posición se ha degradado: aguantar ya no aporta nada, mejor terminar la serie.',
    rangeOfMotion:
      'Sin recorrido: lo que cuenta es la calidad de la alineación. Una línea recta de talones a cabeza, sin pico ni hundimiento de la cadera, y la mirada al suelo para que el cuello siga la línea de la espalda.',
    tempo:
      'Un mantenimiento continuo, respirando con normalidad y de forma audible. El criterio de parada no es el reloj sino la posición: en cuanto la cadera cede, la serie ha terminado, aunque queden diez segundos.',
    anatomy:
      'El transverso abdominal y el recto abdominal mantienen alineadas caja torácica y pelvis, y los oblicuos impiden la rotación. Los glúteos extienden ligeramente la cadera para eliminar el arqueo, y el serrato anterior mantiene las escápulas planas. El erector de la columna trabaja en cocontracción con los abdominales.',
    mechanics:
      'Un ejercicio isométrico antiextensión: la gravedad tira de la pelvis hacia el suelo y la pared abdominal lo impide. Ninguna articulación se mueve, lo que hace que la posición dependa mucho de la alineación: unos pocos grados de báscula pélvica cambian por completo qué músculo soporta la carga.',
    benefits: [
      'Desarrolla la resistencia del core, la cualidad que protege la espalda al estar mucho rato de pie o al cargar peso.',
      'No implica flexión repetida de la columna, a diferencia del trabajo abdominal convencional.',
      'El mantenimiento enseña a respirar bajo tensión, un reflejo que se aprovecha en todos los demás ejercicios.',
    ],
    progression: {
      easier: 'Apoya las rodillas, o coloca los antebrazos sobre una superficie elevada.',
      harder: 'Alarga la duración, o levanta brevemente un pie y luego el otro manteniendo la cadera inmóvil.',
      readyWhen:
        'Cuando aguantes tres veces cuarenta y cinco segundos sin perder la posición, alarga o añade complejidad.',
    },
    precautions:
      'No bloquees la respiración. Si la zona lumbar tira, la posición ya se ha hundido: baja y vuelve a empezar en lugar de aguantar a la fuerza.',
  },

  walk: {
    slug: 'caminar',
    muscles: { primary: 'Cardiovascular, piernas' },
    steps: [
      'Elige un ritmo vivo en el que aún puedas hablar pero notes algo de falta de aire.',
      'Mantén el pecho erguido, la mirada en el horizonte y los hombros relajados.',
      'Deja que los brazos se balanceen de forma natural con la zancada.',
      'Mantén ese ritmo durante el tiempo previsto, variando el terreno si puedes.',
    ],
    mistakes: [
      'Un ritmo demasiado lento para tener un efecto cardiovascular real.',
      'Mirada clavada en el suelo o en el móvil: mala postura.',
      'Calzado inadecuado en terreno irregular.',
    ],
    sensation:
      'Falta de aire moderada: deberías poder mantener una conversación pero no cantar. Es la forma más fiable de ajustar la intensidad sin ningún aparato de medida.',
    rangeOfMotion:
      'No hay recorrido que ajustar, pero sí una zancada: apoya el talón, rueda el pie y empuja con la parte delantera. Los brazos se balancean libres desde el hombro, no metidos en los bolsillos.',
    tempo:
      'Un ritmo regular y sostenido durante todo el recorrido, mejor que arranques seguidos de pausas. La constancia es lo que construye la base de resistencia.',
    anatomy:
      'Todos los músculos de la cadena posterior contribuyen en alternancia: glúteos e isquiotibiales para propulsar, cuádriceps para amortiguar, gemelos para el empuje final. El core estabiliza la pelvis en cada apoyo sobre una pierna, y la musculatura del pie gestiona la recepción.',
    mechanics:
      'Locomoción cíclica en cadena cerrada alternante: cada pierna pasa por una fase de apoyo y otra de oscilación. A diferencia de correr, siempre hay un pie en el suelo, y esa ausencia de fase de vuelo es lo que elimina el impacto y hace que caminar sea accesible en una vuelta al entrenamiento.',
    benefits: [
      'Desarrolla la capacidad cardiovascular sin impacto articular, lo que la hace practicable casi a diario.',
      'Es la única actividad de esta biblioteca que se acumula de forma natural con la vida diaria: trayectos, recados, escaleras.',
      'Mejora la recuperación entre sesiones de fuerza en lugar de añadir fatiga.',
    ],
    progression: {
      easier: 'Reduce la duración antes que el ritmo: diez minutos a buen paso valen más que treinta arrastrados.',
      harder: 'Alarga la duración, busca cuestas, o sube ligeramente el ritmo en algunos tramos.',
      readyWhen:
        'Cuando pases treinta minutos sin notar falta de aire, busca desnivel antes que más tiempo.',
    },
  },

  kneePushup: {
    slug: 'flexiones-de-rodillas',
    muscles: { primary: 'Pecho, tríceps', secondary: 'Hombros, core' },
    steps: [
      'Ponte a cuatro patas y luego adelanta las manos algo más abiertas que los hombros.',
      'Cruza los tobillos y mantén las rodillas en el suelo como punto de pivote.',
      'Alinea el cuerpo en línea recta desde las rodillas hasta la cabeza, sin romper por la cadera.',
      'Flexiona los codos a unos 45° del cuerpo y baja el pecho cerca del suelo.',
      'Empuja para subir sin bloquear los codos de golpe.',
    ],
    mistakes: [
      'Cadera demasiado alta o demasiado baja: rompe la línea del tronco.',
      'Codos abiertos a 90°: sobrecarga los hombros.',
      'Una bajada incompleta: reduce el efecto del movimiento.',
    ],
    sensation:
      'Pecho y tríceps, con el core trabajando desde la cadera hasta los hombros. Las molestias en la muñeca casi siempre vienen de tener las manos demasiado atrasadas: deben estar bajo los hombros, no por delante.',
    rangeOfMotion:
      'Baja hasta que el pecho quede a la altura de un puño del suelo. Si el recorrido completo te cuesta la alineación, acórtalo: medio recorrido limpio construye más que uno completo que se rompe por la cadera.',
    tempo:
      'Dos segundos para bajar, uno para subir, sin pausa abajo para no perder la tensión. Inspira al bajar, espira al empujar.',
    anatomy:
      'Los mismos motores principales que en la flexión estándar —pectoral mayor, tríceps braquial, deltoides anterior— pero con una palanca más corta. El serrato anterior estabiliza la escápula mientras abdominales y glúteos impiden que la cadera se hunda.',
    mechanics:
      'Un empuje horizontal, como la flexión inclinada, pero el apoyo de las rodillas acorta la palanca: la fracción del peso corporal realmente levantada baja alrededor de un tercio. Es una regresión de la palanca, no del recorrido, y la distinción importa porque el recorrido sigue siendo completo.',
    benefits: [
      'Permite entrenar el recorrido completo de una flexión mientras la versión en el suelo todavía queda lejos.',
      'Carga el core sobre un segmento más corto, así que es más fácil mantener la alineación al final de la serie.',
      'Es el paso intermedio natural entre la flexión inclinada y la flexión en el suelo.',
    ],
    progression: {
      easier: 'Vuelve a la flexión inclinada sobre un apoyo alto, donde el core trabaja menos.',
      harder: 'Adelanta las rodillas para alargar la palanca, o pasa a la flexión en el suelo.',
      readyWhen:
        'Cuando hagas tres series de doce con una línea perfectamente recta de rodillas a cabeza, prueba la flexión en el suelo.',
    },
    precautions:
      'Pon un cojín o una esterilla bajo las rodillas: la molestia sobre un suelo duro termina la serie antes de que el músculo se canse.',
  },

  wallPushup: {
    slug: 'flexiones-en-pared',
    muscles: { primary: 'Pecho, tríceps', secondary: 'Hombros' },
    steps: [
      'Apoya las manos en una pared, algo más abiertas que los hombros, a la altura del pecho.',
      'Retrocede con los pies para inclinar el cuerpo, recto desde los tobillos hasta la cabeza.',
      'Flexiona los codos y acerca el pecho a la pared de forma controlada.',
      'Empuja para volver a la posición inicial.',
    ],
    mistakes: [
      'Pies demasiado cerca de la pared: reduce la intensidad del ejercicio.',
      'Espalda que se arquea durante la bajada.',
      'Ir demasiado rápido, sin ningún momento de control abajo.',
    ],
    sensation:
      'Un esfuerzo ligero pero claro en pecho y tríceps. Si no notas casi nada, aleja más los pies: la inclinación, y solo la inclinación, marca la intensidad.',
    rangeOfMotion:
      'Acerca el pecho a unos centímetros de la pared y vuelve a estirar los brazos sin bloquearlos. Aquí es fácil alcanzar el recorrido completo, y eso es precisamente el sentido de esta versión.',
    tempo:
      'Dos segundos en cada dirección. La baja intensidad hace la lentitud aún más útil: es lo que vuelve el ejercicio lo bastante exigente como para producir un efecto.',
    anatomy:
      'Pectoral mayor, tríceps braquial y deltoides anterior, exactamente como en las demás variantes de flexión. El core interviene poco aquí, al estar el cuerpo cerca de la vertical.',
    mechanics:
      'Un empuje horizontal con una inclinación muy pequeña: cuanto más cerca de la vertical está el cuerpo, menor es la fracción del peso a mover. Es el extremo más accesible del mismo continuo que la flexión inclinada y luego la flexión en el suelo.',
    benefits: [
      'Hace practicable el patrón de flexión desde el primer día, sea cual sea el nivel de partida.',
      'Permite aprender la colocación de los codos y la alineación del cuerpo sin estar limitado por la fuerza.',
      'Funciona en cualquier sitio, sin material y sin necesidad de un suelo limpio, lo que encaja con una vuelta progresiva.',
    ],
    progression: {
      easier: 'Acerca los pies a la pared, hasta quedar casi vertical.',
      harder: 'Aleja los pies y luego pasa a un apoyo más bajo: una encimera y después una silla.',
      readyWhen:
        'Cuando tres series de quince te resulten fáciles, pasa a un apoyo más bajo en lugar de añadir repeticiones.',
    },
  },

  chairDips: {
    slug: 'fondos-de-triceps-en-silla',
    muscles: { primary: 'Tríceps', secondary: 'Hombros, pecho' },
    steps: [
      'Siéntate en el borde de una silla estable, con las manos junto a las caderas.',
      'Desliza la cadera fuera de la silla, con las piernas estiradas o algo flexionadas por delante.',
      'Flexiona los codos hacia atrás para bajar el tronco, sin pasar de 90°.',
      'Empuja con las manos para volver a subir hasta estirar los brazos.',
    ],
    mistakes: [
      'Bajar demasiado: somete los hombros a una tensión excesiva.',
      'Hombros que suben hacia las orejas en lugar de mantenerse bajos.',
      'Una silla inestable o que resbala: comprueba el apoyo antes de empezar.',
    ],
    sensation:
      'La parte posterior del brazo, con claridad. Tensión en la parte delantera del hombro significa que la bajada ha ido demasiado lejos o que los hombros han rodado hacia delante: ese es el límite que no hay que cruzar en este ejercicio.',
    rangeOfMotion:
      'Baja hasta que el codo llegue a unos 90°, no más. Es el único ejercicio de esta biblioteca donde el recorrido máximo no es deseable: pasados los 90°, la tensión en la parte delantera del hombro sube deprisa a cambio de muy poco.',
    tempo:
      'Dos segundos para bajar, uno para subir. Mantén los hombros bajos y alejados de las orejas todo el tiempo.',
    anatomy:
      'El tríceps braquial es el motor principal: extiende el codo. La porción inferior del pectoral mayor y el deltoides anterior ayudan, y los músculos de la escápula trabajan para impedir que el hombro ruede hacia delante.',
    mechanics:
      'Extensión de codo en cadena cerrada, con el cuerpo desplazándose alrededor de manos fijas. La posición de las piernas marca la carga: cuanto más extendidas, mayor la fracción del peso corporal que sostienen los brazos.',
    benefits: [
      'Trabaja el tríceps de forma más directa que las variantes de flexión, donde el pecho asume buena parte del esfuerzo.',
      'Refuerza la capacidad de incorporarse desde un apoyo bajo: salir de una bañera o de un sillón profundo.',
      'Se gradúa sin material, simplemente acercando o alejando los pies.',
    ],
    progression: {
      easier: 'Acerca los pies con las rodillas flexionadas: la carga sobre los brazos baja de forma notable.',
      harder: 'Extiende más las piernas, o apoya los talones en un segundo soporte a la misma altura.',
      readyWhen:
        'Cuando hagas tres series de doce con las piernas estiradas y sin que los hombros rueden.',
    },
    precautions:
      'Exigente para la parte delantera del hombro. Con cualquier antecedente o molestia en esa zona, reduce mucho el recorrido o sustitúyelo por una variante de flexión.',
  },

  armCircles: {
    slug: 'circulos-de-brazos',
    muscles: { primary: 'Hombros', secondary: 'Espalda alta' },
    steps: [
      'De pie, con los brazos extendidos en horizontal a ambos lados.',
      'Dibuja círculos pequeños y constantes con los brazos, con los hombros bajos y relajados.',
      'Continúa durante el tiempo previsto y luego invierte el sentido.',
    ],
    mistakes: [
      'Hombros que suben hacia las orejas durante el movimiento.',
      'Círculos demasiado grandes o demasiado rápidos: pierdes el control.',
      'Arquear la espalda para compensar el cansancio de los hombros.',
    ],
    sensation:
      'Un ardor que crece poco a poco en la parte superior y posterior del hombro. Si el trapecio toma el relevo y los hombros suben, baja el ritmo o reduce el tamaño de los círculos.',
    rangeOfMotion:
      'Círculos pequeños y regulares, del tamaño de un plato, no grandes molinos. El recorrido no es el objetivo: lo es el tiempo bajo tensión, con los brazos sostenidos en horizontal contra la gravedad.',
    tempo:
      'Un ritmo lento y constante, con respiración normal. Cambia de sentido a mitad del tiempo para repartir el trabajo entre las porciones anterior y posterior del deltoides.',
    anatomy:
      'El deltoides, en sus tres porciones, mantiene el brazo en horizontal: eso es trabajo de resistencia en abducción. El supraespinoso contribuye al sostén, y los trapecios inferior y medio estabilizan la escápula. El trapecio superior debe permanecer relajado.',
    mechanics:
      'Un mantenimiento estático en abducción de hombro con un componente circular en los planos frontal y transversal. El brazo actúa como una palanca larga: cuanto más estirado, mayor el par que el hombro debe soportar, sin necesidad de carga externa.',
    benefits: [
      'Desarrolla la resistencia del hombro, muy solicitada en cualquier tarea por encima de la cabeza en la vida diaria.',
      'Funciona como un calentamiento eficaz antes de cualquier ejercicio de empuje.',
      'No necesita material ni suelo: practicable en cualquier espacio donde quepas de pie.',
    ],
    progression: {
      easier: 'Acorta la duración, o flexiona ligeramente los codos para reducir la palanca.',
      harder: 'Alarga la duración, o sostén una botella pequeña en cada mano.',
      readyWhen:
        'Cuando aguantes un minuto en cada sentido sin que los hombros suban, añade una carga ligera.',
    },
  },

  wallSlides: {
    slug: 'deslizamientos-en-pared',
    muscles: { primary: 'Hombros, espalda alta' },
    steps: [
      'Colócate de espaldas a una pared, con zona lumbar, espalda alta y cabeza en contacto con ella.',
      'Coloca los brazos en forma de "W", con codos y muñecas contra la pared.',
      'Desliza los brazos hacia arriba manteniendo el contacto con la pared, hacia una "Y".',
      'Baja de forma controlada hasta la posición inicial.',
    ],
    mistakes: [
      'La zona lumbar se arquea y se despega de la pared.',
      'Codos o muñecas que pierden el contacto con la pared al subir.',
      'Forzar el recorrido más allá de lo que el hombro permite sin dolor.',
    ],
    sensation:
      'Trabajo entre las escápulas y en la parte posterior de los hombros, a menudo con un estiramiento en la parte delantera del pecho. Esa es exactamente la intención: abrir por delante, activar por detrás.',
    rangeOfMotion:
      'Sube todo lo que puedas manteniendo codos y muñecas en la pared. El punto donde se pierde el contacto es tu límite del día, y pasarlo despegando los brazos elimina todo el sentido del ejercicio.',
    tempo:
      'Tres segundos para subir, tres para bajar. La pared es la restricción: es lo que impide compensar, siempre que vayas despacio.',
    anatomy:
      'Los trapecios inferior y medio junto con los romboides juntan y descienden las escápulas. Los rotadores externos del hombro mantienen la posición en "W". En el lado opuesto, el pectoral menor y los flexores del hombro quedan en estiramiento.',
    mechanics:
      'Una combinación de elevación y rotación escapular coordinada con la abducción del hombro en el plano frontal. La pared impone un plano de referencia: hace visible e imposible de ignorar cualquier compensación por arqueo o por rotación.',
    benefits: [
      'Contrarresta directamente la postura de hombros adelantados que instala estar sentado mucho rato.',
      'Recupera la movilidad de hombro necesaria antes de cualquier trabajo de empuje por encima de la cabeza.',
      'La pared da una respuesta inmediata sobre la calidad de la ejecución, sin espejo ni mirada externa.',
    ],
    progression: {
      easier:
        'Separa un poco los pies de la pared y flexiona las rodillas: reduce el arqueo y facilita mantener el contacto.',
      harder: 'Ve aún más despacio, o mantén dos segundos en el punto más alto.',
      readyWhen: 'Cuando completes el recorrido sin que los codos se despeguen, añade la pausa.',
    },
    precautions:
      'Perder el contacto con la pared no es un fracaso sino información: es tu movilidad actual. Forzar arqueando la espalda no mejora esa movilidad.',
  },

  superman: {
    slug: 'superman',
    muscles: { primary: 'Zona lumbar, glúteos', secondary: 'Espalda alta' },
    steps: [
      'Túmbate boca abajo, con los brazos extendidos por delante y las piernas extendidas por detrás.',
      'Mira al suelo para mantener el cuello neutro durante todo el movimiento.',
      'Levanta a la vez brazos, pecho y piernas unos centímetros.',
      'Haz una pausa arriba y baja de forma controlada.',
    ],
    mistakes: [
      'Levantar la cabeza para mirar al frente en lugar de mantener la mirada baja: comprime el cuello.',
      'Subir demasiado y demasiado rápido, a tirones en lugar de con control.',
      'Bloquear la respiración durante el esfuerzo.',
    ],
    sensation:
      'Una contracción en la zona lumbar y los glúteos. Una compresión dolorosa en la zona lumbar, en cambio, indica que estás subiendo demasiado: la altura no es el criterio de éxito.',
    rangeOfMotion:
      'Unos pocos centímetros bastan. El objetivo es una extensión ligera y controlada, no un arqueo máximo: los últimos grados no añaden trabajo muscular, solo compresión articular.',
    tempo:
      'Dos segundos para subir, uno de mantenimiento, dos para bajar. Espira al subir. La mirada permanece en el suelo de principio a fin.',
    anatomy:
      'El erector de la columna, los músculos largos a ambos lados de la espina, produce la extensión. El glúteo mayor y los isquiotibiales extienden la cadera por el lado de las piernas, y el trapecio inferior contribuye por el lado de los brazos.',
    mechanics:
      'Extensión simultánea de columna y caderas contra la gravedad, boca abajo. Concéntrica al subir, excéntrica al bajar. Sin material, es una de las pocas formas de cargar directamente la cadena posterior.',
    benefits: [
      'Fortalece la zona lumbar, a menudo descuidada aunque sea justo la que protesta tras una etapa sedentaria.',
      'Trabaja toda la cadena posterior, que estar sentado acorta y debilita.',
      'No necesita material ni apoyo: practicable en cualquier sitio donde puedas tumbarte.',
    ],
    progression: {
      easier: 'Levanta solo los brazos, o solo las piernas, en lugar de ambos a la vez.',
      harder: 'Alarga el mantenimiento arriba, o levanta brazo y pierna contrarios de forma alterna.',
      readyWhen: 'Cuando hagas tres series de doce sin ninguna compresión en la zona lumbar.',
    },
    precautions:
      'Levantar la cabeza para mirar al frente comprime el cuello: mantén la mirada baja. Con dolor lumbar establecido, este no es el punto de partida adecuado.',
  },

  reverseSnowAngel: {
    slug: 'angel-invertido',
    muscles: { primary: 'Espalda alta, hombros' },
    steps: [
      'Túmbate boca abajo, con los brazos extendidos por delante y las palmas hacia el suelo.',
      'Levanta ligeramente el pecho y los brazos del suelo.',
      'Lleva los brazos hacia fuera describiendo un arco amplio hasta las caderas, como un ángel de nieve al revés.',
      'Devuelve los brazos hacia delante por el mismo arco, de forma controlada.',
    ],
    mistakes: [
      'Levantar demasiado el pecho: arquea en exceso la zona lumbar.',
      'Un movimiento a tirones en lugar de un arco amplio y continuo.',
      'Hombros que suben hacia las orejas durante el barrido.',
    ],
    sensation:
      'Trabajo concentrado entre las escápulas y en la parte posterior de los hombros, con una sensación de apertura en el pecho. Es uno de los pocos ejercicios sin material que alcanza realmente esta zona.',
    rangeOfMotion:
      'El arco amplio va desde los brazos extendidos por delante hasta las caderas, manteniéndose lo más cerca posible del suelo sin tocarlo. El recorrido útil se detiene donde el hombro empieza a rodar hacia delante.',
    tempo:
      'Lento y continuo, unos tres segundos por pasada. No es un ejercicio de fuerza sino de control sobre un recorrido largo: la velocidad dejaría que la inercia hiciera el trabajo en lugar de los músculos.',
    anatomy:
      'Los trapecios medio e inferior junto con los romboides juntan las escápulas. El deltoides posterior trabaja durante todo el trayecto, y los rotadores externos mantienen la orientación del brazo. El erector de la columna sostiene el pecho ligeramente elevado.',
    mechanics:
      'Aducción y abducción horizontal del hombro boca abajo, con la gravedad ofreciendo resistencia durante todo el trayecto. A diferencia de un movimiento de pie, donde la resistencia varía mucho según el ángulo, estar tumbado en el suelo mantiene la resistencia bastante constante de un extremo del arco al otro.',
    benefits: [
      'Trabaja la espalda alta, la zona más difícil de alcanzar sin barra de dominadas ni banda elástica.',
      'Complementa directamente los deslizamientos en pared para recuperar el recorrido de hombro perdido por estar sentado.',
      'Entrena la resistencia postural más que la fuerza máxima, que es como se usan realmente estos músculos.',
    ],
    progression: {
      easier: 'Flexiona los codos para acortar la palanca, o reduce el arco recorrido.',
      harder: 'Extiende los brazos por completo, ve más despacio, o haz una pausa en ambos extremos del arco.',
      readyWhen: 'Cuando hagas tres series de doce con los brazos estirados y sin que los hombros rueden.',
    },
  },

  birdDog: {
    slug: 'bird-dog',
    muscles: { primary: 'Core, zona lumbar', secondary: 'Glúteos, hombros' },
    steps: [
      'Ponte a cuatro patas, con las manos bajo los hombros y las rodillas bajo las caderas.',
      'Activa el core para mantener la espalda plana, alineada con la cabeza.',
      'Extiende a la vez un brazo hacia delante y la pierna contraria hacia atrás.',
      'Haz una pausa manteniendo la cadera inmóvil y nivelada.',
      'Vuelve al inicio y repite con el otro lado.',
    ],
    mistakes: [
      'La pelvis rota o bascula hacia un lado durante la extensión.',
      'La zona lumbar se arquea para ganar recorrido.',
      'Ir demasiado rápido: la estabilidad importa más que la velocidad.',
    ],
    sensation:
      'Un esfuerzo profundo de estabilización en el tronco y en el glúteo de la pierna extendida, más que una sensación de fuerza en las extremidades. Si no notas nada en el tronco, probablemente la pelvis se está moviendo y absorbiendo el trabajo.',
    rangeOfMotion:
      'Extiende brazo y pierna hasta la horizontal, no más alto. Subir más la pierna arquea la zona lumbar sin aportar nada: la horizontal es el límite útil.',
    tempo:
      'Dos segundos para extender, uno o dos de mantenimiento, dos para volver. El mantenimiento es la parte que cuenta: es cuando la estabilización trabaja de verdad.',
    anatomy:
      'El erector de la columna y el multífido, un músculo profundo y segmentario de la espina, mantienen la espalda neutra. Los oblicuos resisten la rotación pélvica, el glúteo mayor extiende la cadera, y el deltoides con el trapecio inferior sostienen el brazo en horizontal.',
    mechanics:
      'Un ejercicio antirrotación y antiextensión: el peso de las extremidades opuestas crea un par que tiende a girar y arquear el tronco, y toda la tarea consiste en impedirlo. Es control motor cruzado, el mismo patrón que al caminar.',
    benefits: [
      'Fortalece la estabilidad lumbar sin carga compresiva sobre la columna, lo que suele hacerlo bien tolerado en una vuelta al entrenamiento.',
      'Entrena la coordinación cruzada de brazo y pierna contrarios, directamente transferible a caminar.',
      'Revela las asimetrías de inmediato: un lado suele ser bastante menos estable que el otro.',
    ],
    progression: {
      easier: 'Extiende una extremidad cada vez, primero el brazo y luego la pierna.',
      harder: 'Alarga el mantenimiento, o añade un acercamiento de rodilla al codo bajo el cuerpo entre cada extensión.',
      readyWhen:
        'Cuando hagas diez repeticiones por lado con la pelvis perfectamente inmóvil, alarga el mantenimiento a cinco segundos.',
    },
    precautions:
      'Una esterilla o un cojín bajo las rodillas evita que la molestia articular termine la serie antes de que los músculos se cansen.',
  },

  catCow: {
    slug: 'gato-vaca',
    muscles: { primary: 'Columna, movilidad de la espalda' },
    steps: [
      'Ponte a cuatro patas, con las manos bajo los hombros y las rodillas bajo las caderas.',
      'Al inspirar, hunde la espalda hacia abajo y levanta la cabeza (la posición de "vaca").',
      'Al espirar, redondea la espalda hacia arriba y mira hacia el ombligo (la posición de "gato").',
      'Encadena las dos posiciones lentamente, al ritmo de la respiración.',
    ],
    mistakes: [
      'Ir demasiado rápido, desconectado de la respiración.',
      'Forzar el recorrido más allá de lo cómodo, sobre todo en la zona lumbar.',
      'Dejar que los hombros se hundan en lugar de mantener las manos activas.',
    ],
    sensation:
      'Un desenrollado progresivo a lo largo de la columna, vértebra a vértebra, más que un esfuerzo muscular. Lo que buscas es una sensación de movilidad que se abre, no una contracción.',
    rangeOfMotion:
      'Llega al final del rango cómodo en ambas direcciones, sin forzar nunca. El recorrido se abre de forma natural con las repeticiones: es el único ejercicio de esta biblioteca donde el rango del día está pensado para crecer durante la propia serie.',
    tempo:
      'La respiración marca el tempo, y no al revés: inspira al hundir, espira al redondear. Cuenta de tres a cuatro segundos por posición, sin tiempos muertos.',
    anatomy:
      'No es un ejercicio de fortalecimiento. El erector de la columna y los abdominales alternan contracción y estiramiento para movilizar cada segmento vertebral. Los músculos intersegmentarios profundos trabajan en todo el recorrido.',
    mechanics:
      'Flexión y luego extensión sucesivas de la columna en el plano sagital, sin carga: el peso del cuerpo descansa sobre manos y rodillas, no sobre la columna. Eso es lo que permite movilizar libremente, sin compresión axial.',
    benefits: [
      'Recupera la movilidad segmentaria de la columna que estar sentado mucho rato agarrota.',
      'Es un calentamiento excelente antes de cualquier trabajo de espalda, y una transición suave al final de la sesión.',
      'Empareja explícitamente movimiento y respiración, lo que ayuda a no bloquear el aire en los demás ejercicios.',
    ],
    precautions:
      'No debe aparecer dolor: esto es movilidad, no un estiramiento forzado. Si un segmento se queda bloqueado, reduce el recorrido en lugar de insistir.',
  },

  reverseLunge: {
    slug: 'zancada-hacia-atras',
    muscles: { primary: 'Cuádriceps, glúteos', secondary: 'Isquiotibiales' },
    steps: [
      'De pie, con los pies a la anchura de las caderas.',
      'Da un paso largo hacia atrás con una pierna, manteniendo el pecho erguido.',
      'Flexiona las dos rodillas hasta que la de atrás roce el suelo.',
      'Empuja con el talón de la pierna delantera para volver al inicio.',
      'Repite con el otro lado.',
    ],
    mistakes: [
      'La rodilla delantera sobrepasa ampliamente la punta del pie.',
      'El pecho se inclina hacia delante en lugar de mantenerse erguido.',
      'Un paso demasiado corto: reduce el recorrido y el trabajo de los glúteos.',
    ],
    sensation:
      'Cuádriceps y glúteo de la pierna delantera, con un estiramiento en la parte delantera de la cadera trasera. El equilibrio exige un esfuerzo constante: es normal, y forma parte del trabajo.',
    rangeOfMotion:
      'Baja hasta que la rodilla de atrás roce el suelo sin tocarlo, con la rodilla delantera cerca de 90°. Un paso demasiado corto lo concentra todo en la rodilla delantera; uno demasiado largo hace inestable la vuelta.',
    tempo:
      'Dos segundos para bajar, uno o dos para subir, con una breve pausa abajo para eliminar el rebote. Espira al empujar con el talón delantero.',
    anatomy:
      'El cuádriceps y el glúteo mayor de la pierna delantera hacen la mayor parte del trabajo. El glúteo medio estabiliza la pelvis en el plano frontal, y eso es lo que impide que la rodilla caiga hacia dentro. El psoas de la pierna trasera queda en estiramiento, y los abdominales mantienen el tronco vertical.',
    mechanics:
      'Una zancada unilateral que combina flexión y extensión de cadera y rodilla en el plano sagital, con una fuerte exigencia de estabilización frontal. Dar el paso hacia atrás en lugar de hacia delante reduce la tensión en la rodilla delantera: el peso permanece sobre la pierna que ya está colocada, en vez de ser frenado por la que avanza.',
    benefits: [
      'Trabaja cada pierna por separado, lo que revela y corrige las asimetrías que una sentadilla oculta.',
      'Exige mucho al equilibrio y a los estabilizadores de la cadera, esenciales para caminar y para las escaleras.',
      'La versión hacia atrás es bastante más amable con la rodilla que la zancada hacia delante, lo que encaja mejor en una vuelta al entrenamiento.',
    ],
    progression: {
      easier: 'Mantén una mano en una pared o en el respaldo de una silla, y reduce la profundidad.',
      harder: 'Baja más, ve más despacio, o eleva el pie delantero sobre un escalón bajo.',
      readyWhen:
        'Cuando hagas diez repeticiones por pierna sin apoyo de las manos y sin que la rodilla caiga hacia dentro.',
    },
    precautions:
      'La rodilla delantera debe permanecer alineada con el pie. Si se mete hacia dentro de forma sistemática, falta fuerza en el glúteo medio: trabaja en paralelo la abducción de cadera de pie.',
  },

  stepUp: {
    slug: 'subida-a-silla',
    muscles: { primary: 'Cuádriceps, glúteos', secondary: 'Isquiotibiales, equilibrio' },
    steps: [
      'Colócate delante de una silla baja y estable, bien asentada en el suelo.',
      'Apoya un pie por completo en el asiento.',
      'Empuja con ese pie para subir todo el cuerpo sobre la silla.',
      'Baja de forma controlada con el mismo pie, sin dejarte caer.',
      'Repite alternando las piernas.',
    ],
    mistakes: [
      'Impulsarse con la pierna que queda en el suelo en lugar de empujar con la que está en la silla.',
      'La rodilla se mete hacia dentro al subir.',
      'Una silla inestable o demasiado alta: comprueba que no vuelca.',
    ],
    sensation:
      'El cuádriceps y el glúteo de la pierna que empuja, tanto al subir como al bajar. Si notas sobre todo el gemelo de la pierna que sigue en el suelo, te estás impulsando con ella en lugar de empujar con la de arriba.',
    rangeOfMotion:
      'Sube hasta la extensión completa de la pierna de apoyo, y baja hasta que el pie toque el suelo sin transferirle el peso. La altura del escalón marca la dificultad: media pantorrilla para empezar, altura de rodilla para un trabajo exigente.',
    tempo:
      'Uno o dos segundos para subir, dos o tres para bajar. La bajada controlada es la parte más útil y la que más se acelera: es la que reproduce el descenso de escaleras.',
    anatomy:
      'El cuádriceps de la pierna que está en el escalón extiende la rodilla, y el glúteo mayor extiende la cadera. El glúteo medio estabiliza la pelvis en el apoyo sobre una sola pierna, impidiendo que la cadera contraria caiga. Los gemelos contribuyen al empuje final.',
    mechanics:
      'Extensión unilateral de cadera y rodilla en cadena cerrada contra la gravedad, a lo largo de toda la altura del escalón. Reproduce exactamente el gesto de subir escaleras: uno de los pocos ejercicios cuya transferencia a la vida diaria es literal.',
    benefits: [
      'Reproduce directamente un gesto cotidiano: subir escaleras, un bordillo, o entrar en un vehículo alto.',
      'Carga una pierna cada vez, lo que duplica la carga relativa sin ningún material.',
      'La fase de bajada entrena el control excéntrico, justo lo que falta cuando bajar escaleras se vuelve difícil.',
    ],
    progression: {
      easier: 'Elige un escalón más bajo y mantén una mano para el equilibrio.',
      harder: 'Usa un escalón más alto, ralentiza la bajada, o haz una pausa arriba sobre una sola pierna.',
      readyWhen:
        'Cuando hagas diez repeticiones por pierna sin apoyo de las manos y sin impulso de la pierna del suelo, sube un nivel.',
    },
    precautions:
      'La estabilidad del apoyo no es negociable: una silla que resbala o vuelca hace peligroso este ejercicio. Un escalón de una escalera suele ser mejor opción.',
  },

  lateralLunge: {
    slug: 'zancada-lateral',
    muscles: { primary: 'Cuádriceps, glúteos', secondary: 'Aductores' },
    steps: [
      'De pie, con los pies juntos.',
      'Da un paso largo hacia un lado.',
      'Flexiona la rodilla de esa pierna llevando la cadera hacia atrás, con la otra pierna estirada.',
      'Empuja con el talón de la pierna flexionada para volver al inicio.',
      'Repite con el otro lado.',
    ],
    mistakes: [
      'La rodilla flexionada se mete hacia dentro en lugar de alinearse con el pie.',
      'El talón de la pierna flexionada se despega del suelo.',
      'El pecho se hunde hacia delante en lugar de mantenerse erguido.',
    ],
    sensation:
      'Cuádriceps y glúteo de la pierna flexionada, más un estiramiento marcado en la cara interna del muslo estirado. Esa última sensación suele ser la más llamativa al principio: los aductores rara vez se trabajan en este recorrido.',
    rangeOfMotion:
      'Baja hasta donde la cara interna del muslo contrario permita, sin que se despegue el talón de la pierna flexionada. Al principio el límite es la flexibilidad de los aductores, no la fuerza: el recorrido se abrirá solo.',
    tempo:
      'Dos o tres segundos para bajar, uno o dos para subir. Mantén el pecho erguido y las puntas de los pies hacia delante en ambos lados.',
    anatomy:
      'El cuádriceps y el glúteo mayor de la pierna flexionada producen el movimiento. Los aductores de la pierna estirada trabajan en estiramiento, y el glúteo medio estabiliza la pelvis. El movimiento transcurre en un plano que casi todos los ejercicios convencionales ignoran.',
    mechanics:
      'Flexión y extensión de cadera y rodilla en el plano frontal, a diferencia de la sentadilla y la zancada, que se quedan en el plano sagital. Esa orientación es justo lo que lo hace complementario: recluta músculos y recorridos que los demás dejan fuera.',
    benefits: [
      'Trabaja el plano frontal, el gran ausente de los programas sin material, de ahí su valor real pese al aparente solapamiento con la sentadilla.',
      'Fortalece los aductores y la movilidad lateral de la cadera, útiles para evitar tropiezos y pérdidas de equilibrio hacia el lado.',
      'Mejora la capacidad de desplazarse lateralmente, un gesto cotidiano que no se entrena de ninguna otra forma.',
    ],
    progression: {
      easier: 'Acorta el paso y reduce la profundidad, o mantén una mano en un apoyo.',
      harder: 'Alarga el paso, baja más, o ralentiza la vuelta.',
      readyWhen: 'Cuando hagas diez repeticiones por lado con el talón apoyado y el pecho erguido.',
    },
    precautions:
      'Ante cualquier molestia en la cara interna del muslo, reduce mucho la amplitud del paso: los aductores se resienten con facilidad cuando se busca el recorrido máximo demasiado pronto.',
  },

  gluteBridge: {
    slug: 'puente-de-gluteos',
    muscles: { primary: 'Glúteos', secondary: 'Isquiotibiales, zona lumbar' },
    steps: [
      'Túmbate boca arriba, con las rodillas flexionadas y los pies apoyados cerca de los glúteos.',
      'Empuja con los talones para elevar la cadera hacia el techo.',
      'Aprieta fuerte los glúteos arriba, con el cuerpo alineado de rodillas a hombros.',
      'Baja de forma controlada sin dejar caer la cadera.',
    ],
    mistakes: [
      'Empujar con las puntas de los pies en lugar de con los talones.',
      'Arquear en exceso la zona lumbar en lugar de terminar con una contracción de glúteos.',
      'No subir lo suficiente: arriba el cuerpo debe quedar alineado.',
    ],
    sensation:
      'Los glúteos, con claridad, y algo de isquiotibiales. Si la zona lumbar trabaja más que los glúteos, la subida viene de un arqueo lumbar y no de una extensión de cadera: es el fallo más extendido en este ejercicio.',
    rangeOfMotion:
      'Sube hasta que rodillas, cadera y hombros queden alineados, no más. Intentar ir más allá solo añade arqueo: la alineación es el techo útil.',
    tempo:
      'Dos segundos para subir, uno o dos de contracción arriba, dos o tres para bajar. La pausa arriba con los glúteos apretados es lo que separa un puente eficaz de un simple balanceo de pelvis.',
    anatomy:
      'El glúteo mayor es el motor principal: es el extensor de cadera más potente del cuerpo. Los isquiotibiales ayudan, el erector de la columna estabiliza la espina sin tener que producir el movimiento, y los abdominales impiden un arqueo excesivo arriba.',
    mechanics:
      'Extensión de cadera en cadena cerrada con la espalda en el suelo. El suelo elimina toda exigencia de equilibrio y descarga la columna, lo que permite dirigir el trabajo al glúteo mayor de forma aislada: algo difícil de pie, donde cuádriceps y gemelos siempre participan.',
    benefits: [
      'Trabaja el glúteo mayor de forma más directa que la sentadilla, donde el cuádriceps asume buena parte del esfuerzo.',
      'Contrarresta la inhibición del glúteo que instala estar sentado mucho rato.',
      'Trabaja sin carga sobre la columna, lo que a menudo lo hace accesible cuando los movimientos de pie todavía no lo son.',
    ],
    progression: {
      easier: 'Reduce la altura de la subida, o acerca más los pies a los glúteos.',
      harder: 'Pasa a una sola pierna, con la otra rodilla hacia el pecho, o alarga la contracción arriba a cinco segundos.',
      readyWhen:
        'Cuando hagas tres series de quince con una contracción firme arriba y sin calambres en los isquiotibiales, pasa a una pierna.',
    },
    precautions:
      'Un calambre en los isquiotibiales arriba suele indicar que los glúteos no están asumiendo su parte: acerca los pies y concéntrate en empujar con los talones.',
  },

  donkeyKick: {
    slug: 'patada-de-gluteo',
    muscles: { primary: 'Glúteos', secondary: 'Core' },
    steps: [
      'Ponte a cuatro patas, con las manos bajo los hombros y las rodillas bajo las caderas.',
      'Mantén una rodilla flexionada a 90° y empuja ese pie hacia el techo.',
      'Aprieta el glúteo arriba, sin arquear la zona lumbar.',
      'Baja de forma controlada sin apoyar la rodilla entre repeticiones.',
      'Termina la serie y cambia de lado.',
    ],
    mistakes: [
      'Arquear la zona lumbar para ganar altura.',
      'Ir demasiado rápido, lanzando la pierna en lugar de empujarla con control.',
      'El tronco rota en lugar de mantenerse paralelo al suelo.',
    ],
    sensation:
      'El glúteo de la pierna que sube, de forma aislada. Si la zona lumbar se hunde para ganar altura, el ejercicio ha cambiado de naturaleza: ya no trabaja el glúteo sino la musculatura lumbar.',
    rangeOfMotion:
      'Sube hasta que el muslo alcance la línea del tronco, no más. El punto de parada es donde la pelvis empezaría a bascular, a menudo mucho más bajo de lo que imaginas.',
    tempo:
      'Dos segundos para empujar, uno de contracción arriba, dos para bajar sin apoyar la rodilla. El movimiento debe empujarse, nunca lanzarse.',
    anatomy:
      'El glúteo mayor extiende la cadera, con la rodilla flexionada para acortar los isquiotibiales e impedir que tomen el relevo. El glúteo medio y los oblicuos del lado contrario estabilizan la pelvis frente a la rotación.',
    mechanics:
      'Extensión de cadera en cadena abierta con la rodilla flexionada. Mantener la rodilla doblada es una restricción mecánica deliberada: sitúa a los isquiotibiales en insuficiencia activa, concentrando la extensión en el glúteo mayor.',
    benefits: [
      'Aísla el glúteo con muy poca ayuda de otros grupos, algo poco frecuente sin material.',
      'Enseña a disociar la extensión de cadera del arqueo lumbar, una distinción que se aprovecha en todos los demás ejercicios de cadena posterior.',
      'No carga la columna, ya que la posición de cuadrupedia reparte el peso corporal entre cuatro puntos de apoyo.',
    ],
    progression: {
      easier: 'Reduce el recorrido y céntrate en la contracción más que en la altura.',
      harder: 'Alarga la contracción arriba, o pasa a apoyarte sobre los antebrazos, lo que aumenta la exigencia de estabilización.',
      readyWhen:
        'Cuando hagas quince repeticiones por lado sin hundir la zona lumbar y sin rotación de la pelvis.',
    },
  },

  hipAbduction: {
    slug: 'abduccion-de-cadera-de-pie',
    muscles: { primary: 'Glúteo medio (lateral de la cadera)' },
    steps: [
      'De pie, apoyándote ligeramente en una silla o una pared si necesitas equilibrio.',
      'Mantén la pierna de apoyo ligeramente flexionada y el pecho erguido.',
      'Levanta la otra pierna hacia el lado, estirada, sin inclinar el tronco.',
      'Baja de forma controlada sin dejar caer el pie.',
      'Termina la serie y cambia de pierna.',
    ],
    mistakes: [
      'Inclinar el tronco hacia el otro lado para ganar altura: eso es trampa, no más efecto.',
      'Llevar la pierna hacia delante en lugar de subirla exactamente hacia el lado.',
      'Ir demasiado rápido, a modo de balanceo.',
    ],
    sensation:
      'En el lateral de la cadera, por encima de la articulación, una zona que pocos ejercicios alcanzan. En la pierna de apoyo, un esfuerzo de estabilización discreto pero real.',
    rangeOfMotion:
      'Sube la pierna hasta unos 30-45°, no más. A partir de ahí el cuadrado lumbar toma el relevo inclinando el tronco: el recorrido aparente crece, el trabajo del glúteo medio no.',
    tempo:
      'Dos segundos para subir, uno arriba, dos para bajar. Este músculo responde mejor al control y al volumen que a la velocidad.',
    anatomy:
      'El glúteo medio es el motor principal, ayudado por el glúteo menor y el tensor de la fascia lata. En la pierna de apoyo, esos mismos músculos trabajan de forma isométrica para impedir que la pelvis caiga del lado elevado.',
    mechanics:
      'Abducción de cadera en el plano frontal, en cadena abierta del lado que trabaja y con estabilización isométrica del lado de apoyo. Las dos caderas trabajan por tanto a la vez, pero de dos maneras distintas: un detalle que suele pasarse por alto.',
    benefits: [
      'Fortalece el glúteo medio, cuya debilidad es una causa frecuente de que la rodilla se meta hacia dentro en sentadillas, zancadas y bajadas de escaleras.',
      'Mejora la estabilidad sobre una pierna, es decir, la mitad de cada zancada al caminar.',
      'Complementa directamente sentadillas y zancadas corrigiendo aquello que las degrada.',
    ],
    progression: {
      easier: 'Sujétate al apoyo con las dos manos y reduce el recorrido.',
      harder:
        'Suelta el apoyo, alarga el mantenimiento arriba, o pasa a la posición tumbado de lado para eliminar toda compensación.',
      readyWhen: 'Cuando hagas quince repeticiones por lado sin apoyo y sin inclinar el tronco.',
    },
  },

  sidePlank: {
    slug: 'plancha-lateral',
    muscles: { primary: 'Oblicuos, core lateral' },
    steps: [
      'Túmbate de lado, apoyado sobre el antebrazo colocado bajo el hombro.',
      'Apila los pies uno sobre otro, o escalónalos para más estabilidad.',
      'Eleva la cadera del suelo para alinear el cuerpo en línea recta.',
      'Aguanta la posición respirando con normalidad, sin dejar caer la cadera.',
      'Termina la serie y cambia de lado.',
    ],
    mistakes: [
      'La cadera se hunde hacia el suelo durante el mantenimiento.',
      'El hombro se hunde hacia la oreja en lugar de mantenerse sobre el codo.',
      'El cuerpo rota hacia delante o hacia atrás.',
    ],
    sensation:
      'El lateral del tronco, entre las costillas y la cadera, del lado apoyado. El hombro de apoyo también trabaja: si se hunde hacia la oreja, empuja activamente el suelo para mantenerlo estable.',
    rangeOfMotion:
      'Sin recorrido, una alineación: oreja, hombro, cadera y tobillo en una misma línea vista de frente. La cadera es el punto que cede primero, y es lo que hay que vigilar.',
    tempo:
      'Un mantenimiento continuo, respirando con normalidad. Como en la plancha estándar, el criterio de parada es la posición y no el reloj: en cuanto la cadera cae, la serie ha terminado.',
    anatomy:
      'Los oblicuos interno y externo del lado apoyado dirigen el mantenimiento, ayudados por el cuadrado lumbar. El glúteo medio estabiliza la pelvis en el plano frontal, y el serrato anterior mantiene la escápula de apoyo pegada a las costillas.',
    mechanics:
      'Un isométrico antiflexión lateral: la gravedad tira de la cadera hacia el suelo y la cadena lateral lo impide. Es el complemento directo de la plancha estándar, que apenas trabaja este plano.',
    benefits: [
      'Trabaja la cadena lateral, olvidada por la plancha estándar y por la mayoría de los ejercicios abdominales.',
      'Fortalece la estabilidad pélvica en apoyo sobre una pierna, lo que se transfiere a caminar y a cargar peso de un solo lado.',
      'Hace muy visibles las asimetrías izquierda-derecha: el tiempo aguantado suele diferir bastante.',
    ],
    progression: {
      easier: 'Flexiona las rodillas y apóyate en ellas en lugar de en los pies: la palanca se acorta mucho.',
      harder: 'Alarga la duración, eleva el brazo libre hacia el techo, o levanta la pierna de arriba.',
      readyWhen:
        'Cuando aguantes treinta segundos por lado sin que la cadera caiga, añade complejidad en lugar de alargar indefinidamente.',
    },
    precautions:
      'El codo debe quedar exactamente bajo el hombro. Demasiado adelante o atrás, la tensión se desplaza a la articulación en lugar de quedarse en el músculo.',
  },

  standingKneeRaise: {
    slug: 'elevacion-de-rodillas-de-pie',
    muscles: { primary: 'Core, flexores de la cadera' },
    steps: [
      'De pie, con los pies a la anchura de las caderas.',
      'Levanta una rodilla hacia el pecho, manteniendo la espalda recta.',
      'Haz una breve pausa arriba, con el core activado.',
      'Baja de forma controlada y repite, o alterna los lados.',
    ],
    mistakes: [
      'La espalda se redondea para subir más la rodilla.',
      'Inclinarse hacia atrás para compensar en lugar de mantener el pecho erguido.',
      'Un movimiento lanzado en lugar de controlado.',
    ],
    sensation:
      'La parte baja del abdomen y la parte delantera de la cadera del lado que sube, con un esfuerzo de equilibrio en la pierna de apoyo. Si la espalda se arquea o el pecho se va hacia atrás, el core ya no sostiene la pelvis.',
    rangeOfMotion:
      'Sube la rodilla hasta la altura de la cadera, no más. Ir más arriba bascula la pelvis hacia atrás y traslada el trabajo de los flexores de la cadera a la zona lumbar.',
    tempo:
      'Uno o dos segundos para subir, una breve pausa arriba, dos para bajar. La bajada controlada cuenta tanto como la subida.',
    anatomy:
      'El iliopsoas y el recto femoral flexionan la cadera. Los abdominales, sobre todo el transverso, impiden que la pelvis bascule: esa cocontracción es lo que separa un verdadero ejercicio de core de pie de una simple elevación de rodilla.',
    mechanics:
      'Flexión de cadera en cadena abierta, doblada con una exigencia de estabilización sobre una pierna. Estar de pie añade un requisito de equilibrio ausente del trabajo de core en el suelo, lo que lo acerca a las restricciones reales de caminar.',
    benefits: [
      'Trabaja el core de pie, que es donde realmente cumple su función.',
      'Entrena el equilibrio sobre una pierna, directamente ligado a la estabilidad al caminar.',
      'No necesita un suelo limpio ni esterilla: practicable con ropa de calle y en cualquier sitio.',
    ],
    progression: {
      easier: 'Mantén una mano apoyada ligeramente en una pared o en el respaldo de una silla.',
      harder: 'Suelta el apoyo, cierra los ojos, o alarga el mantenimiento arriba.',
      readyWhen: 'Cuando hagas quince repeticiones por pierna sin apoyo y sin inclinarte hacia atrás.',
    },
  },

  crunch: {
    slug: 'crunch-abdominal',
    muscles: { primary: 'Abdominales (recto abdominal)' },
    steps: [
      'Túmbate boca arriba, con las rodillas flexionadas y los pies apoyados en el suelo.',
      'Coloca las manos suavemente detrás de las orejas o cruzadas sobre el pecho, sin tirar del cuello.',
      'Despega las escápulas del suelo al espirar, contrayendo los abdominales.',
      'Baja de forma controlada hasta rozar el suelo sin soltar todo el peso sobre él.',
    ],
    mistakes: [
      'Tirar de la cabeza con las manos para subir más: carga el cuello en lugar de los abdominales.',
      'Subir hasta quedar sentado: eso ya no es un crunch, y el efecto sobre los abdominales baja.',
      'Bloquear la respiración en lugar de espirar durante la contracción.',
    ],
    sensation:
      'La parte alta de la pared abdominal, en un recorrido corto. Una tensión en el cuello significa siempre que las manos están tirando de la cabeza: solo deben acompañarla.',
    rangeOfMotion:
      'Despega las escápulas del suelo, nada más. Seguir subiendo hasta sentarte traslada el trabajo a los flexores de la cadera: el recorrido corto no es una concesión, es el movimiento correcto.',
    tempo:
      'Dos segundos para subir espirando, dos para bajar inspirando, sin soltarte del todo abajo para no perder la tensión.',
    anatomy:
      'El recto abdominal acerca el esternón a la pelvis: ese es el motor del movimiento. Los oblicuos contribuyen a la estabilización. El psoas apenas interviene mientras el recorrido siga siendo corto, y eso es justo lo que distingue un crunch de un abdominal completo.',
    mechanics:
      'Flexión de la columna en el plano sagital, en un recorrido deliberadamente limitado. El movimiento somete la columna lumbar a una flexión repetida: por eso complementa, pero nunca sustituye, al trabajo antiextensión como la plancha o el dead bug.',
    benefits: [
      'Recluta el recto abdominal de forma directa, cosa que los ejercicios isométricos de core no hacen.',
      'El recorrido corto y la posición en el suelo lo convierten en una de las formas más accesibles de retomar el trabajo abdominal.',
      'Combina bien con la plancha y el dead bug, que entrenan la estabilización en lugar de la flexión.',
    ],
    progression: {
      easier: 'Cruza los brazos sobre el pecho en lugar de llevarlos detrás de la cabeza, y reduce el recorrido.',
      harder: 'Ve más despacio, haz una pausa arriba, o extiende los brazos por encima de la cabeza.',
      readyWhen: 'Cuando hagas tres series de veinte sin tirar del cuello.',
    },
    precautions:
      'La flexión repetida de la columna no le conviene a todo el mundo. Con cualquier sensibilidad lumbar, prioriza el dead bug y la plancha, que producen trabajo abdominal sin flexionar la columna.',
  },

  highKneeMarch: {
    slug: 'marcha-con-rodillas-altas',
    muscles: { primary: 'Cardiovascular, flexores de la cadera' },
    steps: [
      'De pie, con los pies a la anchura de las caderas.',
      'Sube una rodilla hasta la altura de la cadera y apoya el pie de forma controlada.',
      'Alterna las piernas a un ritmo constante, como si marcharas sin desplazarte.',
      'Mantén el pecho erguido y deja que los brazos acompañen el movimiento.',
    ],
    mistakes: [
      'Un ritmo acelerado que te hace perder control y equilibrio.',
      'El pecho se echa hacia atrás para subir más la rodilla.',
      'Apoyar el pie con fuerza en cada paso.',
    ],
    sensation:
      'Falta de aire progresiva, más trabajo en la parte delantera de las caderas y en los gemelos. Es un ejercicio cardiovascular, no de fuerza: la fatiga debe ser respiratoria antes que muscular.',
    rangeOfMotion:
      'Rodilla a la altura de la cadera, con el pie completamente apoyado entre cada subida. Subir más no añade nada al trabajo cardiovascular y bascula la pelvis.',
    tempo:
      'Un ritmo constante que puedas sostener durante todo el tiempo previsto, no una aceleración seguida de un desplome. Los brazos se mueven con naturalidad, en oposición a las piernas.',
    anatomy:
      'El iliopsoas y el recto femoral flexionan la cadera, y los gemelos se encargan de la propulsión y la recepción. Los abdominales estabilizan la pelvis en cada apoyo, y el glúteo medio de la pierna de apoyo impide que la cadera contraria caiga.',
    mechanics:
      'Locomoción sin desplazamiento y sin fase de vuelo: cada pie vuelve al suelo antes de que el otro lo abandone. Esa ausencia de suspensión elimina el impacto, lo que lo separa claramente de correr elevando rodillas.',
    benefits: [
      'Eleva la frecuencia cardiaca sin desplazamiento y sin material, en un solo metro cuadrado.',
      'Sirve como calentamiento completo al inicio de la sesión, o como impulso cardiovascular entre dos ejercicios de fuerza.',
      'Sin impacto, a diferencia de los saltos: practicable en un piso y compatible con una vuelta al entrenamiento.',
    ],
    progression: {
      easier: 'Baja las rodillas y el ritmo, hasta quedarte en una simple marcha en el sitio.',
      harder: 'Sube el ritmo, alarga la duración, o añade un movimiento de brazos por encima de la cabeza.',
      readyWhen:
        'Cuando hagas dos rondas de sesenta segundos sin falta de aire marcada, alarga la duración.',
    },
  },

  buttKickMarch: {
    slug: 'marcha-con-talones-al-gluteo',
    muscles: { primary: 'Cardiovascular, isquiotibiales' },
    steps: [
      'De pie, con los pies a la anchura de las caderas.',
      'Flexiona una rodilla para llevar el talón hacia el glúteo.',
      'Apoya el pie de forma controlada y repite con el otro lado.',
      'Mantén un ritmo moderado y constante, como si marcharas sin desplazarte.',
    ],
    mistakes: [
      'Un ritmo demasiado rápido, que reduce la amplitud del movimiento.',
      'El pecho se inclina hacia delante durante el ejercicio.',
      'El talón no sube lo suficiente: reduce el sentido del movimiento.',
    ],
    sensation:
      'Falta de aire moderada y trabajo en la parte posterior de los muslos. Es el complemento natural de la marcha con rodillas altas: donde aquella trabaja la parte delantera de la cadera, esta moviliza la parte trasera del muslo.',
    rangeOfMotion:
      'Lleva el talón tan cerca del glúteo como permita tu flexibilidad, sin que la rodilla se adelante ni la pelvis bascule. El pecho permanece erguido todo el tiempo.',
    tempo:
      'Un ritmo moderado y constante. El objetivo es resistencia y movilización, no velocidad máxima: si vas demasiado rápido, la amplitud se reduce y el ejercicio pierde su sentido.',
    anatomy:
      'Los isquiotibiales flexionan la rodilla, su acción principal y una de las que rara vez se entrenan sin material. Los glúteos mantienen la extensión de cadera, y los abdominales impiden un arqueo compensatorio.',
    mechanics:
      'Flexión repetida de rodilla en cadena abierta, alternando, sin impacto y sin fase de vuelo. Estar de pie añade un componente de equilibrio sobre una pierna en cada apoyo, ausente del trabajo equivalente en el suelo.',
    benefits: [
      'Recluta los isquiotibiales en flexión, algo que ningún otro ejercicio sin material de esta biblioteca hace de forma directa.',
      'Complementa la marcha con rodillas altas para equilibrar la parte delantera y trasera del muslo.',
      'Es un calentamiento excelente antes de cualquier trabajo de piernas, y sin impacto.',
    ],
    progression: {
      easier: 'Baja el ritmo y reduce el recorrido, hasta quedarte en una simple marcha en el sitio.',
      harder: 'Sube ligeramente el ritmo, alarga la duración, o haz una pausa con el talón junto al glúteo.',
      readyWhen: 'Cuando hagas dos rondas de sesenta segundos manteniendo la amplitud completa.',
    },
    precautions:
      'Un calambre en la parte posterior del muslo suele indicar un calentamiento insuficiente: empieza con una simple marcha en el sitio antes de añadir amplitud.',
  },
};
