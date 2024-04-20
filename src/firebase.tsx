//  Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHVfA9us3YJQe4NeXkbQPkdHYWYKBJjTg",
  authDomain: "message-mingle.firebaseapp.com",
  projectId: "message-mingle",
  storageBucket: "message-mingle.appspot.com",
  messagingSenderId: "104220981443",
  appId: "1:104220981443:web:53fa6a7065c6aa2177ca76", 
  measurementId: "G-QGEB3JGR59"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// const analytics = getAnalytics(app);