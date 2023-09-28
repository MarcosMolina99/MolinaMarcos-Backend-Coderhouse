import cartsModel from "./models/carts.model";

export default class CartDao{
    constructor(){}

    async getAll(){
        try{
            const carts = await cartsModel.find()
            return carts;
        }catch(error){
            console.log(error);
        }
    }

    async save(newElement){
        try {
            const response = await cartsModel.create(newElement);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}