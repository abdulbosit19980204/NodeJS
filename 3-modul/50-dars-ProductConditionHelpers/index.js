import express from "express"
import { create } from "express-handlebars"
import mongoose from "mongoose"
import flash from "connect-flash"
import session from "express-session"
import cookieParser from "cookie-parser"

//Middlewares
import varMiddleware from "./middleware/var.js"
import userMiddleware from "./middleware/user.js"
//DOTENV
import * as dotenv from 'dotenv'
dotenv.config()

//ROUTER
import AuthRoutes from "./routes/auth.js"
import ProductsRoutes from "./routes/products.js"

//Utils
import hbsHelper from "./utils/index.js"
const app = express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: hbsHelper,
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(varMiddleware)
app.use(userMiddleware)
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