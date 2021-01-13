var globalAuthResult;
(function () {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        globalAuthResult = authResult;
        return true;
      },
    },
    signInFlow: 'popup',
    signInSuccessUrl: '/chat',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      }
    ],
  };

  ui.start('#firebaseui-auth-container', uiConfig)
})()