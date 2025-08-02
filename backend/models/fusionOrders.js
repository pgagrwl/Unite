const mongoose = require("mongoose");

const FusionSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "gasless" },
  chainId: { type: Number, required: true },
  network: { type: String, required: true },
  orderHash: { type: String, required: true, unique: true },
  orderDetails: { type: Object, required: true },
  orderStatus: { type: [Object], required: true },
});

module.exports = mongoose.model("gaslessSwapOrders", FusionSchema);
