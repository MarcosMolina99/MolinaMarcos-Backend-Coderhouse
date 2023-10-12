import memoryProductDao from "./memory/product.dao.js"
import mongoProductDao from "./mongo/product.dao.js"
import memoryUserDao from "./memory/user.dao.js"
import mongoUserDao from "./mongo/user.dao.js"
import memoryCartDao from "./memory/cart.dao.js"
import mongoCartDao from "./mongo/cart.dao.js"
import memoryTicketDao from "./memory/ticket.dao.js"
import mongoTicketDao from "./mongo/ticket.dao.js"
import { PERSISTENCE } from "../config/config.js"
import winston from "winston"

const devLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "debug"
        }),
        new winston.transports.Console({
            level: "http"
        })
    ]
})

const prodLogger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "info"
        }),
        new winston.transports.Console({
            level: "warning"
        }),
        new winston.transports.File({
            level: "error",
            filename: "./errors.log"
        }),
        new winston.transports.Console({
            level: "verbose"
        })
    ]
})

export const PRODUCTDAO = PERSISTENCE === "MONGO" ? new mongoProductDao : new memoryProductDao();
export const USERDAO= PERSISTENCE === "MONGO" ? new mongoUserDao() : new memoryUserDao();
export const CARTDAO = PERSISTENCE === "MONGO" ? new mongoCartDao() : new memoryCartDao();
export const TICKETDAO = PERSISTENCE === "MONGO" ? new mongoTicketDao(): new memoryTicketDao();
export const LOGGER = PERSISTENCE === "DEVELOPMENT" ? devLogger : prodLogger