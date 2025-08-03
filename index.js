require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
const balanceRoutes = require("./routes/balance.js");
const feedRoutes = require("./routes/priceFeed.js");
const fusionRoutes = require("./routes/fusion.js");
const fusionPlusRoutes = require("./routes/fusionPlus.js");
const swapRoutes = require("./routes/swaps.js");
const gasRoutes = require("./routes/gas.js");
const tokenRoutes = require("./routes/tokenDetails");
const traceRoutes = require("./routes/traces.js");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Error MongoDB connection failed:", err);
    process.exit(1);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use("/balance/", balanceRoutes);
app.use("/feed/", feedRoutes);
app.use("/fusion/", fusionRoutes);
app.use("/fusion-plus/", fusionPlusRoutes);
app.use("/swaps/", swapRoutes);
app.use("/gas/", gasRoutes);
app.use("/tokens/", tokenRoutes);
app.use("/trace/", traceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
