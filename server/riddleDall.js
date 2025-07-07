import fs from "fs/promises";

 async function addFile(path){
     const data =  await fs.readFile(path , {encoding:"utf-8"})
    return JSON.parse(data)
    
}
async function writData(path,data){
    newData = await fs.writeFile(path,data)
    return newData
}
export {
    addFile,
    writData
}