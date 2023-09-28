import { Router } from "express";
import messagesModel from "../src/dao/models/messages";

const router= Router();

router.get("/", (req,res) =>{
    res.render("chat", {title: "Chat", script: "chat.js"});
})

export default router;