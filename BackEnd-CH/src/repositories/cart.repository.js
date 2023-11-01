export default class CartRepository{
    constructor(dao){
        this.dao = dao;
    }

    createCart = (cart) =>{
        return this.dao.save(cart);
    };

    getAllCarts = () =>{
        return this.dao.getAll();
    }

    getCartById = (cid) =>{
        return this.dao.getById(cid);
    };

    addProductToCart = (cid,pid) =>{
        return this.dao.addProduc(cid,pid);
    };

    isProductInCart = (cid,pid) =>{
        return this.dao.isThere(cid,pid);
    };

    incrementProductQuantity = (cid,pid) =>{
        return this.dao.incrementQuantity(cid,pid);
    };

    removeProductFromCart = (cid,data) =>{
        return this.dao.removeProduct(cid,data);
    };

    deleteCart = (cid) =>{
        return this.dao.delete(cid);
    }
}