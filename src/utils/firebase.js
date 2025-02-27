import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-xiyvMaLG3G8SrIwsEotygLpKOIMCxjA",
  authDomain: "guessing-baby-stuff.firebaseapp.com",
  projectId: "guessing-baby-stuff",
  storageBucket: "guessing-baby-stuff.firebasestorage.app",
  messagingSenderId: "189389429359",
  appId: "1:189389429359:web:2f05441dfeab3ee6be4b9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };