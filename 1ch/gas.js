const { call } = require("../utils/api.js");

async function gasPrice(chainId) {
  const endpoint = `/gas-price/v1.6/${chainId}`;
  const params = {};

  const res = await call(endpoint, params);
  console.log(res);
}
