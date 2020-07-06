import userCardsData from '../../helpers/data/userCardsData';
import auth from '../auth/auth';
import cardData from '../../helpers/data/cardData';

const deleteTarget = (e) => {
  const targetId = e.target.id;
  userCardsData.getUserCardsByCardId(targetId).then((response) => {
    let cardToDel = '';
    response.forEach((UC) => {
      if (UC.uid === auth.getUser().uid) {
        cardToDel = UC.id;
      }
    });
    cardData.unPin(cardToDel).then(() => {
      const activeBoard = $('.boards.active');
      activeBoard.click();
    });
  })
    .catch((err) => console.error(err));
};

export default { deleteTarget };
