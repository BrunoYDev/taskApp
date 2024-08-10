import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let firebaseConfig = {
    apiKey: "YourApiKey",
    authDomain: "YourAuthDomain",
    projectId: "YourProjectId",
    storageBucket: "YourStorageBucket",
    messagingSenderId: "YourMessagingSenderId",
    appId: "YourAppId",
    measurementId: "YourMeasurementId"
  };
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export default firebase;