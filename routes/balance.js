const express = require("express");
const router = express.Router();
const balanceService = require("../services/balance.js");

router.get("/all-token-balance", async (req, res) => {
  const { address, currency } = req.query;
  const result = await balanceService.allBalance(address, currency);
  res.status(200).json({
    success: true,
    result,
  });
});

router.get("/currencies", async (req, res) => {
  const result = await balanceService.commonCurrencies();
  res.status(200).json({
    success: true,
    result,
  });
});

module.exports = router;
