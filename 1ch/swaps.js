const { call } = require("../utils/api.js");

async function liquiditySources(chainId) {
  const endpoint = `/swap/v6.1/${chainId}/liquidity-sources`;
  const params = {};
  const res = await call(endpoint, params);
  return res;
}

async function availableSwapTokens(chainId) {
  const endpoint = `/swap/v6.1/${chainId}/tokens`;
  const params = {};
  const res = await call(endpoint, params);
  return res;
}

async function trustedSpender(chainId) {
  const endpoint = `/swap/v6.1/${chainId}/approve/spender`;
  const params = {};
  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  liquiditySources,
  availableSwapTokens,
  trustedSpender,
};
