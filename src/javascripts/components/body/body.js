import auth from '../auth/auth';
import cardsList from '../cardsList/cardsList';
import boardsList from '../boardsList/boardsList';
import addPin from '../addPin/addPin';
import addBoard from '../addBoard/addBoard';

const bodyStart = () => {
  const greetDiv = $('#greet');
  const boardsDiv = $('#boards');
  $('#modalSubmit').click(addPin.addPinEvent);
  $('#addBoardButton').click(addBoard.addBoard);
  const user = auth.getUser();
  if (user === null) {
    greetDiv.text('Hello Guest! Log in For your personalized experience');
    cardsList.allCardsHTML();
    $('#addBoard').addClass('hide');
    boardsDiv.html('<h2>Log in to see your boards here</h2>');
  } else {
    greetDiv.text(`Hello ${user.displayName}!`);
    cardsList.allCardsHTML();
    $('#addBoard').removeClass('hide');
    boardsList.buildBoardsList();
  }
};

export default { bodyStart };
