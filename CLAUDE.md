# CIRKALI

Planificateur et minuteur de séance, avec ou sans matériel. Site statique, multilingue
(fr, en, es, de, it), **sans compte obligatoire** : tout l'état vit dans le
`localStorage` du navigateur, qui reste la source de vérité de l'app. Une
connexion Google facultative (Firebase Auth + Firestore, `src/cloud/`) en fait
un miroir en ligne, sauvegardé à chaque modification ; sans elle, rien ne quitte
l'appareil et le SDK Firebase n'est même pas téléchargé.

L'application a deux écrans : le **planificateur** (choisir la séance active
parmi plusieurs séances sauvegardées, construire son déroulé, réordonner,
régler les pauses) et le **lecteur** (`.run`, plein écran, chrono + anneau de
progression + bip).

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement sur le port 8000, exposé sur le réseau local |
| `npm run build` | `tsc --noEmit`, build Vite vers `dist/`, puis génère les pages d'exercice, `dist/creer-une-seance-par-lien.html`, `dist/llms.txt` et `dist/sitemap.xml` (`scripts/build-exercise-pages.ts`) |
| `npm run preview` | Sert `dist/` sur le port 8000 |
| `npm run build:app` | Construit `dist-app/`, le bundle embarque dans l'application mobile : ni publicite, ni analytique web, ni pages generees (`scripts/build-app.ts`) |
| `npm run app:sync` | `build:app` puis `cap sync` — recopie le bundle dans `android/` et `ios/`. **Node ≥ 22 requis par la CLI Capacitor** |
| `npm run app:android` / `app:ios` | Idem, puis ouvre Android Studio / Xcode |
| `npm run typecheck` | Le filet du projet — il n'y a pas de suite de tests |
| `npm run check` | Build, puis vérifie ce qu'il a **produit** dans `dist/` (`scripts/check-build.ts`) — lancé aussi par la CI |
| `npm run indexnow` | Signale les URL du sitemap à Bing/Yandex/Seznam/Naver (`--dry` pour voir sans envoyer). **Pas Google.** À lancer après un vrai changement de contenu, pas à chaque déploiement |
| `npm run exo <clé>` | Où lire le contenu long d'un exercice : bornes de lignes dans les 5 langues, champs manquants (`scripts/show-exercise.ts`) |

`npm run typecheck` est ce qui tient le projet : il vérifie le code **et** le fait
que les cinq langues exposent exactement les mêmes clés. `npm run check` couvre
l'autre moitié, celle qu'aucun type ne peut voir : le texte français bien présent
pour les robots sans JS, les 62 clés d'exercice lisibles par une IA, le JSON-LD
valide, l'exemple `?s=` de la page de spec réellement décodable, et les 310 fiches
non vides et inscrites au sitemap.

## Architecture

```
src/
  main.ts          detecte la langue, charge l'etat, monte l'app
  core/            logique pure, sans DOM
    types.ts       PlanItem / Step / SessionConfig / SavedPlan
    plan.ts        creation de lignes, resolution des noms traduits
    queue.ts       LE moteur : buildClassic, buildCircuit, queueDuration
    storage.ts     localStorage v5 (plusieurs SavedPlan) + migration depuis la v4/v3
    share.ts       format dense du lien/QR de partage (?s=), base64url
    ai-plan.ts     format JSON lisible (?plan=), le filet du pilotage par une IA
  cloud/           sauvegarde en ligne, facultative — jamais chargee sans compte
    firebase.ts    config publique + chargement paresseux du SDK
    sync.ts        LE pilote : poussee automatique debouncee, fusion a la connexion
    merge.ts       fusion pure seance par seance (updatedAt + pierres tombales)
    session-hint.ts  un bit local : « etait connecte », pour ne pas charger le SDK pour rien
  data/            donnees sans texte
    tenants.ts     variantes par sous-domaine (salles de sport) — vide pour l'instant
    groups.ts      l'arbre des 12 groupes musculaires : ids, parents, couleurs
    library.ts     62 exercices : reglages seulement
    presets.ts     les 6 seances CIRKALI toutes faites (jamais persistees)
    categories.ts  ids des categories d'equipement (filtre bibliotheque)
    figures.ts     figures SVG
  content/
    exercise-details/     contenu long par langue (fr, en, es, de, it) :
                          etapes, muscles, anatomie — skill seance-fiches-generees
    image-prompts.ts      prompts d'illustration — UNE source pour les 5 langues
    exercise-page.css     styles des pages d'exercice statiques
  i18n/
    index.ts       t(), pluriels via Intl.PluralRules, detection, formatDate
    locales/       fr (source) + en, es, de, it
  ui/              rendu et interactions, un module par zone d'ecran
    app.ts         orchestration : etat partage, sauvegarde, cycles de rendu
    plan-switcher.ts  choix/creation/duplication/renommage/suppression de seance
    preset-dialog.ts  « creer votre version ? » a la 1re retouche d'une seance CIRKALI
    toast.ts       toast transitoire avec action (annulation de suppression)
    inline-input.ts  formulaire inline, remplace un window.prompt() natif
    dom.ts         el(), byId(), applyStaticTranslations()
    share.ts       modales partage (QR) et import ; lecture de ?s= et ?plan=
    webmcp.ts      outils exposes a un navigateur agentique — charge a la demande
  platform/        audio.ts (bip), wakelock.ts (ecran allume),
                   storage.ts (stockage durable + politique Safari)
scripts/
  build-exercise-pages.ts  genere dist/exercises/*, dist/creer-une-seance-par-lien.html,
                           dist/llms.txt, dist/sitemap.xml, docs/image-prompts.md
```

Les modules d'interface reçoivent un `Context` (`ui/app.ts`) qui leur donne
l'état, `save()` et les deux niveaux de rendu. Chacun expose un `render()` et
installe ses propres écouteurs par délégation.

**Deux niveaux de rendu**, à respecter : `renderAll()` reconstruit tout (après un
changement de structure, de mode ou de langue) ; `renderDerived()` ne rafraîchit
que l'aperçu et la barre de statut. Une saisie chiffrée passe par
`renderDerived()` — reconstruire la liste ferait perdre le focus du champ.

**Deux styles de champ, à ne pas confondre.** `.f-inline` (`ui/dom.ts`,
`numberField()`/`selectField()`) est le champ compact des cartes du déroulé :
l'unité se lit *à côté* du nombre (`[ 3 ] séries`, `[ 10 ] [reps ▾]`), le
libellé complet vit dans l'`aria-label`. `.f` est l'autre motif, étiquette
empilée au-dessus du champ, utilisé par le bloc réglages d'`index.html` et
par le sélecteur de séance (`ui/plan-switcher.ts`). Ne pas fusionner les
deux : c'est le passage en `.f-inline` qui a fait tomber la carte du déroulé
de ~279px à ~193px, mais un bloc de réglages isolé a besoin de son étiquette
lisible au-dessus.

**`.unit-select` : le sélecteur d'unité affiche deux textes différents.** Dans
la liste déroulante, les libellés longs (« Répétitions », « Secondes ») — un
`s` isolé ne se comprend pas au moment de choisir ; une fois l'option
sélectionnée, la carte n'affiche que l'unité courte (`reps`, `s`). Un
`<select>` natif ne sait pas faire ça : fermé, il rend toujours le texte de
l'option sélectionnée, et ni `option[label]` ni la CSS ne dissocient les deux
états (il n'y a pas non plus d'événement d'ouverture exploitable — sur mobile
c'est une feuille native de l'OS). D'où le motif de `selectField()` quand on
lui passe `display` : **le conteneur porte l'apparence** (fond, bordure,
flèche) et le libellé court, et le `<select>` natif est posé par-dessus en
`position: absolute; opacity: 0`. On garde donc le sélecteur natif, le
clavier et l'accessibilité, et la largeur du champ ne dépend plus de l'option
la plus longue. Deux conséquences à ne pas défaire : le focus se dessine sur
le conteneur (`:focus-within`, l'`opacity: 0` emporterait l'anneau du select),
et la règle d'apparence des selects visibles est scopée en `.f-inline >
select` — sans le combinateur enfant, elle rhabillerait aussi le select
transparent.

## Les trois règles non devinables à la lecture

### 1. `i18n/locales/fr.ts` est la source de vérité

`Translations` en dérive (`Mirror<typeof fr>`). On ajoute donc **toujours** une
clé dans `fr.ts` d'abord : les quatre autres langues deviennent alors des erreurs
de compilation tant qu'elles ne la fournissent pas. Une clé en trop est refusée
de la même façon.

Les entrées pluralisées sont des objets `{ one, other, … }` ; `t()` choisit la
forme avec `Intl.PluralRules` d'après `params.count`, et retombe sur `other` si la
catégorie n'est pas fournie. Ne jamais recomposer un pluriel à la main du genre
`n > 1 ? 's' : ''` : les règles diffèrent d'une langue à l'autre.

### 2. Jamais de texte traduit dans un objet persisté

C'était le défaut du monolithe d'origine : chaque ligne du déroulé stockait le nom
et le conseil, ce qui figeait la langue au moment de l'ajout. Une `ExerciseItem`
ne contient qu'une `key` ; le nom et le conseil sont résolus à l'affichage par
`exerciseName()` / `exerciseCue()` (`core/plan.ts`). Seul `customName`, saisi par
l'utilisateur, est stocké tel quel.

Corollaire : les `Step` de la file portent une référence à l'`ExerciseItem`, pas
une copie de son nom. C'est ce qui permet de changer de langue **pendant** une
séance et de voir l'écran se retraduire immédiatement.

### 3. Modifier le schéma persisté impose une migration

Les clés de stockage sont versionnées (`seance.plans.v5`, …) dans
`core/storage.ts`. Tout changement de forme des données stockées demande de
bumper la version **et** d'écrire la migration. `parseItem()` accepte aujourd'hui
les deux formes (v3 `type: 'ex'` avec nom inline, v4/v5 `type: 'exercise'`) et
ne supprime jamais les anciennes clés : chaque version est écrite à côté de la
précédente, jamais à sa place.

**v6 : `SavedPlan.updatedAt` + `State.deleted`.** Ces deux ajouts n'existent
que pour la sauvegarde en ligne (`src/cloud/`) : sans eux une fusion entre deux
appareils ne saurait ni quelle version d'une séance est la plus récente, ni
distinguer « supprimée ici » de « pas encore connue ici » — une séance
supprimée sur le téléphone reviendrait du nuage à chaque synchronisation.
`updatedAt` est estampillé **automatiquement par `saveState()`**, qui compare le
contenu (`name`/`items`/`config`, jamais `updatedAt` lui-même) à la dernière
écriture : surtout ne pas le remplacer par un `touch()` à appeler depuis l'UI,
il serait oublié au premier module ajouté et la modification serait
silencieusement perdue au profit d'une version distante plus ancienne. Les clés
`seance.locale.v5` et `seance.history.v4` ne bougent pas — leur forme n'a pas
changé, on ne bumpe que ce qui change de forme.

**v5 : plusieurs séances sauvegardées, pas un seul plan.** `State` est
`{ plans: SavedPlan[], activePlanId, history }` ; chaque `SavedPlan` porte son
propre déroulé (`items`) et ses propres réglages (`SessionConfig` :
mode/pause/transition). La langue (`locale`) n'est **plus** dans ce réglage —
elle est globale à l'app (clé `seance.locale.v5`), lue par `main.ts` avant
même qu'un plan existe, et `core/queue.ts` ne l'a d'ailleurs jamais lue.
`SavedPlan.name` suit la même règle que `customName` sur `ExerciseItem`
(section précédente) : `null` ou du texte saisi par l'utilisateur, jamais un
libellé traduit résolu à chaque affichage — le nom affiché pour une séance
sans nom (`plans.unnamed`) est résolu à l'affichage par `ui/plan-switcher.ts`,
jamais stocké. Seule exception assumée : `duplicatePlan()` (`ui/app.ts`)
ajoute le suffixe `plans.copyName` (« {name} - copie ») **une seule fois, à
la duplication** — comme un tableur qui nomme une copie « Copie de … » —
donc ce texte reste figé dans la langue active à cet instant si l'utilisateur
change ensuite de langue ; accepté comme compromis, contrairement à un
libellé de chrome qui doit toujours suivre la langue courante. `loadState()`
migre l'ancien schéma v4 (un seul plan + une config qui
mélangeait réglages et langue) en une unique `SavedPlan` nommée `null` ; les
clés v4 et v3 restent lisibles et ne sont jamais effacées. Partout dans l'UI,
`ctx.activePlan()` (`ui/app.ts`) est l'accesseur à utiliser — jamais
`ctx.state.plans.find(...)` répété à chaque endroit. **`state.plans` peut être
vide** : une première visite n'écrit rien du tout (voir la section suivante),
et l'invariant tenu n'est pas « il y a au moins une séance enregistrée » mais
« il y a toujours une séance affichée » — c'est `ensureActive()` (`ui/app.ts`)
qui le garantit, en ouvrant le modèle d'accueil quand il ne reste rien.

## Les seances CIRKALI ne sont pas des donnees de l'utilisateur

**Une première visite s'ouvre sur l'une d'elles** (`DEFAULT_PRESET`, « Full
body sans matériel ») et n'écrit rien : plus de « séance type » fabriquée dans
`loadState()`. Ce n'est pas qu'une économie de stockage, c'est ce qui a
supprimé le code le plus retors du projet — chaque appareil se créait *sa*
séance type avant même de connaître le compte, et `cloud/merge.ts` devait donc
reconnaître ces copies pour ne pas les empiler à chaque nouvel appareil
connecté (`isPristineDefaultPlan()`, `dropPristineDefaults()`, comparaison
champ à champ contre un `defaultPlan()` de référence). Plus aucun appareil
n'en crée, donc il n'y a plus rien à dédupliquer, plus de dernière séance à
protéger de la suppression, et un tableau `plans` vide est une réponse
valide — que `parsePlansList()` distingue soigneusement d'un « illisible »,
sans quoi tout supprimer ferait ressusciter les données v5 au rechargement
suivant.

`src/data/presets.ts` porte six seances toutes faites, en dur dans le bundle.
Elles n'existent **ni dans le `localStorage` ni dans Firestore** : elles sont
reconstruites a chaque chargement (`presetToPlan()`, `core/plan.ts`), listees
apres celles de la personne dans leur propre `<optgroup>`, et ne se renomment
ni ne se suppriment — il n'y a rien d'ecrit a renommer ou a supprimer. Aucun
texte dans `presets.ts` : le nom vit sous `presets.name.<id>` et se resout a
l'affichage, comme `plans.unnamed` (regle n°2).

Selectionner un modele materialise une `SavedPlan` **en memoire seulement**
(le `draft` de `ui/app.ts`), que `ctx.activePlan()` renvoie a la place de la
seance active : toute l'interface la manipule comme n'importe quelle autre
seance, sans un seul `if` de plus. `state.activePlanId` continue pendant ce
temps de designer une vraie seance — un id de modele ne doit jamais partir
dans le document distant.

**Le point d'arbitrage est `save()`, et lui seul.** A la premiere modification
d'un modele, `save()` n'ecrit rien et ouvre `ui/preset-dialog.ts` : accepter
cree la copie personnelle (`adoptPreset()`, le seul chemin par lequel une
seance CIRKALI est un jour ecrite), refuser rend au modele sa forme d'origine.
Meme raison qu'ailleurs : toute modification de l'app passe deja par `save()`,
donc un module ajoute demain est couvert sans cablage — ne pas eparpiller ce
test dans les modules d'UI. Le nom fige a l'adoption est traduit dans la langue
du moment, comme le suffixe de `duplicatePlan()`, et pour le meme motif.

## Les exercices perso remontent, pour combler la bibliotheque

Quand quelqu'un cree un exercice a la main, c'est qu'il ne l'a pas trouve : le
nom tape est le meilleur signal disponible sur ce qui manque a `LIBRARY`.
`cloud/exercise-feedback.ts` l'envoie dans la collection Firestore
`customExercises`, un document par nom normalise, `count` comptant les
**appareils distincts** grace au garde local `seance.customSent.v1`. On le lit
depuis la console Firebase.

**Ce module n'importe rien de `firebase/*`**, et c'est la contrainte qui a
dicte sa forme : la collecte vise aussi les visiteurs anonymes, or leur faire
telecharger les ~200 Ko du SDK annulerait tout ce que `session-hint.ts`
protege. Un `fetch` sur l'API REST fait le meme travail a cout nul.

**Le point d'accroche est unique et doit le rester** : le seul `onConfirm` du
formulaire « Exercice perso » (`ui/app.ts`). Ni `createFromTenant()` — le
catalogue d'une salle, deja connu — ni les lignes perso arrivant par un lien
`?s=`/`?plan=`, souvent inventees par une IA plutot que demandees. Un second
appelant, c'est une liste polluee.

**Le groupe musculaire se choisit a la creation**, dans la modale
`ui/custom-exercise.ts`, et nulle part ailleurs : `createCustom(name, group)`
prend donc un parametre requis, et `ui/planner.ts` n'a plus de `selectField`
de groupe. Contrepartie assumee, un groupe mal choisi impose de refaire la
ligne — le badge et la bordure coloree le rendent visible.

Une modale et non `createInlineInput()` (que la skill `seance-ui-module`
recommande pourtant par defaut) : le formulaire inline ne porte qu'un champ,
et deux champs cote a cote dans la rangee d'actions y tenaient mal. Ses deux
autres appelants — creation et renommage d'une seance, un seul nom a saisir —
le gardent. Le `<select>` de groupe reste **vide dans `index.html`** et se
remplit a chaque ouverture (`fillGroups()`) : ses libelles doivent suivre la
langue active, comme ceux du filtre de la bibliotheque.

**`customExercises` est la seule collection ecrivable sans compte.**
`firestore.rules` en verrouille la *forme* — cinq champs, nom ≤ 60, groupe
borné en longueur, horodatages typés `timestamp`, `count` qui ne peut
qu'augmenter de un, lecture et suppression interdites — mais **pas le volume** : quelqu'un peut epuiser les 20 000
ecritures/jour et casser la sauvegarde en ligne jusqu'a minuit. Sortie de
secours : passer `create` a `if false`. Risque accepte en connaissance de
cause.

`group` y est un **champ libre**, borné en longueur seulement. La liste des
valeurs y a vécu un temps, en copie de `GROUP_IDS` que les règles ne peuvent pas
importer : ce couplage se serait payé au premier groupe ajouté, la règle rejetant
en silence une valeur pourtant légitime — et la collecte étant muette par
conception, personne ne l'aurait vu. Ce n'était pas une précaution théorique :
trois groupes ont été ajoutés le lendemain du retrait de cette liste. Le client
n'envoie de toute façon que les identifiants connus, la modale étant un
`<select>`.

Le typage des deux horodatages n'est pas cosmétique : `keys().hasOnly()` teste
un **sous-ensemble**, donc `firstAt` et `lastAt` étaient facultatifs *et* de
type libre — une écriture anonyme pouvait y loger ~1 Mio de texte arbitraire.
C'est un canal distinct du risque de quota assumé ci-dessus : celui-là, c'est
du stockage.

**La collecte est declaree dans la page de confidentialite et nulle part
ailleurs** — decision explicite : rien n'a ete ajoute a l'accueil ni au
formulaire de saisie. `check-build.ts` verifie la presence du paragraphe dans
les cinq langues, et que `firestore.rules` porte toujours ses cinq verrous —
une assertion qui ne prouve rien de la production (la CI ne deploie pas ce
fichier), mais une trace amputee garantit qu'on recollera un jour une regle
trouee.

## Variantes par sous-domaine (`src/data/tenants.ts`)

**Skill `add-salle`** : la marche à suivre complète pour en ajouter une.

Une salle de sport par hôte — `<salle>.cirkali.fr` — servie par **le même
déploiement, le même `index.html` et le même bundle** que cirkali.fr. Rien
n'est forké, rien n'est reconstruit : `main.ts` lit le premier libellé de
l'hôte, le cherche dans `TENANTS`, et seules des **données** changent — des
exercices en plus dans la bibliothèque, d'autres séances toutes faites.
`TENANTS` est vide aujourd'hui, donc l'app se comporte exactement comme s'il
n'y avait pas de mécanisme.

**Un exercice de salle est une ligne perso** (`key: 'custom'` + son nom), pas
une nouvelle clé de bibliothèque : c'est ce qui lui permet de traverser le
stockage, un lien `?s=` et le document Firestore sans qu'aucun format ne
bouge, et de rester lisible sur cirkali.fr où cette salle n'existe pas — le nom
voyage avec la ligne. Contrepartie assumée : pas de fiche détaillée, figure
générique. Promouvoir un exercice de salle vers CIRKALI, c'est déplacer son
entrée vers `LIBRARY` puis lui donner ce que le catalogue public exige (clé,
5 langues, figure, contenu long — skill `add-exercise`).

**La sauvegarde en ligne est commune** : un compte Google porte un seul
document Firestore quel que soit le sous-domaine. Les séances faites à la salle
et celles faites chez soi arrivent dans la même liste — elles suivent la
personne, pas le lieu.

Ce qui demandera une **page générée au build** le jour où une salle en aura
besoin : thème, textes propres, retrait des encarts publicitaires, et la
réservation de hauteur `--lib-rows` (calculée depuis `LIBRARY.length`, elle
ignore les exercices d'une salle). Tant qu'il ne s'agit que de données, rien de
tout ça n'est nécessaire.

## Les groupes musculaires forment un arbre, pas une liste

`src/data/groups.ts` porte douze groupes sur **deux étages** : `upper` contient
poitrine, épaules, dos et bras ; `lower` contient cuisses, fessiers et mollets ;
`core`, `cardio` et `fullbody` sont des feuilles isolées.

**Un parent est une réponse légale, pas un simple titre d'affichage.** C'est
toute la raison d'être de l'arbre : « je travaille toute la jambe » doit pouvoir
se dire sans trancher entre cuisses, fessiers et mollets. Une liste plate
n'offrait que le choix entre trop précis et faux.

**Trois conséquences à ne pas défaire :**

- **Deux groupes se comparent par `groupsOverlap()`, jamais par `===`.** Ils se
  recouvrent s'ils sont égaux ou si l'un contient l'autre. Le mode circuit
  (`core/queue.ts`) et le filtre de la bibliothèque en dépendent : avec une
  égalité, le circuit enchaînerait un exercice « jambes » et un exercice
  « mollets » sans la pause qui leur est due, en croyant avoir changé de zone.
  Le bug n'existait pas tant que la liste était plate — il naît avec les
  parents.
- **Les ids sont figés, on en ajoute mais on n'en renomme aucun.**
  `core/share.ts` encode l'identifiant en clair dans les liens `?s=` (pas son
  rang, ce qui rend au contraire un ajout parfaitement sûr). D'où deux noms
  internes trompeurs qu'on garde : `push` désigne la poitrine — c'est un nom de
  patron de mouvement, pas de muscle — et `legs` les seules cuisses. Ce que la
  personne lit, ce sont les libellés i18n, qui disent juste.
- **Une entrée de `LIBRARY` nomme toujours une zone précise, jamais un parent.**
  Le parent existe pour l'exercice perso de quelqu'un qui ne veut pas trancher,
  pas pour une fiche rédigée à tête reposée. `check-build.ts` l'impose.

**Deux étages et pas trois.** Au troisième — pectoraux contre triceps,
quadriceps contre ischios — la classification cesse d'être un arbre : le triceps
relève de la poussée *et* du bras, l'avant-bras du tirage *et* du bras. Aucune
application grand public n'y descend, et le format `?s=` ne saurait pas en
porter deux à la fois. Ce qui manque encore (avant-bras, adducteurs, trapèzes)
a partout un parent où se ranger sans hésiter : on y perd de la précision,
jamais un endroit où classer. La collecte `customExercises` dira si ça se paie.

Dans les sélecteurs (`groupOptions()`, `ui/dom.ts`), chaque parent ouvre un
`<optgroup>` **dont il est la première option** : un label d'`<optgroup>` n'est
pas sélectionnable en HTML. Le libellé apparaît donc deux fois dans la liste
ouverte, et c'est voulu — refermé, un `<select>` n'affiche que le texte de
l'option choisie, jamais le titre de son groupe, exactement le piège documenté
pour `.unit-select`.

## Ce qui arrive par une URL est hostile, pas seulement peu fiable

Les parseurs de `core/storage.ts` lisent quatre entrées que personne ne
contrôle : le `localStorage`, un lien `?s=`, un lien `?plan=` et le document
distant. Ils étaient tolérants et bornés **par le bas** (`Math.max(1, …)`),
jamais par le haut — et ça n'était pas théorique : un lien de 138 caractères
portant `sets: 1e9` gelait l'onglet, `buildClassic()` construisant une étape
par série et la barre de statut reconstruisant la file à chaque rendu. La
séance étant écrite en `localStorage` **avant** ce rendu, l'app regelait à
chaque rechargement, sans autre recours que vider les données du site.

**Toute valeur venue de l'extérieur se borne donc aux deux bouts**, dans
`parseItem()` / `parsePlan()` / `parsePlanName()` et nulle part ailleurs :
c'est le goulot par lequel passent les quatre sources, et un second jeu de
bornes posé dans `share.ts` ou `ai-plan.ts` divergerait. Les plafonds
(`MAX_SETS`, `MAX_REPS`, `MAX_SECONDS`, `MAX_ITEMS`, `MAX_NAME`) sont
volontairement très au-dessus des maxima de l'interface : ils disent « ce
n'est plus une séance », pas « ce n'est pas ce que le formulaire propose » —
un lien écrit par une IA qui demande 12 séries doit s'importer tel quel, et
une séance existante ne doit jamais se faire tronquer au rechargement.

Deux pièges qui ont chacun laissé un champ dehors. `core/share.ts` relisait le
nom de séance lui-même au lieu d'appeler `parsePlanName()` — c'était le seul
champ non borné du format. Et un `<input type="number">` laisse **taper**
au-delà de son attribut `max` : sans le plafond de `NUMERIC_FIELDS`
(`ui/planner.ts`), saisir 99999 séries dans une carte atteint la même faille
sans le moindre lien.

## La charge est facultative, et c'est ce qui la rend gratuite

`ExerciseItem.weight` porte des kilogrammes, et **est absent quand il n'y en a
pas**. Une séance au poids du corps ne gagne donc pas un octet en stockage, pas
un caractère dans son lien, pas un champ dans sa carte — et le moteur
(`core/queue.ts`) n'a rien eu à apprendre, le `WorkStep` portant déjà une
référence à l'`ExerciseItem`. C'est l'optionalité, et elle seule, qui a permis
d'ajouter la charge sans alourdir le reste : la défaire (un `weight: 0` par
défaut) ferait payer le champ à toutes les lignes qui n'en veulent pas, et
obligerait à distinguer partout « pas de charge » de « 0 kg ».

**Pas de bump de version, contrairement à la règle n°3, et c'est argumenté.**
Un champ facultatif se dégrade correctement dans les deux sens : un ancien
build ignore la clef inconnue, un nouveau lit `undefined`. Bumper aurait au
contraire un coût réel — l'ancien build continuerait d'écrire `seance.plans.v6`
pendant que le nouveau écrit v7, et les deux divergeraient pour toujours. Le
seul vrai risque (un appareil resté sur l'ancien bundle qui modifie une séance
et la repousse au nuage sans les charges, `updatedAt` faisant foi) existe
**identiquement** avec ou sans bump. La règle vaut pour un changement de forme,
pas pour un ajout que les deux côtés savent ignorer.

**Qui expose le champ.** Un drapeau explicite `load` sur `LibraryEntry`
(`data/library.ts`, 12 exercices), et pas une déduction depuis `category` —
pour la raison qui a fait naître `motion` : la catégorie ne sait pas répondre.
Un élastique n'est pas du poids du corps mais n'a pas de kg, il a une couleur ;
et `machine` range le tapis, le vélo et le rameur avec la presse à cuisses,
alors que ces trois-là se règlent en vitesse, en niveau ou en frein. `load` est
une métadonnée de catalogue comme `category` et `motion` : jamais recopiée dans
une ligne persistée. Le champ apparaît aussi sur **tout exercice perso** (on ne
sait pas ce que c'est) et sur **toute ligne qui porte déjà une charge** — une
valeur venue d'un lien ne doit jamais devenir invisible, donc incorrigeable.

**Deux pièges.** C'est le **seul champ non entier** du schéma (les disques font
1,25 et 2,5 kg) : il a son propre parseur, `optionalWeight()`, et ne passe pas
par `NUMERIC_FIELDS` dans `ui/planner.ts`, qui plafonne des entiers avec
`parseInt`. Et dans le format `?s=`, la charge est la **dixième** position :
un exercice de la bibliothèque qui en porte une écrit donc `""` en neuvième,
là où vivrait le nom d'un perso. Trois caractères pour ne pas avoir à deviner
la nature d'un élément d'après son type — ce qu'aucune documentation lisible
par une IA ne dirait simplement. Le tableau positionnel s'étendant par la fin,
`v` n'a pas bougé et les liens déjà partagés s'ouvrent entiers.

**Le format est documenté sur quatre surfaces**, et la quatrième est celle
qu'on oublie : la page de spec générée, `llms.txt`, `ui/webmcp.ts`, et le bloc
`#aiPlan` de l'accueil — écrit à la main, avec son propre exemple `?s=` en
base64 littéral. C'est pourtant le premier que les modèles lisent
(`aiHelp.createPrompt` leur donne l'adresse de l'accueil, pas celle de la page
de spec), et c'est le seul qui avait été oublié au premier jet. `check-build.ts`
décode désormais cet exemple-là aussi.

**L'unité est le kilogramme dans les cinq langues, et rien n'est jamais
converti.** La charge est un réglage personnel : celui qui reçoit un lien ne
soulève pas les kilos de celui qui l'a écrit. Un réglage global kg/lb reste
possible plus tard sans migration, la valeur étant stockée brute.

**Ce que ce champ n'est pas : un journal.** Il décrit la séance prévue, au même
titre que `reps` — jamais ce qui a réellement été soulevé série par série. Pas
d'historique des charges, pas de progression suggérée, pas de 1RM, pas de
calculateur de disques : chacun est le premier pas vers un carnet
d'entraînement, qui est une autre application et ferait exploser le schéma
persisté comme la fusion nuage.

## Le moteur (`core/queue.ts`)

C'est le cœur de valeur, et il est porté à l'identique du monolithe — vérifié
sortie contre sortie sur six scénarios.

- **Classique** : toutes les séries d'un exercice, puis le suivant, avec le repos
  réglé sur chaque ligne.
- **Circuit** : à chaque tour on pioche l'exercice d'un *autre* groupe musculaire
  à qui il reste le plus de séries (à égalité, l'ordre du déroulé tranche). Une
  pause n'est imposée que lorsque plus aucun autre groupe n'a de série
  disponible. Une pause ajoutée manuellement coupe le circuit en segments
  indépendants.

En mode circuit, la pause imposée vient du réglage global `cfg.pause`, jamais du
`rest` de la ligne — c'est pourquoi le champ « repos entre séries » est masqué
dans ce mode.

## Avant de toucher à l'une de ces zones, charge la skill correspondante

Le reste de la documentation vit dans `.claude/skills/`, chargé à la demande :
la garder ici coûtait ~14 500 tokens à chaque session, y compris pour changer
une couleur. Rien n'a été perdu au déplacement — mais **une skill n'est
chargée que si sa description correspond à la tâche**, d'où la colonne du
milieu : l'invariant qui mord le plus est rappelé ici même, pour être visible
sans rien charger.

| Tu touches à… | L'invariant qui te mordra sinon | Skill à charger |
|---|---|---|
| `core/share.ts`, `core/ai-plan.ts`, `ui/share.ts`, `ui/webmcp.ts`, `ui/ai-help.ts`, la section `#aiPlan` — bref lien de partage, QR, import, pilotage par une IA | Le payload `?s=` est **dense par conception** (7 exercices : 1120 → 430 caractères, QR de 129 → 77 modules). Ne jamais le « clarifier » en objets à clés explicites. `?plan=` n'entre **jamais** dans un QR. Aucune reconnaissance d'exercice par nom traduit. La charge est la **dixième** position de la ligne `?s=` : un exercice de bibliothèque qui en porte une écrit `""` en neuvième, les positions ne se sautent pas. Et un lien est une entrée **hostile** : tout ce qu'il porte se borne par le haut, dans les parseurs de `core/storage.ts` et jamais ici. L'adresse d'un lien ne se construit plus depuis `location` : `shareBase()` (`platform/native.ts`), sans quoi l'application native produit des liens `https://localhost` que personne ne peut ouvrir. | `seance-partage-liens` |
| `index.html`, `vite.config.ts`, les balises meta/JSON-LD/`og:*`, la police, le sitemap, `llms.txt` | Un élément `data-i18n` doit être **vide** dans la source : son texte français est injecté au build depuis `fr.ts`. `#plan`/`#library` réservent leur hauteur (`:empty`) — c'est ce qui tient le CLS à 0,013 au lieu de 0,43. `--disp` demande `'Archivo'`, jamais `'Archivo Expanded'` (HTTP 400 silencieux). Les blocs `<!--WEB_ONLY-->` encadrent ce que le build applicatif retire : leurs marqueurs vont par paires, un déséquilibre amputerait le `<head>`. | `seance-seo-html` |
| `scripts/build-exercise-pages.ts`, `src/content/exercise-details/*`, `exercise-page.css`, `image-prompts.ts` | `dist/exercises/**` est **regénéré à chaque build** : l'éditer à la main est une perte de temps garantie. Le contenu long n'admet que du vérifiable et du stable — jamais d'étude citée, de % d'activation EMG ni de chiffre à fausse précision. Le `slug` est **traduit par langue**, et la fiche ne porte **nulle part** la clé interne : `llms.txt` et la colonne « Fiche » de la page de spec sont les deux seules passerelles du slug vers la clé, toutes deux vérifiées par `check-build.ts`. | `seance-fiches-generees` |
| un module `src/ui/*.ts`, le `Context`, la taille/place d'un bouton, le schéma persisté | Une saisie chiffrée passe par `renderDerived()` — reconstruire la liste ferait perdre le focus du champ, et c'est aussi pourquoi elle doit réécrire elle-même la valeur qu'elle a plafonnée. `weight` est le seul champ non entier : il a sa propre branche, `NUMERIC_FIELDS` arrondirait 2,5 kg à 3. Changer la forme de ce qui est persisté impose de bumper la version **et** d'écrire la migration. | `seance-ui-module` |
| `src/cloud/*`, `src/ui/account.ts`, le bouton de compte, la sauvegarde en ligne | La sauvegarde automatique tient à **un seul point d'accroche** : `cloud.notifyLocalChange()` dans `save()` (`ui/app.ts`). Ne jamais la recâbler site par site. Le SDK Firebase n'est chargé **que** sur un clic de connexion ou si `session-hint` dit que la personne était connectée — sinon un visiteur anonyme paierait ~200 Ko pour rien. Le document distant repasse **toujours** par les parseurs de `core/storage.ts` : c'est une entrée non fiable, au même titre qu'un lien `?s=`. **Ce qui se compte, ce sont les écritures** (20 000/jour, tous comptes confondus), pas les octets : d'où le regroupement à 4 s et la poussée conditionnelle au chargement. | *(pas de skill : tout est ici et dans `firestore.rules`)* |
| `src/data/groups.ts`, l'ajout ou le retrait d'un groupe musculaire | Un id de groupe voyage dans les liens `?s=` : on en **ajoute**, on n'en renomme jamais. Et deux groupes se comparent par `groupsOverlap()`, jamais par `===` — l'arbre a deux étages, « jambes » recouvre « mollets ». | *(pas de skill : tout est dans la section « Les groupes musculaires forment un arbre »)* |
| `capacitor.config.ts`, `android/`, `ios/`, `scripts/build-app.ts`, `src/platform/native.ts` — bref l'application mobile | Un seul bundle pour les deux cibles : `isNativeApp()` répond à l'exécution, sans importer `@capacitor/core`. Dans le WebView, `location.origin` vaut `https://localhost` — toute adresse publique passe par `shareBase()` ou `siteHref()`. Ni publicité ni analytique dans le binaire (blocs `<!--WEB_ONLY-->`). `env(safe-area-inset-*)` ne répond pas sur Android : toujours `var(--safe-area-inset-*)`. `cap sync` recopie le bundle, il ne le lie pas. | *(pas de skill : la marche à suivre est dans `docs/portage-mobile.md`)* |
| `src/data/tenants.ts`, l'ajout d'une salle de sport / d'un sous-domaine | Un exercice de salle est une ligne **perso** (`key: 'custom'` + son nom), jamais une clé de `LIBRARY` — l'y mettre réclamerait 5 pages générées, une figure et du contenu long en 5 langues. Et le sous-domaine doit être ajouté aux **domaines autorisés de Firebase Auth**, sinon la connexion Google échoue en silence. | `add-salle` |
| une clé de traduction, un texte d'interface | `fr.ts` d'abord : les quatre autres langues deviennent alors des erreurs de compilation. Jamais de pluriel recomposé à la main. | `add-i18n-key` |
| `src/data/figures.ts`, le champ `motion` de `library.ts`, le bloc `.fig-svg` — bref une figure d'exercice | Le bloc CSS `.fig-svg` existe en **deux copies** (bundle + `exercise-page.css`, hors bundle) et `check-build.ts` échoue si elles divergent. `fill: none` sur `.s` n'est pas cosmétique : un `<path>` sans `fill` est rempli en **noir**, invisible sur le thème sombre et pas sur le clair. Toutes les figures de profil regardent à gauche, et la flèche suit `motion`, pas `mode`. | `seance-figures` |
| ajouter un exercice à la bibliothèque | Un exercice qui se règle en poids porte `load: true` — sans lui, sa ligne n'aura jamais de champ de charge, et `check-build.ts` vérifie que `llms.txt` le marque. Les 5 fichiers de contenu long sont **hors du contrat typechecké** : une langue oubliée ne casse pas le build, elle retombe en silence sur le français. `npm run exo <clé>` est le seul contrôle. | `add-exercise` |

`docs/decisions-ecartees.md` garde les pistes déjà explorées et rejetées, avec
la donnée qui les a réfutées — à relire avant d'en reproposer une.

## Le portage mobile : un seul bundle, deux cibles

Les applications Android et iOS sont **le même code**, posé par Capacitor dans
un `WebView` (`capacitor.config.ts`, `android/`, `ios/`). Rien n'est forké :
le moteur, le lecteur, l'i18n et le stockage sont ceux du site. La marche à
suivre complète — ce qui reste à faire, les prérequis, la publication — vit
dans **`docs/portage-mobile.md`**.

**`isNativeApp()` (`src/platform/native.ts`) est la seule question posée**, et
elle sonde le global que le runtime natif pose sur la page, **sans importer
`@capacitor/core`** : le bundle web ne doit pas payer un paquet qui ne répond à
rien chez lui. Même motif que `host()` dans `ui/webmcp.ts` pour
`document.modelContext`. Ne pas remplacer ça par deux builds divergents : c'est
toujours la copie oubliée qui casse.

**Dans le WebView, `location.origin` vaut `https://localhost`.** Toute adresse
publique se construit donc par `shareBase()` (les liens `?s=`) ou `siteHref()`
(les fiches, la confidentialité), jamais à la main — un lien de partage bâti
sur `location` y devient impartageable, dans la fonction « Partager ». Sur le
web, ces deux fonctions rendent le comportement d'avant, ce qui garde le
sous-domaine d'une salle.

**Deux choses ne doivent jamais entrer dans le binaire**, et ce n'est pas une
question de poids : la publicité (AdSense l'interdit dans un WebView, et le
seuil de 1200 px ne protégeait pas — un iPad Pro en paysage fait 1366 px) et
l'analytique web (elle obligerait à la déclarer au questionnaire de
confidentialité de l'App Store, sans le bandeau de consentement, qui voyage
avec le script publicitaire). D'où les blocs `<!--WEB_ONLY-->` d'`index.html`,
retirés par `stripWebOnly()` (`vite.config.ts`) quand `CIRKALI_TARGET=app`, et
les assertions de `scripts/build-app.ts` — qui vérifie ce qu'il a produit,
comme `check-build.ts`, parce que la CI ne construit pas l'application.

**`dist-app/` n'est pas `dist/`.** Les 317 pages générées, le sitemap,
`llms.txt` et les fichiers de l'hébergeur n'ont pas d'usage dans un binaire :
ce sont des surfaces d'indexation, elles vivent sur cirkali.fr et
l'application y renvoie par des liens absolus.

**`env(safe-area-inset-*)` ne répond pas sur Android**, et c'est le premier
bug qu'a montré l'APK : l'en-tête et le bouton « Quitter » du lecteur
passaient sous les icônes de batterie. Le WebView d'Android ne remplit pas ces
`env()` ; le plugin `SystemBars` de Capacitor pose à la place des propriétés
personnalisées du même nom sur `documentElement`, qui écrasent la règle
`:root`. Une seule source côté feuilles, donc : **`var(--safe-area-inset-*)`
partout**, définies dans `tokens.css` avec un repli `env(…, 0px)` — et le
repli n'est pas décoratif, un `calc()` contenant un `env()` inexistant est une
déclaration invalide, donc *tout* le padding disparaît. `check-build.ts`
refuse un `env(safe-area-…)` ailleurs que dans `tokens.css`. La fenêtre est
bord-à-bord par obligation : Android 15 l'impose au-delà de `targetSdk` 35.

**Un lien profond est la seule entrée de l'application.** Toute l'importation
de séance passe par une URL, et dans un binaire la page ne navigue jamais :
sans `src/platform/deep-links.ts` et les fichiers d'association du domaine, un
lien partagé ouvre le navigateur, donc s'importe dans le *site* — un autre
stockage. La personne verrait le lien marcher et sa séance n'arriverait nulle
part.

**C'est le SITE qui autorise l'application, jamais l'inverse.**
`public/.well-known/assetlinks.json` (Android, et un jour son équivalent
Apple) vit donc dans `public/` et se déploie avec cirkali.fr — un dossier qui
commence par un point, exactement le genre qu'un outil de copie saute en
silence. Il déclare l'empreinte **SHA-256** de la clé qui signe l'APK ; si
elle ne correspond pas, Android échoue la vérification **sans le dire** et les
liens rouvrent simplement le navigateur. D'où les cinq assertions de
`check-build.ts` et la comparaison faite par le job Android avant de compiler.

**La connexion Google ne peut pas passer par `signInWithPopup`** dans une
application : Google refuse OAuth depuis un WebView embarqué, redirection
comprise. Le module natif (`@capacitor-firebase/authentication`) ouvre la
feuille du système et rend un jeton, que `cloud/firebase.ts` échange contre
une session du SDK **JavaScript** — c'est le seul état d'authentification que
les règles Firestore voient, d'où `skipNativeAuth: true` : à `false`,
l'application se connecterait sans pouvoir lire ni écrire. Même uid, même
document que sur le site, `cloud/merge.ts` inchangé. Corollaire : l'invariant
« le SDK Firebase n'est pas téléchargé sans compte » ne vaut que sur le web —
dans un binaire déjà installé, ce n'est plus un coût.

Deux pièges d'outillage : `npx cap sync` **recopie** le bundle dans les deux
projets (à relancer après chaque changement du code web, ce n'est pas un lien),
et la CLI Capacitor exige **Node ≥ 22** là où le reste du dépôt tourne en 18.

**Personne ici ne compile.** Ni JDK, ni SDK Android, ni Xcode sur la machine de
développement : c'est `.github/workflows/mobile.yml` qui construit les deux
plateformes, et il publie un APK de débogage en artefact. Le dépôt étant
public, les runners macOS sont gratuits — ils ne le seraient pas sur un dépôt
privé. Le job iOS prouve que ça **compile**, jamais que ça s'installe : sans
identité de signature il n'y a ni `.ipa` ni TestFlight.

## Déploiement

Le site public est **https://cirkali.fr**, servi par Cloudflare **Workers
Static Assets** (et non Pages — voir `wrangler.jsonc`), qui
construit le dépôt de son côté. `.github/workflows/deploy.yml` continue de
publier la même chose sur GitHub Pages : c'est un reliquat voué au retrait, mais
son job `build` reste le filet de CI (`typecheck` + `check-build`) — ne pas le
supprimer sans déplacer ces deux commandes ailleurs.

L'origine canonique vit dans **`SITE_URL`** (`scripts/build-exercise-pages.ts`)
pour tout ce qui est généré, et en **littéral** dans `index.html` (les balises
SEO ne portent pas de `data-i18n`, donc `fillStaticTranslations()` ne les voit
pas). Les deux doivent bouger ensemble : au passage à cirkali.fr, aucune n'avait
suivi, et le site a longtemps déclaré à Google que sa version de référence était
github.io — avec un sitemap ne listant que des URL d'un autre domaine. D'où
l'assertion de `check-build.ts` qui interdit l'ancienne origine dans `dist/`.

**Les URL publiées n'ont pas d'extension, les fichiers si.** Cloudflare Pages
sert `dist/exercises/fr/pompes.html` à l'adresse `/exercises/fr/pompes` et
redirige la forme longue vers elle (307) ; GitHub Pages et `vite preview` font
de même. Tant que les balises déclaraient le `.html`, chaque canonical, chaque
hreflang et les 317 entrées du sitemap désignaient une URL qui redirige pendant
que Google indexait l'autre — de quoi laisser durablement des pages en
« Détectée, actuellement non indexée ». Toute URL écrite dans une balise, un
lien ou le sitemap s'écrit donc **sans extension** ; seuls les `writeFileSync()`
gardent le `.html`. Deux assertions de `check-build.ts` l'imposent.

`base: './'` dans `vite.config.ts` : les chemins restent relatifs. Ne pas le
passer à un chemin absolu. **Une seule exception assumée**, les `@font-face` :
les `.woff2` de `public/fonts/` sont cités en `/fonts/…` parce qu'ils doivent
l'être depuis deux profondeurs à la fois (le bundle et `exercise-page.css`, hors
bundle). Conséquence : une copie servie ailleurs qu'à la racine d'un domaine
perd ses polices.

## Ce qui coûte, côté sauvegarde en ligne

Le quota gratuit de Firestore se compte en **opérations**, pas en volume : 20 000
écritures et 50 000 lectures par jour, **partagées par tous les comptes**. Le
stockage, lui, n'est jamais la contrainte — une séance de douze lignes pèse
1,5 Ko, un compte bien rempli 16 Ko, et le plafond d'un document (1 Mio) tient
~700 séances. Trois choix en découlent, à ne pas défaire sans les remplacer :

- **Le regroupement des écritures est à 4 s** (`PUSH_DEBOUNCE_MS`,
  `cloud/sync.ts`). Une séance se construit par gestes espacés de deux à trois
  secondes ; à 1,5 s chacun payait sa propre écriture. Rien n'est risqué :
  `flush()` force le départ au masquage de l'onglet, à la fermeture, au
  démarrage d'une séance et à la déconnexion.
- **Le chargement n'écrit que si la fusion apporte quelque chose au distant.**
  C'était l'écriture la plus chère du système : une par compte et par
  chargement, pour un document identique à celui qu'on venait de lire. La
  comparaison porte sur l'état **fusionné**, jamais sur « rien n'a changé
  localement » — une modification faite hors ligne puis perdue avec l'onglet
  n'a justement pas été poussée, et c'est la fusion qui la fait ressortir.
- **Au-delà de 1 Mio, on n'essaie pas** : `setDoc` échouerait définitivement et
  chaque modification relancerait une écriture vouée au refus. Statut
  `too-large`, distinct d'`error` parce qu'il ne passera pas tout seul.

Dépasser le quota ne perd rien : le `localStorage` a déjà écrit, la
modification est en retard et repart au chargement suivant.

## Durabilité du stockage local (`src/platform/storage.ts`)

Le `localStorage` est la source de vérité, mais aucun navigateur ne promet de
le garder. Deux politiques, donc deux réponses :

- Chrome et Firefox n'effacent que sous pression disque et acceptent
  `navigator.storage.persist()`. Il est demandé **à la première sauvegarde
  réussie**, jamais au chargement : Firefox pose la question à l'utilisateur, et
  un visiteur qui n'a encore rien enregistré n'a pas à se la voir poser.
- WebKit efface tout stockage écrit par script après **sept jours sans visite**,
  et rien depuis la page ne permet de s'y soustraire. La seule réponse est de le
  dire : `#storageNotice`, une phrase affichée uniquement là et uniquement
  déconnecté (`ui/account.ts`). Elle tient dans la hauteur déjà imposée par le
  sélecteur de langue, donc elle ne décale rien — la garder courte fait partie
  du contrat.

  Ce qu'on détecte est bien **WebKit**, pas « Safari », et les deux ne se
  recouvrent pas (`evictsIdleStorage()`) : sur iPhone et iPad, Apple impose son
  moteur à tous les navigateurs, donc Chrome et Firefox y purgent pareil ; à
  l'inverse Chrome, Edge, Opera et Samsung écrivent tous « Safari » dans leur
  UA sans rien purger. Chercher ce seul mot avertirait les deux tiers du web à
  tort — d'où le message qui dit « ce navigateur » plutôt que « Safari ».

## Publicité

Des encarts AdSense sont affichés **sur grand écran uniquement**, et
« uniquement » y est au sens fort : sous 1200 px, aucun élément n'est créé,
aucune requête ne part, `adsbygoogle.js` n'est pas téléchargé. C'est un
portillon JavaScript (`src/content/ad-rails.ts`) et non une media-query, pour
deux raisons — un `display: none` masquerait un encart déjà demandé, ce qui
compte une impression jamais vue et que la politique AdSense interdit ; et le
visiteur mobile paierait quand même les ~100 Ko du script, annulant le travail
des deux lots PageSpeed précédents. `check-build.ts` vérifie les deux moitiés
de cette promesse sur les 317 pages livrées : le portillon présent partout,
aucune balise `<ins>` ni `<script src>` publicitaire en statique.

Une seule source pour les trois surfaces (`src/content/ad-rails.ts`), posée
dans l'accueil par le plugin `injectAdRails()` et dans les pages générées par
`build-exercise-pages.ts` : trois copies d'une règle de conformité auraient
dérivé en silence, et c'est la copie oubliée qui aurait servi des publicités là
où on a promis qu'il n'y en aurait pas.

Les encarts sont en `position: absolute` dans les marges, **pas** une grille
sur `<body>` : une grille décalerait `.wrap` d'un demi-encart, soit du CLS
horizontal gratuit. `AD_SLOTS` est vide tant que les emplacements n'existent
pas côté AdSense — le portillon saute alors l'encart, et la page se comporte
comme avant. Les remplir est la seule chose à faire le jour de la validation.

**Consent Mode v2** vit dans le script inline de `index.html`, **avant**
`gtag('config')` — un état par défaut posé après coup arriverait trop tard.
Sa portée est **régionale** et c'est le cœur du réglage : le bandeau voyage
avec le script publicitaire, donc au-delà de 1200 px seulement, et un visiteur
européen sur téléphone ne se voit jamais poser la question. Refuser par défaut
dans l'EEE, au Royaume-Uni et en Suisse est donc la seule position tenable — il
restera refusé faute d'avoir été interrogé. Conséquence assumée : l'audience
mobile européenne n'est plus mesurée que par la modélisation sans cookie de
Google. Hors de ces pays, aucun défaut n'est posé et la mesure reste complète.
`check-build.ts` vérifie l'ordre des deux appels et les quatre signaux.

`public/ads.txt` doit rester à la racine du domaine (c'est la seule position qui
fasse autorité) et `public/robots.txt` ne doit pas le bloquer. La diffusion dans
l'EEE exige en plus un CMP certifié TCF v2.2, activé dans la console AdSense —
sans lui Google cesse simplement de servir des annonces, sans erreur visible.

`dist/confidentialite/<locale>.html` (5 pages, générées) est la politique de
confidentialité : obligatoire pour AdSense, et de toute façon due depuis
l'ajout de Google Analytics. `CONTACT_EMAIL` (`cirkali@proton.me`) y est publié :
c'est par là qu'arrive une demande d'accès ou de suppression, la boîte doit
rester relevée tant que la page est en ligne.

**`dist/404.html` doit exister.** Sans lui, Cloudflare Pages retombe sur
`index.html` avec un code **200** pour toute adresse inconnue : un lien cassé
devient indétectable (un `curl` répond 200 sur un chemin qui n'existe pas) et
Google indexe des URL fantômes comme autant de copies de l'accueil. **Le fichier seul ne suffit pas**, et c'est ici que se joue une distinction à
connaître : cirkali.fr est servi par **Cloudflare Workers Static Assets**, pas
par Cloudflare Pages. Le repli attrape-tout ne se désarme donc que par
`not_found_handling: "404-page"` dans `wrangler.jsonc`. Deux correctifs ont été
essayés et réfutés en production — poser `404.html` seul, puis une règle
`_redirects` — ne pas les reproposer. C'est le même moteur qui explique les
307 retirant le `.html` (`html_handling`). Rien ne s'y perd côté application :
`location.pathname` n'est lu que pour *construire* les liens de partage, jamais
pour router. La page porte `noindex`, n'est pas au sitemap, et — seule page du
site dans ce cas — ne porte **pas** d'encart publicitaire : la politique
AdSense interdit les annonces sur une page d'erreur. `check-build.ts` tient les
deux bouts de cette exception.

**IndexNow.** `public/aa22ab05496f4b5bb923774108f40cc8.txt` est la preuve de
propriété du domaine : le protocole exige que la clé soit **publiquement
lisible** à la racine, ce n'est donc pas un secret et la commiter est le
fonctionnement normal. Sans elle, les moteurs répondent 403 et les soumissions
sont rejetées en silence — d'où l'assertion de `check-build.ts`. Le script lit
`dist/sitemap.xml` plutôt que de tenir sa propre liste : une seconde liste
divergerait, c'est l'erreur que `public/sitemap.xml` avait déjà commise.
**Google n'y participe pas** — pour lui, seule la Search Console agit.

`public/_headers` est lu par Workers Static Assets : cache `immutable` sur
`/assets/*` et `/fonts/*`, plus HSTS, XFO, COOP et `nosniff`. **Et le `charset`
des `.txt`** : c'est le seul type servi ici qui ne sache pas déclarer son
encodage de l'intérieur — un `.html` porte son `<meta charset>` dans ses 1024
premiers octets, un `.xml` sa déclaration, un `.txt` n'a que l'en-tête. Sans
lui, Cloudflare sort un `text/plain` nu et le navigateur retombe sur l'encodage
par défaut de sa locale — windows-1252 en France, donc « sÃ©ance ». Vu en
production sur `llms.txt`, le fichier même qu'on adresse aux IA ;
`check-build.ts` échoue désormais si un `.txt` accentué de `dist/` n'a pas sa
règle. Le COOP y est en
`same-origin-allow-popups` et non `same-origin` : la connexion Google passe par
`signInWithPopup`, que le mode strict casserait.
