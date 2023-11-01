export default class UserRepository{
    constructor(dao){
        this.dao = dao;
    }

    createUser = (user) =>{
        return this.dao.save(user);
    };

    getAllUsers = () =>{
        return this.dao.getAll();
    };

    getUserById = (uid) =>{
        return this.dao.getById(uid);
    };

    getUserIdByEmail = (email) =>{
        return this.dao.getByEmail(email);
    }

    updateUser = (uid, newUser) =>{
        return this.dao.update(uid,newUser);
    }
}