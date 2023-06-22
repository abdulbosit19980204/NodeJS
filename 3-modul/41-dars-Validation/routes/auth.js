import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
const router = Router()
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login | Boom Shop',
        isLogin: true,
        loginError: "Error",
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register | Boom Shop',
        isRegister: true,
        registerError: "Error",
    })
})

router.post('/login', async(req, res) => {
    const existUser = await User.findOne({ email: req.body.email })
    if (!existUser) {
        console.log("User not found");
        return false
    }
    const isPassEqual = await bcrypt.compare(req.body.password, existUser.password)
    if (!isPassEqual) {
        console.log("Password wrong");
        return false
    }
    console.log(existUser);
    res.redirect('/')
})

router.post('/register', async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    }

    const user = await User.create(userData)
    console.log(user);
    res.redirect('/')
})

export default router