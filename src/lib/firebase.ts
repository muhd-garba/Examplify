
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
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

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { app, auth, db, functions };
