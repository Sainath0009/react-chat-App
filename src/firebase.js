// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_J5eXEN23LyFasAmPfNDDguyZ9pK4Md8",
    // apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-de5d3.firebaseapp.com",
  projectId: "reactchat-de5d3",
  storageBucket: "reactchat-de5d3.appspot.com",
  messagingSenderId: "1097223623717",
  appId: "1:1097223623717:web:15fab9cdf1b16cd1aedbcc",
  measurementId: "G-NQZLYRE6J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth();
export const db=getFirestore();
export const storage=getStorage();
