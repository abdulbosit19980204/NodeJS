import chalk from "chalk";
import dedent from "dedent";
const printError = error => { console.log(chalk.red(chalk.bgRed("Error:") + ' ' + error)); }

const printSuccess = message => { console.log(chalk.green(chalk.bgWhite("Success:") + " " + message)); }

const printHelp = () => {
    console.log(dedent `${chalk.bgYellow("Help printed")}
            -s[CITY] for install city
            -h for help 
            -t [API_KEY] for saving token`);
}
export {
    printError,
    printSuccess,
    printHelp
}