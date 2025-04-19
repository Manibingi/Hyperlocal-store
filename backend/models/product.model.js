const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  storeName: String,
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
});

module.exports = mongoose.model("Product", productSchema);
