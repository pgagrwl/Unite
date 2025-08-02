const defaultChains = require("../utils/chains.js");
const {
  escrowAddress,
  crossChainSwapActiveOrders,
  orderStatus,
} = require("../1ch/fusion+orders.js");
const fs = require("fs");
const path = require("path");
const PROGRESS_FILE = path.resolve(__dirname, "combinationIndex.json");
const FusionPlus = require("../models/fusionPlusOrders.js");

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

function generateCombinations() {
  const combinations = [];
  for (const src of defaultChains) {
    for (const dst of defaultChains) {
      if (src.id !== dst.id) {
        combinations.push({
          srcNetwork: src.network,
          srcChainId: src.id,
          dstNetwork: dst.network,
          dstChainId: dst.id,
        });
      }
    }
  }
  return combinations;
}

function loadLastIndex() {
  try {
    const data = fs.readFileSync(PROGRESS_FILE, "utf-8");
    return JSON.parse(data).index || 0;
  } catch {
    return 0;
  }
}

function saveLastIndex(index) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ index }), "utf-8");
}

async function processCombination(combo) {
  const { srcNetwork, srcChainId, dstNetwork, dstChainId } = combo;

  try {
    const response = await crossChainSwapActiveOrders(srcChainId, dstChainId);
    const items = response?.items || [];

    if (items.length === 0) {
      console.log(`No orders: ${srcNetwork} → ${dstNetwork}`);
    } else {
      for (const item of items) {
        const { orderHash } = item;
        if (!orderHash) {
          console.warn(
            `Skipped item without orderHash for: ${srcNetwork} → ${dstNetwork}`
          );
          continue;
        }

        try {
          const latestStatus = await orderStatus(orderHash);
          const existing = await FusionPlus.findOne({ orderHash });

          if (!existing) {
            await FusionPlus.create({
              srcChainId: srcChainId,
              srcNetwork: srcNetwork,
              dstChainId: dstChainId,
              dstNetwork: dstNetwork,
              orderHash,
              orderDetails: item,
              orderStatus: [latestStatus], // wrap in array on create
            });
            console.log(
              `Inserted: ${orderHash} for: ${srcNetwork} → ${dstNetwork}`
            );
          } else {
            const previousStatus =
              existing.orderStatus?.[existing.orderStatus.length - 1];

            if (
              latestStatus?.status &&
              latestStatus.status !== previousStatus?.status
            ) {
              await FusionPlus.updateOne(
                { orderHash },
                { $push: { orderStatus: latestStatus } }
              );
              console.log(`Status changed → pushed: ${orderHash}`);
            } else {
              console.log(`No status change: ${orderHash}`);
            }
          }
        } catch (err) {
          console.error(
            `Error processing ${orderHash} for: ${srcNetwork} → ${dstNetwork}:`,
            err.message
          );
        }
      }
    }
  } catch (err) {
    console.error(`Error ${srcNetwork} → ${dstNetwork}: ${err.message}`);
  }
}

async function crossChainSwapActiveOrdersData() {
  const combinations = generateCombinations();
  const total = combinations.length;

  let index = loadLastIndex();
  const batchSize = 60;
  const batch = [];

  for (let i = 0; i < batchSize; i++) {
    batch.push(combinations[index]);
    index = (index + 1) % total;
  }

  for (let i = 0; i < batch.length; i++) {
    console.log(`(${i + 1}/${batch.length}) Processing combo...`);
    await processCombination(batch[i]);
    if (i < batch.length - 1) await sleep(1000);
  }

  saveLastIndex(index);
  console.log(`Batch completed. Next start index: ${index}`);
}

module.exports = {
  escrowAddressLists,
  crossChainSwapActiveOrdersData,
};
