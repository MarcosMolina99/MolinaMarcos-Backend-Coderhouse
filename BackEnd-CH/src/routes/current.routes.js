import { Router } from "express";
import { createUserDTO } from "../DTO/userDTO";
import { passportCall } from "../../public/utils";

const router= Router();

router.get("/", passportCall("jwt"), (req,res) =>{
    if(!req.user){
        return res.status(401).json({message: "User not found"});
    }
    const userDTO = createUserDTO(req.user);

    res.json({user: userDTO});
})

export default router;