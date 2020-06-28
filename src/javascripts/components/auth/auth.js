import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider);
};

const logOut = () => {
  firebase.auth().signOut();
};

const getUser = () => firebase.auth().currentUser;

export default { signIn, logOut, getUser };
