const { call } = require("../utils/api.js");

async function txHistory(address, chainId, limit) {
  const endpoint = `/history/v2.0/history/${address}/events`;
  const params = {
    limit: limit || 10,
    chainId: chainId,
  };

  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  txHistory,
};
