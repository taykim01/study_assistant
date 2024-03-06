"use client"

import { Provider } from "react-redux";
import { store } from "@/presentation/states/store";
import HomeComponent from "./home";

export default function Home() {
  return <Provider store={store}><HomeComponent /></Provider>;
}