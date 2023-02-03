import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./store/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { WatchListContextProvider } from "./store/WatchListContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <WatchListContextProvider>
        <App />
      </WatchListContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
