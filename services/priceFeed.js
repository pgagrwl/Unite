const { allTokenBalance } = require("../1ch/balance.js");
const { tokenData } = require("../1ch/token.js");
const { priceList } = require("../1ch/spotPrice.js");
const { tokenDetails } = require("../1ch/tokenDetails.js");
const bn = require("@ethersproject/bignumber");

async function priceData(chain, currency) {
  let results = [];
  let sorted = [];
  const res = await priceList(chain, currency);
  // console.log("priceList res", res);

  const tokenAddresses = Object.keys(res);
  for (let i = 0; i < tokenAddresses.length; i++) {
    const result = res[tokenAddresses[i]];
    if (result > 0) {
      results.push({
        address: tokenAddresses[i],
        price: result,
      });
    }
  }
  sorted = results.sort((a, b) => b.price - a.price);
  const tokenDataRes = await tokenData(chain, tokenAddresses);
  const data = sorted.map((item) => {
    const tokenInfo = tokenDataRes[item.address];
    // const price = priceData[item.address];
    return {
      address: item.address,
      price: item.price,
      name: tokenInfo?.name,
      symbol: tokenInfo?.symbol,
      decimals: tokenInfo?.decimals,
      value: `${new bn(item.balance)
        .dividedBy(Math.pow(10, tokenInfo.decimals))
        .multipliedBy(price)
        .toFixed(2)} ${currency}`,
      logoURI: tokenInfo?.logoURI,
    };
  });
  return data;
}

module.exports = {
  priceData,
};
