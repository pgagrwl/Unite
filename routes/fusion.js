const express = require("express");
const router = express.Router();
const fusionService = require("../services/fusion.js");
const { gaslessSwapActiveOrders, getOrderByHash } = require("../1ch/fusion.js");

router.get("/settlement-addresses", async (req, res) => {
  const result = await fusionService.settlementAddressLists();
  res.status(200).json({
    success: true,
    result,
  });
});

router.get("/active-orders", async (req, res) => {
  const { chainId } = req.query;
  const result = await gaslessSwapActiveOrders(chainId);
  res.status(200).json({
    success: true,
    result,
  });
});

router.post("/order-status", async (req, res) => {
  const { chainId, orderHash } = req.query;

  try {
    const result = await getOrderByHash(chainId, orderHash);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order status",
      error: error.message,
    });
  }
});

module.exports = router;
