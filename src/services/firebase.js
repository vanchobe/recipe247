import firebase from 'firebase'; 
 
 const config = {
    apiKey: "AIzaSyCtfNPYdKm2kdu2dczHZ2FmpuxLnV1a_z0",
    authDomain: "recipe247-a8a8e.firebaseapp.com",
    projectId: "recipe247-a8a8e",
    storageBucket: "recipe247-a8a8e.appspot.com",
    messagingSenderId: "258438322371",
    appId: "1:258438322371:web:cec9e5eaa802a6b47a6a76"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();