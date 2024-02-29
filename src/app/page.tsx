"use client";

import { getAuth } from "firebase/auth";
import Login from "./login/page";

export default function Home() {
  const auth = getAuth().currentUser
  switch (auth) {
    case null: return <Login />
    default: return <Home />
  }
}
