// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtM3_bJcr9CdrY_m90pN35YoQTOQ-NoAc",
  authDomain: "react-igbo.firebaseapp.com",
  projectId: "react-igbo",
  storageBucket: "react-igbo.appspot.com",
  messagingSenderId: "352560851272",
  appId: "1:352560851272:web:9e3a7461f73cff54142b7d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
