import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoards = () => new Promise((resolve, reject) => {
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

const getBoardByBoardId = (boardId) => axios.get(`${baseUrl}/boards.json?orderBy="boardId"&equalTo="${boardId}"`);

const getBoardIDbyUID = (uid) => axios.get(`${baseUrl}/userBoards.json?orderBy="UID"&equalTo="${uid}"`);

export default { getBoards, getBoardByBoardId, getBoardIDbyUID };
