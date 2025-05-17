// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase-admin/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEqBpbjSHZC_1gSfI_Nx8HEOL-YpTsn_I",
  authDomain: "ai-interview-platform-a067d.firebaseapp.com",
  projectId: "ai-interview-platform-a067d",
  storageBucket: "ai-interview-platform-a067d.firebasestorage.app",
  messagingSenderId: "589901652616",
  appId: "1:589901652616:web:ea72808209e3f2aa81f53d",
  measurementId: "G-QXDWK07DXD"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);