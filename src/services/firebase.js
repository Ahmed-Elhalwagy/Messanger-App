import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWQ-QTyLXfSAZ8XOY-dDQ1hVkXABfG_hc",
  authDomain: "react-messanger-3f000.firebaseapp.com",
  projectId: "react-messanger-3f000",
  storageBucket: "react-messanger-3f000.appspot.com",
  messagingSenderId: "175273636372",
  appId: "1:175273636372:web:ef8e6ad7b582c9388f6d01",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
