const db = require('../db')
const product = require('../models/product')
const customer = require('../models/customer')
const cartProd = require('../models/cartProd')


const adminController = {
    postLogin: (req, res) => {
        console.log("here1")
        const data = {
            
        }
        res.render('admin', data)
    }

}


module.exports = adminController