const express = require('express')
const path = require('path')
const cartController = require('../controllers/cartController')

// include controllers here
const controller = require('../controllers/controller')

// add other controllers above this line^

const app = express()
app.set('views', path.join(__dirname, '../views'))

app.get('/', controller.getHome2)
app.post('/register', controller.postHome)
app.post('/login', controller.postLogin)
// app.get('/home', controller.getHome2)
app.get('/logout', controller.logOut)
app.get('/login', controller.getLogin)

app.post('/addCart', cartController.addToCart)

module.exports = app
