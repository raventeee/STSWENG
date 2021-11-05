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
    const data = {
      customerFirstName: req.body.firstName,
      customerLastName: req.body.lastName,
      customerAddress: req.body.address,
      customerMobile: req.body.mobile,
      customerGender: req.body.gender,
      customerEmail: email,
      customerCart: [],
      customerTransactions: []
    }
    const auth = getAuth(firebase)
    register(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log('user')
      console.log(user)
      console.log('==user end==')

      // process registration
      getDocs(collection(getFirestore(firebase), 'Customers')).then((querySnapshot) => {
        let snapSize = 0
        let size = ''
        size = snapSize + 100000
        size = size.toString() // '100098'
        size = size.substring(1, size.length) // '00098'
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

  postLogin: (req, res) =>
  {
    const data = req.body
    console.log('data in postLogin')
    console.log(data)
    let loggedin = false;
    let user = null;
    db.collection('Customers').get().then((snapshot) => { //get the whole collection of users
      snapshot.docs.forEach(doc =>{ //traverse through all documents in customer collection
        if(doc.data().customerEmail == data.email) //check if current document matches the email in the form
        {
          if(doc.data().customerPassword == data.password) //if email matches, now check for password if matches
          {
            loggedin = true; //if email and password matches loggedin variable is now flagged as true
            user = 
            {
              customerId : doc.data().customerId,
              customerFirstName : doc.data().customerFirstName,
              customerLastName : doc.data().customerLastName,
              customerAddress : doc.data().customerAddress,
              customerMobile : doc.data().customerMobile,
              customerGender : doc.data().customerGender,
              customerEmail : doc.data().customerEmail,
              customerPassword : doc.data().customerPassword,
              customerCart : doc.data().customerCart,
              customerTransactions : doc.data().customerTransactions
            } //user is now inflated with user data including customercart array and transactions array
        }
        }
      });
      //from this point forward, this is just temporary front end to set example on how to pull data from user object
      console.log(user)
      console.log(loggedin)
      
  });
  }
}

module.exports = controller
