const firebase = require('../db')

const db = firebase.firestore()

const controller = {
  getHome: (req, res, next) => {
    const data = {
      scripts: ['register&login']
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
