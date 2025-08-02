const express = require("express");
const router = express.Router();
const fusionPlusService = require("../services/fusionPlus.js");
const {
  crossChainSwapActiveOrders,
  escrowAddress,
  orderStatus,
} = require("../1ch/fusion+orders.js");

router.get("/escrow-addresses", async (req, res) => {
  const result = await fusionPlusService.escrowAddressLists();
  res.status(200).json({
    success: true,
    result,
  });
});

router.get("/active-orders", async (req, res) => {
  const { srChainId, dstChainId } = req.query;
  const result = await gaslessSwapActiveOrders(srChainId, dstChainId);
  res.status(200).json({
    success: true,
    result,
  });
});

router.get("/order-status", async (req, res) => {
  const { chainId, orderHash } = req.query;
  const result = await getOrderByHash(chainId, orderHash);
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
