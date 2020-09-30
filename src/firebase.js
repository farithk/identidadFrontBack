import firebase from 'firebase/app'
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA3ZtDu0hRIXbzmR6VCdVLrFvCM90DJJec",
    authDomain: "identidad-test.firebaseapp.com",
    databaseURL: "https://identidad-test.firebaseio.com",
    projectId: "identidad-test",
    storageBucket: "identidad-test.appspot.com",
    messagingSenderId: "491587178880",
    appId: "1:491587178880:web:56dbf45b26448d864ab165"
  };

  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();