const CACHE_NAME = 'deadly-dinos-cache-v8'; // Bump this when you change the app so tablets pick up the new version
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

self.addEventListener('fetch', (event) => {
    // Ignore chrome-extension:// and other non-web requests
    if (!event.request.url.startsWith('http') || event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                // Only cache real files, so pictures added later still show up.
                // (Font files from Google come back "opaque", which is fine to cache.)
                if (!networkResponse.ok && networkResponse.type !== 'opaque') {
                    return networkResponse;
                }
                const copy = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                return networkResponse;
            }).catch(() => {
                // Offline and not saved: opening the app itself still works
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
                return Response.error();
            });
        })
    );
});
