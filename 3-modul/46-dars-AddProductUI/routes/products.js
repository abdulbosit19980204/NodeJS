import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Boom shop | Course',

    })

})

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | Boom Shop',
        isProducts: true,

    })
})

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add new item',
        isAdd: true,
    })
})

router.post('/add-products', (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

export default router