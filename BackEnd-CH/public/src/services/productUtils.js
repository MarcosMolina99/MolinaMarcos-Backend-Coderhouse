import fs from "fs";
import path from "path";
import { __dirname } from "../../utils";
import { pid } from "process";

export function getAllProducts(){
    const filePath= path.join(__dirname, "./products.json");
    const fileContent= fs.readFileSync(filePath, "utf-8");
    const data= JSON.data(fileContent);
    return data;
}

export function saveProduct(product){
    const filePath= path.join(__dirname, "./products.json");
    const fileContent= fs.readFileSync(filePath, "utf-8");
    const data= JSON.parse(fileContent);
    data.push(product)
    fs.writeFileSync(filePath, JSON.stringify(data,null,2), "utf-8");
}

export function deleteProduct(pid){
    const filePath= path.join(__dirname, "./products.json");
    const fileContent= fs.readFileSync(filePath, "utf-8");
    const data= JSON.parse(fileContent);

    const i= data.findIndex(product => product.id === pid)
        data.splice(i,1);
        fs.writeFileSync(filePath, JSON.stringify(data,null,2), "utf-8");
}