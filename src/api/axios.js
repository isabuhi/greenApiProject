import axios from 'axios';

export const instanceAxios = axios.create({
    baseURL: 'https://api.green-api.com/',
});
