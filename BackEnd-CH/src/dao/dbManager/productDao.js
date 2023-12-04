import productsModel from "../mongo/models/products.model.js";

export default class ProductDao{
    constructor(){
        console.log(`Working in MongoDB`);
    }

    save = async (product) =>{
        let products = await productsModel.create(product);
        return products;
    }

    getAll = async () =>{
        let allProducts = await productsModel.find({}).lean();
        return allProducts;
    }

    getById = async (pid) =>{
        let id = await productsModel.findById(pid);
        return id;
    }

    update = async(pid, product) =>{
        let updateProduct = await productsModel.findByIdAndUpdate(pid,product, {new: true});
        return updateProduct;
    }

    delete = async(pid) =>{
        const deleteProduct = await productsModel.findByIdAndDelete(pid);
        return deleteProduct;
    }

    getByCategory = async(filter) =>{
        const products = await productsModel.find();
        const productByCategory = products.filter(
            (p)=> String(p.category) == filter
        );
    }
}