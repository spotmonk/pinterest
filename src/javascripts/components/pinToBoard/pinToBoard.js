// click pin
// select board
// create usercard

// import userCardsData from "../../helpers/data/userCardsData";
import auth from '../auth/auth';
import userCardsData from '../../helpers/data/userCardsData';

const addPinToBoard = (boardIdVar, cardIdVar) => new Promise((resolve, reject) => {
  const tempUC = {
    uid: auth.getUser().uid,
    boardId: boardIdVar,
    cardId: cardIdVar,
  };
  userCardsData.addUserCard(tempUC).then(() => { resolve(); })
    .catch((err) => reject(err));
});

export default { addPinToBoard };
