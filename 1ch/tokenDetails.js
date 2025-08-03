const { call } = require("../utils/api.js");

async function nativeDetails(chainId, provider) {
  const endpoint = `/token-details/v1.0/details/${chainId}`;
  const params = { provider: provider };
  try {
    const res = await call(endpoint, params);
    return res.assets;
  } catch (error) {
    console.error("Error fetching native details:", chainId, error.message);
    throw error;
  }
}

async function tokenDetails(chainId, contractAddress, provider) {
  const endpoint = `/token-details/v1.0/details/${chainId}/${contractAddress}`;
  const params = { provider: provider };

  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  nativeDetails,
  tokenDetails,
};
