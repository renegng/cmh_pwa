// Initialize Firebase
var fbConfig = {
    apiKey: "AIzaSyDNvoxgjHUAwS-mIKtWrttxGItpBL3_tM4",
    authDomain: "cmh-pwa-dev.firebaseapp.com",
    databaseURL: "https://cmh-pwa-dev.firebaseio.com",
    projectId: "cmh-pwa-dev",
    storageBucket: "cmh-pwa-dev.appspot.com",
    messagingSenderId: "817804348000"
};
firebase.initializeApp(fbConfig);

// FirebaseUI config.
var fbUIConfig = {
    signInSuccessUrl: '/home/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url/callback.
    tosUrl: '/terminosdelservicio/',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('/politicaprivacidad/');
    }
};

// Initialize the FirebaseUI Widget using Firebase.
var fbUI = new firebaseui.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
fbUI.start('#firebaseui-auth-container', fbUIConfig);

// Track Auth State
var fbInitApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('sign-in').textContent = 'Sign out';
          document.getElementById('account-details').textContent = JSON.stringify({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData
          }, null, '  ');
        });
      } else {
        // User is signed out.
        document.getElementById('sign-in-status').textContent = 'Signed out';
        document.getElementById('sign-in').textContent = 'Sign in';
        document.getElementById('account-details').textContent = 'null';
      }
    }, function(error) {
      console.log(error);
    });
  };

  window.addEventListener('load', function() {
    fbInitApp()
  });