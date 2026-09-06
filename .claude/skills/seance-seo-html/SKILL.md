---
name: seance-seo-html
description: >
  Regles SEO, partage social et performance percue de l'accueil de Seance :
  index.html et son texte statique injecte au build, JSON-LD, balises og:* et
  canonical, polices, reservation de hauteur et CLS, sitemap, llms.txt,
  image de partage. A charger avant de modifier index.html, vite.config.ts,
  les meta/balises, la police d'affichage, ou des qu'il est question de
  referencement, de robots, d'apercu sur les reseaux, de CLS ou de sitemap.
---

# SEO, partage social et CLS de l'accueil

`index.html` porte du contenu qui n'existe **nulle part ailleurs** dans le
code : le `<title>`, la `<meta name="description">`, le `<link
rel="canonical">`, les blocs Open Graph et Twitter Card, le JSON-LD, et le
texte français figé à l'intérieur de l'eyebrow, du `<h1>`, de la tagline, des
deux `<h2>`, du `<h3>` de l'aperçu et de la section « À propos ».

**Pourquoi ce texte doit exister dans le HTML livré.** Tout élément `data-i18n`
est vide tant que `main.ts` n'a pas tourné (`applyStaticTranslations()`,
`src/ui/dom.ts`). Un navigateur normal comble ce vide en quelques
millisecondes, mais les robots qui lisent le HTML brut sans exécuter de
JavaScript — la plupart des bots de prévisualisation sociale (Facebook,
LinkedIn, Discord…) et certains outils d'audit SEO — voient la coquille vide.

**Il n'est plus recopié à la main : `fillStaticTranslations()`
(`vite.config.ts`) le remplit au build depuis `fr.ts`, en dev comme en prod**
— troisième plugin `transformIndexHtml` de la même famille que
`injectExerciseIndex()` et `stampBuildDate()`. Il n'y a donc **plus de règle
de synchronisation à tenir** : changer un texte dans `fr.ts` suffit, et la
liste d'une vingtaine de clés à répercuter qui vivait ici a disparu avec elle.

**Contrat sur la source, en contrepartie : un élément portant `data-i18n` doit
être vide dans `index.html`** (`<h1 data-i18n="app.heading"></h1>`), et un
élément portant `data-i18n-aria-label`/`data-i18n-placeholder` doit poser
l'attribut correspondant **vide** à l'endroit voulu (`aria-label=""`) — c'est
ce qui rend le remplissage non ambigu et garde l'ordre des attributs du
fichier. Le plugin échoue le build, avec le nom de la clé, si l'élément n'est
pas vide, si la clé est absente de `fr.ts`, si elle résout vers une entrée
pluralisée (un pluriel n'a pas de forme statique : il se construit en JS avec
`t()`), ou si l'attribut à remplir manque.

Corollaire pratique : ouvrir `index.html` directement en `file://` montre un
chrome vide. Ça n'a jamais été un usage supporté (l'app a besoin du bundle),
mais autant le savoir avant de conclure à une régression.

**`#infoName`/`#infoGroup`/`#infoMuscles`/`#infoPoints` restent vides dans le
HTML statique, volontairement** : ce sont des valeurs par exercice, pas du
texte de chrome — même statut que `#runName` dans le lecteur, jamais rempli
non plus. Un `<dialog>` non ouvert est de toute façon masqué par défaut par
le navigateur (`dialog:not([open]){display:none}`), donc invisible pour un
crawler ou un lecteur d'écran tant qu'il n'est pas ouvert.
**Le chrome interactif porte lui aussi son texte, sans exception** (boutons de
mode, actions, libelles). Il a longtemps ete laisse vide au motif qu'il « n'a
aucune valeur pour un robot ». C'etait vrai pour l'indexation et faux pour le
**CLS** : ces 14 elements passaient de zero a leur hauteur reelle des
qu'`applyStaticTranslations()` tournait, decalant tout ce qui suit. Ne pas
revenir en arriere pour « alleger » le HTML.

**`npm run check` verifie tout cela sur `dist/`** (`scripts/check-build.ts`,
lance aussi par la CI apres le build) : chaque `data-i18n` rempli, les 62 cles
d'exercice presentes en attribut et en `<code>` visible, chaque bloc JSON-LD
qui parse, `__BUILD_DATE__` remplace, les 310 fiches non vides et inscrites au
sitemap. Ne pas refaire ces controles a la main — et si une regle nouvelle
merite d'etre tenue, l'ajouter la plutot que de l'ecrire en prose ici.

JS ne les touche jamais) et portent donc une URL absolue figée :
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

**Cibles tactiles** : la regle des 44px et la repartition des commandes d'une
carte vivent dans la skill `seance-ui-module`.

**Sitemap.** `public/sitemap.xml` est à soumettre dans la Search Console : le
`robots.txt` de la racine du domaine appartient à un autre projet et ne le
référence pas. Inutile d'ajouter un `public/robots.txt` — seul celui de la
racine du domaine fait autorité, un fichier sous `/SRCR/` serait ignoré.

**Fraîcheur (JSON-LD).** `dateModified` n'est **jamais** à modifier à la main
dans `index.html` — le jeton `__BUILD_DATE__` est remplacé par la date réelle
du build (`transformIndexHtml` dans `vite.config.ts`), aussi bien en dev qu'en
prod. `datePublished` reste fixe (2026-09-03, premier commit du portage) et ne
change plus.

**`llms.txt` : présent, mais pas pour le SEO.** Le raisonnement d'origine
reste valable et ne doit pas être « corrigé » : Google l'ignore explicitement
pour la recherche (ni bonus ni pénalité), aucun moteur IA ne lui accorde de
poids de citation avéré, et la racine faisant autorité (`/llms.txt`)
appartient à l'autre projet — seul `/SRCR/llms.txt` est à notre portée.
**En attendre le moindre gain de référencement serait une erreur.**

Il existe pour une autre raison, apparue avec le pilotage par une IA (voir
« Écriture par lien » plus haut) : les outils agentiques (Claude Code,
Cursor, Cline) le lisent **quand on leur pointe une URL**, ce qui est
exactement l'usage visé. Il est généré par
`scripts/build-exercise-pages.ts` depuis les mêmes sources que la page de
spec (`LIBRARY`, les dictionnaires, `encodeSharedPlan()`) — donc sans risque
de diverger, et à coût quasi nul. Ne pas y ajouter de contenu qui n'existe
pas ailleurs : ce doit rester un miroir.

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

