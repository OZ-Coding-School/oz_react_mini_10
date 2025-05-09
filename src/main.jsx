import { SupabaseProvider } from "@supabaseJS/index.js";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/index";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </Provider>
);
