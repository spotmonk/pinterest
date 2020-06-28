import auth from '../auth/auth';
import cardsList from '../cardsList/cardsList';

const bodyStart = () => {
  const greetDiv = $('#greet');
  const boardsDiv = $('#boards');
  const user = auth.getUser();
  if (user === null) {
    greetDiv.text('Hello Guest! Log in For your personalized experience');
    cardsList.cardHTML();
    boardsDiv.html('<h2>Log in to see your boards here</h2>');
  } else {
    greetDiv.text(`Hello ${user.displayName}!`);
    cardsList.cardHTML();
    boardsDiv.html('<h1>Your Board will be here</h1>');
  }
};

export default { bodyStart };
