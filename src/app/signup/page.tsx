"use client";

import SignUpUseCase from "@/domain/use_cases/sign_up_use_case";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [loginInfo, setLoginInfo] = useState({ email: "", pw: "" });
  const router = useRouter()

  const handleInput = (e: any, emailpw: string) => {
    const value = e.target.value;
    if (emailpw === "email") {
      setLoginInfo({ ...loginInfo, email: value })
    } else {
      setLoginInfo({ ...loginInfo, pw: value })
    }
  }

  const handleSignUp = async () => {
    const sign_up_use_case = new SignUpUseCase()
    const signUp = await sign_up_use_case.createUser(loginInfo.email, loginInfo.pw)
    console.log(signUp)
  }

  return (
    <main className="vf">
      <h1>Sign Up</h1>
      <div className="hf">
        <input type="text" placeholder="Email" onChange={(e) => handleInput(e, "email")} />
        <input type="password" placeholder="Password" onChange={(e) => handleInput(e, "pw")} />
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      <div className="hf">
        <h2>Already a member?</h2>
        <button onClick={() => router.push('/login')}>Login</button>
      </div>
    </main>
  );
}