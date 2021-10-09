export const ObjHasProp = (obj, prop) => {
  if (!obj || !prop) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const formatCharLength = (str, len) => {
  if (!str) {
    return '';
  }

  if (str.length > len) {
    return `${str.substring(0, len - 1)}...`;
  }

  return str;
};

export const formatPrice = (amount) => {
  const result = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `₦${result}`;
};

export const getStatus = (val) => {
  if (val && val.toLowerCase() === 'success') {
    return (
      <>
        <span className="color-green icon-success mr-2" />
        <span className="color-green">Success</span>
      </>
    );
  }

  return (
    <>
      <span className="color-red icon-fail mr-2" />
      <span className="color-red">Fail</span>
    </>
  );
};

export const isArrayEmpty = (arr) => !arr || arr.length === 0;

export const isObjectEmpty = (obj) => {
  if (!obj) {
    return true;
  }

  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
};

export const getImagePath = (url) => {
  if (!url) {
    return '';
  }

  return `${process.env.API_BASE_URL}${url}`;
};
