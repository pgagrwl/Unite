const { allTokenBalance } = require("../1ch/balance.js");
const { tokenData } = require("../1ch/token.js");
const { priceList } = require("../1ch/spotPrice.js");
const BigNumber = require("bignumber.js");

async function allBalance(address, chain, currency) {
  const balances = await allTokenBalance(address, chain);

  const nonZeroTokens = Object.entries(balances)
    .filter(([_, balance]) => balance > 0)
    .map(([tokenAddress, balance]) => ({ address: tokenAddress, balance }));

  const sortedTokens = nonZeroTokens.sort((a, b) => b.balance - a.balance);
  const tokenAddresses = sortedTokens.map((token) => token.address);

  const [tokenInfoMap, priceMap] = await Promise.all([
    tokenData(chain, tokenAddresses),
    priceList(chain, currency),
  ]);

  const result = sortedTokens.map(({ address, balance }) => {
    const tokenInfo = tokenInfoMap[address] || {};
    const decimals = tokenInfo.decimals || 18;
    const price = priceMap[address] || 0;

    const convertedBalance = new BigNumber(balance).dividedBy(10 ** decimals);
    const value = convertedBalance.multipliedBy(price);

    return {
      address,
      balance: convertedBalance.toFixed(4),
      name: tokenInfo.name,
      symbol: tokenInfo.symbol,
      decimals,
      value: `${value.toFixed(2)} ${currency}`,
      logoURI: tokenInfo.logoURI,
    };
  });

  return result;
}

module.exports = {
  allBalance,
};
