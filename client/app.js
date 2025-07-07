// import r1 from "./riddles/r1.js";
// import r2 from "./riddles/r2.js";
// import r3 from "./riddles/r3.js";
// import r4 from "./riddles/r4.js";
// import r5 from "./riddles/r5.js";


import person from "./classes/personclass.js";
import riddle from "./riddles/Riddle.js";
import readline from "readline-sync"

async function main() {

    const response = await fetch("http://localhost:3001/riddle");
    const arrRiddle = await response.json();

    const name1 = readline.question("enter your neme")

    const person1 = new person(name1)

    for (let i = 0; i < arrRiddle.length; i++) {
        let input = readline.question("Press Enter to get the next riddle or type 'end' to stop:")
        if (input === "end") {
            break
        }
        const riddle1 = new riddle(arrRiddle[i])
        person1.recordTime(() => riddle1.ask())

    }
    // arrRiddle.forEach(element => {
    //     const riddle1 = new riddle(element)
    //     person1.recordTime(() => riddle1.ask())

    // });
    person1.showStat()

}
main()


