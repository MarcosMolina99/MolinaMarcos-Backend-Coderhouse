import { Router } from "express";
import { getAllProducts } from "../src/services/productUtils";

const views= Router();

views.get("/", (req,res) =>{
    const products= getAllProducts();
    res.render("views", {products});
})

export default views;