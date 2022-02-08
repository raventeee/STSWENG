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
      scripts: ['admin'],
      title: "Jet's Game Store: Admin"
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
            db.getAll('Customers', function (result) {
              data.customers = result;
              data.user = { email: email, admin: true };
              data.isLoggedIn = true;
              res.render('admin', data);
            });
          } else {
            res.redirect('/error');
          }
        }
      })
    } else {
      res.redirect('/error')
    }
  },

  getAdminCustomersPage: (req,res) =>{
    const data = {
      styles: ['style', 'sidebar'],
      scripts: ['admin-customer-data-table', 'sidebar', 'admin-toast'],
      title: "Customers Page"
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
            db.getAll('Customers', function (result) {
              data.customers = result;
              res.render('admin-customers',data);
            });
          } else {
            res.redirect('/error');
          }
        }
      })
    } else {
      res.redirect('/error')
    }
  },

  getAdminTransactionsPage: (req,res) =>{
    const data = {
      styles: ['style', 'sidebar'],
      scripts: ['admin-transaction-data-table', 'sidebar', 'dropdown', 'admin-toast'],
      title: "Transactions Page"
    }

    res.render('admin-transactions',data)
  },

  getAdminProductsPage: (req,res) =>{
    const data = {
      styles: ['style', 'sidebar'],
      scripts: ['admin-product-data-table', 'sidebar', 'admin-toast'],
      title: "Products Page"
    }
    res.render('admin-products',data)
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

  postAllProducts: (req, res) => {
    const data = req.body
    db.getAll('Products', function (result) {
      let i = 0
      if (result !== null) {
        console.log(result)
        res.send(result)
      }
    })
  },

  postAllTransactions: (req, res) => {
    const data = req.body
    db.getAll('Transactions', function (result) {
      let i = 0
      if (result !== null) {
        console.log(result)
        res.send(result)
      }
    })
  },

  postDiscountItem: (req, res) => {
    const data = req.body
    data.productDisprice = parseFloat(data.productDisprice)
    data.productDiscounted = Boolean(data.productDiscounted)
    console.log(data)
    db.updateOne('Products',data.productId, data, function(result){
      if (result !== null)
      {
        console.log(result)
        res.send(result)
      }
    })
  },
  updateStatus: (req, res) => {
    const data = req.body
    console.log("HERE")
    console.log(data.transactId)
    db.updateOne('Transactions',data.transactId, data, function(result){
      if (result !== null)
      {
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
        size = 'P' + size
        data[product.images] = []
        data[product.id] = size
        data[product.price] = parseInt(data[product.price])
        data[product.stock] = parseInt(data[product.stock])
        db.insert('Products', size, data, function (result) {
          if (result !== null) {
            res.send(true)
          } else {
            res.send(false)
          }
        })
      }
    })
  },

  /**
   * This function renders all the list of transactions made
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  getAllTransactions: (req, res) => {
    let transactions = []
    db.getAll('Customers', function (result) {
      if (result !== null && result !== undefined) {
        // get all customer transactions
        // console.log(result[4][customer.transactions].length)
        transactions = result.filter(elem => elem[customer.transactions].length > 0).map(elem => elem[customer.transactions])
        console.log(transactions) // remove
        // res.render('', transactions) // edit
      }
    })
  }
}

module.exports = adminController