const makeCards = (cardData) => {
  const domstring = `<div class="card col-3 m-3" style="width: 18rem;">
  <img src="${cardData.imgURL}" class="card-img-top" alt="...">
  <div class="card-body ">
    <h5 class="card-title">${cardData.title}</h5>
    <p class="card-text">${cardData.description}</p></div>
    <div class="d-flex justify-content-between"> <a href="${cardData.url}" target="_blank" class="btn btn-primary">Visit Site</a> 
    <button id="${cardData.id}" class="pin btn btn-danger "><i class="fas fa-thumbtack"></i></button></div>
</div>`;
  return domstring;
};

export default { makeCards };
