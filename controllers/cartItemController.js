const CartItem = require("../models/cartItem");
const Product = require("../models/product");

const addToCart = async (req, res) => {
    try{
        const { productId }  = req.body;

        const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
                message:"Product not found",
            });
        }
        const existingItem = await CartItem.findOne({
            product:product._id,
            user:req.user.userId,
        });
        if(existingItem){
            return res.status(400).json({
                message: "Product alraedy available in cart",
            });
        }
        await CartItem.create({
            product: product._id,
            user: req.user.userId,
            quantity:1,
        });

        res.status(200).json({
            message: "Product added to cart successfully",
        });
    }catch(error){
            console.log("Error:",error.message);
            res.status(500).json({
                message:"server error",
            });
        } 
    };
const getCart = async (req,res) =>{
    try{
        const cartItems = await CartItem.find({ user:req.user.userId}).populate(
            "product"
        );
        res.status(200).json(cartItems);

    }catch(error){
            console.log("Error:",error.message);
            res.status(500).json({
                message:"server error",
            });
        } 
};
const upadateCartItem = async (req,res) => {
    try{
        const { id } =req.paramas;
        const { quantity } = req.body;

        const item= await CartItem.findByIdAndUpdate(
            id,
            { quantity },
            {new : true}
        );
        if(item){
            return res.staatus(404).json({
                message:"Product not found in cart",
            });
        }
        res.status(200).json({
            message:"Product quatity upadated",
        });

    }catch(error){
            console.log("Error:",error.message);
            res.status(500).json({
                message:" Internal server error",
            });
        } 
};
const deleteCartItem = async (req,res) => {
    try{
        const {id} =req.params;
        const item = await CartItem.findByIdAndDelete(id);

        if(!item){
            return res.staatus(404).json({
                message:"Product not found in cart",
            });
        }
        res.status(200).json({
            message:"Product removed from cart",
        });
    }catch(error){
            console.log("Error:",error.message);
            res.status(500).json({
                message:" Internal server error",
            });
        }         
    }
module.exports = { addToCart, getCart,upadateCartItem,deleteCartItem};
