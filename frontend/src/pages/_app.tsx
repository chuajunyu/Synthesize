import "@/styles/globals.css";
import type { AppProps } from "next/app";
import FormBuilder from "./FormBuilder";
import { NavigationBar } from "../components/NavigationBar";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <NavigationBar />
      <div className="flex-grow">
        <FormBuilder />
      </div>
    </div>
  );
}

