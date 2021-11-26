const db = require('../db')
const product = require('../models/product')
const customer = require('../models/customer')
const cartProd = require('../models/cartProd')

const adminController = {
  /**
   * This function logs in an admin account
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request 
   */
  getAdminLogin: (req, res) => {
    const data = {
      scripts: ['admin']
    }
    if (db.getAuth.currentUser != null) {
      const email = db.getAuth.currentUser.email
      db.getAll('Admin', function (adminresult) {
        let flag = false
        if (adminresult !== null) {
          let i = 0
          while (!flag && (i < adminresult.length)) {
            if (email === adminresult[i].customerEmail) {
              flag = true
            }
            i++
          }
          if (flag) {
            res.render('admin', data)
          } else {
            res.redirect('/error')
          }
        }
      })
    } else {
      res.redirect('/error')
    }
  },

  /**
   * This function sends all customers
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request 
   */
  postAllCustomers: (req, res) => {
    const data = req.body
    db.getAll('Customers', function (result) {
      let i = 0
      if (result !== null) {
        console.log(result)
        res.send(result)
      }
    })
  },
  /**
   * This function adds a product entered by an admin
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request 
   */
  postAddProduct: (req, res) => {
    const data = req.body
    db.getAll('Products', function (result) {
      if (result !== null) {
        let size = result.length
        size = size + 1000000
        size = size.toString() // '1000006'
        size = size.substring(1, size.length) // '000006'
        db.insert('Products', size, data, function (result) {
          if (result !== null) {
            res.send(true)
          } else {
            res.send(false)
          }
        })
      }
    })
  }

}

module.exports = adminController
