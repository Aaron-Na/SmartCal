// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU9iz8-0B-diI-8FdRNFQ0VGsuLn2WEyI",
  authDomain: "smartcal-f922b.firebaseapp.com",
  projectId: "smartcal-f922b",
  storageBucket: "smartcal-f922b.firebasestorage.app",
  messagingSenderId: "461268777166",
  appId: "1:461268777166:web:2f33a0a0a42ebc3809f89f",
  measurementId: "G-B51QG6L1B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
