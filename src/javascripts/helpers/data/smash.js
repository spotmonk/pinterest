import boardData from './boardData';
import utils from '../utils';
import cardData from './cardData';
import auth from '../../components/auth/auth';
import userCardsData from './userCardsData';

const cardsByBoardCategory = (category) => new Promise((resolve, reject) => {
  boardData.getBoardByCategory(category)
    .then((response) => {
      const boards = utils.responseToArray(response);
      boards[0].cards = [];
      cardData.getBoardCardsbyBoardId(boards[0].boardId).then((boardCardArr) => {
        cardData.getAllCards().then((allCards) => {
          boardCardArr.forEach((boardCard) => {
            const card = allCards.find((c) => c.cardId === boardCard.cardId);
            boards[0].cards.push(card);
          });
          resolve(boards);
        });
      });
    })
    .catch((err) => reject(err));
});

const getCardsByUser = () => new Promise((resolve, reject) => {
  userCardsData.getBoardCards().then((alluserCards) => {
    const allUCArray = utils.responseToArray(alluserCards);
    const usercards = [];
    allUCArray.forEach((UC) => {
      if (UC.uid === auth.getUser().uid) {
        usercards.push(UC);
      }
    });
    cardData.getAllCards().then((allCards) => {
      const cards = [];
      usercards.forEach((UC) => {
        const card = allCards.find((c) => c.cardId === UC.cardId);
        cards.push(card);
      });
      resolve(cards);
    });
  })
    .catch((err) => reject(err));
});

export default { cardsByBoardCategory, getCardsByUser };
