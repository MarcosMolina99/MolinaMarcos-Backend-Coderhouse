import { USERDAO } from "../dao/index.js";

async function saveUser(req,res){
    const user = req.body;
    await USERDAO.save(user);
    res.send(user);
}

async function getlAllUsers(req,res){
    const users = await USERDAO.getAll();
    res.send(users);
}

export {saveUser,getlAllUsers}