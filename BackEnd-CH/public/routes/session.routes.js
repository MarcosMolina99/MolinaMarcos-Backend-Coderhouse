import { Router } from "express";
import User from "../src/dao/models/user";

const router = Router();

function auth(req,res,next){
    if(req.session?.user && req.session?.admin){
        return next();
    }
    return res.status(401).json({message:"authentication error"})
}

router.get("/private",auth,(req,res)=>{
    res.render("private",{});
})

router.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    const result = await User.find({
        email: username,
        password,
    });
    if(result.length===0){
        return res.status(400).json({message: "Error in session"});
    }else{
        req.session.user = username;
        req.session.admin = false;
        res.status(200).json({message: "Session working"});
    }
})

router.post("/signup", async (req,res)=>{
    const {firstName,lastName,age,email,password} = req.body;

    const result = await User.create({
        firstName,lastName,age,email,password
    })
    if(result === null){
        return res.status(400).json({message:"Error in the session"});
    }else{
        req.session.user = email;
        req.session.admin = true;
        res.status(200).json({message:"session working"});
    }
})

export default {auth}