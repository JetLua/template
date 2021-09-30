/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

/**
 * @type {ServiceWorkerGlobalScope}
 */
const sw = self

sw.addEventListener('fetch', async e =>  {
  e.respondWith(fetch(e.request).then(async res => {
    if (res.status !== 200) return Promise.reject(new Error(res.statusText))
    caches.open('store').then(cache => cache.add(e.request, res))
    return res.clone()
  }).catch(err => {
    return caches.match(e.request).then(res => {
      if (res) return res
      return new Response(JSON.stringify({ok: false, err: err.message}), {status: 200})
    })
  }))
})

sw.addEventListener('install', () => {
  sw.skipWaiting()
})
