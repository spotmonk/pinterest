import axios from 'axios';
import apiKeys from '../apiKeys.json';
import auth from '../../components/auth/auth';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoards = () => axios.get(`${baseUrl}/boards.json`);

const getUserBoards = () => axios.get(`${baseUrl}/userBoards.json`);

const getBoardByBoardId = (boardId) => axios.get(`${baseUrl}/boards.json?orderBy="boardId"&equalTo="${boardId}"`);

const getBoardByCategory = (category) => axios.get(`${baseUrl}/boards.json?orderBy="category"&equalTo="${category}"`);

const getBoardIDbyUID = (uid) => axios.get(`${baseUrl}/userBoards.json?orderBy="UID"&equalTo="${uid}"`);

const addBoard = (boardName) => new Promise((resolve, reject) => {
  const boardNameObj = {
    category: boardName,
  };
  axios.post(`${baseUrl}/boards.json`, boardNameObj)
    .then((response) => {
      const boardIdObj = response.data;
      const userId = auth.getUser().uid;
      const tempUserBoard = {
        UID: userId,
        boardId: boardIdObj.name,
      };
      axios.post(`${baseUrl}/userBoards.json`, tempUserBoard).then((resp) => {
        resolve(resp);
      });
    }).catch((err) => reject(err));
});

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId.json}`);

export default {
  getBoards,
  getUserBoards,
  getBoardByBoardId,
  getBoardIDbyUID,
  getBoardByCategory,
  addBoard,
  deleteBoard,
};
