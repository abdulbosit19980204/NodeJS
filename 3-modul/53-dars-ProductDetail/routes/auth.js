import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { generateJWTToken } from "../services/tooken.js";
import loginMiddleware from "../middleware/login.js";
const router = Router()
router.get('/login', loginMiddleware, (req, res) => {

    res.render('login', {
        title: 'Login | Boom Shop',
        isLogin: true,
        loginError: req.flash("loginError"),
    })
})

router.get('/register', loginMiddleware, (req, res) => {

    res.render('register', {
        title: 'Register | Boom Shop',
        isRegister: true,
        registerError: req.flash("registerError"),
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

router.post('/login', async(req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        req.flash("loginError", "All fields is required")
        res.redirect('/login')
        return
    }

    const existUser = await User.findOne({ email })
    if (!existUser) {
        req.flash("loginError", "User not found")
        res.redirect('/login')
        return
    }
    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if (!isPassEqual) {
        req.flash("loginError", "Password is wrong")
        res.redirect('/login')
        return
    }
    console.log(existUser);
    const token = generateJWTToken(existUser._id)
    res.cookie("token", token, { httpOnly: true, secure: true })
    res.redirect('/')
})

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName || !email || !password) {
        req.flash("registerError", "All fields is required")
        res.redirect('/register')
        return
    }

    const candidate = await User.findOne({ email })
    if (candidate) {
        req.flash("registerError", "User already exist")
        res.redirect('/register')
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
    }

    const user = await User.create(userData)
    const token = generateJWTToken(user._id)
    res.cookie("token", token, { httpOnly: true, secure: true })
    console.log("user => ", user, "token => ", token);
    res.redirect('/')
})

export default router