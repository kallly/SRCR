import type { CapacitorConfig } from '@capacitor/cli';

/**
 * Emballage natif du site, pour Android et iOS.
 *
 * Capacitor ne reecrit rien : il pose le bundle web tel quel dans un WebView
 * et fournit un pont vers les API natives. C'est ce qui rend le portage
 * possible sans toucher au moteur, au lecteur, a l'i18n ni au stockage — le
 * code source reste celui du site, et `src/platform/native.ts` est le seul
 * endroit qui sache dans lequel des deux mondes il tourne.
 *
 * `webDir` ne pointe PAS sur `dist/` : ce dossier contient les 310 fiches
 * d'exercice, le sitemap, llms.txt, la page 404 et les fichiers de
 * l'hebergeur, tout cela sans usage dans un binaire. `npm run build:app`
 * produit `dist-app/`, qui n'a que l'application (voir scripts/build-app.ts).
 *
 * `androidScheme: 'https'` : le WebView Android sert alors la page depuis
 * `https://localhost` plutot que `http://`. C'est un contexte securise, donc
 * les API qui l'exigent fonctionnent (verrou d'ecran, stockage persistant), et
 * le `localStorage` echappe aux purges reservees aux origines non sures. Ne
 * pas y revenir : changer de schema apres une premiere publication ferait
 * repartir l'app de zero chez tout le monde, l'origine ayant change.
 */
const config: CapacitorConfig = {
  appId: 'fr.cirkali.app',
  appName: 'CIRKALI',
  webDir: 'dist-app',
  android: {
    backgroundColor: '#0e1210',
  },
  ios: {
    backgroundColor: '#0e1210',
    // Le lecteur passe en plein ecran et l'entete se cale deja sous la barre
    // d'etat : c'est le comportement par defaut de Capacitor, pas un reglage.
    contentInset: 'never',
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
