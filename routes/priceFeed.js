const express = require("express");
const router = express.Router();
const priceService = require("../services/priceFeed.js");

router.get("/price-data", async (req, res) => {
  const { chainId, currency } = req.query;
  const result = await priceService.priceData(chainId, currency);
  res.status(200).json({
    success: true,
    result,
  });
});

module.exports = router;
