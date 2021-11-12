const path = require('path');

module.exports = {
  reactStrictMode: true,
  trailingSlashes: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  publicRuntimeConfig: {
    // Will only be available on the server side and client side
    baseUrl: `https://${process.env.API_BASE_URL}` || 'http://localhost:1337',
    raveAPI: process.env.RAVE_API || 'https://api.ravepay.co',
    ravePublicKey: process.env.RAVE_PUBLIC_KEY,
    raveSecretKey: process.env.RAVE_SECRET_KEY
  },
  images: {
    domains: ['localhost', process.env.API_BASE_URL]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: 'node-loader'
    });

    return config;
  }
};
