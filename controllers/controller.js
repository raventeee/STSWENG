const db = require('../db')

const firebase = db.firebase
const getFirestore = db.getFirestore
const collection = db.collection
const getDoc = db.getDoc
const getDocs = db.getDocs
const addDoc = db.addDoc

const controller = {
  getHome: (req, res, next) => {
    const data = {
      scripts: ['register&login']
    }
    try {
      const docRef = addDoc(collection(getFirestore(firebase), 'Customers'), {
        customerId: '2',
        customerFirstName: 'data.firstName1',
        customerLastName: 'data.lastName1',
        customerAddress: 'data.address',
        customerMobile: 'data.mobile',
        customerGender: 'data.gender',
        customerEmail: 'data.email',
        customerPassword: 'data.password',
        customerCart: [],
        customerTransactions: []
      })
    } catch (e) {
      console.error("Error adding document: ", e)
    }
    res.render('sample', data) // change later
  },

  postHome: (req, res) => {
    const data = req.body
    console.log('data in postHome')
    console.log(data)

    db.collection('Customers').get().then(snap => {
      size = snap.size + 100000; //98 = 100098
      size = size.toString(); //"100098"
      size = size.substring(1,size.length); //"00098"
      db.collection('Customers').add(
      {
          customerId: String(size),
          customerFirstName: data.firstName,
          customerLastName: data.lastName,
          customerAddress: data.address,
          customerMobile: data.mobile,
          customerGender: data.gender,
          customerEmail: data.email,
          customerPassword: data.password,
          customerCart: [],
          customerTransactions: []
      })
    }).catch((err) => {
      console.log(err)
    })
    res.send(true)
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
