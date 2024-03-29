// import AOS from 'aos';
import { MDCFloatingLabel } from '@material/floating-label';
import { MDCIconToggle } from '@material/icon-toggle';
import { MDCLineRipple } from '@material/line-ripple';
import { MDCMenu, Corner } from '@material/menu';
import { MDCNotchedOutline } from '@material/notched-outline';
import { MDCPersistentDrawer, MDCPersistentDrawerFoundation, MDCPermanentDrawer, MDCPermanentDrawerFoundation, MDCTemporaryDrawer, MDCTemporaryDrawerFoundation, util } from '@material/drawer';
import { MDCRipple } from '@material/ripple';
import { MDCSnackbar, MDCSnackbarFoundation } from '@material/snackbar';
import { MDCTab } from '@material/tab';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTabIndicator } from '@material/tab-indicator';
import { MDCTabScroller } from '@material/tab-scroller';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { Workbox } from 'workbox-window/Workbox.mjs';
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

// Material Tab
var mdcTab = null;
var mdcTabBar = null;
var mdcTabIndicator = null;
var mdcTabScroller = null;
if (!isNull(document.querySelector('.mdc-tab-bar'))) {
    mdcTab = new MDCTab(document.querySelector('.mdc-tab'));
    mdcTabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
    mdcTabIndicator = new MDCTabIndicator(document.querySelector('.mdc-tab-indicator'));
    mdcTabScroller = new MDCTabScroller(document.querySelector('.mdc-tab-scroller'));
    document.querySelector('#mdc-tab-bar__id-noticias').addEventListener('MDCTabBar:activated', evt => showTabContent(evt));
}

// Material Floating Labels
var mdcFloatingLabels = [].map.call(document.querySelectorAll('.mdc-floating-label'), function (el) {
    return new MDCFloatingLabel(el);
});

// Material Line Ripples
var mdcLineRipples = [].map.call(document.querySelectorAll('.mdc-line-ripple'), function (el) {
    return new MDCLineRipple(el);
});

// Material Notched Ouline
var mdcNotchedOutlines = [].map.call(document.querySelectorAll('.mdc-notched-outline'), function (el) {
    return new MDCNotchedOutline(el);
});

// Material Textfields
var mdcTextInputs = [].map.call(document.querySelectorAll('.mdc-text-field'), function (el) {
    return new MDCTextField(el);
});

// Material Textfields Helper Text
var mdcTFHelperTexts = [].map.call(document.querySelectorAll('.mdc-text-field-helper-text'), function (el) {
    return new MDCTextFieldHelperText(el);
});

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
            window.location.href(emailShareUrl + shareTitle + " - " + shareMyURL + "&subject=" + shareText + " - " + shareTitle);
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

// Show Tabs Content
function showTabContent(e) {
    var tabId = e.target.id;
    var tabIndex = e.detail.index;
    var tabsContentId = tabId + "-content";
    var tabsContentEl = document.getElementById(tabsContentId);
    Array.from(tabsContentEl.getElementsByClassName('s-article__text')).forEach((elem) => {
        if (elem.tabIndex == tabIndex) {
            elem.classList.remove('s-article__text--hidden');
            elem.classList.add('s-article__text--show');
        } else {
            elem.classList.add('s-article__text--hidden');
            elem.classList.remove('s-article__text--show');
        }
    });
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

            if (secondaryTxt.classList.contains('mdc-list-item__faq-answer-hide')) {
                secondaryTxt.classList.remove('mdc-list-item__faq-answer-hide');
                secondaryTxt.classList.add('mdc-list-item__faq-answer-show');
                collapseIcon.dispatchEvent(new Event('click'));
            } else {
                secondaryTxt.classList.remove('mdc-list-item__faq-answer-show');
                secondaryTxt.classList.add('mdc-list-item__faq-answer-hide');
                collapseIcon.dispatchEvent(new Event('click'));
            }
        });
    });
}

// Login Button
var loginButton = null;
if (!isNull(document.querySelector('#loginButton'))) {
    loginButton = document.querySelector('#loginButton');
}
if (loginButton != null) {
    loginButton.addEventListener('click', () => (window.location.href = '/login'));
}

// Read More Button
if (!isNull(document.querySelector('.mdc-card__action--button'))) {
    Array.from(document.getElementsByClassName('mdc-card__action--button')).forEach((elem) => {
        elem.addEventListener('click', () => {
            var elemId = elem.id;
            var readMoreButtonText = elem.querySelector('.mdc-button__label');
            var readMoreContent = document.getElementById('RMC-' + elemId);

            if (readMoreContent.classList.contains('s-mdc-card__body--hidden')) {
                readMoreContent.classList.remove('s-mdc-card__body--hidden');
                readMoreButtonText.innerHTML = "Leer menos...";
            } else {
                readMoreContent.classList.add('s-mdc-card__body--hidden');
                readMoreButtonText.innerHTML = "Leer más...";
            }
        });
    });
}

// Image List Open Image
if (!isNull(document.querySelector('.s-mdc-image-list__image'))) {
    Array.from(document.getElementsByClassName('s-mdc-image-list__image')).forEach((elem) => {
        elem.addEventListener('click', () => (window.open(elem.getAttribute('src'))));
    });
}

// Registering the service worker for the pwa
// NOTE
// Even though this service worker is not on the root of this web application
// It has been configured, through swing_main.py to make it look like it is.

if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js', { scope: '/' });
    // Detects an update for the app's content and prompts user to refresh
    wb.addEventListener('installed', event => {
        if (event.isUpdate) {
            console.log('App update found...');
            snackbar.show(updateSBDataObj);
        }
    });
    // Registers the Workbox Service Worker
    wb.register();
}

// Add to Homescreen (A2H) Event
var deferredPrompt;
var appIsInstalled = false;

// Snackbar A2H Data for Install Event
var installSBDataObj = {
    message: '¿Deseas Instalar nuestra App? (¡Gratis!)',
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

// Snackbar Data for Update Website Event
var updateSBDataObj = {
    message: '¡Nuevo contenido disponible!. Click OK para actualizar.',
    actionText: 'OK',
    timeout: 20000,
    actionHandler: () => {
        console.log('Updating app...');
        // Refresh the app
        window.location.reload();
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
