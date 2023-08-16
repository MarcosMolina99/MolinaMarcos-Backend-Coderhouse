import { Server } from "socket.io";
import {CreateServer, createServer} from "http";
import express from "express";
import { Engine } from "express-handlebars/types";
import { __filename,__dirname } from "../utils";
import { engine } from "express-handlebars";
import { saveProduct } from "./services/productUtils";
import { deleteProduct } from "./services/productUtils";
import views from "../routes/views.routes";
import realTimeProducts from "../routes/realTimeProducts";

const app= express();
const httpServer= createServer(app);

const PORT= 8081;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));
app.use("/", views)
app.use("/realTime", realTimeProducts);

httpServer.listen(PORT,() =>{
    console.log(`Server listening in port ${PORT}`);
})

const io= new Server(httpServer);

io.on("connection", (socket) =>{
    console.log("Connected");
});

socket.on("message", (data) =>{
    console.log("Received", data);
})

socket.on("addProduct", product =>{
    saveProduct(product);
    socket.emit("Add products", product);
})

socket.on("deleteProduct", id =>{
    const {id} = id;
    deleteProduct(id);
    socket.emit("Delete products", id);
})