import { Router } from "express";
import CartsModel from "../src/dao/models/carts";
import ProductsModel from "../src/dao/models/products";
import cartProductModel from "../src/dao/models/cartProduct";

const router= Router();

router.post("/",async (req,res) =>{
    const carrito = {
        products: []
    }
    let result = await CartsModel.insertMany([carrito]);
    return res.json({message: "Cart created successfully", data: result});
})

router.get("/:cid", async(req,res) =>{
    const {cid} = req.params;
    let result = await CartsModel.findOne({_id: cid})
    return res.json({message: "Cart selected", data: result});
})

router.post("/:cid/product/:pid", async(req,res)=>{
    const {cid,pid} =req.params;
    let cart= await CartsModel.findOne({_id:cid});

    if(cart){
        const productInCart = cart.products.find(product=>product.id === pid)
        if(productInCart){
            productInCart.quantity++;
        }else{
            const product= await ProductsModel.findById(pid);
            cart.products.push({
                product: product._id,
                quantity: 1
            })

        }
        const result = await cart.save(); 
        return res.json({message:"Product added", data: result})
    }else{
        return res.status(404).json({message: "Error in cart"})
    }
})

router.delete("/:cid/products/:pid", async(req,res)=>{
    const {cid,pid}= req.params;
    let cart= await CartsModel.findOne({_id: cid});

    let products = cart.products
    let producto = products.findIndex((product)=>producto.product.id === pid)
    if(producto !== -1){
        products.splice(producto,1);
        let result = await CartsModel.findByIdAndUpdate(cid,carrito)
        return res.json({message: "Product deleted", data: result})
    }else{
        return res.status(404).json({message: "Product not found"})
    }
})

router.put("/:cid/products/:pid", async(req,res) =>{
    const {cid,pid} = req.params;
    const {quantity} =req.body;
    let cart = await CartsModel.findOne({_id,cid});
    let products = cart.products
    let producto = products.findIndex((producto) =>producto.product.id === pid);
    if(producto !== -1){
        products[producto].product.quantity = quantity;
        let result = await CartsModel.findByIdAndUpdate(cid,cart)
        return res.json({message: "Loaded", data: result})
    }else{
        return res.status(404).json({message: "Product not found"})
    }
})

router.put("/:cid", async(req,res) =>{
    const {cid} =req.params;
    const {data}= req.body;

    let cart = await CartsModel.findById(cid);

    cart.products= data;
    let result = await CartsModel.findByIdAndUpdate(cid,cart);
    return res.json({message: "Cart updated", data: result})
})

router.delete("/:cid",async (req,res) =>{
    const {cid} = req.params;
    let cart= await CartsModel.findById(cid)
    cart.products= [];
    let result = await CartsModel.findByIdAndUpdate(cid,cart);
    return res.json({message: "Cart emptied", data: result})
})

export default router;