import { isArrayEmpty } from '../utility';
import { ERROR_STATUS } from '../utility/constants';

const handleApiError = (e) => {
  if (e.response && e.response.data) {
    const { data, statusCode, error, message } = e.response.data;

    if (message) {
      return {
        statusCode,
        error,
        message
      };
    }

    if (data && Array.isArray(data)) {
      const { messages } = data[0];

      return {
        statusCode,
        error,
        message: messages[0].message
      };
    }

    const arr = ERROR_STATUS.filter(
      (item) => item.statusCode === e.response.data.statusCode
    );

    if (!isArrayEmpty(arr)) {
      return arr[0];
    }

    return ERROR_STATUS.filter((err) => err.statusCode === 500)[0];
  }

  if (e.message) {
    return {
      statusCode: 400,
      error: 'Bad Request',
      message: e.message
    };
  }

  return {
    statusCode: 500,
    error: 'No Internet Connection',
    message: 'please, check your internet connection!'
  };
};

export default handleApiError;
