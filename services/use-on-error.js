import { useEffect } from 'react';
import { capitalizeFirstLetter, isObjectEmpty, notify } from '../utility';

const useOnError = (errorObject) => {
  useEffect(() => {
    if (!isObjectEmpty(errorObject)) {
      notify({
        type: 'error',
        message: capitalizeFirstLetter(errorObject.message)
      });
    }

    return () => {};
  }, [errorObject]);
};

export default useOnError;
