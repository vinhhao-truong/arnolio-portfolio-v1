// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "arnolio.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DB_URL,
  projectId: "arnolio",
  storageBucket: "arnolio.appspot.com",
  messagingSenderId: "867317732754",
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseDb = getDatabase(app);
export const firebaseAuth = getAuth(app);
export const firebaseStorage = getStorage(app);
