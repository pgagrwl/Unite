const defaultChains = require("../utils/chains.js");
const {
  liquiditySources,
  availableSwapTokens,
  trustedSpender,
} = require("../1ch/swaps.js");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function liquiditySourcesLists() {
  let results = [];

  for (const chain of defaultChains) {
    try {
      const res = await liquiditySources(chain.id);
      results.push({
        chainId: chain.id,
        network: chain.network,
        sources: res.protocols,
      });

      await sleep(1000);
    } catch (error) {
      console.error(
        `Error fetching settlement address for ${chain.network}:`,
        error
      );
      results.push({
        chainId: chain.id,
        network: chain.network,
        sources: null,
      });
      await sleep(2000);
    }
  }

  return results;
}

async function availableSwapTokensLists() {
  let results = [];

  for (const chain of defaultChains) {
    try {
      const res = await availableSwapTokens(chain.id);
      results.push({
        chainId: chain.id,
        network: chain.network,
        sources: res,
      });

      await sleep(1000);
    } catch (error) {
      console.error(
        `Error fetching settlement address for ${chain.network}:`,
        error
      );
      results.push({
        chainId: chain.id,
        network: chain.network,
        sources: null,
      });
      await sleep(2000);
    }
  }

  return results;
}

async function trustedSpenderLists() {
  let results = [];

  for (const chain of defaultChains) {
    try {
      const res = await trustedSpender(chain.id);
      results.push({
        chainId: chain.id,
        network: chain.network,
        trustedSpender: res.address,
      });

      await sleep(1000);
    } catch (error) {
      console.error(
        `Error fetching settlement address for ${chain.network}:`,
        error
      );
      results.push({
        chainId: chain.id,
        network: chain.network,
        sources: null,
      });
      await sleep(2000);
    }
  }

  return results;
}

module.exports = {
  liquiditySourcesLists,
  availableSwapTokensLists,
  trustedSpenderLists,
};
