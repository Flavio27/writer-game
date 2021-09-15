import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { Routes } from "./pages/Routes";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
