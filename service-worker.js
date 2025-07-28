const CACHE_NAME = 'scribbl-cache-v1.7'; // Increment this on updates

const ASSETS_TO_CACHE = [
  'index.html',
  'style.css',
  'manifest.json',
  'service-worker.js',
  'icons/192.png',
  'icons/trashcan_512.png'
  // Add any other icons or assets your app uses here
];

self.addEventListener('install', (e) => {
  console.log('🔧 Installing Service Worker...');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Try cache first, then network
      return response || fetch(e.request).catch(() => {
        // Optionally, return a fallback page or asset if offline and not cached
        if (e.request.destination === 'document') {
          return caches.match('index.html');
        }
      });
    })
  );
});
