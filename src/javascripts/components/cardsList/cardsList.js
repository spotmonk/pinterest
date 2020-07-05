import cardBuilder from '../cardBuilder/cardBuilder';
import cardData from '../../helpers/data/cardData';
import auth from '../auth/auth';
import smash from '../../helpers/data/smash';
import pinButton from '../pinButton/pinButton';

import './cardList.scss';

const addClickEvents = () => {
  $('.pin').on('click', (event) => {
    if ($(event.target).hasClass('btn-danger')) {
      console.warn('delete pin');
      pinButton.deleteTarget(event);
    } else {
      console.warn('new pin');
    }
  });
};

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
      addClickEvents();
      $('.pin').addClass('btn-primary');
      $('.pin').removeClass('btn-danger');
      if (auth.getUser() === null) {
        $('.pin').addClass('hide');
      }
    })
    .catch((err) => console.error('did not work', err));
};

const cardHTML = (e) => {
  const targetText = $(e.target).text();
  if (targetText === 'Explore') { allCardsHTML(); addClickEvents(); return; }
  const cardsDiv = $('#cards');
  if (targetText === 'All Boards') {
    smash.getCardsByUser()
      .then((cards) => {
        let domString = '<div class="d-flex flex-wrap">';
        for (let i = 0; i < cards.length; i += 1) {
          domString += cardBuilder.makeCards(cards[i]);
        }
        domString += '</div>';
        cardsDiv.html(domString);
        addClickEvents();
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
        addClickEvents();
      })
      .catch((err) => console.error('did not work', err));
  }
};
export default { allCardsHTML, cardHTML };
