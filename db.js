const admin = require('firebase-admin')
const serviceAccount = require('./permission/jetcomputershop-permission.json')

const db = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = db
