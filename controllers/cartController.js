const db = require('../db')
const product = require('../models/product')
const customer = require('../models/customer')

const firebase = db.firebase
const getFirestore = db.getFirestore
const collection = db.collection
const getDoc = db.getDoc
const getDocs = db.getDocs
const addDoc = db.addDoc
const setDoc = db.setDoc
const doc = db.doc
const getAuth = db.getAuth

const cartController = {
  addToCart: (req, res) => {
    /*
      Needed info
      customerId
    */
    const data = {}
    data[product.id] = req.body.productId
    const customerId = req.body.customerId
  }
}

module.exports = cartController
