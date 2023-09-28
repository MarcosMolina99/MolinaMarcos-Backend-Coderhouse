import { fileURLToPath } from 'url';
import { dirname } from 'path';
import passport from 'passport';
import { error } from 'console';

const PRIVATE_KEY = "CoderKeyQueNadieDebeSaber";

export const generateToken = (user) =>{
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: "1h"});
    return token;
}

export const authToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) res.status(401).json({error: "Token authentication error"});

    jwt.verify(authHeader, PRIVATE_KEY, (error,user) =>{
        if(error) res.status(401).json({error: "wrong token"});

        req.user = user;
        next();
    })
}

export const passportCall = (strategy) =>{
    return async (req,res,next) =>{
        passport.authenticate(strategy, (error,user,info) =>{
            if(error){
                return next(error);
            }

            if(!user){
                if(info && info.message){
                    return res.status(401).json({status: "error", message: info.message});
                }else{
                    return res.status(401).json({status: "error", message: "unauthorized"});
                }
            }
            req.user = user;
            next();
        })(req,res,next);
    }
}

export const auth = () =>{
    return async(req,res,next)=>{
        if(req.session.user && req.session.user.role.admin){
            return next();
        }else{
            return res.status(403).json("Authentication error");
        }
    }
}

export const createHash = (password) =>
bcrypt.hashSync(password,bcrypt.genSaltSync(10));

export const isValidPassword = (savedPassword, password) => {
    console.log({"cloud password": savedPassword, loginPassword: password});
    return bcrypt.compareSync(password,savedPassword);
}


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);