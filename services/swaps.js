const defaultChains = require("../utils/chains.js");
const {
  liquiditySources,
  availableSwapTokens,
  trustedSpender,
  getQuotes,
} = require("../1ch/swaps.js");
const { tokenPrice, priceList } = require("../1ch/spotPrice.js");
const BN = require("bignumber.js");
const swapTokenCache = {};
const tokenListCache = {};

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
  const results = [];

  for (const chain of defaultChains) {
    try {
      let res = swapTokenCache[chain.id];
      if (!res) {
        res = await availableSwapTokens(chain.id);
        swapTokenCache[chain.id] = res;
      }

      const tokensList = Object.keys(res.tokens);
      const allPriceList = (await priceList(chain.id, "USD")) || 0;

      const result = tokensList.map((tokenAddress) => {
        const price = Number(allPriceList[tokenAddress] || 0).toFixed(4);
        return {
          ...res.tokens[tokenAddress],
          priceInUSD: price,
        };
      });

      results.push({
        chainId: chain.id,
        network: chain.network,
        data: result,
      });

      await sleep(1000);
    } catch (error) {
      console.error(`Error on chain ${chain.network}:`, error);
      results.push({
        chainId: chain.id,
        network: chain.network,
        data: null,
      });

      await sleep(2000);
    }
  }

  return results;
}

async function availableSwapTokensbyChain(chainId) {
  const results = [];

  try {
    let res = tokenListCache[chainId];
    if (!res) {
      res = await availableSwapTokens(chainId);
      tokenListCache[chainId] = res;
    }

    const tokensList = Object.keys(res.tokens);
    const allPriceList = (await priceList(chainId, "USD")) || 0;

    const result = tokensList.map((tokenAddress) => {
      const price = Number(allPriceList[tokenAddress] || 0).toFixed(4);
      return {
        ...res.tokens[tokenAddress],
        priceInUSD: price,
      };
    });

    results.push({
      chainId: chainId,
      data: result,
    });

    await sleep(1000);
  } catch (error) {
    console.error(`Error on chain ${chainId}:`, error);
    results.push({
      chainId: chainId,
      data: null,
    });

    await sleep(2000);
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

async function getQuotesList(chainId, srcToken, dstToken, amount) {
  let results = [];

  const res = await liquiditySources(chainId);
  const protocols = res.protocols || [];

  for (const protocol of protocols) {
    const protocolId = protocol.id;
    const quote = await getQuotes(
      chainId,
      srcToken,
      dstToken,
      amount,
      protocolId
    );
    if (!quote) continue;
    results.push(quote);
    await sleep(1000); // Delay of 1 second
  }

  return results;
}

async function getTokenPrice(chainId, tokenAddress) {
  const price = await tokenPrice(chainId, tokenAddress, "USD");
  return price[tokenAddress] || 0;
}

module.exports = {
  liquiditySourcesLists,
  availableSwapTokensLists,
  availableSwapTokensbyChain,
  trustedSpenderLists,
  getQuotesList,
};
