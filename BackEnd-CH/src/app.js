import express from "express";
import { Engine } from "express-handlebars/types";
import { __filename,__dirname } from "../public/utils";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import iniatilizePassport from "./config/passport.config";
import passport, { session } from "passport";
import MongoStore from "connect-mongo"
import swaggerJSDoc from "swagger-jsdoc";
import { loggerMiddleware } from "./logger.js";
import loggerTest from "./routes/logger.routes.js";
import MockingRoute from "./routes/mocking.routes.js";
import CartRoute from "./routes/cart.routes.js";
import LoginRoute from "./routes/login.routes.js";
import LogoutRoute from "./routes/logout.routes.js";
import ProductRoute from "./routes/products.routes.js";
import PrivateRoute from "./routes/private.routes.js";
import SessionRoute from "./routes/session.routes.js";
import SignUpRoute from "./routes/signup.routes.js";
import CartRoute from "./routes/cart.routes.js";
import ChatRoute from "./routes/chat.routes.js";
import CurrentRoute from "./routes/current.routes.js";
import { Server } from "socket.io";



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


const SwaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Proyect´s documentation",
      description: "CoderHouse Backend",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const params = swaggerJSDoc(SwaggerOptions);

app.use(loggerMiddleware);
app.use("loggertest",loggerTest);
app.use("/apidocs",swaggerUiExpress.serve, swaggerUiExpress.setup(params));
app.use("/signup",SignUpRoute);
app.use("/logout",LogoutRoute);
app.use("/login",LoginRoute);
app.use("/current",CurrentRoute);
app.use("/app/carts/",CartRoute);
app.use("/chat", ChatRoute);
app.use("/private",PrivateRoute);
app.use("/mockproducts", MockingRoute);
app.use("/api/products",ProductRoute);
app.use("/session",SessionRoute);

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


const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) =>{
  console.log("Connected");

  socket.on("message", (data) =>{
    console.log("Messagge received", data);
  })

  socket.emit("response", "Messagge received");

  socket.on("disconnect", () =>{
    console.log("Disconnected");
  });
});






const server = app.listen(PORT,() =>{
    console.log(`Server listening in port ${PORT}`);
})
