import cardBuilder from '../cardBuilder/cardBuilder';
import cardData from '../../helpers/data/cardData';
import auth from '../auth/auth';

const cardHTML = () => {
  const cardsDiv = $('#cards');
  cardData.getCards()
    .then((cards) => {
      let domString = '<div class="d-flex flex-wrap">';
      cards.forEach((card) => {
        domString += cardBuilder.makeCards(card);
      });
      domString += '</div>';
      cardsDiv.html(domString);
      if (auth.getUser() === null) {
        $('.pin').addClass('hide');
      }
    })
    .catch((err) => console.error('did not work', err));
};

export default { cardHTML };
