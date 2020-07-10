import auth from '../auth/auth';
import cardsList from '../cardsList/cardsList';
import boardsList from '../boardsList/boardsList';
import addPin from '../addPin/addPin';

const bodyStart = () => {
  const greetDiv = $('#greet');
  const boardsDiv = $('#boards');
  $('#modalSubmit').click(addPin.addPinEvent);
  const user = auth.getUser();
  if (user === null) {
    greetDiv.text('Hello Guest! Log in For your personalized experience');
    cardsList.allCardsHTML();
    boardsDiv.html('<h2>Log in to see your boards here</h2>');
  } else {
    greetDiv.text(`Hello ${user.displayName}!`);
    cardsList.allCardsHTML();
    boardsDiv.html('<h1>Your Board will be here</h1>');
    boardsList.getUserBoards();
  }
};

export default { bodyStart };
