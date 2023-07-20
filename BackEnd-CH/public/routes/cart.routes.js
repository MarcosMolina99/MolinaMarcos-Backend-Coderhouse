import express from "express"
import { Router } from "express"
import CartManager from "../src/models/CartManager";

const router= Router();

const firstCart= new CartManager("./cart.json");
router.use(express.json());

router.get("/:cid", async (req,res) =>{
    const {cid} = req.params;
    try {
        let cart= await firstCart.getCartById(parseInt(cid));
        res.json({message: "Cart status 200", data: cart})
    } catch (error) {
        res.json({message: "Error getting the products from the cart"});
        res.status(400);
    }
})

router.post("/", async (req,res) =>{
    try {
        await firstCart.addCart();
        res.json({message: "Cart created succesfuly"})
    } catch (error) {
        res.json({error: "Error creating the cart"});
        res.status(400);
    }
})


router.post("/:cid/:product/:pid", async (req,res) =>{
    try {
        let product= await firstCart.getCartById(parseInt(req.params.pid));
        await firstCart.addProductToCart(req.params.cid, product.id);
        res.json({message: "Product added to the cart succesfuly"})
    } catch (error) {
        res.status(400);
        res.json({error: "Error uploading the product to the cart"});
    }
})

