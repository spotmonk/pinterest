import boardData from '../../helpers/data/boardData';
import boardsList from '../boardsList/boardsList';

const addBoard = () => {
  const boardName = $('#newBoard').val();
  $('#newBoard').val('');
  let duplicate = false;
  $('.boards').each((index, element) => {
    if (boardName.toUpperCase() === $(element).text().toUpperCase()) {
      duplicate = true;
    }
  });

  if (!duplicate && boardName !== 'All Boards' && boardName !== '') {
    boardData.addBoard(boardName).then(() => {
      boardsList.getUserBoards();
    });
  }
};

export default { addBoard };
