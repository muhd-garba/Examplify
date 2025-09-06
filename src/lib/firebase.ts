"use client";

import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getFunctions, type Functions } from "firebase/functions";

// --- IMPORTANT ---
// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Enable Authentication (Email/Password and Google) and Firestore Database.
// 3. Go to Project Settings > General, and find your web app's config.
// 4. Replace the placeholder values below with your actual Firebase config.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
let app: FirebaseApp;
try {
    app = getApp();
} catch (e) {
    app = initializeApp(firebaseConfig);
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const functions: Functions = getFunctions(app);

export { app, auth, db, functions };