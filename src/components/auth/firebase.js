// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


import dotenv from "dotenv";
dotenv.config();
const firebaseConfig = {
  apiKey: process.env.YOUR_API_KEY,
  authDomain: process.env.your-app.firebaseapp.com,
  projectId: process.env.YOUR_PROJECT_ID,
  storageBucket: process.env.your-app.appspot.com,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
