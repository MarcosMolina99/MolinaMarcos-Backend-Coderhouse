import cartProductModel from "../models/cartProduct";

export default class cartProduct{
    saveCartProduct = async (cartProduct) =>{
        const result = await cartProductModel.create(cartProduct);
        return result;
    }

    updateCartProduct = async (id,product)=>{
        const result = await cartProductModel.updateOne(id,product);
        return result;
    }
}