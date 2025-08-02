const cron = require("node-cron");
const mongoose = require("mongoose");
require("dotenv").config();
const { crossChainSwapActiveOrdersData } = require("../services/fusionPlus.js");

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

async function init() {
  cron.schedule("*/60 * * * * *", async () => {
    try {
      await crossChainSwapActiveOrdersData();
    } catch (err) {
      console.error("Error crossChain task failed:", err.message);
    }
  });
}

init().catch(console.error);
