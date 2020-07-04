import cardBuilder from '../cardBuilder/cardBuilder';
import cardData from '../../helpers/data/cardData';
import auth from '../auth/auth';
import smash from '../../helpers/data/smash';

const allCardsHTML = () => {
  const cardsDiv = $('#cards');
  cardData.getAllCards()
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

const cardHTML = (e) => {
  const targetText = $(e.target).text();
  if (targetText === 'Explore') { allCardsHTML(); return; }
  const cardsDiv = $('#cards');
  if (targetText === 'All Boards') {
    smash.getAllcardsByAllCategory()
      .then((cards) => {
        let domString = '<div class="d-flex flex-wrap">';
        for (let i = 0; i < cards.length; i += 1) {
          domString += cardBuilder.makeCards(cards[i]);
        }
        domString += '</div>';
        cardsDiv.html(domString);
      })
      .catch((err) => console.error('did not work', err));
  } else {
    smash.cardsByBoardCategory(targetText)
      .then((cardsArr) => {
        let domString = '<div class="d-flex flex-wrap">';
        cardsArr[0].cards.forEach((card) => {
          domString += cardBuilder.makeCards(card);
        });
        domString += '</div>';
        cardsDiv.html(domString);
        if (auth.getUser() === null) {
          $('.pin').addClass('hide');
        }
      })
      .catch((err) => console.error('did not work', err));
  }
};
export default { allCardsHTML, cardHTML };
