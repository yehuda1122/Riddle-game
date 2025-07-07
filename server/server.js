import fs from "fs/promises"
import http from "http"
import { addFile } from "./riddleDall.js"
import { writeData } from "./riddleDall.js";

const Port = 3001;
const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/riddle") {
        getFile(res)
    }
    else if (req.method === "POST" && req.url == "/riddle") {
        addTofile(req,res)
    }
    else {
        res.end("error")


    }
})
server.listen(Port, () => {
    console.log(`the server is run: ${Port}`);
})


async function getFile(res) {
    let respons;
    try {
        respons = await addFile("./allRiddle.txt");
    }
    catch (err) {
        console.error("erorr ", err.message);
        res.end("not read")
    }
    res.end(JSON.stringify(respons))
}
async function addTofile(req,res) {
    let body = ""
    req.on("data", chunk =>{
        body += chunk 
    })
    req.on("end",async()=>{
        try {
        const newRiddle = JSON.parse(body)
        const update = await writeData("./allRiddle.txt", newRiddle);
        console.log(update);
        res.end(JSON.stringify(newRiddle))
        
    }
    catch (err) {
        console.error("erorr ", err.message);
        res.end("not updatead")
    }
    
    })
}





