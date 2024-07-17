// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
