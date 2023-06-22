import express from "express"
import { create } from "express-handlebars"
import mongoose from "mongoose"
import flash from "connect-flash"
import session from "express-session"

//DOTENV
import * as dotenv from 'dotenv'
dotenv.config()

//ROUTER
import AuthRoutes from "./routes/auth.js"
import ProductsRoutes from "./routes/products.js"


const app = express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

// //validation 
app.use(session({ secret: "Abdulbosit", resave: false, saveUninitialized: false, }));
app.use(flash())

app.use(AuthRoutes)
app.use(ProductsRoutes)


const startApp = () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        })
        console.log("MongoDB connected");

        // console.log(process.env.MONGO_URI);
        const PORT = process.env.PORT || 4100
        app.listen(PORT, () => { console.log(`Server is running on port:  ${ PORT }`) })

    } catch (error) {
        console.log(error);
    }
}

startApp()