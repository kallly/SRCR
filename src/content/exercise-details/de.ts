// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

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
      'Der Fortschritt wird in Sekunden gemessen, einer klareren Einheit als "eine Wiederholung mehr", um den Fortschritt zu verfolgen.',
    ],
    progression: {
      easier: 'Öffne den Kniewinkel auf 110-120°, oder teile die Zeit in zwei kürzere Halten auf.',
      harder: 'Arbeite auf 90° hin, verlängere die Dauer, oder hebe leicht eine Ferse und dann die andere.',
      readyWhen:
        'Wenn drei Halten von sechzig Sekunden bei 90° gelingen, ohne dass sich der Rücken löst, verlängere weiter oder gehe zu einer dynamischen Belastung über.',
    },
    precautions:
      'Wenn das Knie zieht, öffne zuerst den Winkel. Diese Übung lässt sich leicht sanfter machen; es bringt nichts, sie so auszuhalten.',
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
      'Zyklische Fortbewegung in wechselnder geschlossener Kette: Jedes Bein durchläuft eine Stand- und eine Schwungphase. Anders als beim Laufen ist immer ein Fuß am Boden — dieses Fehlen einer Flugphase nimmt den Aufprall heraus und macht Gehen täglich durchführbar.',
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
      'Funktioniert überall, ohne Geräte und ohne sauberen Boden, was ihn zu einem guten Ausgangspunkt für das Drücken macht.',
    ],
    progression: {
      easier: 'Gehe mit den Füßen näher an die Wand, bis du fast aufrecht stehst.',
      harder: 'Gehe mit den Füßen zurück und dann zu einer niedrigeren Auflage über: eine Arbeitsplatte, dann ein Stuhl.',
      readyWhen:
        'Wenn drei Sätze mit fünfzehn Wiederholungen leicht fallen, wechsle zu einer niedrigeren Auflage, statt Wiederholungen hinzuzufügen.',
    },
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
      'Kräftigt die Lendenstabilität ohne Druckbelastung der Wirbelsäule, was sie auch bei empfindlichem Rücken meist gut verträglich macht.',
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
      'Die Rückwärtsvariante ist deutlich knieschonender als der Ausfallschritt nach vorn, was besser zu einem empfindlichen Knie passt.',
    ],
    progression: {
      easier: 'Halte eine Hand an einer Wand oder Stuhllehne und verringere die Tiefe.',
      harder: 'Gehe tiefer, werde langsamer, oder stelle den vorderen Fuß auf eine kleine Stufe.',
      readyWhen:
        'Wenn zehn Wiederholungen pro Bein ohne Handstütze und ohne einfallendes Knie gelingen.',
    },
    precautions:
      'Das vordere Knie muss in Linie mit dem Fuß bleiben. Fällt es regelmäßig nach innen, fehlt Kraft im mittleren Gesäßmuskel: Arbeite parallel die Hüftabduktion im Stehen.',
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
      'Ohne Aufprall, anders als Springen: in einer Wohnung und zu jeder Uhrzeit durchführbar.',
    ],
    progression: {
      easier: 'Senke Knie und Rhythmus, bis hin zu einem einfachen Marsch auf der Stelle.',
      harder: 'Erhöhe den Rhythmus, verlängere die Dauer, oder füge eine Armbewegung über Kopf hinzu.',
      readyWhen:
        'Wenn zwei Runden von sechzig Sekunden ohne deutliche Atemnot gelingen, verlängere die Dauer.',
    },
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
  },

  bandPullApart: {
    slug: 'band-pull-apart',
    muscles: { primary: 'Hintere Schulter, Rhomboiden', secondary: 'Mittlerer Trapezmuskel' },
    steps: [
      'Halte das Band mit beiden Händen, Arme vor dem Körper auf Brusthöhe gestreckt, bereits mit leichter Spannung.',
      'Ziehe die Arme auseinander, Ellbogen gestreckt, bis das Band die Brust berührt.',
      'Ziehe die Schulterblätter am Ende der Bewegung zueinander.',
      'Kehre langsam zur Ausgangsposition zurück und kontrolliere dabei die Bandspannung.',
    ],
    mistakes: [
      'Ellbogen beugen sich beim Auseinanderziehen: Das macht aus der Bewegung ein Rudern und reduziert die Arbeit der hinteren Schulter.',
      'Schwung aus dem Oberkörper, um die Arme auseinanderzuziehen.',
      'Ruckartiges Nachlassen beim Zurückkehren statt die Bandspannung zu kontrollieren.',
    ],
    sensation:
      'Die Arbeit soll zwischen den Schulterblättern und an der Schulterrückseite spürbar sein, nicht in Unterarmen oder Bizeps. Spannung im oberen Trapezmuskel zeigt, dass die Schultern hochziehen statt unten zu bleiben.',
    rangeOfMotion:
      'Ziehe die Arme auseinander, bis das Band die Brust oder den oberen Oberkörper berührt, nicht weiter: darüber hinaus fällt die Spannung ab und die Schultern übernehmen.',
    tempo:
      'Ein bis zwei Sekunden zum Auseinanderziehen, zwei bis drei zum kontrollierten Zurückkehren. Ausatmen beim Auseinanderziehen, einatmen beim Zurückkehren.',
    anatomy:
      'Die hintere Schulter und die Rhomboiden ziehen die Schulterblätter zur Wirbelsäule, der mittlere und untere Trapezmuskel stabilisieren das Schulterblatt gegen den Brustkorb. Die Ellbogenstrecker bleiben isometrisch angespannt, um die Arme durchgehend gestreckt zu halten.',
    mechanics:
      'Horizontale Schulterabduktion in der Transversalebene gegen wachsenden Widerstand: Die Bandspannung ist bei ausgestreckten Armen vor dem Körper am geringsten und bei auseinandergezogenen Armen am größten — das Gegenteil einer Körpergewichtsbelastung, die über den gesamten Bewegungsumfang konstant bleibt.',
    benefits: [
      'Stärkt die Schulterrückseite, die im Alltag im Vergleich zur Vorderseite oft zu kurz kommt.',
      'Gleicht die Schultern aus, wenn bereits mehrere Druckbewegungen (Liegestütze, Drücken) in der Einheit enthalten sind.',
      'Braucht nur ein Band und einen Quadratmeter Platz.',
    ],
    progression: {
      easier: 'Nimm ein schwächeres Band, oder halte es breiter, um den Widerstand zu verringern.',
      harder: 'Nimm ein stärkeres Band, oder verlangsame die Rückkehr auf vier Sekunden.',
      readyWhen: 'Wenn drei Sätze zu fünfzehn gelingen, ohne dass die Schultern Richtung Ohren hochziehen.',
    },
    precautions:
      'Brich die Bewegung ab, wenn Schmerz an der Schultervorderseite statt zwischen den Schulterblättern auftritt: das zeigt eine falsche Schulterposition an.',
  },

  bandSquat: {
    slug: 'kniebeuge-mit-band',
    muscles: { primary: 'Quadrizeps, Gesäß', secondary: 'Mittlerer Gesäßmuskel, hintere Oberschenkelmuskulatur' },
    steps: [
      'Lege das Band direkt über die Knie, Füße hüftbreit auseinander.',
      'Schiebe die Hüfte nach hinten und senke dich wie bei einer normalen Kniebeuge ab, die Knie drücken das Band nach außen.',
      'Senke dich ab, bis die Oberschenkel nahezu waagerecht sind, Gewicht auf den Fersen.',
      'Drücke dich über die Fersen zurück zur vollen Streckung, ohne die Knie nach innen fallen zu lassen.',
    ],
    mistakes: [
      'Die Knie fallen nach innen, statt das Band nach außen zu drücken.',
      'Unkontrolliertes Absenken, wodurch das Band die Knie ruckartig nach innen zieht.',
      'Der Oberkörper kippt zu weit nach vorne.',
    ],
    sensation:
      'Die Arbeit soll an der Oberschenkelvorderseite und seitlich am Gesäß spürbar sein, das aktiv gegen das Band nach außen drückt. Spannung im Knie zeigt, dass die Knie-Fuß-Ausrichtung nicht gehalten wird.',
    rangeOfMotion:
      'Senke dich ab, bis die Oberschenkel nahezu waagerecht sind, ohne das hinauszugehen, was eine bequeme Hüftbeweglichkeit erlaubt.',
    tempo:
      'Drei Sekunden zum Absenken, ein bis zwei zum Hochkommen. Einatmen beim Absenken, ausatmen beim Hochdrücken über die Fersen.',
    anatomy:
      'Quadrizeps und großer Gesäßmuskel bleiben die Hauptmotoren der Kniebeuge; das Band fügt einen seitlichen Widerstand hinzu, den der mittlere Gesäßmuskel durchgehend ausgleichen muss, um das Einknicken des Knies zu verhindern — etwas, das eine Kniebeuge ohne Band nicht in gleicher Weise fordert.',
    mechanics:
      'Doppelte Beugung, dann doppelte Streckung von Hüfte und Knie in der Sagittalebene, kombiniert mit einem Widerstand gegen Hüftabduktion durch das Band in der Frontalebene.',
    benefits: [
      'Erweitert die klassische Kniebeuge um aktive Arbeit des mittleren Gesäßmuskels, nützlich für die Kniestabilität beim Gehen und Laufen.',
      'Gibt sofortiges taktiles Feedback zur Knieausrichtung: Lässt das Band nach, ist das Knie eingeknickt.',
      'Leichtes, günstiges Equipment, leicht mitzunehmen.',
    ],
    progression: {
      easier: 'Nimm ein weniger widerstandsfähiges Band, oder verringere die Tiefe.',
      harder: 'Nimm ein widerstandsfähigeres Band, oder füge unten eine Pause von zwei Sekunden hinzu.',
      readyWhen: 'Wenn drei Sätze zu fünfzehn gelingen, ohne dass das Band jemals nachlässt.',
    },
    precautions:
      'Wähle einen Widerstand, bei dem die Knie über den ganzen Satz ausgerichtet bleiben: ein zu starkes Band, das sie nach innen zwingt, ist kontraproduktiv.',
  },

  dumbbellGobletSquat: {
    slug: 'goblet-squat',
    muscles: { primary: 'Quadrizeps, Gesäß', secondary: 'Rumpf, oberer Rücken' },
    steps: [
      'Halte eine Kurzhantel senkrecht mit beiden Händen vor der Brust, Ellbogen zeigen nach unten.',
      'Füße etwas breiter als hüftbreit, Zehen leicht nach außen.',
      'Senke dich ab, indem du die Hüfte nach hinten schiebst, Ellbogen streifen die Innenseite der Knie.',
      'Drücke dich über die Fersen zurück zur vollen Beinstreckung.',
    ],
    mistakes: [
      'Der Oberkörper fällt unter dem Gewicht der Kurzhantel nach vorne zusammen.',
      'Die Fersen heben beim Absenken vom Boden ab.',
      'Unvollständige Tiefe wegen mangelnder Knöchelbeweglichkeit statt bewusster Wahl.',
    ],
    sensation:
      'Die Arbeit soll an der Oberschenkelvorderseite und im Gesäß spürbar sein, dazu eine isometrische Spannung im oberen Rücken und in den Unterarmen, die die Kurzhantel halten. Der Oberkörper soll von Anfang bis Ende aufrecht bleiben.',
    rangeOfMotion:
      'Senke dich ab, bis die Ellbogen die Innenseite der Knie berühren oder streifen: Das Halten der Last vor dem Körper erlaubt natürlicherweise eine tiefere Kniebeuge als mit freien Händen.',
    tempo:
      'Zwei bis drei Sekunden zum Absenken, ein bis zwei zum Hochkommen. Einatmen beim Absenken, ausatmen beim Hochdrücken über die Fersen.',
    anatomy:
      'Quadrizeps und großer Gesäßmuskel bleiben die Hauptmotoren; das Halten der Last vor der Brust zwingt die Rückenstrecker und die Bauchmuskeln, den Oberkörper gegen die Neigung nach vorne zu kippen aufrecht zu halten — eine Rumpfarbeit, die eine Kniebeuge ohne Gewicht nicht im gleichen Maß fordert.',
    mechanics:
      'Doppelte Beugung, dann doppelte Streckung von Hüfte und Knie in der Sagittalebene. Die Last nah am Körperschwerpunkt, vor der Brust, hält den Oberkörper aufrechter als eine Kniebeuge mit Last auf dem Rücken.',
    benefits: [
      'Fügt einer bereits mit Körpergewicht beherrschten Bewegung eine progressive äußere Last hinzu — der logische nächste Schritt, wenn die Kniebeuge mit Stuhl leichtfällt.',
      'Die Lastposition vor der Brust vermittelt eine aufrechte Kniebeugehaltung, nützlich für alle künftigen belasteten Kniebeugen.',
      'Braucht nur eine einzige Kurzhantel oder ein gleichwertiges Gewicht (eine beschwerte Flasche, eine Kettlebell).',
    ],
    progression: {
      easier: 'Nimm eine leichtere Last, oder kehre zeitweise zur Kniebeuge mit Stuhl ohne Gewicht zurück.',
      harder: 'Steigere die Last schrittweise, oder verlangsame das Absenken auf vier Sekunden.',
      readyWhen: 'Wenn drei Sätze zu zehn gelingen, bei denen der Oberkörper aufrecht bleibt und die Fersen nie abheben.',
    },
    precautions:
      'Steigere die Last in kleinen Schritten: Tiefe und Kontrolle sollen zuerst intakt bleiben, nicht die Zahl auf der Kurzhantel.',
  },

  dumbbellRow: {
    slug: 'einarmiges-kurzhantelrudern',
    muscles: { primary: 'Breiter Rückenmuskel, Trapezmuskel', secondary: 'Bizeps, Rumpf' },
    steps: [
      'Stütze ein Knie und die gleichseitige Hand auf einer stabilen Bank oder einem Stuhl ab, Rücken parallel zum Boden.',
      'Halte die Kurzhantel in der anderen Hand, Arm zum Boden gestreckt.',
      'Ziehe die Kurzhantel zur Hüfte, Ellbogen nah am Körper, Schulterblatt zieht zur Wirbelsäule.',
      'Senke kontrolliert ab bis zur vollen Armstreckung.',
    ],
    mistakes: [
      'Rotation des Oberkörpers, um das Ziehen der Kurzhantel zu unterstützen, statt den Rücken arbeiten zu lassen.',
      'Der Ellbogen wandert vom Körper weg und macht aus dem Rudern eine Schulterbewegung.',
      'Der Rücken rundet sich, statt flach zu bleiben.',
    ],
    sensation:
      'Die Arbeit soll in der Rückenmitte und unter der Achsel spürbar sein, das Schulterblatt zieht am oberen Punkt deutlich zur Wirbelsäule. Spannung im unteren Rücken zeigt, dass die Bankstütze den Oberkörper nicht ausreichend trägt.',
    rangeOfMotion:
      'Ziehe, bis die Kurzhantel die Hüfte berührt oder streift, Ellbogen leicht über den Rücken hinaus. Senke bis zur vollen Armstreckung ab, um den gesamten verfügbaren Bewegungsumfang zu nutzen.',
    tempo:
      'Eine Sekunde zum Ziehen, zwei bis drei zum kontrollierten Absenken der Last. Ausatmen beim Ziehen, einatmen beim Absenken.',
    anatomy:
      'Der breite Rückenmuskel und der große Rundmuskel ziehen den Arm zum Körper und strecken ihn nach hinten, die Rhomboiden und der mittlere Trapezmuskel ziehen das Schulterblatt zur Wirbelsäule, der Bizeps unterstützt durch Ellbogenbeugung. Die Knie-Hand-Stütze auf der Bank stabilisiert den Oberkörper, um die Rückenarbeit zu isolieren.',
    mechanics:
      'Schulterstreckung und -adduktion in der Sagittalebene, verbunden mit Schulterblatt-Retraktion. Die einseitige Bankstütze eliminiert den Beinanteil, der bei einem stehenden Rudern vorhanden ist.',
    benefits: [
      'Baut das Zugmuster auf, das in einer Körpergewichtseinheit selten vorkommt, wo Rückenübungen isometrisch bleiben (Superman, Vierfüßlerstand mit Diagonale).',
      'Die einseitige Stütze erlaubt es, jede Seite unabhängig zu trainieren und Kraftunterschiede zwischen den Armen zu erkennen.',
      'Ein nützliches Gegengewicht zu den Druckbewegungen (Liegestütze, Drücken), die in den meisten Einheiten schon enthalten sind.',
    ],
    progression: {
      easier: 'Nimm eine leichtere Last, oder halte den Oberkörper waagerechter, um den Bewegungsumfang zu verringern.',
      harder: 'Steigere die Last, oder halte oben eine Sekunde inne.',
      readyWhen: 'Wenn drei Sätze zu zehn auf beiden Seiten ohne Rumpfrotation gelingen.',
    },
    precautions:
      'Halte den Rücken von Anfang bis Ende flach: Muss sich der Oberkörper runden, um die Last hochzuziehen, ist sie zu schwer.',
  },

  legPressMachine: {
    slug: 'beinpresse',
    muscles: { primary: 'Quadrizeps, Gesäß', secondary: 'Hintere Oberschenkelmuskulatur' },
    steps: [
      'Setze dich auf die Maschine, Rücken und Kopf fest an der Rückenlehne.',
      'Stelle die Füße flach auf die Platte, hüftbreit auseinander.',
      'Löse die Sicherheitsarretierung und senke ab, indem du die Knie bis zu einem Winkel nahe 90° beugst.',
      'Drücke über die Füße zur vollen Beinstreckung, ohne die Knie vollständig durchzustrecken.',
    ],
    mistakes: [
      'Die Knie am Ende des Drucks vollständig durchstrecken, wodurch die Last auf das Gelenk verlagert wird.',
      'Der untere Rücken hebt beim Absenken von der Lehne ab.',
      'Zu tiefes Absenken, Knie deutlich über die Brust hinaus.',
    ],
    sensation:
      'Die Arbeit soll an der Oberschenkelvorderseite und im Gesäß spürbar sein, ohne Spannung im unteren Rücken: die Lehne trägt den gesamten Oberkörper. Unbehagen im unteren Rücken zeigt einen für die aktuelle Hüftbeweglichkeit zu großen Bewegungsumfang an.',
    rangeOfMotion:
      'Senke bis zu einem Kniewinkel nahe 90° ab, oder weniger, falls der untere Rücken vorher abhebt: Die Maschine erlaubt es, diese Grenze von Einheit zu Einheit präzise festzulegen.',
    tempo:
      'Zwei bis drei Sekunden zum Absenken, eine zum Drücken. Einatmen beim Absenken, ausatmen beim Drücken.',
    anatomy:
      'Der Quadrizeps streckt das Knie, der große Gesäßmuskel streckt die Hüfte — die gleichen Motoren wie bei einer Kniebeuge, aber die Rückenlehne der Maschine nimmt dem Oberkörper die gesamte Rumpf- und Stabilisationsarbeit ab, die eine Kniebeuge verlangt.',
    mechanics:
      'Doppelte Streckung von Hüfte und Knie in der Sagittalebene, auf einer geführten Bahn: anders als bei der Kniebeuge bleibt der Oberkörper fest, nur die Last bewegt sich.',
    benefits: [
      'Erlaubt eine starke Belastung der Beine ohne Beanspruchung von Rumpf oder Gleichgewicht, nützlich ergänzend oder als vorübergehender Ersatz für die Kniebeuge.',
      'Die geführte Bahn verringert das Risiko von Technikfehlern im Vergleich zu einer belasteten freien Bewegung.',
      'Erleichtert die feine Anpassung der Last, Stufe für Stufe.',
    ],
    progression: {
      easier: 'Verringere die Last, oder begrenze die Absenkung auf 70-80° Beugung.',
      harder: 'Steigere die Last, oder verlangsame das Absenken auf vier Sekunden.',
      readyWhen: 'Wenn drei Sätze zu zehn gelingen, ohne dass der untere Rücken von der Lehne abhebt.',
    },
    precautions:
      'Strecke die Knie am Ende des Drucks nie vollständig durch, und lass den unteren Rücken nie von der Lehne abheben: das sind die beiden Sicherheitspunkte dieser Maschine.',
  },

  latPulldownMachine: {
    slug: 'latzug',
    muscles: { primary: 'Breiter Rückenmuskel', secondary: 'Bizeps, Trapezmuskel' },
    steps: [
      'Setze dich vor die Maschine, Oberschenkel unter den Polstern fixiert, falls vorhanden.',
      'Greife die Stange breiter als schulterbreit, Arme gestreckt.',
      'Ziehe die Stange zur oberen Brust, Oberkörper aufrecht, Ellbogen sinken zur Hüfte.',
      'Komme kontrolliert zurück bis zur vollen Armstreckung.',
    ],
    mistakes: [
      'Sich stark nach hinten lehnen, um das Herunterziehen der Stange zu unterstützen.',
      'Die Stange hinter den Nacken statt vor die Brust ziehen.',
      'Zu schnelles Zurückkommen, ohne die Last zu kontrollieren.',
    ],
    sensation:
      'Die Arbeit soll in der Rückenmitte und im unteren Rücken bis unter die Achsel spürbar sein. Spannung im oberen Trapezmuskel oder Nacken zeigt, dass die Schultern hochziehen statt unten zu bleiben.',
    rangeOfMotion:
      'Ziehe, bis die Stange die obere Brust berührt, Ellbogen sinken am Körper entlang. Komme bis zur vollen Armstreckung zurück, um den gesamten Bewegungsumfang zu nutzen.',
    tempo:
      'Ein bis zwei Sekunden zum Ziehen, zwei bis drei zum kontrollierten Zurückkommen. Ausatmen beim Ziehen, einatmen beim Zurückkommen.',
    anatomy:
      'Der breite Rückenmuskel adduziert und streckt die Schulter, die Rhomboiden und der mittlere Trapezmuskel ziehen das Schulterblatt zur Wirbelsäule, der Bizeps unterstützt durch Ellbogenbeugung. Es ist das vertikale Zug-Äquivalent zum Klimmzug, geführt und stufenweise belastbar.',
    mechanics:
      'Schulteradduktion und -streckung in der Sagittalebene, verbunden mit Schulterblatt-Depression und -Retraktion, auf einer maschinengeführten Bahn.',
    benefits: [
      'Baut die vertikale Zugkraft auf, die für den Fortschritt zum Klimmzug nötig ist — eine Bewegung, die mit Körpergewicht allein schwer zugänglich ist.',
      'Erlaubt eine präzise Dosierung der Last, anders als beim Klimmzug mit Körpergewicht, wo nur das Gesamtgewicht angepasst werden kann.',
      'Stärkt den Rücken als Spiegelbild der Druckbewegungen, die in den meisten Einheiten bereits enthalten sind.',
    ],
    progression: {
      easier: 'Verringere die Last, oder nutze einen schmaleren Griff, um den Hebelarm zu verkürzen.',
      harder: 'Steigere die Last, oder halte unten eine Sekunde inne.',
      readyWhen: 'Wenn drei Sätze zu zehn gelingen, ohne dass sich der Oberkörper nach hinten lehnt.',
    },
    precautions:
      'Ziehe die Stange immer vor die Brust, nie hinter den Nacken: diese ältere Variante bringt die Schulter für minimalen Gewinn in eine riskante Position.',
  },

  hamstringStretch: {
    slug: 'dehnung-der-beinrueckseite',
    muscles: { primary: 'Hintere Oberschenkelmuskulatur' },
    steps: [
      'Lege eine Ferse auf eine stabile Erhöhung (eine Stufe, einen niedrigen Stuhl), Bein gestreckt.',
      'Halte das andere Bein leicht gebeugt, Fuß fest auf dem Boden.',
      'Beuge den Oberkörper aus der Hüfte nach vorne, Rücken flach, bis du eine Spannung in der Oberschenkelrückseite spürst.',
      'Halte die Position ruhig, atme dabei gleichmäßig.',
    ],
    mistakes: [
      'Den Rücken runden, um mehr Bewegungsumfang zu erreichen, statt aus der Hüfte zu beugen.',
      'In der Dehnung wippen, statt eine ruhige Position zu halten.',
      'Das Knie des gestreckten Beins vollständig durchstrecken.',
    ],
    sensation:
      'Die Spannung soll entlang der gesamten Oberschenkelrückseite spürbar sein, nie im Knie oder im unteren Rücken. Ein stechender Schmerz statt Spannung zeigt, dass abgebrochen und der Bewegungsumfang verringert werden sollte.',
    rangeOfMotion:
      'Beuge dich, bis du eine deutliche, aber erträgliche Spannung spürst, nie Schmerz. Der angenehme Bewegungsumfang nimmt von Einheit zu Einheit natürlich zu.',
    tempo:
      'Kein Ausführungsrhythmus: Die Position wird ruhig gehalten. Atme während der gesamten Haltedauer langsam und tief.',
    anatomy:
      'Die hintere Oberschenkelmuskulatur, die das Knie beugt und die Hüfte streckt, wird durch die Kombination aus Hüftbeugung und Kniestreckung passiv unter Spannung gesetzt. Hier wird keine aktive Muskelkontraktion angestrebt, sondern nur ein schrittweises Nachlassen unter Spannung.',
    mechanics:
      'Passive Spannung der hinteren Oberschenkelmuskulatur durch gleichzeitige Hüftbeugung und Kniestreckung, in der Sagittalebene, ohne Last und ohne wiederholte Bewegung.',
    benefits: [
      'Erhält die Beweglichkeit der Oberschenkelrückseite, die durch langes Sitzen oft verkürzt ist.',
      'Erleichtert den Bewegungsumfang von Hüftbeugebewegungen (Ausfallschritte, tiefe Kniebeugen), die an anderer Stelle der Einheit ausgeführt werden.',
      'Lässt sich überall mit einer einfachen Stufe oder Kante als Stütze durchführen.',
    ],
    precautions:
      'Forciere nie über eine erträgliche Spannung hinaus, und vermeide diese Dehnung kalt vor einer intensiven Belastung: sie passt besser ans Ende einer Einheit oder zeitlich getrennt von der Belastung.',
  },

  chestDoorwayStretch: {
    slug: 'brustdehnung-im-tuerrahmen',
    muscles: { primary: 'Brustmuskulatur', secondary: 'Vordere Schulter' },
    steps: [
      'Stelle dich in einen Türrahmen, Unterarm gegen den Rahmen, Ellbogen auf Schulterhöhe.',
      'Füße leicht versetzt, ein Fuß vor dem anderen für Stabilität.',
      'Bewege den Oberkörper sanft durch den Rahmen, bis du eine Spannung an der Schultervorderseite und im Brustmuskel spürst.',
      'Halte die Position ruhig, atme dabei gleichmäßig.',
    ],
    mistakes: [
      'Der Ellbogen sitzt zu hoch oder zu tief, wodurch sich die Spannung Richtung Schulter statt Brust verschiebt.',
      'Zu abruptes Vorbeugen statt sanfter Steigerung.',
      'Übermäßiges Durchbiegen des unteren Rückens, um mehr Bewegungsumfang zu erreichen.',
    ],
    sensation:
      'Die Spannung soll an der Schultervorderseite und im Brustmuskel des eingesetzten Arms spürbar sein, nie im Gelenk selbst. Schmerz an der Schultervorderseite zeigt, dass leicht zurückgegangen werden sollte.',
    rangeOfMotion:
      'Bewege dich vor, bis du eine deutliche, aber erträgliche Spannung spürst. Die Ellbogenhöhe verändert den gedehnten Bereich: tiefer wandert die Dehnung zum unteren Brustmuskel, höher zum oberen Brustmuskel und zur Schulter.',
    tempo:
      'Kein Ausführungsrhythmus: Die Position wird ruhig gehalten. Atme langsam — Ausatmen hilft oft, die Spannung noch etwas zu lösen.',
    anatomy:
      'Der große Brustmuskel, der die Schulter adduziert und nach vorne beugt, wird durch die vom Rahmen erzwungene Öffnungsposition passiv unter Spannung gesetzt. Die vordere Schulter, oft durch dieselben wiederholten Bewegungen verkürzt, wird in derselben Position gedehnt.',
    mechanics:
      'Passive Spannung der Brustmuskulatur durch eine horizontale Schulterstreckung, die durch den Kontaktpunkt am Rahmen fixiert wird, ohne Last und ohne wiederholte Bewegung.',
    benefits: [
      'Wirkt der Verkürzung der Brustmuskulatur entgegen, die durch lange geschlossene Vorwärtshaltungen entsteht (Bildschirme, Autofahren, wiederholtes Drücken).',
      'Erleichtert den Bewegungsumfang von Druck- und Öffnungsbewegungen des Oberkörpers, die an anderer Stelle der Einheit ausgeführt werden.',
      'Braucht keinerlei Ausrüstung, nur einen Türrahmen.',
    ],
    precautions:
      'Forciere nie über eine erträgliche Spannung hinaus, besonders bei bereits bekannten Schulterbeschwerden: gehe zuerst mit der Armposition zurück, bevor du die Dehnung aufgibst.',
  },

  squat: {
    slug: 'kniebeuge',
    muscles: { primary: 'Quadrizeps, Gesäß', secondary: 'Hintere Oberschenkelmuskulatur, Rumpf' },
    steps: [
      'Im Stand, Füße hüftbreit, Fußspitzen leicht nach außen.',
      'Schiebe die Hüfte nach hinten und beuge dann die Knie, die über den Füßen bleiben.',
      'Senke ab, bis die Oberschenkel fast waagerecht sind, das Gewicht auf dem ganzen Fuß verteilt.',
      'Halte den Oberkörper aufrecht und den Blick nach vorn, ohne den unteren Rücken zu runden.',
      'Drücke dich über die Fersen zurück bis zur vollen Hüftstreckung.',
    ],
    mistakes: [
      'Knie, die beim Hochkommen nach innen fallen.',
      'Fersen, die abheben: ein Zeichen begrenzter Knöchelbeweglichkeit, nicht fehlender Kraft.',
      'Unterer Rücken, der unten rundet, wenn die Tiefe die Hüftbeweglichkeit übersteigt.',
    ],
    sensation:
      'Die Arbeit ist an der Oberschenkelvorderseite und im Gesäß spürbar, mit deutlichem Druck über den ganzen Fuß. Eine isolierte Spannung vorn am Knie zeigt, dass die Hüfte nicht weit genug nach hinten geht und die Bewegung allein aus dem Knie kommt.',
    rangeOfMotion:
      'Geh so tief, wie es die Beweglichkeit erlaubt, ohne dass der untere Rücken rundet — der Rücken ist der Maßstab, nicht ein theoretischer Winkel. Oberschenkel nahe der Waagerechten belasten bereits die ganze Kette.',
    tempo:
      'Zwei bis drei Sekunden abwärts, ein bis zwei aufwärts. Einatmen beim Absenken, ausatmen beim Drücken über die Fersen.',
    anatomy:
      'Der Quadrizeps streckt das Knie, der große Gesäßmuskel die Hüfte: beide Motoren arbeiten zusammen. Die hintere Oberschenkelmuskulatur und die Adduktoren stabilisieren, der mittlere Gesäßmuskel verhindert das Einknicken des Knies, und die Rückenstrecker mit der Bauchwand halten den Oberkörper stabil.',
    mechanics:
      'Doppelte Beugung, dann doppelte Streckung von Hüfte und Knie in der Sagittalebene, in geschlossener Kette. Das Absenken ist exzentrisch, das Hochkommen konzentrisch. Ohne Stuhl oder äußeren Anhaltspunkt bestimmen Knöchel- und Hüftbeweglichkeit die erreichbare Tiefe.',
    benefits: [
      'Die Grundbewegung der gesamten unteren Kette: die freie Version, auf die die Kniebeuge zum Stuhl vorbereitet.',
      'Braucht weder Geräte noch Stütze, ist also überall durchführbar, sobald die Tiefe sitzt.',
      'Bildet die Basis aller belasteten Varianten — Goblet Squat, Beinpresse — die nur die Last ändern, nicht die Bewegung.',
    ],
    progression: {
      easier: 'Kehre zur Kniebeuge zum Stuhl zurück, die einen konstanten Tiefenanhaltspunkt gibt.',
      harder: 'Verlangsame das Absenken auf fünf Sekunden, halte unten inne, oder wechsle zum belasteten Goblet Squat.',
      readyWhen: 'Wenn drei Sätze zu fünfzehn ohne Einknicken der Knie und ohne abhebende Fersen gelingen, nimm Last dazu.',
    },
    precautions:
      'Wenn das Knie schmerzt, reduziere die Tiefe statt der Wiederholungszahl: ein schmerzfreier Teilbereich ist mehr wert als ein voller Bereich, der wehtut.',
  },

  pushup: {
    slug: 'liegestuetze',
    muscles: { primary: 'Brust, Trizeps', secondary: 'Schultern, Rumpf' },
    steps: [
      'Stütze dich auf Hände und Fußballen, Hände etwas breiter als die Schultern und unter deren Linie.',
      'Spanne Gesäß und Bauch an, um den Körper von den Fersen bis zum Kopf auszurichten.',
      'Senke ab, Ellbogen etwa 45° vom Oberkörper, bis die Brust den Boden streift.',
      'Drücke dich zurück bis zur vollen Armstreckung, ohne den Rücken durchhängen zu lassen.',
    ],
    mistakes: [
      'Absinkende Hüfte: der Rumpf gibt vor den Armen nach, und der untere Rücken trägt es.',
      'Ellbogen, die 90° zur Seite abspreizen, was die Schulter ungünstig belastet.',
      'Verkürzter Bewegungsumfang aus Kraftmangel, obwohl eine leichtere Variante im vollen Umfang besser voranbringt.',
    ],
    sensation:
      'Die Arbeit ist in Brust, Armrückseite und Rumpf spürbar, der die Körperlinie von Anfang bis Ende hält. Spannung im unteren Rücken bedeutet, dass die Hüfte abgesunken ist.',
    rangeOfMotion:
      'Senke ab, bis die Brust den Boden streift, und drücke dann bis zu gestreckten Armen, ohne die Ellbogen ruckartig zu blockieren. Der volle Umfang ist das, was einen Liegestütz von einer Teilbewegung unterscheidet.',
    tempo:
      'Zwei Sekunden abwärts, eine aufwärts. Einatmen beim Absenken, ausatmen beim Drücken.',
    anatomy:
      'Der große Brustmuskel und der Trizeps sind die Motoren, die vordere Schulter unterstützt. Der Sägemuskel hält das Schulterblatt flach am Brustkorb; Bauch und Gesäß verhindern das Absinken der Hüfte, was den Liegestütz ebenso zu einer Rumpf- wie zu einer Druckübung macht.',
    mechanics:
      'Ellbogenbeugung und -streckung kombiniert mit horizontaler Schulteradduktion, in geschlossener Kette, wobei sich der Körper um eine feste Stütze bewegt. Es ist die oberste Sprosse der Leiter, die Wand-, erhöhte und Knieliegestütze vorbereiten: der Hebel verlängert sich mit jedem Schritt, die relative Last steigt, ohne dass sich die Bewegung ändert.',
    benefits: [
      'Die Referenz-Druckbewegung, ohne Geräte und ohne Stütze: das Ziel, zu dem alle unterstützten Varianten führen.',
      'Kräftigt Drücken und Rumpfstabilität zugleich, was keine Druckmaschine leistet.',
      'Lässt sich über die Höhe der Stütze fein dosieren, ohne Last hinzuzufügen.',
    ],
    progression: {
      easier: 'Zurück zu Knie- oder erhöhten Liegestützen: die Körperlinie bleibt gleich, nur der Hebel verkürzt sich.',
      harder: 'Erhöhe die Füße, verlangsame das Absenken auf vier Sekunden, oder halte unten inne.',
      readyWhen: 'Wenn drei Sätze zu zwölf mit durchgehend ausgerichtetem Körper gelingen, erhöhe die Füße.',
    },
    precautions:
      'Ein schmerzendes Handgelenk wird oft entlastet, wenn du auf geschlossenen Fäusten oder auf Griffen drückst, was das Handgelenk in der Achse des Unterarms hält.',
  },

  pikePushup: {
    slug: 'pike-liegestuetze',
    muscles: { primary: 'Schultern', secondary: 'Trizeps, Rumpf' },
    steps: [
      'Beginne in der Liegestützposition, setze dann die Füße näher heran und schiebe die Hüfte hoch, Körper im umgekehrten V.',
      'Hände etwas breiter als die Schultern, Kopf locker zwischen den Armen.',
      'Beuge die Ellbogen und senke den Scheitel zwischen den Händen Richtung Boden.',
      'Drücke zurück bis zu gestreckten Armen, Hüfte weiterhin hoch.',
    ],
    mistakes: [
      'Hüfte, die im Satz absinkt: die Bewegung wird wieder ein normaler Liegestütz und verlässt die Schultern.',
      'Weit abgespreizte Ellbogen statt in der Bewegungslinie zu bleiben.',
      'Absenken bis zur Stirn statt bis zum Scheitel, was den Umfang verkürzt.',
    ],
    sensation:
      'Die Arbeit ist deutlich in den Schultern und an der Armrückseite spürbar, nicht in der Brust. Übernimmt die Brust, ist die Hüfte nicht hoch genug.',
    rangeOfMotion:
      'Senke ab, bis der Scheitel den Boden streift. Je näher die Füße an den Händen sind, desto mehr Gewicht geht über die Schultern: das ist der Schwierigkeitsregler.',
    tempo:
      'Zwei Sekunden abwärts, eine aufwärts. Ausatmen beim Drücken.',
    anatomy:
      'Die vordere Schulter und der Trizeps sind die Motoren, während der obere Trapezmuskel und der Sägemuskel das Schulterblatt stabilisieren, während der Arm über den Kopf geht. Der Rumpf hält die V-Position, die die Last zur Schulter statt zur Brust lenkt.',
    mechanics:
      'Vertikales Drücken in geschlossener Kette: das Körpergewichts-Äquivalent zum Überkopfdrücken, wobei der Oberkörperwinkel die Lastwahl ersetzt. Ellbogenbeugung und -streckung kombiniert mit Schulterbeugung über Kopf.',
    benefits: [
      'Die einzige Schulterübung mit Körpergewicht in dieser Bibliothek: ohne sie bot der Filter „Körpergewicht“ überhaupt keine Schulterarbeit.',
      'Bereitet das Überkopfdrücken vor, ohne Kurzhanteln zu brauchen.',
      'Lässt sich durch Vor- oder Zurücksetzen der Füße fein einstellen, ohne Geräte.',
    ],
    progression: {
      easier: 'Lege die Hände auf eine erhöhte Fläche: weniger Gewicht geht über die Schultern.',
      harder: 'Setze die Füße näher an die Hände, oder erhöhe die Füße, um den Oberkörper aufrechter zu stellen.',
      readyWhen: 'Wenn drei Sätze zu zwölf mit durchgehend hoher Hüfte gelingen, erhöhe die Füße.',
    },
    precautions:
      'Diese Bewegung führt die Arme über den Kopf: schmerzt die Schulter dort, halte das Drücken in einem kürzeren Umfang, statt die V-Position zu erzwingen.',
  },

  mountainClimber: {
    slug: 'bergsteiger',
    muscles: { primary: 'Ausdauer, Rumpf', secondary: 'Schultern, Hüftbeuger' },
    steps: [
      'Gehe in eine Liegestützposition mit gestreckten Armen, Hände unter den Schultern, Körper ausgerichtet.',
      'Ziehe ein Knie zur Brust, ohne dass die Hüfte steigt oder absinkt.',
      'Setze den Fuß zurück und wechsle sofort zum anderen Bein.',
      'Halte über die gesamte Dauer einen gleichmäßigen Rhythmus, mit durchgehender Atmung.',
    ],
    mistakes: [
      'Hüfte, die bei jedem Beinwechsel steigt: der Rumpf hat nachgegeben, die Übung wird zum Hüpfen.',
      'Hände zu weit vor den Schultern, was Handgelenk und Schulter unnötig belastet.',
      'Zu schneller Rhythmus auf Kosten des Kniewegs.',
    ],
    sensation:
      'Der Atem geht schnell hoch, und der Rumpf arbeitet durchgehend, damit sich das Becken nicht bewegt. Die Schultern tragen während des ganzen Satzes das Gewicht des Oberkörpers.',
    rangeOfMotion:
      'Ziehe das Knie so weit, wie das Becken ruhig bleiben kann — das Becken bestimmt den Umfang, nicht der Wille, weiter zu kommen.',
    tempo:
      'Ein gleichmäßiger, über die ganze Dauer haltbarer Rhythmus statt eines schnellen Starts mit anschließendem Einbruch. Atme durchgehend: Luftanhalten ist das erste Zeichen für ein zu hohes Tempo.',
    anatomy:
      'Die Hüftbeuger ziehen das Knie zur Brust, während die Bauchmuskeln und der große Gesäßmuskel der Stützseite das Kippen des Beckens verhindern. Schultern und Trizeps arbeiten isometrisch, um den hohen Stütz zu halten.',
    mechanics:
      'Abwechselnde Hüftbeugung und -streckung in offener Kette, auf einer Basis im hohen Stütz, also mit geschlossener Stütze auf den Händen. Es ist eine Ausdauerübung, deren Hauptanforderung die Rumpfstabilität bleibt: das Tempo hebt den Puls, die Rumpfspannung entscheidet über die Qualität.',
    benefits: [
      'Hebt den Puls ohne Fortbewegung und ohne Geräte, auf sehr wenig Raum.',
      'Verbindet Ausdauerarbeit mit dynamischer Rumpfstabilität, was weder Gehen noch der Unterarmstütz allein leisten.',
      'Wird über das Tempo statt über die Last gesteuert und passt so auf jedes Niveau, ohne dass sich etwas ändert.',
    ],
    progression: {
      easier: 'Werde deutlich langsamer, oder lege die Hände auf eine erhöhte Fläche, um die Schultern zu entlasten.',
      harder: 'Erhöhe das Tempo oder verlängere die Dauer, solange das Becken ruhig bleibt.',
      readyWhen: 'Wenn drei Runden zu vierzig Sekunden ohne Hüftanheben gelingen, verlängere die Dauer.',
    },
    precautions:
      'Empfindliche Handgelenke oder Schultern: lege die Hände auf eine Bank oder Stufe, was die Stützlast deutlich senkt, ohne die Beinarbeit zu verändern.',
  },

  legSwing: {
    slug: 'beinpendeln',
    muscles: { primary: 'Hüften, Beweglichkeit', secondary: 'Gesäß, hintere Oberschenkelmuskulatur' },
    steps: [
      'Stelle dich seitlich zu einer Wand oder einer Stuhllehne, eine Hand stützt sich ab.',
      'Verlagere das Gewicht auf das innere Bein, das andere bleibt frei zum Schwingen.',
      'Schwinge das freie Bein vor und zurück, ohne am Ende des Bewegungsumfangs zu forcieren.',
      'Steigere den Umfang über die Wiederholungen hinweg schrittweise, das Becken bleibt ruhig.',
      'Wechsle nach der Hälfte der Zeit die Seite.',
    ],
    mistakes: [
      'Becken, das kippt, um mehr Umfang zu holen, statt die Hüfte allein arbeiten zu lassen.',
      'Sofort maximaler Umfang, obwohl er sich schrittweise öffnen soll.',
      'Unterer Rücken, der ins Hohlkreuz geht, wenn das Bein nach hinten schwingt.',
    ],
    sensation:
      'Eine Hüfte, die sich löst, ohne deutliche muskuläre Anstrengung. Das ist Inbewegungsetzen, kein Kräftigen: zieht es stark, ist der Umfang für den Beginn einer Einheit schon zu groß.',
    rangeOfMotion:
      'Geh so weit, wie das Becken ruhig bleibt. Der Umfang des Tages soll während des Satzes selbst wachsen, genau wie bei Katze-Kuh.',
    tempo:
      'Ein gleichmäßiges, kontrolliertes Pendeln, nie geschleudert. Die Bewegung bleibt geführt, nicht dem Schwung überlassen.',
    anatomy:
      'Die Hüftbeuger und der große Gesäßmuskel wechseln zwischen dynamischer Anspannung und Verlängerung, während Standbein und Rumpf das Becken stabilisieren. Die Arbeit gilt der Gelenkbeweglichkeit der Hüfte, nicht der Kraft.',
    mechanics:
      'Abwechselnde Hüftbeugung und -streckung in offener Kette, in der Sagittalebene, ohne Last. Die kontrollierte ballistische Bewegung bereitet den Umfang vor, den Ausfallschritte und Kniebeugen anschließend unter Last nutzen.',
    benefits: [
      'Bereitet die Hüfte vor jeder Beinarbeit vor — etwas, das kein anderes Aufwärmen dieser Bibliothek leistete, sie waren alle für den Oberkörper.',
      'Überall mit einer einfachen Stütze machbar, in dreißig Sekunden pro Seite.',
      'Öffnet den Hüftumfang, den die folgenden Ausfallschritte, Kniebeugen und Aufstiege nutzen.',
    ],
    precautions:
      'Kein Ruck am Ende des Umfangs: das ist ein geführtes Pendeln, kein Wurf. Hakt die Hüfte, verringere den Umfang, statt weiterzumachen.',
  },

  torsoTwist: {
    slug: 'rumpfrotation',
    muscles: { primary: 'Bauchmuskeln, Rumpfbeweglichkeit', secondary: 'Wirbelsäule' },
    steps: [
      'Im Stand, Füße schulterbreit und fest am Boden.',
      'Beuge die Knie leicht und lass die Arme locker hängen.',
      'Drehe den Oberkörper zu einer Seite und lass die Arme der Bewegung folgen, ohne sie zu schleudern.',
      'Wechsle in gleichmäßigem Rhythmus zur anderen Seite, das Becken bleibt nach vorn gerichtet.',
    ],
    mistakes: [
      'Becken, das sich mit dem Oberkörper dreht: die Rotation findet nicht mehr im Rumpf statt, sondern in den Hüften.',
      'Geschleuderte Arme, die den Oberkörper mitziehen, statt ihm zu folgen.',
      'Zu schneller Rhythmus, der aus einer Mobilisation ein Rütteln macht.',
    ],
    sensation:
      'Eine Rotation, die sich entlang des Rumpfes allmählich löst, ohne deutliche muskuläre Anstrengung und ohne Ruck im unteren Rücken.',
    rangeOfMotion:
      'Drehe bis ans Ende des Angenehmen, ohne zu forcieren. Wie bei jeder Mobilität öffnet sich der Umfang über die Wiederholungen.',
    tempo:
      'Gleichmäßig und moderat, etwa eine Drehung pro Sekunde. Atme frei, ohne am Ende der Drehung die Luft anzuhalten.',
    anatomy:
      'Die äußeren und inneren schrägen Bauchmuskeln erzeugen die Rumpfrotation, die tiefen intersegmentalen Muskeln mobilisieren jede Wirbelebene. Gesäß und Beine stabilisieren das Becken — genau das zwingt die Rotation dazu, aus dem Rumpf zu kommen.',
    mechanics:
      'Abwechselnde Rotation der Wirbelsäule in der Transversalebene, unter leichter Last (nur das Gewicht des Oberkörpers). Das feste Becken ist der Bezugspunkt: es unterscheidet eine echte Rumpfrotation von einem bloßen Hüftdrehen.',
    benefits: [
      'Das einzige Rumpf-Aufwärmen dieser Bibliothek, Ergänzung zu Katze-Kuh, das Beugung und Streckung statt Rotation bearbeitet.',
      'Bereitet die Anti-Rotations-Übungen wie Dead Bug und Vierfüßlerstand mit Diagonale vor.',
      'Im Stand machbar, ohne Geräte und ohne Matte.',
    ],
    precautions:
      'Der untere Rücken darf nie der Motor der Rotation sein: tritt dort Unbehagen auf, verringere den Umfang und prüfe, ob das Becken noch nach vorn zeigt.',
  },

  quadStretch: {
    slug: 'quadrizepsdehnung-im-stand',
    muscles: { primary: 'Quadrizeps' },
    steps: [
      'Im Stand eine Hand zur Balance an die Wand legen.',
      'Greife den Knöchel auf der Seite des zu dehnenden Beins und ziehe die Ferse zum Gesäß.',
      'Halte beide Knie nebeneinander und das Becken leicht aufgerichtet.',
      'Halte die Position ruhig, atme gleichmäßig, und wechsle dann die Seite.',
    ],
    mistakes: [
      'Das gedehnte Knie wandert nach vorn oder zur Seite, wodurch die Spannung den Quadrizeps verlässt.',
      'Den unteren Rücken ins Hohlkreuz bringen, um Umfang zu gewinnen.',
      'Ruckartig am Knöchel ziehen statt eine ruhige Position zu halten.',
    ],
    sensation:
      'Die Spannung ist über die gesamte Oberschenkelvorderseite spürbar, nie im Knie selbst. Schmerz vorn am Knie heißt: sofort lösen.',
    rangeOfMotion:
      'Ziehe die Ferse heran, bis eine deutliche, aber erträgliche Spannung entsteht. Das Knie neben das andere zu bringen und das Becken leicht aufzurichten verstärkt die Dehnung, ohne das Gelenk zu belasten.',
    tempo:
      'Kein Rhythmus: die Position wird ruhig gehalten. Atme während des gesamten Haltens langsam.',
    anatomy:
      'Der Quadrizeps, der das Knie streckt, wird durch die Kniebeugung passiv unter Spannung gesetzt; der gerade Oberschenkelmuskel, der als einziger Kopf auch die Hüfte kreuzt, wird bei gestreckter Hüfte zusätzlich gedehnt — daher der Sinn, das Knie nicht nach vorn wandern zu lassen.',
    mechanics:
      'Passive Spannung durch gleichzeitige Kniebeugung und Hüftstreckung, in der Sagittalebene, ohne Last und ohne wiederholte Bewegung.',
    benefits: [
      'Ergänzt die Dehnung der Beinrückseite, sodass beide Seiten des Oberschenkels abgedeckt sind.',
      'Erhält den Beugeumfang des Knies, der durch langes Sitzen oft abnimmt.',
      'Braucht nur eine Stütze für die Balance.',
    ],
    precautions:
      'Wenn du den Knöchel nicht erreichst, lege ein Band oder ein Handtuch um den Fuß, statt den Oberkörper nach hinten zu neigen, um heranzukommen.',
  },

  gluteStretch: {
    slug: 'gesaessdehnung-vierer-position',
    muscles: { primary: 'Gesäß', secondary: 'Hüftaußenrotatoren' },
    steps: [
      'Lege dich auf den Rücken, Knie gebeugt, Füße am Boden.',
      'Lege den Knöchel einer Seite über das gegenüberliegende Knie, sodass eine Vier entsteht.',
      'Fasse mit beiden Händen hinter den stützenden Oberschenkel und ziehe ihn sanft zu dir.',
      'Halte Kopf und Schultern am Boden, wechsle dann die Seite.',
    ],
    mistakes: [
      'Kopf und Schultern heben vom Boden ab, was den Nacken anspannt, ohne der Dehnung etwas hinzuzufügen.',
      'Ruckartig ziehen statt einen gleichmäßigen Zug aufzubauen.',
      'Das gekreuzte Knie nach innen drücken, was die Hüfte schließt statt sie zu öffnen.',
    ],
    sensation:
      'Die Spannung ist tief im Gesäß der gekreuzten Seite spürbar, manchmal bis zur Hüftaußenseite. Im gekreuzten Knie darf nichts ziehen.',
    rangeOfMotion:
      'Ziehe den stützenden Oberschenkel bis zu einer deutlichen, aber erträglichen Spannung. Je näher der Oberschenkel zur Brust kommt, desto stärker die Dehnung.',
    tempo:
      'Kein Rhythmus: die Position wird ruhig gehalten, mit langsamer Atmung. Das Ausatmen hilft oft, noch etwas mehr loszulassen.',
    anatomy:
      'Der große Gesäßmuskel und die tiefen Außenrotatoren der Hüfte, darunter der Piriformis, werden durch die Kombination aus Hüftbeugung und Außenrotation, die die Vierer-Position erzeugt, passiv gedehnt.',
    mechanics:
      'Passive Spannung durch Hüftbeugung in Verbindung mit Außenrotation, vollständig entlastet — der Rücken bleibt am Boden, was jede Kompression der Wirbelsäule während der Dehnung vermeidet.',
    benefits: [
      'Erreicht einen Bereich, den die Oberschenkeldehnungen nicht treffen und der bei langem Sitzen steif wird.',
      'Wird am Boden ausgeführt, ohne Balance halten zu müssen, also auch bei steifer Hüfte zugänglich.',
      'Ergänzt die Gesäßarbeit (Brücke, Abduktion) um die passende Beweglichkeit.',
    ],
    precautions:
      'Hakt oder zwickt die gekreuzte Hüfte, nimm den Zug zurück: eine flachere, schmerzfreie Position ist mehr wert als eine erzwungene.',
  },

  calfStretch: {
    slug: 'wadendehnung-an-der-wand',
    muscles: { primary: 'Waden' },
    steps: [
      'Lege die Hände flach auf Brusthöhe an die Wand.',
      'Setze ein Bein gestreckt nach hinten, Ferse am Boden und Fuß gerade ausgerichtet.',
      'Beuge das vordere Bein und schiebe das Becken nach vorn, bis du die Dehnung in der hinteren Wade spürst.',
      'Halte die Position ruhig und wechsle dann das Bein.',
    ],
    mistakes: [
      'Die hintere Ferse hebt ab: die Dehnung ist sofort verschwunden.',
      'Der hintere Fuß zeigt nach außen, was die Belastung auf das Sprunggelenk verlagert.',
      'Das Becken weicht zurück statt nach vorn zu gehen, was die Spannung aufhebt.',
    ],
    sensation:
      'Die Spannung ist an der Rückseite des hinteren Beins spürbar, von der Kniekehle bis zur Ferse. Das hintere Knie leicht zu beugen verschiebt die Spannung tiefer in die Wade.',
    rangeOfMotion:
      'Schiebe das Becken bis zu einer deutlichen, aber erträglichen Spannung vor, die Ferse bleibt am Boden — die Ferse setzt die Grenze, nicht der Abstand der Füße.',
    tempo:
      'Kein Rhythmus: Position ruhig halten, langsam und gleichmäßig atmen.',
    anatomy:
      'Der dreiköpfige Wadenmuskel — Gastrocnemius und Soleus — wird durch die Dorsalflexion des Sprunggelenks gedehnt. Bei gestrecktem hinterem Knie trifft die Spannung vor allem den Gastrocnemius, der auch das Knie kreuzt; bei leicht gebeugtem Knie verlagert sie sich auf den Soleus.',
    mechanics:
      'Passive Spannung durch Dorsalflexion des Sprunggelenks gegen eine feste Stütze, ohne Last und ohne wiederholte Bewegung.',
    benefits: [
      'Erhält die Dorsalflexion des Sprunggelenks, deren Fehlen die häufigste Ursache abhebender Fersen in der Kniebeuge ist.',
      'Holt die Waden aus ihrer Isolation: sie waren die einzige Gruppe mit einer einzigen Übung in der Bibliothek.',
      'Braucht nichts außer einer Wand.',
    ],
    precautions:
      'Eine scharfe, punktuelle Spannung an der Achillessehne ist nicht die gesuchte Dehnung: nimm das Becken zurück und verringere den Umfang.',
  },

  childPose: {
    slug: 'stellung-des-kindes',
    muscles: { primary: 'Rücken, Beweglichkeit', secondary: 'Hüften, Schultern' },
    steps: [
      'Gehe in den Vierfüßlerstand, Knie etwa hüftbreit.',
      'Setze dich schrittweise auf die Fersen und lass die Hände, wo sie sind.',
      'Strecke die Arme weit nach vorn und lass die Stirn Richtung Boden sinken.',
      'Atme langsam und lass den Rücken mit jedem Ausatmen etwas mehr runden.',
    ],
    mistakes: [
      'Schultern zu den Ohren hochgezogen, statt den Oberkörper loszulassen.',
      'Die Hüfte zu den Fersen zwingen, wenn Knöchel- oder Kniebeweglichkeit das nicht zulässt.',
      'Angehaltene Atmung, obwohl gerade sie die Position öffnet.',
    ],
    sensation:
      'Eine diffuse Dehnung entlang des Rückens und an der Schulterrückseite, mit einem Gefühl von Loslassen statt Zug. In den Knien darf nichts ziehen.',
    rangeOfMotion:
      'Setze dich so weit zurück, wie es angenehm bleibt; wie weit die Knie stehen, entscheidet über den Platz für den Oberkörper. Die Position öffnet sich über die Atemzüge von selbst.',
    tempo:
      'Kein Ausführungsrhythmus: die Position wird gehalten. Es sind die Ausatmungen, die den Umfang vergrößern, nicht Kraft.',
    anatomy:
      'Das ist keine Kräftigung: Rückenstrecker und breiter Rückenmuskel werden passiv verlängert, während die Hüften in volle Beugung gehen. Es ist das statische Gegenstück zu Katze-Kuh, das denselben Bereich dynamisch mobilisiert.',
    mechanics:
      'Globale Beugung von Wirbelsäule und Hüften in Entlastung, wobei das Körpergewicht auf Oberschenkeln und Armen ruht statt auf der Wirbelsäule.',
    benefits: [
      'Die einzige Rückendehnung dieser Bibliothek, statische Ergänzung zu Katze-Kuh.',
      'Dient als Übergang am Ende einer Einheit oder als Erholung zwischen zwei fordernden Rückensätzen.',
      'Braucht keine Ausrüstung, nur einen bequemen Boden.',
    ],
    precautions:
      'Ein in dieser Position schmerzendes Knie wird entlastet, indem ein Kissen zwischen Gesäß und Fersen geschoben wird, statt auf die Haltung zu verzichten.',
  },

  tricepsStretch: {
    slug: 'trizepsdehnung-ueber-kopf',
    muscles: { primary: 'Trizeps', secondary: 'Schultern' },
    steps: [
      'Im Stehen oder Sitzen einen Arm heben und den Ellbogen beugen, um die Hand zwischen die Schulterblätter zu legen.',
      'Der Ellbogen zeigt zur Decke, so nah wie möglich am Kopf.',
      'Greife diesen Ellbogen mit der anderen Hand und schiebe ihn sanft nach hinten.',
      'Halte ohne Ruck und wechsle dann den Arm.',
    ],
    mistakes: [
      'Den unteren Rücken ins Hohlkreuz bringen, um einen weiter hinten stehenden Ellbogen vorzutäuschen.',
      'Den Ellbogen ruckartig schieben statt gleichmäßigen Druck aufzubauen.',
      'Den Kopf vom Arm nach vorn drücken lassen, was den Nacken anspannt.',
    ],
    sensation:
      'Die Spannung ist an der Armrückseite spürbar, vom Ellbogen Richtung Schulter. Unbehagen im Schultergelenk selbst heißt: weniger schieben.',
    rangeOfMotion:
      'Schiebe den Ellbogen bis zu einer deutlichen, aber erträglichen Spannung. Begrenzend ist der Schulterumfang über Kopf, nicht die Kraft der schiebenden Hand.',
    tempo:
      'Kein Rhythmus: Position ruhig halten, langsam atmen.',
    anatomy:
      'Der dreiköpfige Armmuskel, der einzige Ellbogenstrecker, wird durch die vollständige Ellbogenbeugung gespannt; sein langer Kopf, der auch die Schulter kreuzt, wird bei über den Kopf gehobenem Arm zusätzlich gedehnt — daher der zur Decke zeigende Ellbogen.',
    mechanics:
      'Passive Spannung durch Ellbogenbeugung und Schulterbeugung über Kopf, ohne Last und ohne wiederholte Bewegung.',
    benefits: [
      'Ergänzt die Druckarbeit (Liegestütze, Dips, Drücken) durch die Dehnung des dort am stärksten beanspruchten Muskels.',
      'Im Stehen wie im Sitzen machbar, ohne Geräte und ohne Platzbedarf.',
      'Erhält den Schulterumfang über Kopf, nützlich für Pike-Liegestütze und Drückbewegungen.',
    ],
    precautions:
      'Schmerzt das Heben des Arms über den Kopf, halte den Ellbogen tiefer und schiebe weniger: diese Position lohnt kein Erzwingen.',
  },

  bandChestPress: {
    slug: 'brustdruecken-mit-band',
    muscles: { primary: 'Brust, Trizeps', secondary: 'Schultern' },
    steps: [
      'Führe das Band auf Höhe der Schulterblätter um den Rücken und halte in jeder Hand ein Ende.',
      'Hände auf Brusthöhe, Ellbogen gebeugt und nah am Oberkörper, ein Fuß leicht vorgesetzt für Stabilität.',
      'Drücke die Hände nach vorn bis zur vollen Armstreckung.',
      'Kehre langsam und kontrolliert zurück, bis die Hände wieder an der Brust sind.',
    ],
    mistakes: [
      'Oberkörper, der nach vorn wandert, um das Drücken zu unterstützen: der Körper bewegt sich statt der Arme.',
      'Ellbogen, die auf Schulterhöhe steigen, was die Schulter ungünstig belastet.',
      'Ruckartiges Zurückschnappen statt gebremster Rückkehr.',
    ],
    sensation:
      'Die Arbeit ist in Brust und Armrückseite spürbar, mit einem Widerstand, der wächst, während sich die Arme strecken. Spannung im unteren Rücken zeigt, dass der Oberkörper kompensiert.',
    rangeOfMotion:
      'Drücke bis zu gestreckten Armen, ohne die Ellbogen zu blockieren, und lass die Hände zur Brust zurückkommen. Der Umfang ist der jeder Druckbewegung; nur das Widerstandsprofil ändert sich.',
    tempo:
      'Ein bis zwei Sekunden zum Drücken, zwei bis drei zur gebremsten Rückkehr. Ausatmen beim Drücken.',
    anatomy:
      'Der große Brustmuskel und der Trizeps sind die Motoren, die vordere Schulter unterstützt, und der Sägemuskel hält das Schulterblatt flach. Rumpf und vorgesetztes Bein halten dem Zug des Bandes stand, das den Oberkörper nach hinten zieht.',
    mechanics:
      'Horizontale Schulteradduktion mit Ellbogenstreckung gegen wachsenden Widerstand: das Band ist bei gestreckten Armen am straffsten, genau dort, wo Körpergewicht oder Kurzhantel am leichtesten wären. Das ist das exakte Gegenteil des Liegestütz-Profils.',
    benefits: [
      'Bringt horizontales Drücken ohne Bodenfläche und ohne schweres Gerät, nützlich wenn Liegestütze nicht machbar sind.',
      'Der wachsende Widerstand belastet das Ende der Bewegung, wo ein Liegestütz leicht wird.',
      'Ein Band lässt sich überallhin mitnehmen, anders als ein Paar Kurzhanteln.',
    ],
    progression: {
      easier: 'Nimm ein schwächeres Band, oder fasse es weiter außen.',
      harder: 'Nimm ein stärkeres Band, setze den vorderen Fuß weiter vor, oder verlangsame die Rückkehr auf vier Sekunden.',
      readyWhen: 'Wenn drei Sätze zu fünfzehn ohne nach vorn wandernden Oberkörper gelingen, erhöhe den Widerstand.',
    },
    precautions:
      'Prüfe den Zustand des Bandes vor jedem Satz: ein abgenutztes Band kann plötzlich reißen, und es ist auf Gesichtshöhe gespannt.',
  },

  bandLateralRaise: {
    slug: 'seitheben-mit-band',
    muscles: { primary: 'Schultern' },
    steps: [
      'Stelle dich mit einem oder beiden Füßen auf die Mitte des Bandes, ein Ende in jeder Hand.',
      'Arme seitlich am Körper, Ellbogen kaum gebeugt, Handflächen nach innen.',
      'Hebe die Arme seitlich bis auf Schulterhöhe, nicht höher.',
      'Senke langsam ab und kontrolliere dabei den Zug des Bandes.',
    ],
    mistakes: [
      'Über Schulterhöhe gehen, wodurch der obere Trapezmuskel übernimmt.',
      'Schwung aus dem Oberkörper, um die Arme zu starten.',
      'Schultern, die beim Heben zu den Ohren hochziehen.',
    ],
    sensation:
      'Die Arbeit ist an der Schulterseite spürbar. Spannung im oberen Trapezmuskel oder im Nacken zeigt, dass die Schultern hochziehen statt unten zu bleiben.',
    rangeOfMotion:
      'Hebe, bis die Arme waagerecht sind, nicht weiter: dort endet die Arbeit des mittleren Deltamuskels, und andere Muskeln würden übernehmen.',
    tempo:
      'Ein bis zwei Sekunden aufwärts, zwei bis drei abwärts. Ausatmen beim Heben.',
    anatomy:
      'Der mittlere Deltamuskel ist der Hauptmotor der Armabduktion; der Obergrätenmuskel leitet die ersten Grade ein. Der untere und mittlere Trapezmuskel müssen das Schulterblatt unten halten — deshalb verschiebt hochgezogenes Schultern die Arbeit.',
    mechanics:
      'Schulterabduktion in der Frontalebene gegen einen mit der Höhe wachsenden Widerstand — das Band spannt sich genau dann, wenn der Hebelarm am längsten ist, was das Bewegungsende deutlich härter macht als mit einer Kurzhantel.',
    benefits: [
      'Die einzige isolierte Schulterarbeit der Bibliothek, die ohne Kurzhanteln auskommt.',
      'Ergänzt die Druckbewegungen, die vor allem die Schultervorderseite belasten.',
      'Lässt sich über die gehaltene Bandlänge fein dosieren, ohne das Gerät zu wechseln.',
    ],
    progression: {
      easier: 'Fasse das Band weiter oben, oder stelle nur einen Fuß darauf.',
      harder: 'Verkürze die gehaltene Länge, stelle beide Füße auf das Band, oder halte oben eine Sekunde inne.',
      readyWhen: 'Wenn drei Sätze zu fünfzehn ohne Schulterhochziehen gelingen, verkürze das Band.',
    },
    precautions:
      'Diese Bewegung kommt per Definition ohne schwere Last aus: zwickt die Schulter oben, verringere den Umfang statt weiterzumachen — ein Einklemmen trainiert man nicht weg.',
  },

  bandLateralWalk: {
    slug: 'seitschritte-mit-band',
    muscles: { primary: 'Mittlerer Gesäßmuskel', secondary: 'Quadrizeps, großer Gesäßmuskel' },
    steps: [
      'Lege das Band direkt über die Knie, Füße hüftbreit.',
      'Beuge Knie und Hüfte leicht in eine halbe Kniebeuge, Oberkörper aufrecht.',
      'Mache einen Schritt zur Seite und drücke das Knie aktiv nach außen gegen das Band.',
      'Ziehe den anderen Fuß nach, ohne dass das Band nachlässt, und gehe in dieselbe Richtung weiter, bevor du zurückkehrst.',
    ],
    mistakes: [
      'Knie, die beim Aufsetzen einknicken: das Band gewinnt, der mittlere Gesäßmuskel gibt auf.',
      'Oberkörper, der sich ganz aufrichtet, was die Gesäßarbeit entlastet.',
      'Zu große Schritte, die die Kontrolle über die Ausrichtung kosten.',
    ],
    sensation:
      'Die Arbeit ist an der Hüft- und Gesäßseite spürbar, mit einem allmählich wachsenden Brennen. Im Knie darf nichts ziehen.',
    rangeOfMotion:
      'Mache Schritte von etwa Schulterbreite und halte die Bandspannung über den ganzen Satz konstant — die durchgehende Spannung leistet die Arbeit, nicht die Schrittlänge.',
    tempo:
      'Gleichmäßig und kontrolliert, jeder Schritt ohne Federn gesetzt. Atme normal: das ist Arbeit unter Dauerspannung, kein Sprint.',
    anatomy:
      'Der mittlere und der kleine Gesäßmuskel abduzieren die Hüfte und stabilisieren bei jedem Schritt das Becken; der Spanner der Oberschenkelbinde unterstützt. Die halbe Kniebeuge hält Quadrizeps und großen Gesäßmuskel während des ganzen Gehens isometrisch unter Spannung.',
    mechanics:
      'Hüftabduktion in der Frontalebene gegen Bandwiderstand, im Wechselschritt. Es ist eine der wenigen Übungen der Bibliothek in dieser Ebene, während Kniebeugen und Ausfallschritte fast ausschließlich in der Sagittalebene arbeiten.',
    benefits: [
      'Kräftigt den seitlichen Hüftstabilisator, der direkt an der Knieausrichtung beim Gehen und Laufen beteiligt ist.',
      'Gibt sofortiges taktiles Feedback: lässt das Band nach, ist das Knie eingeknickt.',
      'Ergänzt die Kniebeuge mit Band, indem sie die seitliche Komponente isoliert, der jene nur widersteht.',
    ],
    progression: {
      easier: 'Setze das Band über die Knöchel statt über die Knie, oder nimm ein weicheres Band.',
      harder: 'Setze das Band über die Knie, geh tiefer in die halbe Kniebeuge, oder verlängere den Satz.',
      readyWhen: 'Wenn drei Sätze zu fünfzehn Schritten pro Seite ohne nachlassendes Band gelingen, erhöhe den Widerstand.',
    },
    precautions:
      'Brennt die Knieaußenseite stärker als die Hüfte, kommt die Bewegung aus dem Knie: setze das Band tiefer und beginne mit kürzeren Schritten neu.',
  },

  bandCurl: {
    slug: 'bizepscurl-mit-band',
    muscles: { primary: 'Bizeps', secondary: 'Unterarme' },
    steps: [
      'Stelle dich mit einem oder beiden Füßen auf die Mitte des Bandes, ein Ende in jeder Hand.',
      'Arme seitlich am Körper, Ellbogen an den Rippen, Handflächen nach vorn.',
      'Führe die Hände zu den Schultern, während die Ellbogen unbewegt bleiben.',
      'Senke langsam bis zur vollen Armstreckung ab.',
    ],
    mistakes: [
      'Ellbogen, die beim Hochführen nach vorn wandern: die Bewegung verlässt den Bizeps und geht zur Schulter.',
      'Schwingender Oberkörper, um die Last zu starten.',
      'Fallengelassenes Absenken, obwohl der gebremste Teil die meiste Arbeit leistet.',
    ],
    sensation:
      'Die Arbeit ist an der Armvorderseite spürbar, vom Ellbogen zur Schulter. Auch die Unterarme brennen, was normal ist: sie halten das Band.',
    rangeOfMotion:
      'Führe die Hände bis nahe an die Schultern und senke bis zu vollständig gestreckten Armen ab. Das Verkürzen der Absenkphase ist die häufigste Art, die Arbeit unbemerkt zu verringern.',
    tempo:
      'Eine Sekunde aufwärts, zwei bis drei gebremst abwärts. Ausatmen beim Hochführen.',
    anatomy:
      'Der zweiköpfige Armmuskel beugt den Ellbogen und beteiligt sich an der Supination des Unterarms; der darunter liegende Armbeuger ist der beständigste Beuger, unabhängig von der Handstellung. Der Oberarmspeichenmuskel des Unterarms unterstützt.',
    mechanics:
      'Ellbogenbeugung in offener Kette gegen wachsenden Widerstand: das Band ist oben am straffsten, wo der Hebelarm kurz ist, was ein nahezu umgekehrtes Lastprofil im Vergleich zur Kurzhantel ergibt.',
    benefits: [
      'Die erste Bizepsübung der Bibliothek, in einer Gruppe „Arme“, die es vor diesem Durchgang nicht gab.',
      'Ergänzt die Zugbewegungen (Rudern, Latzug), bei denen der Bizeps nur unterstützt.',
      'Braucht nur ein Band und passt in eine Tasche.',
    ],
    progression: {
      easier: 'Fasse das Band weiter oben, oder stelle nur einen Fuß darauf.',
      harder: 'Verkürze die gehaltene Länge, oder halte oben in jeder Wiederholung eine Sekunde inne.',
      readyWhen: 'Wenn drei Sätze zu fünfzehn ohne nach vorn wandernde Ellbogen gelingen, verkürze das Band.',
    },
    precautions:
      'Schmerz in der Ellenbeuge ist nicht das gesuchte Brennen: verringere den Widerstand und prüfe, ob das Absenken gebremst und nicht fallengelassen wird.',
  },

  dumbbellShoulderPress: {
    slug: 'schulterdruecken-mit-kurzhanteln',
    muscles: { primary: 'Schultern', secondary: 'Trizeps, Rumpf' },
    steps: [
      'Im Stehen oder Sitzen, eine Kurzhantel in jeder Hand auf Schulterhöhe, Handflächen nach vorn.',
      'Spanne Gesäß und Bauch an, um das Becken zu fixieren.',
      'Drücke die Kurzhanteln über den Kopf bis zur Armstreckung, ohne ins Hohlkreuz zu gehen.',
      'Senke kontrolliert ab, bis die Ellbogen wieder unter Schulterhöhe sind.',
    ],
    mistakes: [
      'Hohlkreuz, um fehlende Schulterbeweglichkeit auszugleichen.',
      'Ellbogen, die weit zur Seite abspreizen, statt leicht vor dem Oberkörper zu bleiben.',
      'Verkürztes Absenken, das den nützlichsten Teil der Bewegung streicht.',
    ],
    sensation:
      'Die Arbeit ist in den Schultern und an der Armrückseite spürbar, bei durchgehend aktivem Rumpf. Spannung im unteren Rücken zeigt, dass das Becken nicht mehr fixiert ist.',
    rangeOfMotion:
      'Senke ab, bis die Ellbogen unter Schulterhöhe kommen, und drücke bis zu gestreckten Armen, ohne ruckartig zu blockieren. Sitzend mit hoher Rückenlehne ist der untere Rücken mechanisch geschützt.',
    tempo:
      'Ein bis zwei Sekunden zum Drücken, zwei bis drei zum kontrollierten Absenken. Ausatmen beim Drücken.',
    anatomy:
      'Die vordere Schulter und der Trizeps sind die Motoren, die mittlere Schulter unterstützt. Trapez- und Sägemuskel drehen das Schulterblatt nach oben — die Voraussetzung dafür, dass der Arm frei über den Kopf geht; die Bauchmuskeln verhindern das ausgleichende Hohlkreuz.',
    mechanics:
      'Schulterbeugung über Kopf verbunden mit Ellbogenstreckung, in offener Kette und mit konstanter Last über den gesamten Umfang — anders als beim Band, dessen Widerstand am Bewegungsende wächst.',
    benefits: [
      'Die Referenz für vertikales Drücken, sobald ein Paar Kurzhanteln verfügbar ist.',
      'Belastet die Schultern schrittweise, was Pike-Liegestütze nur über eine veränderte Körperposition schaffen.',
      'Trainiert jeden Arm einzeln, sodass die starke Seite die schwache nicht ausgleicht.',
    ],
    progression: {
      easier: 'Verringere die Last, oder setze dich mit Rückenlehne hin, um die Rumpfarbeit zu entfernen.',
      harder: 'Steigere die Last, oder halte in jeder Wiederholung oben eine Sekunde inne.',
      readyWhen: 'Wenn drei Sätze zu zwölf ohne Hohlkreuz gelingen, steigere die Last.',
    },
    precautions:
      'Schmerzt das Heben der Arme über den Kopf, verringere den Umfang oder drehe die Handflächen nach innen: diese Position wird nicht erzwungen.',
  },

  dumbbellFloorPress: {
    slug: 'kurzhantel-bodendruecken',
    muscles: { primary: 'Brust, Trizeps', secondary: 'Schultern' },
    steps: [
      'Lege dich auf den Rücken, Knie gebeugt, Füße flach, eine Kurzhantel in jeder Hand.',
      'Ellbogen am Boden, etwa 45° vom Oberkörper, Kurzhanteln auf Brusthöhe.',
      'Drücke die Kurzhanteln zur Decke bis zur vollen Armstreckung.',
      'Senke kontrolliert ab, bis die Ellbogen den Boden berühren, halte kurz inne und drücke erneut.',
    ],
    mistakes: [
      'Die Ellbogen vom Boden abprallen lassen statt innezuhalten.',
      'Auf 90° abgespreizte Ellbogen, die die Schulter ungünstig stellen.',
      'Unterer Rücken, der vom Boden abhebt, statt in Kontakt zu bleiben.',
    ],
    sensation:
      'Die Arbeit ist in Brust und Armrückseite spürbar. Der Boden gibt einen konstanten Tiefenanhaltspunkt, den ein Bankdrücken nicht hat.',
    rangeOfMotion:
      'Der Boden begrenzt das Absenken: genau das ist der Sinn, er legt in jeder Wiederholung dieselbe Tiefe fest und verhindert, dass die Schulter zu weit in die Streckung geht.',
    tempo:
      'Ein bis zwei Sekunden zum Drücken, zwei bis drei zum Absenken. Eine Sekunde Pause beim Bodenkontakt beseitigt jedes Abprallen.',
    anatomy:
      'Der große Brustmuskel und der Trizeps sind die Motoren, die vordere Schulter unterstützt. Da der Umfang durch den Boden begrenzt ist, geht die Schulter nie in übermäßige Streckung — das macht diese Variante verträglicher als Bankdrücken.',
    mechanics:
      'Horizontale Schulteradduktion mit Ellbogenstreckung, offene Kette und konstante Last. Der Boden kappt den unteren Teil der Bewegung und macht aus einem freien Umfang einen begrenzten, von Einheit zu Einheit reproduzierbaren.',
    benefits: [
      'Bringt belastetes horizontales Drücken ohne Bank, mit einem einfachen Paar Kurzhanteln und einer Matte.',
      'Der Bodenanhaltspunkt macht die Tiefe in jedem Satz identisch, der Fortschritt also messbar.',
      'Jeder Arm arbeitet unabhängig, anders als an der Langhantel.',
    ],
    progression: {
      easier: 'Verringere die Last, oder drücke einen Arm nach dem anderen, um dich auf die Bahn zu konzentrieren.',
      harder: 'Steigere die Last, verlängere die Pause am Boden, oder verlangsame das Absenken auf vier Sekunden.',
      readyWhen: 'Wenn drei Sätze zu zwölf mit sauberer Pause am Boden in jeder Wiederholung gelingen, steigere die Last.',
    },
    precautions:
      'Lass die Ellbogen nie im freien Fall fallen: der Bodenkontakt wird abgesetzt, nicht abgefangen.',
  },

  dumbbellRomanianDeadlift: {
    slug: 'rumaenisches-kreuzheben',
    muscles: { primary: 'Gesäß, hintere Oberschenkelmuskulatur', secondary: 'Unterer Rücken, Rumpf' },
    steps: [
      'Im Stand, eine Kurzhantel in jeder Hand vor den Oberschenkeln, Füße hüftbreit.',
      'Beuge die Knie nur leicht und halte diesen Winkel über die gesamte Bewegung konstant.',
      'Schiebe die Hüfte nach hinten und senke die Kurzhanteln an den Beinen entlang ab, Rücken flach.',
      'Senke ab, bis du die Spannung an der Oberschenkelrückseite spürst, und kehre zurück, indem du die Hüfte nach vorn schiebst.',
    ],
    mistakes: [
      'Die Knie während des Absenkens zunehmend beugen: die Bewegung wird zur Kniebeuge und verlässt die Beinrückseite.',
      'Rücken, der rundet, sobald die Hüftbeweglichkeit endet.',
      'Kurzhanteln, die sich von den Beinen entfernen, was die Belastung des unteren Rückens erhöht.',
    ],
    sensation:
      'Eine deutliche Spannung an der Oberschenkelrückseite beim Absenken, dann übernimmt das Gesäß beim Hochkommen. Der untere Rücken arbeitet haltend, nie bewegend.',
    rangeOfMotion:
      'Senke bis ans Ende der Dehnung der Beinrückseite ab, nicht tiefer: die Dehnfähigkeit bestimmt den Umfang, nicht die Höhe der Kurzhanteln. Sobald der Rücken rundet, ist die Grenze überschritten.',
    tempo:
      'Drei Sekunden abwärts, ein bis zwei aufwärts. Einatmen beim Absenken, ausatmen beim Vorschieben der Hüfte.',
    anatomy:
      'Die hintere Oberschenkelmuskulatur und der große Gesäßmuskel strecken die Hüfte: sie sind die Motoren. Die Rückenstrecker arbeiten isometrisch, um den Rücken flach zu halten — sie sollen die Bewegung nie erzeugen, nur verhindern. Es ist die einzige Übung der Bibliothek, die das Hüftscharnier unter Last trainiert.',
    mechanics:
      'Ein reines Hüftscharnier: Hüftbeugung und -streckung bei nahezu fixem Knie, in der Sagittalebene. Genau das unterscheidet es von der Kniebeuge — die Kniebeuge beugt Hüfte UND Knie, das Scharnier nur die Hüfte.',
    benefits: [
      'Vermittelt das Hüftscharnier, das Bewegungsmuster, das den Rücken bei jedem Aufheben vom Boden schützt.',
      'Belastet die Beinrückseite in der Hüftstreckung, die direkte Ergänzung zum Beinbeuger, der sie in der Kniebeugung trainiert.',
      'Kräftigt die gesamte hintere Kette in einer einzigen Bewegung.',
    ],
    progression: {
      easier: 'Verringere die Last, oder senke weniger tief ab, um im Umfang zu bleiben, in dem der Rücken flach bleibt.',
      harder: 'Steigere die Last, oder verlangsame das Absenken auf fünf Sekunden.',
      readyWhen: 'Wenn drei Sätze zu zwölf mit flachem Rücken über den ganzen Umfang gelingen, steigere die Last.',
    },
    precautions:
      'Ein flacher Rücken ist nicht verhandelbar: erfordert das Halten der Position ein Runden des Rückens, ist die Last zu schwer oder der Umfang zu groß.',
  },

  dumbbellCalfRaise: {
    slug: 'wadenheben-mit-kurzhanteln',
    muscles: { primary: 'Waden' },
    steps: [
      'Im Stand, eine Kurzhantel in jeder Hand seitlich, Füße hüftbreit.',
      'Gehe langsam auf die Fußballen hoch, so hoch wie möglich.',
      'Halte oben kurz inne, Waden angespannt.',
      'Senke langsam ab, bis die Fersen den Boden berühren.',
    ],
    mistakes: [
      'Unten federn statt das Absenken zu kontrollieren.',
      'Sprunggelenke, die nach außen kippen: das Gewicht bleibt über dem großen Zeh.',
      'Verkürzter Umfang oben, genau dort, wo die Wade am stärksten kontrahiert.',
    ],
    sensation:
      'Ein deutliches Brennen in der Wade, das schnell ansteigt. Die Last ist auch in den Unterarmen spürbar, die die Kurzhanteln über den ganzen Satz halten.',
    rangeOfMotion:
      'Gehe so hoch, wie es das Sprunggelenk zulässt, und senke bis zum Bodenkontakt ab. Auf einer Stufe mit frei hängenden Fersen verlängert sich der Umfang nach unten.',
    tempo:
      'Ein bis zwei Sekunden aufwärts, eine Pause oben, zwei bis drei abwärts. Die Langsamkeit leistet die Arbeit, nicht die Last.',
    anatomy:
      'Der dreiköpfige Wadenmuskel — Gastrocnemius und Soleus — erzeugt die Plantarflexion. Bei gestrecktem Knie dominiert der Gastrocnemius, weshalb die stehende Version jede sitzende Arbeit gut ergänzt, bei der der Soleus übernimmt.',
    mechanics:
      'Plantarflexion des Sprunggelenks in geschlossener Kette, mit einer äußeren Last zusätzlich zum Körpergewicht. Der Umfang ist von Natur aus kurz, was die Spannungsdauer entscheidender macht als die Wiederholungszahl.',
    benefits: [
      'Belastet die Waden über das Körpergewicht hinaus, was die unbelastete Version nicht mehr schafft, sobald fünfzehn Wiederholungen leichtfallen.',
      'Holt die Waden in der Bibliothek aus ihrer Isolation, zusammen mit der passenden Dehnung.',
      'Kräftigt den Abdruck beim Gehen und Laufen.',
    ],
    progression: {
      easier: 'Mach es ohne Kurzhanteln, oder halte dich mit einer Hand fest, um nur ein Gewicht zu führen.',
      harder: 'Steigere die Last, stell dich auf eine Stufe, um den Umfang zu verlängern, oder wechsle auf ein Bein.',
      readyWhen: 'Wenn drei Sätze zu zwanzig mit Pause oben gelingen, steigere die Last oder wechsle auf ein Bein.',
    },
    precautions:
      'Ein Krampf gegen Satzende ist in diesem Muskel häufig: verringere den Umfang und verlängere die Pause, statt die nächste Wiederholung zu erzwingen.',
  },

  dumbbellCurl: {
    slug: 'bizepscurl-mit-kurzhantel',
    muscles: { primary: 'Bizeps', secondary: 'Unterarme' },
    steps: [
      'Im Stand, eine Kurzhantel in jeder Hand, Arme seitlich am Körper, Handflächen nach vorn.',
      'Ellbogen an den Rippen, Schultern tief und Oberkörper unbewegt.',
      'Führe die Kurzhantel zur Schulter, ohne dass der Ellbogen nach vorn wandert.',
      'Senke langsam bis zur vollen Armstreckung ab.',
    ],
    mistakes: [
      'Schwingender Oberkörper, um die Last zu starten: dann arbeitet der Rücken, nicht der Bizeps.',
      'Ellbogen, die am Ende der Aufwärtsbewegung nach vorn wandern, wodurch die Schulter beteiligt wird.',
      'Fallengelassenes Absenken, obwohl die gebremste Phase die produktivste ist.',
    ],
    sensation:
      'Die Arbeit ist an der Armvorderseite spürbar, von der Ellenbeuge zur Schulter. Der Oberkörper soll völlig ruhig bleiben: das ist das beste Zeichen für eine passende Last.',
    rangeOfMotion:
      'Führe die Kurzhantel bis nahe an die Schulter und senke bis zum vollständig gestreckten Arm ab. Das Verkürzen unten ist die häufigste Art, unbemerkt zu schummeln.',
    tempo:
      'Eine Sekunde aufwärts, zwei bis drei abwärts. Ausatmen beim Hochführen.',
    anatomy:
      'Der zweiköpfige Armmuskel beugt den Ellbogen und supiniert den Unterarm — daher die nach vorn zeigende Handfläche, die ihn in eine günstige Lage bringt. Der darunterliegende Armbeuger beugt den Ellbogen unabhängig von der Handstellung; der Oberarmspeichenmuskel unterstützt.',
    mechanics:
      'Ellbogenbeugung in offener Kette bei konstanter Last: anders als beim Band ändert sich der Widerstand nicht, aber der Hebelarm ist am längsten, wenn der Unterarm waagerecht steht — dort ist die Bewegung am schwersten.',
    benefits: [
      'Die direkteste Bizepsbewegung, mit fein einstellbarer Last.',
      'Ergänzt die Zugbewegungen (Rudern, Latzug), bei denen der Bizeps nur zweitrangig ist.',
      'Jeder Arm arbeitet getrennt, was ein Ungleichgewicht sichtbar macht und korrigiert.',
    ],
    progression: {
      easier: 'Verringere die Last, oder lehne den Rücken an eine Wand, um jedes Schwingen auszuschließen.',
      harder: 'Steigere die Last, verlangsame das Absenken auf vier Sekunden, oder halte auf halber Höhe inne.',
      readyWhen: 'Wenn drei Sätze zu zwölf ohne Oberkörperbewegung gelingen, steigere die Last.',
    },
    precautions:
      'Schmerz in der Ellenbeuge, der sich vom muskulären Brennen unterscheidet, verlangt weniger Last: die Ellbogensehnen vertragen plötzliche Überlastung bei dieser Bewegung schlecht.',
  },

  dumbbellTricepsExtension: {
    slug: 'trizepsstrecken-ueber-kopf',
    muscles: { primary: 'Trizeps' },
    steps: [
      'Im Stehen oder Sitzen eine Kurzhantel mit beiden Händen halten, Arme über dem Kopf gestreckt.',
      'Ellbogen nach vorn zusammengeführt, so nah wie möglich an den Ohren.',
      'Beuge die Ellbogen, um die Kurzhantel hinter den Nacken abzusenken, ohne die Ellbogen abzuspreizen.',
      'Drücke zurück bis zur vollen Armstreckung, Ellbogen weiterhin eng.',
    ],
    mistakes: [
      'Ellbogen, die nach außen wandern, wodurch die Last vom Trizeps zur Schulter wechselt.',
      'Hohlkreuz, um fehlende Schulterbeweglichkeit auszugleichen.',
      'Zu schnelles Absenken, während die Last hinter dem Kopf ist.',
    ],
    sensation:
      'Die Arbeit ist an der Armrückseite spürbar, vom Ellbogen zur Schulter. Unbehagen im Schultergelenk zeigt, dass die Ellbogen abgespreizt sind oder die Last zu schwer ist.',
    rangeOfMotion:
      'Senke ab, bis du die Dehnung an der Armrückseite spürst, ohne zu forcieren, und drücke dann zu gestreckten Armen zurück. Mit den Armen über Kopf ist der lange Kopf des Trizeps bereits vorgedehnt, der nutzbare Umfang also kürzer als er wirkt.',
    tempo:
      'Ein bis zwei Sekunden aufwärts, zwei bis drei kontrolliert abwärts. Ausatmen beim Drücken.',
    anatomy:
      'Der dreiköpfige Armmuskel ist der einzige Ellbogenstrecker. Sein langer Kopf kreuzt auch die Schulter: die Überkopfposition setzt ihn schon vor Bewegungsbeginn unter Spannung, weshalb diese Variante ihn stärker fordert als eine Streckung mit dem Arm am Körper.',
    mechanics:
      'Ellbogenstreckung in offener Kette, mit über Kopf gebeugter und fixiert gehaltener Schulter. Das ist die Aufgabe von Rumpfspannung und engen Ellbogen: die Schulter am Mitmachen hindern, damit sich nur der Ellbogen bewegt.',
    benefits: [
      'Trifft den Trizeps in einer Position, die Dips und Liegestütze nicht nachbilden.',
      'Mit einer einzigen Kurzhantel machbar, im Stehen oder Sitzen, ohne Bank.',
      'Ergänzt den Curl, sodass in der Gruppe „Arme“ beide Armseiten abgedeckt sind.',
    ],
    progression: {
      easier: 'Verringere die Last, oder führe die Bewegung einarmig aus, um die Bahn besser zu kontrollieren.',
      harder: 'Steigere die Last, oder halte in der unteren Position eine Sekunde inne.',
      readyWhen: 'Wenn drei Sätze zu zwölf ohne abspreizende Ellbogen gelingen, steigere die Last.',
    },
    precautions:
      'Fang leicht an: die Last liegt hinter dem Kopf, und ein Kontrollverlust ist dort heikler als bei einer Bewegung vor dem Körper. Sitzend mit Rückenlehne ist der untere Rücken besser geschützt.',
  },

  chestPressMachine: {
    slug: 'brustpresse',
    muscles: { primary: 'Brust, Trizeps', secondary: 'Schultern' },
    steps: [
      'Stelle die Sitzhöhe so ein, dass die Griffe auf Brusthöhe liegen.',
      'Setze dich mit Rücken und Schultern fest an die Lehne, Füße flach am Boden.',
      'Drücke die Griffe nach vorn bis zur vollen Armstreckung, ohne die Ellbogen zu blockieren.',
      'Komme kontrolliert zurück, bis die Hände wieder auf Brusthöhe sind.',
    ],
    mistakes: [
      'Schultern, die von der Lehne abheben, um ein paar Zentimeter Druckweg zu gewinnen.',
      'Die Ellbogen am Ende des Drückens blockieren, was die Last auf das Gelenk verlagert.',
      'Zu schnelles Zurückkommen, obwohl die gebremste Phase die produktivste ist.',
    ],
    sensation:
      'Die Arbeit ist in Brust und Armrückseite spürbar, ohne Stabilisationsaufwand: den übernimmt die Lehne. Genau das unterscheidet diese Maschine von einem Liegestütz.',
    rangeOfMotion:
      'Komme zurück, bis die Hände auf Brusthöhe sind, nicht weiter — darüber hinaus geht die Schulter gegen eine geführte Last in übermäßige Streckung, was nichts bringt.',
    tempo:
      'Ein bis zwei Sekunden zum Drücken, zwei bis drei zum Zurückkommen. Ausatmen beim Drücken.',
    anatomy:
      'Der große Brustmuskel und der Trizeps sind die Motoren, die vordere Schulter unterstützt. Die Rückenlehne ersetzt die gesamte Rumpfarbeit, die ein Liegestütz verlangt, und konzentriert die Anstrengung auf die Druckmuskulatur und sonst nichts.',
    mechanics:
      'Horizontale Schulteradduktion mit Ellbogenstreckung auf einer von der Maschine vorgegebenen Bahn. Da der Oberkörper fixiert ist, ist die Variable die Last statt der Stabilität — das exakte Gegenteil eines Liegestützes.',
    benefits: [
      'Erlaubt es, horizontales Drücken ohne Partner und ohne Bank schwer zu belasten, mit feiner Lasteinstellung.',
      'Die geführte Bahn verringert das Risiko von Technikfehlern gegenüber einer belasteten freien Bewegung.',
      'Nützlich ergänzend zu Liegestützen oder als Ersatz, wenn Handgelenk oder Rumpf die Grenze setzen.',
    ],
    progression: {
      easier: 'Verringere die Last, oder verkürze den Umfang, indem du etwas weniger weit zurückkommst.',
      harder: 'Steigere die Last, verlangsame die Rückkehr auf vier Sekunden, oder halte in der unteren Position inne.',
      readyWhen: 'Wenn drei Sätze zu zwölf gelingen, ohne dass die Schultern die Lehne verlassen, steigere die Last.',
    },
    precautions:
      'Halte die Schultern von Anfang bis Ende an der Lehne: dieser Kontakt schützt das Gelenk auf einer vorgegebenen Bahn.',
  },

  legCurlMachine: {
    slug: 'beinbeuger',
    muscles: { primary: 'Hintere Oberschenkelmuskulatur', secondary: 'Waden' },
    steps: [
      'Stelle die Maschine so ein, dass die Rolle auf den unteren Waden liegt, direkt über den Fersen.',
      'Nimm die Position ein, Becken fest an der Auflage, Beine gestreckt ohne die Knie zu blockieren.',
      'Beuge die Knie, um die Fersen kontrolliert zum Gesäß zu ziehen.',
      'Senke langsam zurück in die Streckung, ohne die Last fallen zu lassen.',
    ],
    mistakes: [
      'Becken, das abhebt, um die Beugung zu unterstützen: die Bewegung verlässt die Beinrückseite.',
      'Ungebremstes Absenken, bei dem die Last von allein zurückfällt.',
      'Schlecht platzierte Rolle, zu hoch an der Wade, die stört statt zu belasten.',
    ],
    sensation:
      'Eine deutliche Kontraktion an der Oberschenkelrückseite, vom Knie Richtung Gesäß. Der untere Rücken soll nichts spüren: tut er es, hat sich das Becken gelöst.',
    rangeOfMotion:
      'Beuge so weit, wie es die Maschine ohne Beckenbewegung zulässt, und senke bis zur vollen Streckung ab, ohne zu blockieren. Bei dieser Bewegung zählt der volle Umfang mehr als die Last.',
    tempo:
      'Ein bis zwei Sekunden zum Beugen, zwei bis drei gebremst zurück. Ausatmen beim Beugen.',
    anatomy:
      'Die hintere Oberschenkelmuskulatur beugt das Knie: das ist ihre Hauptfunktion, und genau die belastet keine Körpergewichtsübung der Bibliothek direkt. Der Gastrocnemius, der ebenfalls das Knie kreuzt, unterstützt.',
    mechanics:
      'Kniebeugung in offener Kette bei fixierter Hüfte, auf geführter Bahn. Es ist die exakte Ergänzung zum rumänischen Kreuzheben, das dieselben Muskeln belastet, aber in der Hüftstreckung bei nahezu fixem Knie.',
    benefits: [
      'Schließt die einzige auffällige Lücke der Bibliothek: keine Übung belastete die Beinrückseite in der Kniebeugung.',
      'Gleicht die Oberschenkelarbeit aus, die stark vom Quadrizeps dominiert wird (Kniebeugen, Ausfallschritte, Beinpresse).',
      'Geführte Bahn und einstellbare Last, also messbarer Fortschritt.',
    ],
    progression: {
      easier: 'Verringere die Last, oder verkürze den Umfang, indem du etwas weniger weit beugst.',
      harder: 'Steigere die Last, verlangsame das Absenken auf vier Sekunden, oder halte in der gebeugten Position eine Sekunde inne.',
      readyWhen: 'Wenn drei Sätze zu zwölf ohne abhebendes Becken gelingen, steigere die Last.',
    },
    precautions:
      'Ein Krampf in der Oberschenkelrückseite ist bei dieser Bewegung häufig: verringere die Last und verlängere das Aufwärmen, statt weiterzumachen.',
  },

  treadmill: {
    slug: 'laufband',
    muscles: { primary: 'Ausdauer, Beine' },
    steps: [
      'Steige bei stehendem oder sehr langsamem Band auf und steigere das Tempo dann schrittweise.',
      'Wähle ein Tempo, bei dem Sprechen möglich, aber etwas außer Atem ist.',
      'Halte den Oberkörper aufrecht und den Blick weit nach vorn, ohne dich an den Griffen festzuhalten.',
      'Halte das Tempo über die gesamte Dauer und werde vor dem Absteigen schrittweise langsamer.',
    ],
    mistakes: [
      'Sich an den Seitengriffen festhalten: ein Teil des Gewichts wird getragen, die tatsächliche Anstrengung sinkt, während die angezeigte Geschwindigkeit gleich bleibt.',
      'Blick starr auf den Bildschirm, was die Nackenhaltung stört.',
      'Zu schnell starten, statt sich schrittweise ins Tempo einzufinden.',
    ],
    sensation:
      'Ein moderates Außer-Atem-Sein, über die gesamte Dauer stabil: ein Gespräch soll möglich, aber nicht bequem sein.',
    rangeOfMotion:
      'Kein Umfang einzustellen, sondern ein Schritt: Ferse aufsetzen, über den Fuß abrollen, die Arme frei aus der Schulter schwingen lassen.',
    tempo:
      'Ein gleichmäßiges, gehaltenes Tempo statt Beschleunigungen mit anschließender Erholung — es sei denn, Intervalle sind das Ziel des Tages.',
    anatomy:
      'Dieselbe Muskelkette wie beim Gehen: Gesäß und Beinrückseite treiben an, der Quadrizeps dämpft, die Waden liefern den Abdruck, und der Rumpf stabilisiert bei jedem Aufsetzen das Becken.',
    mechanics:
      'Zyklische Fortbewegung auf einem motorisierten Band. Der Unterschied zum Gehen im Freien liegt in der einstellbaren Steigung: sie erhöht, mehr als das Tempo, die Anstrengung, ohne den Aufprall zu erhöhen — ein Regler, den der Boden draußen nicht auf Wunsch bietet.',
    benefits: [
      'Erlaubt es, Tempo und Steigung genau festzulegen, sodass sich exakt dieselbe Anstrengung von Einheit zu Einheit reproduzieren lässt.',
      'Die Steigung belastet Gesäß und Waden stärker, ohne schneller laufen zu müssen.',
      'Unabhängig von Wetter und Uhrzeit, anders als das Gehen im Freien.',
    ],
    progression: {
      easier: 'Verringere die Geschwindigkeit vor der Dauer: fünfzehn gehaltene Minuten sind besser als dreißig erlittene.',
      harder: 'Erhöhe die Steigung bei konstantem Tempo, verlängere die Dauer, oder wechsle schnellere Abschnitte ein.',
      readyWhen: 'Wenn zwanzig Minuten in gleichmäßigem Tempo mit weiterhin möglichem Gespräch gelingen, erhöhe die Steigung.',
    },
    precautions:
      'Befestige den Not-Aus-Clip vor dem Start, und steige nie von einem laufenden Band ab.',
  },

  stationaryBike: {
    slug: 'heimtrainer',
    muscles: { primary: 'Ausdauer, Oberschenkel', secondary: 'Gesäß' },
    steps: [
      'Stelle den Sattel so ein, dass das Knie am tiefsten Pedalpunkt leicht gebeugt bleibt.',
      'Setze dich mit locker aufgelegten Händen hin, der Rücken weder eingesunken noch im Hohlkreuz.',
      'Finde eine gleichmäßige Trittfrequenz und stelle dann den Widerstand auf dein Arbeitstempo ein.',
      'Halte Frequenz und Widerstand über die gesamte Dauer und schließe mit einigen leichten Minuten ab.',
    ],
    mistakes: [
      'Zu tiefer Sattel: das Knie bleibt unten zu stark gebeugt, was das Gelenk unnötig belastet.',
      'Becken, das von einer Seite zur anderen schaukelt — ein Zeichen für einen zu hohen Sattel.',
      'Fast kein Widerstand bei sehr hoher Trittfrequenz, was Anstrengung vortäuscht, ohne sie zu erzeugen.',
    ],
    sensation:
      'Moderates Außer-Atem-Sein und ein allmähliches Warmwerden der Oberschenkel. Anders als beim Gehen oder Laufband ruht das Körpergewicht nie auf den Beinen.',
    rangeOfMotion:
      'Kein Umfang einzustellen, sondern eine Sattelhöhe: das Knie behält unten eine leichte Beugung, ohne dass das Becken kippen muss, um das Pedal zu erreichen.',
    tempo:
      'Eine gleichmäßige, über die gesamte Dauer gehaltene Trittfrequenz. Der Widerstand ist der eigentliche Intensitätsregler, nicht die Trittgeschwindigkeit.',
    anatomy:
      'Quadrizeps und großer Gesäßmuskel erzeugen bei jedem Tritt die Knie- und Hüftstreckung; die Beinrückseite und die Waden beteiligen sich beim Hochziehen, wenn die Füße fixiert sind. Die sitzende Position entlastet Wirbelsäule und tragende Gelenke vollständig.',
    mechanics:
      'Zyklisches Treten in geschlossener Kette ohne Gewichtsbelastung: das ist die Achse, die das Rad vom restlichen Ausdauerangebot der Bibliothek unterscheidet — der Körper wird vom Sattel getragen, Knie, Hüften und Rücken erfahren also weder Aufprall noch gewichtsbedingte Kompression.',
    benefits: [
      'Das einzige Ausdauertraining der Bibliothek, bei dem die Beine kein Gewicht tragen, also auch machbar, wenn Gehen oder Laufen ein Gelenk stört.',
      'Der Widerstand lässt sich fein einstellen, was die Intensität von Einheit zu Einheit reproduzierbar macht.',
      'Erlaubt lange Dauern ohne aufsummierte Gelenkbelastung.',
    ],
    progression: {
      easier: 'Senke den Widerstand, bevor du die Dauer kürzt, und halte eine bequeme Trittfrequenz.',
      harder: 'Erhöhe den Widerstand bei konstanter Frequenz, verlängere die Dauer, oder wechsle härtere Blöcke ein.',
      readyWhen: 'Wenn zwanzig Minuten gelingen, ohne dass die Frequenz zum Ende abfällt, erhöhe den Widerstand.',
    },
    precautions:
      'Ein schmerzendes Knie kommt fast immer von der Sattelhöhe, nicht von der Anstrengung: prüfe die Einstellung, bevor du die Intensität verringerst.',
  },

  rowingMachine: {
    slug: 'rudergeraet',
    muscles: { primary: 'Ausdauer, Rücken, Beine', secondary: 'Arme, Rumpf' },
    steps: [
      'Schnalle die Füße fest, greife den Griff mit gestreckten Armen, Schienbeine senkrecht, Oberkörper leicht vorgeneigt: das ist der Auszug.',
      'Drücke zuerst kräftig mit den Beinen, Arme noch gestreckt und Oberkörper ruhig.',
      'Wenn die Beine fast gestreckt sind, öffne den Oberkörper nach hinten und ziehe erst dann den Griff zu den unteren Rippen.',
      'Kehre in umgekehrter Reihenfolge zurück: Arme strecken, Oberkörper nach vorn bringen, dann die Beine beugen.',
    ],
    mistakes: [
      'Mit den Armen ziehen, bevor die Beine gedrückt haben: der häufigste Fehler, und er nimmt der Bewegung ihre wichtigste Kraftquelle.',
      'Den Oberkörper zu früh öffnen, was die Last auf den unteren Rücken verlagert.',
      'Runder Rücken im Auszug, unter dem Vorwand, weiter nach vorn zu kommen.',
    ],
    sensation:
      'Zuerst brennen die Beine, dann Rücken und Arme. Ermüden die Arme vor den Beinen, ist die Reihenfolge des Zugs vertauscht.',
    rangeOfMotion:
      'Der Griff kommt an die unteren Rippen, nicht an die Brust oder den Bauch. Im Auszug stehen die Schienbeine senkrecht: weiter zu gehen bringt nichts und belastet den Rücken.',
    tempo:
      'Ein gleichmäßiger Rhythmus, wobei die Rückführung etwa doppelt so langsam ist wie der Durchzug. Dieses Verhältnis, nicht die Schlagzahl, unterscheidet einen sauberen von einem hastigen Zug.',
    anatomy:
      'Quadrizeps und Gesäß erzeugen den Großteil der Kraft im Durchzug; anschließend ziehen breiter Rückenmuskel, Rhomboiden und mittlerer Trapezmuskel das Schulterblatt zur Wirbelsäule; der Bizeps beendet die Bewegung. Der Rumpf überträgt die Kraft der Beine auf den Oberkörper, was das Rudern zu einer Ganzkettenbewegung macht.',
    mechanics:
      'Eine viergeteilte Abfolge — Auszug, Durchzug, Endzug, Rückführung — aus Beinstreckung, Hüftstreckung und horizontalem Zug. Es ist die einzige Bewegung der Bibliothek, bei der die Reihenfolge der Abschnitte ebenso zählt wie die erzeugte Kraft: Beine, dann Oberkörper, dann Arme.',
    benefits: [
      'Das einzige Ausdauertraining der Bibliothek, das zugleich eine echte Technik ist: die Zugqualität verbessert sich zusammen mit der Kondition.',
      'Trainiert die Zugkette, die den übrigen Ausdauerübungen fehlt.',
      'Ohne Aufprall und dennoch mit deutlich mehr beteiligter Muskelmasse als Gehen oder Radfahren.',
    ],
    progression: {
      easier: 'Kürze die Dauer, bevor du die Schlagzahl erhöhst, und konzentriere dich auf die Reihenfolge Beine-Oberkörper-Arme.',
      harder: 'Verlängere die Dauer, erhöhe die Schlagzahl unter Beibehaltung des Verhältnisses von Rückführung und Durchzug, oder arbeite in Blöcken.',
      readyWhen: 'Wenn fünfzehn Minuten mit durchgehend eingehaltener Zugreihenfolge gelingen, verlängere die Dauer.',
    },
    precautions:
      'Der untere Rücken darf nie der Motor sein: setzt dort Ermüdung ein, öffnet sich der Oberkörper, bevor die Beine zu Ende gedrückt haben. Beginne langsamer und leichter neu.',
  },
};
