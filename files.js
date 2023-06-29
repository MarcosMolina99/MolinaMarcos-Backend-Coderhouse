import { log } from "console";
import fs from "fs";
import { parse } from "path";

async function writeFile(file,data){
    try{
        await fs.promises.writeFile(file,JSON.stringify(data));
        return console.log("File created");
    }catch{
        console.log("Error writing the file");
    }
}

async function readFile(file){
    try{
        let result= await fs.promises.readFile(file, "utf-8");
        let data= await JSON(parse(result));
        return data;
    }catch{
        console.log("Error reading the file");
    }
}

async function deleteFile(file){
    try{
        await fs.promises.unlink(file)
    }catch{
        console.log("Error deleting the file");
    }
}

export default {readFile,writeFile,deleteFile};