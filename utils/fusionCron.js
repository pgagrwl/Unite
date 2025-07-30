const cron = require("node-cron");
const mongoose = require("mongoose");
require("dotenv").config();
const { gaslessSwapActiveOrdersData } = require("../services/fusion.js");

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
  cron.schedule("*/15 * * * * *", async () => {
    try {
      await gaslessSwapActiveOrdersData();
    } catch (err) {
      console.error("Error gasless task failed:", err.message);
    }
  });
}

init().catch(console.error);
