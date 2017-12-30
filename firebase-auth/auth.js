// Initialize Jason's Firebase
var config = {
    apiKey: "AIzaSyDywo8of7_TlZKH_SlysnkRIJlyHSBUds0",
    authDomain: "guzzle-puzzle.firebaseapp.com",
    databaseURL: "https://guzzle-puzzle.firebaseio.com",
    projectId: "guzzle-puzzle",
    storageBucket: "guzzle-puzzle.appspot.com",
    messagingSenderId: "355498500330"
  };
  firebase.initializeApp(config);
  firebase.auth().signInAnonymously().catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
    } else {
        console.error(error);
    }
    });

// var database = firebase.database();

/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        // [START authanon]
        firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/operation-not-allowed') {
            alert('You must enable Anonymous auth in the Firebase Console.');
        } else {
            console.error(error);
        }
        // [END_EXCLUDE]
        });
        // [END authanon]
    }
    document.getElementById('quickstart-sign-in').disabled = true;
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
function initApp() {
// Listening for auth state changes.
// [START authstatelistener]
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
    document.getElementById('quickstart-sign-in').textContent = 'Sign out';
    document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
    // [END_EXCLUDE]
    } else {
    // User is signed out.
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
    document.getElementById('quickstart-sign-in').textContent = 'Sign in';
    document.getElementById('quickstart-account-details').textContent = 'null';
    // [END_EXCLUDE]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
});
// [END authstatelistener]
document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
window.onload = function() {
initApp();
};