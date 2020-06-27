import firebase from 'firebase/app';
import 'firebase/auth';
import auth from '../components/auth/auth';

const startUp = () => {
  const logInOutButton = $('#navbar-logout-button');
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      logInOutButton.html('<i class="fab fa-google-plus"></i> LOG ME IN!!!');
      logInOutButton.click(auth.signIn);
    } else {
      logInOutButton.html('<i class="fas fa-sign-out-alt"></i>  Logout');
      logInOutButton.click(auth.logOut);
    }
  });
};

export default { startUp };
