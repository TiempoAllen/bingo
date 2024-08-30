import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BingoPage from "./BingoPage";
import { Routes, BrowserRouter, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:bingocode" element={<BingoPage />} />
    </Routes>
  </BrowserRouter>
);
