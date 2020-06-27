import firebase from 'firebase/app';

import '../styles/main.scss';
import navbar from './components/navbar/navbar';
import apikeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apikeys.firebaseConfig);
  navbar.startUp();
};

init();
