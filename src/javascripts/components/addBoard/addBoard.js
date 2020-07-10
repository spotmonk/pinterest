const addBoard = () => {
  const boardName = $('#newBoard').val();
  let duplicate = false;
  $('.boards').each((index, element) => {
    if (boardName === $(element).text()) {
      duplicate = true;
    }
  });
  console.warn(duplicate);
};

export default { addBoard };
