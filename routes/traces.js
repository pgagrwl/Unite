const express = require("express");
const router = express.Router();
const traceService = require("../services/traces.js");

router.get("/blocks-data", async (req, res) => {
  const result = await traceService.syncedBlocks();
  res.status(200).json({
    success: true,
    result,
  });
});

module.exports = router;
