const db = require('../db')
const product = require('../models/product')
const customer = require('../models/customer')
const cartProd = require('../models/cartProd')

const cartController = {
  /**
   * This function adds an item in the cart
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  addToCart: (req, res) => {
    /*
      Needed info
      customerId, productId, qty
    */
    if (db.getAuth.currentUser === null) {
      // send false indicating add to cart is not possible and redirect to login page
      res.send(false)
    } else {
      // process add to cart
      const customerId = req.body.customerId
      const productId = req.body.productId
      const qty = req.body.qty
      db.getOne('Customers', customerId, function (result) {
        if (result !== null) {
          console.log(result)
          const customerCart = result.customerCart
          let found = false
          for (let i = 0; i < customerCart.length; i++) {
            if (customerCart[i].productId === productId) {
              customerCart[i].qty++
              found = true
              break
            }
          }
          // if not found, directly append
          if (found === false) {
            customerCart.push({
              productId: productId,
              qty: qty
            })
          }
          const data = {
            customerCart: customerCart
          }
          console.log('data')
          console.log(data)
          // update customerCart
          db.updateOne('Customers', customerId, data, function (result) {
            if (result !== null) {
              res.send(true)
            } else {
              res.send(false)
            }
          })
        } else {
          res.send(false)
        }
      })
    }
  },

  /**
   * This function opens the cart
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  openCart: (req, res) => {
    const email = req.params.email;
    const data = {
      styles: ['style'],
      scripts: ['addCart', 'home', 'register', 'login', 'cart'],
      title: "Jet's Game Store - Cart Page" // title of the web page
    }
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
      data.isLoggedIn = true
      db.getOne('Customers', email, function (result) {
        if (result !== null) {
          const customerCart = result.customerCart;
          const prodIds = customerCart.map((element) => { return element.productId });
          // console.log(customerCart);
          // console.log(prodIds);
          let cartProducts = [];
          db.getAll('Products', function (result) {
            if (result) {
              // retrieves the products inside the cart
              result.forEach((element) => {
                if (prodIds.includes(element.productId)) {
                  let item = {
                    productName: element.productName,
                    productImages: element.productImages[0],
                    productCategory: element.productCategory,
                    productPrice: element.productPrice,
                    productStock: element.productStock,
                    productDesc: element.productDesc,
                    productBrand: element.productBrand,
                    productId: element.productId
                  };
                  // iterates customerCart and inserts the qty in cart
                  customerCart.every((elem) => {
                    if (elem.productId == item.productId) {
                      item.qty = elem.qty;
                      return false;
                    } else {
                      return true;
                    }
                  });
                  cartProducts.push(item);
                }
              });
              console.log(cartProducts);
              data.cartProducts = cartProducts;
              res.render('cart', data); // render the view
            } else {
              data.cartProducts = []
            }
          });
        }
      });
    }
  },

  /**
   * This function edits the cart
   */
  editCart: function (req, res) {
    const productsArr = JSON.parse(req.body.productsArr)
    const email = req.body.customerEmail
    const data = {
      customerCart: productsArr
    }
    db.updateOne('Customers', email, data, function (result) {
      if (result != null && result != undefined) {
        res.send(true)
      } else {
        res.send(false)
      }
    });
  },

  /** This function opens the order status page
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  openOrderStatus: (req, res) => {
    const email = req.params.email;
    const data = {
      styles: ['style'],
      scripts: ['home', 'cart'],
      title: "Jet's Game Store - Order Status" // title of the web page
    }
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
      data.isLoggedIn = true
      db.getOne('Customers', email, function (result) {
        if (result !== null) {
          const customerCart = result.customerCart;
          const prodIds = customerCart.map((element) => { return element.productId });
          // console.log(customerCart);
          // console.log(prodIds);
          let cartProducts = [];
          db.getAll('Products', function (result) {
            if (result) {
              // retrieves the products inside the cart
              result.forEach((element) => {
                if (prodIds.includes(element.productId)) {
                  let item = {
                    productName: element.productName,
                    productImages: element.productImages[0],
                    productCategory: element.productCategory,
                    productPrice: element.productPrice,
                    productStock: element.productStock,
                    productDesc: element.productDesc,
                    productBrand: element.productBrand,
                    productId: element.productId
                  };
                  // iterates customerCart and inserts the qty in cart
                  customerCart.every((elem) => {
                    if (elem.productId == item.productId) {
                      item.qty = elem.qty;
                      return false;
                    } else {
                      return true;
                    }
                  });
                  cartProducts.push(item);
                }
              });
              console.log(cartProducts);
              data.cartProducts = cartProducts;
              res.render('orderstatus', data); // render the view
            } else {
              data.cartProducts = []
            }
          });
        }
      });
    }
  },

  /** This function opens the check out page with cart
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
   openCheckoutPage: (req, res) => {
    const email = req.params.email;
    const data = {
      styles: ['style'],
      scripts: ['home', 'cart'],
      title: "Jet's Game Store - Cart Page" // title of the web page
    }
    if (db.getAuth.currentUser != null) {
      data.user = {
        email: db.getAuth.currentUser.providerData[0].email
      }
      data.isLoggedIn = true
      db.getOne('Customers', email, function (result) {
        if (result !== null) {
          const customerCart = result.customerCart;
          const prodIds = customerCart.map((element) => { return element.productId });
          // console.log(customerCart);
          // console.log(prodIds);
          let cartProducts = [];
          db.getAll('Products', function (result) {
            if (result) {
              // retrieves the products inside the cart
              result.forEach((element) => {
                if (prodIds.includes(element.productId)) {
                  let item = {
                    productName: element.productName,
                    productImages: element.productImages[0],
                    productCategory: element.productCategory,
                    productPrice: element.productPrice,
                    productStock: element.productStock,
                    productDesc: element.productDesc,
                    productBrand: element.productBrand,
                    productId: element.productId
                  };
                  // iterates customerCart and inserts the qty in cart
                  customerCart.every((elem) => {
                    if (elem.productId == item.productId) {
                      item.qty = elem.qty;
                      return false;
                    } else {
                      return true;
                    }
                  });
                  cartProducts.push(item);
                }
              });
              console.log(cartProducts);
              data.cartProducts = cartProducts;
              res.render('checkout', data); // render the view
            } else {
              data.cartProducts = []
            }
          });
        }
      });
    }
  },

  /** This function processes the confirmed checkout request by a customer
   *  assuming the customer's address is still "Null"
   * @param req - the incoming request containing either the query or body
   * @param res - the result to be sent out after processing the request
   */
  confirmCheckout: (req, res) => {
    // check if the currently logged-in user is the same as in the request
    if (db.getAuth.currentUser != null) {
      const address = req.query.address
      const address2 = req.query.address2
      const country = req.query.country
      const zip = req.query.zip
      const region = req.query.region
      const current_email = req.query.current_email
      
      let billing_address = address.concat(address2 + ', ' + region + ', ' + zip + ', ' + country)
      db.getOne('Customers', current_email, function (result) {
        if (result !== null) {
          let customerCart = result.customerCart // get customer's cart, each element is productId, qty
          let customerTransactions = result.customerTransactions // get customerTransactions array
          
          // these would be attributes for one document in Transactions collection
          let finalProducts = []
          let totalTransactPrice = 0 // overall total price of this transaction
          // update the customerAddress and empty the customerCart
          db.updateOne('Customers', current_email, { customerAddress: billing_address, customerCart: [] }, function (result) {
            if (result != null && result != undefined) {
             // update all the product stocks
             db.getAll('Products', function (result) {
               // iterate the products
               let i = 0;
               result.forEach((element) => {
                if (i < customerCart.length && element.productId == customerCart[i].productId) {
                  element.productStock = element.productStock - customerCart[i].qty // subtract stock by qty in cart
                  db.updateOne('Products', element.productId, { productStock: element.productStock }, function(res) {}); // update the document
                  
                  // add to finalProducts array
                  if (element.productDiscounted == true) {
                    let tempPrice = element.productPrice - element.productDisprice
                    let tempProduct = {
                      price: tempPrice,
                      productId: element.productId,
                      quantity: customerCart.qty,
                      totalPrice: tempPrice * customerCart[i].qty
                    }

                    totalTransactPrice += tempProduct.totalPrice // add to the overall total price of this transaction
                    finalProducts.push(tempProduct) // add to finalProducts array
                    customerTransactions.push(element.productId)

                  } else if (element.productDiscounted == false) {
                    let tempProduct = {
                      price: element.productPrice,
                      productId: element.productId,
                      quantity: customerCart[i].qty,
                      totalPrice: element.productPrice * customerCart[i].qty
                    }

                    totalTransactPrice += tempProduct.totalPrice // add to the overall total price of this transaction
                    finalProducts.push(tempProduct) // add to finalProducts array
                    customerTransactions.push(element.productId)
                  }
                  i++; // increment ctr for customerCart
                }
               });
               // update customerTransaction
               db.updateOne('Customers', current_email, { customerTransactions: customerTransactions }, function (res) {})

               const data = {
                 finalProducts: finalProducts,
                 totalTransactPrice: totalTransactPrice
               }
               console.log(data)
               // insert the transaction to Transactions collection
               db.getAll('Transactions', function (result) {
                if (result !== null) {
                  let size = result.length
                  size = size + 1000000
                  size = size.toString() // '1000006'
                  size = size.substring(1, size.length) // '000006'
                  size = 'T' + size
                  db.insert('Transactions', size, data, function (result) {
                    if (result !== null) {
                      res.redirect('/')
                    } else {
                      res.send(false)
                    }
                  })
                }
               });

             });
            } else {
              console.log('error')
            }
          });
        }
      });
    } else {
      res.render('error')
    }
  },
}

module.exports = cartController