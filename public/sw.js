const CACHE = 'beb-lhouma-v1'
const CORE = ['/', '/index.html', '/manifest.webmanifest', '/images/logo_restaurant.png', '/icons/pwa-192.png', '/icons/pwa-512.png', '/images/menu/tacos.png', '/images/menu/baguette.png', '/images/menu/sandwich.png', '/images/menu/libanais1.png', '/images/menu/pizza1.png', '/images/menu/pizza_tranche.png']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))))
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => {
      const copy = response.clone()
      caches.open(CACHE).then((cache) => cache.put('/index.html', copy))
      return response
    }).catch(() => caches.match('/index.html')))
    return
  }
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok) {
      const copy = response.clone()
      caches.open(CACHE).then((cache) => cache.put(request, copy))
    }
    return response
  })))
})
