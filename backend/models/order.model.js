const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  products: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  storeName: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
