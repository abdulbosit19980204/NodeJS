const http = require('http')

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end(`<h1> Send name</h1>
            <form method="post" action="/">
                <input name="name" type="text" placeholder="Enter your name" />
                <button type="submit">Send name</button>
            </form> 
        `)
    } else if (req.method === "POST") {
        const name = []
        res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' })

        req.on('data', data => { name.push(Buffer.from(data)) })
        req.on('end', () => {
            const message = name.toString().split('=')[1]
            res.end(`${message} registred successfully!`)
        })
    }

})

server.listen(3000, () => {

    console.log("Server has been started on port: 3000");
})