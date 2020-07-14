import utils from '../utils';
import cardData from './cardData';
import auth from '../../components/auth/auth';
import userCardsData from './userCardsData';
import boardData from './boardData';

const cardsByBoardCategory = (boardId) => new Promise((resolve, reject) => {
  const currentUser = auth.getUser();
  userCardsData.getUserCardsByUid(currentUser.uid).then((response) => {
    const userCards = utils.responseToArray(response);
    const boards = [];
    userCards.forEach((UC) => {
      if (UC.boardId === boardId) {
        boards.push(UC);
      }
    });
    cardData.getAllCards().then((cardsResp) => {
      const cards = [];
      boards.forEach((board) => {
        const card = cardsResp.find((c) => c.id === board.cardId);
        cards.push(card);
      });
      resolve(cards);
    });
  })
    .catch((err) => reject(err));
});

const getCardsByUser = () => new Promise((resolve, reject) => {
  userCardsData.getUserCards().then((alluserCards) => {
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
        const card = allCards.find((c) => c.id === UC.cardId);
        cards.push(card);
      });
      resolve(cards);
    });
  })
    .catch((err) => reject(err));
});

const completelyRemoveBoard = (boardId) => new Promise((resolve, reject) => {
  boardData.getUserBoardsByBoardID(boardId).then((response) => {
    const userboard = utils.responseToArray(response);
    boardData.deleteUserBoard(userboard[0].id).then(() => {
      boardData.deleteBoard(boardId)
        .then(() => {
          userCardsData.getUserCardsBoardId(boardId).then((resp) => {
            const userCards = utils.responseToArray(resp);
            userCards.forEach((UC) => {
              console.warn(UC);
              userCardsData.deleteUserCard(UC.id);
            });
            resolve();
          });
        });
    });
  })
    .catch((err) => reject(err));
});

export default { cardsByBoardCategory, getCardsByUser, completelyRemoveBoard };
