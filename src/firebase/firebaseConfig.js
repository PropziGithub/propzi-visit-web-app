import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAnrCWu2M_8xkg9D3JAq7PLON-5ZghCVtY",
  authDomain: "propzi-1e9c2.firebaseapp.com",
  databaseURL: "https://propzi-1e9c2.firebaseio.com",
  projectId: "propzi-1e9c2",
  storageBucket: "propzi-1e9c2.appspot.com",
  messagingSenderId: "520048464069",
  appId: "1:520048464069:web:f80ccd57878816ebd4e0ac",
  measurementId: "G-VP6RV8LZRD",
};

firebase.initializeApp(config);
const database = firebase.firestore();
const auth = firebase.auth()
export { database,auth };
