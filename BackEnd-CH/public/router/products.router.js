import express from "express"
import { Router } from "express";
import {ProductManager} from "../src/classes/ProductManager.js"

const router= Router();
let products= [];

const productManager= new ProductManager("products.json");

router.get("/", async (req,res)=> {
    const {limit} = req.query;
    try {
        let response= await productManager.getProducts();
        if(limit){
            let tempArray= response.filter((dat, index) => index < limit)
            res.json({data: tempArray, limit: limit, quantity: tempArray.length});
        }else{
            res.json({data: response, limit: false, quantity: response.length})
        }
    } catch (error) {
        console.log(error);
    }
})
router.post("/", async (req,res) =>{
    const {title, description, code, price, status, stock,category, 
    thumbnails} = req.body;
    const product= {};
    if(!title || !description || !code || !price || !stock || !category){
        res.json({message: "Data missing"});
    }else{
        product.title= title;
        product.description= description;
        product.code= code;
        product.price= price;
        product.status= !status || typeof status !== "boolean" ? true: status;
        product.category= category;
        product.thumbnails= !thumbnails ? "" : thumbnails;

        try {
            const response= await productManager.addProduct(product);
            res.json({message: "Product added", data: response});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Server error"});
        }
    }
})
router.put("/:pid", async (req,res) =>{
    const {pid} = req.params;
    const {title, description, code, price, status, stock,category, 
        thumbnails} = req.body;
    const tempProduct= {};
    let product= await productManager.getProductById(parseInt(pid));
    if(product){
        if(!title, !description, !code, !price, !status, !stock, !category,
            !thumbnails){
                res.json({message: "missing data"})

            }
            tempProduct.title= title;
            tempProduct.description= description;
            tempProduct.code= code;
            tempProduct.price= price;
            tempProduct.status= status;
            tempProduct.category= category;
            tempProduct.thumbnails= thumbnails;

            let result= await productManager.updateProductById(parseInt(pid), tempProduct);
            res.json({message: "product updated", data: result});
    }else{
        res.json({message: "The product can´t be updated"});

    }
})
router.delete("/pid", async (req,res) =>{
    const {pid}= req.params;
    let product= await productManager.getProductById(parseInt(pid));
    if(!product){
        res.json({message: "The product does not exist"});
    }
    else{
        let result= await productManager.deleteProductById(parseInt(pid));
        res.json({message: "Product deleted", data: result});
    }
})
export default router;