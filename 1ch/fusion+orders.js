const { call } = require("../utils/api.js");

async function crossChainSwapActiveOrders(srChainId, dstChainId) {
  const endpoint = `/fusion-plus/orders/v1.0/order/active`;
  const params = { srcChain: srChainId, dstChain: dstChainId };

  const res = await call(endpoint, params);
  return res;
}

async function escrowAddress(chainId) {
  const endpoint = `/fusion-plus/orders/v1.0/order/escrow`;
  const params = { chainId: chainId };
  const res = await call(endpoint, params);
  return res;
}

async function orderStatus(orderHash) {
  const endpoint = `/fusion-plus/orders/v1.0/order/status/${orderHash}`;
  const params = {};
  const res = await call(endpoint, params);
  return res;
}

module.exports = {
  crossChainSwapActiveOrders,
  escrowAddress,
  orderStatus,
};
