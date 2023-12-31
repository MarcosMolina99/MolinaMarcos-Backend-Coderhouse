import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema= new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean
    },
    category: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
})

const productsModel = mongoose.model(productsCollection,productsSchema);

export default productsModel;