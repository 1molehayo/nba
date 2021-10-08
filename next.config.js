const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:1337/articles',
    PAYMENT_API: process.env.PAYMENT_API || 'https://api.ravepay.co'
  }
};
