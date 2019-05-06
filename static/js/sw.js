// NOTE
// Even though this service worker is not on the root of this web application
// It has been configured, through swing_main.py to make it look like it is.

const filesToCache = [
    // Web pages
    '/',
    '/acercade/',
    '/direcciones/',
    '/direcciones/googlemaps/',
    '/noticias/',
    '/politicaprivacidad/',
    '/preguntasfrecuentes/',
    '/servicios/',
    '/servicios/maa/',
    '/servicios/mae/',
    '/servicios/mai/',
    '/servicios/mec/',
    '/servicios/mssr/',
    '/servicios/mvcm/',
    '/terminosdeuso/',
    // Web assets
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    // Images
    '/static/images/assets/ccm/cmh_choloma.jpg',
    '/static/images/assets/ccm/cmh_kennedy.jpg',
    '/static/images/assets/ccm/cmh_movil.jpg',
    '/static/images/assets/ciudadmujer/cmh_02_bg.jpg',
    '/static/images/assets/ciudadmujer/cmh_06_bg.jpg',
    '/static/images/assets/ciudadmujer/cmh_13_bg.jpg',
    '/static/images/assets/ciudadmujer/cmh_14_bg.jpg',
    '/static/images/assets/ciudadmujer/cmh_15_bg.jpg',
    '/static/images/assets/placeholders/reminder.jpg',
    '/static/images/assets/placeholders/todolists.jpg',
    '/static/images/manifest/bid_slogan.png',
    '/static/images/manifest/logocmh_con_texto.svg',
    '/static/images/manifest/logocmh_gob.svg',
    '/static/images/manifest/logocmh_sin_texto.svg',
    '/static/images/manifest/portal_unico_transparencia.png',
    // Media
    '/static/media/audio/cmh_jingle.mp3'
];

const genCacheName = 'cmhpwaGenCache-v2019-05-05-01';

// Install Event
self.addEventListener('install', event => {
    console.log('Service Worker Installed! Attempting to cache static assets');
    // Saving into cache for offline usage
    event.waitUntil(
        caches.open(genCacheName)
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
    var cacheWhitelist = [genCacheName];
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
    //console.log('Fetch Event initialized for: ', event.request.url);
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
                    caches.open(genCacheName).then(cache => {
                        cache.put(event.request, response2Cache)
                    });

                    return response;
                })
            })
    );
});

// Push Messages
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
