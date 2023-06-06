import getArgs from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printError, printSuccess, printHelp } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async(token) => {
    if (!token.length) {
        printError("Token doesn't exsist")
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
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
        return saveKeyValue(args.t)

    }
    getWeather('Uzbekistan')
        //result
}

startCLI()