export const ObjHasProp = (obj, prop) => {
  if (!obj || !prop) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const formatCharLength = (str, len) =>
  str ? (str.length > len ? `${str.substring(0, len - 1)}...` : str) : "";
