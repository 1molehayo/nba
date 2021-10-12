import { useEffect } from 'react';
import { capitalizeFirstLetter, notify } from '../utility';

const useOnError = (errorObject) => {
  useEffect(() => {
    if (errorObject) {
      notify({
        type: 'error',
        message: capitalizeFirstLetter(errorObject.message)
      });
    }

    return () => {};
  }, [errorObject]);
};

export default useOnError;