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
      scripts: ['addCart', 'home', 'register', 'login', 'toast', 'cart'],
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
  }
}

module.exports = cartController