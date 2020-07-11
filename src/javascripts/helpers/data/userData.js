import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getUsers = () => axios.get(`${baseUrl}/users.json`);

const getUserByuid = (uid) => axios.get(`${baseUrl}/users.json?orderBy="UID"&equalTo="${uid}"`);

const addUser = (userObj) => axios.post(`${baseUrl}/users.json`, userObj);

export default { getUserByuid, addUser, getUsers };
