const { allTokenBalance, supportedCurrencies } = require("../1ch/balance.js");
const { tokenData } = require("../1ch/token.js");
const { priceList } = require("../1ch/spotPrice.js");
const { BigNumber } = require("@ethersproject/bignumber");
const { formatUnits, parseUnits } = require("@ethersproject/units");
const defaultChains = require("../utils/chains.js");

async function allBalance(address, currency) {
  const result = [];

  for (const chain of defaultChains) {
    const balances = await allTokenBalance(address, chain.id);

    const nonZeroTokens = Object.entries(balances)
      .filter(([_, balance]) => BigNumber.from(balance).gt(0))
      .map(([tokenAddress, balance]) => ({
        address: tokenAddress,
        balance: BigNumber.from(balance),
      }));

    if (nonZeroTokens.length === 0) continue;

    const sortedTokens = nonZeroTokens.sort((a, b) => b.balance.sub(a.balance));

    const tokenAddresses = sortedTokens.map((t) => t.address);

    const [tokenInfoMap, priceMap] = await Promise.all([
      tokenData(chain.id, tokenAddresses),
      priceList(chain.id, currency),
    ]);

    const formatted = sortedTokens.map(({ address, balance }) => {
      const tokenInfo = tokenInfoMap[address] || {};
      const decimals = tokenInfo.decimals || 18;
      const price = priceMap[tokenInfo.address] || "0";

      const convertedBalance = parseFloat(
        formatUnits(balance, decimals)
      ).toFixed(4); // string
      const value = (parseFloat(convertedBalance) * parseFloat(price)).toFixed(
        4
      );

      return {
        chainId: chain.id,
        network: chain.network,
        address,
        balance: convertedBalance,
        value: `${value} ${currency}`,
        symbol: tokenInfo.symbol || "UNKNOWN",
        name: tokenInfo.name || "Unknown Token",
        decimals,
        logoURI: tokenInfo.logoURI || null,
      };
    });

    result.push(...formatted);
  }

  return result;
}

async function commonCurrencies() {
  const result = [];

  for (const chain of defaultChains) {
    const res = await supportedCurrencies(chain.id);

    result.push({
      chainId: chain.id,
      network: chain.network,
      currencies: res.codes,
    });
  }

  return Array.from(getCommonCurrencies(result));
}

function getCommonCurrencies(data) {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data
    .map((chain) => new Set(chain.currencies))
    .reduce((commonSet, currencySet) => {
      return new Set(
        [...commonSet].filter((currency) => currencySet.has(currency))
      );
    });
}

module.exports = {
  allBalance,
  commonCurrencies,
};
