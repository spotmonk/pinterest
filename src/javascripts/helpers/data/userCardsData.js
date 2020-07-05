import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoardCards = () => axios.get(`${baseUrl}/userCards.json`);

const getUserCardsByCardId = (cardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userCards.json?orderBy="cardId"&equalTo="${cardId}"`)
    .then((response) => {
      resolve(utils.responseToArray(response));
    })
    .catch((err) => reject(err));
});
export default { getBoardCards, getUserCardsByCardId };
