const Product = require("../models/product.model");
const Store = require("../models/store.model");

// exports.getProductsByStore = async (req, res) => {
//   try {
//     // const { storeId } = req.params;
//     const products = await Product.find({ storeId: req.params.storeId });
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// };

exports.getProductsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    // Get the store name using storeId
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ error: "Store not found" });

    // Find products by storeName (since your data uses it)
    const products = await Product.find({ storeName: store.name });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
