import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Providers } from "./context";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
