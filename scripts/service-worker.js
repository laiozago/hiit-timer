const CACHE_NAME = "hiit-timer-cache-v1";
const urlsToCache = [
    "/",                    // Página inicial
    "/index.html",          // Página principal
    "/manifest.json",       // Manifest do PWA

    // Páginas internas
    "/pages/hiit.html",
    "/pages/results.html",
    "/pages/setHiit.html",

    // CSS
    "/css/reset.css",
    "/css/results.css",
    "/css/setHiit.css",
    "/css/styles.css",

    // JavaScript
    "/scripts/app.js",
    "/scripts/results.js",
    "/scripts/service-worker.js",
    "/scripts/setHiit.js",

    // Ícones do PWA
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-512x512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});