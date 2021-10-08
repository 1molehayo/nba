import _axios from 'axios';

const axios = _axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { contentType: 'application/json' }
});

export const _catchAxiosError = (e, onError) => {
  let error = {};

  if (e.response === undefined) {
    error.message = 'No Internet Connection';
  } else {
    error = e.response.data;
  }

  if (onError) {
    onError(error);
  }
};

export default { axios, _catchAxiosError };
