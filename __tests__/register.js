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
  testRegister: async (req) => {
    const email = req.email
    const password = req.password
    const auth = getAuth(firebase)
    register(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user
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
  }
}

module.exports = controller
