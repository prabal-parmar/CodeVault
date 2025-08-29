import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CoderProvider from "./context/CoderProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CoderProvider>
      <App />
    </CoderProvider>
  </StrictMode>
);
