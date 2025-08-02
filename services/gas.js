const defaultChains = require("../utils/chains.js");
const { gasPrice } = require("../1ch/gas.js");
const { tokenPrice } = require("../1ch/spotPrice.js");
const { nativeDetails } = require("../1ch/tokenDetails.js");
const nativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const currency = "USD";

const defaultMap = {
  baseFee: "",
  low: {
    maxPriorityFeePerGas: "",
    maxFeePerGas: "",
  },
  medium: {
    maxPriorityFeePerGas: "",
    maxFeePerGas: "",
  },
  high: {
    maxPriorityFeePerGas: "",
    maxFeePerGas: "",
  },
  instant: {
    maxPriorityFeePerGas: "",
    maxFeePerGas: "",
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function gasPriceLists(currency = "USD") {
  let results = [];

  for (const chain of defaultChains) {
    try {
      let nativeInfo = {};
      let gasPriceData = {};
      let tokenPriceInCurr = {};
      if (
        chain.id === 8453 ||
        chain.id === 10 ||
        chain.id === 130 ||
        chain.id === 59144
      ) {
        [tokenPriceInCurr, gasPriceData] = await Promise.all([
          tokenPrice(chain.id, nativeAddress, currency),
          gasPrice(chain.id),
        ]);
      } else {
        [tokenPriceInCurr, nativeInfo, gasPriceData] = await Promise.all([
          tokenPrice(chain.id, nativeAddress, currency),
          nativeDetails(chain.id),
          gasPrice(chain.id),
        ]);
      }

      const res = {
        chainId: chain.id,
        network: chain.network,
        asset: nativeInfo.symbol || "ETH",
        decimals: nativeInfo.decimals || 18,
        price: tokenPriceInCurr[nativeAddress],
        gasPrice: gasPriceData,
        currency: currency,
      };

      results.push(res);

      await sleep(1000);
    } catch (error) {
      console.error(`Error fetching gas price for ${chain.network}:`, error);
      results.push({
        chainId: chain.chainId || chain.id,
        network: chain.network,
        gasPrice: null,
      });
      await sleep(2000);
    }
  }

  return results;
}

module.exports = {
  gasPriceLists,
};
