import boardData from '../../helpers/data/boardData';
import auth from '../auth/auth';
import utils from '../../helpers/utils';
import './boardList.scss';

const printBoardNames = (names) => {
  let domString = '<ul class="list-group"><li class="boards list-group-item active">All</li>';
  names.forEach((name) => {
    domString += `<li id="${name}board" class="boards list-group-item">${name}</li>`;
  });
  domString += '</ul>';
  utils.printToDom('#boards', domString);
  $('.boards').click((e) => {
    $('.boards').removeClass('active');
    $(e.target).addClass('active');
  });
};

const getUserBoards = () => {
  const user = auth.getUser();
  if (user) {
    boardData.getBoardIDbyUID(user.uid)
      .then((response) => {
        const boardNames = [];
        const userBoards = utils.responseToArray(response);
        userBoards.forEach((userBoard) => {
          boardData.getBoardByBoardId(userBoard.boardId)
            .then((resp) => {
              const boards = utils.responseToArray(resp);
              boards.forEach((board) => {
                boardNames.push(board.category);
              });
              printBoardNames(boardNames);
            });
        });
      })
      .catch((err) => console.error('Get Boards Failed', err));
  }
};

export default { getUserBoards };
