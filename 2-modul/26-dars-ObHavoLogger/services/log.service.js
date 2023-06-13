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

const printWeather = (response, icon) => {
    console.log(dedent `
    ${chalk.bgYellowBright("WEATHER")} City weather ${response.name}
    ${icon}: ${response.weather[0].description}
    Temperature: ${response.main.temp} (feels like ${response.main.feels_like})
    Humadity: ${response.main.humidity}%
    Wind speed: ${response.wind}
    `);
}

export {
    printError,
    printSuccess,
    printHelp,
    printWeather,
}