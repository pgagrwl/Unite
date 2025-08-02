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

async function getQuotes(chainId, srcAsset, dstAsset, amount, protocol) {
  const endpoint = `/swap/v6.1/${chainId}/quote`;
  let params = {};
  params = {
    src: srcAsset,
    dst: dstAsset,
    amount: amount,
    protocols: protocol,
    includeTokensInfo: "true",
    includeProtocols: "true",
    includeGas: "true",
  };
  const res = await call(endpoint, params);
  return res;
}

async function bestQuote(chainId, srcAsset, dstAsset, amount) {
  const endpoint = `/swap/v6.1/${chainId}/quote`;
  let params = {};
  params = {
    src: srcAsset,
    dst: dstAsset,
    amount: amount,
    includeTokensInfo: "true",
    includeProtocols: "true",
    includeGas: "true",
  };
  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  liquiditySources,
  availableSwapTokens,
  trustedSpender,
  getQuotes,
  bestQuote,
};
