// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB64FEVbpNrj31cQyY1RjO5Onmo5QWQ-pw",
    authDomain: "dashboard-diese.firebaseapp.com",
    projectId: "dashboard-diese",
    storageBucket: "dashboard-diese.appspot.com",
    messagingSenderId: "310142811257",
    appId: "1:310142811257:web:323a4169ea7c6f304728a8",
    measurementId: "G-0FEFN23EPX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
const analytics = getAnalytics(app);