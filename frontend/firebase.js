import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdUPyqfjYYCDfvY9OeHpcsbhqtcnLwHEs",
  authDomain: "metameet-2dadd.firebaseapp.com",
  projectId: "metameet-2dadd",
  storageBucket: "metameet-2dadd.appspot.com",
  messagingSenderId: "898379800768",
  appId: "1:898379800768:web:8995f2af2fbe342f314d25",
  measurementId: "G-S5XZDG7QYY",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
