import firebase from 'firebase'; 
 
 const config = {
  apiKey: "AIzaSyAXp0th4NInyaUlz9o2PUEf9l6OrvpSKxY",
  authDomain: "wordgam-7b654.firebaseapp.com",
  databaseURL: "https://wordgam-7b654.firebaseio.com",
  projectId: "wordgam-7b654",
  storageBucket: "wordgam-7b654.appspot.com",
  messagingSenderId: "771404515192",
  appId: "1:771404515192:web:2a108b26ca888cb8c5aa8d"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();