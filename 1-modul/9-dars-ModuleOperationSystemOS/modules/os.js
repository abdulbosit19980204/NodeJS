const os = require('os')

// platform

console.log(os.platform());
console.log(os.cpus());

//architecture

console.log(os.arch());

//free memory
console.log(os.freemem());

//total memory
console.log(os.totalmem());

//entery point / home dir
console.log(os.homedir());