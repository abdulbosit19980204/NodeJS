import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";
import Product from "../models/Product.js";

const router = Router()

router.get('/', async(req, res) => {
    const products = await Product.find().lean()


    res.render('index', {
        title: 'Boom shop | Course',
        products: products.reverse(),
        userID: req.userID ? req.userID.toString() : null,
    })

})

router.get('/products', async(req, res) => {
    const user = req.userID ? req.userID.toString() : null
    const myProducts = await Product.find({ user }).populate("user").lean()


    res.render('products', {
        title: 'Products | Boom Shop',
        isProducts: true,
        myProducts: myProducts,
    })
})

router.get('/add', authMiddleware, (req, res) => {

    res.render('add', {
        title: 'Add new item',
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts')
    })
})

router.get('/product/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('user').lean();

        res.render('product', {
            product: product,
            errorEditProduct: req.flash('errorEditProduct')
        });
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/edit-product/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('user').lean();

        res.render('edit-product', { product: product });
    } catch (error) {
        // Handle the error
        console.error(error);
        // res.status(500).send('Internal Server Error');
        res.send(error.message)
    }
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

router.post('/edit-product/:id', async(req, res) => {
    const { title, description, image, price } = req.body
    const id = req.params.id
    console.log(id);
    if (!title || !description || !image || !price) {
        req.flash("errorEditProduct", "All fields is required")
        res.redirect(`/edit-product/${{id}}`)
        return
    }
    await Product.findByIdAndUpdate(id, req.body, { new: true })
    res.redirect('/products')

})
export default router