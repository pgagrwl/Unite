const { call } = require("../utils/api.js");

async function currencies(chainId) {
  const endpoint = `/price/v1.1/${chainId}/currencies`;
  const params = {};

  const res = await call(endpoint, params);
  return res;
}

async function priceList(chainId, currency) {
  const endpoint = `/price/v1.1/${chainId}`;
  const params = { currency: currency };

  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  currencies,
  priceList,
};
