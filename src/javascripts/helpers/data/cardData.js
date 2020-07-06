import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllCards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/cards.json`)
    .then((response) => {
      const cards = utils.responseToArray(response);
      resolve(cards);
    })
    .catch((err) => reject(err));
});

const getBoardCardsbyBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boardcards.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      resolve(utils.responseToArray(response));
    })
    .catch((err) => reject(err));
});

const unPin = (userCard) => axios.delete(`${baseUrl}/userCards/${userCard}.json`);

export default { getAllCards, getBoardCardsbyBoardId, unPin };
