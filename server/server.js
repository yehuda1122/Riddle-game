import fs from "fs/promises"
import http from "http"
import { addFile, writeData, updateData,daleteriddle } from "./riddleDall.js"

const Port = 3001;
const server = http.createServer(async (req, res) => {
    if (req.method === "GET" && req.url === "/riddle") {
        getFile(res)
    }
    else if (req.method === "POST" && req.url === "/riddle") {
        addTofile(req, res)
    }
    else if (req.method === "PUT" && req.url === "/riddle") {
        chengeData(req, res)
    }
    else if (req.method === "DELETE") {
        dalletData(req, res)
    }
    else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
    }
})
server.listen(Port, () => {
    console.log(`the server is run: ${Port}`);
})

async function getFile(res) {
    let respons;
    try {
        respons = await addFile("./allRiddle.txt");
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(respons))
    }
    catch (err) {
        console.error("erorr ", err.message);
        res.writeHead(500, { "Content-Type": "text/plain" })
        res.end("not read")
    }

}
async function addTofile(req, res) {
    let body = ""
    req.on("data", chunk => {
        body += chunk
    })
    req.on("end", async () => {
        try {
            const newRiddle = JSON.parse(body)
            const update = await writeData("./allRiddle.txt", newRiddle);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newRiddle))
        }
        catch (err) {
            console.error("erorr ", err.message);
            res.writeHead(400, { "Content-Type": "text/plain" })
            res.end("not updatead")
        }
    })
}
async function chengeData(req, res) {
    let body = ""
    req.on("data", chunk => {
        body += chunk
    })
    req.on("end", async () => {
        try {
            const partUpdate = JSON.parse(body)
            const fileUpdate = await updateData("./allRiddle.txt", partUpdate);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(fileUpdate))

        }
        catch (err) {
            console.error("erorr ", err.message);
            res.writeHead(400, { "Content-Type": "text/plain" })
            res.end("not updatead")
        }
    })
}
async function dalletData(req, res) {
    const url = new URL(req.url, `http://"http://localhost:3001`)
    const id = url.searchParams.get("id");

    if (!id) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "ID is required" }));
    }
    try {
        const deleted = await daleteriddle("./allRiddle.txt", id);

        if (!deleted) {
            res.writeHead(404, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "id not found" }));
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Riddle deleted successfully" }));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}




