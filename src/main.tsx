import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Basic boot diagnostics (helps catch "white page" issues on deploy)
const rootEl = document.getElementById("root");
if (!rootEl) {
  console.error("#root element not found");
} else {
  rootEl.textContent = "Loading…";
}

window.addEventListener("error", (e) => {
  console.error("window.error", e.error || e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("unhandledrejection", e.reason);
});

try {
  createRoot(rootEl!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (err) {
  console.error("React render failed", err);
  if (rootEl) rootEl.textContent = "App failed to load. Check console.";
}
