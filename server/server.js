import fs from "fs/promises"
import http from "http"
import { addFile } from "./riddleDall.js"

const Port = 3001;
const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/riddle") {
        let respons;
        try {
            respons = await addFile("./allRiddle.txt");
            console.log('response', respons);
            res.end("file read")
        }
        catch (err){
            console.error("erorr ", err.message);
            res.end("not read")
        }

    }
    else {
        res.end("error")
    }
})
server.listen(Port, () => {
    console.log(`the server is run: ${Port}`);
})




