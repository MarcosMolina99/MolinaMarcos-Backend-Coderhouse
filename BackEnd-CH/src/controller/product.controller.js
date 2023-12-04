import {PRODUCTDAO} from "../dao/index.js"
import { faker } from "@faker-js/faker"
import ProductRepository from "../repositories/product.repository.js"
import UserRepository from "../repositories/user.repository.js"
import { productService, userService } from "../repositories/services.js"
import productsModel from "../dao/mongo/models/products.model.js"

async function createProduct(req,res){
    try {
        const data  = req.body;
        const user= req.user;
        if(!data || !data.name || !data.description || !data.category || !data.availability || !data.price){
            console.log("Invalid data");
        }
        await productService.createProduct(data);
        res.send(data);
    } catch (error) {
        console.log("Error");
        res.status(500)
    }
}

async function getProducts(req,res){
    try {
        const getAll = await productService.getAllProducts(req,res)
        res.json({status: "Success", getAll});
    } catch (error) {
        console.log("Error getting the products");
        res.status(500)
    }
}

async function deleteProduct(req,res){
    const {pid} =req.params;
    const {user} = req;
    try {
        const product = await productService.getProductById(pid);
        if(user.user.user.role === "admin"){
            const productDeleted = productService.deleteProduct(pid);
            res.send(productDeleted)
        }
    } catch (error) {
        console.log("Error deleting the product");
    }
}

async function updateProduct(req,res){
    try {
            const {pid} =req.params;
            const {title,description,thumbnail,code,price,stock,category} = req.body;
            if(!title || !description || !thumbnail || !code || !price || !stock || !category){
                console.log("Missing data");
            }else{
                const productUpdated = {title,description,thumbnail,code,price: +price,stock: +stock,category, status: true}
                const response = await productService.updateProduct(pid, productUpdated);
                res.json({status: "Success" ,response});
            }
    } catch (error) {
        console.log("Error updating the product");
    }
}

async function getProductById(req,res){
    try {
        const {pid} = req.params;
        const product = await productService.getProductById(pid)
        res.json({status: "Success", product})
    } catch (error) {
        console.log("Error getting the product by its id");
    }
}

export {getProductById,getProducts,deleteProduct,updateProduct,createProduct}