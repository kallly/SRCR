# Séance

Planificateur et minuteur de séance au poids du corps. Site statique, multilingue
(fr, en, es, de, it), sans backend : tout l'état vit dans le `localStorage` du
navigateur et rien ne quitte l'appareil.

L'application a deux écrans : le **planificateur** (choisir la séance active
parmi plusieurs séances sauvegardées, construire son déroulé, réordonner,
régler les pauses) et le **lecteur** (`.run`, plein écran, chrono + anneau de
progression + bip).

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement sur le port 8000, exposé sur le réseau local |
| `npm run build` | `tsc --noEmit`, build Vite vers `dist/`, puis génère les pages d'exercice (`scripts/build-exercise-pages.ts`) et `dist/sitemap.xml` |
| `npm run preview` | Sert `dist/` sur le port 8000 |
| `npm run typecheck` | Le filet du projet — il n'y a pas de suite de tests |

`npm run typecheck` est ce qui tient le projet : il vérifie le code **et** le fait
que les cinq langues exposent exactement les mêmes clés.

## Architecture

```
src/
  main.ts          detecte la langue, charge l'etat, monte l'app
  core/            logique pure, sans DOM
    types.ts       PlanItem / Step / SessionConfig / SavedPlan
    plan.ts        creation de lignes, resolution des noms traduits
    queue.ts       LE moteur : buildClassic, buildCircuit, queueDuration
    storage.ts     localStorage v5 (plusieurs SavedPlan) + migration depuis la v4/v3
  data/            donnees sans texte
    groups.ts      ids + couleurs des groupes musculaires
    library.ts     28 exercices : reglages seulement
    figures.ts     figures SVG
  content/
    exercise-details/     contenu long par langue (fr, en, es, de, it) :
                          etapes, muscles, anatomie, prompt image — voir plus bas
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
  platform/        audio.ts (bip), wakelock.ts (ecran allume)
scripts/
  build-exercise-pages.ts  genere dist/exercises/*, dist/sitemap.xml, docs/image-prompts.md
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

## Partage d'une séance (`core/share.ts`, `ui/share.ts`)

Fonctionnalité secondaire (pas un nouvel écran, juste deux `<dialog>`) : pas
de backend, donc la séance entière voyage encodée dans l'URL elle-même
(`?s=...`, décodée côté client) — un lien ou un QR code suffit, pas de
serveur à faire tourner.

**Un format à part, pas le schéma de stockage.** `core/share.ts` définit son
propre format versionné (`v: 1` dans le payload), distinct des clés
`seance.plans.v5` de `core/storage.ts` : une évolution du format de partage
n'a pas à suivre le même calendrier qu'une migration de stockage, et
inversement. Il réutilise cela dit `parsePlan()`/`parseSessionConfig()`
(exportées depuis `storage.ts` pour l'occasion) plutôt que d'écrire une
seconde validation : un lien partagé est un texte tiers, aussi peu fiable
qu'une valeur lue en `localStorage`, donc mérite exactement la même
tolérance aux données invalides/tronquées — jamais de `throw`.

**Ça ne marche que grâce à la règle n°2** (aucun texte traduit dans
`PlanItem`/`SessionConfig`) : un lien généré depuis une app en français
s'importe correctement chez quelqu'un dont l'app est en italien, sans rien
à traduire dans le payload. Les `id` des lignes ne sont pas encodés (le
champ le plus lourd, le moins utile à partager) : `parsePlan()` leur en
régénère de frais à l'import, exactement comme pour une ligne stockée sans
id.

**Le payload est volontairement dense, pas lisible.** Chaque ligne du
déroulé est un tableau positionnel (`['e', clé, groupe, 'r'|'t', séries,
répétitions, secondes, repos, nomPerso?]` pour un exercice, `['r',
secondes]` pour une pause) et non un objet : aucun nom de champ répété par
ligne. Les deux enums à deux valeurs (mode de séance, type d'effort) sont
réduits à une lettre. `decodeSharedPlan()` reconstruit la forme `{ type,
key, ... }` attendue par `parsePlan()` avant de la lui passer — la
validation tolérante reste centralisée dans `storage.ts`, seul le format de
transport change. Gain mesuré sur une séance de 7 exercices : 1120 → 430
caractères encodés, et le QR correspondant passe de 129 à 77 modules de
côté (bien plus confortable à scanner). Ne pas « clarifier » ce format en
repassant à des objets à clés explicites sans mesurer l'impact sur la
taille du lien — c'est tout l'intérêt de ce format.

**QR toujours noir sur blanc, jamais suivant le thème de l'app** (`.qr-card`
dans `base.css`) : c'est la seule combinaison fiable pour un lecteur de QR,
contrairement au reste de l'interface qui suit `--bg`/`--paper`.

**Le générateur de QR (`qrcode-generator`, seule dépendance runtime du
projet) est chargé en `import()` dynamique**, comme le contenu long des
exercices (`ui/exercise-info.ts`) : inutile de le faire payer à tout le
monde au chargement pour une action que la plupart des visiteurs ne
déclencheront jamais. Il ne sert qu'à l'export (`openShareDialog`) — jamais
à l'import, qui n'a besoin que de décoder du JSON.

**`tsconfig.json` porte `esModuleInterop: true`** depuis l'ajout de cette
dépendance : `qrcode-generator` est un module CommonJS (`export =`), et sans
cette option `import qrcode from 'qrcode-generator'` ne type-check pas alors
que Vite/Rollup le bundlent très bien à l'exécution — piège vérifié
(l'inverse aussi : `import * as qrcode` type-check mais Rollup refuse
d'appeler un namespace en production, « Cannot call a namespace »).

**Le rendu SVG est fait à la main** (`isDark(row, col)` cellule par
cellule), pas via `qr.createSvgTag()` : cette dernière fige des dimensions
en pixels, alors que le reste de l'app utilise des `viewBox` mis à l'échelle
par la CSS (même convention que les figures d'exercice, `data/figures.ts`).

**Niveau de correction d'erreur le plus bas (`'L'`)**, volontairement : ce
code est affiché puis scanné immédiatement à l'écran, jamais imprimé ni
abîmé, et la séance encodée peut être longue (plusieurs dizaines
d'exercices) — moins de redondance donne un QR moins dense, donc plus facile
à scanner depuis un écran de téléphone. Au-delà de la capacité maximale du
standard (version 40), `qrcode-generator` lève une chaîne brute (pas une
`Error`) : `qrSvg()` l'attrape et la modal bascule sur un message + le lien
copiable reste disponible, plutôt que de casser toute la fonctionnalité pour
une séance inhabituellement grande.

## Bugs du monolithe corrigés au portage

1. `beep()` créait un `AudioContext` par appel ; les navigateurs en plafonnent le
   nombre (~6), le son devenait muet après quelques séries. → contexte unique
   dans `platform/audio.ts`.
2. Le wake lock, relâché par le système à l'extinction de l'écran, n'était jamais
   repris. → réacquisition sur `visibilitychange`.
3. Le champ « Repos si imposé (s) » n'avait aucun effet en mode circuit. → masqué.
4. `mk()` plantait sur une clé inconnue venue du stockage. → garde + migration.
5. Chaque saisie reconstruisait toute la liste. → `renderDerived()`.
6. `stop()` ne remettait pas la barre de progression à zéro.
7. L'historique grandissait sans limite. → plafonné à 200 entrées.
8. Le nom d'exercice perso passait par `innerHTML` avec un échappement
   incomplet. → tout texte utilisateur passe par `textContent` (`el({ text })`).
   `html` n'est réservé qu'aux figures SVG que nous produisons nous-mêmes.

## SEO & partage social

`index.html` porte du contenu qui n'existe **nulle part ailleurs** dans le
code : le `<title>`, la `<meta name="description">`, le `<link
rel="canonical">`, les blocs Open Graph et Twitter Card, le JSON-LD, et le
texte français figé à l'intérieur de l'eyebrow, du `<h1>`, de la tagline, des
deux `<h2>`, du `<h3>` de l'aperçu et de la section « À propos ».

**Pourquoi le texte est dupliqué.** Tout élément `data-i18n` est vide tant que
`main.ts` n'a pas tourné (`applyStaticTranslations()`, `src/ui/dom.ts`). Un
navigateur normal comble ce vide en quelques millisecondes, mais les robots qui
lisent le HTML brut sans exécuter de JavaScript — la plupart des bots de
prévisualisation sociale (Facebook, LinkedIn, Discord…) et certains outils
d'audit SEO — voient la coquille vide. On donne donc aux éléments porteurs de
sens un texte français par défaut écrit en dur dans `index.html`, en plus de
leur `data-i18n` qui continue à les retraduire normalement au chargement.

**Règle : si on change l'une de ces clés dans `fr.ts`, il faut répercuter le
même texte dans `index.html`** — `app.eyebrow`, `app.heading`, `app.tagline`,
`app.sourceCode`, `section.plan`, `section.library`, `section.allGuides`,
`preview.title`, les
quatre clés `about.*`, `exerciseInfo.close`/`.keyPoints`/`.moreInfo` (la
modal d'info sur un exercice), et `library.search`/`.filterLabel`/
`.filterAll`/`.noResults` (recherche et filtre de la bibliothèque — y
compris le `placeholder` et l'`aria-label` du champ de recherche, qui
portent la même clé `library.search` que le texte visible). Même logique
pour l'`aria-label="Langue"` statique du sélecteur de langue, que
`applyStaticTranslations()` écrase
ensuite.

**`#infoName`/`#infoGroup`/`#infoMuscles`/`#infoPoints` restent vides dans le
HTML statique, volontairement** : ce sont des valeurs par exercice, pas du
texte de chrome — même statut que `#runName` dans le lecteur, jamais rempli
non plus. Un `<dialog>` non ouvert est de toute façon masqué par défaut par
le navigateur (`dialog:not([open]){display:none}`), donc invisible pour un
crawler ou un lecteur d'écran tant qu'il n'est pas ouvert.

**Tout élément `data-i18n` porte son texte français en dur, sans exception.**
C'est l'invariante à conserver, et elle est vérifiable : `data-i18n` désigne
exactement le chrome traduisible, tandis que les valeurs par exercice
(`#infoName`, `#infoGroup`, `#infoMuscles`, `#infoPoints`, `#runName`) n'en
portent pas et restent donc légitimement vides.

Le chrome interactif (boutons de mode, actions, libellés) a longtemps été
laissé vide au motif qu'il « n'a aucune valeur pour un robot ». C'était vrai
pour l'indexation et faux pour le **CLS** : ces 14 éléments passaient de zéro
à leur hauteur réelle dès que `applyStaticTranslations()` tournait, décalant
tout ce qui suit. Ne pas revenir en arrière pour « alléger » le HTML.

Un test de non-régression couvre tout cela : il charge `dist/index.html` dans
jsdom **sans jamais exécuter le JS de l'app** et vérifie qu'aucun titre n'est
vide, que les balises sont présentes et que le contenu indexable reste
substantiel.

Les balises `og:*`, `canonical` et le JSON-LD ne servent que ces robots-là (le
JS ne les touche jamais) et portent donc une URL absolue figée :
`https://kallly.github.io/SRCR/`. **Si le dépôt est renommé ou déplacé vers un
domaine personnalisé, ces valeurs doivent être mises à jour à la main** — à la
différence de `base: './'` dans `vite.config.ts`, qui lui reste portable
(c'est un chemin relatif pour charger le JS/CSS, pas l'identité canonique de
la page).

**Image de partage** (`public/og-image.png`, 1200×630) : générée par
`scripts/generate-og-image.py` (Pillow). À relancer si la charte ou le texte
change :

```bash
python3 -m venv .venv && .venv/bin/pip install Pillow
.venv/bin/python scripts/generate-og-image.py
```

**Police d'affichage — piège vérifié.** `--disp` doit demander `'Archivo'`,
**pas** `'Archivo Expanded'` : cette famille n'existe pas sur Google Fonts et
la requête renvoie **HTTP 400**. Pire, combinée à une famille valide, Google
sert silencieusement un 200 en ignorant l'invalide — le bug est donc muet et
tout l'affichage retombe sur le sans-serif du navigateur (c'était le cas depuis
le monolithe d'origine). La chasse large passe par l'axe de largeur dans l'URL,
`family=Archivo:wdth,wght@125,600;125,700;125,800`, et **chaque règle utilisant
`var(--disp)` doit poser `font-stretch: 125%`** (12 règles aujourd'hui).

**Section « À propos ».** Elle porte l'essentiel du contenu indexable (206 mots
sur ~240 ; sans elle le ratio texte/code retombe à 2,7 %). Elle est livrée avec
l'attribut `open` — sans JavaScript elle reste dépliée partout — et `ui/app.ts`
la replie sous 760 px. **Le même HTML est servi à tout le monde** : le contenu
d'un `<details>` est dans le DOM quel que soit son état. Ne jamais transformer
ce motif en affichage conditionnel côté serveur ou en masquage réservé aux
robots : ce serait du cloaking, sanctionné par une pénalité manuelle, et sans
effet utile puisque Google indexe en mobile-first.

**Images.** `scripts/generate-og-image.py` produit `og-image.png`,
`apple-touch-icon.png` et `favicon.ico`. `favicon.svg` est écrit à la main.

**Réservation de hauteur et CLS — piège de mesure.** `#plan` et `#library`
sont remplis par JavaScript et passent de 0 à ~2000px chacun. Sur un réseau
réel le navigateur peint **avant** la fin du téléchargement du module : tout
ce qui suit (index des fiches, « À propos », navigation) est poussé vers le
bas. Mesuré à **CLS 0,43**, soit près du double du seuil « mauvais » (0,25).
`#plan:empty`/`#library:empty` réservent donc la hauteur attendue
(`src/styles/planner.css`), ce qui ramène le CLS à **0,013** en 3G bridée.

**Le piège est la mesure, pas le correctif** : en local sur un serveur
rapide, ou avec Playwright en `wait_until="networkidle"`, le décalage
n'apparaît pas et on conclut à tort que tout va bien. Toute vérification du
CLS doit se faire en `wait_until="load"` **et** avec bridage réseau.

Deux conditions rendent `:empty` sûr, à préserver : les conteneurs sont
réellement vides dans `index.html` (espaces compris — ne pas les reformater
sur plusieurs lignes), et ils sont **masqués** quand ils sont légitimement
vides après rendu (`list.hidden` dans `ui/planner.ts`, `grid.hidden` dans
`ui/library.ts`). Sans ce masquage, vider le déroulé rouvrirait un trou de
~2000px au-dessus du message « Aucun exercice ». Les valeurs réservées sont
mesurées sur le rendu réel : à reprendre si le nombre d'exercices, la
hauteur des cartes ou le déroulé par défaut changent.

**Cibles tactiles.** Tout élément interactif vise `min-width`/`min-height:
44px` (bonne pratique Lighthouse/Apple HIG — la norme réellement opposable,
WCAG 2.5.8 AA, ne fixe que 24px). `min-height`/`min-width` plutôt que
`height`/`width` : la zone tactile est garantie quelle que soit la métrique
réelle de la police, pas déduite d'un calcul de padding. **Sur une carte du
déroulé, les commandes sont réparties par fréquence d'usage** : le rail
`.reorder` collé au bord gauche (monter / n° / descendre, `.mini` en 44×44,
sans bordure puisque le rail porte déjà fond et séparateur), la suppression
`.del` en badge du coin haut droit et l'info `.info-btn` en badge du coin bas
droit. Ces deux badges de coin font **32px, en dessous du seuil de 44px —
décision assumée** : ce sont des actions ponctuelles, contrairement aux
flèches qu'on répète pour ordonner une séance. Deux designs abandonnés avant
celui-là, pour mémoire : flèches et croix empilées à côté du nom (`.del` calé
sur `.mini` × 2 + le `gap`, soit 96px), ce qui imposait 96px de haut à la
rangée du nom et laissait un vide sous le badge de groupe ; puis les trois en
rangée horizontale, qui poussait les champs à passer à la ligne sur les
écrans étroits. Pour un lien texte
court (`.quicknav a`, `.credit a`), la zone cliquable s'étend par `padding`
seul — jamais de marge négative pour « rattraper » ce padding : le `gap` du
conteneur flex mesure l'espace entre les boîtes (`border-box`), le padding
est à l'intérieur de la boîte de chaque lien et ne le grignote pas ; une
marge négative, elle, mord directement sur ce `gap` et resserre les liens
plus qu'annoncé (piège vérifié : `gap:16px` + `margin:0 -4px` de chaque
côté ramenait l'espace visible à 8px). L'indicateur de lien utilise
`text-decoration`, jamais `border-bottom` : un border colle au bord de la
boîte (donc loin du texte une fois la boîte à 44px), alors que
text-decoration reste sur la ligne de base quelle que soit la hauteur de la
zone tactile.

**Sitemap.** `public/sitemap.xml` est à soumettre dans la Search Console : le
`robots.txt` de la racine du domaine appartient à un autre projet et ne le
référence pas. Inutile d'ajouter un `public/robots.txt` — seul celui de la
racine du domaine fait autorité, un fichier sous `/SRCR/` serait ignoré.

**Fraîcheur (JSON-LD).** `dateModified` n'est **jamais** à modifier à la main
dans `index.html` — le jeton `__BUILD_DATE__` est remplacé par la date réelle
du build (`transformIndexHtml` dans `vite.config.ts`), aussi bien en dev qu'en
prod. `datePublished` reste fixe (2026-09-03, premier commit du portage) et ne
change plus.

**`llms.txt` : délibérément absent.** Cette même compétence GEO documente que
Google l'ignore explicitement pour la recherche (ni bonus ni pénalité) ; les
autres moteurs IA n'y accordent pas de poids de citation avéré non plus. Et le
problème d'autorité du domaine s'appliquerait de toute façon : la racine
attendue (`/llms.txt`) appartient à l'autre projet, seul `/SRCR/llms.txt`
serait à notre portée — coût pour un gain nul à négatif. Ne pas en ajouter un
« pour faire complet ».

**Limites connues, inutile d'y revenir :**
- *`hreflang` sur l'app elle-même* : les 5 langues partagent une seule URL,
  il n'y a donc rien à déclarer. **Les fiches d'exercice, elles, ont bien un
  `hreflang`** depuis qu'elles existent en plusieurs langues à des URL
  distinctes (`exercises/<locale>/<slug>.html`) — c'est exactement la
  condition qui manquait.
- *Redirection www ↔ non-www* : sans objet pour un sous-domaine
  `*.github.io` ; ne s'applique qu'à un domaine personnalisé avec apex + www.
- *En-têtes `Cache-Control`/`Expires`* : contrairement à ce que rapportait
  l'audit AIOSEO, GitHub Pages **envoie bien** ces en-têtes
  (`Cache-Control: max-age=600`) sur toutes les ressources, image comprise. Ce
  qu'on ne peut pas faire, c'est les *ajuster* : 600 s reste court pour des
  fichiers au nom déjà versionné qui pourraient être mis en cache un an. Il
  faudrait changer d'hébergeur pour y toucher.

## Pages d'exercice (contenu long, français d'abord)

**Pourquoi un fichier HTML statique par exercice, et pas une route JS.**
Choix délibéré, pas une contrainte technique : ces 28 (bientôt plus) pages
sont un vrai gain SEO — chacune a sa propre URL indexable individuellement
dans le sitemap, son propre `<title>`/description/canonical, un contenu
complet visible sans exécuter la moindre ligne de JS (donc lisible par
n'importe quel robot, y compris ceux qui ne rendent pas le JS). Ça évite
aussi tout le coût de rendu client (hydratation, framework de routage) que
demanderait l'équivalent en SPA. Le "gonflement" du site en nombre de
fichiers est le prix normal de contenu réellement crawlable, pas un
sous-produit accidentel à minimiser.

**Cette duplication est uniquement dans la SORTIE, jamais dans la SOURCE —
point le plus important de toute cette section.** Il n'existe **qu'un seul**
gabarit (`renderPage()` dans `scripts/build-exercise-pages.ts`) et **une
seule** feuille de style (`src/content/exercise-page.css`) pour les 28
pages. Les fichiers dans `dist/exercises/` ne sont **jamais** des sources :
ils sont entièrement regénérés à chaque `npm run build`, et un `rmSync`
efface le dossier avant de le reconstruire. **Éditer un fichier dans
`dist/exercises/` directement est une perte de temps garantie** — le
prochain build l'écrase sans avertissement.

**Pour une modification groupée (touchant les 28 pages à la fois), un seul
endroit à toucher selon la nature du changement :**

| Ce qui change sur les 140 pages | Où éditer |
|---|---|
| Structure HTML, balises meta, JSON-LD, carrousel | `renderPage()` dans `scripts/build-exercise-pages.ts` |
| Couleurs, typographie, mise en page, carrousel (CSS) | `src/content/exercise-page.css` |
| Contenu d'un exercice précis (étapes, muscles, erreurs) | l'entrée correspondante dans `src/content/exercise-details/<locale>.ts` — **les 5 fichiers**, sinon les langues divergent |
| Titres de section, `<title>`, avertissement, pied de page | le bloc `page.*` des 5 dictionnaires `i18n/locales/*.ts`, jamais en dur dans le générateur |
| Sélection des exercices « similaires » | la fonction `similar` dans `renderPage()` |

Après toute modification de l'un de ces fichiers, `npm run build` régénère
les 140 pages en une fois — jamais besoin (et jamais correct) de modifier un
fichier `dist/exercises/**/*.html` à la main pour propager un changement.

Chaque exercice a deux niveaux de texte, dans deux systèmes différents :

- **Nom + conseil court** — `i18n/locales/*.ts`, sous `exercise.<key>`. Chrome
  d'interface (carte de la bibliothèque, ligne du déroulé) : exigé dans les
  **5 langues** dès l'ajout d'une clé, comme tout le reste de `Translations`.
- **Contenu long** — `src/content/exercise-details/<locale>.ts`, sous la clé
  de l'exercice : muscles sollicités, étapes, erreurs fréquentes, anatomie,
  mécanique, bienfaits. Volontairement **hors du contrat i18n strict**
  (`Partial<Record<ExerciseKey, ExerciseDetail>>`, pas `Translations`) — une
  langue peut légitimement ne pas encore avoir traduit ce contenu, contrairement
  à un bouton qui ne doit jamais être vide. **Les 5 langues sont aujourd'hui
  complètes** (28 exercices chacune), mais le contrat reste volontairement
  partiel : c'est ce qui a permis de les livrer une par une, et ce qui
  permettra d'en ajouter une sixième sans bloquer le build. Le repli sur le
  français dans `exerciseDetail()` n'est donc plus emprunté en pratique —
  ne pas le supprimer pour autant, il est la seule chose qui empêche une
  page blanche le jour où une clé d'exercice est ajoutée sans traduction.
  Ajouter une langue : créer `exercise-details/<locale>.ts`, puis l'ajouter à
  `DETAILS_BY_LOCALE` dans `content/exercise-details/index.ts` — **seule
  source** de cette carte, lue à la fois par l'app (`ui/exercise-info.ts`,
  résolution avec repli) et par le générateur de pages
  (`scripts/build-exercise-pages.ts`, itère toutes les langues présentes).
  Ne jamais dupliquer cette carte ailleurs — exactement le problème
  `public/sitemap.xml` évité plus bas, appliqué ici aussi.

**Les pages sont des fichiers HTML statiques, pas des routes.** Générées par
`scripts/build-exercise-pages.ts` (lancé via `tsx` après `vite build`, voir
`package.json`) dans `dist/exercises/<locale>/<slug>.html`. Nécessaire pour
être crawlables sans JS et référençables individuellement dans le sitemap —
une route client (`#/exercise/...`) ne le permettrait pas, exactement le
problème hreflang déjà documenté plus haut pour l'app elle-même.

**L'index des fiches sur l'accueil est injecté au build, pas écrit à la
main.** `index.html` porte un marqueur `<!--EXERCISE_INDEX-->` que
`injectExerciseIndex()` remplace par la liste des 28 liens dans
`dist/index.html`. Sans lui, **aucune fiche n'est atteignable depuis
l'accueil en HTML brut** : les seuls liens vers les fiches sont ceux de la
modal, générés en JS dans un `<dialog>` fermé — donc invisibles pour un
crawler, qui ne les découvrirait que par le sitemap, sans aucun maillage
interne. Le générateur échoue explicitement si le marqueur a disparu, plutôt
que de produire silencieusement un accueil sans index.

**`dist/sitemap.xml` n'a plus qu'une seule source** : le générateur l'écrit en
entier (page d'accueil + une entrée par page générée) à chaque build.
`public/sitemap.xml` a été supprimé — ne pas le recréer, ce serait une
deuxième source vouée à diverger de la première.

**Pas de `lastmod` dans le sitemap, délibérément.** Le build regénère les 141
fichiers à chaque push : y écrire la date de build reviendrait à déclarer que
toutes les pages ont changé alors que la plupart sont identiques. Google
ignore les `lastmod` qu'il juge peu fiables, et un signal faux vaut moins que
pas de signal. N'en ajouter un que le jour où on saura dater chaque page
individuellement.

**Image Gemini : jamais référencée avant d'exister.** Tant qu'aucune image
n'a été générée et ajoutée, la page utilise la figure SVG existante — jamais
une balise `<img>` vers un fichier qui n'existe pas.

**Le prompt d'image est hors des fichiers de langue, délibérément.**
`src/content/image-prompts.ts` en est la source unique, rédigée en anglais
(langue sur laquelle les générateurs d'images sont les plus fiables, et ce
texte n'est jamais affiché). L'illustration est identique dans les 5 langues :
la direction artistique impose « no text, no logo », il n'y a donc rien à
traduire dedans. Le champ a d'abord vécu dans `ExerciseDetail`, donc dupliqué
par langue — `docs/image-prompts.md` annonçait alors **140 images à générer
pour 28 figures réelles**, et surtout le français et l'anglais décrivaient la
même scène dans deux rédactions concurrentes, ce qui aurait produit deux
dessins différents du même exercice. Ne pas remettre ce champ dans le contenu
par langue. `docs/image-prompts.md` est régénéré à chaque build (ne pas
l'éditer à la main) et liste sous chaque prompt les noms traduits qui
partagent cette figure.

**Fil d'Ariane et `BreadcrumbList`.** Le lien de retour en haut de page est
un `<nav class="back">` : lien vers l'app, séparateur, puis la page courante
en `aria-current="page"`. Il porte un `BreadcrumbList` en JSON-LD, à côté du
`WebPage` — c'est un type de résultat enrichi **toujours supporté** par
Google, contrairement à `HowTo`, retiré en 2023 : ne pas ajouter de `HowTo`
sur ces pages malgré leur structure en étapes, ça ne produirait rien.
Le JSON-LD de la page est donc un **tableau** de deux objets, pas un objet
seul. Côté CSS, `.back` est le conteneur et `.back a` le lien : mettre le
soulignement sur le conteneur ferait passer le séparateur et le nom de la
page courante pour des liens.

**`og:locale` vient d'une table explicite** (`OG_LOCALES` dans le
générateur), jamais de `` `${locale}_${locale.toUpperCase()}` ``. Ce
raccourci marche par coïncidence pour fr/es/de/it, dont le code pays est
identique au code langue, mais produit `en_EN` pour l'anglais — « EN » n'est
pas un code pays ISO 3166-1, et la valeur est invalide.

**Exercices similaires : seulement s'il y en a vraiment.** Le carrousel en
bas de page ne liste que les exercices du même groupe musculaire ayant
eux-mêmes une page générée ; la section entière est omise s'il n'y en a
aucun (ex. les mollets, seul exercice de leur groupe) — jamais de remplissage
avec des exercices non pertinents pour avoir quelque chose à afficher.

**Règle de rédaction du contenu long — la plus importante de cette section.**
Ce contenu est de la matière santé/sport lue par des gens qui reprennent le
sport : uniquement du **vérifiable et du stable** — anatomie (noms et rôles
musculaires), biomécanique (actions articulaires, plans, types de
contraction), principes d'entraînement établis. **Jamais de citation
d'étude, jamais de pourcentage d'activation EMG, jamais de chiffre à fausse
précision** : ça sonnerait scientifique en étant inventé, ce qui est pire
que de rester général. Les précautions sont pratiques (réduire l'amplitude,
adapter) et ne posent **jamais** de diagnostic ; un avertissement global
figure en pied de chaque page générée.

**Champs optionnels = sections absentes, pas sections vides.** `progression`
et `precautions` sont optionnels parce qu'ils ne s'appliquent pas partout
(une mobilité comme le chat-vache n'a pas de « progression » au sens d'un
exercice de force). Le générateur omet la section entière plutôt que
d'afficher un titre suivi de remplissage — même logique que le carrousel
d'exercices similaires.

**Le contenu long n'est PAS dans le bundle initial.** `ui/exercise-info.ts`
le charge via un `import()` dynamique : Vite en fait un chunk séparé, tiré
seulement à la première ouverture d'une modal. C'est délibéré — ce contenu
pèse plus lourd que tout le reste de l'app réunie, alors que la modal n'en
affiche qu'un extrait et que la plupart des visiteurs ne l'ouvriront jamais.
Ne pas rebasculer sur un `import` statique « pour simplifier » : ça
doublerait le poids du démarrage. La source reste unique, c'est le même
module que celui lu par le générateur de pages.

**Le chrome des pages générées vient de l'i18n, pas du générateur.** Titres
de section, `<title>`, description, avertissement, pied de page : tout est
dans `page.*` des dictionnaires, donc exigé dans les 5 langues. Ne jamais
réécrire une de ces chaînes en dur dans `scripts/build-exercise-pages.ts` —
c'est le défaut qu'avait la première version anglaise : contenu traduit,
titres restés en français, ce qui casse la page pour le lecteur et brouille
la détection de langue de Google.

**L'index de l'accueil suit la langue active sans rien importer.** Le HTML
statique liste les fiches de la langue source (crawlable), et le plugin Vite
dépose le slug de **chaque** langue en `data-slug-<locale>` sur le lien.
`ui/guides-index.ts` reconstruit alors le `href` depuis ces attributs à
chaque changement de langue. Deux pièges déjà rencontrés : importer
`content/exercise-details` dans ce module ramènerait tout le contenu long
dans le bundle de démarrage ; et reconstruire depuis le `href` courant au
lieu des attributs rend la réécriture non idempotente — passer de l'anglais
à une langue sans fiche laissait le lien anglais en place.

**Modal d'info (`ui/exercise-info.ts`).** Un `<dialog>` natif (skeleton
statique dans `index.html`, jamais construit en JS) : fermeture Échap et
focus-trap gratuits. Un exercice `custom` n'a pas de bouton ⓘ —
`isLibraryKey()` l'exclut, aucun contenu n'existe pour cette clé.
`#infoName`/`#infoGroup`/`#infoMuscles`/`#infoPoints` restent vides dans le
HTML statique, volontairement (contenu par exercice, pas du chrome — même
statut que `#runName` dans le lecteur). Un `<dialog>` non ouvert est de
toute façon masqué par défaut par le navigateur
(`dialog:not([open]){display:none}`), donc invisible pour un crawler ou un
lecteur d'écran tant qu'il n'est pas ouvert.

Le repli français s'applique aussi ici, visiblement : si la langue active
n'a pas encore de contenu long pour cet exercice, la modal affiche quand
même le contenu (en français) plutôt que rien, avec la mention
`exerciseInfo.unavailable` — jamais une modal vide sous prétexte que la
traduction n'existe pas encore.

**`.info-btn` : 32px, en dessous du seuil de 44px du reste de l'app —
décision assumée**, pas un oubli. C'est une action secondaire (l'action
principale d'une carte est de l'ajouter au déroulé, celle d'une ligne est
de régler ses paramètres) dans un espace déjà dense (grille 2 colonnes,
ligne à 4-5 champs). Un seul style de base partagé (`.info-btn`), deux
contextes de positionnement (`.libcard .info-btn` en badge absolu sur la
carte de bibliothèque, `.fields .info-btn` poussé au coin bas droit de la
carte du déroulé). `.del` reprend le même gabarit 32px au coin haut droit —
voir « Cibles tactiles » plus haut pour la répartition complète.

**Recherche et filtre (`ui/library.ts`).** État local au module (`search`,
`group`), volontairement **hors de `State`** — un filtre d'affichage n'a rien
à faire dans ce qui est persisté en `localStorage`, et il doit repartir de
zéro à chaque chargement de page. Il doit en revanche **survivre** aux
appels à `renderAll()` déclenchés par autre chose (changement de langue,
ajout d'un exercice au déroulé...) : `render()` réapplique l'état courant du
filtre au lieu de le réinitialiser, `renderGrid()` s'en sert directement.

Recherche insensible aux accents (`normalize()`, `\p{Diacritic}` sur une
chaîne passée par `.normalize('NFD')`) : taper « epaule » doit trouver
« Épaules ». Les options du `<select>` de groupe sont reconstruites à
chaque `render()` — leur libellé doit suivre la langue active, comme tout
le reste de l'interface.

`src/content/exercise-page.css` est **indépendante** du bundle CSS de l'app
(nom de fichier haché différent à chaque build, et la plupart de ses classes
ne concernent que l'app interactive) : seuls les tokens de couleur et la
typographie sont repris, pour la même identité visuelle sans dépendance
fragile entre les deux étapes de build.

## Déploiement

Push sur `main` → `.github/workflows/deploy.yml` construit et publie `dist/` sur
GitHub Pages. `base: './'` dans `vite.config.ts` : les chemins sont relatifs, le
build fonctionne donc sous `user.github.io/<dépôt>/` sans coder le nom du dépôt.
Ne pas passer `base` à un chemin absolu.
