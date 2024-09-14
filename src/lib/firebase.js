import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_J5eXEN23LyFasAmPfNDDguyZ9pK4Md8",
  authDomain: "reactchat-de5d3.firebaseapp.com",
  projectId: "reactchat-de5d3",
  storageBucket: "reactchat-de5d3.appspot.com",
  messagingSenderId: "1097223623717",
  appId: "1:1097223623717:web:15fab9cdf1b16cd1aedbcc",
  measurementId: "G-NQZLYRE6J1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
