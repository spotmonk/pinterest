import firebase from 'firebase/app';
import 'firebase/auth';
import userData from '../../helpers/data/userData';
import utils from '../../helpers/utils';

const checkNewUser = (nameVar, uid) => new Promise((resolve, reject) => {
  userData.getUserByuid(uid).then((response) => {
    const value = utils.responseToArray(response);
    if (value.length === 0) {
      const tempUser = {
        name: nameVar,
        UID: uid,
      };
      userData.addUser(tempUser);
    } else {
      resolve();
    }
  })
    .catch((err) => reject(err));
});

const signIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider).then((response) => {
    checkNewUser(response.user.displayName, response.user.uid);
  }).catch((err) => console.warn('error', err));
};

const switchUser = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  firebase.auth().signInWithPopup(googleProvider).then((response) => {
    checkNewUser(response.user.displayName, response.user.uid);
  }).catch((err) => console.warn('error', err));
};

const logOut = () => {
  firebase.auth().signOut();
};

const getUser = () => firebase.auth().currentUser;

// const addNewUser = () => {

// }

export default {
  signIn,
  logOut,
  getUser,
  switchUser,
  checkNewUser,
};
