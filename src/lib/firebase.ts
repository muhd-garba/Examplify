
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "cbt-system-424614",
  "appId": "1:677520118980:web:32e3a1f33959a85276e591",
  "storageBucket": "cbt-system-424614.appspot.com",
  "apiKey": "AIzaSyDU8BuEcHFgBxgErEYFL1G7b0qtUVFlBKM",
  "authDomain": "cbt-system-424614.firebaseapp.com",
  "measurementId": "G-5G3W9Q03C8",
  "messagingSenderId": "677520118980"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { app, auth, db, functions };
