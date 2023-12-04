import userModel from "../mongo/models/user.model.js"

export default class UsersDao {
    constructor (){
        console.log(`Working in MongoDB`);
    }

    save = async(user) =>{
        let result = await userModel.create(user);
        return result;
    }

    getAll = async() =>{
        let users = await userModel.find();
        return users.map(user=>user.toObject());
    }

    getById = async(uid) =>{
        let result = await userModel.findById({_id:uid});
        return result;
    }

    getByEmail = async(email) =>{
        try{
            const user = await userModel.findOne({email: email});
            if(user){
                return user._id;
            }else{
                return null;
            }
        }catch(error){
            throw error;
        }
    }

    update = async(uid,newUser) =>{
        try {
            const result = await userModel.findByIdAndUpdate(uid, {role: newUser});
            return result;
        } catch (error) {
            throw error;
        }
    }
}