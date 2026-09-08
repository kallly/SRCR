// CIRKALI — Copyright (c) 2026 Alexis Baudry. Tous droits réservés. Voir LICENSE.

import './styles/tokens.css';
import './styles/base.css';
import './styles/planner.css';
import './styles/runner.css';

import { detectLocale, setLocale } from './i18n';
import { loadLocale, loadState } from './core/storage';
import { setActiveTenant, tenantSlugFromHost } from './data/tenants';
import { isNativeApp } from './platform/native';
import { createApp } from './ui/app';

// Avant tout le reste : la salle decide de ce que la bibliotheque montre et des
// seances proposees (voir data/tenants.ts). Sans salle declaree pour cet hote —
// c'est-a-dire partout aujourd'hui — cet appel ne change rien.
// `data-tenant` d'abord : il n'existe pas encore, mais c'est lui qui primera le
// jour ou une salle aura sa propre page generee au build ; l'hote reste le
// repli, et suffit tant que seules des donnees changent.
setActiveTenant(document.body.dataset['tenant'] ?? tenantSlugFromHost(location.hostname));

const locale = loadLocale(detectLocale());
setLocale(locale);
createApp(loadState()).render();

// Le service worker, pour que le site s'ouvre sans reseau une fois visite —
// une seance se consulte au sous-sol d'une salle de sport, et tout l'etat vit
// deja dans le localStorage. Ce qu'il fait exactement, et comment le
// desinstaller, est documente dans public/sw.js.
//
// Trois gardes, chacune pour une raison distincte :
// - `PROD` : en `npm run dev`, un cache par-dessus le serveur de Vite ne ferait
//   que servir du code qu'on vient de modifier ;
// - `isNativeApp()` : le WebView sert deja ses fichiers depuis le binaire,
//   un cache par-dessus n'ajouterait qu'une source de peremption ;
// - `'serviceWorker' in navigator` : absent en navigation privee sur certains
//   navigateurs, et l'API n'existe pas hors contexte securise.
//
// Enregistre APRES `render()`, et sans `await` : l'installation ne doit
// disputer ni le reseau ni le thread principal au premier affichage.
if (import.meta.env.PROD && !isNativeApp() && 'serviceWorker' in navigator) {
  addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Un enregistrement refuse (contexte non securise, stockage plein,
      // reglage du navigateur) laisse simplement le site tel qu'il etait.
    });
  });
}
