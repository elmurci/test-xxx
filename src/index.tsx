import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./screens/Dashboard";
import { LanguageProvider } from "./contexts/LanguageContext";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  </StrictMode>,
);
