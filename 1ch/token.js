const { call } = require("../utils/api.js");

async function tokenData(chainId, addressArr) {
  const endpoint = `/token/v1.4/${chainId}/custom`;
  const params = { addresses: addressArr }; // ["a1", "a2", "a3"]

  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  tokenData,
};
