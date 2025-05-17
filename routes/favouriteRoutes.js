const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { addToFavourites, getFavourites ,removeFavourites} = require("../controllers/favouriteController");

const favouriteRoutes = express.Router();

favouriteRoutes.post("/",protect,addToFavourites);
favouriteRoutes.get("/",protect,getFavourites);
favouriteRoutes.delete("/:id",protect,removeFavourites);
module.exports = favouriteRoutes;