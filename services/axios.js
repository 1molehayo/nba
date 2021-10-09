import _axios from 'axios';

const axios = _axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default axios;
