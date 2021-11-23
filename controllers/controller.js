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
      styles: ['style'],
      scripts: ['addCart'],
      title: "Jet's Game Store" // title of the web page
    }
    // checks session, if there is a current logged-in user
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
    }
    res.render('home', data)
  },

  /**
   * This function renders the login page
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  getLogin: (req, res) => {
    const data = {
      scripts: ['login'],
      title: 'Login'
    }
    console.log(db.getAuth.currentUser)
    // checks session, if there is a current logged-in user
    if (db.getAuth.currentUser !== null) {
      res.redirect('/')
    } else {
      res.render('login', data)
    }
  },
  /**
   * This function renders the page
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  getRegister: (req, res) => {
    const data = {
      styles: ['style', 'forms'],
      title: 'Register'
    }
    console.log(db.getAuth.currentUser)
    // checks session, if there is a currently logged-in user
    if (db.getAuth.currentUser !== null) {
      res.redirect('/')
    } else {
      res.render('register', data)
    }
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
    const user = {}
    db.authLogin(data, function (result) {
      // result is authuser
      if (result !== false && result !== null) {
        const email = result.email
        db.getAll('Customers', function (result) {
          if (result !== null) {
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
