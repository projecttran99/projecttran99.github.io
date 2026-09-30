/**
 * ==============================================================================
 * Tran99.com - Modern SEO & PWA Service Worker
 * Architecture: NetworkFirst (HTML/Pages) & StaleWhileRevalidate (Static Assets)
 * Platform: Google AMP HTML & Adarent CMS (klikada.com)
 * ==============================================================================
 */

const CACHE_NAME = 'tran99-cache-v3';
const OFFLINE_FALLBACK_URL = '/';

const PRECACHE_ASSETS = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/static/rental-mobil-surabaya-tran99-logo.png',
  '/static/rental-mobil-surabaya.jpg'
];

// Install: Pre-cache essential app shell assets and activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Precache skipped non-critical resource:', err);
      });
    })
  );
});

// Activate: Purge obsolete legacy Workbox caches and claim active clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Modern caching strategy prioritizing fresh content for SEO & Googlebot
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // 1. Never intercept non-GET requests or CMS Dashboard routes (/admin/)
  if (request.method !== 'GET' || url.pathname.startsWith('/admin')) {
    return;
  }

  // 2. Navigation / HTML Requests: NetworkFirst
  // Guarantees Googlebot and visitors always receive the freshest SEO content, new blog posts, and live prices.
  if (request.mode === 'navigate' || (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return caches.match(OFFLINE_FALLBACK_URL);
          });
        })
    );
    return;
  }

  // 3. Static Media & Assets: StaleWhileRevalidate
  // Instant rendering for cached photos and static resources while validating freshness in background.
  const isStaticResource = (
    url.pathname.startsWith('/photos/') ||
    url.pathname.startsWith('/static/') ||
    url.pathname.startsWith('/images/') ||
    url.hostname === 'cdn.ampproject.org' ||
    request.destination === 'image' ||
    request.destination === 'style' ||
    request.destination === 'font'
  );

  if (isStaticResource) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const networkFetch = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || networkFetch;
      })
    );
    return;
  }

  // 4. Default Fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
