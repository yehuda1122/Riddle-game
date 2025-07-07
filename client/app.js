// import r1 from "./riddles/r1.js";
// import r2 from "./riddles/r2.js";
// import r3 from "./riddles/r3.js";
// import r4 from "./riddles/r4.js";
// import r5 from "./riddles/r5.js";


import person from "./classes/personclass.js";
import riddle from "./riddles/Riddle.js";
import readline from "readline-sync"

export async function main() {
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


export async function addRidlle() {
    console.log("enter new riddle");
    const id = readline.question("enter id")
    const name = readline.question("enter lavel")
    const taskDescription = readline.question("enter riddle")
    const correctAnswer = readline.question("enter correct Answer ")

    const newRidlle = {
        id,
        name,
        taskDescription,
        correctAnswer
    }
    try {
        const add = await fetch("http://localhost:3001/riddle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRidlle)
        })
        const data = await add.json();
        console.log("The Riddle added successfully");
        console.log(data);    
    }
    catch (err) {
        console.error(err.message)
    }
}
main()
// addRidlle()


