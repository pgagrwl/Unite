const { call } = require("../utils/api.js");

async function nativeDetails(chainId) {
  const endpoint = `/token-details/v1.0/details/${chainId}`;
  const params = { provider: "coinmarketcap" }; // "coingecko"

  const res = await call(endpoint, params);
  return res;
}

async function tokenDetails(chainId, contractAddress) {
  const endpoint = `/token-details/v1.0/details/${chainId}/${contractAddress}`;
  const params = { provider: "coinmarketcap" }; // "coingecko"

  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  nativeDetails,
  tokenDetails,
};
