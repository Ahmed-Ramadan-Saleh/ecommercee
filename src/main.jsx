import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { DataProvider } from "./Context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <DataProvider>
        
        <App />
      </DataProvider>
    </HelmetProvider>
  </StrictMode>,
);
