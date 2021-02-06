import firebase from "firebase";

// firebaseconfig
const firebaseConfig = {
  apiKey: "AIzaSyAAaxF8xIV13UM58Vkah6NAT8N0ODjJz44",
  authDomain: "wordcountapp-19077.firebaseapp.com",
  projectId: "wordcountapp-19077",
  storageBucket: "wordcountapp-19077.appspot.com",
  messagingSenderId: "1032474186002",
  appId: "1:1032474186002:web:0a3744ed046bff856f23cb",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
