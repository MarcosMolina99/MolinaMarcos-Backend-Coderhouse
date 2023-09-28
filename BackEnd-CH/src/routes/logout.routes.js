import { Router } from "express";

const router = Router();

router.get("",(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log("Error logging out");
            return res.status(500).json({message: "Error in the log out"})
        }else{
            console.log("Logged out");
            res.redirect("/");
        }
    })
})