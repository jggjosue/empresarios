import { addDoc, collection, getFirestore } from '@firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1AMEvZWM13l3IKtiOmPjopAzTlRSCD1U",
  authDomain: "empresarios-prod.firebaseapp.com",
  projectId: "empresarios-prod",
  storageBucket: "empresarios-prod.firebasestorage.app",
  messagingSenderId: "37936483964",
  appId: "1:37936483964:web:5175af5c6d8384b50c03f9",
  measurementId: "G-677XJZ73MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export { addDoc, app, collection, firestore, getAnalytics, logEvent };

