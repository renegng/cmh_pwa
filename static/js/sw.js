// NOTE
// Even though this service worker is not on the root of this web application
// It has been configured, through swing_main.py to make it look like it is.

const filesToCache = [
    '/',
    '/static/images/assets/ciudadmujer/cmh_02_bg.jpg',
    '/static/images/assets/ciudadmujer/cmh_06_bg.jpg',
    '/static/images/assets/ciudadmujer/cmh_13_bg.jpg',
    '/static/images/assets/ciudadmujer/cmh_14_bg.jpg',
    '/static/images/assets/ciudadmujer/cmh_15_bg.jpg'
];

const staticCacheName = 'generalCache-v1';

// Install Event
self.addEventListener('install', event => {
    console.log('Service Worker Installed! Attempting to cache static assets');
    // Saving into cache for offline usage
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                console.log('Saving assets into cache...');
                cache.addAll(filesToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate Event
self.addEventListener('activate', event => {
    console.log('Service Worker Activated!');
    var cacheWhitelist = [''];
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cacheWhitelist.indexOf(cache) == -1) {
                        console.log('Service Worker: Clearing unwanted caches');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    console.log('Fetch Event initialized for: ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If the request is cached we return the cached response
                if (response) {
                    return response;
                }
                // We clone the request, since the request is only able to be consumed once
                var fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(response => {
                    // Validates if the response is a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    // We clone the response, since is consumable only once and because we
                    // want to store it in the cache and also send it to the browser
                    var response2Cache = response.clone();
                    caches.open(staticCacheName).then(cache => {
                        cache.put(event.request, response2Cache)
                    });

                    return response;
                })
            })
    );
});

self.addEventListener('push', event => {
    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    var icon = '/images/smiley.svg';
    var tag = 'request';
    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
});