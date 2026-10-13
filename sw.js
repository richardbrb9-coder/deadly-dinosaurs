const CACHE_NAME = 'deadly-dinos-cache-v9'; // Bump this when you change the app so tablets pick up the new version
const CACHE_PREFIX = CACHE_NAME.replace(/\d+$/, ''); // Only delete this app's own old caches: every app on richardbrb9-coder.github.io shares the same cache storage

// The dinosaur list, so every picture can be saved for offline use when the app is installed.
importScripts('dinosaurs.js');

// All addresses are relative, so the app works in a subfolder (e.g. GitHub Pages) as well as at a site's root.
const CORE_FILES = [
    './',
    './index.html',
    './dinosaurs.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];
const DINO_PICTURES = DINO_ROWS.map(([name]) => `./dino-images/${name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.webp`);
const EXTERNAL_FILES = [
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js',
    'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Luckiest+Guy&display=swap'
];

self.addEventListener('install', (event) => {
    self.skipWaiting(); // Force new version to take over immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            await cache.addAll(CORE_FILES); // the app can't work without these, so install fails if they fail
            // Pictures and extras are saved one by one, so a single missing file doesn't stop the install
            await Promise.allSettled([
                ...DINO_PICTURES.map((url) => cache.add(url)),
                ...EXTERNAL_FILES.map((url) => fetch(new Request(url, { mode: 'no-cors' })).then((res) => cache.put(url, res)))
            ]);
        })
    );
});

// Delete this app's old caches so the tablet actually updates (never other apps' caches, see CACHE_PREFIX)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.filter((cache) => cache !== CACHE_NAME && cache.startsWith(CACHE_PREFIX)).map((cache) => caches.delete(cache))
        )).then(() => self.clients.claim())
    );
});

// The page, the dinosaur list and the manifest are checked online first (when there is a connection), so changes
// such as a new install identity reach the tablet straight away. Everything else (pictures, fonts) comes from the
// saved copy first, for speed.
const NETWORK_FIRST = ['index.html', 'dinosaurs.js', 'manifest.json'];
const NETWORK_TIMEOUT_MS = 4000;

function saveCopy(request, response) {
    // Only cache real files, so pictures added later still show up.
    // (Font files from Google come back "opaque", which is fine to cache.)
    if (response.ok || response.type === 'opaque') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
    }
    return response;
}

function networkFirst(request) {
    const fromNetwork = fetch(request, { cache: 'no-cache' }).then((response) => saveCopy(request, response));
    const timeout = new Promise((resolve) => setTimeout(resolve, NETWORK_TIMEOUT_MS));
    const fromCache = () => caches.match(request, { ignoreSearch: true })
        .then((cached) => cached || (request.mode === 'navigate' ? caches.match('./index.html') : undefined));
    // Use the online copy if it arrives in time; otherwise (slow or no connection) use the saved copy
    return Promise.race([fromNetwork.catch(() => undefined), timeout])
        .then((response) => response || fromCache())
        .then((response) => response || fromNetwork)
        .catch(() => Response.error());
}

function cacheFirst(request) {
    return caches.match(request).then((cachedResponse) => cachedResponse || fetch(request)
        .then((response) => saveCopy(request, response))
        .catch(() => Response.error()));
}

self.addEventListener('fetch', (event) => {
    // Ignore chrome-extension:// and other non-web requests
    if (!event.request.url.startsWith('http') || event.request.method !== 'GET') {
        return;
    }
    const url = new URL(event.request.url);
    const isAppFile = url.origin === self.location.origin &&
        (event.request.mode === 'navigate' || NETWORK_FIRST.some((name) => url.pathname.endsWith('/' + name)));
    event.respondWith(isAppFile ? networkFirst(event.request) : cacheFirst(event.request));
});
