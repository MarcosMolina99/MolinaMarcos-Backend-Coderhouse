import {Router} from "express";
import { getAllProducts } from "../src/services/productUtils";

const realTimeProducts= Router();

realTimeProducts.get("/", (req,res) =>{
    const products= getAllProducts();
    res.render(realTimeProducts, {products});
})

export default realTimeProducts;