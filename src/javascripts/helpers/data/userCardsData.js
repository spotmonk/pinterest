import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getUserCards = () => axios.get(`${baseUrl}/userCards.json`);

const getUserCardsByCardId = (cardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userCards.json?orderBy="cardId"&equalTo="${cardId}"`)
    .then((response) => {
      resolve(utils.responseToArray(response));
    })
    .catch((err) => reject(err));
});

const getUserCardsByUid = (uid) => axios.get(`${baseUrl}/userCards.json?orderBy="uid"&equalTo="${uid}"`);

const getUserCardsBoardId = (boardId) => axios.get(`${baseUrl}/userCards.json?orderBy="boardId"&equalTo="${boardId}"`);

const addUserCard = (UCObject) => axios.post(`${baseUrl}/userCards.json`, UCObject);

const deleteUserCard = (UCId) => axios.delete(`${baseUrl}/userCards/${UCId}.json`);

export default {
  getUserCards,
  getUserCardsByCardId,
  getUserCardsByUid,
  getUserCardsBoardId,
  addUserCard,
  deleteUserCard,
};
