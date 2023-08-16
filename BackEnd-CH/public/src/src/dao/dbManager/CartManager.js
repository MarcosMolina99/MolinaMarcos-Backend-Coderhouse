import fs, { writeFile } from "fs"

class CartManager{
    static cart
    constructor(path){
        this.path= path;
        this.cart= [];
    }

    getCart= async () =>{
        try {
           let result = await fs.readFile(this.path);
           return data?.length >0 ? result : [];
        } catch (error) {
            console.log(error);
        }
    }

    addCart= async () =>{
        try {
            this.cart = await this.getCart();
            this.cart.push({
                id: this.carritos.length ? this.carritos.length : 0,
                products: [],
              });
            fs.writeFile(this.path, this.cart);
        } catch (err) {
            console.log(err);
        }
    }

    getCartById= async (id) =>{
        this.cart= await this.getCart(id);
        const idCart= this.cart.find((cart)=>cart.id === id);

        if(!idCart){
            console.log("This id does not exist");
        }
        return this.cart;
    }

    addProductToCart= async (idCart,idProduct) =>{
        let cartData= await fs.promises.readFile(this.path, "UTF-8");
        let parseCart= JSON.parse(cartData);
        let cart= parseCart.find((cart) =>cart.id === parseInt(idCart));

        if(cart){
            const indexProduct= cart.products.findIndex((product)=>product.id === idProduct);
            if(indexProduct !== -1){
                cart.products[indexProduct].quantity++;
                const indexCart= parseCart.findIndex((cart)=>cart.id === parseInt(idCart));
                parseCart[indexCart] = cart;

                await fs.promises.writeFile(this.path, JSON.stringify(parseCart));
            }else{
                let product= {id: idProduct, quantity: 1};
                cart.products.push(product);
                parseCart.push(cart);

                await fs.promises.writeFile(this.path, JSON.stringify(parseCart));
            }
        }else{
            console.log("Cart not found");
        }
        


    }
}
export default CartManager;