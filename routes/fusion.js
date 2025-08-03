const express = require("express");
const router = express.Router();
const fusionService = require("../services/fusion.js");
const { gaslessSwapActiveOrders, getOrderByHash } = require("../1ch/fusion.js");
const Fusion = require("../models/fusionOrders.js");

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

router.get("/fusion-orders", async (req, res) => {
  try {
    const orders = await Fusion.find().sort({ _id: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error("Error fetching Fusion orders:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
