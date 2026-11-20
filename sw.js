// Oravis Plan Événement 3D — offline support.
// The app shell, the 3D engine and the fonts (all served from this site, see vendor/) are cached on install,
// so the app works without a connection from the first visit. Bump VERSION on every update to refresh the cache.
const VERSION = 'oravis-3d-20261120171624';
const VENDOR = ['./vendor/fonts/fonts.css', './vendor/fonts/geist-gyByhwUxId8gMEwSGFWNOITddY4.woff2', './vendor/fonts/geist-gyByhwUxId8gMEwcGFWNOITd.woff2', './vendor/fonts/geistmono-or3nQ6H-1_WfwkMZI_qYFrcdmhHkjko.woff2', './vendor/fonts/geistmono-or3nQ6H-1_WfwkMZI_qYFrkdmhHkjkotbA.woff2', './vendor/three/build/three.module.js', './vendor/three/examples/jsm/controls/OrbitControls.js', './vendor/three/examples/jsm/controls/TransformControls.js', './vendor/three/examples/jsm/environments/RoomEnvironment.js', './vendor/three/examples/jsm/postprocessing/EffectComposer.js', './vendor/three/examples/jsm/postprocessing/MaskPass.js', './vendor/three/examples/jsm/postprocessing/OutputPass.js', './vendor/three/examples/jsm/postprocessing/Pass.js', './vendor/three/examples/jsm/postprocessing/RenderPass.js', './vendor/three/examples/jsm/postprocessing/ShaderPass.js', './vendor/three/examples/jsm/postprocessing/UnrealBloomPass.js', './vendor/three/examples/jsm/shaders/CopyShader.js', './vendor/three/examples/jsm/shaders/LuminosityHighPassShader.js', './vendor/three/examples/jsm/shaders/OutputShader.js', './vendor/three/examples/jsm/utils/BufferGeometryUtils.js'];
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', ...VENDOR];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   // everything the app needs is on this site
  // Network first for the page itself (to pick up updates), cache first for everything else.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put('./index.html', copy)); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((r) => {
      if (r.ok || r.type === 'opaque') { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
      return r;
    }))
  );
});
