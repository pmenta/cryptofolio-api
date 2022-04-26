const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

module.exports = instance;
