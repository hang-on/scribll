const CACHE_NAME = 'scribbl-cache-v1.2'; // Increment this on updates

self.addEventListener('install', (e) => {
    console.log('🔧 Installing Service Worker...');
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([
          'index.html',
          'style.css',
          'manifest.json'
        ]);
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
        return response || fetch(e.request);
      })
    );
  });
