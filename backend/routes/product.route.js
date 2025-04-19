const express = require("express");
const { getProductsByStore } = require("../controllers/product.controller");

const router = express.Router();

router.get("/store/:storeId", getProductsByStore);

module.exports = router;
