import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getCards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/cards.json`)
    .then((response) => {
      const cards = utils.responseToArray(response);
      resolve(cards);
    })
    .catch((err) => reject(err));
});

export default { getCards };
