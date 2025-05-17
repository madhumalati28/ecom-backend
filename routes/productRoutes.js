const express = require("express");
const{
    getAllProducts,
    getProductById,
    upadateProduct,
    deleteProduct,
    createProduct,
} = require("../controllers/productController");
const { create } = require("../models/product");

const productRoutes = express.Router();


productRoutes.get("/", getAllProducts)

productRoutes.get("/:productId", getProductById)
productRoutes.get("/:productId", getProductById)
productRoutes.post("/", createProduct)


productRoutes.put("/:productId", upadateProduct)
productRoutes.get("/:productId", deleteProduct)

module.exports = productRoutes;