import mongoose, { mongo } from "mongoose";

const cartCollection = "carts";

const cartsSchema = new mongoose.Schema({
    products : [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                quantity: Number,
            },
        },
    ],
})

cartsSchema.pre("findOne", function(next){
    this.populate("products.product");
    next()
})

const cartsModel = mongoose.model(cartCollection,cartsSchema);

export default cartsModel;