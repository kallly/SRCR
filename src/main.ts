import './styles/tokens.css';
import './styles/base.css';
import './styles/planner.css';
import './styles/runner.css';

import { detectLocale, setLocale } from './i18n';
import { loadLocale, loadState } from './core/storage';
import { setActiveTenant, tenantSlugFromHost } from './data/tenants';
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
