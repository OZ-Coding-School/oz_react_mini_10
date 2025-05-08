import React from "react";
import ReactDom from "react-dom/client";
//라우터 설정할때 꼭 넣어줘야함
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 꼭 브라우저라우터를 넣어줘야함 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);