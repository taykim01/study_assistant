"use client";

import LogInUseCase from "@/domain/use_cases/log_in_use_case";
import LogOutUseCase from "@/domain/use_cases/log_out_use_case";
import Button from "@/presentation/components/button";
import Cards from "@/presentation/components/cards";
import Input from "@/presentation/components/inputs";
import Loading from "@/presentation/components/loading";
import Toggle from "@/presentation/components/toggle";
import { Result } from "@/types";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", pw: "" });
  const router = useRouter()

  const handleInput = (input: any, emailpw: string) => {
    if (emailpw === "email") {
      setLoginInfo({ ...loginInfo, email: input })
    } else {
      setLoginInfo({ ...loginInfo, pw: input })
    }
  }

  const handleLogin = async () => {
    const log_in_use_case = new LogInUseCase()
    const login = await log_in_use_case.logIn(loginInfo.email, loginInfo.pw)
    if (login.result === Result.Success) {
      router.push('/home')
    }
  }

  const handleLogout = async () => {
    const log_out_use_case = new LogOutUseCase()
    await log_out_use_case.logOut()
    getAuth()
  }

  return (
    <main className="vf">
      <div className="vf">
        <h1>Login</h1>
        <div className="hf">
          <Input
            type="text"
            placeholder="Email"
            onChange={(e: string) => handleInput(e, "email")}
            defaultValue={process.env.NEXT_PUBLIC_EMAIL}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e: string) => handleInput(e, "pw")}
            defaultValue={process.env.NEXT_PUBLIC_PASSWORD}
          />
          <Button onClick={handleLogin} text="Log In" />
          <Button onClick={handleLogout} text="Log Out" />
        </div>
      </div>
      <div className="vf">
        <h2>No account?</h2>
        <Button onClick={() => router.push('/signup')} text="Sign Up" />
      </div>
      <Loading />
    </main>
  );
}