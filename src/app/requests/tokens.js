const axios = require('./Axios');

async function getTokenPrice(token) {
  try {
    const { data } = await axios.get(`/simple/price?ids=${token}&vs_currencies=usd`);

    return data;
  } catch (error) {
    return error;
  }
}

module.exports = getTokenPrice;
