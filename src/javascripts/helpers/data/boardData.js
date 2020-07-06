import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoards = () => axios.get(`${baseUrl}/boards.json`);

const getBoardByBoardId = (boardId) => axios.get(`${baseUrl}/boards.json?orderBy="boardId"&equalTo="${boardId}"`);

const getBoardByCategory = (category) => axios.get(`${baseUrl}/boards.json?orderBy="category"&equalTo="${category}"`);

const getBoardIDbyUID = (uid) => axios.get(`${baseUrl}/userBoards.json?orderBy="UID"&equalTo="${uid}"`);

export default {
  getBoards,
  getBoardByBoardId,
  getBoardIDbyUID,
  getBoardByCategory,
};
