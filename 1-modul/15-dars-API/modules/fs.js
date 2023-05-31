const fs = require('fs')
const path = require('path')

// fs.mkdirSync // mkdir Sync

// fs.mkdir(path.join(__dirname, 'notes'), err => {
//     if (err) throw new Error()
//     console.log("Folder was created successfully");
// })


fs.writeFile(path.join(__dirname, 'notes', 'december.txt'), 'Learn new course such as NodeJs', err => {
    // console.log(err);
    if (err) throw new Error()

    console.log("File was created successfully");

    fs.appendFile(path.join(__dirname, 'notes', 'december.txt'), ' and done a new project', err => {
        if (err) throw new Error()

        console.log("New data added successfully");

        fs.readFile(path.join(__dirname, 'notes', 'december.txt'), 'utf-8', (err, data) => {
            if (err) throw new Error()

            // console.log(Buffer.from(data).toString()); // if utf-8 didn't was  
            console.log(data); // else this
        })
    })


})

fs.readFile(path.join(__dirname, 'notes', 'december.txt'), 'utf-8', (err, data) => {
    if (err) throw new Error()

    // console.log(Buffer.from(data).toString()); // if utf-8 didn't was  
    console.log(data); // else this
})