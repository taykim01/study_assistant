"use client";

import LogInUseCase from "@/domain/use_cases/log_in_use_case";
import Button from "@/presentation/components/button";
import Header from "@/presentation/components/header";
import Input from "@/presentation/components/inputs";
import Loading from "@/presentation/components/loading";
import { Result } from "@/types";
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
    // const login = await log_in_use_case.logIn(loginInfo.email, loginInfo.pw)
    const login = await log_in_use_case.logIn(process.env.NEXT_PUBLIC_EMAIL!, process.env.NEXT_PUBLIC_PASSWORD!)
    if (login.result === Result.Success) {
      router.push('/home')
    }
  }

  return (
    <div className="header_container">
      <Header />
      <main className="vf">
        <div className="login_container">
          <div className="h2">Log In</div>
          <div className="vf gap40">
            <div className="vf gap24">
              <Input
                type="text"
                placeholder="Email"
                onChange={(e: string) => handleInput(e, "email")}
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={(e: string) => handleInput(e, "pw")}
              />
            </div>
            <div className="vf gap12">
              <Button onClick={handleLogin} text="Log In" />
              <Button onClick={() => router.push('/signup')} text="No account? Sign Up" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}