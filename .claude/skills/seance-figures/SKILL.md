---
name: seance-figures
description: >
  Regles de dessin des 63 figures SVG d'exercice de CIRKALI : vocabulaire des
  classes, trois niveaux de lecture, convention d'orientation, convention de
  fleche et marque de tension, et ou vit la CSS qui les colore. A charger avant
  de toucher a src/data/figures.ts, au champ `motion` de src/data/library.ts,
  ou au bloc `.fig-svg` de src/styles/base.css et src/content/exercise-page.css
  — c'est-a-dire des qu'il est question de figure, de bonhomme, de pictogramme
  d'exercice, de fleche de mouvement, de silhouette ou d'illustration
  d'exercice.
---

# Les figures d'exercice de CIRKALI

63 figures (62 exercices + `custom`), corps SVG bruts dans `src/data/figures.ts`,
`viewBox 0 0 200 118`. Elles sont inlinees dans cinq surfaces et n'ont **aucun
texte** : la meme figure sert les cinq langues.

`figureSvg(key)` enveloppe le corps dans `<svg class="fig-svg">`. **Cette classe
est la seule prise CSS des cinq surfaces** — la retirer ne casse rien
visiblement sur le theme sombre et casse tout sur le clair (voir « le piege du
fill » plus bas).

## Vocabulaire des classes

| Classe | Role | Rendu |
|---|---|---|
| `s` | corps : membres, tronc | trait `--fig-body`, `fill: none` |
| `hd` | tete | disque plein `--fig-body` |
| `obj` | mur, chaise, banc, machine, haltere | contour `--fig-back`, **et masse `--fig-mass` si `rect` ou `circle`** |
| `gr` | ligne de sol | trait `--fig-back` |
| `ar` / `arh` | fleche de mouvement + sa pointe | `--fig-accent` (lime) |
| `pull` | sens ou tirer, sur un etirement | pointille `--fig-back`, sans pointe |

**Trois niveaux de lecture, pas un.** Le corps devant, l'objet comme masse
derriere lui, le sol en simple repere. Avant, une declaration unique peignait
les trois de la meme couleur et laissait l'objet en contour vide : ce qui
distingue l'exercice (le rebord d'`inclined`, le mur de `wallPushup`, la chaise
de `chairsquat`) etait l'element le moins visible du dessin.

**Le remplissage ne vaut que pour `rect.obj` et `circle.obj`** — seules formes
fermees. Les murs sont des `<line>`, les elastiques des `<path>` ouverts : un
`fill` sur ceux-la fermerait la courbe sur sa corde.

**Le piege du `fill`.** Un `<path>` sans `fill` declare est rempli en **noir**
(valeur initiale du SVG, pas `none`). 76 traces du corps ont trois points ou
plus et enfermaient donc une aire noire — invisible sur le fond sombre, bien
visible sur le theme clair de l'app. D'ou `fill: none` sur `.s` dans le bloc
partage. Ne pas le retirer, et ne jamais compter sur « ca ne se voit pas ».

## Ou vit la CSS

Le bloc `.fig-svg` existe **en deux exemplaires** : `src/styles/base.css` (le
bundle) et `src/content/exercise-page.css` (les pages generees, hors bundle),
pour la meme raison que les `@font-face` — la feuille des fiches ne peut rien
emprunter au bundle. `check-build.ts` compare les deux et echoue si elles
divergent. **Toute modification se fait des deux cotes.**

Chaque surface ne declare que ses teintes, jamais les regles :

- defaut (`.fig`, `.info-fig`, `.rfig`) : corps `--paper`, fond `--paper-dim`
- reduites (`.libcard` dans `planner.css`, `.carousel-card` dans
  `exercise-page.css`) : corps `--paper-dim`, fond `--paper-faint`

Les memes six regles etaient auparavant recopiees **cinq fois sur 95 lignes**, et
avaient deja diverge sans que ce soit une decision. Ne pas recreer une sixieme
copie : ajouter une surface = declarer trois variables.

## Les trois conventions, tenues par `npm run check`

### 1. Toutes les figures de profil regardent a gauche

38 le faisaient, 7 non. Le miroir est `x → 200 − x` (attention : un `rect` part
de son bord gauche, il faut retrancher sa largeur apres reflexion). L'interet
n'est pas l'harmonie : la bibliotheque affiche les exercices **filtres par
groupe**, donc les figures comparables sont cote a cote, et une seule a
contresens force l'oeil a se reorienter au lieu de lire une difference.

Une figure de face (tete centree, `cx` entre 95 et 105) est hors sujet et
acceptee telle quelle.

### 2. La fleche dit ce qui bouge, son absence dit que la position se tient

- **trait plein** : le segment du corps se deplace (le corps descend, un membre
  monte, la marche avance) ;
- **pointille** (`stroke-dasharray="4 3"`) : trajectoire courbe d'un membre ;
- **rien** : c'est une tenue.

La regle a besoin d'une donnee que `mode` ne peut pas fournir — `mode: 'time'`
range la planche et le velo d'appartement dans la meme case. D'ou
**`motion: 'move' | 'hold'`** sur `LibraryEntry`. C'est une metadonnee de
catalogue comme `category` : **jamais recopiee dans un `ExerciseItem` persiste**,
donc son ajout n'a demande aucune migration — et pour la meme raison elle est
exclue du type de `CUSTOM_DEFAULTS`, sans quoi `createCustom()` la figerait dans
chaque exercice perso. Le typecheck le rappelle si on l'oublie.

Cette convention s'etait deja degradee en silence : **26 exercices sur 62** la
contredisaient avant qu'une assertion ne l'attrape.

### 3. `pull` n'est pas une fleche

Sur un etirement, le trait indique le sens ou **tirer pour installer la
position** — une consigne de mise en place, pas un geste a repeter. D'ou le
pointille serre (`2 3`), sans pointe, dans la teinte du sol. Il n'a de sens que
sur un `motion: 'hold'`, et l'assertion le verifie.

## Poser une fleche sans mordre le dessin

```
node .claude/skills/seance-figures/figure-space.mjs <cle>   # une figure
node .claude/skills/seance-figures/figure-space.mjs         # les 63
```

Sort la boite englobante du corps, les colonnes libres a gauche et a droite, et
la distance de la fleche existante au corps. Une colonne de **26 unites**
suffit ; le script propose alors un `x`. Motifs :

```
descendre : <path class="ar" d="M{x} 56 L{x} 82"/><polygon class="arh" points="{x},88 {x-4},78 {x+4},78"/>
monter    : <path class="ar" d="M{x} 84 L{x} 60"/><polygon class="arh" points="{x},54 {x-4},64 {x+4},64"/>
```

**Le calcul se fait apres le miroir, jamais avant.** C'est l'erreur commise sur
`chairDips` : colonne libre calculee sur la figure d'origine, banc passe de
l'autre cote au retournement, fleche posee dessus.

**`TROP PRES` n'est pas toujours un defaut.** 16 figures ont une fleche a moins
de 6 unites du corps, et c'est voulu : une fleche de *trajectoire* annote le
membre qu'elle decrit et doit le toucher (`wallSlides`, `bandPullApart`,
`stationaryBike`, `donkeyKick`). Le signal ne vaut que pour une fleche de
*direction* isolee, qui doit vivre dans une colonne libre. Ne pas « corriger »
les 16.

## Verifier

`npm run check` porte cinq assertions sur les figures : la fleche contre
`motion`, `pull` reserve aux tenues, l'orientation, l'egalite des deux copies du
bloc CSS, et la presence de la classe `fig-svg` sur les 310 fiches livrees.
`npm run typecheck` ne voit rien de tout cela — ce sont des contenus de chaines.

## Ce qui a ete essaye et ecarte

Voir `docs/decisions-ecartees.md` : animation SVG, illustration raster,
silhouette pleine, banques d'exercices libres. Les chiffres mesures y sont —
relire avant d'en reproposer une.
