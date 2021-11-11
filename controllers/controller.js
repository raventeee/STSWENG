const db = require('../db')

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
      console.log('user')
      console.log(user)
      console.log('==user end==')

      // process registration
      getDocs(collection(getFirestore(firebase), 'Customers')).then((querySnapshot) => {
        let snapSize = querySnapshot.size
        let size = ''
        size = snapSize + 100000
        size = size.toString() // '100098'
        size = size.substring(1, size.length) // '00098'
        const data = {
          customerId: size,
          customerEmail: email,
          customerFirstName: req.body.firstName,
          customerLastName: req.body.lastName,
          customerAddress: 'Null',
          customerMobile: req.body.mobile,
          customerGender: req.body.gender,
          customerCart: [],
          customerTransactions: []
        }
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
      console.log('here')

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
      console.log('error in catch')
      console.log(errorCode)
      console.log(errorMessage)
    })
  },

  postLogin: (req, res) => {
    const data = req.body
    console.log('data in postLogin')
    let loggedin = false
    let user = null
    const auth = getAuth()
    login(auth, data.email, data.password).then((userCredential) => {
      const authuser = userCredential.user
      getDocs(collection(getFirestore(firebase), 'Customers')).then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          console.log(doc.id)
          if (doc.id === authuser.email) { // check if current document matches the email in the form
            loggedin = true // if email and password matches loggedin variable is now flagged as true
            user = {
              customerId: doc.data().customerId,
              customerFirstName: doc.data().customerFirstName,
              customerLastName: doc.data().customerLastName,
              customerEmail: doc.data().customerEmail,
              customerAddress: doc.data().customerAddress,
              customerMobile: doc.data().customerMobile,
              customerGender: doc.data().customerGender,
              customerCart: doc.data().customerCart,
              customerTransactions: doc.data().customerTransactions
            } // user is now inflated with user data including customercart array and transactions array
          }
        })
        console.log(loggedin)
        console.log(user)
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
