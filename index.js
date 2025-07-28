require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
const balanceRoutes = require("./routes/balance.js");
const feedRoutes = require("./routes/priceFeed.js");
const fusionRoutes = require("./routes/fusion.js");
const swapRoutes = require("./routes/swaps.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/balance/", balanceRoutes);
app.use("/feed/", feedRoutes);
app.use("/fusion/", fusionRoutes);
app.use("/swaps/", swapRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
