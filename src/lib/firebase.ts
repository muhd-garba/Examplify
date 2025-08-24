// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getFunctions, type Functions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "examplify-q92jl",
  "appId": "1:677520118980:web:29f6232863cdc21c76e591",
  "storageBucket": "examplify-q92jl.firebasestorage.app",
  "apiKey": "AIzaSyDU8BuEcHFgBxgErEYFL1G7b0qtUVFlBKM",
  "authDomain": "examplify-q92jl.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "677520118980"
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let functions: Functions;


if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);
functions = getFunctions(app);


export { app, auth, db, functions };
