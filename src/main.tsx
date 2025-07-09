import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
