const CACHE_NAME = "madick-cache-v1";

// Arquivos essenciais do site (precache)
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/img/launchericon-192x192.png",
  "/img/launchericon-512x512.png",
  "/img/foto1.jpg",
  "/img/foto2.jpg"
];

// INSTALL - salva arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting(); // ativa imediatamente
});

// ACTIVATE - remove cache antigo
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );

  self.clients.claim(); // assume controle da página
});

// FETCH - estratégia offline-first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se tiver no cache, retorna primeiro
      if (cachedResponse) {
        return cachedResponse;
      }

      // Senão busca na internet
      return fetch(event.request)
        .then((networkResponse) => {
          // salva no cache dinamicamente
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // fallback simples (caso offline total)
          if (event.request.destination === "document") {
            return caches.match("/");
          }
        });
    })
  );
});