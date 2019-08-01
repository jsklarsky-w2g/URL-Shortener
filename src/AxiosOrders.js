import axios from 'axios';

export const read = axios.create({
    baseURL: 'https://react-hooks-d2b4b.firebaseio.com/.json'
});