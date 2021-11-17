import _axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const axios = _axios.create({
  baseURL: publicRuntimeConfig.baseUrl,
  timeout: 180000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default axios;
