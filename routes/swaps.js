const express = require("express");
const router = express.Router();
const swapService = require("../services/swaps.js");
const { quotes } = require("../1ch/swaps.js");

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

router.get("/quotes", async (req, res) => {
  const { chainId, srcAsset, dstAsset, amount, protocol } = req.query;
  try {
    const result = await quotes(chainId, srcAsset, dstAsset, amount, protocol);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching quotes",
      error: error.message,
    });
  }
});

module.exports = router;
