const express = require("express");
const router = express.Router();
const swapService = require("../services/swaps.js");
const { gaslessSwapActiveOrders, getOrderByHash } = require("../1ch/fusion.js");

router.get("/liquidity-sources", async (req, res) => {
  const result = await swapService.liquiditySourcesLists();
  res.status(200).json({
    success: true,
    result,
  });
});

router.get("/available-swap-tokens", async (req, res) => {
  const result = await swapService.availableSwapTokensLists();
  res.status(200).json({
    success: true,
    result,
  });
});

router.get("/trusted-spenders", async (req, res) => {
  const result = await swapService.trustedSpenderLists();
  res.status(200).json({
    success: true,
    result,
  });
});

module.exports = router;
