/*
  Service worker de cirkali.fr.

  Il n'existe que pour une chose : rendre le site utilisable SANS RESEAU une
  fois qu'il a ete ouvert une fois. C'est ce qui manquait pour que « ajouter a
  l'ecran d'accueil » tienne sa promesse — un planificateur de seance s'ouvre
  dans une salle de sport, c'est-a-dire au sous-sol, et l'etat vit deja
  entierement dans le localStorage (voir CLAUDE.md). Le reseau n'etait requis
  que pour telecharger a nouveau des fichiers qui n'avaient pas change.

  Il n'est PAS enregistre dans l'application native : le WebView sert deja ses
  fichiers depuis le binaire, un cache par-dessus n'ajouterait qu'une source
  de peremption (voir la garde de src/main.ts).

  --- Les quatre regles qui le gouvernent ---

  1. Reseau d'abord pour tout ce qui n'est pas hache. Une navigation va
     toujours chercher la version en ligne et ne retombe sur le cache que si
     elle echoue : un deploiement est donc visible au rechargement suivant,
     jamais retenu par ce fichier. C'est la propriete la plus importante ici —
     un service worker qui sert du HTML perime est indetectable depuis le
     serveur, et fige un site pour ses visiteurs les plus fideles.
  2. Cache d'abord pour /assets/ et /fonts/, et pour eux seuls : Vite les
     nomme par empreinte de contenu et `public/_headers` les sert en
     `immutable`. Un nom hache ne peut pas se perimer, donc le cache non plus.
  3. Rien qui ne soit pas a nous. Aucune requete vers une autre origine ne
     passe par ici : ni Firestore, ni Google Fonts, ni la publicite, ni
     l'analytique. Un cache qui s'interpose sur une API cassee est
     indebogable.
  4. Rien d'autre que GET.

  --- Deux consequences a connaitre ---

  Le cache garde les anciens fichiers haches d'un deploiement a l'autre : ce
  sont des orphelins inoffensifs (quelques centaines de Ko), balayes en
  changeant VERSION ci-dessous. Ne changer VERSION que pour ca — a chaque
  deploiement, ce serait perdre le benefice du cache sans rien gagner.

  Pour desinstaller ce service worker si besoin : remplacer le contenu de ce
  fichier par `self.registration.unregister()` et le deployer. Supprimer le
  fichier ne suffirait pas — un service worker deja installe survit a la
  disparition de son URL.
*/

const VERSION = 'v1';
const CACHE = `cirkali-${VERSION}`;

/**
 * Precharge le strict minimum pour que la premiere visite hors ligne
 * fonctionne : la coquille de l'accueil. Le reste (JS, CSS, polices) est mis
 * en cache au vol des qu'il est demande, ce qui evite d'ecrire ici une liste
 * de noms haches qu'aucun code ne pourrait tenir a jour.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(['./', './manifest.webmanifest']))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

function isImmutable(url) {
  return url.pathname.startsWith('/assets/') || url.pathname.startsWith('/fonts/');
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    // `response.ok` seulement : mettre une 404 en cache la figerait, alors
    // que dist/404.html existe precisement pour qu'elle reste une 404.
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Hors ligne sur une adresse jamais visitee : on sert la coquille de
    // l'accueil. Elle sait deja lire un `?s=` dans l'URL courante, donc un
    // lien de partage ouvert hors ligne s'importe quand meme.
    if (request.mode === 'navigate') {
      const shell = await caches.match('./');
      if (shell) return shell;
    }
    throw error;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(isImmutable(url) ? cacheFirst(request) : networkFirst(request));
});
