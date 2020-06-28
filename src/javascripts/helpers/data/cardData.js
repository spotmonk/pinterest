import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getCards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/cards.json`)
    .then((response) => {
      const cardObjects = response.data;
      const cards = [];
      if (cardObjects) {
        Object.keys(cardObjects).forEach((cardId) => {
          cardObjects[cardId].id = cardId;
          cards.push(cardObjects[cardId]);
        });
      }
      resolve(cards);
    })
    .catch((err) => reject(err));
});

export default { getCards };
