const CACHE_NAME = "ai-journal-pwa-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./illustrations/doodle-plant.svg",
  "./illustrations/doodle-mug.svg",
  "./illustrations/doodle-heart.svg",
  "./illustrations/doodle-moon.svg",
  "./illustrations/doodle-waves.svg",
  "./illustrations/doodle-books.svg",
  "./illustrations/doodle-calendar.svg",
  "./illustrations/doodle-tv.svg",
  "./illustrations/doodle-hug.svg",
  "./illustrations/doodle-laptop.svg",
  "./illustrations/doodle-walk.svg",
  "./illustrations/doodle-bulb.svg",
  "./illustrations/doodle-chat.svg",
  "./illustrations/doodle-mirror.svg",
  "./illustrations/doodle-sun.svg",
  "./illustrations/doodle-food.svg",
  "./illustrations/doodle-mountain.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-180.png",
  "./screenshots/wide-1280x720.png",
  "./screenshots/narrow-750x1334.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  if (!url.href.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (!response || !response.ok) return response;
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => cached);

      if (cached) {
        event.waitUntil(fetchPromise);
        return cached;
      }
      return fetchPromise;
    })
  );
});
