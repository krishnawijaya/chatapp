var mainApp = {};

(function () {
  var firebase = appFirebase;

  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      if (window.location.pathname == '/') {
        window.location.replace('/chat');
      }

      if (await checkIfNewUser(user)) {
        newUser(user);
      }

      loading(user);

    } else if (window.location.pathname != "/") {
      window.location.replace('/');
    }
  });

  async function checkIfNewUser(user) {
    var data = null;
    await firebase.database().ref(`users/${user.uid}`).once('value', function (snapshot) {
      data = snapshot.val();
    });
    return (data == null) ?? false;
  }

  function newUser(user) {
    firebase.database().ref(`users/${user.uid}`).set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
    });
  }

  function loading(user) {
    document.getElementById('login-title').innerText = `Hi, ${user.displayName}`;
    document.getElementById('sign-out-container').innerHTML = '<button class="btn btn-primary btn-sm" onclick="mainApp.signOut()">Sign Out</button>';
  }

  function signOut() {
    firebase.auth().signOut().then(function () {
      console.log('Sign out successfully');
    }).catch(function (error) {
      console.log(`Failed to sign out: ${error}`);
    });
  }

  mainApp.signOut = signOut;
})()