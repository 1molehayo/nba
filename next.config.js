const path = require('path');

function removehttp(url) {
  if (url) {
    return url.replace(/(^\w+:|^)\/\//, '');
  }

  return '';
}

module.exports = {
  target: 'serverless',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  publicRuntimeConfig: {
    // Will only be available on the server side
    baseUrl: process.env.API_BASE_URL || 'http://localhost:1337',
    raveAPI: process.env.RAVE_API || 'https://api.ravepay.co'
  },
  images: {
    domains: ['localhost', removehttp(process.env.API_BASE_URL)]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: 'node-loader'
    });

    return config;
  }
};
