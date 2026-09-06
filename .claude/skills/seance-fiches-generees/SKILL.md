---
name: seance-fiches-generees
description: >
  Pipeline des 310 pages d'exercice statiques de Seance (une par exercice et
  par langue) et regles de redaction du contenu long. A charger avant de
  toucher a scripts/build-exercise-pages.ts, src/content/exercise-details/*,
  src/content/exercise-page.css ou src/content/image-prompts.ts — c'est-a-dire
  des qu'il est question de fiche d'exercice, de page generee, de contenu long
  (etapes, muscles, erreurs, anatomie), de slug d'URL, de fil d'Ariane ou du
  carrousel d'exercices similaires.
---

# Les 310 pages d'exercice generees

Pour *ajouter* un exercice de bout en bout, c'est la skill `add-exercise` :
celle-ci porte le pipeline et les regles de redaction qu'elle suppose.

`npm run exo <cle>` imprime les bornes de lignes du contenu long d'un exercice
dans les cinq langues — a lancer avant d'ouvrir ces fichiers, qui font 1 100
lignes chacun.

**Pourquoi un fichier HTML statique par exercice, et pas une route JS.**
Choix délibéré, pas une contrainte technique : ces 36 (bientôt plus) pages
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

**Pour une modification groupée (touchant les 36 pages à la fois), un seul
endroit à toucher selon la nature du changement :**

| Ce qui change sur les 310 pages | Où éditer |
|---|---|
| Structure HTML, balises meta, JSON-LD, carrousel | `renderPage()` dans `scripts/build-exercise-pages.ts` |
| Couleurs, typographie, mise en page, carrousel (CSS) | `src/content/exercise-page.css` |
| Contenu d'un exercice précis (étapes, muscles, erreurs) | l'entrée correspondante dans `src/content/exercise-details/<locale>.ts` — **les 5 fichiers**, sinon les langues divergent |
| Titres de section, `<title>`, avertissement, pied de page | le bloc `page.*` des 5 dictionnaires `i18n/locales/*.ts`, jamais en dur dans le générateur |
| Sélection des exercices « similaires » | la fonction `similar` dans `renderPage()` |

Après toute modification de l'un de ces fichiers, `npm run build` régénère
les 310 pages en une fois — jamais besoin (et jamais correct) de modifier un
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
  complètes** (62 exercices chacune), mais le contrat reste volontairement
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
`injectExerciseIndex()` remplace par la liste des 36 liens dans
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

**Modal d'info, recherche/filtre de la bibliotheque et taille de `.info-btn`**
sont des regles d'interface : elles vivent dans la skill `seance-ui-module`.

`src/content/exercise-page.css` est **indépendante** du bundle CSS de l'app
(nom de fichier haché différent à chaque build, et la plupart de ses classes
ne concernent que l'app interactive) : seuls les tokens de couleur et la
typographie sont repris, pour la même identité visuelle sans dépendance
fragile entre les deux étapes de build.

