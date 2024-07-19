// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogit-47b0c.firebaseapp.com",
  projectId: "blogit-47b0c",
  storageBucket: "blogit-47b0c.appspot.com",
  messagingSenderId: "231493237972",
  appId: "1:231493237972:web:c8ad4c4ada13bd5734cf41",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
