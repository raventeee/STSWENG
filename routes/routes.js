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
app.get('/open_cart/:email', cartController.openCart)
app.get('/logout', controller.logOut)
app.get('/admin', adminController.getAdminLogin)
app.get('/pS5page', controller.getPs5Page)
app.get('/pS4page', controller.getPs4Page)
app.get('/xboxpage', controller.getXboxPage)
app.get('/nswpage', controller.getNswPage)
app.get('/pcmacpage', controller.getPcmacPage)
app.get('/adminTransactions', adminController.getAllTransactions)
app.get('/transactionhistory/:email', cartController.openTransactionHistory)
app.get('/confirm_checkout', cartController.confirmCheckout)
app.get('/checkout/:email', cartController.openCheckoutPage)


// POST requests
app.post('/register', controller.postHome)
app.post('/postLogin', controller.postLogin)
app.post('/addCart', cartController.addToCart)
app.post('/postAllProducts', adminController.postAllProducts)
app.post('/postAllCustomers', adminController.postAllCustomers)
app.post('/postAllTransactions', adminController.postAllTransactions)
app.post('/postDiscountItem', adminController.postDiscountItem)
app.post('/checkEmail', controller.checkEmail)
app.post('/postAddProduct', adminController.postAddProduct)
app.post('/saveCart', cartController.editCart)

module.exports = app
