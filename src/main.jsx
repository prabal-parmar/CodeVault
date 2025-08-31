import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CoderProvider from "./context/CoderProvider";
import DarkModeProvider from "./context/DarkModeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <CoderProvider>
        <App />
      </CoderProvider>
    </DarkModeProvider>
  </StrictMode>
);
