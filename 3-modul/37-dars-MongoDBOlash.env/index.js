import express from "express"
import { create } from "express-handlebars"
import mongoose from "mongoose"

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

app.use(AuthRoutes)
app.use(ProductsRoutes)

// console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 4100

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
})
app.listen(PORT, () => { console.log(`Server is running on port:  ${ PORT }`) })