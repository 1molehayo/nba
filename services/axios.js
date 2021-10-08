import _axios from 'axios';

const axios = _axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { contentType: 'application/json' }
});

export default axios;
