const defaultChains = require("../utils/chains.js");
const { settlementAddress } = require("../1ch/fusion.js");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function settlementAddressLists() {
  let results = [];

  for (const chain of defaultChains) {
    try {
      const res = await settlementAddress(chain.id);
      results.push({
        chainId: chain.id,
        network: chain.network,
        address: res.address,
      });

      await sleep(1000);
    } catch (error) {
      console.error(
        `Error fetching settlement address for ${chain.network}:`,
        error
      );
      results.push({
        chainId: chain.chainId || chain.id,
        network: chain.network,
        address: null,
      });
      await sleep(2000);
    }
  }

  return results;
}

module.exports = {
  settlementAddressLists,
};
