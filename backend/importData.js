const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Store = require("./models/store.model");
const Product = require("./models/product.model");
const storesData = require("../sample-data/stores.json");
const productsData = require("../sample-data/products.json");

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Store.deleteMany();
    await Product.deleteMany();

    await Store.insertMany(storesData);
    await Product.insertMany(productsData);

    console.log("Sample data imported.");
    process.exit();
  } catch (err) {
    console.log("error importing data", err);
    process.exit(1);
  }
};

importData();
