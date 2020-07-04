import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const oldGetBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json`)
    .then((response) => {
      const boardObjects = response.data;
      const boards = [];
      if (boardObjects) {
        Object.keys(boardObjects).forEach((boardId) => {
          boardObjects[boardId].id = boardId;
          boards.push(boardObjects[boardId]);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});

const getBoards = () => axios.get(`${baseUrl}/boards.json`);

const getBoardByBoardId = (boardId) => axios.get(`${baseUrl}/boards.json?orderBy="boardId"&equalTo="${boardId}"`);

const getBoardByCategory = (category) => axios.get(`${baseUrl}/boards.json?orderBy="category"&equalTo="${category}"`);

const getBoardIDbyUID = (uid) => axios.get(`${baseUrl}/userBoards.json?orderBy="UID"&equalTo="${uid}"`);

export default {
  getBoards,
  getBoardByBoardId,
  getBoardIDbyUID,
  getBoardByCategory,
  oldGetBoards,
};
