import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPZD6wKmfWzKZgOis7YUvMV0Zga58d1jw",
  authDomain: "cross-platform-final-pro-e6802.firebaseapp.com",
  projectId: "cross-platform-final-pro-e6802",
  storageBucket: "cross-platform-final-pro-e6802.appspot.com",
  messagingSenderId: "822514587629",
  appId: "1:822514587629:web:8a0f07f3a5daa1690af9e4",
  measurementId: "G-5P867V1SP7",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
