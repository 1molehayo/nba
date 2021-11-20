import Toastify from 'toastify-js';
import moment from 'moment';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { DATE_FORMAT, PAGE_SIZE, PERMISSIONS } from './constants';

export const capitalizeFirstLetter = (str) => {
  if (!str) {
    return '';
  }

  return `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`;
};

export const formatCharLength = (str, len, noElipsis = false) => {
  if (!str) {
    return '';
  }

  if (str.length > len) {
    if (noElipsis) {
      return str.substring(0, len - 1);
    }

    return `${str.substring(0, len - 1)}...`;
  }

  return str;
};

export const formatPrice = (amount, currency = true) => {
  if (!amount) {
    return '';
  }
  const result = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  if (currency) {
    return `₦${result}`;
  }

  return result;
};

export const getImagePath = (url) => {
  if (!url) {
    return '';
  }

  // return `${publicRuntimeConfig.baseUrl}/${url}`;
  return `${url}`;
};

export const getStatus = (val) => {
  if (val && val.toLowerCase().includes('success')) {
    return (
      <>
        <span className="color-green icon-success mr-2" />
        <span className="color-green">Success</span>
      </>
    );
  }

  if (val && val.toLowerCase() === 'pending') {
    return (
      <>
        <span className="color-orange icon-warning mr-2" />
        <span className="color-orange">Pending</span>
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

export const isBrowser = () => typeof window !== 'undefined';

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

export const ObjHasProp = (obj, prop) => {
  if (!obj || !prop) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const getFileName = (file) => {
  if (file) {
    return file.name;
  }

  return 'No file Chosen...';
};

export const getPermissions = (role) => {
  if (!role) {
    return [];
  }

  return PERMISSIONS[role.type.toLowerCase()];
};

const getToasterStyles = (type) => {
  switch (type) {
    case 'error':
      return 'linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))';

    case 'warn':
      return 'linear-gradient(to right, rgb(255 244 113), rgb(150, 201, 61))';

    default:
      return 'linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61))';
  }
};

export const notify = ({ type, message }) => {
  return Toastify({
    text: message,
    duration: 3000,
    close: true,
    style: {
      background: getToasterStyles(type),
      color: '#fff',
      'font-size': '16px'
    }
  }).showToast();
};

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export const getObjPropWithValues = (obj) => {
  const renewedObj = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key) && obj[key]) {
      renewedObj[key] = obj[key];
    }
  }

  return renewedObj;
};

export const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="rgba(218, 218, 218, 0.34)" offset="20%" />
      <stop stop-color="#fff" offset="50%" />
      <stop stop-color="rgba(218, 218, 218, 0.34)" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="rgba(218, 218, 218, 0.34)" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const getUpcomingMeetings = (arr) => {
  if (!arr) {
    return [];
  }

  const res = arr.filter((item) => {
    return moment(item.date).isSameOrAfter(new Date(), 'day');
  });

  return res;
};

export const getOldMeetings = (arr) => {
  if (!arr) {
    return [];
  }

  const res = arr.filter((item) => {
    return moment(item.date).isBefore(new Date(), 'day');
  });

  return res;
};

export const isDraftJsEmpty = (state) => {
  const rawState = convertToRaw(state);
  if (!rawState || isObjectEmpty(rawState)) {
    // filter undefined and {}
    return true;
  }
  const contentState = convertFromRaw(rawState);
  return !(contentState.hasText() && contentState.getPlainText() !== '');
};

export const getStartPage = (page, limit = PAGE_SIZE) => {
  return limit * (page - 1) + 1;
};
