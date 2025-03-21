import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ReactModal from "react-modal";
import reportWebVitals from "./reportWebVitals";

ReactModal.setAppElement("#root"); // Required for react-modal

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
