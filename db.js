const { initializeApp } = require('firebase/app')
const config = require('./config')
const { getFirestore, collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, setDoc, doc, documentId } = require('firebase/firestore')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence } = require('firebase/auth')

const firebase = initializeApp(config.firebaseConfig)
const auth = getAuth(firebase)
const register = createUserWithEmailAndPassword // register with email and password
const login = signInWithEmailAndPassword // login
const logout = signOut // logout

const db = {
  /**
   * This function adds new email and password in Firebase Authentication
   * and returns a callback containing email, password, and size (document length)
   * @param {object} data - the object to be inserted to a collection
   * @param {function} callback - the function to be executed after getting all documents
   */
  addAuth: (data, callback = null) => {
    const email = data.email
    const password = data.password
    register(auth, email, password).then((userCredential) => {
      const obj = {
        email: email,
        password: password
      }
      // gets the document length of Customers collection
      getDocs(collection(getFirestore(firebase), 'Customers')).then((querySnapshot) => {
        const snapSize = querySnapshot.size
        let size = ''
        size = snapSize + 100000
        size = size.toString() // '100098'
        size = size.substring(1, size.length) // '00098'
        obj.size = size
        callback(obj) // put obj to callback containing email, password, & size
      }).catch((error) => {
        console.log('Error in getDocs' + error.message)
      })
      // logout after
      logout(auth).then(() => {
        console.log('Logout successful')
      }).catch(() => {
        console.log('Logout failed')
      })
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('error in catch')
      console.log(errorCode)
      console.log(errorMessage)
    })
  },
  /**
   * This function logs in the email and password from data and
   * returns the callback containing the authenticated user object
   * and returns a callback containing the authenticated user object
   * @param {object} data - the object to be inserted to a collection
   * @param {function} callback - the function to be executed after getting all documents
   */
  authLogin: (data, callback = null) => {
    const email = data.email
    const password = data.password
    setPersistence(auth, 'local').then(() => {
      login(auth, email, password).then((userCredential) => {
        const authuser = userCredential.user
        callback(authuser)
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        callback(false)
        console.log('error in catch')
        console.log(errorCode)
        console.log(errorMessage)
      })
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      callback(false)
      console.log(errorCode)
      console.log(errorMessage)
    })
  },

  /**
   * This function adds a new document in a collection
   * @param {string} col - the string collection name
   * @param {string} id - the document id to be set
   * @param {object} data - the object to be inserted to a collection
   * @param {function} callback - the function to be executed after getting all documents
   */
  insert: (col, id, data, callback = null) => {
    try {
      setDoc(doc(getFirestore(firebase), col, id), data)
      callback(true)
    } catch (e) {
      console.error('Error adding document ' + e)
    }
  },
  /**
   * This function gets a document in a collection given a set of conditions
   * @param {string} col - the string collection name
   * @param {string} id - the string id of the document to be retrieved
   * @param {function} callback - the function to be executed after getting all documents
   */
  getOne: (col, id, callback = null) => {
    getDoc(doc(getFirestore(firebase), col, id)).then((docSnapshot) => {
      callback(docSnapshot.data())
    }).catch(() => {
      callback(false)
    })
  },
  /**
   * This function gets all documents in a collection
   * @param {string} col - the string collection name
   * @param {function} callback - the function to be executed after getting all documents
   */
  getAll: (col, callback = null) => {
    const records = []
    getDocs(collection(getFirestore(firebase), col)).then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        records.push(doc.data())
      })
      callback(records)
    })
  },
  /**
   * This function updates a document given the collection and id
   * @param {string} col - the string collection name
   * @param {string} id - the string document id
   * @param {object} data - the object containing document attribute to update
   * @param {function} callback - the function to executed after updating a document
   */
  updateOne: (col, id, data, callback = null) => {
    updateDoc(doc(getFirestore(firebase), col, id), data).then(() => {
      callback(true)
    }).catch(() => {

    })
  },
  getAuth: auth,
  logOut: logout
}

module.exports = db
