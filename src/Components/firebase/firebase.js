import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAtxT98TqWV_4JoxY_39LMV_HqI0Iz3NP4",
  authDomain: "instagram-clone-63160.firebaseapp.com",
  projectId: "instagram-clone-63160",
  storageBucket: "instagram-clone-63160.appspot.com",
  messagingSenderId: "947562110024",
  appId: "1:947562110024:web:adab7d9d04c80d8b7e0c7d",
  measurementId: "G-NSHKWQXNJ8",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
