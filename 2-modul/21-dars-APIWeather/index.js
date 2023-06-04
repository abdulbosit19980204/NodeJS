import getArgs from './helpers/args.js'
import { printError, printSuccess, printHelp } from './services/log.service.js'
import { saveKeyValue } from './services/storage.service.js'

const saveToken = async(token) => {
    if (!token.length) {
        printError("Token doesn't exsist")
        return
    }
    try {
        await saveKeyValue('token', token)
        printSuccess('Token was saved')
    } catch (error) {
        printError(error.message)
    }
}

const startCLI = () => {
    const args = getArgs(process.argv)
    console.log("args:", args);

    if (args.h) {
        //help
        printHelp()
    }
    if (args.a) {
        //save city
    }
    if (args.t) {
        // save token
        return saveKeyValue('token', args.t)
    }
    //result
}

startCLI()