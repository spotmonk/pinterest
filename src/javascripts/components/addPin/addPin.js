import cardData from '../../helpers/data/cardData';

const addPinEvent = () => {
  const newImgURL = $('#newImageUrl').val();
  const newUrl = $('#newPinUrl').val();
  const newTitle = $('#newPinTitle').val();
  const newDescription = $('#newPinDescrip').val();

  const form = document.getElementById('newPinForm');
  const valid = form.checkValidity();
  console.warn(valid);
  const tempPinObj = {
    imgURL: newImgURL,
    url: newUrl,
    title: newTitle,
    description: newDescription,
  };
  if (valid) {
    cardData.addPin(tempPinObj).then((response) => {
      document.getElementById('newPinForm').reset();
      console.warn(response);
      $('.close').click();
      const explore = $('#explore');
      explore.click();
    })
      .catch((err) => console.warn(err));
  }
};

export default { addPinEvent };
