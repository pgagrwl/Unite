const defaultChains = require("../utils/chains.js");
const { escrowAddress } = require("../1ch/fusion+orders.js");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function escrowAddressLists() {
  let results = [];

  for (const chain of defaultChains) {
    try {
      const res = await escrowAddress(chain.id);
      results.push({
        chainId: chain.id,
        network: chain.network,
        address: res.address,
      });

      await sleep(1000);
    } catch (error) {
      console.error(
        `Error fetching escrow address for ${chain.network}:`,
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
  escrowAddressLists,
};
