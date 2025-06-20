const cacheName = "DefaultCompany-telegram_app-1.0";
const contentToCache = [
    "Build/build_0.0.27_gzip_astc.loader.js",
    "Build/build_0.0.27_gzip_astc.framework.js.gz",
    "Build/build_0.0.27_gzip_astc.data.gz",
    "Build/build_0.0.27_gzip_astc.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
