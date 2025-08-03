const express = require("express");
const router = express.Router();
const gasService = require("../services/gas.js");

router.get("/gas-prices", async (req, res) => {
  const { currency } = req.query;
  const result = await gasService.gasPriceLists(currency);
  res.status(200).json({
    success: true,
    result,
  });
});

router.get("/gas-price", async (req, res) => {
  const { chainId, currency } = req.query;
  const result = await gasService.gasPriceByChain(chainId, currency);
  res.status(200).json({
    success: true,
    result,
  });
});

module.exports = router;
