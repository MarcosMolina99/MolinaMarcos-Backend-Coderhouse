import jwt from "../config/passport.config.js"
import { passportCall } from "../../public/utils.js";

export const isUser = (req,res,next) =>{
    if(req.user && req.user.user.user.role == "user"){
        next();
    }else{
        res.status(403).json({message: "Unauthorized access"});
    }
}
export const isLoggedIn = (req,res,next) =>{
    if(req.session.user){
        return next();
    }else{
        return res.redirect("/");
    }
}
export const isAdmin = (req,res,next) =>{
    if(req.user && req.user.user.user.role == "admin"){
        next();
    }else{
        res.status(403).json({message: "Unauthorized access"});
    }
}
export function auth(req,res,next){
    if(req.user && req.user.role === "admin"){
        return next();
    }else{
        return res.status(403).json("Authentication error");
    }
}
export function getUserInSession(req,res,next){
    const uid= req.user.user.user._id;
    if(uid){
        next();
    }else{
        res.status(403).json({message: "Unauthorized access"});
    }
}