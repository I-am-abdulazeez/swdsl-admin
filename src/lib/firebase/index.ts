// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, Timestamp } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseFirstore = getFirestore(app);
export const firebaseStorage = getStorage(app);
export const timestamp = Timestamp.now();
