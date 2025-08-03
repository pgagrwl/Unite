const { call } = require("../utils/api.js");

async function syncedBlock(chainId) {
  const endpoint = `/traces/v1.0/chain/${chainId}/synced-interval`;
  const params = {};

  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  syncedBlock,
};
