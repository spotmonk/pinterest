import cardData from '../../helpers/data/cardData';

const addPinEvent = () => {
  const tempPinObj = {
    imgURL: $('#pinImg').val(),
    url: $('#pinLink').val(),
    title: $('#pinTitle').val(),
    description: $('#PinDescrip').val(),
  };
  console.warn(tempPinObj);
  cardData.addPin(tempPinObj).then((response) => {
    document.getElementById('newPinForm').reset();
    console.warn(response);
    $('.close').click();
    const explore = $('#explore');
    explore.click();
  })
    .catch((err) => console.warn(err));
};

export default { addPinEvent };
