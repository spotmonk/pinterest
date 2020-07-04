import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getBoardCards = () => axios.get(`${baseUrl}/boardcards.json`);

export default { getBoardCards };
