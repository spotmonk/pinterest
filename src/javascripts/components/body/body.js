import auth from '../auth/auth';

const bodyStart = () => {
  const greetDiv = $('#greet');
  const cardsDiv = $('#cards');
  const boardsDiv = $('#boards');
  const user = auth.getUser();
  if (user === null) {
    greetDiv.text('Hello Guest! Log in For your personalized experience');
    cardsDiv.html('');
    boardsDiv.html('<h2>Log in to see your boards here</h2>');
  } else {
    greetDiv.text(`Hello ${user.displayName}!`);
    cardsDiv.html('');
    boardsDiv.html('<h1>Your Board will be here</h1>');
  }
};

export default { bodyStart };
