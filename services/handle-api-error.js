import { isArrayEmpty } from '../utility';
import { ERROR_STATUS } from '../utility/constants';

const handleApiError = (e) => {
  if (e.response && e.response.data) {
    const arr = ERROR_STATUS.filter(
      (item) => item.statusCode === e.response.data.statusCode
    );

    if (!isArrayEmpty(arr)) {
      return arr[0];
    }

    return ERROR_STATUS.filter((err) => err.statusCode === 500)[0];
  }

  return {
    statusCode: 404,
    error: 'No Internet Connection',
    message: 'please, check your internet connection!'
  };
};

export default handleApiError;
