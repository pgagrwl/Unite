const { call, post } = require("../utils/api.js");

async function gaslessSwapActiveOrders(chainId) {
  const endpoint = `/fusion/orders/v2.0/${chainId}/order/active`;
  const params = { page: 1, limit: 10 };

  const res = await call(endpoint, params);
  return res;
}

async function settlementAddress(chainId) {
  const endpoint = `/fusion/orders/v2.0/${chainId}/order/settlement`;
  const params = {};
  const res = await call(endpoint, params);
  return res;
}

async function getOrderByHash(chainId, orderHash) {
  const endpoint = `/fusion/orders/v2.0/${chainId}/order/status/${orderHash}`;
  const params = {};
  const res = await call(endpoint, params);
  return res;
}

async function postOrderByHash(chainId, orderHashes) {
  const endpoint = `/fusion/orders/v2.0/${chainId}/order/status`;
  const data = [orderHashes];
  const res = await post(endpoint, data);
  return res;
}

module.exports = {
  gaslessSwapActiveOrders,
  settlementAddress,
  getOrderByHash,
  postOrderByHash,
};
