import { Router } from "express";

function auth(req,res,next){
    if(req.session?.user && req.session?.admin){
        return next();
    }
    return res.status(401).json({message:"authentication error"})
}

const router = Router();

router.get("/", auth,(req,res)=>{
    res.render("private", {})
});

export default router;