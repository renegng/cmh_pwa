// NOTE
// Even though this service worker is not on the root of this web application
// It has been configured, through swing_main.py to make it look like it is.

const filesToPreCache = [
    // Web pages
    { url: '/', revision: '2019-10-08-1' },
    { url: '/acercade/', revision: '2019-05-28-1' },
    { url: '/direcciones/', revision: '2019-09-05-1' },
    { url: '/direcciones/googlemaps/', revision: '2019-05-28-1' },
    { url: '/noticias/', revision: '2019-09-19-1' },
    { url: '/politicaprivacidad/', revision: '2019-05-28-1' },
    { url: '/preguntasfrecuentes/', revision: '2019-05-28-1' },
    { url: '/servicios/', revision: '2019-05-28-1' },
    { url: '/servicios/maa/', revision: '2019-05-28-1' },
    { url: '/servicios/mae/', revision: '2019-05-28-1' },
    { url: '/servicios/mai/', revision: '2019-05-28-1' },
    { url: '/servicios/mec/', revision: '2019-05-28-1' },
    { url: '/servicios/mssr/', revision: '2019-05-28-1' },
    { url: '/servicios/mvcm/', revision: '2019-05-28-1' },
    { url: '/terminosdelservicio/', revision: '2019-05-28-1' },
    // Images
    { url: '/static/images/assets/ccm/cmh_choloma.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/assets/ccm/cmh_choloma_02.jpg', revision: '2019-08-26-1' },
    { url: '/static/images/assets/ccm/cmh_kennedy.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/assets/ccm/cmh_kennedy_02.jpg', revision: '2019-08-26-1' },
    { url: '/static/images/assets/ccm/cmh_laceiba.jpg', revision: '2019-07-31-1' },
    { url: '/static/images/assets/ccm/cmh_sanpedrosula.jpg', revision: '2019-07-31-1' },
    { url: '/static/images/assets/ccm/cmh_movil.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/assets/ccm/cmh_movil_02.jpg', revision: '2019-08-26-1' },
    { url: '/static/images/assets/ciudadmujer/cmh_02_bg.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/assets/ciudadmujer/cmh_06_bg.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/assets/ciudadmujer/cmh_13_bg.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/assets/ciudadmujer/cmh_14_bg.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/assets/ciudadmujer/cmh_15_bg.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/assets/placeholders/reminder.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/assets/placeholders/todolists.jpg', revision: '2019-05-28-1' },
    { url: '/static/images/manifest/bid_slogan.png', revision: '2019-05-28-1' },
    { url: '/static/images/manifest/logocmh_con_texto.svg', revision: '2019-05-28-1' },
    { url: '/static/images/manifest/logocmh_gob.svg', revision: '2019-05-28-1' },
    { url: '/static/images/manifest/logocmh_sin_texto.svg', revision: '2019-05-28-1' },
    { url: '/static/images/manifest/portal_unico_transparencia.png', revision: '2019-05-28-1' },
    // Media
    { url: '/static/media/audio/cmh_jingle.mp3', revision: '2019-05-28-1' }
];

// Importing Google's Workbox library for ServiceWorker implementation
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// Workbox Force Set Development/Production Builds 
// Development = debug: true 
// Production = debug: false
workbox.setConfig({ debug: false });

// Configuring Workbox
workbox.core.setCacheNameDetails({
    prefix: 'cmh-pwa',
    suffix: 'v2019-07-23-1',
    precache: 'pre-cache',
    runtime: 'run-time',
    googleAnalytics: 'ga',
});

// Install Event and Pre-Cache
workbox.precaching.precacheAndRoute(filesToPreCache);

// Enable Google Analytics Offline
workbox.googleAnalytics.initialize();

// Cache for Web Fonts.
workbox.routing.registerRoute(
    new RegExp(/.*(?:fonts\.googleapis|fonts\.gstatic|cloudflare)\.com/),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'cmh-pwa-webfonts'
    }),
);

// Cache for CSS and JS
workbox.routing.registerRoute(
    new RegExp(/\.(?:js|css)$/),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'cmh-pwa-css_js',
    })
);

// Cache for Images
workbox.routing.registerRoute(
    new RegExp('\.(?:png|gif|webp|jpg|jpeg|svg)$'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'cmh-pwa-img',
        plugins: [
            new workbox.expiration.Plugin({
                // Keep at most 60 entries.
                maxEntries: 60,
                // Don't keep any entries for more than 30 days.
                maxAgeSeconds: 30 * 24 * 60 * 60,
                // Automatically cleanup if quota is exceeded.
                purgeOnQuotaError: true,
            }),
        ],
    }),
);

// // Push Messages
// self.addEventListener('push', event => {
//     var title = 'Yay a message.';
//     var body = 'We have received a push message.';
//     var icon = '/images/smiley.svg';
//     var tag = 'request';
//     event.waitUntil(
//         self.registration.showNotification(title, {
//             body: body,
//             icon: icon,
//             tag: tag
//         })
//     );
// });
