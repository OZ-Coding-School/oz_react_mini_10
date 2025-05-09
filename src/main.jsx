import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SupabaseProvider } from "./supabase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SupabaseProvider> 
      <App />
    </SupabaseProvider>
  </BrowserRouter>
);
