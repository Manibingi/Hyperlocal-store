const Order = require("../models/order.model");

exports.placeOrder = async (req, res) => {
  try {
    const { customerName, products, total, storeName } = req.body;
    const order = new Order({ customerName, products, total, storeName });
    await order.save();
    res.status(201).json({ message: "Order Placed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
};
