import express from "express"
import { Router } from "express"
import CartManager from "../src/models/CartManager";
import { generateToken, passportCall } from "../../public/utils";
import { isUser } from "./middlewares";
import { getCartById, getlAllCarts, saveCart, updateCart, generatedTicket } from "../controller/cart.controller";
const router= Router();

const firstCart= new CartManager("./cart.json");
router.use(express.json());

router.get("/", passportCall("jwt"),isUser,getlAllCarts);
router.post("/",passportCall("jwt"),isUser,saveCart);
router.get("/:cid", passportCall("jwt"),isUser,getCartById);
router.post("/:cid/product/:pid", passportCall("jwt"),isUser,updateCart);
router.post("/:cid/purchase/",passportCall("jwt"),isUser,generatedTicket);

/* router.get("/:cid", async (req,res) =>{
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
}) */

router.delete("/:cartId/:productId", (req,res)=>{
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    try {
        const success = firstCart.removeFromCart(cartId,productId);
        if(success){
            res.status(200).json({message: "Product deleted from cart"});
        }else{
            res.status(404).json({message: "Product not found to delete"});
        }
    } catch (error) {
        res.status(500).json({message: "Error deleting the product from cart", error: error});
    }
})
router.put("/:cid", async (req,res) =>{
    const cartId = req.params.cid;
    const productToAdd = req.body.products;
    try {
        const cart = await firstCart.getById(cartId);
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }
        cart.products = cart.products.concat(productToAdd);
        await cart.save();

        res.status(200).json({message: "Products added to cart", cart: cart});
    } catch (error) {
        res.status(500).json({message: "Error adding products to cart", error: error});
    }
})

router.delete("/:cid", async(req,res) =>{
    const cartId = req.params.cid;
    try {
        const cart = await firstCart.getById(cartId);
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }
        cart.products= [];
        await cart.save();
        res.status(200).json({message: "All products were deleted from the cart", cart: cart});
    } catch (error) {
        res.status(500).json({message: "Error deleting all the product from the cart", error: error});
    }
})

router.put("/:cid/updateQuantity/:productId", async(req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.productId;
    const newQuantity = req.body.quantity;

    try {
        const cart = await firstCart.getById(cartId);
        if(!cart){
            return res.status(404).json({message: "The cart does not exist"});
        }
        const productUpdated = await firstCart.findProductInCartAndUpdateQuantity(cartId,productId,newQuantity);
        await cart.save();
        res.status(200).json({message: "Quantity updated", cart: cart});
    } catch (error) {
        res.status(500).json({message: "Error updating quantity", error: error});
    }
})
