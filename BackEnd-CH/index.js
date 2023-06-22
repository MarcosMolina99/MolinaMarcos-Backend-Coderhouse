class ProductManager { //clase

    #products //array
    #id
  
    constructor() { 
      this.#id = 1;
      this.#products = [];
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      constructor();
      const ifExists = this.ifExists("code", code); //en una constante aquello que existe
  
      if (ifExists){
        console.log("The code already exists");
      }
  
      if (title.length === 0 || description.length === 0 || price.length === 0 || thumbnail.length === 0 || code.length === 0 || stock.length === 0){
        console.log("Every field must be completed");
      }
      this.#products.push({
        id: this.#id++,  
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      });
    }
  
    getProducts() {
      return this.#products;
    }
  
    getProductById(id) {
      const product = this.#products.find(product => product.id === id);
        if(isNaN(id)){
            console.log("Id is not a number");
        }
        if (!product){
            console.log("The product does not exist");
        }
      return product;
    }
  
    ifExists(key, value) {
      return this.#products.find(product => product[key] === value)
    };
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
  console.log(product.getProducts());
  product.addProduct(item);
  console.log(product.getProductById(1));