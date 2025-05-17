const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { addToCart,getCart,
    upadateCartItem,
    deleteCartItem} = require("../controllers/cartItemController");

const CartItemRoutes = express.Router();

CartItemRoutes.post("/",protect,addToCart);
CartItemRoutes.get("/",protect,getCart);
CartItemRoutes.put("/:id",protect,upadateCartItem);
CartItemRoutes.delete("/:id",protect,deleteCartItem);
module.exports = CartItemRoutes;