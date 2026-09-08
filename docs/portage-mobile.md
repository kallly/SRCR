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

**Rien n'a été compilé.** Cette machine n'a ni JDK, ni SDK Android, ni Xcode :
le bundle web et les projets natifs sont vérifiés, le binaire ne l'est pas.

## Prérequis

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

### Android — `public/.well-known/assetlinks.json`

Il faut l'empreinte SHA-256 de la clé qui signe l'application. Avec la
signature par Google Play (recommandée), elle se lit dans la console Play →
Configuration → Intégrité de l'application → certificat de signature.

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "fr.cirkali.app",
      "sha256_cert_fingerprints": ["AA:BB:…:FF"]
    }
  }
]
```

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

`signInWithPopup` **ne peut pas** fonctionner dans l'application, et ce n'est
pas un défaut d'intégration : Google refuse OAuth depuis un WebView embarqué
(`disallowed_useragent`), et le repli par redirection tombe sur le même mur.
En attendant, le bouton est désactivé dans l'application avec sa raison
(`account.nativeUnavailable`), plutôt que de mener à une page d'erreur de
Google.

La réponse est `@capacitor-firebase/authentication`, qui passe par le SDK
Google natif. **Ce n'est délibérément pas fait ici** : le module réclame
`google-services.json` (Android) et `GoogleService-Info.plist` (iOS), tous deux
téléchargés depuis la console Firebase après y avoir déclaré les deux
applications — et sans le premier, le build Gradle **échoue**. Ajouter la
dépendance maintenant aurait laissé la branche dans un état qui ne compile pas.

Dans l'ordre :

1. Console Firebase → Paramètres du projet → ajouter une application Android
   (`fr.cirkali.app`, avec l'empreinte SHA-1 de signature) et une application
   iOS (`fr.cirkali.app`) ; télécharger `google-services.json` vers
   `android/app/` et `GoogleService-Info.plist` vers `ios/App/App/`.
2. `npm i @capacitor-firebase/authentication` puis `npx cap sync`, et suivre
   les instructions Gradle et Info.plist du paquet (dont le *reversed client
   ID* dans `CFBundleURLTypes`).
3. Dans `src/cloud/firebase.ts`, brancher `signIn()` sur le module natif quand
   `isNativeApp()` : le plugin renvoie un jeton d'identité Google, que
   `signInWithCredential(auth, GoogleAuthProvider.credential(idToken))` échange
   contre la même session Firebase que sur le web. Le reste de `src/cloud/`
   n'a rien à savoir de tout ça.
4. Retirer la branche `isNativeApp()` de `src/ui/account.ts` et la clé
   `account.nativeUnavailable` des cinq langues.

Ne pas oublier d'ajouter les domaines de l'application aux **domaines
autorisés** de Firebase Auth, comme pour un sous-domaine de salle.

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
