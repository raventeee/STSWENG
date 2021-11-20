const db = require('../db')
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
const login = db.login
const register = db.register
const logout = db.logout

const controller = {
  getHome: (req, res, next) => {
    const data = {
      scripts: ['register&login']
    }
    res.render('sample', data) // change later
  },

  postHome: async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const auth = getAuth(firebase)
    register(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user
      // console.log('user')
      // console.log(user)
      // console.log('==user end==')

      // process registration
      getDocs(collection(getFirestore(firebase), 'Customers')).then((querySnapshot) => {
        let snapSize = querySnapshot.size
        let size = ''
        size = snapSize + 100000
        size = size.toString() // '100098'
        size = size.substring(1, size.length) // '00098'
        const data = {}
        data[customer.id] = size
        data[customer.email] = email
        data[customer.firstName] = req.body.firstName
        data[customer.lastName] = req.body.lastName
        data[customer.address] = 'Null'
        data[customer.mobile] = req.body.mobile
        data[customer.gender] = req.body.gender
        data[customer.cart] = []
        data[customer.transactions] = []
        try {
          setDoc(doc(getFirestore(firebase), 'Customers', email), data)
        } catch (e) {
          console.error('Error adding document ' + e)
        }
        querySnapshot.forEach((doc) => {
          snapSize++
        })
      }).catch((error) => {
        console.log('Error in getDocs' + error.message)
      })
      // console.log('here')

      // logout after
      logout(auth).then(() => {
        console.log('Logout successful')
      }).catch(() => {
        console.log('Logout failed')
      })
      // end
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // console.log('error in catch')
      // console.log(errorCode)
      // console.log(errorMessage)
    })
  },

  postLogin: async (req, res) => {
    const data = req.body
    // console.log('data in postLogin')
    let loggedin = false
    let user = {}
    const auth = getAuth()
    login(auth, data.email, data.password).then((userCredential) => {
      const authuser = userCredential.user
      getDocs(collection(getFirestore(firebase), 'Customers')).then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          // console.log(doc.id)
          if (doc.id === authuser.email) { // check if current document matches the email in the form
            loggedin = true // if email and password matches loggedin variable is now flagged as true
            // user is now inflated with user data including customercart array and transactions array
            user[customer.id] = doc.data().customerId
            user[customer.firstName] = doc.data().customerFirstName
            user[customer.lastName] = doc.data().customerLastName
            user[customer.email] = doc.data().customerEmail
            user[customer.address] = doc.data().customerAddress
            user[customer.mobile] = doc.data().customerMobile
            user[customer.gender] = doc.data().customerGender
            user[customer.cart] = doc.data().customerCart
            user[customer.transactions] = doc.data().customerTransactions
          }
        })
        // console.log(loggedin)
        // console.log(user)
      })
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('error in catch')
      console.log(errorCode)
      console.log(errorMessage)
    })
  }
}

module.exports = controller
