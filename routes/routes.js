const express = require('express')
const path = require('path')

// include controllers here
const controller = require('../controllers/controller')
const cartController = require('../controllers/cartController')
const adminController = require('../controllers/adminController')

// add other controllers above this line^

const app = express()
app.set('views', path.join(__dirname, '../views'))

// GET requests
app.get('/', controller.getHome)
app.get('/logout', controller.logOut)
app.get('/admin', adminController.getAdminLogin)
app.get('/adminTransactions', adminController.getAllTransactions)

// POST requests
app.post('/register', controller.postHome)
app.post('/postLogin', controller.postLogin)
app.post('/addCart', cartController.addToCart)
app.post('/postAllCustomers', adminController.postAllCustomers)
app.post('/checkEmail', controller.checkEmail)
app.post('/postAddProduct', adminController.postAddProduct)

module.exports = app
