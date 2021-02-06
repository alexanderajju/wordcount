import firebase from "firebase";

// firebaseconfig
const firebaseConfig = {
  apiKey: "AIzaSyCYlPfM4Pj15_frE_lsTFj-QDECJMppUq0",
  authDomain: "wordcount-85307.firebaseapp.com",
  projectId: "wordcount-85307",
  storageBucket: "wordcount-85307.appspot.com",
  messagingSenderId: "2841069410",
  appId: "1:2841069410:web:3de87e8fae3bcbc2a0ce3b",
  measurementId: "G-2RET1TST67",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
