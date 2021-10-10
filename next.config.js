const path = require('path');

function removehttp(url) {
  if (url) {
    return url.replace(/(^\w+:|^)\/\//, '');
  }

  return url;
}

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:1337',
    PAYMENT_API: process.env.PAYMENT_API || 'https://api.ravepay.co'
  },
  images: {
    domains: ['localhost', `${removehttp(process.env.API_BASE_URL)}`]
  },
  webpack: (config) => {
    config.externals = {
      ...config.externals,
      canvas: 'canvas',
      critters: 'critters'
    };

    return config;
  }
};
