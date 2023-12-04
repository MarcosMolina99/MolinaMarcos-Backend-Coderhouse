import { Router } from "express";
import router from "./mocking.routes";
import { loggerMiddleware } from "../logger.js";

const routerLogger = Router()
routerLogger.get("/", loggerMiddleware, (req,res) =>{
    req.logger.debug("Debug")
    req.logger.http("Http")
    req.logger.info("Info")
    req.logger.warn("Warning")
    req.logger.error("Error")
    req.logger.fatal("Fatal")
    res.send("Logger")
})

export default router
