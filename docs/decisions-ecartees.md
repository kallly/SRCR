# Pistes explorees puis ecartees

Ce fichier n'est charge par personne : il existe pour repondre a « et si on
essayait… ? » sans refaire le raisonnement. Chaque entree dit ce qui a ete
propose, et la donnee concrete qui l'a refute.

## Lien enveloppe dans une recherche Google par Gemini

Contexte et mitigation retenue : voir la skill `seance-partage-liens`
(« Un lien produit par une IA peut arriver enveloppe… »).

**Efficacité non prouvée, à ne pas sur-vendre.** Le test « Test direct » de
Gemini portait déjà, dans son propre prompt auto-corrigé, la phrase « sans
passer par une recherche Google » — collée juste avant de générer le lien —
et le lien produit était **quand même enveloppé**. Cette formulation précise
a donc déjà échoué une fois collée directement dans ce que le modèle vient de
lire avant de répondre ; la déplacer dans `#aiPlan` est un pari sur le fait
qu'une instruction lue en parcourant la page pourrait peser différemment
qu'une instruction reçue dans le tour de conversation, pas une garantie. Si
une nouvelle observation montre que ça ne change rien, ne pas ajouter une
troisième variante de la même phrase à un troisième endroit : le problème
est vraisemblablement un filtre de sécurité au niveau du produit, appliqué
à toute URL générée (non issue d'une recherche), insensible au texte
environnant — voir le paragraphe suivant pour les deux pistes déjà écartées
sur cette base.

**Mitigation en place depuis, non encore mesuree.** `llms.txt` ne demande plus
de retirer l'enveloppe : il demande a Gemini de livrer le lien dans un bloc de
texte copiable et de verifier que ce bloc commence par `https://cirkali.fr/?s=`.
Ce n'est pas une troisieme variante de la meme phrase — celle-la ne demande
pas de resister au filtre, elle sort du format ou le filtre s'applique, et
elle donne un critere que le modele peut verifier lui-meme. A tester avec
Gemini, et a consigner ici dans un sens comme dans l'autre ; en cas d'echec,
la conclusion sera que plus aucun texte ne peut rien, pas qu'il faut une
quatrieme formulation.

**Observation du 10 septembre 2026 : Gemini refuse maintenant explicitement**,
en invoquant « la configuration de sécurité du site cirkali.fr ». **Cette
cause est fausse, et c'est verifie** : le `robots.txt` servi en production ne
porte aucun `Disallow` (le bloc « Managed content » de Cloudflare dont parle
son commentaire n'est pas actif), et l'accueil repond 200 a GPTBot, ClaudeBot,
GoogleOther et Google-Extended. Rien cote site ne peut produire ce refus —
troisieme fois que Gemini explique son propre comportement par une cause
inventee, apres le lien Markdown et la longueur du payload. Ne pas partir en
chasse d'une configuration a corriger.

Ce que ca apprend en revanche : l'instruction precedente avait converti « lien
enveloppe » en « rien du tout ». Dire a un modele que ses liens cliquables ne
marchent pas, alors qu'il ne sait produire que ca, lui laisse le refus pour
seule sortie. La formulation actuelle retire donc le lien de la demande — on
demande une ligne de TEXTE dans un bloc de code, et on ajoute un repli (la
chaine seule, ou le JSON) : il faut qu'aucun chemin ne mene a « je ne peux
pas ».

**La conclusion de fond** : tant que l'import exige une URL produite par le
modele, ce canal restera a la merci d'un filtre produit qu'on ne controle pas.
La seule sortie qui ne dependrait plus de Gemini est de pouvoir coller le
payload (la chaine `?s=` seule, ou le JSON) dans l'application — un modele
rend du texte dans un bloc de code sans difficulte, c'est l'URL qui coince.
`decodeAny()` (`ui/share.ts`) sait deja decoder les deux formes ; il manque le
champ ou coller.

**Deux autres pistes explorées puis écartées pour ce même problème, faute de
preuve — ne pas les reprendre sans nouvelle donnée.** Gemini a lui-même
suggéré (1) demander un lien Markdown cliquable `[texte](url)` plutôt qu'une
URL brute, et (2) raccourcir le payload `?s=` pour réduire le risque
d'enveloppe. Aucune des deux ne tient à l'examen : sur (1), le propre test
de Gemini produisait un lien Markdown **et pourtant enveloppé**
(`[Ouvrir…](https://www.google.com/search?q=https://kallly.github.io/…)`)
— l'enveloppe est donc dans l'URL que le modèle écrit lui-même, pas un
rendu ajouté après coup par l'interface, ce qui contredit l'explication que
Gemini donnait pour justifier (1). Sur (2), ce même lien enveloppé faisait
407 caractères après `?s=`, contre 261 pour un lien équivalent non
enveloppé produit plus tôt dans la même conversation — plus long, pas plus
court, et enveloppé quand même. Un LLM qui explique son propre comportement
énonce une hypothèse plausible, pas un fait vérifié : ici, la même réponse
qui proposait le correctif le réfutait elle-même. Raccourcir davantage
`?s=` par des index numériques a de plus un coût architectural réel non
compensé par un bénéfice prouvé : ça fragiliserait les liens déjà partagés
si `LIBRARY` change un jour d'ordre, alors que le format actuel (des clés
textuelles) y est insensible.


## Remplacer les figures batons par autre chose

Quatre pistes explorees sur `dumbbellCalfRaise` (POC hors code, septembre 2026),
toutes mesurees. La reference : **492 o bruts, +111 o brotli** dans une fiche
livree — c'est le cout reel d'une figure inlinee, une fois la compression faite.

**Animation (image + courte video).** Ecartee sur la source, pas sur la
technique : aucune banque d'exercices n'est a la fois libre de redistribution et
complete (wger est en CC-BY-SA avec attribution par fiche, ExerciseDB et
MuscleWiki n'accordent aucun droit), et la video generee par IA produit des
repetitions biomecaniquement fausses de facon **plausible** — donc que personne
ne verifie. La piste restante etait d'animer les figures existantes par
interpolation de poses (SMIL), techniquement bonne, mais elle exigeait
d'ecrire une seconde pose pour les 62 figures. Non retenue faute de besoin
demontre.

**Silhouette pleine (aplat).** 1 204 o bruts, **+346 o brotli — 3,1x la
reference**. Le cout n'est pas la : c'est un **redessin**, pas une conversion.
Cinq iterations ont ete necessaires pour une seule figure, et surtout le passage
a l'aplat rend le point de vue determinant — de face, bras et tronc fusionnent
en une masse et un talon leve est invisible. Il a fallu passer de profil. Les 62
figures ne se convertiraient donc pas, elles se re-concevraient une par une.

**Illustration raster.** 1 361 o en AVIF, 2 448 o en WebP, 5 552 o en PNG. Le
poids n'est **pas** l'argument (une estimation initiale a 200x etait fausse : ca
vaut pour une illustration texturee, pas pour un aplat rasterise, qui est a
12x). Ce qui la disqualifie : le fond est cuit dans les pixels, donc il faut
**deux fichiers par exercice** (un par theme), plus une requete HTTP, et la
figure cesse de suivre `--paper`.

**Epaissir le trait (`stroke-width: 4.5`, bouts ronds).** Gratuit — 0 octet,
0 redessin — et non retenu par choix esthetique : les batons restent des batons.
A noter tout de meme, si la question revient : aucun `stroke-width` n'etait
declare pour les figures, elles etaient rendues a **1 unite** par simple valeur
par defaut du SVG, jamais par decision.

Retenu a la place : trois reglages de lisibilite a geometrie constante — voir la
skill `seance-figures`.
