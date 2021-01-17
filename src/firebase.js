import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCF-jrpQoG6e6scJXicYOR03SmPv2C9k6E",
    authDomain: "mysocialmedia-99316.firebaseapp.com",
    projectId: "mysocialmedia-99316",
    storageBucket: "mysocialmedia-99316.appspot.com",
    messagingSenderId: "496099253799",
    appId: "1:496099253799:web:9db773085a03f9ca353802",
  }
firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()
const auth = firebase.auth()


const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')


export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}