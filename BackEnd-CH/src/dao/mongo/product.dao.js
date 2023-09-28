import productsModel from "./models/products.model";

export default class ProductDao{
    constructor(){}

    async getAll(){
        try{
            const carts = await productsModel.find()
            return carts;
        }catch(error){
            console.log(error);
        }
    }

    async save(newElement){
        try {
            const response = await productsModel.create(newElement);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}