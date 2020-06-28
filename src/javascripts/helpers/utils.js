const printToDom = (selector, text) => {
  $(selector).html(text);
};

const responseToArray = (response) => {
  const Objects = response.data;
  const array = [];
  if (Objects) {
    Object.keys(Objects).forEach((Id) => {
      Objects[Id].id = Id;
      array.push(Objects[Id]);
    });
  }
  return array;
};

export default { printToDom, responseToArray };
