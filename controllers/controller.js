const db = require('../db')
const customer = require('../models/customer')

const controller = {
  /**
   * This function renders the home page
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  getHome: (req, res) => {
    const data = {
      scripts: ['register&login']
    }
    console.log('======================================================')
    console.log(db.getAuth.currentUser)
    if (db.getAuth.currentUser != null) {
      data.status = 'Logged in'
    } else {
      data.status = 'Not logged in'
    }
    // db.checkSession(function (result) {
    //   console.log('checkSession = ' + result)
    //   if (result !== false || result !== null) {
    //     console.log(result)
    //   }
    // })
    res.render('sample', data) // change later
  },
  getHome2: (req, res) => {
    console.log('======================================================')
    console.log(db.getAuth.currentUser)
    let data = {
      name: 'francis',
      age: 21
    }
    res.render('home', data)
  },
  /**
   * This function registers a new customer
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  postHome: (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const data = {
      email: email,
      password: password
    }
    db.addAuth(data, function (result) {
      if (result != null) {
        const size = result.size
        const user = {}
        user[customer.id] = size
        user[customer.email] = email
        user[customer.firstName] = req.body.firstName
        user[customer.lastName] = req.body.lastName
        user[customer.address] = 'Null'
        user[customer.mobile] = req.body.mobile
        user[customer.gender] = req.body.gender
        user[customer.cart] = []
        user[customer.transactions] = []
        // insert customer to Customers collection
        db.insert('Customers', email, user, function (result) {
          if (result) {
            res.send(true)
          } else {
            res.send(false)
          }
        })
      } else {
        res.send(false)
      }
    })
  },

  /**
   * This function logs in a customer
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  postLogin: (req, res) => {
    const data = req.body
    // console.log('data in postLogin')
    let loggedin = false
    let records = []
    const user = {}
    db.authLogin(data, function (result) {
      // result is authuser
      if (result != null) {
        const email = result.email
        db.getAll('Customers', function (result) {
          if (result != null) {
            let flag = false
            let i = 0
            while (!flag) {
              if (email === result[i].customerEmail) {
                user[customer.id] = result[i].customerId
                user[customer.firstName] = result[i].customerFirstName
                user[customer.lastName] = result[i].customerLastName
                user[customer.email] = result[i].customerEmail
                user[customer.address] = result[i].customerAddress
                user[customer.mobile] = result[i].customerMobile
                user[customer.gender] = result[i].customerGender
                user[customer.cart] = result[i].customerCart
                user[customer.transactions] = result[i].customerTransactions
                flag = true
              }
              i++
            }
            console.log('user')
            console.log(user)
            res.send(true)
          } else {
            res.send(false)
          }
        })
      } else {
        res.send(false)
      }
    })
  },
  /**
   * This function logs out the current user
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  logOut: (req, res) => {
    db.logOut(db.getAuth).then(() => {
      console.log('logged out')
      res.redirect('/')
    }).catch(() => {
      res.render('error')
    })
  }
}

module.exports = controller
