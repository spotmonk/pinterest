import firebase from 'firebase/app';
import 'firebase/auth';
import auth from '../auth/auth';
import body from '../body/body';

const startUp = () => {
  const logInButton = $('#navbar-login-button');
  const logOutButton = $('#navbar-logout-button');
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      logInButton.removeClass('hide');
      logOutButton.addClass('hide');
    } else {
      logInButton.addClass('hide');
      logOutButton.removeClass('hide');
    }
    logInButton.click(auth.signIn);
    logOutButton.click(auth.logOut);
    body.bodyStart();
  });
};

export default { startUp };
