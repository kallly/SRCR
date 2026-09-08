# Portage mobile (Android et iOS)

CIRKALI tourne dans une application native **sans réécriture** : Capacitor pose
le bundle web tel quel dans un `WebView` et fournit un pont vers les API du
système. Le moteur, le lecteur, l'i18n et le stockage sont exactement ceux du
site — c'est le même code source, et `src/platform/native.ts` est le seul
endroit qui sache dans lequel des deux mondes il tourne.

Ce fichier est la marche à suivre pour finir le portage et publier. Le
raisonnement (pourquoi Capacitor, pourquoi un seul bundle, ce qui a dû changer
dans l'app) vit dans `CLAUDE.md`, section « Le portage mobile ».

## Ce qui est fait

- `capacitor.config.ts`, et les projets natifs `android/` et `ios/` générés.
- `npm run build:app` → `dist-app/`, le bundle embarqué : ni publicité, ni
  analytique web, ni les 317 pages générées. Le script échoue s'il en trouve.
- Icônes et écrans de lancement dans les deux projets, dérivés de
  `resources/icon.png` et `resources/splash.png`.
- Les liens de partage, les liens vers les fiches et le lien de
  confidentialité, qui pointaient vers `location.origin` — donc vers
  `https://localhost` dans un binaire.
- Le pont de liens profonds côté application (`src/platform/deep-links.ts`).
- Le message d'avertissement de stockage, qui ne s'affiche plus à tort.

## Ce qui n'est pas fait, et ne peut pas l'être depuis ce dépôt

Trois choses réclament des identifiants qui n'existent qu'une fois
l'application signée et déclarée dans les consoles. Elles sont détaillées
plus bas :

1. les deux fichiers d'association de domaine, sans lesquels un lien
   `cirkali.fr` continue d'ouvrir le navigateur ;
2. la connexion Google, aujourd'hui désactivée dans l'application avec sa
   raison affichée ;
3. la publication elle-même.

**Rien n'est compilé sur cette machine** — elle n'a ni JDK, ni SDK Android, ni
Xcode. C'est la CI qui s'en charge : voir « Compiler sans machine de
compilation » plus bas.

## Compiler sans machine de compilation

`.github/workflows/mobile.yml` compile les deux plateformes à chaque push sur
`portage-mobile` et sur `main`. Le dépôt étant **public**, les minutes sont
gratuites sur `ubuntu-latest` comme sur `macos-latest` — ces derniers sont
facturés 10× sur un dépôt privé, et c'est ce qui rend la compilation iOS
gratuite ici.

Ce que chaque job prouve n'est pas la même chose :

- **Android** produit un **APK de débogage en artefact**, qui s'installe
  réellement sur un téléphone. C'est le seul test de bout en bout disponible
  sans compte de magasin — récupérable dans l'onglet Actions, ou avec
  `gh run download`.
- **iOS** prouve seulement que le projet **compile**. Sans identité de
  signature il n'y a ni `.ipa`, ni installation sur un appareil, ni
  TestFlight : tout cela est derrière le compte développeur Apple. Une
  compilation simulateur attrape quand même l'essentiel — un plugin mal
  synchronisé, un `Package.swift` cassé, un `Info.plist` invalide.

**La clé de débogage est versionnée** (`android/debug.keystore`), et ce n'est
pas un relâchement. Par défaut Gradle signe l'APK de débogage avec
`~/.android/debug.keystore`, qu'il fabrique lui-même s'il manque : sur un
runner qui part d'une machine neuve, il en fabrique donc **une nouvelle à
chaque build**, et Android refuse d'installer le nouvel APK par-dessus
l'ancien — « conflit avec la version précédente ». Il fallait désinstaller
entre chaque essai, en perdant les séances de test. Les identifiants
(`android` / `androiddebugkey`) sont ceux qu'Android publie pour toutes les
clés de débogage du monde, et un APK de débogage ne se distribue pas.

**Elle ne sert jamais à publier.** La clé de release se crée au moment du Play
Store, ne se versionne pas, et c'est *son* empreinte SHA-256 qui ira dans
`assetlinks.json`.

Deux détails qui expliquent la forme du fichier : le job tourne en **Node 22**
là où `deploy.yml` est en 20 (la CLI Capacitor refuse en dessous), et la
compilation iOS passe par `-target` et non `-scheme`, parce qu'Xcode ne crée le
schéma qu'à la première ouverture du projet et le range dans `xcuserdata/`,
qui n'est pas versionné.

## Prérequis pour travailler en local

La CI suffit pour vérifier que ça compile. Pour déboguer sur un appareil, ou
pour publier :

| Pour | Il faut |
|---|---|
| La CLI Capacitor | **Node ≥ 22** — le reste du dépôt tourne en Node 18, mais `npx cap` refuse de démarrer en dessous |
| Android | JDK 21 et Android Studio (SDK 36) |
| iOS | **un Mac** avec Xcode. Aucun contournement : la chaîne de compilation d'Apple n'existe que sur macOS |

## Commandes

```bash
npm run build:app    # construit dist-app/ (sans pub, sans analytique, sans fiches)
npm run app:sync     # build:app + cap sync (copie le bundle dans les 2 projets)
npm run app:android  # + ouvre Android Studio
npm run app:ios      # + ouvre Xcode
```

`cap sync` est à relancer après **chaque** modification du code web : les
projets natifs portent une copie du bundle, pas un lien vers lui.

## 1. Liens profonds : faire qu'un lien de partage ouvre l'application

C'est la seule chose qui manque pour que l'application soit fonctionnellement
complète. Sans elle, un lien `https://cirkali.fr/?s=…` ouvre le navigateur,
donc importe la séance dans **le site** et pas dans l'application, qui a son
propre stockage : la personne voit le lien « marcher » et sa séance n'arrive
nulle part.

Le code applicatif est déjà en place (`src/platform/deep-links.ts`), ainsi que
les déclarations natives (`android/app/src/main/AndroidManifest.xml`,
`ios/App/App/App.entitlements`). Il manque les deux fichiers que **cirkali.fr**
doit publier pour reconnaître l'application.

### Android — fait, mais inerte jusqu'au déploiement

`public/.well-known/assetlinks.json` déclare l'empreinte **SHA-256** de
`android/debug.keystore`, et le job Android refuse de compiler si les deux
divergent — Android échoue la vérification **en silence**, sans erreur nulle
part, et les liens se contentent de continuer d'ouvrir le navigateur.

**Rien ne change tant que le fichier n'est pas servi par cirkali.fr.** C'est le
site qui autorise l'application, jamais l'inverse : tant que la branche n'est
pas fusionnée et déployée, `https://cirkali.fr/.well-known/assetlinks.json`
répond 404 et Android n'a personne à croire.

Pour tester **avant** de déployer : Réglages → Applications → CIRKALI → Ouvrir
par défaut → Ajouter un lien, et cocher cirkali.fr. C'est l'échappatoire
manuelle qu'Android laisse quand la vérification automatique échoue.

Le jour du Play Store, ajouter l'empreinte SHA-256 de la clé de release dans
le même tableau `sha256_cert_fingerprints` — il en accepte plusieurs — et
retirer celle de débogage, dont le keystore est public.

### iOS — `public/.well-known/apple-app-site-association`

**Sans extension `.json`**, et servi en `application/json`. Il faut
l'identifiant d'équipe Apple (console développeur → Membership).

```json
{
  "applinks": {
    "details": [{ "appID": "TEAMID.fr.cirkali.app", "paths": ["/*"] }]
  }
}
```

Côté Xcode, il reste à rattacher `App.entitlements` à la cible : Signing &
Capabilities → + Capability → Associated Domains. Le `.pbxproj` ne le référence
pas — il n'y avait pas de raison de l'éditer à la main depuis une machine sans
Xcode.

Vérifier ensuite que `public/_headers` sert bien ces deux fichiers, et que
`public/robots.txt` ne bloque pas `/.well-known/`.

## 2. Connexion Google

**Branchée**, via `@capacitor-firebase/authentication`. `signInWithPopup` ne
peut pas fonctionner dans une application — Google refuse OAuth depuis un
WebView embarqué (`disallowed_useragent`), redirection comprise — donc le
module natif ouvre la vraie feuille de connexion du système et ne rend qu'un
jeton d'identité, que `src/cloud/firebase.ts` échange contre une session du
SDK JavaScript.

**`skipNativeAuth: true` est le réglage qui décide de tout** (voir
`capacitor.config.ts`). Tout `src/cloud/` parle à Firestore par le SDK
JavaScript, et c'est l'état d'authentification de *celui-là* que les règles
Firestore voient. À `false`, l'application « se connecterait » sans pouvoir
lire ni écrire quoi que ce soit. À `true`, c'est le même compte, le même uid
et le même document que sur cirkali.fr : une séance créée sur le site apparaît
dans l'application, et `cloud/merge.ts` n'a rien eu à apprendre.

### Il reste une chose, côté iOS

**`GoogleService-Info.plist`.** Toujours manquant. Il va dans
`ios/App/App/`, et son *reversed client ID* doit être ajouté aux
`CFBundleURLTypes` d'`Info.plist` — c'est le schéma d'URL par lequel Google
rend la main à l'application. Sans les deux, la connexion échoue sur iOS
seulement ; Android fonctionne.

### L'empreinte de signature, et le piège qu'elle tend

Android est en place : `google-services.json` porte un client OAuth de type 1
lié à l'empreinte SHA-1 de `android/debug.keystore`.

Le piège est que rien ne casse à la compilation si les deux divergent — c'est
la connexion qui échoue à l'exécution, par un `DEVELOPER_ERROR` (code 10) qui
ne dit pas un mot de sa cause. Le job Android **compare donc les deux avant de
compiler** et refuse de produire un APK qui échouerait à se connecter.

Le jour du Play Store, ajouter l'empreinte de la clé de release à côté de
celle-ci dans la console — Firebase en accepte plusieurs — puis re-télécharger
`google-services.json`.

### Ce que ça a changé côté raisonnement

L'invariant « le SDK Firebase n'est pas téléchargé sans compte » ne vaut plus
dans l'application : le module natif est dans le binaire quoi qu'il arrive. Il
reste vrai sur le web, où c'est un coût de réseau — dans un binaire déjà
installé, ce n'en est plus un.

Ne pas suivre les instructions Gradle génériques de la console Firebase : le
`classpath com.google.gms:google-services` est **déjà** dans
`android/build.gradle`, et `android/app/build.gradle` applique le plugin tout
seul dès que `google-services.json` existe. Elles proposent aussi
`firebase-analytics`, qui n'a rien à faire ici — le projet ne charge
délibérément pas Analytics (voir `CONFIG` dans `src/cloud/firebase.ts`), et
c'est justement ce qu'on retire du bundle applicatif pour ne pas avoir à
déclarer un traqueur au questionnaire de confidentialité de l'App Store.

## 3. Publication

- **Comptes** : 25 $ une fois pour Google Play, 99 $/an pour Apple.
- **Apple, règle 4.2 « minimum functionality »** : un site simplement
  ré-empaqueté se fait refuser. CIRKALI a de quoi répondre — chrono, verrou
  d'écran, son, fonctionnement hors ligne, aucun compte requis — mais il faut
  que ça ne ressemble pas à un navigateur : pas de barre d'adresse (c'est déjà
  le cas), écran de lancement natif (fait), et l'application doit s'ouvrir
  **hors ligne**, ce que le stockage local garantit déjà.
- **Politique de confidentialité** : les deux magasins en exigent l'URL.
  `https://cirkali.fr/confidentialite/fr` existe déjà. Elle décrit la collecte
  des exercices personnalisés, qui continue de s'appliquer dans l'application.
- **Questionnaire de confidentialité (App Store) et fiche Play** : à remplir en
  cohérence avec ce que l'application fait *réellement*. C'est précisément
  pourquoi l'analytique web n'est pas embarquée — voir `stripWebOnly()` dans
  `vite.config.ts`.
- **Publicité** : AdSense est interdit dans un WebView d'application. Le
  bundle applicatif n'en contient pas une ligne, et le portillon sortirait de
  toute façon s'il s'y découvrait. Monétiser l'application demanderait AdMob,
  qui est un autre SDK et une autre intégration.

## Régénérer les icônes et l'écran de lancement

Les sources sont `resources/icon.png` (1024×1024) et `resources/splash.png` /
`splash-dark.png` (2732×2732), dessinées d'après `public/favicon.svg`. Comme
`public/og-image.png`, ce sont des images générées une fois puis versionnées :
il n'y a pas de rastériseur SVG dans la chaîne de build.

```bash
npx @capacitor/assets generate \
  --iconBackgroundColor '#0e1210' --iconBackgroundColorDark '#0e1210' \
  --splashBackgroundColor '#0e1210' --splashBackgroundColorDark '#0e1210'
```

**Deux dégâts collatéraux à réparer après coup**, l'outil se croyant seul
maître du manifeste web :

- il écrit un dossier `icons/` à la racine — le supprimer ;
- il **réécrit `public/manifest.webmanifest`** pour y pointer ses propres
  `.webp` en `../icons/`, ce qui casse les icônes du site. Restaurer le
  fichier (`git checkout -- public/manifest.webmanifest`). L'assertion « les
  icônes du manifeste existent dans dist/ » de `check-build.ts` attrape
  l'oubli — c'est exactement le cas pour lequel elle a été écrite.
