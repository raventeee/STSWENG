const { initializeApp } = require('firebase/app')
const config = require('./config')
const { getFirestore, collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, setDoc } = require('firebase/firestore')

const firebase = initializeApp(config.firebaseConfig)

const db = {
  firebase: firebase,
  getFirestore: getFirestore,
  collection: collection,
  getDocs: getDocs,
  getDoc: getDoc,
  addDoc: addDoc,
  deleteDoc: deleteDoc,
  updateDoc: updateDoc,
  setDoc: setDoc
}

module.exports = db
