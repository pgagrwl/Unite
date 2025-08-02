const { call } = require("../utils/api.js");

async function allTokenBalance(address, chainId) {
  const endpoint = `/balance/v1.2/${chainId}/balances/${address}`;
  const params = {};

  const res = await call(endpoint, params);
  return res;
}

async function balanceAndAllowanceByAddress(
  walletAddress,
  chainId,
  spenderAddress
) {
  const endpoint = `/balance/v1.2/${chainId}/allowancesAndBalances/${spenderAddress}/${walletAddress}`;
  const params = {};
  const res = await call(endpoint, params);
  return res;
}

async function supportedCurrencies(chainId) {
  const endpoint = `/price/v1.1/${chainId}/currencies`;
  const params = {};
  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  allTokenBalance,
  balanceAndAllowanceByAddress,
  supportedCurrencies,
};
