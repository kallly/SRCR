// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

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
      'El progreso se mide en segundos, una unidad más clara que "una repetición más" para seguir tu progreso.',
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
      'Locomoción cíclica en cadena cerrada alternante: cada pierna pasa por una fase de apoyo y otra de oscilación. A diferencia de correr, siempre hay un pie en el suelo, y esa ausencia de fase de vuelo es lo que elimina el impacto y permite caminar a diario.',
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
      'Fortalece la estabilidad lumbar sin carga compresiva sobre la columna, lo que suele hacerlo bien tolerado incluso con una espalda sensible.',
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
      'La versión hacia atrás es bastante más amable con la rodilla que la zancada hacia delante, lo que encaja mejor con una rodilla sensible.',
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
      'Sin impacto, a diferencia de los saltos: practicable en un piso y a cualquier hora.',
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

  bandPullApart: {
    slug: 'apertura-con-banda-elastica',
    muscles: { primary: 'Deltoides posterior, romboides', secondary: 'Trapecio medio' },
    steps: [
      'Sujeta la banda con ambas manos, brazos extendidos al frente a la altura del pecho, con una ligera tensión ya presente.',
      'Separa los brazos hacia los lados, manteniendo los codos extendidos, hasta que la banda toque el pecho.',
      'Junta las escápulas al final del movimiento.',
      'Vuelve lentamente a la posición inicial controlando la tensión de la banda.',
    ],
    mistakes: [
      'Doblar los codos al separar los brazos: convierte el movimiento en un remo y reduce el trabajo de la parte posterior del hombro.',
      'Usar impulso del torso para ayudar a separar los brazos.',
      'Soltar bruscamente al volver en lugar de controlar la tensión de la banda.',
    ],
    sensation:
      'El trabajo se siente entre las escápulas y en la parte posterior de los hombros, no en los antebrazos ni en los bíceps. Una tensión en la parte alta del trapecio indica que los hombros suben en lugar de mantenerse bajos.',
    rangeOfMotion:
      'Separa los brazos hasta que la banda toque el pecho o la parte alta del torso, sin buscar más: más allá, la tensión cae y los hombros compensan.',
    tempo:
      'Uno o dos segundos para separar, dos o tres para volver controlando la tensión. Exhala al separar, inhala al volver.',
    anatomy:
      'El deltoides posterior y los romboides acercan las escápulas a la columna, el trapecio medio e inferior estabilizan la escápula contra la caja torácica. Los extensores del codo permanecen contraídos isométricamente para mantener los brazos rectos todo el recorrido.',
    mechanics:
      'Abducción horizontal de hombro en el plano transversal, contra una resistencia creciente: la tensión de la banda es mínima con los brazos al frente y máxima con los brazos separados, al contrario que una carga con el propio peso, constante en todo el recorrido.',
    benefits: [
      'Fortalece la parte posterior del hombro, a menudo poco trabajada frente a la parte anterior en los gestos cotidianos.',
      'Equilibra los hombros cuando ya hay varios movimientos de empuje (flexiones, press) en la sesión.',
      'Solo requiere una banda y un metro cuadrado de espacio.',
    ],
    progression: {
      easier: 'Usa una banda menos tensa, o sujétala más ancha para reducir la resistencia.',
      harder: 'Usa una banda más tensa, o ralentiza la vuelta a cuatro segundos.',
      readyWhen: 'Cuando completes tres series de quince sin que los hombros suban hacia las orejas.',
    },
    precautions:
      'Detén el movimiento si aparece dolor en la parte anterior del hombro en vez de entre las escápulas: es señal de una mala posición del hombro.',
  },

  bandSquat: {
    slug: 'sentadilla-con-banda',
    muscles: { primary: 'Cuádriceps, glúteos', secondary: 'Glúteo medio, isquiotibiales' },
    steps: [
      'Coloca la banda justo por encima de las rodillas, pies separados al ancho de las caderas.',
      'Empuja las caderas hacia atrás y baja como en una sentadilla normal, las rodillas empujando la banda hacia afuera.',
      'Baja hasta que los muslos queden cerca de la horizontal, peso sobre los talones.',
      'Sube empujando con los talones hasta la extensión completa, sin dejar que las rodillas se cierren hacia adentro.',
    ],
    mistakes: [
      'Dejar que las rodillas se cierren hacia adentro en lugar de empujar la banda hacia afuera.',
      'Bajar sin control, dejando que la banda arrastre las rodillas de golpe hacia adentro.',
      'Inclinar demasiado el torso hacia adelante.',
    ],
    sensation:
      'El trabajo se siente en la parte delantera de los muslos y en el lateral de los glúteos, que deben empujar activamente la banda. Una tensión en la rodilla indica que no se mantiene la alineación rodilla-pie.',
    rangeOfMotion:
      'Baja hasta que los muslos queden cerca de la horizontal, sin sobrepasar lo que permite una movilidad de cadera cómoda.',
    tempo:
      'Tres segundos para bajar, uno o dos para subir. Inhala al bajar, exhala al empujar con los talones.',
    anatomy:
      'El cuádriceps y el glúteo mayor siguen siendo los motores principales de la sentadilla; la banda añade una resistencia lateral que el glúteo medio debe contrarrestar continuamente para evitar que la rodilla se cierre, algo que una sentadilla sin banda no exige de la misma forma.',
    mechanics:
      'Doble flexión y luego doble extensión de cadera y rodilla en el plano sagital, combinada con una resistencia a la abducción de cadera impuesta por la banda en el plano frontal.',
    benefits: [
      'Refuerza la sentadilla clásica añadiendo trabajo activo del glúteo medio, útil para la estabilidad de la rodilla al caminar y correr.',
      'Da una señal táctil inmediata sobre la alineación de la rodilla: si la banda se afloja, la rodilla se ha cerrado.',
      'Equipo ligero y económico, fácil de llevar a cualquier parte.',
    ],
    progression: {
      easier: 'Usa una banda menos resistente, o reduce la profundidad de bajada.',
      harder: 'Usa una banda más resistente, o añade una pausa de dos segundos abajo.',
      readyWhen: 'Cuando completes tres series de quince sin que la banda se afloje en ningún momento.',
    },
    precautions:
      'Elige una resistencia que te permita mantener las rodillas alineadas durante toda la serie: una banda demasiado fuerte que las obligue a cerrarse es contraproducente.',
  },

  dumbbellGobletSquat: {
    slug: 'sentadilla-goblet',
    muscles: { primary: 'Cuádriceps, glúteos', secondary: 'Core, espalda alta' },
    steps: [
      'Sujeta una mancuerna en vertical con ambas manos contra el pecho, codos apuntando hacia abajo.',
      'Pies un poco más separados que el ancho de las caderas, puntas ligeramente hacia afuera.',
      'Baja empujando las caderas hacia atrás, los codos rozando el interior de las rodillas.',
      'Sube empujando con los talones hasta la extensión completa de las piernas.',
    ],
    mistakes: [
      'El torso se derrumba hacia adelante por el peso de la mancuerna.',
      'Los talones se levantan al bajar.',
      'Bajada incompleta por falta de movilidad de tobillo en vez de por elección.',
    ],
    sensation:
      'El trabajo se siente en la parte delantera de los muslos y los glúteos, con una tensión isométrica adicional en la espalda alta y los antebrazos que sujetan la mancuerna. El torso debe permanecer vertical de principio a fin.',
    rangeOfMotion:
      'Baja hasta que los codos toquen o rocen el interior de las rodillas: sujetar la carga delante del cuerpo permite de forma natural una bajada más profunda que con las manos libres.',
    tempo:
      'Dos o tres segundos para bajar, uno o dos para subir. Inhala al bajar, exhala al empujar con los talones.',
    anatomy:
      'El cuádriceps y el glúteo mayor siguen siendo los motores principales; sujetar la carga contra el pecho obliga a los erectores espinales y al abdomen a mantener el torso vertical frente a la tendencia a inclinarse hacia adelante, un trabajo de core que la sentadilla sin peso no exige en el mismo grado.',
    mechanics:
      'Doble flexión y luego doble extensión de cadera y rodilla en el plano sagital. La carga sujeta cerca del centro de gravedad, contra el pecho, mantiene el torso más vertical que una sentadilla con carga en la espalda.',
    benefits: [
      'Añade una carga externa progresiva a un movimiento ya dominado con el propio peso: el siguiente paso lógico cuando la sentadilla con silla resulta fácil.',
      'La posición de la carga contra el pecho enseña una postura de sentadilla vertical, útil para todas las sentadillas cargadas que vengan después.',
      'Solo requiere una mancuerna o una carga equivalente (una botella con peso, una kettlebell).',
    ],
    progression: {
      easier: 'Usa una carga más ligera, o vuelve temporalmente a la sentadilla con silla sin peso.',
      harder: 'Aumenta la carga progresivamente, o ralentiza la bajada a cuatro segundos.',
      readyWhen: 'Cuando completes tres series de diez con el torso vertical y los talones sin despegarse nunca.',
    },
    precautions:
      'Aumenta la carga en pequeños incrementos: la profundidad y el control deben mantenerse intactos primero, no el peso que marque la mancuerna.',
  },

  dumbbellRow: {
    slug: 'remo-con-mancuerna-a-un-brazo',
    muscles: { primary: 'Dorsal ancho, trapecio', secondary: 'Bíceps, core' },
    steps: [
      'Apoya una rodilla y la mano del mismo lado sobre un banco o una silla estable, espalda paralela al suelo.',
      'Sujeta la mancuerna con la otra mano, brazo extendido hacia el suelo.',
      'Tira de la mancuerna hacia la cadera manteniendo el codo cerca del cuerpo, la escápula acercándose a la columna.',
      'Baja con control hasta la extensión completa del brazo.',
    ],
    mistakes: [
      'Rotar el torso para ayudar a tirar de la mancuerna en lugar de dejar que trabaje la espalda.',
      'El codo se separa del cuerpo, convirtiendo el remo en un movimiento de hombro.',
      'La espalda se curva en lugar de mantenerse plana.',
    ],
    sensation:
      'El trabajo se siente en el centro de la espalda y bajo la axila, con la escápula acercándose claramente a la columna en la parte alta del movimiento. Una tensión en la zona lumbar indica que el apoyo en el banco no sostiene suficiente el torso.',
    rangeOfMotion:
      'Tira hasta que la mancuerna toque o roce la cadera, el codo sobrepasando ligeramente la espalda. Baja hasta la extensión completa del brazo para usar todo el recorrido disponible.',
    tempo:
      'Un segundo para tirar, dos o tres para bajar controlando la carga. Exhala al tirar, inhala al bajar.',
    anatomy:
      'El dorsal ancho y el redondo mayor acercan el brazo al cuerpo y lo extienden hacia atrás, los romboides y el trapecio medio acercan la escápula a la columna, el bíceps asiste flexionando el codo. El apoyo de rodilla y mano en el banco estabiliza el torso para aislar el trabajo de la espalda.',
    mechanics:
      'Extensión y aducción de hombro en el plano sagital, junto con retracción escapular. El apoyo unilateral en el banco elimina la contribución de las piernas presente en un remo de pie.',
    benefits: [
      'Fortalece el patrón de tracción, poco presente en una sesión con el propio peso donde los ejercicios de espalda son isométricos (superman, perro de caza).',
      'El apoyo unilateral permite trabajar cada lado de forma independiente y detectar diferencias de fuerza entre los brazos.',
      'Un contrapeso útil frente a los movimientos de empuje (flexiones, press) ya presentes en la mayoría de las sesiones.',
    ],
    progression: {
      easier: 'Usa una carga más ligera, o mantén el torso más horizontal para reducir el recorrido.',
      harder: 'Aumenta la carga, o mantén una pausa de un segundo en la parte alta del movimiento.',
      readyWhen: 'Cuando completes tres series de diez sin rotación del torso, en ambos lados.',
    },
    precautions:
      'Mantén la espalda plana de principio a fin: si el torso tiene que curvarse para subir la carga, es demasiado pesada.',
  },

  legPressMachine: {
    slug: 'prensa-de-piernas',
    muscles: { primary: 'Cuádriceps, glúteos', secondary: 'Isquiotibiales' },
    steps: [
      'Siéntate en la máquina, espalda y cabeza bien apoyadas en el respaldo.',
      'Coloca los pies planos sobre la placa, al ancho de las caderas.',
      'Libera los seguros y baja doblando las rodillas hasta un ángulo cercano a 90°.',
      'Empuja con los pies hasta la extensión de las piernas, sin bloquear del todo las rodillas.',
    ],
    mistakes: [
      'Bloquear del todo las rodillas al final del empuje, trasladando la carga a la articulación.',
      'La zona lumbar se despega del respaldo al bajar.',
      'Bajar demasiado, con las rodillas superando ampliamente el pecho.',
    ],
    sensation:
      'El trabajo se siente en la parte delantera de los muslos y los glúteos, sin tensión en la zona lumbar: el respaldo sostiene todo el torso. Una molestia lumbar indica una amplitud demasiado grande para la movilidad de cadera del momento.',
    rangeOfMotion:
      'Baja hasta un ángulo de rodilla cercano a 90°, o menos si la zona lumbar se despega antes: la máquina permite fijar este límite con precisión de una sesión a otra.',
    tempo:
      'Dos o tres segundos para bajar, uno para empujar. Inhala al bajar, exhala al empujar.',
    anatomy:
      'El cuádriceps extiende la rodilla, el glúteo mayor extiende la cadera: los mismos motores que en una sentadilla, pero el respaldo de la máquina elimina todo el trabajo de core y estabilización que la sentadilla exige al torso.',
    mechanics:
      'Doble extensión de cadera y rodilla en el plano sagital, sobre una trayectoria guiada: a diferencia de la sentadilla, el torso permanece fijo y solo se mueve la carga.',
    benefits: [
      'Permite cargar mucho las piernas sin exigir core ni equilibrio, útil como complemento o sustituto temporal de la sentadilla.',
      'La trayectoria guiada reduce el riesgo de error técnico frente a un movimiento libre cargado.',
      'Facilita el ajuste fino de la carga, paso a paso.',
    ],
    progression: {
      easier: 'Reduce la carga, o limita el ángulo de bajada a 70-80° de flexión.',
      harder: 'Aumenta la carga, o ralentiza la bajada a cuatro segundos.',
      readyWhen: 'Cuando completes tres series de diez sin que la zona lumbar se despegue del respaldo.',
    },
    precautions:
      'Nunca bloquees del todo las rodillas al final del empuje, y nunca dejes que la zona lumbar se despegue del respaldo: son los dos puntos de seguridad de esta máquina.',
  },

  latPulldownMachine: {
    slug: 'jalon-al-pecho',
    muscles: { primary: 'Dorsal ancho', secondary: 'Bíceps, trapecio' },
    steps: [
      'Siéntate frente a la máquina, muslos calzados bajo los rodillos si la máquina los tiene.',
      'Agarra la barra más ancho que los hombros, brazos extendidos.',
      'Tira de la barra hacia la parte alta del pecho manteniendo el torso recto, los codos bajando hacia las caderas.',
      'Sube con control hasta la extensión completa de los brazos.',
    ],
    mistakes: [
      'Inclinarse mucho hacia atrás para ayudar a tirar de la barra.',
      'Tirar de la barra por detrás de la nuca en lugar de por delante del pecho.',
      'Subir demasiado rápido, sin controlar la carga.',
    ],
    sensation:
      'El trabajo se siente en el centro y la parte baja de la espalda, hasta debajo de la axila. Una tensión en la parte alta del trapecio o el cuello indica que los hombros suben en lugar de mantenerse bajos.',
    rangeOfMotion:
      'Tira hasta que la barra toque la parte alta del pecho, los codos bajando junto al cuerpo. Sube hasta la extensión completa de los brazos para usar todo el recorrido.',
    tempo:
      'Uno o dos segundos para tirar, dos o tres para subir controlando la carga. Exhala al tirar, inhala al subir.',
    anatomy:
      'El dorsal ancho aduce y extiende el hombro, los romboides y el trapecio medio acercan la escápula a la columna, el bíceps asiste flexionando el codo. Es el equivalente en tracción vertical de la dominada, en versión guiada y con carga ajustable progresivamente.',
    mechanics:
      'Aducción y extensión de hombro en el plano sagital, junto con depresión y retracción escapular, sobre una trayectoria guiada por la máquina.',
    benefits: [
      'Construye la fuerza de tracción vertical necesaria para progresar hacia la dominada en barra, un movimiento que el propio peso por sí solo hace difícil de alcanzar.',
      'Permite dosificar la carga con precisión, a diferencia de una dominada con el propio peso donde solo puede ajustarse el peso total.',
      'Fortalece la espalda como espejo de los movimientos de empuje ya presentes en la mayoría de las sesiones.',
    ],
    progression: {
      easier: 'Reduce la carga, o usa un agarre más estrecho para acortar el brazo de palanca.',
      harder: 'Aumenta la carga, o mantén una pausa de un segundo en la parte baja del movimiento.',
      readyWhen: 'Cuando completes tres series de diez sin que el torso se incline hacia atrás.',
    },
    precautions:
      'Tira siempre de la barra por delante del pecho, nunca por detrás de la nuca: esa variante antigua coloca el hombro en una posición de riesgo para una ganancia mínima.',
  },

  hamstringStretch: {
    slug: 'estiramiento-isquiotibiales',
    muscles: { primary: 'Isquiotibiales' },
    steps: [
      'Apoya un talón sobre un soporte estable (un escalón, una silla baja), pierna extendida.',
      'Mantén la otra pierna ligeramente flexionada, pie bien apoyado en el suelo.',
      'Inclina el torso hacia adelante desde las caderas, espalda plana, hasta sentir tensión en la parte posterior del muslo.',
      'Mantén la posición sin rebotes, respirando con calma.',
    ],
    mistakes: [
      'Curvar la espalda para ganar más amplitud en lugar de inclinarse desde las caderas.',
      'Rebotar en el estiramiento en lugar de mantener una posición estable.',
      'Bloquear del todo la rodilla de la pierna extendida.',
    ],
    sensation:
      'La tensión debe sentirse a lo largo de toda la parte posterior del muslo, nunca en la rodilla ni en la zona lumbar. Un dolor agudo en lugar de tensión indica detenerse y reducir la amplitud.',
    rangeOfMotion:
      'Inclínate hasta sentir una tensión clara pero tolerable, nunca dolorosa. La amplitud cómoda aumenta de forma natural de una sesión a otra.',
    tempo:
      'Sin ritmo de ejecución: la posición se mantiene inmóvil. Respira lenta y profundamente durante todo el mantenimiento.',
    anatomy:
      'Los isquiotibiales, que flexionan la rodilla y extienden la cadera, quedan bajo tensión pasiva por la flexión de cadera combinada con la extensión de rodilla. No se busca ninguna contracción muscular activa, solo una liberación progresiva bajo tensión.',
    mechanics:
      'Puesta en tensión pasiva de los isquiotibiales mediante flexión de cadera y extensión de rodilla simultáneas, en el plano sagital, sin carga ni movimiento repetido.',
    benefits: [
      'Mantiene la flexibilidad de la parte posterior del muslo, a menudo acortada por estar sentado mucho tiempo.',
      'Facilita la amplitud de los movimientos de flexión de cadera (zancadas, sentadillas profundas) realizados en otras partes de la sesión.',
      'Se practica en cualquier lugar con un simple escalón o borde como apoyo.',
    ],
    precautions:
      'Nunca fuerces más allá de una tensión tolerable, y evita este estiramiento en frío antes de un esfuerzo intenso: encaja mejor al final de la sesión o alejado del esfuerzo.',
  },

  chestDoorwayStretch: {
    slug: 'estiramiento-pecho-marco-de-puerta',
    muscles: { primary: 'Pectorales', secondary: 'Deltoides anterior' },
    steps: [
      'Colócate en el marco de una puerta, antebrazo contra el marco, codo a la altura del hombro.',
      'Pies ligeramente escalonados, uno delante del otro para mayor estabilidad.',
      'Avanza suavemente el torso a través del marco hasta sentir tensión en la parte anterior del hombro y en el pectoral.',
      'Mantén la posición sin rebotes, respirando con calma.',
    ],
    mistakes: [
      'Codo colocado demasiado alto o demasiado bajo, lo que desplaza la tensión hacia el hombro en lugar del pectoral.',
      'Avanzar demasiado bruscamente en lugar de progresar poco a poco.',
      'Arquear en exceso la zona lumbar para ganar más amplitud.',
    ],
    sensation:
      'La tensión debe sentirse en la parte anterior del hombro y en el pectoral del brazo implicado, nunca en la propia articulación. Un dolor en la parte anterior del hombro indica retroceder ligeramente.',
    rangeOfMotion:
      'Avanza hasta sentir una tensión clara pero tolerable. La altura del codo cambia la zona estirada: más abajo, el estiramiento baja hacia la parte inferior del pectoral; más arriba, sube hacia la parte superior del pectoral y el hombro.',
    tempo:
      'Sin ritmo de ejecución: la posición se mantiene inmóvil. Respira lentamente; exhalar suele ayudar a soltar un poco más la tensión.',
    anatomy:
      'El pectoral mayor, que aduce y flexiona el hombro hacia adelante, queda bajo tensión pasiva por la posición de apertura que impone el marco. El deltoides anterior, a menudo acortado por los mismos gestos repetitivos, se estira en la misma posición.',
    mechanics:
      'Puesta en tensión pasiva del pectoral mediante una extensión horizontal de hombro fijada por el punto de apoyo del marco, sin carga ni movimiento repetido.',
    benefits: [
      'Compensa el acortamiento del pectoral causado por posiciones prolongadas de cierre (pantallas, volante, empuje repetido).',
      'Facilita la amplitud de los movimientos de empuje y apertura del torso realizados en otras partes de la sesión.',
      'No requiere ningún equipo, solo el marco de una puerta.',
    ],
    precautions:
      'Nunca fuerces más allá de una tensión tolerable, sobre todo si ya existe una molestia conocida en el hombro: retrocede primero la posición del brazo antes de renunciar al estiramiento.',
  },

  squat: {
    slug: 'sentadilla',
    muscles: { primary: 'Cuádriceps, glúteos', secondary: 'Isquiotibiales, core' },
    steps: [
      'De pie, pies al ancho de las caderas, puntas ligeramente abiertas.',
      'Empuja las caderas hacia atrás y flexiona las rodillas, que siguen la línea de los pies.',
      'Baja hasta que los muslos queden cerca de la horizontal, con el peso repartido en todo el pie.',
      'Mantén el torso recto y la mirada al frente, sin curvar la zona lumbar.',
      'Sube empujando con los talones hasta la extensión completa de las caderas.',
    ],
    mistakes: [
      'Rodillas que se cierran hacia dentro al subir.',
      'Talones que se levantan: señal de poca movilidad de tobillo, no de falta de fuerza.',
      'Zona lumbar que se curva abajo, cuando la profundidad supera la movilidad de cadera.',
    ],
    sensation:
      'El trabajo se siente en la parte delantera de los muslos y los glúteos, con un apoyo firme en todo el pie. Una tensión aislada en la parte delantera de la rodilla indica que las caderas no retroceden lo suficiente y el movimiento sale solo de la rodilla.',
    rangeOfMotion:
      'Baja tanto como permita tu movilidad sin que la zona lumbar se curve: la referencia es la espalda, no un ángulo teórico. Con los muslos cerca de la horizontal ya trabajas toda la cadena.',
    tempo:
      'Dos o tres segundos para bajar, uno o dos para subir. Inhala al bajar, exhala al empujar con los talones.',
    anatomy:
      'El cuádriceps extiende la rodilla y el glúteo mayor extiende la cadera: ambos motores trabajan juntos. Isquiotibiales y aductores estabilizan, el glúteo medio evita que la rodilla se cierre, y los erectores espinales con la pared abdominal mantienen el torso firme.',
    mechanics:
      'Doble flexión y luego doble extensión de cadera y rodilla en el plano sagital, en cadena cerrada. La bajada es excéntrica y la subida concéntrica. Sin silla ni referencia externa, son la movilidad de tobillo y de cadera las que fijan la profundidad alcanzable.',
    benefits: [
      'El movimiento base de toda la cadena inferior: es la versión libre que prepara la sentadilla a la silla.',
      'No requiere material ni apoyo, así que se practica en cualquier sitio una vez dominada la profundidad.',
      'Sirve de base a todas las variantes con carga — sentadilla goblet, prensa — que cambian la carga, no el gesto.',
    ],
    progression: {
      easier: 'Vuelve a la sentadilla a la silla, que da una referencia de profundidad constante.',
      harder: 'Ralentiza la bajada a cinco segundos, haz una pausa abajo, o pasa a la sentadilla goblet con carga.',
      readyWhen: 'Cuando completes tres series de quince sin que las rodillas se cierren ni los talones se levanten, añade carga.',
    },
    precautions:
      'Si la rodilla duele, reduce la profundidad antes que el número de repeticiones: un recorrido parcial sin dolor vale más que un recorrido completo que duele.',
  },

  pushup: {
    slug: 'flexiones',
    muscles: { primary: 'Pectorales, tríceps', secondary: 'Hombros, core' },
    steps: [
      'Apóyate en las manos y las puntas de los pies, manos algo más anchas que los hombros y bajo su línea.',
      'Aprieta glúteos y abdomen para alinear el cuerpo de talones a cabeza.',
      'Baja con los codos a unos 45° del torso, hasta rozar el suelo con el pecho.',
      'Sube empujando hasta la extensión completa de los brazos, sin arquear la espalda.',
    ],
    mistakes: [
      'Cadera que se hunde: el core cede antes que los brazos y lo paga la zona lumbar.',
      'Codos abiertos a 90° hacia los lados, lo que coloca el hombro en mala posición.',
      'Recorrido corto por falta de fuerza, cuando una variante más fácil en recorrido completo progresa mejor.',
    ],
    sensation:
      'El trabajo se siente en el pecho, la parte posterior del brazo y el core, que sostiene la línea del cuerpo de principio a fin. Una tensión lumbar indica que la cadera se ha hundido.',
    rangeOfMotion:
      'Baja hasta rozar el suelo con el pecho y sube hasta estirar los brazos sin bloquear los codos de golpe. El recorrido completo es lo que distingue una flexión de un movimiento parcial.',
    tempo:
      'Dos segundos para bajar, uno para subir. Inhala al bajar, exhala al empujar.',
    anatomy:
      'El pectoral mayor y el tríceps braquial son los motores, con el deltoides anterior asistiendo. El serrato anterior mantiene la escápula pegada a la caja torácica; abdominales y glúteos impiden que la cadera se hunda, lo que hace de la flexión tanto un ejercicio de core como de empuje.',
    mechanics:
      'Flexión y extensión de codo combinadas con aducción horizontal de hombro, en cadena cerrada, con el cuerpo moviéndose alrededor de un apoyo fijo. Es el último escalón de la escalera que preparan las flexiones en pared, inclinadas y de rodillas: la palanca se alarga en cada paso, así que la carga relativa sube sin cambiar el gesto.',
    benefits: [
      'El movimiento de empuje de referencia, sin material ni apoyo: es la meta a la que llevan todas las variantes asistidas.',
      'Fortalece a la vez el empuje y el core, cosa que ninguna máquina de press hace.',
      'Se dosifica con precisión cambiando la altura del apoyo, sin añadir carga.',
    ],
    progression: {
      easier: 'Vuelve a las flexiones de rodillas o inclinadas: la línea del cuerpo no cambia, solo se acorta la palanca.',
      harder: 'Eleva los pies, ralentiza la bajada a cuatro segundos, o haz una pausa abajo.',
      readyWhen: 'Cuando completes tres series de doce con el cuerpo alineado de principio a fin, eleva los pies.',
    },
    precautions:
      'Una muñeca dolorida suele aliviarse apoyando sobre los puños cerrados o sobre agarres, lo que mantiene la muñeca alineada con el antebrazo.',
  },

  pikePushup: {
    slug: 'flexiones-en-pica',
    muscles: { primary: 'Hombros', secondary: 'Tríceps, core' },
    steps: [
      'Parte en posición de flexión y acerca los pies empujando la cadera hacia arriba, cuerpo en V invertida.',
      'Manos algo más anchas que los hombros, cabeza relajada entre los brazos.',
      'Flexiona los codos para bajar la coronilla hacia el suelo, entre las manos.',
      'Sube empujando hasta estirar los brazos, con la cadera todavía alta.',
    ],
    mistakes: [
      'Cadera que baja durante la serie: el movimiento vuelve a ser una flexión normal y deja de trabajar los hombros.',
      'Codos muy abiertos en lugar de seguir la línea del movimiento.',
      'Bajar hasta la frente en vez de hasta la coronilla, lo que acorta el recorrido.',
    ],
    sensation:
      'El trabajo se siente claramente en los hombros y la parte posterior de los brazos, no en el pecho. Si el pecho domina, la cadera no está lo bastante alta.',
    rangeOfMotion:
      'Baja hasta rozar el suelo con la coronilla. Cuanto más cerca estén los pies de las manos, más peso pasa por los hombros: ese es el ajuste de dificultad.',
    tempo:
      'Dos segundos para bajar, uno para subir. Exhala al empujar.',
    anatomy:
      'El deltoides anterior y el tríceps son los motores, mientras el trapecio superior y el serrato anterior estabilizan la escápula al pasar el brazo por encima de la cabeza. El core mantiene la posición en V, que es lo que dirige la carga al hombro en lugar del pecho.',
    mechanics:
      'Empuje vertical en cadena cerrada: el equivalente a peso corporal del press por encima de la cabeza, donde la inclinación del torso sustituye a la selección de carga. Flexión-extensión de codo combinada con flexión de hombro por encima de la cabeza.',
    benefits: [
      'El único ejercicio de hombros a peso corporal de esta biblioteca: sin él, filtrar por «peso corporal» no ofrecía ningún trabajo de hombro.',
      'Prepara el empuje por encima de la cabeza sin necesidad de mancuernas.',
      'Se ajusta con precisión acercando o alejando los pies, sin material.',
    ],
    progression: {
      easier: 'Apoya las manos en una superficie elevada: pasa menos peso por los hombros.',
      harder: 'Acerca los pies a las manos, o eleva los pies para verticalizar más el torso.',
      readyWhen: 'Cuando completes tres series de doce con la cadera alta todo el rato, eleva los pies.',
    },
    precautions:
      'Este movimiento lleva los brazos por encima de la cabeza: si el hombro duele ahí, mantén el empuje en un recorrido más corto en lugar de forzar la posición en V.',
  },

  mountainClimber: {
    slug: 'escalador',
    muscles: { primary: 'Cardio, core', secondary: 'Hombros, flexores de cadera' },
    steps: [
      'Colócate en posición de flexión con los brazos estirados, manos bajo los hombros, cuerpo alineado.',
      'Lleva una rodilla al pecho sin que la cadera suba ni se hunda.',
      'Vuelve a apoyar el pie y encadena de inmediato con la otra pierna.',
      'Mantén un ritmo constante durante toda la duración, respirando sin parar.',
    ],
    mistakes: [
      'Cadera que sube en cada cambio de pierna: el core ha cedido y el ejercicio se vuelve un rebote.',
      'Manos demasiado adelantadas respecto a los hombros, lo que carga muñeca y hombro sin motivo.',
      'Ritmo demasiado rápido a costa del recorrido de la rodilla.',
    ],
    sensation:
      'La respiración sube deprisa y el core trabaja sin descanso para impedir que la cadera se mueva. Los hombros aguantan el peso del tren superior durante toda la serie.',
    rangeOfMotion:
      'Lleva la rodilla tan lejos como la cadera pueda mantenerse quieta: es la cadera la que fija el recorrido, no las ganas de llegar más lejos.',
    tempo:
      'Un ritmo constante y sostenible durante toda la duración, mejor que una salida rápida seguida de un derrumbe. Respira sin parar: bloquear la respiración es la primera señal de que el ritmo es excesivo.',
    anatomy:
      'Los flexores de cadera acercan la rodilla al pecho, mientras los abdominales y el glúteo mayor del lado de apoyo impiden que la pelvis bascule. Hombros y tríceps trabajan en isometría para sostener la plancha alta.',
    mechanics:
      'Flexión y extensión alternas de cadera en cadena abierta, sobre una base de plancha alta, es decir con apoyo cerrado en las manos. Es un ejercicio cardiovascular cuya principal exigencia sigue siendo la estabilidad del tronco: el ritmo sube las pulsaciones, el core decide la calidad.',
    benefits: [
      'Sube las pulsaciones sin desplazarse y sin material, en muy poco espacio.',
      'Combina trabajo cardiovascular y core dinámico, cosa que ni caminar ni la plancha hacen por separado.',
      'Se regula por el ritmo y no por la carga, así que se adapta a cualquier nivel sin cambiar nada.',
    ],
    progression: {
      easier: 'Ralentiza claramente, o apoya las manos en una superficie elevada para aligerar los hombros.',
      harder: 'Sube el ritmo o alarga la duración, mientras la cadera siga quieta.',
      readyWhen: 'Cuando completes tres rondas de cuarenta segundos sin que la cadera suba, alarga la duración.',
    },
    precautions:
      'Muñecas u hombros sensibles: eleva las manos sobre un banco o un escalón, lo que reduce mucho la carga del apoyo sin cambiar el trabajo de las piernas.',
  },

  legSwing: {
    slug: 'balanceo-de-pierna',
    muscles: { primary: 'Caderas, movilidad', secondary: 'Glúteos, isquiotibiales' },
    steps: [
      'Colócate de lado respecto a una pared o al respaldo de una silla, con una mano apoyada.',
      'Pasa el peso a la pierna interior y deja la otra libre para balancear.',
      'Balancea la pierna libre adelante y atrás, sin forzar al final del recorrido.',
      'Aumenta la amplitud poco a poco a lo largo de las repeticiones, con la pelvis quieta.',
      'Cambia de lado a la mitad del tiempo previsto.',
    ],
    mistakes: [
      'Pelvis que bascula para ganar amplitud, en vez de dejar trabajar sola a la cadera.',
      'Amplitud máxima desde el primer movimiento, cuando debe abrirse progresivamente.',
      'Zona lumbar que se arquea cuando la pierna va hacia atrás.',
    ],
    sensation:
      'Una cadera que se suelta, sin esfuerzo muscular marcado. Es puesta en movimiento, no fortalecimiento: si tira fuerte, la amplitud ya es excesiva para el inicio de una sesión.',
    rangeOfMotion:
      'Llega hasta donde la pelvis pueda quedarse quieta. La amplitud del día debe aumentar durante la propia serie, igual que en el gato-vaca.',
    tempo:
      'Un balanceo regular y controlado, nunca lanzado. El movimiento sigue dirigido, no dejado a la inercia.',
    anatomy:
      'Los flexores de cadera y el glúteo mayor alternan contracción y elongación dinámicas, mientras la pierna de apoyo y el core estabilizan la pelvis. El trabajo es de movilidad articular de la cadera, no de fuerza.',
    mechanics:
      'Flexión y extensión alternas de cadera en cadena abierta, en el plano sagital y sin carga. El movimiento balístico controlado prepara la amplitud que después usarán con carga las zancadas y las sentadillas.',
    benefits: [
      'Prepara la cadera antes de cualquier trabajo de piernas, algo que ningún otro calentamiento de esta biblioteca hacía: todos eran de tren superior.',
      'Se hace en cualquier sitio con un simple apoyo, en treinta segundos por lado.',
      'Abre la amplitud de cadera que usan las zancadas, sentadillas y subidas al escalón que vienen después.',
    ],
    precautions:
      'Nada de tirones al final del recorrido: es un balanceo dirigido, no un lanzamiento. Si la cadera se engancha, reduce la amplitud en vez de insistir.',
  },

  torsoTwist: {
    slug: 'rotaciones-de-torso',
    muscles: { primary: 'Oblicuos, movilidad del tronco', secondary: 'Columna vertebral' },
    steps: [
      'De pie, pies al ancho de los hombros y bien apoyados en el suelo.',
      'Flexiona ligeramente las rodillas y deja los brazos relajados a los lados.',
      'Gira el torso hacia un lado, dejando que los brazos sigan el movimiento sin lanzarlos.',
      'Encadena hacia el otro lado a ritmo constante, con la pelvis mirando al frente.',
    ],
    mistakes: [
      'Pelvis que gira con el torso: la rotación deja de ocurrir en el tronco y pasa a las caderas.',
      'Brazos lanzados que arrastran el torso en vez de seguirlo.',
      'Ritmo demasiado rápido, que convierte una movilización en una sacudida.',
    ],
    sensation:
      'Una rotación que se libera poco a poco a lo largo del tronco, sin esfuerzo muscular marcado y sin tirones en la zona lumbar.',
    rangeOfMotion:
      'Gira hasta el límite del confort, sin forzar. Como en toda movilidad, la amplitud se abre a lo largo de las repeticiones.',
    tempo:
      'Regular y moderado, aproximadamente una rotación por segundo. Respira con libertad, sin bloquear el aire al final del giro.',
    anatomy:
      'Los oblicuos externos e internos producen la rotación del tronco, y los músculos profundos intersegmentarios movilizan cada nivel vertebral. Glúteos y piernas estabilizan la pelvis, que es justo lo que obliga a que la rotación venga del tronco.',
    mechanics:
      'Rotación alterna de la columna en el plano transversal, con carga ligera (solo el peso del torso). La pelvis fija es la referencia: es lo que distingue una verdadera rotación de tronco de un simple giro de caderas.',
    benefits: [
      'El único calentamiento de tronco de esta biblioteca, complementario del gato-vaca, que trabaja flexión y extensión pero no rotación.',
      'Prepara los ejercicios de core antirrotación como el dead bug y el perro de caza.',
      'Se hace de pie, sin material ni esterilla.',
    ],
    precautions:
      'La zona lumbar nunca debe ser el motor de la rotación: si aparece molestia ahí, reduce la amplitud y comprueba que la pelvis siga mirando al frente.',
  },

  quadStretch: {
    slug: 'estiramiento-cuadriceps-de-pie',
    muscles: { primary: 'Cuádriceps' },
    steps: [
      'De pie, apóyate con una mano en la pared para mantener el equilibrio.',
      'Agarra el tobillo del mismo lado que la pierna a estirar y lleva el talón hacia el glúteo.',
      'Mantén las dos rodillas juntas y la pelvis ligeramente retrovertida.',
      'Sostén la posición sin tirones, respirando con calma, y cambia de lado.',
    ],
    mistakes: [
      'La rodilla estirada se va hacia delante o hacia fuera, lo que desplaza la tensión fuera del cuádriceps.',
      'Arquear la zona lumbar para ganar amplitud.',
      'Tirar del tobillo a golpes en vez de mantener una posición estable.',
    ],
    sensation:
      'La tensión se siente en toda la cara anterior del muslo, nunca en la propia rodilla. Un dolor delante de la rodilla indica soltar de inmediato.',
    rangeOfMotion:
      'Lleva el talón hasta sentir una tensión clara pero tolerable. Acercar la rodilla a la otra y llevar la pelvis ligeramente adelante aumenta el estiramiento sin cargar la articulación.',
    tempo:
      'Sin ritmo: la posición se mantiene inmóvil. Respira despacio durante todo el mantenimiento.',
    anatomy:
      'El cuádriceps, que extiende la rodilla, se pone en tensión pasiva por la flexión de rodilla; el recto femoral, el único vientre que cruza también la cadera, se estira más cuando la cadera está en extensión, de ahí el interés de no dejar que la rodilla se vaya adelante.',
    mechanics:
      'Puesta en tensión pasiva mediante flexión de rodilla y extensión de cadera simultáneas, en el plano sagital, sin carga ni movimiento repetido.',
    benefits: [
      'Completa el estiramiento de isquiotibiales para cubrir las dos caras del muslo.',
      'Mantiene la amplitud de flexión de rodilla, a menudo reducida por estar sentado mucho tiempo.',
      'Solo requiere un apoyo para el equilibrio.',
    ],
    precautions:
      'Si no llegas al tobillo, pasa una cinta o una toalla alrededor del pie en lugar de inclinar el torso hacia atrás para alcanzarlo.',
  },

  gluteStretch: {
    slug: 'estiramiento-gluteo-figura-4',
    muscles: { primary: 'Glúteos', secondary: 'Rotadores de cadera' },
    steps: [
      'Túmbate boca arriba, con las rodillas dobladas y los pies en el suelo.',
      'Apoya el tobillo de un lado sobre la rodilla opuesta, formando un 4.',
      'Pasa las manos por detrás del muslo de apoyo y tira suavemente hacia ti.',
      'Mantén cabeza y hombros en el suelo, y luego cambia de lado.',
    ],
    mistakes: [
      'Cabeza y hombros despegados del suelo, lo que tensa el cuello sin añadir nada al estiramiento.',
      'Tirar a golpes en vez de instalar una tracción constante.',
      'Empujar hacia dentro la rodilla cruzada, lo que cierra la cadera en lugar de abrirla.',
    ],
    sensation:
      'La tensión se siente profunda en el glúteo del lado cruzado, a veces hacia la parte externa de la cadera. Nada debe tirar en la rodilla cruzada.',
    rangeOfMotion:
      'Tira del muslo de apoyo hasta una tensión clara pero tolerable. Cuanto más se acerca el muslo al pecho, más marcado es el estiramiento.',
    tempo:
      'Sin ritmo: la posición se mantiene inmóvil, con respiración lenta. Exhalar suele ayudar a soltar un poco más.',
    anatomy:
      'El glúteo mayor y los rotadores externos profundos de la cadera, entre ellos el piramidal, se ponen en tensión pasiva por la combinación de flexión y rotación externa de cadera que crea la posición en 4.',
    mechanics:
      'Puesta en tensión pasiva mediante flexión de cadera asociada a rotación externa, en descarga completa: la espalda permanece en el suelo, lo que evita cualquier compresión de la columna durante el estiramiento.',
    benefits: [
      'Trabaja una zona que los estiramientos de muslo no alcanzan y que se agarrota con la posición sentada prolongada.',
      'Se practica en el suelo, sin equilibrio que mantener, así que es accesible incluso con la cadera rígida.',
      'Completa el trabajo de glúteos (puente, abducción) con la movilidad correspondiente.',
    ],
    precautions:
      'Si la cadera cruzada se engancha o pellizca, reduce la tracción: una posición menos profunda y sin dolor vale más que una forzada.',
  },

  calfStretch: {
    slug: 'estiramiento-gemelos-en-pared',
    muscles: { primary: 'Gemelos' },
    steps: [
      'Coloca las manos planas en la pared, a la altura del pecho.',
      'Lleva una pierna atrás, estirada, con el talón en el suelo y el pie recto.',
      'Flexiona la pierna delantera y adelanta la cadera hasta notar el estiramiento en el gemelo trasero.',
      'Mantén la posición sin tirones y cambia de pierna.',
    ],
    mistakes: [
      'El talón trasero se levanta: el estiramiento desaparece al instante.',
      'Pie trasero girado hacia fuera, lo que traslada la tensión al tobillo.',
      'Cadera que retrocede en lugar de avanzar, lo que anula la puesta en tensión.',
    ],
    sensation:
      'La tensión se siente en la parte posterior de la pierna trasera, desde detrás de la rodilla hasta el talón. Flexionar ligeramente la rodilla trasera desplaza la tensión hacia la parte baja del gemelo.',
    rangeOfMotion:
      'Adelanta la cadera hasta una tensión clara pero tolerable, con el talón siempre en el suelo: es el talón el que fija el límite, no la distancia entre los pies.',
    tempo:
      'Sin ritmo: posición inmóvil y respiración lenta y regular.',
    anatomy:
      'El tríceps sural — gemelos y sóleo — se pone en tensión por la flexión dorsal de tobillo. Con la rodilla trasera estirada la tensión recae sobre todo en los gemelos, que cruzan también la rodilla; con la rodilla algo flexionada se desplaza al sóleo.',
    mechanics:
      'Puesta en tensión pasiva mediante flexión dorsal de tobillo contra un apoyo fijo, sin carga ni movimiento repetido.',
    benefits: [
      'Mantiene la flexión dorsal de tobillo, cuya falta es la primera causa de que los talones se levanten en la sentadilla.',
      'Saca a los gemelos de su aislamiento: era el único grupo con un solo ejercicio en la biblioteca.',
      'No requiere más que una pared.',
    ],
    precautions:
      'Una tensión viva y localizada en el tendón de Aquiles no es el estiramiento buscado: retrasa la cadera y reduce la amplitud.',
  },

  childPose: {
    slug: 'postura-del-nino',
    muscles: { primary: 'Espalda, movilidad', secondary: 'Caderas, hombros' },
    steps: [
      'Ponte a cuatro patas, con las rodillas al ancho de las caderas.',
      'Siéntate progresivamente sobre los talones dejando las manos donde están.',
      'Estira los brazos lejos hacia delante y deja bajar la frente hacia el suelo.',
      'Respira despacio dejando que la espalda se redondee un poco más en cada exhalación.',
    ],
    mistakes: [
      'Hombros encogidos hacia las orejas en lugar de dejar que el torso se relaje.',
      'Forzar las caderas hacia los talones cuando la movilidad de tobillo o rodilla no lo permite.',
      'Respiración bloqueada, cuando es ella la que va abriendo la posición.',
    ],
    sensation:
      'Un estiramiento difuso a lo largo de la espalda y en la parte posterior de los hombros, con sensación de soltar más que de tirar. Nada debe tirar en las rodillas.',
    rangeOfMotion:
      'Baja hasta donde permita la comodidad; la separación de las rodillas regula el espacio que queda para el torso. La posición se abre sola a lo largo de las respiraciones.',
    tempo:
      'Sin ritmo de ejecución: la posición se mantiene. Son las exhalaciones las que ganan amplitud, no la fuerza.',
    anatomy:
      'No es un fortalecimiento: los erectores espinales y el dorsal ancho se alargan de forma pasiva mientras las caderas van a flexión completa. Es la contraparte estática del gato-vaca, que moviliza la misma zona en dinámico.',
    mechanics:
      'Flexión global de columna y caderas en descarga, con el peso del cuerpo apoyado en los muslos y los brazos en lugar de en la columna.',
    benefits: [
      'El único estiramiento de espalda de esta biblioteca, complemento estático del gato-vaca.',
      'Sirve de transición al final de la sesión, o de recuperación entre dos series exigentes para la espalda.',
      'No requiere material, solo un suelo cómodo.',
    ],
    precautions:
      'Una rodilla dolorida en esta posición se alivia deslizando un cojín entre las caderas y los talones, en lugar de renunciar a la postura.',
  },

  tricepsStretch: {
    slug: 'estiramiento-triceps',
    muscles: { primary: 'Tríceps', secondary: 'Hombros' },
    steps: [
      'De pie o sentado, levanta un brazo y dobla el codo para colocar la mano entre las escápulas.',
      'El codo apunta al techo, lo más cerca posible de la cabeza.',
      'Agarra ese codo con la otra mano y empújalo suavemente hacia atrás.',
      'Mantén sin tirones y cambia de brazo.',
    ],
    mistakes: [
      'Arquear la zona lumbar para dar la ilusión de un codo más atrasado.',
      'Empujar el codo a golpes en lugar de aplicar una presión constante.',
      'Dejar que el brazo empuje la cabeza hacia delante, lo que tensa el cuello.',
    ],
    sensation:
      'La tensión se siente en la parte posterior del brazo, del codo hacia el hombro. Una molestia en la propia articulación del hombro indica reducir el empuje.',
    rangeOfMotion:
      'Empuja el codo hasta una tensión clara pero tolerable. Lo que limita es la amplitud del hombro por encima de la cabeza, no la fuerza de la mano que empuja.',
    tempo:
      'Sin ritmo: posición inmóvil y respiración lenta.',
    anatomy:
      'El tríceps braquial, único extensor del codo, se tensa con la flexión completa del codo; su porción larga, que cruza también el hombro, se estira más con el brazo levantado por encima de la cabeza, de ahí la posición del codo hacia el techo.',
    mechanics:
      'Puesta en tensión pasiva mediante flexión de codo y flexión de hombro por encima de la cabeza, sin carga ni movimiento repetido.',
    benefits: [
      'Completa el trabajo de empuje (flexiones, fondos, press) estirando el músculo que más trabaja en él.',
      'Se practica de pie o sentado, sin material y sin espacio.',
      'Mantiene la amplitud del hombro por encima de la cabeza, útil para las flexiones en pica y los press.',
    ],
    precautions:
      'Si levantar el brazo por encima de la cabeza duele, mantén el codo más bajo y empuja menos: esta posición no merece forzarse.',
  },

  bandChestPress: {
    slug: 'press-de-pecho-con-banda',
    muscles: { primary: 'Pectorales, tríceps', secondary: 'Hombros' },
    steps: [
      'Pasa la banda por la espalda, a la altura de las escápulas, y sujeta un extremo en cada mano.',
      'Manos a la altura del pecho, codos flexionados y cerca del torso, un pie algo adelantado para estabilizar.',
      'Empuja las manos hacia delante hasta la extensión completa de los brazos.',
      'Vuelve despacio controlando la tensión hasta que las manos regresen al pecho.',
    ],
    mistakes: [
      'Torso que se va hacia delante para ayudar al empuje: se mueve el cuerpo en vez de los brazos.',
      'Codos que suben a la altura de los hombros, lo que coloca el hombro en mala posición.',
      'Retorno soltado de golpe en lugar de frenado.',
    ],
    sensation:
      'El trabajo se siente en el pecho y la parte posterior de los brazos, con una resistencia que aumenta a medida que los brazos se extienden. Una tensión lumbar indica que el torso está compensando.',
    rangeOfMotion:
      'Empuja hasta estirar los brazos sin bloquear los codos, y deja que las manos vuelvan al pecho. El recorrido es el de cualquier press; solo cambia el perfil de resistencia.',
    tempo:
      'Uno o dos segundos para empujar, dos o tres para volver frenando. Exhala al empujar.',
    anatomy:
      'El pectoral mayor y el tríceps son los motores, el deltoides anterior asiste y el serrato anterior mantiene la escápula pegada. El core y la pierna adelantada resisten el tirón de la banda, que lleva el torso hacia atrás.',
    mechanics:
      'Aducción horizontal de hombro con extensión de codo contra una resistencia creciente: la banda está más tensa con los brazos extendidos, justo donde el peso corporal o una mancuerna serían más fáciles. Es exactamente el perfil inverso al de una flexión.',
    benefits: [
      'Aporta empuje horizontal sin suelo ni material pesado, útil cuando las flexiones no son practicables.',
      'La resistencia creciente carga el final del movimiento, donde una flexión se vuelve fácil.',
      'Una banda se transporta a cualquier parte, a diferencia de un par de mancuernas.',
    ],
    progression: {
      easier: 'Usa una banda menos tensa, o separa más las manos sobre ella.',
      harder: 'Usa una banda más tensa, adelanta más el pie de apoyo, o ralentiza el retorno a cuatro segundos.',
      readyWhen: 'Cuando completes tres series de quince sin que el torso avance, sube la resistencia.',
    },
    precautions:
      'Revisa el estado de la banda antes de cada serie: una banda gastada puede romperse de golpe, y está tensa a la altura de la cara.',
  },

  bandLateralRaise: {
    slug: 'elevaciones-laterales-con-banda',
    muscles: { primary: 'Hombros' },
    steps: [
      'De pie sobre el centro de la banda, con uno o los dos pies, un extremo en cada mano.',
      'Brazos a los lados, codos apenas flexionados, palmas hacia dentro.',
      'Sube los brazos por los lados hasta la altura del hombro, no más.',
      'Baja despacio controlando el retroceso de la banda.',
    ],
    mistakes: [
      'Subir por encima del hombro, lo que pasa el relevo al trapecio superior.',
      'Impulso del torso para lanzar los brazos.',
      'Hombros que suben hacia las orejas durante la subida.',
    ],
    sensation:
      'El trabajo se siente en el lateral del hombro. Una tensión en el trapecio superior o el cuello indica que los hombros suben en vez de mantenerse bajos.',
    rangeOfMotion:
      'Sube hasta que los brazos queden horizontales, no más allá: ahí termina el trabajo del deltoides medio y otros músculos tomarían el relevo.',
    tempo:
      'Uno o dos segundos para subir, dos o tres para bajar. Exhala al subir.',
    anatomy:
      'El deltoides medio es el motor principal de la abducción del brazo; el supraespinoso inicia los primeros grados. El trapecio inferior y medio deben mantener la escápula baja, y por eso dejar subir los hombros desplaza el trabajo.',
    mechanics:
      'Abducción de hombro en el plano frontal contra una resistencia que crece con la elevación: la banda se tensa justo cuando el brazo de palanca es más largo, lo que hace el final del movimiento bastante más duro que con una mancuerna.',
    benefits: [
      'El único trabajo de aislamiento de hombro accesible sin mancuernas de la biblioteca.',
      'Complementa los movimientos de empuje, que cargan sobre todo la parte anterior del hombro.',
      'Se dosifica con precisión cambiando la longitud de banda sujeta, sin cambiar de material.',
    ],
    progression: {
      easier: 'Sujeta la banda más arriba en su longitud, o pisa con un solo pie.',
      harder: 'Acorta la longitud sujeta, pisa con los dos pies, o mantén una pausa de un segundo arriba.',
      readyWhen: 'Cuando completes tres series de quince sin que los hombros suban, acorta la banda.',
    },
    precautions:
      'Este movimiento va sin carga pesada por definición: si el hombro pellizca arriba, reduce el recorrido en vez de insistir; un pinzamiento no se entrena.',
  },

  bandLateralWalk: {
    slug: 'marcha-lateral-con-banda',
    muscles: { primary: 'Glúteo medio', secondary: 'Cuádriceps, glúteo mayor' },
    steps: [
      'Coloca la banda justo por encima de las rodillas, pies al ancho de las caderas.',
      'Flexiona ligeramente rodillas y caderas en media sentadilla, torso recto.',
      'Da un paso lateral empujando activamente la rodilla hacia fuera contra la banda.',
      'Acerca el otro pie sin dejar que la banda se afloje, y sigue en la misma dirección antes de volver.',
    ],
    mistakes: [
      'Rodillas que se cierran al apoyar el pie: la banda gana y el glúteo medio deja de trabajar.',
      'Torso que se endereza del todo, lo que aligera el trabajo de los glúteos.',
      'Pasos demasiado largos, que hacen perder el control de la alineación.',
    ],
    sensation:
      'El trabajo se siente en el lateral de la cadera y del glúteo, con un ardor que sube poco a poco. Nada debe tirar en la rodilla.',
    rangeOfMotion:
      'Da pasos de aproximadamente el ancho de los hombros, manteniendo constante la tensión de la banda durante toda la serie: es la tensión continua la que trabaja, no la longitud del paso.',
    tempo:
      'Regular y controlado, cada paso apoyado sin rebote. Respira con normalidad: es un ejercicio de tensión continua, no un sprint.',
    anatomy:
      'El glúteo medio y el menor abducen la cadera y estabilizan la pelvis en cada apoyo; el tensor de la fascia lata asiste. La media sentadilla mantiene cuádriceps y glúteo mayor en isometría durante toda la marcha.',
    mechanics:
      'Abducción de cadera en el plano frontal contra resistencia elástica, con apoyo alterno. Es uno de los pocos ejercicios de la biblioteca que trabaja ese plano, mientras sentadillas y zancadas trabajan casi todo en el plano sagital.',
    benefits: [
      'Fortalece el estabilizador lateral de la cadera, directamente implicado en la alineación de la rodilla al caminar y correr.',
      'Da una señal táctil inmediata: si la banda se afloja, la rodilla se ha cerrado.',
      'Completa la sentadilla con banda aislando el componente lateral que aquella solo resiste.',
    ],
    progression: {
      easier: 'Baja la banda por encima de los tobillos en lugar de las rodillas, o usa una banda más suave.',
      harder: 'Sube la banda por encima de las rodillas, baja más en la media sentadilla, o alarga la serie.',
      readyWhen: 'Cuando completes tres series de quince pasos por lado sin que la banda se afloje, sube la resistencia.',
    },
    precautions:
      'Si la parte externa de la rodilla arde más que la cadera, el movimiento sale de la rodilla: baja la banda y retoma con pasos más cortos.',
  },

  bandCurl: {
    slug: 'curl-de-biceps-con-banda',
    muscles: { primary: 'Bíceps', secondary: 'Antebrazos' },
    steps: [
      'De pie sobre el centro de la banda, con uno o los dos pies, un extremo en cada mano.',
      'Brazos a los lados, codos pegados a las costillas, palmas hacia delante.',
      'Sube las manos hacia los hombros manteniendo los codos quietos.',
      'Baja despacio hasta la extensión completa de los brazos.',
    ],
    mistakes: [
      'Codos que se adelantan al subir: el movimiento deja el bíceps y pasa al hombro.',
      'Torso que se balancea para lanzar la carga.',
      'Bajada soltada, cuando la parte frenada es la que más trabajo produce.',
    ],
    sensation:
      'El trabajo se siente en la parte anterior del brazo, del codo al hombro. Los antebrazos también arden, y es normal: son los que sujetan la banda.',
    rangeOfMotion:
      'Sube hasta que las manos se acerquen a los hombros y baja hasta los brazos completamente estirados. Acortar la bajada es la forma más común de reducir el trabajo sin darse cuenta.',
    tempo:
      'Un segundo para subir, dos o tres para bajar frenando. Exhala al subir.',
    anatomy:
      'El bíceps braquial flexiona el codo y participa en la supinación del antebrazo; el braquial, situado debajo, es el flexor más constante sea cual sea la posición de la mano. El braquiorradial del antebrazo asiste.',
    mechanics:
      'Flexión de codo en cadena abierta contra una resistencia creciente: la banda está más tensa arriba, donde el brazo de palanca es corto, lo que da un perfil de carga casi inverso al de una mancuerna.',
    benefits: [
      'El primer ejercicio de bíceps de la biblioteca, en un grupo «Brazos» que no existía antes de este lote.',
      'Complementa los movimientos de tracción (remo, jalón), donde el bíceps solo asiste.',
      'No requiere más que una banda y cabe en una bolsa.',
    ],
    progression: {
      easier: 'Sujeta la banda más arriba en su longitud, o pisa con un solo pie.',
      harder: 'Acorta la longitud sujeta, o mantén una pausa de un segundo arriba en cada repetición.',
      readyWhen: 'Cuando completes tres series de quince sin que los codos se adelanten, acorta la banda.',
    },
    precautions:
      'Un dolor en el pliegue del codo no es el ardor buscado: reduce la resistencia y comprueba que la bajada se frena en lugar de soltarse.',
  },

  dumbbellShoulderPress: {
    slug: 'press-militar-con-mancuernas',
    muscles: { primary: 'Hombros', secondary: 'Tríceps, core' },
    steps: [
      'De pie o sentado, una mancuerna en cada mano a la altura de los hombros, palmas al frente.',
      'Aprieta glúteos y abdomen para bloquear la pelvis.',
      'Empuja las mancuernas por encima de la cabeza hasta extender los brazos, sin arquear.',
      'Baja con control hasta que los codos pasen por debajo de la altura de los hombros.',
    ],
    mistakes: [
      'Zona lumbar arqueada para compensar la falta de amplitud de hombro.',
      'Codos muy abiertos hacia los lados en vez de quedar algo por delante del torso.',
      'Bajada acortada, que elimina la parte más útil del movimiento.',
    ],
    sensation:
      'El trabajo se siente en los hombros y la parte posterior de los brazos, con el core activo de principio a fin. Una tensión lumbar indica que la pelvis ya no está bloqueada.',
    rangeOfMotion:
      'Baja hasta que los codos pasen por debajo de la altura de los hombros y sube hasta estirar los brazos sin bloquearlos de golpe. Sentado con respaldo alto, la zona lumbar queda protegida mecánicamente.',
    tempo:
      'Uno o dos segundos para empujar, dos o tres para bajar controlando. Exhala al empujar.',
    anatomy:
      'El deltoides anterior y el tríceps son los motores, con el deltoides medio asistiendo. El trapecio y el serrato anterior rotan la escápula hacia arriba, condición para que el brazo suba libremente; los abdominales impiden el arqueo compensatorio.',
    mechanics:
      'Flexión de hombro por encima de la cabeza combinada con extensión de codo, en cadena abierta y con carga constante en todo el recorrido, a diferencia de la banda, cuya resistencia crece al final.',
    benefits: [
      'El movimiento de empuje vertical de referencia en cuanto hay un par de mancuernas.',
      'Carga los hombros de forma progresiva, algo que las flexiones en pica solo logran cambiando la posición del cuerpo.',
      'Trabaja cada brazo por separado, así que el lado fuerte no compensa al débil.',
    ],
    progression: {
      easier: 'Reduce la carga, o siéntate con respaldo para eliminar el trabajo de core.',
      harder: 'Aumenta la carga, o mantén una pausa de un segundo arriba en cada repetición.',
      readyWhen: 'Cuando completes tres series de doce sin arquear, aumenta la carga.',
    },
    precautions:
      'Si levantar los brazos por encima de la cabeza duele, reduce el recorrido o gira las palmas hacia dentro: esta posición no se fuerza.',
  },

  dumbbellFloorPress: {
    slug: 'press-con-mancuernas-en-el-suelo',
    muscles: { primary: 'Pectorales, tríceps', secondary: 'Hombros' },
    steps: [
      'Túmbate boca arriba, rodillas dobladas, pies apoyados, una mancuerna en cada mano.',
      'Codos en el suelo a unos 45° del torso, mancuernas a la altura del pecho.',
      'Empuja las mancuernas hacia el techo hasta extender los brazos.',
      'Baja con control hasta que los codos toquen el suelo, haz una pausa y vuelve a empujar.',
    ],
    mistakes: [
      'Dejar que los codos reboten en el suelo en lugar de hacer una pausa.',
      'Codos abiertos a 90°, que colocan el hombro en mala posición.',
      'Zona lumbar despegada del suelo en vez de mantener el contacto.',
    ],
    sensation:
      'El trabajo se siente en el pecho y la parte posterior de los brazos. El suelo da una referencia de profundidad constante que un press en banco no tiene.',
    rangeOfMotion:
      'El suelo limita la bajada: eso es justamente lo interesante, fija la misma profundidad en cada repetición e impide que el hombro vaya demasiado lejos en extensión.',
    tempo:
      'Uno o dos segundos para empujar, dos o tres para bajar. Una pausa de un segundo al tocar el suelo elimina cualquier rebote.',
    anatomy:
      'El pectoral mayor y el tríceps son los motores, con el deltoides anterior asistiendo. Al estar el recorrido limitado por el suelo, el hombro nunca entra en extensión excesiva, y eso hace esta variante más tolerante que el press en banco.',
    mechanics:
      'Aducción horizontal de hombro con extensión de codo, en cadena abierta y carga constante. El suelo trunca la parte baja del movimiento, convirtiendo un recorrido libre en uno acotado y reproducible de una sesión a otra.',
    benefits: [
      'Aporta el press horizontal con carga sin banco, con un simple par de mancuernas y una esterilla.',
      'La referencia del suelo hace que la profundidad sea idéntica en cada serie, así que el progreso es medible.',
      'Cada brazo trabaja por separado, a diferencia de una barra.',
    ],
    progression: {
      easier: 'Reduce la carga, o empuja un brazo cada vez para centrarte en la trayectoria.',
      harder: 'Aumenta la carga, alarga la pausa en el suelo, o ralentiza la bajada a cuatro segundos.',
      readyWhen: 'Cuando completes tres series de doce con una pausa limpia en el suelo en cada repetición, aumenta la carga.',
    },
    precautions:
      'No dejes nunca que los codos caigan en caída libre: el contacto con el suelo debe apoyarse, no encajarse.',
  },

  dumbbellRomanianDeadlift: {
    slug: 'peso-muerto-rumano',
    muscles: { primary: 'Glúteos, isquiotibiales', secondary: 'Zona lumbar, core' },
    steps: [
      'De pie, una mancuerna en cada mano delante de los muslos, pies al ancho de las caderas.',
      'Flexiona apenas las rodillas y mantén ese ángulo constante durante todo el movimiento.',
      'Empuja las caderas hacia atrás y baja las mancuernas por las piernas, con la espalda plana.',
      'Baja hasta notar la tensión en la parte posterior de los muslos y vuelve empujando las caderas hacia delante.',
    ],
    mistakes: [
      'Flexionar las rodillas poco a poco durante la bajada: el movimiento se convierte en sentadilla y deja los isquiotibiales.',
      'Espalda que se curva en cuanto se agota la movilidad de cadera.',
      'Mancuernas que se alejan de las piernas, lo que aumenta la carga sobre la zona lumbar.',
    ],
    sensation:
      'Una tensión clara en la parte posterior de los muslos al bajar, y luego los glúteos tomando el relevo al subir. La zona lumbar trabaja en isometría, nunca como motor.',
    rangeOfMotion:
      'Baja hasta el final del estiramiento de los isquiotibiales, no más: la flexibilidad posterior fija el recorrido, no la altura de las mancuernas. El día que la espalda se curva, se ha pasado el límite.',
    tempo:
      'Tres segundos para bajar, uno o dos para subir. Inhala al bajar, exhala al empujar las caderas hacia delante.',
    anatomy:
      'Los isquiotibiales y el glúteo mayor extienden la cadera: son los motores. Los erectores espinales trabajan en isometría para mantener la espalda plana; nunca deben producir el movimiento, solo impedirlo. Es el único ejercicio de la biblioteca que entrena la bisagra de cadera con carga.',
    mechanics:
      'Bisagra de cadera pura: flexión y luego extensión de cadera con la rodilla casi fija, en el plano sagital. Ahí está la diferencia con la sentadilla: la sentadilla dobla cadera Y rodilla, la bisagra solo la cadera.',
    benefits: [
      'Enseña la bisagra de cadera, el patrón que protege la espalda cada vez que se recoge algo del suelo.',
      'Carga los isquiotibiales en extensión de cadera, complemento directo del curl femoral que los trabaja en flexión de rodilla.',
      'Fortalece toda la cadena posterior con un solo movimiento.',
    ],
    progression: {
      easier: 'Reduce la carga, o baja menos para quedarte en el recorrido donde la espalda sigue plana.',
      harder: 'Aumenta la carga, o ralentiza la bajada a cinco segundos.',
      readyWhen: 'Cuando completes tres series de doce con la espalda plana en todo el recorrido, aumenta la carga.',
    },
    precautions:
      'La espalda plana no es negociable: si mantener la posición obliga a curvarla, la carga es excesiva o el recorrido demasiado amplio.',
  },

  dumbbellCalfRaise: {
    slug: 'elevacion-de-gemelos-con-mancuernas',
    muscles: { primary: 'Gemelos' },
    steps: [
      'De pie, una mancuerna en cada mano a los lados, pies al ancho de las caderas.',
      'Sube despacio de puntillas, lo más alto posible.',
      'Haz una pausa arriba, con los gemelos contraídos.',
      'Baja despacio hasta que los talones toquen el suelo.',
    ],
    mistakes: [
      'Rebotar abajo en lugar de controlar la bajada.',
      'Tobillos que se van hacia fuera: el peso debe quedarse sobre el dedo gordo.',
      'Recorrido acortado arriba, que es justo donde el gemelo más se contrae.',
    ],
    sensation:
      'Un ardor claro en el gemelo, que sube rápido. La carga también se siente en los antebrazos, que sujetan las mancuernas durante toda la serie.',
    rangeOfMotion:
      'Sube tan alto como permita el tobillo y baja hasta tocar el suelo. De pie en un escalón, con los talones al aire, el recorrido se alarga aún más hacia abajo.',
    tempo:
      'Uno o dos segundos para subir, una pausa arriba, dos o tres para bajar. Es la lentitud la que hace el trabajo, no la carga.',
    anatomy:
      'El tríceps sural — gemelos y sóleo — produce la flexión plantar. Con la rodilla estirada dominan los gemelos, y por eso la versión de pie complementa bien cualquier trabajo sentado, donde toma el relevo el sóleo.',
    mechanics:
      'Flexión plantar del tobillo en cadena cerrada, con una carga externa que se suma al peso corporal. El recorrido es corto por naturaleza, lo que hace el tiempo bajo tensión más determinante que el número de repeticiones.',
    benefits: [
      'Carga los gemelos más allá del peso corporal, algo que la versión sin mancuernas ya no permite cuando quince repeticiones resultan fáciles.',
      'Saca a los gemelos de su aislamiento en la biblioteca, junto al estiramiento correspondiente.',
      'Fortalece el empuje final de la marcha y la carrera.',
    ],
    progression: {
      easier: 'Hazlo sin mancuernas, o sujétate con una mano para manejar un solo peso.',
      harder: 'Aumenta la carga, súbete a un escalón para alargar el recorrido, o pasa a una sola pierna.',
      readyWhen: 'Cuando completes tres series de veinte con pausa arriba, aumenta la carga o pasa a una pierna.',
    },
    precautions:
      'Un calambre al final de la serie es frecuente en este músculo: reduce el recorrido y alarga el descanso en vez de forzar la repetición siguiente.',
  },

  dumbbellCurl: {
    slug: 'curl-de-biceps-con-mancuernas',
    muscles: { primary: 'Bíceps', secondary: 'Antebrazos' },
    steps: [
      'De pie, una mancuerna en cada mano, brazos a los lados, palmas al frente.',
      'Codos pegados a las costillas, hombros bajos y torso quieto.',
      'Sube la mancuerna hacia el hombro sin que el codo se adelante.',
      'Baja despacio hasta la extensión completa del brazo.',
    ],
    mistakes: [
      'Balanceo del torso para lanzar la carga: trabaja la espalda, no el bíceps.',
      'Codos que se adelantan al final de la subida, lo que mete al hombro.',
      'Bajada soltada, cuando la fase frenada es la más productiva.',
    ],
    sensation:
      'El trabajo se siente en la parte anterior del brazo, del pliegue del codo al hombro. El torso debe quedarse totalmente quieto: es el mejor indicador de una carga adecuada.',
    rangeOfMotion:
      'Sube hasta que la mancuerna se acerque al hombro y baja hasta el brazo completamente estirado. Acortar abajo es la forma más común de hacer trampa sin darse cuenta.',
    tempo:
      'Un segundo para subir, dos o tres para bajar. Exhala al subir.',
    anatomy:
      'El bíceps braquial flexiona el codo y supina el antebrazo, de ahí la palma al frente, que lo coloca en posición favorable. El braquial, bajo el bíceps, flexiona el codo sea cual sea la posición de la mano; el braquiorradial asiste.',
    mechanics:
      'Flexión de codo en cadena abierta con carga constante: a diferencia de la banda, la resistencia no varía, pero el brazo de palanca es máximo con el antebrazo horizontal, que es donde el movimiento resulta más duro.',
    benefits: [
      'El movimiento de bíceps más directo, con una carga ajustable con precisión.',
      'Completa los tirones (remo, jalón), donde el bíceps es solo secundario.',
      'Cada brazo trabaja por separado, lo que revela y corrige un desequilibrio.',
    ],
    progression: {
      easier: 'Reduce la carga, o apoya la espalda en una pared para eliminar cualquier balanceo.',
      harder: 'Aumenta la carga, ralentiza la bajada a cuatro segundos, o haz una pausa a media altura.',
      readyWhen: 'Cuando completes tres series de doce sin que el torso se mueva, aumenta la carga.',
    },
    precautions:
      'Un dolor en el pliegue del codo, distinto del ardor muscular, obliga a reducir la carga: los tendones del codo toleran mal la sobrecarga brusca en este movimiento.',
  },

  dumbbellTricepsExtension: {
    slug: 'extension-de-triceps',
    muscles: { primary: 'Tríceps' },
    steps: [
      'De pie o sentado, sujeta una mancuerna con ambas manos, brazos estirados sobre la cabeza.',
      'Codos cerrados hacia delante, lo más cerca posible de las orejas.',
      'Flexiona los codos para bajar la mancuerna tras la nuca, sin abrirlos.',
      'Sube hasta la extensión completa de los brazos, con los codos aún cerrados.',
    ],
    mistakes: [
      'Codos que se abren hacia fuera, lo que traslada la carga del tríceps al hombro.',
      'Zona lumbar arqueada para compensar la falta de amplitud de hombro.',
      'Bajada demasiado rápida, con la carga detrás de la cabeza.',
    ],
    sensation:
      'El trabajo se siente en la parte posterior del brazo, del codo al hombro. Una molestia en la articulación del hombro indica que los codos se han abierto o que la carga es excesiva.',
    rangeOfMotion:
      'Baja hasta notar el estiramiento en la parte posterior del brazo, sin forzar, y sube hasta estirar los brazos. Con los brazos sobre la cabeza, la porción larga del tríceps ya está preestirada, así que el recorrido útil es más corto de lo que parece.',
    tempo:
      'Uno o dos segundos para subir, dos o tres para bajar controlando. Exhala al empujar.',
    anatomy:
      'El tríceps braquial es el único extensor del codo. Su porción larga cruza también el hombro: la posición con los brazos sobre la cabeza la pone en tensión antes incluso de empezar el movimiento, y por eso esta variante la solicita más que una extensión con el brazo al costado.',
    mechanics:
      'Extensión de codo en cadena abierta, con el hombro flexionado sobre la cabeza y mantenido fijo. Ese es el papel del core y de los codos cerrados: impedir que el hombro participe, para que solo se mueva el codo.',
    benefits: [
      'Trabaja el tríceps en una posición que los fondos y las flexiones no reproducen.',
      'Se hace con una sola mancuerna, de pie o sentado, sin banco.',
      'Completa el curl para cubrir las dos caras del brazo en el grupo «Brazos».',
    ],
    progression: {
      easier: 'Reduce la carga, o haz el movimiento con un brazo cada vez para controlar mejor la trayectoria.',
      harder: 'Aumenta la carga, o mantén una pausa de un segundo en la posición baja.',
      readyWhen: 'Cuando completes tres series de doce sin que los codos se abran, aumenta la carga.',
    },
    precautions:
      'Empieza ligero: la carga queda detrás de la cabeza, y perder el control ahí es más delicado que en un movimiento por delante del cuerpo. Sentado con respaldo, la zona lumbar queda mejor protegida.',
  },

  chestPressMachine: {
    slug: 'press-de-pecho-en-maquina',
    muscles: { primary: 'Pectorales, tríceps', secondary: 'Hombros' },
    steps: [
      'Ajusta la altura del asiento para que los agarres queden a la altura del pecho.',
      'Siéntate con espalda y hombros bien apoyados en el respaldo, pies planos en el suelo.',
      'Empuja los agarres hacia delante hasta extender los brazos, sin bloquear los codos.',
      'Vuelve con control hasta que las manos queden de nuevo a la altura del pecho.',
    ],
    mistakes: [
      'Hombros que se despegan del respaldo para ganar unos centímetros de empuje.',
      'Bloquear los codos al final del empuje, lo que traslada la carga a la articulación.',
      'Retorno demasiado rápido, cuando la fase frenada es la más productiva.',
    ],
    sensation:
      'El trabajo se siente en el pecho y la parte posterior de los brazos, sin esfuerzo de estabilización: de eso se ocupa el respaldo. Es lo que distingue esta máquina de una flexión.',
    rangeOfMotion:
      'Vuelve hasta que las manos queden a la altura del pecho, no más allá: pasado ese punto el hombro entra en extensión excesiva contra una carga guiada, y eso no aporta nada.',
    tempo:
      'Uno o dos segundos para empujar, dos o tres para volver. Exhala al empujar.',
    anatomy:
      'El pectoral mayor y el tríceps son los motores, con el deltoides anterior asistiendo. El respaldo sustituye todo el trabajo de core que exige una flexión, lo que concentra el esfuerzo en los músculos del empuje y en nada más.',
    mechanics:
      'Aducción horizontal de hombro con extensión de codo, sobre una trayectoria impuesta por la máquina. Con el torso fijo, la variable es la carga y no la estabilidad: exactamente lo contrario de una flexión.',
    benefits: [
      'Permite cargar mucho el empuje horizontal sin compañero ni banco, con un ajuste fino de la carga.',
      'La trayectoria guiada reduce el riesgo de error técnico frente a un movimiento libre cargado.',
      'Útil como complemento de las flexiones, o como sustituto cuando la muñeca o el core son el límite.',
    ],
    progression: {
      easier: 'Reduce la carga, o acorta el recorrido volviendo algo menos atrás.',
      harder: 'Aumenta la carga, ralentiza el retorno a cuatro segundos, o haz una pausa en la posición baja.',
      readyWhen: 'Cuando completes tres series de doce sin que los hombros se despeguen del respaldo, aumenta la carga.',
    },
    precautions:
      'Mantén los hombros en contacto con el respaldo de principio a fin: ese contacto es lo que protege la articulación en una trayectoria impuesta.',
  },

  legCurlMachine: {
    slug: 'curl-femoral',
    muscles: { primary: 'Isquiotibiales', secondary: 'Gemelos' },
    steps: [
      'Ajusta la máquina para que el rodillo apoye en la parte baja de los gemelos, justo por encima de los talones.',
      'Colócate con la cadera bien pegada al apoyo, piernas estiradas sin bloquear las rodillas.',
      'Flexiona las rodillas para llevar los talones hacia los glúteos, con control.',
      'Baja despacio hasta la extensión, sin dejar caer la carga.',
    ],
    mistakes: [
      'Cadera que se despega para ayudar a la flexión: el movimiento deja los isquiotibiales.',
      'Bajada sin frenar, con la carga cayendo sola.',
      'Rodillo mal colocado, demasiado alto en el gemelo, que estorba en vez de cargar.',
    ],
    sensation:
      'Una contracción clara en la parte posterior del muslo, de la rodilla hacia el glúteo. La zona lumbar no debe notar nada: si lo hace, la cadera se ha despegado.',
    rangeOfMotion:
      'Flexiona todo lo que permita la máquina sin que la cadera se mueva, y baja hasta la extensión completa pero sin bloquear. En este movimiento el recorrido completo importa más que la carga.',
    tempo:
      'Uno o dos segundos para flexionar, dos o tres para bajar frenando. Exhala al flexionar.',
    anatomy:
      'Los isquiotibiales flexionan la rodilla: es su acción principal, y precisamente la que ningún ejercicio a peso corporal de la biblioteca carga directamente. Los gemelos, que cruzan también la rodilla, asisten.',
    mechanics:
      'Flexión de rodilla en cadena abierta con la cadera fija, sobre una trayectoria guiada. Es el complemento exacto del peso muerto rumano, que carga los mismos músculos pero en extensión de cadera con la rodilla casi fija.',
    benefits: [
      'Cubre la única carencia evidente de la biblioteca: ningún ejercicio cargaba los isquiotibiales en flexión de rodilla.',
      'Equilibra el trabajo de muslo, ampliamente dominado por el cuádriceps (sentadillas, zancadas, prensa).',
      'Trayectoria guiada y carga ajustable, así que el progreso es medible.',
    ],
    progression: {
      easier: 'Reduce la carga, o acorta el recorrido flexionando algo menos.',
      harder: 'Aumenta la carga, ralentiza la bajada a cuatro segundos, o mantén una pausa de un segundo en flexión.',
      readyWhen: 'Cuando completes tres series de doce sin que la cadera se despegue, aumenta la carga.',
    },
    precautions:
      'Un calambre en la parte posterior del muslo es frecuente en este movimiento: reduce la carga y alarga el calentamiento en vez de insistir.',
  },

  treadmill: {
    slug: 'cinta-de-correr',
    muscles: { primary: 'Cardio, piernas' },
    steps: [
      'Súbete con la cinta parada o muy lenta, y acelera después progresivamente.',
      'Elige un ritmo en el que hablar siga siendo posible pero algo entrecortado.',
      'Mantén el torso recto y la mirada al frente, sin agarrarte a las barras.',
      'Sostén el ritmo durante toda la duración y reduce poco a poco antes de bajarte.',
    ],
    mistakes: [
      'Agarrarse a las barras laterales: parte del peso queda sostenido, así que el esfuerzo real baja aunque la velocidad de la pantalla no cambie.',
      'Mirada clavada en la pantalla, lo que rompe la postura del cuello.',
      'Arrancar demasiado rápido en vez de instalar el ritmo poco a poco.',
    ],
    sensation:
      'Una falta de aire moderada y estable durante toda la duración: la conversación debe seguir siendo posible pero no cómoda.',
    rangeOfMotion:
      'No hay recorrido que ajustar, sino una zancada: apoya el talón, rueda el pie, y deja que los brazos oscilen libremente desde el hombro.',
    tempo:
      'Un ritmo regular y sostenido, mejor que acelerones seguidos de recuperaciones, salvo que los intervalos sean el objetivo del día.',
    anatomy:
      'La misma cadena muscular que al caminar: glúteos e isquiotibiales propulsan, cuádriceps amortiguan, gemelos dan el empuje final y el core estabiliza la pelvis en cada apoyo.',
    mechanics:
      'Locomoción cíclica sobre una cinta motorizada. Lo que la diferencia de caminar al aire libre es la pendiente regulable: es ella, más que la velocidad, la que aumenta el esfuerzo sin aumentar el impacto, un ajuste que el terreno exterior no ofrece a voluntad.',
    benefits: [
      'Permite fijar con precisión ritmo y pendiente, así que se puede reproducir exactamente el mismo esfuerzo de una sesión a otra.',
      'La pendiente carga más glúteos y gemelos sin exigir correr más rápido.',
      'Independiente del tiempo y de la hora, a diferencia de caminar al aire libre.',
    ],
    progression: {
      easier: 'Reduce la velocidad antes que la duración: mejor quince minutos sostenidos que treinta sufridos.',
      harder: 'Sube la pendiente a ritmo constante, alarga la duración, o alterna tramos más rápidos.',
      readyWhen: 'Cuando veinte minutos a ritmo constante pasen manteniendo una conversación posible, sube la pendiente.',
    },
    precautions:
      'Engancha la parada de emergencia antes de arrancar, y no bajes nunca de la cinta en marcha.',
  },

  stationaryBike: {
    slug: 'bicicleta-estatica',
    muscles: { primary: 'Cardio, muslos', secondary: 'Glúteos' },
    steps: [
      'Ajusta el sillín para que la rodilla mantenga una ligera flexión cuando el pedal está abajo del todo.',
      'Siéntate con las manos apoyadas sin crispar, la espalda ni hundida ni arqueada.',
      'Instala una cadencia regular y ajusta después la resistencia para encontrar tu esfuerzo de trabajo.',
      'Mantén cadencia y resistencia durante toda la duración, y termina con unos minutos suaves.',
    ],
    mistakes: [
      'Sillín demasiado bajo: la rodilla queda muy flexionada abajo, lo que carga la articulación sin necesidad.',
      'Pelvis que se balancea de un lado a otro, señal de un sillín demasiado alto.',
      'Resistencia casi nula con una cadencia altísima, que da la ilusión del esfuerzo sin producirlo.',
    ],
    sensation:
      'Una falta de aire moderada y un calentamiento progresivo en los muslos. A diferencia de caminar o de la cinta, el peso del cuerpo nunca recae sobre las piernas.',
    rangeOfMotion:
      'No hay recorrido que ajustar, sino una altura de sillín: la rodilla conserva una ligera flexión abajo, sin que la pelvis tenga que bascular para alcanzar el pedal.',
    tempo:
      'Una cadencia regular sostenida durante toda la duración. La resistencia es el verdadero ajuste de intensidad, no la velocidad de pedaleo.',
    anatomy:
      'Cuádriceps y glúteo mayor producen la extensión de rodilla y cadera en cada empuje; isquiotibiales y gemelos participan en la subida cuando los pies están fijados. La posición sentada descarga por completo la columna y las articulaciones de carga.',
    mechanics:
      'Pedaleo cíclico en cadena cerrada, sin soportar peso: ese es el eje que distingue la bicicleta del resto del cardio de la biblioteca — el cuerpo lo sostiene el sillín, así que rodillas, caderas y espalda no sufren impacto ni compresión por el peso.',
    benefits: [
      'El único cardio de la biblioteca que no hace soportar peso a las piernas, así que sigue siendo practicable cuando caminar o correr molesta a una articulación.',
      'La resistencia se ajusta con precisión, lo que hace la intensidad reproducible de una sesión a otra.',
      'Permite mantener duraciones largas sin carga articular acumulada.',
    ],
    progression: {
      easier: 'Baja la resistencia antes de recortar la duración, y mantén una cadencia cómoda.',
      harder: 'Aumenta la resistencia a cadencia constante, alarga la duración, o alterna bloques más duros.',
      readyWhen: 'Cuando veinte minutos pasen sin que la cadencia caiga al final, aumenta la resistencia.',
    },
    precautions:
      'Una rodilla dolorida casi siempre viene del ajuste del sillín, no del esfuerzo: comprueba la altura antes de reducir la intensidad.',
  },

  rowingMachine: {
    slug: 'maquina-de-remo',
    muscles: { primary: 'Cardio, espalda, piernas', secondary: 'Brazos, core' },
    steps: [
      'Sujeta los pies, agarra la empuñadura con los brazos estirados, tibias verticales y torso algo adelantado: es la posición de ataque.',
      'Empuja primero con fuerza con las piernas, con los brazos aún estirados y el torso quieto.',
      'Cuando las piernas están casi extendidas, abre el torso hacia atrás y solo entonces tira de la empuñadura hacia la parte baja de las costillas.',
      'Vuelve en orden inverso: estira los brazos, lleva el torso adelante y después dobla las piernas.',
    ],
    mistakes: [
      'Tirar con los brazos antes de que las piernas hayan empujado: es el error más extendido y priva al movimiento de su principal fuente de potencia.',
      'Abrir el torso demasiado pronto, lo que traslada la carga a la zona lumbar.',
      'Espalda curvada en la posición de ataque, con la excusa de llegar más lejos.',
    ],
    sensation:
      'Las piernas arden primero, luego la espalda y los brazos. Si los brazos se cansan antes que las piernas, el orden de la palada está invertido.',
    rangeOfMotion:
      'La empuñadura llega a la parte baja de las costillas, no al pecho ni al abdomen. En la posición de ataque las tibias están verticales: ir más lejos no aporta nada y fuerza la espalda.',
    tempo:
      'Un ritmo regular, con un retorno aproximadamente dos veces más lento que el empuje. Es esa proporción, no la cadencia, la que distingue una palada limpia de una precipitada.',
    anatomy:
      'Cuádriceps y glúteos producen la mayor parte de la potencia en el empuje; después el dorsal ancho, los romboides y el trapecio medio llevan la escápula hacia la columna; el bíceps termina. El core transmite la fuerza de las piernas al tren superior, lo que hace del remo un movimiento de cadena completa.',
    mechanics:
      'Secuencia en cuatro tiempos — ataque, empuje, final y retorno — que combina extensión de piernas, extensión de cadera y tracción horizontal. Es el único movimiento de la biblioteca donde el orden de los segmentos cuenta tanto como la fuerza producida: piernas, luego torso, luego brazos.',
    benefits: [
      'El único cardio de la biblioteca que es además un gesto técnico real: la calidad de la palada progresa junto con la condición física.',
      'Trabaja la cadena de tracción, ausente en los demás ejercicios cardiovasculares.',
      'Sin impacto, y solicitando bastante más masa muscular que caminar o pedalear.',
    ],
    progression: {
      easier: 'Recorta la duración antes de subir la cadencia, y céntrate en el orden piernas-torso-brazos.',
      harder: 'Alarga la duración, sube el ritmo manteniendo la proporción retorno/empuje, o trabaja por bloques.',
      readyWhen: 'Cuando quince minutos pasen con el orden de palada respetado de principio a fin, alarga la duración.',
    },
    precautions:
      'La zona lumbar no debe ser nunca el motor: si la fatiga se instala ahí, es que el torso se abre antes de que las piernas terminen de empujar. Retoma más despacio y más suave.',
  },
};
