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
| `npm run typecheck` | Le filet du projet — il n'y a pas de suite de tests |
| `npm run check` | Build, puis vérifie ce qu'il a **produit** dans `dist/` (`scripts/check-build.ts`) — lancé aussi par la CI |
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
    groups.ts      ids + couleurs des 9 groupes musculaires
    library.ts     62 exercices : reglages seulement
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
    toast.ts       toast transitoire avec action (annulation de suppression)
    inline-input.ts  formulaire inline, remplace un window.prompt() natif
    dom.ts         el(), byId(), applyStaticTranslations()
    share.ts       modales partage (QR) et import ; lecture de ?s= et ?plan=
    webmcp.ts      outils exposes a un navigateur agentique — charge a la demande
  platform/        audio.ts (bip), wakelock.ts (ecran allume)
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
`ctx.state.plans.find(...)` répété à chaque endroit — avec un invariant
garanti par `loadState()` : il y a toujours au moins une séance.

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
| `core/share.ts`, `core/ai-plan.ts`, `ui/share.ts`, `ui/webmcp.ts`, `ui/ai-help.ts`, la section `#aiPlan` — bref lien de partage, QR, import, pilotage par une IA | Le payload `?s=` est **dense par conception** (7 exercices : 1120 → 430 caractères, QR de 129 → 77 modules). Ne jamais le « clarifier » en objets à clés explicites. `?plan=` n'entre **jamais** dans un QR. Aucune reconnaissance d'exercice par nom traduit. | `seance-partage-liens` |
| `index.html`, `vite.config.ts`, les balises meta/JSON-LD/`og:*`, la police, le sitemap, `llms.txt` | Un élément `data-i18n` doit être **vide** dans la source : son texte français est injecté au build depuis `fr.ts`. `#plan`/`#library` réservent leur hauteur (`:empty`) — c'est ce qui tient le CLS à 0,013 au lieu de 0,43. `--disp` demande `'Archivo'`, jamais `'Archivo Expanded'` (HTTP 400 silencieux). | `seance-seo-html` |
| `scripts/build-exercise-pages.ts`, `src/content/exercise-details/*`, `exercise-page.css`, `image-prompts.ts` | `dist/exercises/**` est **regénéré à chaque build** : l'éditer à la main est une perte de temps garantie. Le contenu long n'admet que du vérifiable et du stable — jamais d'étude citée, de % d'activation EMG ni de chiffre à fausse précision. Le `slug` est **traduit par langue**. | `seance-fiches-generees` |
| un module `src/ui/*.ts`, le `Context`, la taille/place d'un bouton, le schéma persisté | Une saisie chiffrée passe par `renderDerived()` — reconstruire la liste ferait perdre le focus du champ. Changer la forme de ce qui est persisté impose de bumper la version **et** d'écrire la migration. | `seance-ui-module` |
| `src/cloud/*`, `src/ui/account.ts`, le bouton de compte, la sauvegarde en ligne | La sauvegarde automatique tient à **un seul point d'accroche** : `cloud.notifyLocalChange()` dans `save()` (`ui/app.ts`). Ne jamais la recâbler site par site. Le SDK Firebase n'est chargé **que** sur un clic de connexion ou si `session-hint` dit que la personne était connectée — sinon un visiteur anonyme paierait ~200 Ko pour rien. Le document distant repasse **toujours** par les parseurs de `core/storage.ts` : c'est une entrée non fiable, au même titre qu'un lien `?s=`. | *(pas de skill : tout est ici et dans `firestore.rules`)* |
| une clé de traduction, un texte d'interface | `fr.ts` d'abord : les quatre autres langues deviennent alors des erreurs de compilation. Jamais de pluriel recomposé à la main. | `add-i18n-key` |
| ajouter un exercice à la bibliothèque | Les 5 fichiers de contenu long sont **hors du contrat typechecké** : une langue oubliée ne casse pas le build, elle retombe en silence sur le français. `npm run exo <clé>` est le seul contrôle. | `add-exercise` |

`docs/decisions-ecartees.md` garde les pistes déjà explorées et rejetées, avec
la donnée qui les a réfutées — à relire avant d'en reproposer une.

## Déploiement

Le site public est **https://cirkali.fr**, servi par Cloudflare Pages, qui
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

`base: './'` dans `vite.config.ts` : les chemins restent relatifs. Ne pas le
passer à un chemin absolu. **Une seule exception assumée**, les `@font-face` :
les `.woff2` de `public/fonts/` sont cités en `/fonts/…` parce qu'ils doivent
l'être depuis deux profondeurs à la fois (le bundle et `exercise-page.css`, hors
bundle). Conséquence : une copie servie ailleurs qu'à la racine d'un domaine
perd ses polices.

`public/_headers` est lu par Cloudflare Pages : cache `immutable` sur
`/assets/*` et `/fonts/*`, plus HSTS, XFO, COOP et `nosniff`. Le COOP y est en
`same-origin-allow-popups` et non `same-origin` : la connexion Google passe par
`signInWithPopup`, que le mode strict casserait.
