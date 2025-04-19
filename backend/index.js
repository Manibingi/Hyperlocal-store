const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const storeRoutes = require("./routes/store.route");
const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/order.route");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
