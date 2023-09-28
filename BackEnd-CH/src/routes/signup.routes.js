import { Router } from "express";

const router = Router();

router.get("", (req,res) =>{
    res.render("Sign up", {
        title: "Create your account",
    })
})

export default router;