const defaultChains = require("../utils/chains.js");
const {
  settlementAddress,
  gaslessSwapActiveOrders,
  getOrderByHash,
} = require("../1ch/fusion.js");
const Fusion = require("../models/fusionOrders.js");

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

async function gaslessSwapActiveOrdersData() {
  for (const chain of defaultChains) {
    try {
      const response = await gaslessSwapActiveOrders(chain.id);
      const items = response?.items || [];

      if (items.length === 0) {
        console.log(`Skipped: No active orders on ${chain.network}`);
        await sleep(1000);
        continue;
      }

      for (const item of items) {
        const { orderHash } = item;
        if (!orderHash) {
          console.warn(`Skipped item without orderHash (${chain.network})`);
          continue;
        }

        try {
          const latestStatus = await getOrderByHash(chain.id, orderHash);
          const existing = await Fusion.findOne({ orderHash });

          if (!existing) {
            await Fusion.create({
              chainId: chain.id,
              network: chain.network,
              orderHash,
              orderDetails: item,
              orderStatus: [latestStatus], // wrap in array on create
            });
            console.log(`Inserted: ${orderHash} (${chain.network})`);
          } else {
            const previousStatus =
              existing.orderStatus?.[existing.orderStatus.length - 1];

            if (
              latestStatus?.status &&
              latestStatus.status !== previousStatus?.status
            ) {
              await Fusion.updateOne(
                { orderHash },
                { $push: { orderStatus: latestStatus } }
              );
              console.log(
                `Status changed → pushed: ${orderHash} (${chain.network})`
              );
            } else {
              console.log(`No status change: ${orderHash} (${chain.network})`);
            }
          }
        } catch (err) {
          console.error(
            `Error processing ${orderHash} (${chain.network}):`,
            err.message
          );
        }
      }
    } catch (fetchErr) {
      console.error(`Error for ${chain.network}:`, fetchErr.message);
      await sleep(2000);
    }
    await sleep(1500);
  }
}

module.exports = {
  settlementAddressLists,
  gaslessSwapActiveOrdersData,
};
