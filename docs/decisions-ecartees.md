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

