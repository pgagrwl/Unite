const express = require("express");
const router = express.Router();
const { nativeDetails, tokenDetails } = require("../1ch/tokenDetails");

router.get("/native-token-data", async (req, res) => {
  const { chainId } = req.query;
  const result = await nativeDetails(chainId);
  res.status(200).json({
    success: true,
    result,
  });
});

router.get("/token-data", async (req, res) => {
  const { chainId, contractAddress, provider } = req.query;
  const result = await tokenDetails(chainId, contractAddress, provider);
  res.status(200).json({
    success: true,
    result,
  });
});

module.exports = router;
