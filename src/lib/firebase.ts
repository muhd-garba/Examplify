
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getFunctions, type Functions } from "firebase/functions";

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
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const functions: Functions = getFunctions(app);

export { app, auth, db, functions };
