"use client";

import { getAuth } from "firebase/auth";
import Login from "./login/login";
import { initializeApp } from "firebase/app";
import Home from "./home/home";
import ReduxProvider from "@/app/redux_provider";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "studyassistant2024.firebaseapp.com",
  projectId: "studyassistant2024",
  storageBucket: "studyassistant2024.appspot.com",
  messagingSenderId: "585360670143",
  appId: "1:585360670143:web:78850e9b5ebbf8459bb50a"
};

initializeApp(firebaseConfig);

export default function MyApp() {
  const auth = getAuth().currentUser
  
  return (
    <ReduxProvider>
      {
        auth ? <ReduxProvider><Home /></ReduxProvider> : <ReduxProvider><Login /></ReduxProvider>
      }
    </ReduxProvider>
  )
}