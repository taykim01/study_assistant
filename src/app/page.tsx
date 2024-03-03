

import { getAuth } from "firebase/auth";
import Login from "./login/page";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "studyassistant2024.firebaseapp.com",
  projectId: "studyassistant2024",
  storageBucket: "studyassistant2024.appspot.com",
  messagingSenderId: "585360670143",
  appId: "1:585360670143:web:78850e9b5ebbf8459bb50a"
};

initializeApp(firebaseConfig);

export default function Home() {
  const auth = getAuth().currentUser
  switch (auth) {
    case null: return <Login />
    default: return <Home />
  }
}
