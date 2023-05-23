console.log("Hello world", __dirname);
const logger = () => console.log("Hello loger", __filename);
logger()

const userData = require('./user')
const carData = require('./car')

console.log(userData.user);
userData.userLogger()
console.log(carData.car);
carData.carLogger()