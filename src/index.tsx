import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Caprasimo&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/tirth-olympics">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
