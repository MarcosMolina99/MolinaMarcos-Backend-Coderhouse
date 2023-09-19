import {PRODUCTDAO} from "../dao/index.js"

async function saveProduct(req,res){
    const product = req.body;
    await PRODUCTDAO.save(product);
    res.send(product);
}

async function getlAllProducts(req,res){
    const products = await PRODUCTDAO.getAll();
    res.send(products);
}

export {saveProduct,getlAllProducts}