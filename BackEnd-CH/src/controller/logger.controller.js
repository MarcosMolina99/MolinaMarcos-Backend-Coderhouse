import { LOGGER } from "../dao";

function getLogger(req,res){
    req.logger = LOGGER
    req.logger.debug("Debug")
    req.logger.http("Http")
    req.logger.info("Info")
    req.logger.warn("Warning")
    req.logger.error("Error")
    req.logger.verbose("Fatal")
    res.send("Logger")
}

export {getLogger}