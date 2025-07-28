const { call } = require("../utils/api.js");

async function allTokenBalance(address, chainId) {
  const endpoint = `/balance/v1.2/${chainId}/balances/${address}`;
  const params = {};

  const res = await call(endpoint, params);
  console.log(res);
}

async function balanceAndAllowanceByAddress(
  walletAddress,
  chainId,
  spenderAddress
) {
  const endpoint = `/balance/v1.2/${chainId}/allowancesAndBalances/${spenderAddress}/${walletAddress}";`;
  const params = {};
  const res = await call(endpoint, params);
  console.log(res);
  return res;
}
