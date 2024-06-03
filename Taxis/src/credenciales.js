// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRsYI1LMeMUafZPfFaCh6umiNqCv116EA",
  authDomain: "gestiontaxi-c1425.firebaseapp.com",
  projectId: "gestiontaxi-c1425",
  storageBucket: "gestiontaxi-c1425.appspot.com",
  messagingSenderId: "545752029742",
  appId: "1:545752029742:web:7a9e145eed82b094db1dbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);