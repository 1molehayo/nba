import _axios from 'axios';

const axios = _axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  },
  withCredentials: true
});

export default axios;
