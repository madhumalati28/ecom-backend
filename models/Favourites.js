const mongoose = require("mongoose");

const facvouriteSchema = new mongoose.Schema({
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true,

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
});
    

const Favourite = mongoose.model("Favourite", facvouriteSchema);

module.exports = Favourite;