import "./FormBuilder.css";
import type { AppProps } from "next/app";
import FormBuilder from "../../components/FormBuilder";
import { NavigationBar } from "../../components/NavigationBar";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <NavigationBar />
      <div className="flex-grow ml-56">
        <FormBuilder />
      </div>
    </div>
  );
}