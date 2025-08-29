
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, type Firestore } from "firebase/firestore";
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
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const functions: Functions = getFunctions(app);

// In a development environment, connect to emulators
if (process.env.NODE_ENV === 'development') {
    try {
        connectFirestoreEmulator(db, 'localhost', 8080);
        console.log("Firestore emulator connected");
    } catch (e) {
        console.error("Error connecting to Firestore emulator: ", e);
    }
}


export { app, auth, db, functions };
