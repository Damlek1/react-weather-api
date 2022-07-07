const CACHE_NAME = "version-1"
const urlsToCache = ['index.html', 'offline.html']

const self = this
// Install sw
self.addEventListener('install', (event)=> {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            console.log('Opened cache')

            return cache.addAll(urlsToCache)
        })
    )
})

// Listen for requests
self.addEventListener('fetch', (event)=> {
    event.respondWith(
        caches.match(event.request)
        .then(() => {
            return fetch(event.request)
            .catch(()=> caches.match('offline.html'))
        })
    )
})

// Activate the sw
self.addEventListener('activate', (event)=> {
    const cacheWhitelist =[]
    cacheWhitelist.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cachesNames)=> Promise.all(
            cachesNames.map((cachesName) => {
                if(!cacheWhitelist.includes(cachesName)){
                    return caches.delete(cachesName)
                }
            })
        ))
    )
})