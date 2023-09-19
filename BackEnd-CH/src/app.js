import express from "express";
import { Engine } from "express-handlebars/types";
import { __filename,__dirname } from "../public/utils";
import { engine } from "express-handlebars";
import views from "../routes/views.routes";
import realTimeProducts from "../routes/realTimeProducts";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import iniatilizePassport from "./config/passport.config";
import passport, { session } from "passport";
import MongoStore from "connect-mongo"
import loginFail from "../routes/session.routes.js"
import registrationFail from "../routes/session.routes.js"

dotenv.config();
const app= express();
app.use(cookieParser("C0d3rS3cr3t"));

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

const environment = async () =>{
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.log("Error");
  }
}
environment();


iniatilizePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use(session({
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    ttl: 100,
  }),
  secret: "codersecret",
  resave:false,
  saveUnitialized: false,
}));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use("/", views)
app.use("/realTime", realTimeProducts);


app.use("/", loginFail);
app.use("/", registrationFail);
app.use("/api/products", ProductRouter)
const server = app.listen(PORT,() =>{
    console.log(`Server listening in port ${PORT}`);
})
