const organizeStuff = require("./command/organize")
const helpCommands = require('./command/help')

let inputArr = process.argv.slice(2)
let command = inputArr[0]
let src = inputArr[1]

switch (command) {
    case "organize":
        organizeStuff.fnOrg(src)
        break
    case "tree":
        console.log("will update tree after recursion")
        break
    case "help":
        helpCommands.fnHelp()
        break
    default:
        console.log("🙏 Please enter a valid command")
}


