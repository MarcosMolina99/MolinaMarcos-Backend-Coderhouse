import { Router } from "express";
import User from "../src/dao/models/user";
import passport from "passport";
import { createHash } from "../utils";

const router = Router();

router.post("/login", passport.authenticate("login",{
    failureRedirect: "loginFail",
})),
async (req,res) =>{
    if(!req.user){
        return res.status(401).json("Authentication error");
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
    };
    req.session.admin= true;
    res.status(200).json({message:"Authentication successfull"});

}

router.get("/loginFail", async (req,res) =>{
    console.log("Login failed");
    res.send({error: "Login failed"})
})

router.post("/forgot", async (req,res) =>{
    const {username, newPassword} = req.body;
    const result = await User.findByIdAndUpdate(result[0]._id, {
        password: createHash(newPassword)
    })
    res.status(200).json({
        respuesta: "Password changed",
        datos: respuesta,
    })
})

router.post("/signup", passport.authenticate("register",{
    failureRedirect: "/registrationFail",
}), async (req,res) =>{
    res.status(200).json({message: "Registration"})
})

router.get("/registrationFail", async (req,res) =>{
    res.send({message: "registration failed"})
})

router.get("/github", passport.authenticate("github", {scope: ["user.email"]}),
async (req,res) =>{res.json({message: "To registration"})})


router.get("/githubcallback", passport.authenticate("githubCB", {failureRedirect: "/"}),
async (req,res) =>{
    req.session.user= req.user;
    res.session.admin= true;
    res.redirect("/api/products")
})

export default router;