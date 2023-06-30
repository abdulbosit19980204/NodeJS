import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";
import Product from "../models/Product.js";

const router = Router()

router.get('/', async(req, res) => {
    const products = await Product.find().lean()
    console.log(products);

    res.render('index', {
        title: 'Boom shop | Course',
        products: products.reverse(),
        UserID: req.UserID ? req.userID.toString() : null,
    })

})

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | Boom Shop',
        isProducts: true,

    })
})

router.get('/add', authMiddleware, (req, res) => {

    res.render('add', {
        title: 'Add new item',
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts')
    })
})

router.post('/add-products', userMiddleware, async(req, res) => {
    const { title, description, image, price } = req.body
    if (!title || !description || !image || !price) {
        req.flash("errorAddProducts", "All fields is required")
        res.redirect('/add')
        return
    }
    console.log(req.userID);
    await Product.create({...req.body, user: req.userID })
    res.redirect('/')
})

export default router