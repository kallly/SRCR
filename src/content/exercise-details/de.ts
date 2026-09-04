import type { ExerciseKey } from '../../core/types';
import type { ExerciseDetail } from './fr';

/**
 * Contenu long en allemand. Meme regle de redaction que fr.ts : uniquement du
 * verifiable et du stable (anatomie, biomecanique, principes d'entrainement
 * etablis), jamais de citation d'etude ni de pourcentage d'activation EMG.
 *
 * Les slugs sont en allemand et sans trema (ue/oe/ae) : ces pages vivent sous
 * exercises/de/ et une URL francaise y serait incoherente pour un lecteur
 * germanophone. Quelques termes restent en anglais (dead bug, bird dog, crunch)
 * parce que c'est sous ce nom qu'ils sont connus et cherches en allemand.
 */
const ART_DIRECTION =
  'Flat minimalist illustration, solid very dark green background (#0e1210), ' +
  'simplified human silhouette in off-white (#f2f0e8), a single lime-green ' +
  'accent (#d7ff3f) on the primary muscle worked, thick clean linework, no ' +
  'text, no logo, square crop. ';

export const de: Partial<Record<ExerciseKey, ExerciseDetail>> = {
  inclined: {
    slug: 'erhoehte-liegestuetze',
    muscles: { primary: 'Brust, Trizeps', secondary: 'Schultern, Rumpf' },
    steps: [
      'Setze die Hände auf eine stabile erhöhte Fläche (Stuhl, Bank, Tischkante), etwas weiter als schulterbreit.',
      'Gehe mit den Füßen so weit zurück, bis der Körper eine gerade Linie von den Knöcheln bis zum Kopf bildet.',
      'Spanne Bauch und Gesäß an, damit die Hüfte während der gesamten Bewegung ruhig bleibt.',
      'Beuge die Ellenbogen auf etwa 45° zum Körper und senke die Brust zur Auflage, ohne den Rücken ins Hohlkreuz zu bringen.',
      'Drücke dich zurück in die Ausgangsposition, ohne die Ellenbogen durchzuschlagen.',
    ],
    mistakes: [
      'Ellenbogen auf 90° abgespreizt: verlagert die Last auf die Schultern und belastet sie.',
      'Hüfte hängt durch oder wird überstreckt: bricht die Linie und belastet den unteren Rücken.',
      'Verkürzter Bewegungsweg: deutlich weniger wirksam als eine vollständige, kontrollierte Abwärtsbewegung.',
    ],
    sensation:
      'Die Anstrengung gehört in die Brust und in die Rückseite der Arme. Wenn du sie vor allem vorne in der Schulter, im Handgelenk oder im Nacken spürst, wandern die Ellenbogen nach außen oder die Schultern ziehen zu den Ohren.',
    rangeOfMotion:
      'Senke dich, bis die Brust wenige Zentimeter über der Auflage ist. Gehe nicht weiter, als die Schulter es ohne Nachvornerollen zulässt. Oben die Arme strecken, ohne den Ellenbogen abrupt zu blockieren.',
    tempo:
      'Zwei Sekunden abwärts, eine aufwärts. Beim Absenken einatmen, beim Drücken ausatmen. Die kontrollierte Abwärtsbewegung ist die nützliche Hälfte der Übung: sich fallen zu lassen heißt, nur die halbe Arbeit zu machen.',
    anatomy:
      'Der große Brustmuskel ist der Hauptmotor: Er führt den Arm zur Körpermitte. Der Trizeps streckt den Ellenbogen, der vordere Deltamuskel hilft am Anfang des Drückens. Im Hintergrund hält der vordere Sägemuskel das Schulterblatt flach am Brustkorb, während der quere Bauchmuskel und das Gesäß das Becken fixieren, damit der Körper ein starres Brett bleibt.',
    mechanics:
      'Ein horizontales Drücken in der Sagittalebene, das Schulterbeugung und Ellenbogenstreckung verbindet. Das Absenken ist eine exzentrische Kontraktion — der Muskel verlängert sich unter Spannung — die Rückkehr ist konzentrisch. Je höher die Auflage, desto kleiner der Anteil des Körpergewichts, den du bewegst: genau das ist der Schwierigkeitsregler dieser Übung.',
    benefits: [
      'Baut Druckkraft im Oberkörper ohne Geräte auf, mit deutlich weniger Belastung für Handgelenke und Schultern als ein Liegestütz am Boden.',
      'Stärkt die Stützposition, die sich auf alles überträgt, was du vor dem Körper drückst oder trägst.',
      'Lässt sich über die Höhe der Auflage fein einstellen, was sie zu einem verlässlichen Einstieg nach einer Trainingspause macht.',
    ],
    progression: {
      easier: 'Erhöhe die Auflage: eine Arbeitsplatte oder eine Wand ist viel zugänglicher als ein Stuhl.',
      harder: 'Wähle eine niedrigere Auflage, oder dehne das Absenken auf vier Sekunden aus.',
      readyWhen:
        'Wenn drei Sätze mit zwölf Wiederholungen mit kontrolliertem Absenken und ruhiger Hüfte gelingen, senke die Auflage eine Stufe.',
    },
    precautions:
      'Wenn die Schultervorderseite schmerzt, verringere den Bewegungsweg und führe die Ellenbogen näher an den Körper, bevor du tiefer gehst.',
    imagePrompt:
      ART_DIRECTION +
      'Person doing incline push-ups, hands on a raised ledge, side view, body in a straight line from ankles to head, elbows at 45°.',
  },

  chairsquat: {
    slug: 'kniebeuge-mit-stuhl',
    muscles: { primary: 'Quadrizeps, Gesäß', secondary: 'Beinbeuger, Rumpf' },
    steps: [
      'Stelle dich vor einen stabilen Stuhl, die Füße etwa hüftbreit.',
      'Schiebe die Hüfte nach hinten, als wolltest du dich setzen, die Knie in Linie mit den Füßen.',
      'Senke dich kontrolliert, bis du die Sitzfläche streifst, das Gewicht auf den Fersen.',
      'Berühre kurz, ohne dich zu setzen, die Brust aufrecht.',
      'Drücke dich über die Fersen nach oben, bis die Beine ganz gestreckt sind.',
    ],
    mistakes: [
      'Knie fallen nach innen: instabil und gelenkbelastend.',
      'Auf den Stuhl fallen lassen statt das Absenken zu kontrollieren.',
      'Oberkörper kippt zu weit nach vorn: verlagert die Arbeit in den unteren Rücken.',
    ],
    sensation:
      'Du solltest die Oberschenkelvorderseite und das Gesäß spüren, mit deutlichem Druck auf den Fersen. Spannung vorne im Knie oder im unteren Rücken heißt, dass die Hüfte nicht weit genug zurückgeht und der Oberkörper ausgleicht.',
    rangeOfMotion:
      'Senke dich, bis du die Sitzfläche streifst, ohne dich abzusetzen. Der Stuhl ist eine gleichbleibende Tiefenmarke, kein Sitz: genau das macht die Übung von Einheit zu Einheit messbar.',
    tempo:
      'Drei Sekunden abwärts, ein bis zwei aufwärts. Beim Absenken einatmen, beim Drücken über die Fersen ausatmen. Eine Sekunde Pause bei der Berührung nimmt jeden Schwung heraus.',
    anatomy:
      'Der Quadrizeps streckt das Knie, der große Gesäßmuskel streckt die Hüfte: zwei Hauptmotoren, die zusammenarbeiten. Beinbeuger und Adduktoren stabilisieren, der mittlere Gesäßmuskel verhindert das Einfallen der Knie, und der Rückenstrecker hält gemeinsam mit der Bauchwand den Oberkörper fest.',
    mechanics:
      'Gleichzeitige Beugung und dann Streckung von Hüfte und Knie in der Sagittalebene. Das Absenken ist exzentrisch, das Aufrichten konzentrisch. Die Hüfte nach hinten zu schieben bringt deinen Körperschwerpunkt über die Fersen, und genau das verteilt die Last zwischen Oberschenkeln und Gesäß, statt sie auf das Knie zu konzentrieren.',
    benefits: [
      'Baut die meistgenutzte Alltagsbewegung wieder auf: vom Stuhl aufstehen, ins Auto einsteigen, etwas vom Boden aufheben.',
      'Kräftigt Oberschenkel und Gesäß zugleich — das, was in einer sitzenden Phase zuerst nachlässt.',
      'Der Stuhl gibt eine objektive Tiefenmarke, du machst also Fortschritte, ohne nach Augenmaß beurteilen zu müssen, ob du tief genug warst.',
    ],
    progression: {
      easier: 'Nimm eine höhere Sitzfläche, oder setze dich zwischen den Wiederholungen tatsächlich ab.',
      harder: 'Arbeite auf eine niedrigere Sitzfläche hin, verlangsame das Absenken auf fünf Sekunden, oder halte unten drei Sekunden.',
      readyWhen:
        'Wenn drei Sätze mit fünfzehn Wiederholungen ohne einfallende Knie und ohne Abstützen mit den Händen gelingen, senke die Sitzfläche.',
    },
    precautions:
      'Wenn das Knie zwickt, reduziere die Tiefe statt der Wiederholungszahl: ein schmerzfreier Teilbereich ist mehr wert als ein voller, der wehtut.',
    imagePrompt:
      ART_DIRECTION +
      'Person performing a squat in front of a chair, side view, hips pushed back, knees tracking over the feet, chest upright, just before touching the seat.',
  },

  calf: {
    slug: 'wadenheben',
    muscles: { primary: 'Waden (Gastrocnemius, Soleus)' },
    steps: [
      'Stelle dich hüftbreit hin, bei Bedarf eine Hand locker an Wand oder Stuhl.',
      'Hebe dich über drei Sekunden auf die Fußballen, dabei über den großen Zeh drücken.',
      'Halte oben kurz inne, die Waden voll angespannt.',
      'Senke dich über drei Sekunden ab, bis die Fersen wieder den Boden berühren.',
    ],
    mistakes: [
      'Zu schnell: die Langsamkeit ist das, was den Muskel arbeiten lässt.',
      'Unten federn statt den gesamten Weg zu kontrollieren.',
      'Die Knöchel kippen beim Hochgehen nach außen oder innen.',
    ],
    sensation:
      'Eine deutliche Kontraktion in der Wade, von der Ferse bis kurz unter das Knie. Wandert die Anstrengung ins Schienbein oder an die Außenseite des Knöchels, kippt der Fuß, statt gerade zu drücken.',
    rangeOfMotion:
      'Hebe dich so hoch, wie der Knöchel es zulässt, ohne dass der Fuß nach außen kippt, und senke dann bis zum Bodenkontakt der Ferse. Den unteren Teil wegzulassen ist der häufigste Fehler — dabei ist genau dort der Muskel unter Spannung verlängert.',
    tempo:
      'Drei Sekunden hoch, eine Sekunde oben gehalten, drei Sekunden herunter. Es ist die einzige Übung dieser Bibliothek, bei der Langsamkeit sie nicht nur schwerer macht: Sie *ist* die Last, denn das Körpergewicht allein würde nicht genügen.',
    anatomy:
      'Zwei Muskeln teilen sich die Arbeit. Der Gastrocnemius, oberflächlich und sichtbar, überquert das Knie und arbeitet vor allem bei gestrecktem Bein; der darunterliegende Soleus trägt bei gebeugtem Knie mehr bei. Beide laufen in der Achillessehne zusammen und erzeugen die Streckung des Sprunggelenks.',
    mechanics:
      'Plantarflexion des Sprunggelenks in der Sagittalebene, in geschlossener Kette (der Fuß bleibt am Boden). Konzentrisch aufwärts, exzentrisch abwärts. Der Gelenkweg ist kurz: Es ist die Zeit unter Spannung und nicht die zurückgelegte Strecke, die den Effekt erzeugt.',
    benefits: [
      'Die Wade ist der wichtigste Antrieb beim Gehen und Treppensteigen, ihre Kräftigung verbessert also direkt die Ausdauer beim Gehen.',
      'Kräftigt Achillessehne und Sprunggelenk, zwei Strukturen, die nach einer Phase der Inaktivität schnell an Belastbarkeit verlieren.',
      'Trägt zum Gleichgewicht im Stand bei, da das Sprunggelenk das erste Gelenk ist, das ein Schwanken ausgleicht.',
    ],
    progression: {
      easier: 'Halte zwei Finger an einer Wand, oder verringere die Höhe, auf die du dich hebst.',
      harder:
        'Arbeite einbeinig, oder stelle den Fußballen auf eine Stufe, damit die Ferse unter Zehenhöhe absinken kann.',
      readyWhen:
        'Wenn drei Sätze mit zwanzig Wiederholungen im langsamen Tempo ohne Handstütze gelingen, wechsle auf ein Bein.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person standing on the balls of their feet, front view, heels raised, calves contracted, arms slightly out for balance.',
  },

  wallsit: {
    slug: 'wandsitzen',
    muscles: { primary: 'Quadrizeps', secondary: 'Gesäß, Rumpf' },
    steps: [
      'Stelle dich mit dem Rücken an eine Wand, die Füße hüftbreit und etwa einen Schritt davon entfernt.',
      'Rutsche an der Wand herunter, bis die Oberschenkel parallel zum Boden sind, die Knie im 90°-Winkel.',
      'Halte den gesamten Rücken flach an der Wand und die Knie senkrecht über den Knöcheln.',
      'Halte die Position und atme normal weiter, ohne die Luft anzuhalten.',
      'Drücke dich über die Fersen wieder aus der Position heraus.',
    ],
    mistakes: [
      'Knie wandern über die Zehen hinaus: zu viel Druck auf das Gelenk.',
      'Der Rücken löst sich von der Wand: Du verlierst die Abstützung und belastest den unteren Rücken.',
      'Den 90°-Winkel erzwingen, wenn das Knie protestiert: öffne stattdessen auf 120°.',
    ],
    sensation:
      'Ein Brennen, das gleichmäßig in den Oberschenkelvorderseiten anwächst und bis zum Ende ansteigt. Ein stechender Schmerz im Knie ist dagegen nicht das erwartete Signal: Öffne den Winkel.',
    rangeOfMotion:
      'Der Kniewinkel bestimmt die Schwierigkeit: 90° ist die Referenzvariante, 120° eine deutlich zugänglichere. Die Knie bleiben über den Knöcheln, nie vor den Zehen, und der Rücken hält auf seiner ganzen Länge Kontakt zur Wand.',
    tempo:
      'Kein Tempo — das ist ein Halten. Atme normal, notfalls hörbar, damit du merkst, dass du die Luft nicht anhältst: Das ist der häufigste Reflex bei einer isometrischen Übung, und er treibt den Blutdruck ohne jeden Nutzen hoch.',
    anatomy:
      'Der Quadrizeps arbeitet isometrisch, um zu verhindern, dass das Knie unter dem Körpergewicht weiter einknickt. Gesäß und Beinbeuger helfen, die Hüfte zu halten, und die Bauchmuskeln stabilisieren das Becken gegen die Wand.',
    mechanics:
      'Eine isometrische Kontraktion: Der Muskel erzeugt Kraft, ohne seine Länge zu ändern und ohne dass sich das Gelenk bewegt. Die Wand nimmt die Gleichgewichtsanforderung heraus, was erlaubt, die Oberschenkel zu belasten, ohne die Koordination zu brauchen, die ein frei gehaltener Kniebeugenhalt verlangen würde.',
    benefits: [
      'Baut Kraftausdauer in den Oberschenkeln auf — die Eigenschaft, die beim Treppabgehen oder langem Stehen ausgeht.',
      'Belastet den Quadrizeps ohne Gelenkbewegung, was sie oft erträglich macht, wenn eine Bewegung über den vollen Weg es noch nicht ist.',
      'Der Fortschritt wird in Sekunden gemessen, einer klareren Einheit als "eine Wiederholung mehr", um einen Wiedereinstieg zu verfolgen.',
    ],
    progression: {
      easier: 'Öffne den Kniewinkel auf 110-120°, oder teile die Zeit in zwei kürzere Halten auf.',
      harder: 'Arbeite auf 90° hin, verlängere die Dauer, oder hebe leicht eine Ferse und dann die andere.',
      readyWhen:
        'Wenn drei Halten von sechzig Sekunden bei 90° gelingen, ohne dass sich der Rücken löst, verlängere weiter oder gehe zu einer dynamischen Belastung über.',
    },
    precautions:
      'Wenn das Knie zieht, öffne zuerst den Winkel. Diese Übung lässt sich leicht sanfter machen; es bringt nichts, sie so auszuhalten.',
    imagePrompt:
      ART_DIRECTION +
      'Person seated against a wall with no chair, thighs parallel to the floor, knees at 90°, back flat on the wall, side view.',
  },

  rotation: {
    slug: 'aussenrotation-schulter',
    muscles: { primary: 'Rotatorenmanschette (Schulter)' },
    steps: [
      'Lege dich auf die Seite, den Ellenbogen im 90°-Winkel eng an den Rippen, ein leichtes Gewicht (eine Wasserflasche) in der Hand.',
      'Lege den Unterarm auf den Bauch — das ist die Ausgangsposition.',
      'Drehe den Unterarm nach oben, der Ellenbogen bleibt am Körper, ohne die Schulter selbst zu bewegen.',
      'Halte am oberen Punkt der Bewegung kurz inne.',
      'Senke kontrolliert zurück in die Ausgangsposition.',
    ],
    mistakes: [
      'Der Ellenbogen löst sich von den Rippen: verlagert die Arbeit weg von der Schulter.',
      'Zu viel Gewicht: Diese Bewegung trifft einen kleinen Muskel, die Last bleibt leicht.',
      'Den Bewegungsweg über das hinaus erzwingen, was die Schulter bequem zulässt.',
    ],
    sensation:
      'Eine ruhige Anstrengung hinten und oben in der Schulter, nie spektakulär. Spürst du sie im Trapezmuskel oder im Nacken, zieht die Schulter hoch; spürst du sie im Bizeps, ist das Gewicht zu schwer und der Arm zieht, statt zu rotieren.',
    rangeOfMotion:
      'Drehe nur so weit, wie die Schulter es zulässt, ohne dass der Ellenbogen die Rippen verlässt — oft viel weniger weit, als du erwarten würdest. Der nützliche Bereich ist hier kurz: Darüber hinaus arbeitet etwas anderes.',
    tempo:
      'Zwei Sekunden in jede Richtung, ohne Ruck, mit einer Sekunde Pause oben. Das ist eine Übung der Kontrolle, nicht der Kraft: Tempo macht sie sinnlos.',
    anatomy:
      'Die Rotatorenmanschette besteht aus vier tiefen Muskeln, die den Oberarmkopf in seiner Pfanne zentriert halten. Diese Bewegung trifft vor allem den Infraspinatus und den Teres minor, die beiden Außenrotatoren. Der oberflächlichere Deltamuskel ist genau der, der *nicht* übernehmen soll.',
    mechanics:
      'Außenrotation der Schulter in der Transversalebene, bei im 90°-Winkel fixiertem Ellenbogen. Den Ellenbogen am Körper zu halten ist eine mechanische Sperre: Sie verhindert, dass die Schulter mit einer Abduktion ausweicht, was die Arbeit dem Deltamuskel überlassen würde.',
    benefits: [
      'Erhält die tiefen Schulterstabilisatoren, die oft vernachlässigt werden, weil sie unsichtbar sind und kein spektakuläres Gefühl erzeugen.',
      'Wirkt der nach vorn gerollten Haltung entgegen, die Schreibtischarbeit und langer Bildschirmgebrauch einprägen.',
      'Bereitet die Schulter darauf vor, Druckbewegungen zu vertragen: Das ist eine Erhaltungsübung, keine Leistungsübung.',
    ],
    progression: {
      easier: 'Führe sie ganz ohne Gewicht aus, mit leerer Hand, und suche nur Bewegungsweg und Kontrolle.',
      harder:
        'Gehe zu einer etwas schwereren Flasche über, oder verlängere die Pause oben. Bleib bescheiden bei der Last: Dieser Muskel ist klein.',
      readyWhen:
        'Wenn drei Sätze mit fünfzehn Wiederholungen gelingen, ohne dass sich der Ellenbogen hebt und ohne Ausweichen über den Trapezmuskel.',
    },
    precautions:
      'In der Schulter sollte kein Schmerz auftreten. Tut er es, verringere zuerst den Bewegungsweg, dann die Last; hält er an, ist das nicht die Übung, die deiner Einheit fehlt.',
    imagePrompt:
      ART_DIRECTION +
      'Person lying on their side, bent elbow tucked to the body, forearm rotating upwards holding a small weight, slightly angled top view.',
  },

  deadbug: {
    slug: 'dead-bug',
    muscles: { primary: 'Tiefe Rumpfmuskulatur (Transversus abdominis)', secondary: 'Hüften' },
    steps: [
      'Lege dich auf den Rücken, die Arme zur Decke, Hüften und Knie im 90°-Winkel gebeugt.',
      'Drücke den unteren Rücken in den Boden und halte ihn dort während der gesamten Bewegung.',
      'Senke langsam einen Arm über den Kopf und das gegenüberliegende Bein Richtung Boden, ohne aufzusetzen.',
      'Kehre kontrolliert in die Ausgangsposition zurück.',
      'Wiederhole auf der anderen Seite.',
    ],
    mistakes: [
      'Der untere Rücken hebt vom Boden ab: ein Zeichen, dass der Bewegungsweg zu weit ging.',
      'Zu schnell: Du verlierst die Kontrolle und der Rumpf schaltet ab.',
      'Die Luft anhalten: Atme durchgehend normal weiter.',
    ],
    sensation:
      'Eine tiefe, durchgehende Spannung im Unterbauch, unterhalb des Nabels. Wölbt sich der untere Rücken oder zieht er, hat der Bewegungsweg überschritten, was dein Rumpf halten kann: Das ist das Stoppsignal, keine Nebensache.',
    rangeOfMotion:
      'Senke Arm und Bein nur so weit, wie der untere Rücken am Boden gedrückt bleibt. Dieser Punkt ist individuell und verschiebt sich über die Wochen — er, und nicht der Abstand zum Boden, ist deine Maßeinheit.',
    tempo:
      'Drei bis vier Sekunden pro Wiederholung, ohne je schneller zu werden. Beim Strecken ausatmen, beim Zurückkommen einatmen: Das Ausatmen hilft mechanisch, die Rippen unten und den Rücken flach zu halten.',
    anatomy:
      'Der Transversus abdominis, der tiefste Muskel der Bauchwand, wirkt wie ein Gürtel, der das Becken stabilisiert. Die schrägen Bauchmuskeln halten der Rotation stand, die die Überkreuzbewegung erzeugt, und der gerade Bauchmuskel hält den Brustkorb unten. Die Hüftbeuger arbeiten kontrollierend am sich streckenden Bein.',
    mechanics:
      'Das ist eine Antiextensions-Übung: Die Aufgabe des Rumpfes ist nicht, eine Bewegung zu erzeugen, sondern eine zu verhindern — hier die Streckung des unteren Rückens durch das Gewicht der sich entfernenden Gliedmaßen. Das Überkreuzmuster fügt einen Widerstand gegen Rotation hinzu.',
    benefits: [
      'Lehrt deutlicher als jede herkömmliche Bauchübung, was der Rumpf tatsächlich tut — stabilisieren statt beugen.',
      'Fordert den unteren Rücken, ohne ihn unter Druck zu setzen, anders als wiederholte Sit-ups.',
      'Überträgt sich direkt auf Gehen und Laufen, wo gegenüberliegender Arm und Bein ohnehin im Wechsel arbeiten.',
    ],
    progression: {
      easier: 'Bewege eine Extremität nach der anderen, nur den Arm oder nur das Bein, und halte die andere in Position.',
      harder:
        'Strecke das Bein vollständig knapp über dem Boden, werde noch langsamer, oder halte zwei Sekunden in der tiefen Position.',
      readyWhen:
        'Wenn drei Sätze mit zehn Wiederholungen pro Seite gelingen, ohne dass der untere Rücken abhebt, und das Bein wenige Zentimeter über dem Boden gestreckt ist.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person lying on their back, one arm and the opposite leg extended diagonally towards the floor, the other arm and leg bent, top view.',
  },

  plank: {
    slug: 'unterarmstuetz',
    muscles: { primary: 'Rumpf (Bauch, unterer Rücken)', secondary: 'Schultern' },
    steps: [
      'Setze die Unterarme auf den Boden, die Ellenbogen unter den Schultern, und strecke die Beine nach hinten.',
      'Richte den Körper gerade aus, von den Fersen bis zum Kopf.',
      'Spanne das Gesäß an und ziehe den Nabel leicht ein, um den Rumpf zu fixieren.',
      'Halte die Position bei normaler Atmung, den Blick zum Boden.',
    ],
    mistakes: [
      'Die Hüfte schiebt sich nach oben zu einer Spitze: verringert die Arbeit der Bauchmuskeln.',
      'Die Hüfte hängt durch: belastet den unteren Rücken — das ist das Signal, den Satz zu beenden.',
      'Die Luft anhalten statt normal weiterzuatmen.',
    ],
    sensation:
      'Spannung über die gesamte Bauchwand und das Gesäß verteilt. Verlagert sich die Last in den unteren Rücken oder die Schultern, ist die Position zerfallen: Durchhalten bringt dann nichts mehr, besser den Satz beenden.',
    rangeOfMotion:
      'Kein Bewegungsweg — es zählt die Qualität der Ausrichtung. Eine gerade Linie von den Fersen bis zum Kopf, weder Hüftspitze noch Durchhängen, der Blick nach unten, damit der Nacken in der Linie des Rückens bleibt.',
    tempo:
      'Ein durchgehendes Halten, bei normaler und hörbarer Atmung. Das Abbruchkriterium ist nicht die Uhr, sondern die Position: Sobald die Hüfte nachgibt, ist der Satz vorbei, auch wenn noch zehn Sekunden übrig sind.',
    anatomy:
      'Der Transversus abdominis und der gerade Bauchmuskel halten Brustkorb und Becken ausgerichtet, die schrägen Bauchmuskeln verhindern Rotation. Das Gesäß streckt die Hüfte leicht, um das Hohlkreuz zu nehmen, und der vordere Sägemuskel hält die Schulterblätter flach. Der Rückenstrecker arbeitet in Kokontraktion mit den Bauchmuskeln.',
    mechanics:
      'Eine isometrische Antiextensions-Übung: Die Schwerkraft zieht das Becken zum Boden, und die Bauchwand verhindert das. Kein Gelenk bewegt sich, wodurch die Position stark von der Ausrichtung abhängt — wenige Grad Beckenkippung ändern vollständig, welcher Muskel die Last trägt.',
    benefits: [
      'Baut Rumpfausdauer auf, die Eigenschaft, die den Rücken bei langem Stehen oder beim Tragen schützt.',
      'Beinhaltet keine wiederholte Wirbelsäulenbeugung, anders als herkömmliche Baucharbeit.',
      'Das Halten lehrt, unter Spannung zu atmen, ein Reflex, der sich in jeder anderen Übung auszahlt.',
    ],
    progression: {
      easier: 'Setze die Knie ab, oder lege die Unterarme auf eine erhöhte Fläche.',
      harder: 'Verlängere die Dauer, oder hebe kurz einen Fuß und dann den anderen, während die Hüfte ruhig bleibt.',
      readyWhen:
        'Wenn drei Halten von fünfundvierzig Sekunden ohne Positionsverlust gelingen, verlängere oder erhöhe die Komplexität.',
    },
    precautions:
      'Halte die Luft nicht an. Zieht der untere Rücken, ist die Position bereits durchgehängt: Geh herunter und beginne neu, statt es auszuhalten.',
    imagePrompt:
      ART_DIRECTION + 'Person in a forearm plank, body perfectly aligned from heels to head, side view.',
  },

  walk: {
    slug: 'gehen',
    muscles: { primary: 'Herz-Kreislauf, Beine' },
    steps: [
      'Wähle ein zügiges Tempo, bei dem Sprechen noch möglich ist, du aber leicht außer Atem kommst.',
      'Halte die Brust aufrecht, den Blick zum Horizont, die Schultern locker.',
      'Lass die Arme im Rhythmus deiner Schritte natürlich mitschwingen.',
      'Halte dieses Tempo für die geplante Dauer und variiere wenn möglich das Gelände.',
    ],
    mistakes: [
      'Ein Tempo, das zu langsam ist, um eine echte Herz-Kreislauf-Wirkung zu haben.',
      'Der Blick klebt am Boden oder am Telefon: schlecht für die Haltung.',
      'Ungeeignetes Schuhwerk auf unebenem Untergrund.',
    ],
    sensation:
      'Mäßige Atemnot: Du solltest ein Gespräch führen, aber nicht singen können. Das ist die verlässlichste Art, die Intensität ohne jedes Messgerät einzustellen.',
    rangeOfMotion:
      'Kein Bewegungsweg einzustellen, aber ein Schritt: über die Ferse aufsetzen, über den Fuß abrollen, vorne abdrücken. Die Arme schwingen frei aus der Schulter, nicht in den Taschen fixiert.',
    tempo:
      'Ein gleichmäßiger, durchgehaltener Rhythmus statt Spurts gefolgt von Pausen. Die Beständigkeit baut die Ausdauergrundlage auf.',
    anatomy:
      'Alle Muskeln der hinteren Kette tragen im Wechsel bei: Gesäß und Beinbeuger zum Antrieb, der Quadrizeps zum Abfangen, die Waden für den letzten Abdruck. Der Rumpf stabilisiert das Becken bei jedem Einbeinstand, und die Fußmuskulatur steuert das Aufsetzen.',
    mechanics:
      'Zyklische Fortbewegung in wechselnder geschlossener Kette: Jedes Bein durchläuft eine Stand- und eine Schwungphase. Anders als beim Laufen ist immer ein Fuß am Boden — dieses Fehlen einer Flugphase nimmt den Aufprall heraus und macht Gehen bei einem Wiedereinstieg zugänglich.',
    benefits: [
      'Baut Herz-Kreislauf-Kapazität ohne Gelenkbelastung auf, was fast tägliches Üben ermöglicht.',
      'Die einzige Aktivität hier, die sich natürlich auf den Alltag aufsattelt: Wege, Besorgungen, Treppen.',
      'Verbessert die Erholung zwischen Krafteinheiten, statt Ermüdung hinzuzufügen.',
    ],
    progression: {
      easier: 'Kürze eher die Dauer als das Tempo: zehn zügige Minuten sind mehr wert als dreißig geschleppte.',
      harder: 'Verlängere die Dauer, suche Steigungen, oder erhöhe abschnittsweise leicht das Tempo.',
      readyWhen:
        'Wenn dreißig Minuten ohne spürbare Atemnot vergehen, suche eher Steigungen als zusätzliche Zeit.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person mid-walk, side view, chest upright, one arm forward and one back, mid-stride.',
  },

  kneePushup: {
    slug: 'liegestuetze-auf-knien',
    muscles: { primary: 'Brust, Trizeps', secondary: 'Schultern, Rumpf' },
    steps: [
      'Gehe in den Vierfüßlerstand und setze die Hände dann etwas weiter als schulterbreit nach vorn.',
      'Kreuze die Fußgelenke und lass die Knie als Drehpunkt am Boden.',
      'Richte den Körper gerade aus, von den Knien bis zum Kopf, ohne in der Hüfte abzuknicken.',
      'Beuge die Ellenbogen auf etwa 45° zum Körper und senke die Brust nah an den Boden.',
      'Drücke dich hoch, ohne die Ellenbogen durchzuschlagen.',
    ],
    mistakes: [
      'Hüfte zu hoch oder zu tief: bricht die Linie des Rumpfes.',
      'Ellenbogen auf 90° abgespreizt: überlastet die Schultern.',
      'Ein unvollständiges Absenken: verringert die Wirkung der Bewegung.',
    ],
    sensation:
      'Brust und Trizeps, wobei der Rumpf von der Hüfte bis zu den Schultern arbeitet. Beschwerden im Handgelenk kommen fast immer daher, dass die Hände zu weit hinten sind: Sie gehören unter die Schultern, nicht davor.',
    rangeOfMotion:
      'Senke dich, bis die Brust eine Faust hoch über dem Boden ist. Kostet dich der volle Weg die Ausrichtung, verkürze ihn: Ein sauberer halber Weg baut mehr auf als ein voller, der in der Hüfte einknickt.',
    tempo:
      'Zwei Sekunden abwärts, eine aufwärts, ohne Pause unten, damit die Spannung bleibt. Abwärts einatmen, beim Drücken ausatmen.',
    anatomy:
      'Dieselben Hauptmotoren wie beim normalen Liegestütz — großer Brustmuskel, Trizeps, vorderer Deltamuskel — aber mit verkürztem Hebel. Der vordere Sägemuskel stabilisiert das Schulterblatt, während Bauchmuskeln und Gesäß das Durchhängen der Hüfte verhindern.',
    mechanics:
      'Ein horizontales Drücken wie beim erhöhten Liegestütz, aber der Knieauflagepunkt verkürzt den Hebel: Der tatsächlich gehobene Anteil des Körpergewichts sinkt um etwa ein Drittel. Das ist eine Regression des Hebels, nicht des Bewegungswegs — ein wichtiger Unterschied, denn der Bewegungsweg bleibt vollständig.',
    benefits: [
      'Erlaubt, den vollen Bewegungsweg eines Liegestützes zu trainieren, solange die Bodenvariante noch außer Reichweite ist.',
      'Belastet den Rumpf über einen kürzeren Abschnitt, sodass die Ausrichtung am Satzende leichter zu halten ist.',
      'Bildet die natürliche Zwischenstufe zwischen dem erhöhten und dem Liegestütz am Boden.',
    ],
    progression: {
      easier: 'Gehe zurück zum erhöhten Liegestütz auf hoher Auflage, wo der Rumpf weniger gefordert ist.',
      harder: 'Setze die Knie weiter nach vorn, um den Hebel zu verlängern, oder gehe zum Liegestütz am Boden über.',
      readyWhen:
        'Wenn drei Sätze mit zwölf Wiederholungen mit perfekt gerader Linie von den Knien bis zum Kopf gelingen, versuche den Liegestütz am Boden.',
    },
    precautions:
      'Lege ein Kissen oder eine Matte unter die Knie: Beschwerden auf hartem Boden beenden den Satz, bevor der Muskel ermüdet.',
    imagePrompt:
      ART_DIRECTION +
      'Person doing push-ups from the knees, side view, body aligned from knees to head, elbows at 45°, chest near the floor.',
  },

  wallPushup: {
    slug: 'liegestuetze-an-der-wand',
    muscles: { primary: 'Brust, Trizeps', secondary: 'Schultern' },
    steps: [
      'Setze die Hände auf eine Wand, etwas weiter als schulterbreit, auf Brusthöhe.',
      'Gehe mit den Füßen zurück, um den Körper zu neigen, gerade von den Knöcheln bis zum Kopf.',
      'Beuge die Ellenbogen und führe die Brust kontrolliert zur Wand.',
      'Drücke dich zurück in die Ausgangsposition.',
    ],
    mistakes: [
      'Füße zu nah an der Wand: verringert die Intensität der Übung.',
      'Der Rücken geht beim Absenken ins Hohlkreuz.',
      'Zu schnell, ohne kontrollierten Moment unten.',
    ],
    sensation:
      'Eine leichte, aber deutliche Anstrengung in Brust und Trizeps. Spürst du fast nichts, geh mit den Füßen weiter zurück: Die Neigung, und nur sie, bestimmt die Intensität.',
    rangeOfMotion:
      'Führe die Brust bis auf wenige Zentimeter an die Wand und drücke dann zu gestreckten Armen zurück, ohne sie durchzuschlagen. Der volle Bewegungsweg ist hier leicht zu erreichen — und genau das ist der Sinn dieser Variante.',
    tempo:
      'Zwei Sekunden in jede Richtung. Die geringe Intensität macht Langsamkeit umso nützlicher: Sie ist das, was die Übung anspruchsvoll genug macht, um zu wirken.',
    anatomy:
      'Großer Brustmuskel, Trizeps und vorderer Deltamuskel, genau wie bei den anderen Liegestützvarianten. Der Rumpf arbeitet hier wenig, da der Körper nahezu senkrecht steht.',
    mechanics:
      'Ein horizontales Drücken bei sehr geringer Neigung: Je näher der Körper an der Senkrechten ist, desto kleiner der zu bewegende Anteil des Körpergewichts. Das ist das zugänglichste Ende desselben Kontinuums wie der erhöhte und danach der Liegestütz am Boden.',
    benefits: [
      'Macht das Liegestützmuster vom ersten Tag an durchführbar, unabhängig vom Ausgangsniveau.',
      'Erlaubt, Ellenbogenführung und Körperausrichtung zu lernen, ohne durch Kraft begrenzt zu sein.',
      'Funktioniert überall, ohne Geräte und ohne sauberen Boden, was zu einem schrittweisen Wiedereinstieg passt.',
    ],
    progression: {
      easier: 'Gehe mit den Füßen näher an die Wand, bis du fast aufrecht stehst.',
      harder: 'Gehe mit den Füßen zurück und dann zu einer niedrigeren Auflage über: eine Arbeitsplatte, dann ein Stuhl.',
      readyWhen:
        'Wenn drei Sätze mit fünfzehn Wiederholungen leicht fallen, wechsle zu einer niedrigeren Auflage, statt Wiederholungen hinzuzufügen.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person standing leaning towards a wall, hands on the wall at chest height, body in a straight line, side view.',
  },

  chairDips: {
    slug: 'trizeps-dips-am-stuhl',
    muscles: { primary: 'Trizeps', secondary: 'Schultern, Brust' },
    steps: [
      'Setze dich auf die Kante eines stabilen Stuhls, die Hände neben den Hüften.',
      'Schiebe die Hüfte vom Stuhl herunter, die Beine gestreckt oder leicht gebeugt vor dir.',
      'Beuge die Ellenbogen nach hinten, um den Oberkörper zu senken, nicht über 90° hinaus.',
      'Drücke dich über die Hände wieder zu gestreckten Armen hoch.',
    ],
    mistakes: [
      'Zu tief gehen: setzt die Schultern übermäßiger Belastung aus.',
      'Die Schultern ziehen zu den Ohren, statt unten zu bleiben.',
      'Ein instabiler oder rutschender Stuhl: Prüfe die Auflage, bevor du beginnst.',
    ],
    sensation:
      'Die Rückseite des Arms, deutlich. Spannung vorne in der Schulter heißt, dass das Absenken zu weit ging oder die Schultern nach vorn gerollt sind: Das ist die Grenze, die du bei dieser Übung nicht überschreiten solltest.',
    rangeOfMotion:
      'Senke dich, bis der Ellenbogen etwa 90° erreicht, nicht weiter. Das ist die einzige Übung dieser Bibliothek, bei der maximaler Bewegungsweg nicht wünschenswert ist: Jenseits von 90° steigt die Belastung der Schultervorderseite schnell an, bei sehr geringem Gewinn.',
    tempo:
      'Zwei Sekunden abwärts, eine aufwärts. Halte die Schultern durchgehend unten und von den Ohren weg.',
    anatomy:
      'Der Trizeps ist der Hauptmotor: Er streckt den Ellenbogen. Der untere Teil des großen Brustmuskels und der vordere Deltamuskel helfen, und die Schulterblattmuskeln arbeiten dagegen, dass die Schulter nach vorn rollt.',
    mechanics:
      'Ellenbogenstreckung in geschlossener Kette, wobei sich der Körper um fixierte Hände bewegt. Die Beinposition bestimmt die Last: Je weiter sie gestreckt sind, desto größer der Anteil des Körpergewichts, den die Arme tragen.',
    benefits: [
      'Trifft den Trizeps direkter als Liegestützvarianten, bei denen die Brust einen großen Teil der Arbeit übernimmt.',
      'Kräftigt die Fähigkeit, sich aus einer tiefen Auflage hochzudrücken — aus der Badewanne oder einem tiefen Sessel.',
      'Lässt sich ohne Geräte dosieren, einfach indem die Füße näher oder weiter weg gestellt werden.',
    ],
    progression: {
      easier: 'Stelle die Füße näher, die Knie gebeugt: Die Last auf den Armen sinkt deutlich.',
      harder: 'Strecke die Beine weiter, oder lege die Fersen auf eine zweite Auflage gleicher Höhe.',
      readyWhen:
        'Wenn drei Sätze mit zwölf Wiederholungen mit gestreckten Beinen und ohne Nachvornerollen der Schultern gelingen.',
    },
    precautions:
      'Fordernd für die Schultervorderseite. Bei Vorgeschichte oder Beschwerden dort den Bewegungsweg stark verkürzen oder durch eine Liegestützvariante ersetzen.',
    imagePrompt:
      ART_DIRECTION +
      'Person doing tricep dips on a chair, hands on the seat edge, legs extended in front, elbows bent backwards, side view.',
  },

  armCircles: {
    slug: 'armkreisen',
    muscles: { primary: 'Schultern', secondary: 'Oberer Rücken' },
    steps: [
      'Stelle dich hin, die Arme waagerecht zu beiden Seiten gestreckt.',
      'Zeichne kleine, gleichmäßige Kreise mit den Armen, die Schultern unten und locker.',
      'Mache für die geplante Dauer weiter und kehre dann die Richtung um.',
    ],
    mistakes: [
      'Die Schultern wandern während der Bewegung zu den Ohren.',
      'Zu große oder zu schnelle Kreise: Du verlierst die Kontrolle.',
      'Ein Hohlkreuz, um ermüdende Schultern auszugleichen.',
    ],
    sensation:
      'Ein Brennen, das allmählich oben und hinten in der Schulter anwächst. Übernimmt der Trapezmuskel und ziehen die Schultern hoch, werde langsamer oder mache die Kreise kleiner.',
    rangeOfMotion:
      'Kleine, regelmäßige Kreise etwa in Tellergröße, keine großen Windmühlen. Der Bewegungsweg ist nicht das Ziel: Es ist die Zeit unter Spannung, mit waagerecht gegen die Schwerkraft gehaltenen Armen.',
    tempo:
      'Ein gleichbleibender, langsamer Rhythmus bei normaler Atmung. Wechsle nach der Hälfte die Richtung, um die Arbeit zwischen vorderem und hinterem Anteil des Deltamuskels aufzuteilen.',
    anatomy:
      'Der Deltamuskel hält über alle drei Anteile den Arm waagerecht — das ist Ausdauerarbeit in Abduktion. Der Supraspinatus trägt zum Halten bei, und unterer sowie mittlerer Trapezmuskel stabilisieren das Schulterblatt. Der obere Trapezmuskel sollte locker bleiben.',
    mechanics:
      'Ein statisches Halten in Schulterabduktion mit kreisender Komponente in Frontal- und Transversalebene. Der Arm wirkt als langer Hebel: Je gestreckter er ist, desto größer das Drehmoment, das die Schulter tragen muss — ganz ohne äußere Last.',
    benefits: [
      'Baut Schulterausdauer auf, die bei jeder Überkopfaufgabe des Alltags stark gefordert ist.',
      'Wirkt als wirksames Aufwärmen vor jeder Druckübung.',
      'Braucht keine Geräte und keinen Boden: überall im Stehen durchführbar.',
    ],
    progression: {
      easier: 'Verkürze die Dauer, oder beuge die Ellenbogen leicht, um den Hebel zu verkürzen.',
      harder: 'Verlängere die Dauer, oder halte eine kleine Wasserflasche in jeder Hand.',
      readyWhen:
        'Wenn eine Minute in jede Richtung gelingt, ohne dass die Schultern hochziehen, füge eine leichte Last hinzu.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person standing, arms extended horizontally to each side, small circular arrows around the hands showing the movement, front view.',
  },

  wallSlides: {
    slug: 'wandgleiten',
    muscles: { primary: 'Schultern, oberer Rücken' },
    steps: [
      'Stelle dich mit dem Rücken an eine Wand, unterer Rücken, oberer Rücken und Kopf in Kontakt damit.',
      'Bringe die Arme in ein "W", Ellenbogen und Handgelenke an der Wand.',
      'Gleite mit den Armen nach oben, halte dabei den Wandkontakt, Richtung "Y".',
      'Senke kontrolliert zurück in die Ausgangsposition.',
    ],
    mistakes: [
      'Der untere Rücken geht ins Hohlkreuz und löst sich von der Wand.',
      'Ellenbogen oder Handgelenke verlieren beim Hochgleiten den Wandkontakt.',
      'Den Bewegungsweg über das hinaus erzwingen, was die Schulter schmerzfrei zulässt.',
    ],
    sensation:
      'Arbeit zwischen den Schulterblättern und hinten an den Schultern, oft mit einem Dehnungsgefühl vorne in der Brust. Genau das ist die Absicht: vorne öffnen, hinten aktivieren.',
    rangeOfMotion:
      'Gehe so hoch, wie du Ellenbogen und Handgelenke an der Wand halten kannst. Der Punkt, an dem der Kontakt abreißt, ist deine Tagesgrenze — sie durch Abheben der Arme zu überschreiten, nimmt der Übung ihren gesamten Sinn.',
    tempo:
      'Drei Sekunden hoch, drei Sekunden herunter. Die Wand ist die Begrenzung: Sie verhindert Ausweichbewegungen, sofern du langsam bleibst.',
    anatomy:
      'Unterer und mittlerer Trapezmuskel sowie die Rautenmuskeln ziehen die Schulterblätter zusammen und nach unten. Die Außenrotatoren der Schulter halten die "W"-Position. Auf der Gegenseite werden der kleine Brustmuskel und die Schulterbeuger gedehnt.',
    mechanics:
      'Eine Kombination aus Schulterblatthebung und -rotation, koordiniert mit Schulterabduktion in der Frontalebene. Die Wand gibt eine Bezugsebene vor: Sie macht jede Ausweichbewegung über Hohlkreuz oder Rollen sichtbar und unmöglich zu ignorieren.',
    benefits: [
      'Wirkt der nach vorn gerollten Haltung, die langes Sitzen einprägt, direkt entgegen.',
      'Stellt die Schulterbeweglichkeit her, die vor jeder Überkopf-Druckarbeit nötig ist.',
      'Die Wand gibt unmittelbare Rückmeldung zur Ausführungsqualität, ohne Spiegel und ohne fremden Blick.',
    ],
    progression: {
      easier:
        'Stelle die Füße etwas von der Wand weg und beuge die Knie: Das verringert das Hohlkreuz und erleichtert den Kontakt.',
      harder: 'Werde noch langsamer, oder halte zwei Sekunden am höchsten Punkt.',
      readyWhen: 'Wenn der volle Bewegungsweg gelingt, ohne dass die Ellenbogen abheben, füge die Pause hinzu.',
    },
    precautions:
      'Den Wandkontakt zu verlieren ist kein Versagen, sondern eine Information: Es ist deine aktuelle Beweglichkeit. Sie durch ein Hohlkreuz zu erzwingen, verbessert diese Beweglichkeit nicht.',
    imagePrompt:
      ART_DIRECTION +
      'Person standing with back to a wall, arms bent in a W against the wall sliding upwards, vertical arrow showing the movement, front view.',
  },

  superman: {
    slug: 'superman',
    muscles: { primary: 'Unterer Rücken, Gesäß', secondary: 'Oberer Rücken' },
    steps: [
      'Lege dich auf den Bauch, die Arme nach vorn gestreckt, die Beine nach hinten gestreckt.',
      'Schaue zum Boden, um den Nacken während der gesamten Bewegung neutral zu halten.',
      'Hebe Arme, Brust und Beine gleichzeitig einige Zentimeter an.',
      'Halte oben kurz inne und senke dann kontrolliert ab.',
    ],
    mistakes: [
      'Den Kopf heben, um nach vorn zu schauen, statt den Blick unten zu lassen: staucht den Nacken.',
      'Zu hoch, zu schnell, ruckartig statt kontrolliert.',
      'Die Luft während der Anstrengung anhalten.',
    ],
    sensation:
      'Eine Kontraktion im unteren Rücken und im Gesäß. Ein schmerzhafter Druck im Lendenbereich bedeutet dagegen, dass du zu hoch hebst: Höhe ist nicht das Erfolgskriterium.',
    rangeOfMotion:
      'Wenige Zentimeter genügen. Ziel ist eine leichte, kontrollierte Streckung, keine maximale Überstreckung — die letzten Grad bringen keine Muskelarbeit, nur Gelenkdruck.',
    tempo:
      'Zwei Sekunden hoch, eine Sekunde gehalten, zwei Sekunden herunter. Beim Heben ausatmen. Der Blick bleibt von Anfang bis Ende am Boden.',
    anatomy:
      'Der Rückenstrecker, die langen Muskeln beiderseits der Wirbelsäule, erzeugt die Streckung. Der große Gesäßmuskel und die Beinbeuger strecken die Hüfte auf der Beinseite, und der untere Trapezmuskel trägt auf der Armseite bei.',
    mechanics:
      'Gleichzeitige Streckung von Wirbelsäule und Hüften gegen die Schwerkraft, in Bauchlage. Konzentrisch aufwärts, exzentrisch abwärts. Ohne Geräte ist das eine der wenigen Möglichkeiten, die hintere Kette direkt zu belasten.',
    benefits: [
      'Kräftigt den unteren Rücken, der oft vernachlässigt wird, obwohl genau er sich nach einer sitzenden Phase meldet.',
      'Fordert die gesamte hintere Kette, die das Sitzen verkürzt und schwächt.',
      'Braucht keine Geräte und keine Auflage: überall durchführbar, wo du dich hinlegen kannst.',
    ],
    progression: {
      easier: 'Hebe nur die Arme, oder nur die Beine, statt beides zugleich.',
      harder: 'Verlängere das Halten oben, oder hebe gegenüberliegenden Arm und Bein im Wechsel.',
      readyWhen: 'Wenn drei Sätze mit zwölf Wiederholungen ohne Druck im unteren Rücken gelingen.',
    },
    precautions:
      'Den Kopf zu heben, um nach vorn zu schauen, staucht den Nacken: Blick nach unten. Bei bestehenden Rückenschmerzen ist das nicht der richtige Ausgangspunkt.',
    imagePrompt:
      ART_DIRECTION +
      'Person lying face down, arms and legs lifted simultaneously in a slight extension, side view.',
  },

  reverseSnowAngel: {
    slug: 'umgekehrter-schneeengel',
    muscles: { primary: 'Oberer Rücken, Schultern' },
    steps: [
      'Lege dich auf den Bauch, die Arme nach vorn gestreckt, die Handflächen zum Boden.',
      'Hebe Brust und Arme leicht vom Boden ab.',
      'Führe die Arme in einem weiten Bogen nach außen bis zu den Hüften, wie ein Schneeengel rückwärts.',
      'Führe die Arme auf demselben Bogen kontrolliert wieder nach vorn.',
    ],
    mistakes: [
      'Die Brust zu hoch heben: überstreckt den unteren Rücken.',
      'Eine ruckartige Bewegung statt eines weiten, durchgehenden Bogens.',
      'Die Schultern ziehen während des Bogens zu den Ohren.',
    ],
    sensation:
      'Arbeit konzentriert zwischen den Schulterblättern und hinten an den Schultern, mit einem Gefühl von Weite in der Brust. Es ist eine der wenigen gerätefreien Übungen, die diesen Bereich wirklich erreicht.',
    rangeOfMotion:
      'Der weite Bogen führt von den vorgestreckten Armen bis zu den Hüften, so nah wie möglich am Boden, ohne ihn zu berühren. Der nützliche Bewegungsweg endet dort, wo die Schulter nach vorn zu rollen beginnt.',
    tempo:
      'Langsam und durchgehend, etwa drei Sekunden pro Durchgang. Das ist keine Kraftübung, sondern eine Kontrollübung über einen langen Weg: Tempo würde den Schwung statt der Muskeln arbeiten lassen.',
    anatomy:
      'Mittlerer und unterer Trapezmuskel sowie die Rautenmuskeln ziehen die Schulterblätter zusammen. Der hintere Deltamuskel arbeitet über den gesamten Weg, und die Außenrotatoren halten die Ausrichtung des Arms. Der Rückenstrecker hält die Brust leicht angehoben.',
    mechanics:
      'Horizontale Adduktion und Abduktion der Schulter in Bauchlage, wobei die Schwerkraft über den gesamten Weg Widerstand leistet. Anders als bei einer stehenden Bewegung, bei der der Widerstand mit dem Winkel stark schwankt, hält die Bauchlage ihn von einem Ende des Bogens zum anderen ziemlich gleichmäßig.',
    benefits: [
      'Trifft den oberen Rücken, den am schwersten erreichbaren Bereich ohne Klimmzugstange oder Widerstandsband.',
      'Ergänzt das Wandgleiten direkt beim Zurückgewinnen des durch Sitzen verlorenen Schulterwegs.',
      'Trainiert Haltungsausdauer statt Maximalkraft, was der tatsächlichen Nutzung dieser Muskeln entspricht.',
    ],
    progression: {
      easier: 'Beuge die Ellenbogen, um den Hebel zu verkürzen, oder verkleinere den zurückgelegten Bogen.',
      harder: 'Strecke die Arme vollständig, werde langsamer, oder halte an beiden Enden des Bogens kurz inne.',
      readyWhen: 'Wenn drei Sätze mit zwölf Wiederholungen mit gestreckten Armen und ohne Rollen der Schultern gelingen.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person lying face down, arms tracing a wide arc from in front of the body down to the hips, curved arrow showing the path, top view.',
  },

  birdDog: {
    slug: 'bird-dog',
    muscles: { primary: 'Rumpf, unterer Rücken', secondary: 'Gesäß, Schultern' },
    steps: [
      'Gehe in den Vierfüßlerstand, die Hände unter den Schultern, die Knie unter den Hüften.',
      'Spanne den Rumpf an, um den Rücken flach und in Linie mit dem Kopf zu halten.',
      'Strecke gleichzeitig einen Arm nach vorn und das gegenüberliegende Bein nach hinten.',
      'Halte kurz inne, die Hüfte ruhig und waagerecht.',
      'Kehre zur Ausgangsposition zurück und wiederhole auf der anderen Seite.',
    ],
    mistakes: [
      'Das Becken rotiert oder kippt während der Streckung zur Seite.',
      'Der untere Rücken geht ins Hohlkreuz, um mehr Bewegungsweg zu gewinnen.',
      'Zu schnell: Stabilität zählt mehr als Tempo.',
    ],
    sensation:
      'Eine tiefe stabilisierende Anstrengung im Rumpf und im Gesäß des gestreckten Beins, mehr als ein Kraftgefühl in den Gliedmaßen selbst. Spürst du im Rumpf nichts, bewegt sich wahrscheinlich das Becken und nimmt die Arbeit auf.',
    rangeOfMotion:
      'Strecke Arm und Bein bis zur Waagerechten, nicht höher. Das Bein weiter zu heben, überstreckt den unteren Rücken, ohne etwas beizutragen — die Waagerechte ist die nützliche Grenze.',
    tempo:
      'Zwei Sekunden zum Strecken, ein bis zwei Sekunden halten, zwei Sekunden zurück. Das Halten ist der Teil, der zählt: Dann arbeitet die Stabilisierung wirklich.',
    anatomy:
      'Der Rückenstrecker und der Multifidus, ein tiefer segmentaler Muskel der Wirbelsäule, halten den Rücken neutral. Die schrägen Bauchmuskeln halten der Beckenrotation stand, der große Gesäßmuskel streckt die Hüfte, und Deltamuskel sowie unterer Trapezmuskel halten den Arm waagerecht.',
    mechanics:
      'Eine Antirotations- und Antiextensions-Übung: Das Gewicht der gegenüberliegenden Gliedmaßen erzeugt ein Drehmoment, das Rumpf zu verdrehen und zu überstrecken droht, und die gesamte Aufgabe besteht darin, das zu verhindern. Es ist überkreuzte motorische Kontrolle — dasselbe Muster wie beim Gehen.',
    benefits: [
      'Kräftigt die Lendenstabilität ohne Druckbelastung der Wirbelsäule, was sie bei einem Wiedereinstieg meist gut verträglich macht.',
      'Trainiert die Überkreuzkoordination von gegenüberliegendem Arm und Bein, direkt aufs Gehen übertragbar.',
      'Deckt Asymmetrien sofort auf: Eine Seite ist oft merklich weniger stabil als die andere.',
    ],
    progression: {
      easier: 'Strecke eine Extremität nach der anderen, erst den Arm, dann das Bein.',
      harder: 'Verlängere das Halten, oder führe zwischen den Streckungen Knie und Ellenbogen unter dem Körper zusammen.',
      readyWhen:
        'Wenn zehn Wiederholungen pro Seite mit vollkommen ruhigem Becken gelingen, verlängere das Halten auf fünf Sekunden.',
    },
    precautions:
      'Eine Matte oder ein Kissen unter den Knien verhindert, dass Gelenkbeschwerden den Satz beenden, bevor die Muskeln ermüden.',
    imagePrompt:
      ART_DIRECTION +
      'Person on all fours, one arm extended forward and the opposite leg extended back, flat back, side view.',
  },

  catCow: {
    slug: 'katze-kuh',
    muscles: { primary: 'Wirbelsäule, Rückenbeweglichkeit' },
    steps: [
      'Gehe in den Vierfüßlerstand, die Hände unter den Schultern, die Knie unter den Hüften.',
      'Lass beim Einatmen den Rücken nach unten sinken und hebe den Kopf (die "Kuh"-Position).',
      'Runde beim Ausatmen den Rücken nach oben und schaue zum Nabel (die "Katzen"-Position).',
      'Wechsle langsam zwischen beiden Positionen, im Rhythmus deiner Atmung.',
    ],
    mistakes: [
      'Zu schnell, losgelöst von der Atmung.',
      'Den Bewegungsweg über die Bequemlichkeit hinaus erzwingen, besonders im unteren Rücken.',
      'Die Schultern einsinken lassen, statt in den Händen aktiv zu bleiben.',
    ],
    sensation:
      'Ein fortschreitendes Abrollen entlang der Wirbelsäule, Wirbel für Wirbel, statt einer Muskelanstrengung. Gesucht ist ein Gefühl von sich öffnender Beweglichkeit, keine Kontraktion.',
    rangeOfMotion:
      'Gehe in beide Richtungen bis ans Ende des Angenehmen, ohne je zu erzwingen. Der Bewegungsweg öffnet sich über die Wiederholungen von selbst: Es ist die einzige Übung hier, bei der der Tagesbereich während des Satzes selbst wachsen soll.',
    tempo:
      'Die Atmung gibt das Tempo vor, nicht umgekehrt: einatmen beim Absenken, ausatmen beim Runden. Rechne drei bis vier Sekunden pro Position, ohne Totzeit.',
    anatomy:
      'Das ist keine Kräftigungsübung. Rückenstrecker und Bauchmuskeln wechseln zwischen Kontraktion und Dehnung, um jedes Wirbelsegment zu mobilisieren. Die tiefen intersegmentalen Muskeln arbeiten über den gesamten Weg.',
    mechanics:
      'Aufeinanderfolgende Beugung und Streckung der Wirbelsäule in der Sagittalebene, ohne Last — das Körpergewicht ruht auf Händen und Knien, nicht auf der Wirbelsäule. Das erlaubt freies Mobilisieren ohne axialen Druck.',
    benefits: [
      'Stellt die segmentale Wirbelsäulenbeweglichkeit wieder her, die langes Sitzen versteift.',
      'Ist ein hervorragendes Aufwärmen vor jeder Rückenarbeit und ein sanfter Ausklang am Ende der Einheit.',
      'Koppelt Bewegung und Atmung ausdrücklich, was hilft, in anderen Übungen nicht die Luft anzuhalten.',
    ],
    precautions:
      'Es sollte kein Schmerz auftreten: Das ist Mobilität, keine erzwungene Dehnung. Bleibt ein Segment blockiert, verringere den Bewegungsweg, statt hineinzudrücken.',
    imagePrompt:
      ART_DIRECTION +
      'Person on all fours, back arched upwards then downwards, arrow showing the back-and-forth movement of the spine, side view.',
  },

  reverseLunge: {
    slug: 'ausfallschritt-rueckwaerts',
    muscles: { primary: 'Quadrizeps, Gesäß', secondary: 'Beinbeuger' },
    steps: [
      'Stelle dich hüftbreit hin.',
      'Setze ein Bein in einem langen Schritt nach hinten, die Brust bleibt aufrecht.',
      'Beuge beide Knie, bis das hintere Knie den Boden streift.',
      'Drücke dich über die Ferse des vorderen Beins zurück in die Ausgangsposition.',
      'Wiederhole auf der anderen Seite.',
    ],
    mistakes: [
      'Das vordere Knie wandert deutlich über die Zehen hinaus.',
      'Die Brust kippt nach vorn, statt aufrecht zu bleiben.',
      'Ein zu kurzer Schritt: verringert den Bewegungsweg und die Arbeit des Gesäßes.',
    ],
    sensation:
      'Quadrizeps und Gesäß des vorderen Beins, mit einer Dehnung vorne in der hinteren Hüfte. Das Gleichgewicht kostet dauernd Anstrengung: Das ist normal und Teil der Arbeit.',
    rangeOfMotion:
      'Senke dich, bis das hintere Knie den Boden streift, ohne aufzusetzen, das vordere Knie bei etwa 90°. Ein zu kurzer Schritt konzentriert alles auf das vordere Knie; ein zu langer macht die Rückkehr instabil.',
    tempo:
      'Zwei Sekunden abwärts, ein bis zwei aufwärts, mit einer kurzen Pause unten, um den Schwung herauszunehmen. Beim Drücken über die vordere Ferse ausatmen.',
    anatomy:
      'Quadrizeps und großer Gesäßmuskel des vorderen Beins leisten die meiste Arbeit. Der mittlere Gesäßmuskel stabilisiert das Becken in der Frontalebene — das verhindert das Einfallen des Knies. Der Psoas des hinteren Beins wird gedehnt, und die Bauchmuskeln halten den Oberkörper senkrecht.',
    mechanics:
      'Ein einbeiniger Ausfallschritt, der Beugung und Streckung von Hüfte und Knie in der Sagittalebene verbindet, mit hoher Anforderung an die frontale Stabilisierung. Nach hinten statt nach vorn zu treten verringert die Belastung des vorderen Knies: Dein Gewicht bleibt auf dem bereits stehenden Bein, statt vom vortretenden Bein abgebremst zu werden.',
    benefits: [
      'Fordert jedes Bein einzeln, was die Asymmetrien aufdeckt und korrigiert, die eine Kniebeuge verdeckt.',
      'Fordert Gleichgewicht und Hüftstabilisatoren stark, die für Gehen und Treppen wesentlich sind.',
      'Die Rückwärtsvariante ist deutlich knieschonender als der Ausfallschritt nach vorn, was besser zu einem Wiedereinstieg passt.',
    ],
    progression: {
      easier: 'Halte eine Hand an einer Wand oder Stuhllehne und verringere die Tiefe.',
      harder: 'Gehe tiefer, werde langsamer, oder stelle den vorderen Fuß auf eine kleine Stufe.',
      readyWhen:
        'Wenn zehn Wiederholungen pro Bein ohne Handstütze und ohne einfallendes Knie gelingen.',
    },
    precautions:
      'Das vordere Knie muss in Linie mit dem Fuß bleiben. Fällt es regelmäßig nach innen, fehlt Kraft im mittleren Gesäßmuskel: Arbeite parallel die Hüftabduktion im Stehen.',
    imagePrompt:
      ART_DIRECTION +
      'Person in a reverse lunge, rear leg bent close to the floor, front knee at 90°, chest upright, side view.',
  },

  stepUp: {
    slug: 'aufsteigen-auf-stuhl',
    muscles: { primary: 'Quadrizeps, Gesäß', secondary: 'Beinbeuger, Gleichgewicht' },
    steps: [
      'Stelle dich vor einen niedrigen, stabilen Stuhl, der fest auf dem Boden steht.',
      'Setze einen Fuß vollständig auf die Sitzfläche.',
      'Drücke über diesen Fuß, um den ganzen Körper auf den Stuhl zu bringen.',
      'Steige mit demselben Fuß kontrolliert wieder herunter, ohne dich fallen zu lassen.',
      'Wiederhole im Wechsel der Beine.',
    ],
    mistakes: [
      'Sich mit dem Bein am Boden abstoßen, statt mit dem Bein auf dem Stuhl zu drücken.',
      'Das Knie wandert beim Hochsteigen nach innen.',
      'Ein instabiler oder zu hoher Stuhl: Prüfe, dass er nicht kippt.',
    ],
    sensation:
      'Quadrizeps und Gesäß des drückenden Beins, beim Hoch- wie beim Heruntersteigen. Spürst du vor allem die Wade des Beins am Boden, stößt du dich damit ab, statt mit dem oberen Bein zu drücken.',
    rangeOfMotion:
      'Steige bis zur vollen Streckung des Standbeins und senke dich dann, bis der Fuß den Boden berührt, ohne das Gewicht darauf zu verlagern. Die Stufenhöhe bestimmt die Schwierigkeit: Wadenmitte zu Beginn, Kniehöhe für anspruchsvolle Arbeit.',
    tempo:
      'Ein bis zwei Sekunden hoch, zwei bis drei herunter. Das kontrollierte Absteigen ist der nützlichste und am häufigsten überhastete Teil — er bildet das Treppabgehen nach.',
    anatomy:
      'Der Quadrizeps des Beins auf der Stufe streckt das Knie, der große Gesäßmuskel streckt die Hüfte. Der mittlere Gesäßmuskel stabilisiert das Becken im Einbeinstand und verhindert, dass die Gegenhüfte absinkt. Die Waden tragen zum letzten Abdruck bei.',
    mechanics:
      'Einbeinige Hüft- und Kniestreckung in geschlossener Kette gegen die Schwerkraft, über die gesamte Stufenhöhe. Sie bildet das Treppensteigen exakt nach — eine der wenigen Übungen, deren Alltagsübertrag wörtlich ist.',
    benefits: [
      'Bildet eine Alltagshandlung direkt nach: Treppen, Bordstein oder das Einsteigen in ein hohes Fahrzeug.',
      'Belastet ein Bein nach dem anderen, was die relative Last ganz ohne Geräte verdoppelt.',
      'Die Absenkphase trainiert exzentrische Kontrolle, genau das, was fehlt, wenn Treppabgehen schwer wird.',
    ],
    progression: {
      easier: 'Wähle eine niedrigere Stufe und halte eine Hand zum Gleichgewicht.',
      harder: 'Nimm eine höhere Stufe, verlangsame das Absteigen, oder halte oben auf einem Bein inne.',
      readyWhen:
        'Wenn zehn Wiederholungen pro Bein ohne Handstütze und ohne Abstoßen mit dem Bodenbein gelingen, gehe eine Stufe höher.',
    },
    precautions:
      'Die Stabilität der Auflage ist nicht verhandelbar: Ein Stuhl, der rutscht oder kippt, macht diese Übung gefährlich. Eine Treppenstufe ist oft die bessere Wahl.',
    imagePrompt:
      ART_DIRECTION +
      'Person stepping up onto a stable chair, one foot on the seat mid-drive, side view.',
  },

  lateralLunge: {
    slug: 'seitlicher-ausfallschritt',
    muscles: { primary: 'Quadrizeps, Gesäß', secondary: 'Adduktoren' },
    steps: [
      'Stelle dich mit geschlossenen Füßen hin.',
      'Mache einen langen Schritt zur Seite.',
      'Beuge das Knie dieses Beins und schiebe die Hüfte zurück, das andere Bein bleibt gestreckt.',
      'Drücke dich über die Ferse des gebeugten Beins zurück in die Ausgangsposition.',
      'Wiederhole auf der anderen Seite.',
    ],
    mistakes: [
      'Das gebeugte Knie wandert nach innen, statt in Linie mit dem Fuß zu bleiben.',
      'Die Ferse des gebeugten Beins hebt vom Boden ab.',
      'Die Brust sackt nach vorn, statt aufrecht zu bleiben.',
    ],
    sensation:
      'Quadrizeps und Gesäß des gebeugten Beins, dazu eine deutliche Dehnung an der Innenseite des gestreckten Oberschenkels. Letzteres ist anfangs oft die auffälligste Empfindung: Die Adduktoren werden in diesem Bereich selten gefordert.',
    rangeOfMotion:
      'Senke dich so weit, wie es die Innenseite des Gegenoberschenkels zulässt, ohne dass die Ferse des gebeugten Beins abhebt. Anfangs ist die Adduktorendehnbarkeit die Grenze, nicht die Kraft — der Bereich öffnet sich von selbst.',
    tempo:
      'Zwei bis drei Sekunden abwärts, ein bis zwei aufwärts. Halte die Brust aufrecht und die Zehen auf beiden Seiten nach vorn gerichtet.',
    anatomy:
      'Quadrizeps und großer Gesäßmuskel des gebeugten Beins erzeugen die Bewegung. Die Adduktoren des gestreckten Beins arbeiten unter Dehnung, und der mittlere Gesäßmuskel stabilisiert das Becken. Die Bewegung verläuft in einer Ebene, die fast alle herkömmlichen Übungen auslassen.',
    mechanics:
      'Beugung und Streckung von Hüfte und Knie in der Frontalebene, anders als Kniebeuge und Ausfallschritt, die in der Sagittalebene bleiben. Genau diese Ausrichtung macht sie ergänzend: Sie rekrutiert Muskeln und Bereiche, die die anderen auslassen.',
    benefits: [
      'Fordert die Frontalebene, die große Abwesende gerätefreier Programme — daher ihr echter Wert trotz scheinbarer Überschneidung mit der Kniebeuge.',
      'Kräftigt Adduktoren und seitliche Hüftbeweglichkeit, nützlich gegen Stolpern und seitliches Gleichgewichtsverlieren.',
      'Verbessert die Fähigkeit, sich seitwärts zu bewegen, eine alltägliche Handlung, die sonst nie trainiert wird.',
    ],
    progression: {
      easier: 'Verkürze den Schritt und verringere die Tiefe, oder halte eine Hand an einer Stütze.',
      harder: 'Verbreitere den Schritt, gehe tiefer, oder verlangsame die Rückkehr.',
      readyWhen: 'Wenn zehn Wiederholungen pro Seite mit aufgesetzter Ferse und aufrechter Brust gelingen.',
    },
    precautions:
      'Bei Beschwerden an der Oberschenkelinnenseite den Schritt deutlich verkürzen: Adduktoren reagieren empfindlich, wenn zu früh der maximale Bereich gesucht wird.',
    imagePrompt:
      ART_DIRECTION +
      'Person in a lateral lunge, one leg bent and the other extended to the side, chest upright, front view.',
  },

  gluteBridge: {
    slug: 'gesaessbruecke',
    muscles: { primary: 'Gesäß', secondary: 'Beinbeuger, unterer Rücken' },
    steps: [
      'Lege dich auf den Rücken, die Knie gebeugt, die Füße nah am Gesäß aufgestellt.',
      'Drücke über die Fersen, um die Hüfte zur Decke zu heben.',
      'Spanne das Gesäß oben kräftig an, der Körper in Linie von den Knien bis zu den Schultern.',
      'Senke kontrolliert ab, ohne die Hüfte fallen zu lassen.',
    ],
    mistakes: [
      'Über die Zehen drücken statt über die Fersen.',
      'Den unteren Rücken überstrecken, statt mit einer Gesäßkontraktion abzuschließen.',
      'Nicht hoch genug heben: Oben sollte der Körper in Linie sein.',
    ],
    sensation:
      'Das Gesäß, deutlich, dazu etwas Beinbeuger. Arbeitet der untere Rücken mehr als das Gesäß, kommt die Hebung aus einem Hohlkreuz statt aus einer Hüftstreckung — der verbreitetste Fehler bei dieser Übung.',
    rangeOfMotion:
      'Hebe, bis Knie, Hüfte und Schultern in Linie sind, nicht höher. Weiter zu gehen fügt nur Hohlkreuz hinzu: Die Ausrichtung ist die nützliche Obergrenze.',
    tempo:
      'Zwei Sekunden hoch, ein bis zwei Sekunden oben angespannt, zwei bis drei herunter. Die Pause oben mit festem Gesäß trennt eine wirksame Brücke von einem bloßen Beckenschwingen.',
    anatomy:
      'Der große Gesäßmuskel ist der Hauptmotor: Er ist der kräftigste Hüftstrecker des Körpers. Die Beinbeuger helfen, der Rückenstrecker stabilisiert die Wirbelsäule, ohne die Bewegung erzeugen zu müssen, und die Bauchmuskeln verhindern ein übermäßiges Hohlkreuz oben.',
    mechanics:
      'Hüftstreckung in geschlossener Kette mit dem Rücken am Boden. Der Boden nimmt jede Gleichgewichtsanforderung heraus und entlastet die Wirbelsäule, wodurch sich der große Gesäßmuskel gezielt ansprechen lässt — im Stehen schwierig, wo Quadrizeps und Waden immer mitarbeiten.',
    benefits: [
      'Trifft den großen Gesäßmuskel direkter als die Kniebeuge, bei der der Quadrizeps einen großen Teil der Arbeit übernimmt.',
      'Wirkt der Gesäßhemmung entgegen, die langes Sitzen einprägt.',
      'Arbeitet ohne Last auf der Wirbelsäule, was sie oft zugänglich macht, wenn stehende Bewegungen es noch nicht sind.',
    ],
    progression: {
      easier: 'Verringere die Hubhöhe, oder stelle die Füße näher ans Gesäß.',
      harder: 'Gehe auf ein Bein über, das andere Knie zur Brust gezogen, oder verlängere die Anspannung oben auf fünf Sekunden.',
      readyWhen:
        'Wenn drei Sätze mit fünfzehn Wiederholungen mit fester Anspannung oben und ohne Krampf der Beinbeuger gelingen, wechsle auf ein Bein.',
    },
    precautions:
      'Ein Krampf in den Beinbeugern oben heißt meist, dass das Gesäß seinen Anteil nicht übernimmt: Stelle die Füße näher und konzentriere dich auf das Drücken über die Fersen.',
    imagePrompt:
      ART_DIRECTION +
      'Person lying on their back, knees bent, hips lifted into a bridge, glutes contracted, side view.',
  },

  donkeyKick: {
    slug: 'eselstritt',
    muscles: { primary: 'Gesäß', secondary: 'Rumpf' },
    steps: [
      'Gehe in den Vierfüßlerstand, die Hände unter den Schultern, die Knie unter den Hüften.',
      'Halte ein Knie im 90°-Winkel gebeugt und drücke diesen Fuß Richtung Decke.',
      'Spanne das Gesäß oben an, ohne den unteren Rücken zu überstrecken.',
      'Senke kontrolliert ab, ohne das Knie zwischen den Wiederholungen abzusetzen.',
      'Beende den Satz und wechsle die Seite.',
    ],
    mistakes: [
      'Den unteren Rücken überstrecken, um Höhe zu gewinnen.',
      'Zu schnell, das Bein schwingen statt es kontrolliert zu drücken.',
      'Der Oberkörper rotiert, statt parallel zum Boden zu bleiben.',
    ],
    sensation:
      'Das Gesäß des hebenden Beins, isoliert. Sackt der untere Rücken durch, um Höhe zu gewinnen, hat die Übung ihren Charakter geändert: Sie fordert dann nicht mehr das Gesäß, sondern die Lendenmuskulatur.',
    rangeOfMotion:
      'Hebe, bis der Oberschenkel die Linie des Rumpfes erreicht, nicht weiter. Der Haltepunkt liegt dort, wo das Becken zu kippen begänne — oft viel tiefer, als man denkt.',
    tempo:
      'Zwei Sekunden zum Drücken, eine Sekunde oben angespannt, zwei Sekunden herunter, ohne das Knie abzusetzen. Die Bewegung muss gedrückt, nie geschwungen werden.',
    anatomy:
      'Der große Gesäßmuskel streckt die Hüfte, wobei das Knie gebeugt bleibt, um die Beinbeuger zu verkürzen und sie am Übernehmen zu hindern. Der mittlere Gesäßmuskel und die schrägen Bauchmuskeln der Gegenseite stabilisieren das Becken gegen Rotation.',
    mechanics:
      'Hüftstreckung in offener Kette bei gebeugtem Knie. Das Knie gebeugt zu halten ist eine bewusste mechanische Einschränkung: Sie versetzt die Beinbeuger in aktive Insuffizienz und konzentriert die Streckung auf den großen Gesäßmuskel.',
    benefits: [
      'Isoliert das Gesäß mit sehr wenig Hilfe anderer Gruppen, was ohne Geräte selten ist.',
      'Lehrt die Trennung von Hüftstreckung und Lendenhohlkreuz — eine Unterscheidung, die sich in jeder anderen Übung der hinteren Kette auszahlt.',
      'Belastet die Wirbelsäule nicht, da der Vierfüßlerstand das Körpergewicht auf vier Auflagepunkte verteilt.',
    ],
    progression: {
      easier: 'Verringere den Bewegungsweg und konzentriere dich auf die Kontraktion statt auf die Höhe.',
      harder: 'Verlängere die Anspannung oben, oder stütze dich auf die Unterarme, was die Stabilisierungsanforderung erhöht.',
      readyWhen:
        'Wenn fünfzehn Wiederholungen pro Seite ohne Durchsacken des unteren Rückens und ohne Beckenrotation gelingen.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person on all fours, one bent knee pushed towards the ceiling, flat back, rear three-quarter view.',
  },

  hipAbduction: {
    slug: 'hueftabduktion-im-stehen',
    muscles: { primary: 'Mittlerer Gesäßmuskel (Hüftseite)' },
    steps: [
      'Stelle dich hin und stütze dich bei Bedarf leicht an Stuhl oder Wand ab.',
      'Halte das Standbein leicht gebeugt und die Brust aufrecht.',
      'Hebe das andere Bein gestreckt zur Seite, ohne den Oberkörper zu neigen.',
      'Senke kontrolliert ab, ohne den Fuß fallen zu lassen.',
      'Beende den Satz und wechsle das Bein.',
    ],
    mistakes: [
      'Den Oberkörper zur Gegenseite neigen, um Höhe zu gewinnen: Das ist Schummeln, keine zusätzliche Wirkung.',
      'Das Bein nach vorn schwingen, statt es genau zur Seite zu heben.',
      'Zu schnell, schwungvoll.',
    ],
    sensation:
      'An der Hüftseite, oberhalb des Gelenks — ein Bereich, den wenige Übungen erreichen. Im Standbein eine ruhige, aber reale stabilisierende Anstrengung.',
    rangeOfMotion:
      'Hebe das Bein auf etwa 30-45°, nicht mehr. Darüber hinaus übernimmt der Quadratus lumborum, indem er den Oberkörper neigt: Der scheinbare Bewegungsweg wächst, die Arbeit des mittleren Gesäßmuskels nicht.',
    tempo:
      'Zwei Sekunden hoch, eine Sekunde oben, zwei Sekunden herunter. Dieser Muskel spricht besser auf Kontrolle und Umfang an als auf Tempo.',
    anatomy:
      'Der mittlere Gesäßmuskel ist der Hauptmotor, unterstützt vom kleinen Gesäßmuskel und vom Tensor fasciae latae. Im Standbein arbeiten dieselben Muskeln isometrisch, um zu verhindern, dass das Becken auf der gehobenen Seite absinkt.',
    mechanics:
      'Hüftabduktion in der Frontalebene, in offener Kette auf der Arbeitsseite und als isometrische Stabilisierung auf der Standseite. Beide Hüften arbeiten also gleichzeitig, aber auf zwei verschiedene Arten — ein oft übersehener Punkt.',
    benefits: [
      'Kräftigt den mittleren Gesäßmuskel, dessen Schwäche eine häufige Ursache für einfallende Knie bei Kniebeugen, Ausfallschritten und beim Treppabgehen ist.',
      'Verbessert die Einbeinstabilität, also die Hälfte jedes Gehschritts.',
      'Ergänzt Kniebeugen und Ausfallschritte direkt, indem sie das korrigiert, was diese zerfallen lässt.',
    ],
    progression: {
      easier: 'Halte dich mit beiden Händen fest und verringere den Bewegungsweg.',
      harder:
        'Lass die Stütze los, verlängere das Halten oben, oder gehe in die Seitenlage, um jede Ausweichbewegung auszuschließen.',
      readyWhen: 'Wenn fünfzehn Wiederholungen pro Seite ohne Stütze und ohne Oberkörperneigung gelingen.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person standing, one straight leg lifted out to the side, chest upright, arrow showing the sideways movement, front view.',
  },

  sidePlank: {
    slug: 'seitstuetz',
    muscles: { primary: 'Schräge Bauchmuskeln, seitlicher Rumpf' },
    steps: [
      'Lege dich auf die Seite, gestützt auf den Unterarm, der unter der Schulter liegt.',
      'Lege die Füße übereinander, oder versetze sie für mehr Stabilität.',
      'Hebe die Hüfte vom Boden, um den Körper gerade auszurichten.',
      'Halte die Position bei normaler Atmung, ohne die Hüfte absinken zu lassen.',
      'Beende den Satz und wechsle die Seite.',
    ],
    mistakes: [
      'Die Hüfte sinkt während des Haltens Richtung Boden.',
      'Die Schulter sackt Richtung Ohr, statt über dem Ellenbogen zu bleiben.',
      'Der Körper rotiert nach vorn oder hinten.',
    ],
    sensation:
      'Die Rumpfseite, zwischen Rippen und Hüfte, auf der Bodenseite. Die Stützschulter arbeitet mit: Sackt sie Richtung Ohr, drücke den Boden aktiv weg, um sie stabil zu halten.',
    rangeOfMotion:
      'Kein Bewegungsweg, eine Ausrichtung: Ohr, Schulter, Hüfte und Knöchel auf einer Linie, von vorn gesehen. Die Hüfte ist der Punkt, der zuerst nachgibt — auf sie ist zu achten.',
    tempo:
      'Ein durchgehendes Halten bei normaler Atmung. Wie beim normalen Unterarmstütz ist das Abbruchkriterium die Position, nicht die Uhr: Sobald die Hüfte absinkt, ist der Satz vorbei.',
    anatomy:
      'Die inneren und äußeren schrägen Bauchmuskeln der Bodenseite tragen das Halten, unterstützt vom Quadratus lumborum. Der mittlere Gesäßmuskel stabilisiert das Becken in der Frontalebene, und der vordere Sägemuskel hält das Stützschulterblatt flach an den Rippen.',
    mechanics:
      'Ein isometrisches Anti-Seitneigen: Die Schwerkraft zieht die Hüfte zum Boden, und die seitliche Kette verhindert es. Es ist die direkte Ergänzung zum normalen Unterarmstütz, der diese Ebene kaum fordert.',
    benefits: [
      'Fordert die seitliche Kette, die der normale Unterarmstütz und die meisten Bauchübungen vergessen.',
      'Kräftigt die Beckenstabilität im Einbeinstand, was sich aufs Gehen und aufs einseitige Tragen überträgt.',
      'Macht Links-rechts-Asymmetrien sehr sichtbar: Die Haltezeit unterscheidet sich oft deutlich.',
    ],
    progression: {
      easier: 'Beuge die Knie und stütze dich auf sie statt auf die Füße: Der Hebel verkürzt sich stark.',
      harder: 'Verlängere die Dauer, hebe den freien Arm zur Decke, oder hebe das obere Bein.',
      readyWhen:
        'Wenn dreißig Sekunden pro Seite ohne Absinken der Hüfte gelingen, erhöhe die Komplexität, statt endlos zu verlängern.',
    },
    precautions:
      'Der Ellenbogen muss genau unter der Schulter liegen. Zu weit vorn oder hinten verlagert sich die Belastung auf das Gelenk, statt im Muskel zu bleiben.',
    imagePrompt:
      ART_DIRECTION +
      'Person in a side plank, resting on one forearm, body in a straight line from feet to head, other arm raised, front view.',
  },

  standingKneeRaise: {
    slug: 'knieheben-im-stehen',
    muscles: { primary: 'Rumpf, Hüftbeuger' },
    steps: [
      'Stelle dich hüftbreit hin.',
      'Hebe ein Knie zur Brust, den Rücken gerade.',
      'Halte oben kurz inne, den Rumpf angespannt.',
      'Senke kontrolliert ab und wiederhole, oder wechsle die Seiten.',
    ],
    mistakes: [
      'Der Rücken rundet sich, um das Knie höher zu heben.',
      'Sich nach hinten lehnen als Ausgleich, statt die Brust aufrecht zu halten.',
      'Eine geschwungene statt kontrollierte Bewegung.',
    ],
    sensation:
      'Der Unterbauch und die Hüftvorderseite der hebenden Seite, mit einer Gleichgewichtsanstrengung im Standbein. Geht der Rücken ins Hohlkreuz oder kippt die Brust zurück, hält der Rumpf das Becken nicht mehr.',
    rangeOfMotion:
      'Hebe das Knie auf Hüfthöhe, nicht mehr. Höher zu gehen kippt das Becken nach hinten und verlagert die Arbeit von den Hüftbeugern in den unteren Rücken.',
    tempo:
      'Ein bis zwei Sekunden hoch, kurz oben halten, zwei Sekunden herunter. Das kontrollierte Absenken zählt genauso viel wie das Heben.',
    anatomy:
      'Der Iliopsoas und der gerade Oberschenkelmuskel beugen die Hüfte. Die Bauchmuskeln, besonders der Transversus, verhindern das Kippen des Beckens — diese Kokontraktion trennt eine echte stehende Rumpfübung von einem bloßen Knieheben.',
    mechanics:
      'Hüftbeugung in offener Kette, verdoppelt durch eine Einbein-Stabilisierungsanforderung. Das Stehen fügt eine Gleichgewichtsanforderung hinzu, die der Rumpfarbeit am Boden fehlt, und bringt sie damit näher an die realen Bedingungen des Gehens.',
    benefits: [
      'Fordert den Rumpf im Stehen, also dort, wo er seine Aufgabe tatsächlich erfüllt.',
      'Trainiert das Einbeingleichgewicht, direkt verbunden mit der Gehstabilität.',
      'Braucht keinen sauberen Boden und keine Matte: in Straßenkleidung und überall durchführbar.',
    ],
    progression: {
      easier: 'Halte eine Hand leicht an einer Wand oder Stuhllehne.',
      harder: 'Lass die Stütze los, schließe die Augen, oder verlängere das Halten oben.',
      readyWhen: 'Wenn fünfzehn Wiederholungen pro Bein ohne Stütze und ohne Zurücklehnen gelingen.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person standing, one knee lifted towards the chest, straight back, arms balanced, side view.',
  },

  crunch: {
    slug: 'crunch',
    muscles: { primary: 'Bauchmuskeln (gerader Bauchmuskel)' },
    steps: [
      'Lege dich auf den Rücken, die Knie gebeugt, die Füße auf dem Boden.',
      'Lege die Hände locker hinter die Ohren oder kreuze sie auf der Brust, ohne am Nacken zu ziehen.',
      'Hebe die Schulterblätter beim Ausatmen vom Boden ab und spanne die Bauchmuskeln an.',
      'Senke kontrolliert ab, bis du den Boden streifst, ohne dein Gewicht ganz abzulegen.',
    ],
    mistakes: [
      'Mit den Händen am Kopf ziehen, um höher zu kommen: belastet den Nacken statt die Bauchmuskeln.',
      'Ganz bis zum Sitzen hochkommen: Das ist kein Crunch mehr, und die Wirkung auf die Bauchmuskeln sinkt.',
      'Die Luft anhalten, statt während der Kontraktion auszuatmen.',
    ],
    sensation:
      'Die obere Bauchwand, über einen kurzen Weg. Spannung im Nacken heißt immer, dass die Hände am Kopf ziehen: Sie sollen ihn nur begleiten.',
    rangeOfMotion:
      'Hebe die Schulterblätter vom Boden ab, mehr nicht. Bis zum Sitzen weiterzugehen verlagert die Arbeit auf die Hüftbeuger — der kurze Weg ist kein Zugeständnis, sondern die richtige Bewegung.',
    tempo:
      'Zwei Sekunden hoch beim Ausatmen, zwei Sekunden herunter beim Einatmen, ohne unten ganz loszulassen, damit die Spannung bleibt.',
    anatomy:
      'Der gerade Bauchmuskel zieht das Brustbein zum Becken: Das ist der Motor der Bewegung. Die schrägen Bauchmuskeln tragen zur Stabilisierung bei. Der Psoas greift kaum ein, solange der Weg kurz bleibt — genau das unterscheidet einen Crunch von einem vollen Sit-up.',
    mechanics:
      'Wirbelsäulenbeugung in der Sagittalebene, über einen bewusst begrenzten Weg. Die Bewegung setzt die Lendenwirbelsäule wiederholter Beugung aus: Deshalb ergänzt sie Antiextensions-Arbeit wie Unterarmstütz oder Dead Bug, ersetzt sie aber nie.',
    benefits: [
      'Spricht den geraden Bauchmuskel direkt an, was isometrische Rumpfübungen nicht tun.',
      'Kurzer Weg und Bodenlage machen ihn zu einer der zugänglichsten Arten, Baucharbeit wieder aufzunehmen.',
      'Verbindet sich gut mit Unterarmstütz und Dead Bug, die Stabilisierung statt Beugung trainieren.',
    ],
    progression: {
      easier: 'Kreuze die Arme auf der Brust statt hinter dem Kopf, und verringere den Bewegungsweg.',
      harder: 'Werde langsamer, halte oben inne, oder strecke die Arme über den Kopf.',
      readyWhen: 'Wenn drei Sätze mit zwanzig Wiederholungen ohne Zug am Nacken gelingen.',
    },
    precautions:
      'Wiederholte Wirbelsäulenbeugung passt nicht zu jedem. Bei Empfindlichkeit im unteren Rücken sind Dead Bug und Unterarmstütz vorzuziehen, die Baucharbeit ohne Beugung der Wirbelsäule erzeugen.',
    imagePrompt:
      ART_DIRECTION +
      'Person lying on their back, knees bent, shoulders lifted slightly off the floor in an abdominal contraction, side view.',
  },

  highKneeMarch: {
    slug: 'knieheben-marsch-auf-der-stelle',
    muscles: { primary: 'Herz-Kreislauf, Hüftbeuger' },
    steps: [
      'Stelle dich hüftbreit hin.',
      'Hebe ein Knie auf Hüfthöhe und setze den Fuß kontrolliert wieder ab.',
      'Wechsle die Beine in gleichmäßigem Rhythmus, wie ein Marsch auf der Stelle.',
      'Halte die Brust aufrecht und lass die Arme mitgehen.',
    ],
    mistakes: [
      'Ein überhasteter Rhythmus, der Kontrolle und Gleichgewicht kostet.',
      'Die Brust lehnt sich zurück, um das Knie höher zu bekommen.',
      'Bei jedem Schritt schwer auf dem Fuß landen.',
    ],
    sensation:
      'Zunehmende Atemnot, dazu Arbeit in den Hüftvorderseiten und den Waden. Das ist eine Herz-Kreislauf-Übung, keine Kraftübung: Die Ermüdung sollte eher die Atmung als die Muskeln betreffen.',
    rangeOfMotion:
      'Knie auf Hüfthöhe, der Fuß zwischen den Hebungen vollständig abgesetzt. Höher zu heben bringt der Herz-Kreislauf-Arbeit nichts und kippt das Becken.',
    tempo:
      'Ein gleichmäßiger Rhythmus, den du über die gesamte geplante Dauer halten kannst, keine Beschleunigung mit anschließendem Einbruch. Die Arme bewegen sich natürlich, gegengleich zu den Beinen.',
    anatomy:
      'Der Iliopsoas und der gerade Oberschenkelmuskel beugen die Hüfte, die Waden übernehmen Antrieb und Landung. Die Bauchmuskeln stabilisieren das Becken bei jedem Aufsetzen, und der mittlere Gesäßmuskel des Standbeins verhindert das Absinken der Gegenhüfte.',
    mechanics:
      'Fortbewegung auf der Stelle, ohne Ortsveränderung und ohne Flugphase: Jeder Fuß kehrt zum Boden zurück, bevor der andere ihn verlässt. Dieses Fehlen einer Schwebephase nimmt den Aufprall heraus, was sie klar vom Kniehebelauf unterscheidet.',
    benefits: [
      'Hebt die Herzfrequenz ohne Ortsveränderung und ohne Geräte, auf einem einzigen Quadratmeter.',
      'Dient als vollständiges Aufwärmen zu Beginn der Einheit oder als Herz-Kreislauf-Schub zwischen zwei Kraftübungen.',
      'Ohne Aufprall, anders als Springen: in einer Wohnung durchführbar und mit einem Wiedereinstieg vereinbar.',
    ],
    progression: {
      easier: 'Senke Knie und Rhythmus, bis hin zu einem einfachen Marsch auf der Stelle.',
      harder: 'Erhöhe den Rhythmus, verlängere die Dauer, oder füge eine Armbewegung über Kopf hinzu.',
      readyWhen:
        'Wenn zwei Runden von sechzig Sekunden ohne deutliche Atemnot gelingen, verlängere die Dauer.',
    },
    imagePrompt:
      ART_DIRECTION +
      'Person marching on the spot, one knee lifted to hip height, arms in motion, side view.',
  },

  buttKickMarch: {
    slug: 'anfersen-auf-der-stelle',
    muscles: { primary: 'Herz-Kreislauf, Beinbeuger' },
    steps: [
      'Stelle dich hüftbreit hin.',
      'Beuge ein Knie, um die Ferse Richtung Gesäß zu bringen.',
      'Setze den Fuß kontrolliert ab und wiederhole auf der anderen Seite.',
      'Halte einen moderaten, gleichmäßigen Rhythmus, wie ein Marsch auf der Stelle.',
    ],
    mistakes: [
      'Ein zu schneller Rhythmus, der den Bewegungsumfang verkleinert.',
      'Die Brust kippt während der Übung nach vorn.',
      'Die Ferse kommt nicht weit genug hoch: verringert den Sinn der Bewegung.',
    ],
    sensation:
      'Mäßige Atemnot und Arbeit in den Oberschenkelrückseiten. Es ist das natürliche Gegenstück zum Knieheben-Marsch: Wo jener die Hüftvorderseite fordert, mobilisiert dieser die Oberschenkelrückseite.',
    rangeOfMotion:
      'Bringe die Ferse so nah ans Gesäß, wie es die Beweglichkeit zulässt, ohne dass das Knie nach vorn wandert oder das Becken kippt. Die Brust bleibt durchgehend aufrecht.',
    tempo:
      'Ein moderater, gleichmäßiger Rhythmus. Ziel sind Ausdauer und Mobilisierung, nicht Höchsttempo: Zu schnell verkleinert sich der Bewegungsumfang, und die Übung verliert ihren Sinn.',
    anatomy:
      'Die Beinbeuger beugen das Knie — ihre Hauptfunktion, und eine, die ohne Geräte selten trainiert wird. Das Gesäß hält die Hüftstreckung, und die Bauchmuskeln verhindern ein ausgleichendes Hohlkreuz.',
    mechanics:
      'Wiederholte Kniebeugung in offener Kette, im Wechsel, ohne Aufprall und ohne Flugphase. Das Stehen fügt bei jedem Aufsetzen eine Einbein-Gleichgewichtskomponente hinzu, die der entsprechenden Bodenarbeit fehlt.',
    benefits: [
      'Spricht die Beinbeuger in der Beugung an, was keine andere gerätefreie Übung dieser Bibliothek direkt tut.',
      'Ergänzt den Knieheben-Marsch, um Vorder- und Rückseite des Oberschenkels auszugleichen.',
      'Ein hervorragendes Aufwärmen vor jeder Beinarbeit, und ohne Aufprall.',
    ],
    progression: {
      easier: 'Werde langsamer und verringere den Bewegungsweg, bis hin zu einem einfachen Marsch auf der Stelle.',
      harder: 'Erhöhe das Tempo leicht, verlängere die Dauer, oder halte mit der Ferse am Gesäß kurz inne.',
      readyWhen: 'Wenn zwei Runden von sechzig Sekunden mit durchgehend vollem Bewegungsumfang gelingen.',
    },
    precautions:
      'Ein Krampf in der Oberschenkelrückseite deutet meist auf unzureichendes Aufwärmen hin: Beginne mit einem einfachen Marsch auf der Stelle, bevor du den Bewegungsumfang hinzunimmst.',
    imagePrompt:
      ART_DIRECTION +
      'Person marching on the spot, one heel drawn up towards the glute, chest upright, side view.',
  },
};
