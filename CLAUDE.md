# Séance

Planificateur et minuteur de séance au poids du corps. Site statique, multilingue
(fr, en, es, de, it), sans backend : tout l'état vit dans le `localStorage` du
navigateur et rien ne quitte l'appareil.

L'application a deux écrans : le **planificateur** (construire le déroulé,
réordonner, régler les pauses) et le **lecteur** (`.run`, plein écran, chrono +
anneau de progression + bip).

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
    types.ts       PlanItem / Step / Config
    plan.ts        creation de lignes, resolution des noms traduits
    queue.ts       LE moteur : buildClassic, buildCircuit, queueDuration
    storage.ts     localStorage v4 + migration depuis la v3
  data/            donnees sans texte
    groups.ts      ids + couleurs des groupes musculaires
    library.ts     28 exercices : reglages seulement
    figures.ts     figures SVG
  content/
    exercise-details/fr.ts  contenu long (etapes, muscles, prompt image) — voir plus bas
    exercise-page.css       styles des pages d'exercice statiques
  i18n/
    index.ts       t(), pluriels via Intl.PluralRules, detection, formatDate
    locales/       fr (source) + en, es, de, it
  ui/              rendu et interactions, un module par zone d'ecran
    app.ts         orchestration : etat partage, sauvegarde, cycles de rendu
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

Les clés de stockage sont versionnées (`seance.plan.v4`, …) dans
`core/storage.ts`. Tout changement de forme des données stockées demande de
bumper la version **et** d'écrire la migration. `parseItem()` accepte aujourd'hui
les deux formes (v3 `type: 'ex'` avec nom inline, v4 `type: 'exercise'`) et ne
supprime jamais les clés v3 : la v4 est écrite à côté.

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
`app.sourceCode`, `section.plan`, `section.library`, `preview.title`, les
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

Le reste du chrome interactif (boutons, labels de formulaire, listes) n'a pas
ce double, volontairement — il n'a aucune valeur pour un robot puisqu'il ne
fait rien sans JS.

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

**Cibles tactiles.** Tout élément interactif vise `min-width`/`min-height:
44px` (bonne pratique Lighthouse/Apple HIG — la norme réellement opposable,
WCAG 2.5.8 AA, ne fixe que 24px). `min-height`/`min-width` plutôt que
`height`/`width` : la zone tactile est garantie quelle que soit la métrique
réelle de la police, pas déduite d'un calcul de padding. `.del` est calé sur
`.mini` × 2 + le `gap` de `.arrows` (96px) pour garder les deux empilés
visuellement alignés, comme dans le design d'origine. Pour un lien texte
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
- *`hreflang`* : les 5 langues partagent une seule URL. Le faire correctement
  demanderait des URL indexables par locale (`/en/`, `/es/`…) générées au
  build — un changement structurel, pas une balise à ajouter.
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

| Ce qui change sur les 28 pages | Où éditer |
|---|---|
| Structure HTML, balises meta, JSON-LD, carrousel | `renderPage()` dans `scripts/build-exercise-pages.ts` |
| Couleurs, typographie, mise en page, carrousel (CSS) | `src/content/exercise-page.css` |
| Contenu d'un exercice précis (étapes, muscles, erreurs) | l'entrée correspondante dans `src/content/exercise-details/fr.ts` |
| Sélection des exercices « similaires » | la fonction `similar` dans `renderPage()` |

Après toute modification de l'un de ces fichiers, `npm run build` régénère
les 28 pages en une fois — jamais besoin (et jamais correct) de modifier un
fichier `dist/exercises/**/*.html` à la main pour propager un changement.

Chaque exercice a deux niveaux de texte, dans deux systèmes différents :

- **Nom + conseil court** — `i18n/locales/*.ts`, sous `exercise.<key>`. Chrome
  d'interface (carte de la bibliothèque, ligne du déroulé) : exigé dans les
  **5 langues** dès l'ajout d'une clé, comme tout le reste de `Translations`.
- **Contenu long** — `src/content/exercise-details/<locale>.ts`, sous la clé
  de l'exercice : muscles sollicités, étapes, erreurs fréquentes, prompt
  d'image. Volontairement **hors du contrat i18n strict**
  (`Partial<Record<ExerciseKey, ExerciseDetail>>`, pas `Translations`) — une
  langue peut légitimement ne pas encore avoir traduit ce contenu, contrairement
  à un bouton qui ne doit jamais être vide. Aujourd'hui, seul `fr.ts` existe.
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

**`dist/sitemap.xml` n'a plus qu'une seule source** : le générateur l'écrit en
entier (page d'accueil + une entrée par page générée) à chaque build.
`public/sitemap.xml` a été supprimé — ne pas le recréer, ce serait une
deuxième source vouée à diverger de la première.

**Image Gemini : jamais référencée avant d'exister.** Chaque `ExerciseDetail`
porte un `imagePrompt`, consolidé par le générateur dans `docs/image-prompts.md`
(ne pas éditer ce fichier à la main, il est régénéré à chaque build). Tant
qu'aucune image n'a été générée et ajoutée, la page utilise la figure SVG
existante — jamais une balise `<img>` vers un fichier qui n'existe pas.

**Exercices similaires : seulement s'il y en a vraiment.** Le carrousel en
bas de page ne liste que les exercices du même groupe musculaire ayant
eux-mêmes une page générée ; la section entière est omise s'il n'y en a
aucun (ex. les mollets, seul exercice de leur groupe) — jamais de remplissage
avec des exercices non pertinents pour avoir quelque chose à afficher.

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
contextes de positionnement (`.libcard .info-btn` en badge absolu,
`.name .info-btn` en inline à côté du chip de groupe).

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
