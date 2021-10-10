export const ERROR_STATUS = [
  {
    statusCode: 400,
    error: 'Bad Request',
    message: 'invalid credentials'
  },
  {
    statusCode: 401,
    error: 'Unauthorized',
    message: 'invalid password'
  },
  {
    statusCode: 402,
    error: 'Payment Required',
    message: 'bandwith has been exhausted'
  },
  {
    statusCode: 403,
    error: 'Forbidden',
    message: 'request is forbidden, try again some time'
  },
  {
    statusCode: 404,
    error: 'Not Found',
    message: 'missing data'
  },
  {
    statusCode: 405,
    error: 'Method Not Allowed',
    message: 'that method is not allowed'
  },
  {
    statusCode: 406,
    error: 'Not Acceptable',
    message: 'unacceptable'
  },
  {
    statusCode: 407,
    error: 'Proxy Authentication Required',
    message: 'auth missing'
  },
  {
    statusCode: 408,
    error: 'Request Time-out',
    message: 'timed out'
  },
  {
    statusCode: 409,
    error: 'Conflict',
    message: 'there was a conflict'
  },
  {
    statusCode: 410,
    error: 'Gone',
    message: 'it is gone'
  },
  {
    statusCode: 411,
    error: 'Length Required',
    message: 'length needed'
  },
  {
    statusCode: 412,
    error: 'Precondition Failed',
    message: 'Precondition Failed'
  },
  {
    statusCode: 413,
    error: 'Request Entity Too Large',
    message: 'too big'
  },
  {
    statusCode: 414,
    error: 'Request-URI Too Large',
    message: 'uri is too long'
  },
  {
    statusCode: 415,
    error: 'Unsupported Media Type',
    message: 'that media is not supported'
  },
  {
    statusCode: 416,
    error: 'Requested Range Not Satisfiable',
    message: 'Requested Range Not Satisfiable'
  },
  {
    statusCode: 418,
    error: "I'm a Teapot",
    message: 'Sorry, no coffee...'
  },
  {
    statusCode: 422,
    error: 'Unprocessable Entity',
    message: 'your data is bad and you should feel bad'
  },
  {
    statusCode: 423,
    error: 'Locked',
    message: 'this resource has been locked'
  },
  {
    statusCode: 428,
    error: 'Precondition Required',
    message: 'you must supply an If-Match header'
  },
  {
    statusCode: 429,
    error: 'Too Many Requests',
    message: 'you have exceeded your request limit'
  },
  {
    statusCode: 451,
    error: 'Unavailable For Legal Reasons',
    message: 'you are not permitted to view this resource for legal reasons'
  },
  {
    statusCode: 500,
    error: 'Internal Server Error',
    message:
      'the server encountered an unexpected condition that prevented it from fulfilling the request'
  },
  {
    statusCode: 501,
    error: 'Not Implemented',
    message: 'method not implemented'
  },
  {
    statusCode: 502,
    error: 'Bad Gateway',
    message: 'bad gateway request'
  },
  {
    statusCode: 503,
    error: 'Service Unavailable',
    message: 'service is unavailable, try again some time'
  },
  {
    statusCode: 504,
    error: 'Gateway Time-out',
    message: 'gateway timed out'
  }
];
