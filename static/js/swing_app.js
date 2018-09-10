import AOS from 'aos';
import { MDCIconToggle } from '@material/icon-toggle';
import { MDCMenu, Corner } from '@material/menu';
import { MDCPersistentDrawer, MDCPersistentDrawerFoundation, MDCPermanentDrawer, MDCPermanentDrawerFoundation, MDCTemporaryDrawer, MDCTemporaryDrawerFoundation, util } from '@material/drawer';
import { MDCRipple } from '@material/ripple';
import { MDCSnackbar, MDCSnackbarFoundation } from '@material/snackbar';
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { isNull } from 'util';

// Initialize AOS
// AOS.init();

// Material Icon Toggle
Array.from(document.getElementsByClassName('mdc-icon-toggle')).forEach((elem) => {
    MDCIconToggle.attachTo(elem);
});

// Material Drawer
var drawer = null;
if (!isNull(document.querySelector('.mdc-drawer--persistent'))) {
    drawer = new MDCPersistentDrawer(document.querySelector('.mdc-drawer--persistent'));
} else if (!isNull(document.querySelector('.mdc-drawer--temporary'))) {
    drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-drawer--temporary'));
} else if (!isNull(document.querySelector('.mdc-drawer--permanent'))) {
    drawer = new MDCPermanentDrawer(document.querySelector('.mdc-drawer--permanent'));
}
if (drawer != null) {
    document.querySelector('.menu').addEventListener('click', () => (drawer.open ? drawer.open = false : drawer.open = true));

    // Setting a drawer menu item as activated
    var menuURL = null;
    var myURL = location.pathname;

    var drawerItems = document.querySelector('.mdc-drawer__content');
    Array.from(drawerItems.children).forEach((child, index) => {
        menuURL = child.getAttribute('href');
        if (menuURL != null && menuURL == myURL) {
            child.classList.add("mdc-list-item--activated");
        }
    });
}

// Material Menu
var shareMenu = null;
var shareMenuButton = null;
if (!isNull(document.querySelector('#shareMenu'))) {
    shareMenu = new MDCMenu(document.querySelector('#shareMenu'));
    shareMenuButton = document.querySelector('#shareButton');
}
if (shareMenuButton != null) {
    shareMenuButton.addEventListener('click', () => (shareMenu.open = !shareMenu.open));
    shareMenu.setAnchorCorner(Corner.BOTTOM_START);
    document.querySelector('#shareMenu').addEventListener('MDCMenu:selected', evt => shareRedirect(evt));
}

// Material Ripple
var shareButtonRipple = null;
var loginButtonRipple = null;
var floatingButtonRipple = null;
if (!isNull(document.querySelector('#shareButton').classList.contains('#topAppBar-button'))) {
    //shareButtonRipple = new MDCRipple(document.querySelector('#shareButton'));
}
if (!isNull(document.querySelector('#loginButton'))) {
    loginButtonRipple = new MDCRipple(document.querySelector('#loginButton'));
}
if (!isNull(document.querySelector('#floatingButton'))) {
    floatingButtonRipple = new MDCRipple(document.querySelector('#floatingButton'));
}

// Material Snackbar
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));

// Material Top-app-bar
var topAppBar = null;
if (!isNull(document.querySelector('.mdc-top-app-bar'))) {
    topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
}

// Social Media Share Redirect
// Applications URLs
const emailShareUrl = "mailto:?body=";
const facebookShareUrl = "https://www.facebook.com/sharer/sharer.php?u=";
const googlePlusShareURL = "https://plus.google.com/share?url=";
const linkedInShareURL = "https://www.linkedin.com/shareArticle?mini=true&url=";
const twitterShareURL = "https://twitter.com/share?ref_src=twsrc%5Etfw&text=";
const whatsAppShareURL = "https://wa.me/?text=";

function shareRedirect(e) {
    // Default text of the share message
    var shareText = "¡Mira lo que encontré!";
    shareText = encodeURIComponent(shareText);

    // Share parameters
    var shareMyURL = location.href;
    shareMyURL = encodeURIComponent(shareMyURL);

    var shareTitle = document.title;
    shareTitle = encodeURIComponent(shareTitle);

    // Open a new window to share the content
    var shareAppName = e.detail.item.lastChild.textContent;
    shareAppName = shareAppName.toLowerCase().trim();

    switch (shareAppName) {
        case 'email':
            window.open(emailShareUrl + shareTitle + " - " + shareMyURL + "&subject=" + shareText + " - " + shareTitle);
            break;
        case 'facebook':
            window.open(facebookShareUrl + shareMyURL);
            break;
        case 'google+':
            window.open(googlePlusShareURL + shareMyURL);
            break;
        case 'linkedin':
            window.open(linkedInShareURL + shareMyURL + "&title=" + shareTitle);
            break;
        case 'twitter':
            window.open(twitterShareURL + shareText + " - " + shareTitle + ": " + shareMyURL);
            break;
        case 'whatsapp':
            window.open(whatsAppShareURL + shareText + " - " + shareTitle + ": " + shareMyURL);
            break;
        default:
            console.log("No implementation for SHARING to app named: " + shareAppName);
    }
}

// Audio playback
var playAudioButton = null;
if (!isNull(document.querySelector('.fab__playbutton'))) {
    playAudioButton = document.querySelector('.fab__playbutton');
    playAudioButton.addEventListener('MDCIconToggle:change', ({ detail }) => playAudio(detail));
}

function playAudio(detail) {
    var audio = document.getElementById('cmh-jingle');

    if (detail.isOn) {
        audio.play();
    } else {
        audio.pause();
    }

    audio.onended = () => { playAudioButton.click() };
}

// Landing Page Image Carousel
var landPageImgCarCont = null;
if (!isNull(document.querySelector('#landing-img-carousel'))) {
    landPageImgCarCont = document.querySelector('#landing-img-carousel');
    setInterval(() => {
        landingPageImgCarousel(landPageImgCarCont);
    }, 7500);
}

var lpic = 1;
function landingPageImgCarousel(container) {
    var backgroundImgs = [
        "../static/images/assets/ciudadmujer/cmh_02_bg.jpg",
        "../static/images/assets/ciudadmujer/cmh_06_bg.jpg",
        "../static/images/assets/ciudadmujer/cmh_13_bg.jpg",
        "../static/images/assets/ciudadmujer/cmh_14_bg.jpg",
        "../static/images/assets/ciudadmujer/cmh_15_bg.jpg",
    ];
    container.classList.remove('img-transition-fadein');
    // Forces re-orientation of the container, which forces re-animation
    void container.offsetWidth;

    container.style.backgroundImage = 'url("' + backgroundImgs[Math.floor(lpic % backgroundImgs.length)] + '")';
    container.classList.add('img-transition-fadein');
    lpic++;
}

// Google Maps component
if (!isNull(document.querySelector('.s-googlemaps'))) {
    var gmComp = document.querySelector('.s-googlemaps');
    var gmURLL = 'https://www.google.com/maps?output=embed&daddr=ciudad+mujer&saddr=';
    var gmIfrS = "<iframe src='";
    var gmIfrE = "' class='s-googlemaps__iframe' frameborder='0' style='border:0;' allowfullscreen></iframe>";
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            gmComp.innerHTML = "";
            gmComp.innerHTML = gmIfrS + gmURLL + pos.lat + ',' + pos.lng + gmIfrE;
        }, () => {
            console.log('User denied access to location');
        });
    } else {
        // Browser doesn't support Geolocation
        console.log('Your browser does not support Geolocation');
    }
}

// FAQ Material List behaviour
if (!isNull(document.querySelector('.mdc-list-item__collapse'))) {
    Array.from(document.getElementsByClassName('mdc-list-item__collapse')).forEach((elem) => {
        elem.addEventListener('click', () => {
            var secondaryTxt = elem.querySelector('.mdc-list-item__secondary-text');
            var collapseIcon = elem.querySelector('.mdc-list-item__meta');
            console.log(collapseIcon);

            if (secondaryTxt.classList.contains('mdc-list-item__faq-answer-hide')) {
                secondaryTxt.classList.remove('mdc-list-item__faq-answer-hide');
                secondaryTxt.classList.add('mdc-list-item__faq-answer-show');
            } else {
                secondaryTxt.classList.remove('mdc-list-item__faq-answer-show');
                secondaryTxt.classList.add('mdc-list-item__faq-answer-hide');
            }
        });
    });
}

// Registering the service worker for the pwa
// NOTE
// Even though this service worker is not on the root of this web application
// It has been configured, through swing_main.py to make it look like it is.

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js', { scope: '/' })
//         .then(reg => {
//             // registration worked
//             console.log('Service Worker Registered. Scope is ' + reg.scope);
//         }).catch(error => {
//             // registration failed
//             console.log('Service Worker Registration Failed with ' + error);
//         });
// }


// Add to Homescreen (A2H) Event
var deferredPrompt;
var appIsInstalled = false;

var installSBDataObj = {
    message: '¿Deseas Instalar la App?',
    actionText: 'Si',
    timeout: 20000,
    actionHandler: () => {
        console.log('Installing app (A2H)...');
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user action
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2H prompt');
                    appIsInstalled = true;
                } else {
                    console.log('User dismissed the A2H prompt');
                }
                deferredPrompt = null;
            });
    }
};

window.addEventListener('appinstalled', (evt) => {
    console.log('App is installed...');
    appIsInstalled = true;
});

window.addEventListener('beforeinstallprompt', (e) => {
    console.log('Prompting to install app...');
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show the Snackbar popup to Install
    if (!appIsInstalled) {
        snackbar.show(installSBDataObj);
    }
});
