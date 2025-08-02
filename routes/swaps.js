const express = require("express");
const router = express.Router();
const swapService = require("../services/swaps.js");
const { bestQuote } = require("../1ch/swaps.js");

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

router.get("/tokens-list", async (req, res) => {
  const { chainId } = req.query;
  console.log(chainId);
  const result = await swapService.availableSwapTokensbyChain(chainId);
  res.status(200).json({
    success: true,
    result,
  });
});

router.get("/get-quotes", async (req, res) => {
  const { chainId, srcAsset, dstAsset, amount } = req.query;
  try {
    const result = await swapService.getQuotesList(
      chainId,
      srcAsset,
      dstAsset,
      amount
    );
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

router.get("/best-quote", async (req, res) => {
  console.log(req.query);
  const { chainId, srcAsset, dstAsset, amount } = req.query;
  try {
    const result = await bestQuote(chainId, srcAsset, dstAsset, amount);
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
