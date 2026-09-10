---
name: seance-partage-liens
description: >
  Regles du partage d'une seance par lien et QR (?s=) et du pilotage du site
  par une IA (?plan=, page de spec, llms.txt, WebMCP). A charger avant de
  toucher a core/share.ts, core/ai-plan.ts, ui/share.ts, ui/webmcp.ts,
  ui/ai-help.ts ou a la section #aiPlan d'index.html — c'est-a-dire des qu'il
  est question de lien de partage, de QR code, d'import d'une seance, du
  format d'URL, ou de faire creer/modifier une seance par ChatGPT, Claude ou
  Gemini.
---

# Partage par lien et pilotage par une IA

Se rattache a la regle n°2 de `CLAUDE.md` (jamais de texte traduit dans un
objet persiste) : c'est elle qui fait qu'un lien produit en francais s'importe
correctement en italien.

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
répétitions, secondes, repos, nomPerso?, charge?]` pour un exercice, `['r',
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

**La charge est la dixième position, et un tableau positionnel s'étend par la
fin.** C'est ce qui a permis de l'ajouter sans toucher à `v` : un ancien build
lit le neuvième élément comme un nom perso et ignore le dixième. Contrepartie,
un exercice de la bibliothèque qui porte une charge écrit `""` en neuvième —
les positions ne se sautent pas. Trois caractères pour ne pas avoir à deviner
la nature d'un élément d'après son type, ce qu'aucune documentation lisible par
une IA ne dirait simplement. `encodeItem()` n'écrit rien quand il n'y a pas de
charge, donc une séance au poids du corps produit exactement le lien d'avant.

**Le format est documenté sur QUATRE surfaces, et elles ont déjà divergé.** La
page de spec générée, `llms.txt`, les outils WebMCP (`ui/webmcp.ts`) et — celle
qu'on oublie — le bloc `#aiPlan` de l'accueil, écrit à la main, sans
`data-i18n`, avec son propre exemple `?s=` en base64 littéral. C'est pourtant
le premier que les modèles lisent : `aiHelp.createPrompt` leur donne l'adresse
de l'accueil, pas celle de la page de spec. `check-build.ts` décode désormais
cet exemple-là aussi, et exige qu'il porte une charge.

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

## Écriture par lien : le site est pilotable par une IA

On peut donner l'URL du site à ChatGPT, Claude ou Gemini et obtenir un lien
qui crée la séance. Rien de neuf côté moteur : c'est le lien de partage
`?s=` ci-dessus, mais **documenté dans la page elle-même** pour que le modèle
le découvre sans qu'on le lui explique.

**Le canal qui porte la fonctionnalité est le texte visible d'`index.html`.**
Ces outils récupèrent le HTML et le lisent ; ils n'exécutent pas notre JS.
D'où la section `#aiPlan` (`<details class="about" open>`, entre « À propos »
et le pied de page), livrée ouverte comme « À propos » et repliée sous 760 px
par `ui/app.ts` — certains récupérateurs extraient l'`innerText` d'un rendu
headless, et le contenu d'un `<details>` fermé n'y figure pas. **Jamais de
bloc masqué réservé aux robots** : c'est du cloaking (déjà interdit § « À
propos »), et `display: none` est de toute façon absent de l'`innerText`.

**La section a deux destinataires, et le dit — `.ai-spec` (`base.css`).**
`aiPlan.intro` s'adresse au visiteur et ne prononce ni « JSON » ni
« base64 » : demandez une séance à une IA, elle répond par un lien, vous
choisissez de le garder. Tout le reste (`aiPlan.format`, `.keys`, `.rawLink`
et le bloc `.ai-code`) s'adresse à l'IA et vit dans un `<div class="ai-spec">`
en retrait derrière un liseré, annoncé par `aiPlan.forAi`. C'était une plainte
d'usage réelle : un humain tombait sur du JSON et une table de clés au milieu
d'une prose écrite pour lui. **Ce liseré délimite, il ne masque pas** — le
contenu technique reste entier, visible et dans l'`innerText`, sans quoi on
retomberait sur le cloaking interdit juste au-dessus. Ne pas « simplifier » en
déplaçant ce contenu vers la seule page de spec : c'est la présence *sur
l'accueil* qui fait marcher le cas « on donne l'URL du site à une IA ».

**Aucune norme ne fait autorité ici, vérifié en 2026** — `llms.txt`,
`ai.txt`, `agents.txt`, `/.well-known/agent-*.json` sont fragmentés, et tous
s'ancrent à la **racine du domaine**. Cette racine était hors de portée tant
que le site vivait sous `kallly.github.io/SRCR/` ; depuis `cirkali.fr` elle
est à nous, et `llms.txt` y est bien servi. Ça ne change pas le choix
ci-dessous, ça lui retire seulement une de ses contraintes d'origine. C'est
la même contrainte que pour `robots.txt` et le sitemap. Le choix retenu est
donc une **page HTML crawlable maillée depuis l'accueil**
(`dist/creer-une-seance-par-lien.html`, générée par
`scripts/build-exercise-pages.ts`, inscrite au sitemap) : la doctrine déjà
assumée pour les 310 fiches, du contenu qu'on trouve en suivant un lien.
Trois surfaces secondaires l'accompagnent : `potentialAction`/`EntryPoint`
dans le JSON-LD de l'accueil (le seul vocabulaire normé pour déclarer une
URL-gabarit ; Google n'en fait aucun résultat enrichi, et beaucoup de
convertisseurs HTML→markdown suppriment les `<script type="application/ld+json">`
— c'est une ceinture, pas la fonction), `dist/llms.txt`, et WebMCP.

**`data-key`/`data-group` sur l'index des fiches** (`injectExerciseIndex()`,
`vite.config.ts`) : la liste des 62 clés lisible par une IA existe **une
seule fois**, injectée depuis `LIBRARY`. Ne jamais écrire une seconde liste à
la main dans `index.html` — ce serait le problème `public/sitemap.xml` à
nouveau. La section `#aiPlan` porte la phrase qui fait le lien (« la valeur
de la clé est l'attribut `data-key` des liens ci-dessus ») : sans elle,
l'indirection est trop implicite pour être suivie.

**`?s=` reste le format canonique annoncé aux IA**, et l'exemple de la page
de spec est **encodé au build en appelant `encodeSharedPlan()`** — jamais
recopié à la main. Un exemple faux serait pire que pas d'exemple.

**`?plan=` : le filet, pas le format principal** (`core/ai-plan.ts`). Même
JSON, en clair, à clés explicites. Un modèle encode le base64 à la main et se
trompe, et personne ne peut relire un lien faux : sans cette voie, l'échec
n'a aucune issue. Trois invariants :
- il n'entre **jamais** dans un QR code — sa verbosité est l'exact opposé de
  ce que cherche `?s=`, dont la densité est toute la raison d'être ;
- la validation reste centralisée dans `parsePlan()`/`parseSessionConfig()`
  (`core/storage.ts`) : `ai-plan.ts` ne fait que reconstruire la forme
  `{ type, key, ... }`, exactement comme `decodeItem()` pour `?s=` ;
- **la coercition chaîne→nombre (`"3"` → 3) vit dans `ai-plan.ts`**, jamais
  en relâchant `positiveInt()` : le parseur du schéma persisté n'a pas à
  s'assouplir pour une source tierce.
`llms.txt` demande en plus de **ne jamais inventer une clef** et donne la
sortie de secours dans la meme phrase (`custom` + le nom en neuvieme
position), et precise que le groupe d'une clef connue est **ignore** — l'UI
l'impose deja, autant ne pas laisser le modele depenser une devinette sur un
champ qui ne compte que pour `custom`.

Une clé inconnue devient un exercice perso **portant ce nom** (et non un
`custom` anonyme) : le modèle peut toujours écrire `ex`. Mais **jamais de
reconnaissance par nom traduit** (« Planche » → `plank`) : ça ferait dépendre
l'import de la langue active, contre la règle n°2, et casserait la propriété
qui fait marcher `?s=` — un lien produit en français s'importe en italien.

**Le lien ne décide de rien : l'utilisateur choisit la destination.** Le
dialogue d'import propose « Importer comme nouvelle séance », « Ajouter à la
séance active », et « Remplacer "X" » seulement si le nom correspond à une
séance existante — et dans ce dernier cas, **« Ajouter » disparaît** :
l'usage réel qui fait apparaître « Remplacer » est une IA qui relit une
séance nommée puis renvoie sa version modifiée, pas un lot d'exercices à
fusionner ailleurs ; proposer les deux à côté d'« Ajouter » brouillait un
choix qui n'en est en réalité qu'un (remplacer, ou garder les deux versions
séparément via « nouvelle séance »). Sans correspondance de nom, « Ajouter »
reste la seule façon de fusionner un petit lot d'exercices partagés dans la
séance en cours. Aucun champ « opération » à faire produire par le modèle,
aucun changement de format, et une IA ne peut pas écraser une séance à l'insu
de son propriétaire. Remplacer et ajouter sont suivis d'un toast « Annuler ».
`importPlan()` (`ui/app.ts`) garde sa sémantique « crée toujours » ;
`replacePlan()` et `appendToActive()` sont des méthodes distinctes.

**Un lien invalide ouvre désormais un message** (`share.importInvalid`) au
lieu d'échouer en silence. Le silence se défendait tant que le lien venait
d'un tiers (une messagerie qui tronque) et que l'utilisateur n'y pouvait
rien ; plus du tout depuis qu'il peut venir d'une IA à qui on peut demander
de recommencer.

**Une clé inconnue sans nom fourni se dégrade vers une version lisible de la
clé, jamais vers l'anonymat total** (`humanizeUnknownKey()`,
`core/storage.ts`). Piège vérifié en usage réel : Gemini a lu la page en
extraction de texte, sans les attributs HTML, et a puisé le **slug de la
fiche d'exercice** (`chat-vache`, visible dans l'URL de la fiche) au lieu de
la **clé interne** attendue (`catCow`, alors invisible pour lui). Sans
filet, une clé ainsi mal formée et sans `customName` faisait perdre tout
nom : `parseItem()` retombait sur `key: 'custom'` sans `customName`, et
`exerciseName()` (`core/plan.ts`) affichait alors le générique
`exercise.custom.name` (« Exercice perso ») pour **chaque ligne** de la
séance importée — un lien qui décodait correctement mais rendait la séance
méconnaissable. Double correction : la clé de chaque exercice est
maintenant *aussi* du texte visible (`<code>`) à côté de son nom dans
l'index des fiches (`injectExerciseIndex()`, `vite.config.ts`), pas
seulement l'attribut `data-key` — préventif, pour qu'une IA en lecture de
texte tombe directement sur la bonne valeur ; et `humanizeUnknownKey()` est
le filet pour les cas qui persisteraient malgré tout (« moulinets-de-bras »
→ « Moulinets de bras » plutôt que rien). `rawKey === 'custom'` reste
exempté : c'est le sentinel légitime, pas une clé mal formée, et il n'y a
rien à en déduire.

**Pour une clé connue, le groupe musculaire vient toujours de `LIBRARY`,
jamais du payload** (`parseItem()`, `core/storage.ts`). C'est l'invariant
que l'UI applique déjà — `ui/planner.ts` masque le sélecteur de groupe pour
tout exercice de la bibliothèque, seul un perso l'expose, au motif que « le
groupe musculaire d'un exercice de la bibliothèque est intrinsèque à
l'exercice » — mais rien ne le garantissait côté import. Piège vérifié :
une IA a deviné un groupe absent de nos identifiants (« pull », usuel en
musculation push/pull/legs mais inexistant ici) pour des exercices par
ailleurs correctement reconnus (`wallSlides`, `superman`, `rotation`) ; sans
ce garde-fou, `isGroupId('pull')` est faux et le groupe retombait sur
`'core'` au lieu du vrai groupe (épaules, dos…), faussant le badge affiché
et le regroupement en mode circuit. Le payload ne garde donc voix au
chapitre sur `group` que pour une clé inconnue (`custom`), exactement là où
l'UI le permet aussi.

**Un lien produit par une IA peut arriver enveloppé dans une redirection de
recherche** (`google.com/search?q=<lien>` chez Gemini, notamment) : un
comportement du produit, pas quelque chose que ce site contrôle. L'instruction
« donnez ce lien tel quel, jamais enveloppé » vit dans `aiPlan.rawLink`
(section `#aiPlan` de l'accueil) et dans la page de spec générée —
**volontairement pas dans les prompts prêts à copier** (`aiHelp.createPrompt`/
`.modifyPrompt`, `ui/ai-help.ts`, redevenus plus courts) : le but est qu'une
IA qui lit la page l'applique d'elle-même, sans dépendre d'un prompt
particulier tapé par l'utilisateur — cohérent avec le principe déjà posé pour
tout `#aiPlan` (« documentée dans la page elle-même pour que le modèle le
découvre sans qu'on le lui explique »).

**La doctrine : cadre strict dans le texte, rattrapage silencieux dans le
code.** Un modele qui se trompe d'un cheveu ne s'en apercoit pas — Gemini ne
sait pas qu'il a enveloppe son lien dans une recherche — et la personne qui
recoit le lien encore moins : elle voit une page qui ne s'ouvre pas. On joue
donc sur les deux tableaux. Cote texte, on dit exactement ce qu'on attend, on
donne la solution plutot que l'interdit, et on s'adresse nommement au produit
concerne quand le probleme lui est propre. Cote code, on repare en silence ce
qui est reparable sans ambiguite. **Les filets ne se documentent jamais aux
IA** : un modele qui sait qu'un JSON en clair passe dans `?s=` arretera
d'encoder, et on perdra le format canonique pour gagner une tolerance qu'on
avait deja.

**Ce qui est rattrape, et pourquoi chaque cas est sans ambiguite.**
- `repairBase64Url()` (`core/share.ts`) : un espace redevient `+` (c'est du
  base64 **standard** ecrit la ou on demande base64url, que
  `URLSearchParams` a deja decode), les autres blancs disparaissent (retour a
  la ligne d'un bloc de code recopie), et la ponctuation collee **en fin** de
  chaine tombe (`)`, `.`, `»`, le `]` d'un lien Markdown). Rien n'est touche
  au milieu : la, un caractere etranger signale une chaine vraiment corrompue,
  et deviner importerait une autre seance que celle qui a ete partagee.
- `carveJson()` (`core/ai-plan.ts`) : le JSON de `?plan=` entoure de texte ou
  d'un bloc ```` ```json ```` se decoupe de la premiere ouvrante a la derniere
  fermante.
- `decodeAny()` (`ui/share.ts`) : **le nom du parametre est un indice, pas une
  declaration.** Du JSON en clair dans `?s=` ou du base64 dans `?plan=` essaie
  l'autre decodeur — une chaine base64url ne commence jamais par `{`, donc la
  forme tranche sans risque. Si les deux parametres sont la et que le premier
  echoue, le second est tente. Ce point d'arbitrage est **unique**, comme
  `save()` cote etat : ne pas disperser la tolerance dans les deux decodeurs.
- `createSlugKeyResolver()` (`ui/guides-index.ts`), branche sur
  `setExerciseKeyResolver()` (`core/storage.ts`) : une clef ni connue ni
  `custom` est cherchee dans le catalogue **slug -> clef des cinq langues**
  (`chat-vache` comme `cat-cow` -> `catCow`), separateurs et casse ignores.
  **Ce catalogue n'est pas embarque** : il est deja livre dans l'accueil, en
  attributs `data-key`/`data-slug-<langue>` sur l'index des fiches
  (`injectExerciseIndex()`, vite.config.ts), donc on le lit dans le DOM — zero
  octet de plus, et incapable de diverger de `LIBRARY` puisque c'est la meme
  injection qui sert les liens. Table construite au **premier appel
  seulement**, donc jamais sur un chargement sain. Un slug qui designerait
  deux clefs est refuse (`null`) plutot qu'arbitre.
  **Ce n'est pas la reconnaissance par nom traduit qu'on a ecartee** : les
  cinq langues sont dans la meme table, donc la resolution ne depend pas de
  la langue active et un lien produit en francais s'importe a l'identique en
  italien ; et elle ne s'applique qu'a la POSITION de la clef, jamais a un nom
  saisi — `custom` reste exempte, donc un exercice perso legitime n'est jamais
  converti en exercice de la bibliotheque.
- `humanizeUnknownKey()` (`core/storage.ts`) couvre desormais les deux formes
  de clef devinee, le slug (`chat-vache`) et le camelCase approchant
  (`inclinedPushup`). Et `?plan=` ne fabrique plus son propre nom : il passe
  la clef inconnue telle quelle a `parseItem()`, seul endroit qui sache en
  tirer un nom — deux regles de mise en forme auraient diverge alors que les
  deux formats recoivent la meme erreur. Un `name` explicite l'emporte
  toujours sur la clef, meme quand les deux sont la.

**`llms.txt` ne porte plus l'instruction « jamais enveloppe » : il en porte une
autre, adressee a Gemini.** Plutot que de demander de retirer l'enveloppe — ce que le propre
test de Gemini a deja vu echouer, l'enveloppe venant vraisemblablement d'un
filtre produit insensible au texte environnant — il demande de livrer le lien
dans un **bloc de texte copiable** et non en lien cliquable, **et de verifier
que ce bloc commence par `https://cirkali.fr/?s=`** : on ne combat plus le
filtre, on sort du format ou il s'applique, et on donne au modele le seul
critere de tout le fichier qu'il puisse verifier lui-meme. Sans cet ancrage,
un bloc copiable contenant l'URL enveloppee satisfait l'instruction a la
lettre et ne sert a rien. Divergence assumee entre
les deux surfaces, et le seul endroit ou elle est tenable : `llms.txt` est
lu par des outils agentiques, il n'est ni traduit ni affiche a un humain,
donc on peut y nommer un produit — `aiPlan.rawLink` vit en cinq langues dans
une page publique, ou « si vous etes Gemini » serait du texte d'interface
adresse a personne. Efficacite **non verifiee** elle aussi : ne pas la
presenter comme reglee.

**Deux mitigations de plus ont ete examinees puis ecartees** (lien Markdown
cliquable, raccourcissement du payload), ainsi que la note d'honnetete sur
l'efficacite non prouvee de `aiPlan.rawLink` : le raisonnement complet est
dans `docs/decisions-ecartees.md`. Le relire avant de reproposer l'une des
deux — chacune a deja ete refutee par le propre test de Gemini.

**WebMCP (`ui/webmcp.ts`) est un pari assumé, pas un socle.**
`navigator.modelContext` est un draft du W3C Community Group en origin trial
Chrome, et **aucun agent grand public ne l'appelle aujourd'hui**. D'où :
chargé en `import()` dynamique et seulement si l'API existe (zéro octet au
démarrage pour tout le monde), tout enveloppé dans un `try/catch` car la
signature peut changer d'une version à l'autre, et `create_session` **ouvre
le dialogue d'import** au lieu d'écrire — un agent propose, la personne
dispose, même invariant que pour un lien. Dans `ui/` et non `platform/` :
`platform/` regroupe des capacités navigateur pures sans connaissance de
l'app, ce module reçoit un `Context`.

