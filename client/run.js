import {plye,addRidlle,updateRiddle,deletedata} from "./app.js";
import readline from "readline-sync"

function run() {
    let start = readline.question("enter your coise: 1-resolve riddle. 2.add new ridlle. 3-update som reddle. 4-delete riddle")

switch (start) {
    case "1":
        plye()
        break;
    case "2":
        addRidlle()
        break;
    case "3":
        updateRiddle()
        break;
    case "4":
        deletedata()
        break
    default:
        break;
}
}
run()