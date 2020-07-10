import boardData from '../../helpers/data/boardData';
import auth from '../auth/auth';
import utils from '../../helpers/utils';
import './boardList.scss';
import cardsList from '../cardsList/cardsList';
// import userCardsData from '../../helpers/data/userCardsData';

const printBoardNames = (boards) => {
  let domString = '<ul class="list-group"><li id="explore" class="boards list-group-item active">Explore</li><li id="all-boards" class="boards list-group-item">All Boards</li>';
  boards.forEach((board) => {
    domString += `<li id="${board.id}" class="boards list-group-item">${board.category}</li>`;
  });
  domString += '</ul>';
  utils.printToDom('#boards', domString);
  $('.boards').click((e) => {
    $('.boards').removeClass('active');
    $(e.target).addClass('active');
    cardsList.cardHTML(e);
  });
};

const getUserBoards = () => {
  const user = auth.getUser();
  if (user) {
    boardData.getUserBoards().then((response) => {
      const allUserBoards = utils.responseToArray(response);
      boardData.getBoards().then((boardsresp) => {
        const allBoards = utils.responseToArray(boardsresp);
        const userBoards = [];

        allUserBoards.forEach((UB) => {
          if (UB.UID === user.uid) {
            userBoards.push(UB);
          }
        });
        const boards = [];
        userBoards.forEach((UC) => {
          const board = allBoards.find((b) => b.id === UC.boardId);
          if (boards.indexOf(board) < 0) {
            boards.push(board);
          }
        });
        printBoardNames(boards);
      });
    })
      .catch((err) => console.error(err));
  }
};

export default { getUserBoards };
