import fs from "fs/promises";

 async function addFile(path){
     const data =  await fs.readFile(path , {encoding:"utf-8"})
     return JSON.parse(data)
    
}
async function writeData(path,newData){

    const data =  await fs.readFile(path ,{encoding:"utf-8"})
    const ridels = JSON.parse(data)
    ridels.push(newData)
    await fs.writeFile(path,JSON.stringify(ridels),"utf-8");
    return ridels
}
export {
    addFile,
    writeData
}