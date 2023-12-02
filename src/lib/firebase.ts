// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "reddit-c5f5c.firebaseapp.com",
  projectId: "reddit-c5f5c",
  storageBucket: "reddit-c5f5c.appspot.com",
  messagingSenderId: "938562802202",
  appId: "1:938562802202:web:219934394af5a7e28177a3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
