const express = require('express')
const path = require('path')

// include controllers here
const controller = require('../controllers/controller')
const cartController = require('../controllers/cartController')

// add other controllers above this line^

const app = express()
app.set('views', path.join(__dirname, '../views'))

// GET requests
app.get('/', controller.getHome)
app.get('/logout', controller.logOut)
app.get('/login', controller.getLogin)
app.get('/register', controller.getRegister)
app.get('/adminhome', controller.getAdminHome)

// POST requests
app.post('/register', controller.postHome)
app.post('/postLogin', controller.postLogin)
app.post('/addCart', cartController.addToCart)
app.post('/checkEmail', controller.checkEmail)

module.exports = app
