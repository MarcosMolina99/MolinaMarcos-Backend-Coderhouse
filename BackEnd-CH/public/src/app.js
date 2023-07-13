import express from "express";
import productsRouter from "../router/products.router"

const app= express();
const PORT= 8080;

app.get("/",(req,res) =>{
    res.send("Hola mundo");
})

app.use("api/products", productsRouter);

app.listen(PORT, () =>{
    console.log("Servidor corriendo en el puerto" + PORT);
})