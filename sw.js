const CACHE_NAME = "madick-cache-v2"; // Mudei para v2 para forçar a limpeza do cache antigo

// Arquivos essenciais do site (precache) - Atualizado com os nomes novos!
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/img/maskable_icon_x192.png",
  "/img/maskable_icon_x512.png",
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

  self.skipWaiting(); // Ativa imediatamente o service worker novo
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

  self.clients.claim(); // Assume o controle da página na hora
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