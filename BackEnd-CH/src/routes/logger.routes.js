import { Router } from "express";
import { getLogger } from "../controller/logger.controller.js";

const routerLogger = Router()
routerLogger.get("/", getLogger)

export {routerLogger}
