"use client";

import LogInUseCase from "@/domain/use_cases/log_in_use_case";
import { useState } from "react";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", pw: "" });

  const handleInput = (e: any, emailpw: string) => {
    const value = e.target.value;
    if (emailpw === "email") {
      setLoginInfo({ ...loginInfo, email: value })
    } else {
      setLoginInfo({ ...loginInfo, pw: value })
    }
  }

  const handleLogin = async () => {
    const log_in_use_case = new LogInUseCase()
    const login = await log_in_use_case.logIn(loginInfo.email, loginInfo.pw)
    console.log(login)
  }

  return (
    <main>
      <h1>Login</h1>
      <input type="text" placeholder="Email" onChange={(e) => handleInput(e, "email")} />
      <input type="password" placeholder="Password" onChange={(e) => handleInput(e, "pw")} />
      <button onClick={handleLogin}>Login</button>
    </main>
  );
}