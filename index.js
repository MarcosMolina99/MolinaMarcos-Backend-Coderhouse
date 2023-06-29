
import { log } from "console";
import files from "./files.js";

class ProductManager { //clase
    #path
    #products
    #id
    constructor() { 
      this.#path= this.#path;
      this.#products= [];
      this.#id= this.#id;
    }
  
    async addProduct({ title, description, price, thumbnail, code, stock }) {
      constructor();
      const ifExists = this.ifExists("code", code);
      if (ifExists){
        console.log("The code already exists");
      }
  
      if (title.length === 0 || description.length === 0 || price.length === 0 || thumbnail.length === 0 || code.length === 0 || stock.length === 0){
        console.log("Every field must be completed");
      }
      this.#products.push({
        id: this.#id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      });
      try {
        await files.writeFile(this.#path, this.#products)
      } catch (error) {
        console.log("Error writing the product");
      }
      
    }
  
    async getProducts() {
      try {
        const data= await files.readFile(this.#path)
        return data;
        
      } catch(err) {
        console.log("Error getProducts");
      }
    }
  
    async getProductById(id) {
      const product = this.#products.find(product => product.id === id);
      let data = await files.readFile(this.#path)
      this.#products = data?.length > 0 ? data : [];
      
        if(isNaN(id)){
            return product;
        }
        if (!product){
            console.log("The product does not exist");
        }
      return product;
    }
  
    ifExists(key, value) {
      return this.#products.find(product => product[key] === value)
    };

    async deleteProductById(id){
      try{
        let products = await files.readFile(this.#path);
        this.#products = products?.length > 0 ? products : [];
        let productIndex= this.#products.findIndex((dato)=>dato.id === id)
        if(productIndex !== -1){
          let product= this.#products[productIndex];
          this.products.splice(productIndex,1);
          await files.writeFile(this.#path,products)
          return {message: "The product has been eliminated", product};
        }else{
          return {message: "The product does not exist"}
        }
      }catch(err){
        console.log(err);
      }
      
    }

    async updateProductById(id, data){
      try{
        let product= await files.readFile(this.#path);
        this.products = products?.length > 0 ? products : [];
        let productIndex= this.#products.findIndex((dato)=>dato.id === id)
        if(!productIndex){
          console.log("Product not found");
        }else{
          productIndex = {...productIndex, data}
          let newUpdate= product.filter(productId => productId.id !== id)
          newUpdate= [...newUpdate, productIndex];
          await files.writeFile(this.#path,JSON.stringify(newUpdate));
          console.log("The update has been made");
        }
      }catch(err){
        console.log(err);
      }
    }


  }
  
  const item = {
    title: 'product',
    description: 'new testing product',
    price: 50,
    thumbnail: 'No image',
    code: 'qwe987',
    stock: 10
  };
  
  const product = new ProductManager();
  console.log(product.getProducts());
  product.addProduct(item);
   product.addProduct(item);
  console.log(product.getProducts());
  product.addProduct(item);
  console.log(product.getProductById(1))