import * as dotenv from "dotenv";
import passport from "passport";
import local from "passport-local";
import User from "../dao/mongo/models/user.model";
import GitHubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../../public/utils";
import { ExtractJwt } from "passport-jwt";
import userModel from "../dao/mongo/models/user.model";

dotenv.config();

const localStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

/* const iniatilizePassport = () =>{
    passport.use("github", new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
    }, async (accessToken, refresTokenm, profile, done) =>{
        try {
            let user= await User.findOne({
                email: profile?.emails[0]?.value
            })
            if(!user){
                const newUser = {
                    first_name: profile.displayName.split(" ")[0],
                    last_name: profile.displayName.split(" ")[1],
                    email: profile?.emails[0]?.value,
                    age: 18,
                    password: crypto.randomBytes(20).toString("hex")
                };
                let result = await User.create(newUser);
                done(null,result);
            }else{
                done(null,user);
            }
        } catch (error) {
            done(error,null);
        }
    }))
} */

export const cookieExtractor = (req) =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["CoderKeyQueNadieDebeSaber"];
    }
    return token;
}

const iniatilizePassport = () =>{
    passport.use("jwt", new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: "CoderQueNadieDebeSaber",
        },
        async (jwt_payload, done) =>{
            try {
                const response = await userModel.find({
                    email: jwt_payload.user.username,
                })
                if(!response){
                    return done(null, false, {message: "User not found"});
                }else{
                    return done(null, jwt_payload);
                }
            } catch (error) {
                done(error);
            }
        }
    ))
}
passport.use("login", new localStrategy({
    passReqToCallback: true,
    usernameField: "email",
},
    async (req,username,password,done)=>{
        const {first_name, last_name, email, age} = req.body;
        try {
            const user = await User.findOne({email: username});
            if(!user){
                console.log("The user already exists");
                return done(null,false, {message: "User not found"});
            }
            if(!isValidPassword(user.password,password)){
                return done(null,false,{message: "Password incorrect"})
            }else{
                return done(null,user)
            }
        } catch (error) {
            return done("Error", error);
        }
    }
))

passport.serializeUser((user,done) =>{
    done(null, user._id);
})

passport.deserializeUser(async(id,done) =>{
    try {
        let user = await User.findById(id);
        done(null,user);
    } catch (error) {
        done(error,null)
    }
})

export default iniatilizePassport;