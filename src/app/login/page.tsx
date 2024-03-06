"use client"

import { Provider } from "react-redux";
import { store } from "@/presentation/states/store";
import LoginComponent from "./login";

export default function Login() {
  return <Provider store={store}><LoginComponent /></Provider>;
}