import readline from "readline-sync";

export default class Riddle {
    constructor({ id, name, taskDescription, correctAnswer }) {
        this.id = id
        this.name = name
        this.taskDescription = taskDescription
        this.correctAnswer = correctAnswer
    }
    ask() {
        console.log(this.id)
        console.log(this.name)
        console.log(this.taskDescription)
        let bool = false;
        while (!bool) {
            let answer = readline.question("input answer");
            if (answer === this.correctAnswer) {
                console.log("correct")
                bool = true
            } else {
                console.log("worng answer try again")
            }
        }
    }

}