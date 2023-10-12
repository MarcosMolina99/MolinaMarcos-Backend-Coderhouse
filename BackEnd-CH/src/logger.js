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

const loggerMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
      req.logger = prodLogger;
    } else {
      req.logger = devLogger;
    }
    next();
  };

  export {devLogger, prodLogger, loggerMiddleware}