const db = require('../db')
const customer = require('../models/customer')

const controller = {
  /**
   * This function renders the ps5 page
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  getPs5Page: (req, res) => {
    const data = {
      styles: ['style'],
      scripts: ['addCart', 'home', 'register', 'login'],
      title: "Jet's Game Store" // title of the web page
    }
    // checks session, if there is a current logged-in user
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
      data.isLogged = { loggedIn: true,  loggedOut: false} // logged in
    } else {
      data.isLogged = { loggedIn: false, loggedOut: true } // logged out
    }

    db.getAll('Products', function (result) {
      let temp = [
        result[0], result[2], result[7], result[9], result[10]
      ]
      let productsPS5 = []

      temp.forEach((element) => {
        let item = {
          productName: element.productName,
          productImages: element.productImages[0],
          productCategory: element.productCategory,
          productPrice: element.productPrice,
          productStock: element.productStock,
          productDesc: element.productDesc,
          productBrand: element.productBrand,
          productId: element.productId,
          productDiscounted: element.productDiscounted,
          productDisprice: element.productDisprice
        };
        productsPS5.push(item)
      })
      data.productsPS5 = productsPS5;
      res.render('ps5page', data)
    });
  },

  /**
   * This function renders the ps4 page
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  getPs4Page: (req, res) => {
    const data = {
      styles: ['style'],
      scripts: ['addCart', 'home', 'register', 'login'],
      title: "Jet's Game Store" // title of the web page
    }
    // checks session, if there is a current logged-in user
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
      data.isLogged = { loggedIn: true,  loggedOut: false} // logged in
    } else {
      data.isLogged = { loggedIn: false, loggedOut: true } // logged out
    }
    
    db.getAll('Products', function (result) {
      let temp = [
        result[1], result[4]
      ]
      let productsPS4 = []

      temp.forEach((element) => {
        let item = {
          productName: element.productName,
          productImages: element.productImages[0],
          productCategory: element.productCategory,
          productPrice: element.productPrice,
          productStock: element.productStock,
          productDesc: element.productDesc,
          productBrand: element.productBrand,
          productId: element.productId,
          productDiscounted: element.productDiscounted,
          productDisprice: element.productDisprice
        };
        productsPS4.push(item)
      })
      data.productsPS4 = productsPS4;
      res.render('ps4page', data)
    });
  },

  getXboxPage: (req, res) => {
    const data = {
      styles: ['style'],
      scripts: ['addCart', 'home', 'register', 'login'],
      title: "Jet's Game Store" // title of the web page
    }
    // checks session, if there is a current logged-in user
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
      data.isLogged = { loggedIn: true,  loggedOut: false} // logged in
    } else {
      data.isLogged = { loggedIn: false, loggedOut: true } // logged out
    }
    
    db.getAll('Products', function (result) {
      let temp = [
        result[5], result[6], result[8]
      ]
      let productsXBOX = []

      temp.forEach((element) => {
        let item = {
          productName: element.productName,
          productImages: element.productImages[0],
          productCategory: element.productCategory,
          productPrice: element.productPrice,
          productStock: element.productStock,
          productDesc: element.productDesc,
          productBrand: element.productBrand,
          productId: element.productId,
          productDiscounted: element.productDiscounted,
          productDisprice: element.productDisprice
        };
        productsXBOX.push(item)
      })
      data.productsXBOX = productsXBOX;
      res.render('xboxpage', data)
    });
  },

  /**
   * This function renders the nsw page
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  getNswPage: (req, res) => {
    const data = {
      styles: ['style'],
      scripts: ['addCart', 'home', 'register', 'login'],
      title: "Jet's Game Store" // title of the web page
    }
    // checks session, if there is a current logged-in user
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
      data.isLogged = { loggedIn: true,  loggedOut: false} // logged in
    } else {
      data.isLogged = { loggedIn: false, loggedOut: true } // logged out
    }
    
    db.getAll('Products', function (result) {
      let temp = [
        result[3]
      ]
      let productsNSW = []

      temp.forEach((element) => {
        let item = {
          productName: element.productName,
          productImages: element.productImages[0],
          productCategory: element.productCategory,
          productPrice: element.productPrice,
          productStock: element.productStock,
          productDesc: element.productDesc,
          productBrand: element.productBrand,
          productId: element.productId,
          productDiscounted: element.productDiscounted,
          productDisprice: element.productDisprice
        };
        productsNSW.push(item)
      })
      data.productsNSW = productsNSW;
      res.render('nswpage', data)
    });
  },

  
  /**
   * This function renders the pc/mac page
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  getPcmacPage: (req, res) => {
    const data = {
      styles: ['style'],
      scripts: ['addCart', 'home', 'register', 'login'],
      title: "Jet's Game Store" // title of the web page
    }
    // checks session, if there is a current logged-in user
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
      data.isLogged = { loggedIn: true,  loggedOut: false} // logged in
    } else {
      data.isLogged = { loggedIn: false, loggedOut: true } // logged out
    }

    db.getAll('Products', function (result) {
      let temp = [
        result[11]
      ]
      let productsPC = []

      temp.forEach((element) => {
        let item = {
          productName: element.productName,
          productImages: element.productImages[0],
          productCategory: element.productCategory,
          productPrice: element.productPrice,
          productStock: element.productStock,
          productDesc: element.productDesc,
          productBrand: element.productBrand,
          productId: element.productId,
          productDiscounted: element.productDiscounted,
          productDisprice: element.productDisprice
        };
        productsPC.push(item)
      })
      data.productsPC = productsPC;
      res.render('pcmacpage', data)
    });
  },

  /**
   * This function renders the home page
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  getHome: (req, res) => {
    const data = {
      styles: ['style'],
      scripts: ['addCart', 'home', 'register', 'login', 'toast'],
      title: "Jet's Game Store" // title of the web page
    }
    // checks session, if there is a current logged-in user
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
      data.isLogged = { loggedIn: true,  loggedOut: false} // logged in
    } else {
      data.isLogged = { loggedIn: false, loggedOut: true } // logged out
    }

    db.getAll('Products', function (result) {
      let allProducts1 = []
      let allProducts2 = []
      let featured = result.slice(0, 6) // featured products
      let releases = result.slice(6,) // new releases products
      
      featured.forEach((element) => {
        let item = {
          productName: element.productName,
          productImages: element.productImages[0],
          productCategory: element.productCategory,
          productPrice: element.productPrice,
          productStock: element.productStock,
          productDesc: element.productDesc,
          productBrand: element.productBrand,
          productId: element.productId,
          productDiscounted: element.productDiscounted,
          productDisprice: element.productDisprice
        };
        allProducts1.push(item)
      });

      releases.forEach((element) => {
        let item = {
          productName: element.productName,
          productImages: element.productImages[0],
          productCategory: element.productCategory,
          productPrice: element.productPrice,
          productStock: element.productStock,
          productDesc: element.productDesc,
          productBrand: element.productBrand,
          productId: element.productId,
          productDiscounted: element.productDiscounted,
          productDisprice: element.productDisprice
        };
        allProducts2.push(item)
      });
      data.allProducts1 = allProducts1
      data.allProducts2 = allProducts2
      res.render('home', data)
    });
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
        user.isOrdered = false
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
      // Email error: 'auth/user-not-found'  Password error: 'auth/wrong-password'
      if (result !== 'auth/user-not-found' && result !== 'auth/wrong-password') {
        const email = result.email
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
              res.send('0')
            } else {
              console.log("not an admin")
              db.getAll('Customers', function (result) {
                if (result !== null) {
                  let i = 0
                  while (!flag && i < result.length) 
                  {
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
                  if (flag == true)
                  {
                    res.send('1')
                  }
                  else 
                  {
                    res.send('2')
                  }
                } 
                else 
                {
                  res.send('2')
                }
              })
            }
          }
          else { 
            res.send('2')
          }
        })
      } else if (result === 'auth/user-not-found') { //if user is not registered
        res.send('2')
      } else if (result === 'auth/wrong-password') {
        res.send('3')
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
  },

  /**
   * This function checks if an email already exist in the database
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  checkEmail: (req, res) => {
    const email = req.body.email
    db.getOne('Customers', email, function (result) {
      // send true if email exists
      if (result !== null && result !== undefined) {
        res.send(true)
      } else {
        res.send(false)
      }
    })
  }
}

module.exports = controller
