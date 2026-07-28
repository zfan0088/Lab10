// src/firebase/init.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf4ReLBk2WlWvW7-XsUWXI2sZsmvjrm-o",
  authDomain: "zfan-library.firebaseapp.com",
  projectId: "zfan-library",
  storageBucket: "zfan-library.firebasestorage.app",
  messagingSenderId: "753409196341",
  appId: "1:753409196341:web:1674799e5a0e77e3890c7c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;