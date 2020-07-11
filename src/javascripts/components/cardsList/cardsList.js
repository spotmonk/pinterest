import cardBuilder from '../cardBuilder/cardBuilder';
import cardData from '../../helpers/data/cardData';
import auth from '../auth/auth';
import smash from '../../helpers/data/smash';
// eslint-disable-next-line import/no-cycle
import pinButton from '../pinButton/pinButton';

import './cardList.scss';
import pinToBoard from '../pinToBoard/pinToBoard';
// eslint-disable-next-line import/no-cycle
import boardsList from '../boardsList/boardsList';

const addClickEvents = () => {
  $('.pin').on('click', (event) => {
    if ($(event.target).hasClass('btn-danger')) {
      pinButton.deleteTarget(event);
    } else {
      const boardId = $(event.target).parent().find(':selected').val();
      pinToBoard.addPinToBoard(boardId, event.target.id).then(() => {
      })
        .catch((err) => console.warn(err));
    }
  });
};

const displayDropDown = () => {
  const allSelectorDivs = $('.displayBoards');
  boardsList.boardsDropDown().then((response) => {
    const html = response;
    allSelectorDivs.html(html);
  })
    .catch((err) => console.warn(err));
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
      displayDropDown();
      if (auth.getUser() === null) {
        $('.pin').addClass('hide');
      }
    })
    .catch((err) => console.error('did not work', err));
};

const cardHTML = (e) => {
  const targetId = e.target.id;
  if (targetId === 'explore') { allCardsHTML(); addClickEvents(); return; }
  const cardsDiv = $('#cards');
  if (targetId === 'all-boards') {
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
    smash.cardsByBoardCategory(targetId)
      .then((cardsArr) => {
        let domString = '<div class="d-flex flex-wrap">';
        cardsArr.forEach((card) => {
          domString += cardBuilder.makeCards(card);
        });
        domString += '</div>';
        cardsDiv.html(domString);
        addClickEvents();
      })
      .catch((err) => console.error('did not work', err));
  }
};
export default { allCardsHTML, cardHTML, addClickEvents };
