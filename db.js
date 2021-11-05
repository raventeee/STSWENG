const { initializeApp } = require('firebase/app')
const config = require('./config')
const { getFirestore, collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, setDoc, doc, documentId } = require('firebase/firestore')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth')

const firebase = initializeApp(config.firebaseConfig)

const db = {
  firebase: firebase, // actual firebase app
  getFirestore: getFirestore, // firestore instance getter
  collection: collection, // to get a collection
  getDocs: getDocs, // to get all documents in a collection
  getDoc: getDoc, // get 1 document in a collection
  addDoc: addDoc, // add a document in a collection
  deleteDoc: deleteDoc, // delete a document in a collection
  updateDoc: updateDoc, // update a document in a collection
  setDoc: setDoc, // set a document in a collection
  doc: doc, // get document reference
  documentId: documentId, // gets document id
  getAuth: getAuth, // auth instance getter
  register: createUserWithEmailAndPassword, // register with email and password
  login: signInWithEmailAndPassword, // login
  logout: signOut // logout
}

module.exports = db
