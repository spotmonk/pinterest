import boardData from './boardData';
import utils from '../utils';
import cardData from './cardData';
import auth from '../../components/auth/auth';
import boardcardsData from './boardCardsData';

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

const getAllcardsByAllCategory = () => new Promise((resolve, reject) => {
  boardData.getBoardIDbyUID(auth.getUser().uid)
    .then((response) => {
      const userboards = utils.responseToArray(response);
      boardData.getBoards().then((allboardsResp) => {
        const allBoardsArr = utils.responseToArray(allboardsResp);
        const usersBoardsArr = [];
        userboards.forEach((board) => {
          const singleBoard = allBoardsArr.find((b) => (b.boardId === board.boardId));
          usersBoardsArr.push(singleBoard);
        });
        boardcardsData.getBoardCards().then((boardcardresp) => {
          const boardCardArray = utils.responseToArray(boardcardresp);
          const boardForCards = [];
          usersBoardsArr.forEach((UB) => {
            boardCardArray.forEach((b) => {
              if (b.boardId === UB.boardId) {
                boardForCards.push(b);
              }
            });
          });
          cardData.getAllCards().then((allCards) => {
            const cards = [];
            boardForCards.forEach((boardCard) => {
              const card = allCards.find((c) => c.cardId === boardCard.cardId);
              cards.push(card);
            });
            resolve(cards);
          });
        });
      })
        .catch((err) => reject(err));
    });
});

export default { cardsByBoardCategory, getAllcardsByAllCategory };
