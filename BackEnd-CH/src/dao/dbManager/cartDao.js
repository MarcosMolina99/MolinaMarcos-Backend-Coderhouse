import cartsModel from "../mongo/models/carts.model.js";

export default class CartDao{
    constructor(){
        console.log(`Working in MongoDB`);
    }

    save = async(data) =>{
        const newCart = await cartsModel.create(data);
        return newCart;
    }

    getAll = async() =>{
        let cart = await cartsModel.find({}).lean();
        return cart;
    }

    getById = async(cid) =>{
        let result = await cartsModel.findById({_id: cid});
        return result;
    }

    addProduct = async(cid,pid) =>{
        try {
            const cart = await cartsModel.findOne({_id: cid});
            const exists = cart.products.some(
                (p) => String(p.product) === pid
            );

            if(!exists){
                const newProduct = {product: pid, quantity: 1};
                cart.products.push(newProduct);
                const updateCart = await cart.save();
            
                if(!updateCart){
                    console.log(("Cart not found"));
                    return null;
                }

                console.log("Cart updated", updateCart);
                return updateCart;
            }
        } catch (error) {
            throw error;
        }
    }

    isThere = async (cartId, productId) =>{
        try {
            const cart = await cartsModel.findOne({_id: cartId});
            if(cart){
                const productInCart = cart.products.some(
                    ({product}) => String(product._id) === productId
                );
                if(productInCart){
                    console.log(productInCart);
                    return productInCart;
                }else{
                    return null;
                }
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    incrementQuantity = async (cid, pid) => {
        try {
          const cart = await cartsModel.findOne({ _id: cid });
          const productIndex = cart.products.findIndex(
            (p) => String(p.product._id) === pid
          );
          if (productIndex !== -1) {
            console.log(productIndex);
            cart.products[productIndex].quantity += 1;
            const updatedCart = await cart.save();
    
            if (!updatedCart) {
              console.log("Cart not found");
              return null;
            }
    
            console.log("Cart updated", updatedCart);
            return updatedCart;
          } else {
            console.log("The product is not in the cart");
            return null;
          }
        } catch (error) {
          console.error("Can´t increase the product´s quantity", error);
          throw error;
        }
      };

    removeProduct = async (cid, pid) => {
    try {
          const cart = await cartsModel.findOne({ _id: cid });
          const updatedProducts = cart.products.filter(
            (p) => String(p.product._id) !== pid
          );
          cart.products = updatedProducts;
          const updatedCart = await cart.save();
          if (!updatedCart) {
            console.log("Cart not found");
            return null;
          }
          console.log("Cart updated", updatedCart);
          return updatedCart;
        } catch (error) {
          console.error("Error removing the product from cart", error);
          throw error;
        }
      };
    delete = async (id) => {
        const deleteCart = await cartsModel.findByIdAndDelete(id);
        return deleteCart;
      };
    
    findProductInCartAndUpdateQuantity = async (cid, pid, newQuantity) => {
    try {
          const cart = await cartsModel.findOne({ _id: cid });
          const productIndex = cart.products.findIndex(
            (p) => String(p.product._id) === pid
          );
          if (productIndex !== -1) {
            cart.products[productIndex].quantity = newQuantity;
            const updatedCart = await cart.save();
    
            if (!updatedCart) {
              console.log("Carrito no encontrado");
              return null;
            }
            console.log("Carrito actualizado");
            return updatedCart;
          } else {
            console.log("Producto no encontrado en el carrito");
            return null;
          }
        } catch (error) {
          console.error("Error al incrementar la cantidad del producto", error);
          throw error;
        }
      };


}