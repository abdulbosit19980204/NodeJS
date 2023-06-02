import getArgs from './helpers/args.js'
import { printError, printSuccess, printHelp } from './services/log.service.js'
// const getArgs = require('./helpers/args')
// const { printError, printSuccess } = require('./services/log.service')
const startCLI = () => {
    const args = getArgs(process.argv)
        // console.log("ARGS: ", args);
        // printSuccess("Good job. Ok")
        // printError("Print Error")

    if (args.h) {
        //help
        printHelp()
    }
    if (args.a) {
        //save city
    }
    if (args.t) {
        // save token
    }
    //result
}

startCLI()