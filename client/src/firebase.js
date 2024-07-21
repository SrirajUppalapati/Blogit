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

let app, storage;

try {
  app = initializeApp(firebaseConfig);
  storage = getStorage(app);
  console.log("Firebase initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { app, storage };
