const mongoose = require("mongoose");

const FusionPlusSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "cross-chain" },
  srcChainId: { type: Number, required: true },
  srcNetwork: { type: String, required: true },
  dstChainId: { type: Number, required: true },
  dstNetwork: { type: String, required: true },
  orderHash: { type: String, required: true, unique: true },
  orderDetails: { type: Object, required: true },
  orderStatus: { type: [Object], required: true },
});

module.exports = mongoose.model("FusionPlusOrders", FusionPlusSchema);
