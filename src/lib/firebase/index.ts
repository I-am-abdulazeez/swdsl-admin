// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, Timestamp } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey:
    String(import.meta.env.VITE_FIREBASE_API_KEY) ||
    'AIzaSyBl3fGVBhld7pWcDD0re83ABN_dmndrUYc',
  authDomain:
    String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) ||
    'swdsl-admin.firebaseapp.com',
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID) || 'swdsl-admin',
  storageBucket:
    String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) ||
    'swdsl-admin.appspot.com',
  messagingSenderId:
    String(import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID) || '688028260680',
  appId:
    String(import.meta.env.VITE_FIREBASE_APP_ID) ||
    '1:688028260680:web:578aa89897a15d7bddfb7d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseFirstore = getFirestore(app);
export const firebaseStorage = getStorage(app);
export const timestamp = Timestamp.now();
