import userModel from "./models/user.model";

export default class UserDao{
    constructor(){}

    async getAll(){
        try{
            const carts = await userModel.find()
            return carts;
        }catch(error){
            console.log(error);
        }
    }

    async save(newElement){
        try {
            const response = await userModel.create(newElement);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}