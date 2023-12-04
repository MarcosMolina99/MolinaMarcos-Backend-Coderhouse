import { CARTDAO } from "../dao/index.js";
import { TICKETDAO } from "../dao/index.js";

async function saveCart(req,res){
    const cart = req.body;
    await CARTDAO.save(cart);
    res.send(cart);
}

async function getAllCarts(req,res){
    const carts = await CARTDAO.getAll();
    res.send(carts);
}

async function getCartById(req,res){
    const cid = req.params.cid;
    const cartId = await CARTDAO.getCartById(cid);
    res.render("cart", {carts: cartId});
}

async function updateCart(req,res){
    const cid= req.user.user.user.cart;
    const pid= req.params.pid;
    const updateCart = await CARTDAO.addProductToCart(cid,pid);
    res.send(updateCart);
}

/* async function purchaseCart(req,res){
    const cid = req.params.cid;
    const cartId= await CARTDAO.getCartById(cid);
    res.render("purchaseCart", {carts: cartId});
} */

async function generatedTicket(req,res){
    const user=req.user;
    const randomCode = getRandomInt(1000, 9999); 
    
    const newTicket = {
        code:randomCode,
        purchase_datetime: new Date(),
        amount:50,
        purchaser: user.user.user.email
    }
    const ticket = TICKETDAO.newTicket(newTicket)
    res.json({status: "Success", ticket})
}
export {saveCart,getAllCarts, getCartById, updateCart, generatedTicket}