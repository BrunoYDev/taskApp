import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let firebaseConfig = {
    apiKey: "AIzaSyCGmIhrHwfwCbKrgb_1jL17zRGeE1NkoaA",
    authDomain: "myproject-9bb54.firebaseapp.com",
    projectId: "myproject-9bb54",
    storageBucket: "myproject-9bb54.appspot.com",
    messagingSenderId: "678468981725",
    appId: "1:678468981725:web:1f66148bd9793d0fe39c34",
    measurementId: "G-LS78G9QYZF"
  };
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export default firebase;