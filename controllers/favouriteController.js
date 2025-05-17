const Favourite = require("../models/Favourites");
const Product = require("../models/product");

const addToFavourites = async (req, res) => {
    try{
        const { productId }  = req.body;

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
                message:"Product not found",
            });
        }
        const existingItem = await Favourite.findOne({
            product:product._id,
            user:req.user.userId,
        });
        if(existingItem){
            return res.status(400).json({
                message: "Product alraedy added to favourite",
            });
        }
        await Favourite.create({
            product: product._id,
            user: req.user.userId,
            quantity:1,
        });

        res.status(200).json({
            message: "Product added to Favourites successfully",
        });
    }catch(error){
            console.log("Error:",error.message);
            res.status(500).json({
                message:"server error",
            });
        } 
    };
const getFavourites = async (req,res) =>{
    try{
        const favourites = await Favourite.find({ user:req.user.userId}).populate(
            "product"
        );
        res.status(200).json(favourites);

    }catch(error){
            console.log("Error:",error.message);
            res.status(500).json({
                message:" Internal server error",
            });
        } 
};


    
const removeFavourites = async (req,res) => {
    try{
        const {id} =req.params;
        const item = await Favourite.findByIdAndDelete(id);

        if(!item){
            return res.staatus(404).json({
                message:"Product not found in favourites",
            });
        }
        res.status(200).json({
            message:"Product removed from Favourite",
        });
    }catch(error){
            console.log("Error:",error.message);
            res.status(500).json({
                message:" Internal server error",
            });
        }         
    }
module.exports = { addToFavourites, getFavourites ,removeFavourites};