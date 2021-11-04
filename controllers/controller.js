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
    console.log('data in postHOme')
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
  }
}

module.exports = controller
