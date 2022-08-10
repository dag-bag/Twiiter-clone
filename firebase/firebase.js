/** @format */
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq2LHKef8UnLyGlfwxCmLySyeqafI32X4",
  authDomain: "twiiter-clone-3df17.firebaseapp.com",
  projectId: "twiiter-clone-3df17",
  storageBucket: "twiiter-clone-3df17.appspot.com",
  messagingSenderId: "872051135859",
  appId: "1:872051135859:web:e413b1ca335a60ddc26106",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
