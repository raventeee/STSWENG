const express = require('express')
const path = require('path')

// include controllers here
const controller = require('../controllers/controller')

// add other controllers above this line^

const app = express()
app.set('views', path.join(__dirname, '../views'))

app.get('/', controller.getHome)
app.post('/register', controller.postHome)
app.post('/login', controller.postLogin)
module.exports = app
