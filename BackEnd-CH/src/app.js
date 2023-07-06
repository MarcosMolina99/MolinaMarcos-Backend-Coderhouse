import express from "express";
import {ProductManager} from "../index.js"

const app= express();
const PORT= 8080;
const productManager= new ProductManager()

app.get("/",(req,res) =>{
    res.send("Hola mundo");
})

app.get("/products", async (req,res)=> {
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

app.get("/products/:pid", async (req,res) =>{
    const {pid} = req.params;

    let product= await productManager.getProductById(parseInt(pid));

    if(pid){
        res.json({message: "success", data: product})
    }else{
        res.json({message: "The product doesn´t exist"});
    }
})

app.listen(PORT, () =>{
    console.log("Servidor corriendo en el puerto" + PORT);
})