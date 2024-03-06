"use client";

import "@/app/pages.css"
import LogInUseCase from "@/domain/use_cases/log_in_use_case";
import Button from "@/presentation/components/button";
import Input from "@/presentation/components/inputs";
import { Result } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReduxProvider from "../redux_provider";
import { useSelector } from "react-redux";

export default function LoginComponent() {
  const [loginInfo, setLoginInfo] = useState({ email: "", pw: "" });
  const [signUpStatus, setSignUpStatus] = useState(false)
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
    let login;
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "development") {
      login = await log_in_use_case.logIn(process.env.NEXT_PUBLIC_EMAIL!, process.env.NEXT_PUBLIC_PASSWORD!)
    } else {
      login = await log_in_use_case.logIn(loginInfo.email, loginInfo.pw)
    }
    if (login.result === Result.Success) {
      router.push('/home')
    }
  }

  return (
    <ReduxProvider>
      <div className="gc">
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
              <Button onClick={() => setSignUpStatus(true)} text="No account? Sign Up" />
            </div>
          </div>
          {
            signUpStatus && <div>Sign Up Successful</div>
          }
        </div>
      </div>
    </ReduxProvider>
  );
}