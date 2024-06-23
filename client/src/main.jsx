import React from "react";
import ReactDOM from "react-dom/client";
import Modal from 'react-modal';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { SearchProvider } from "./context/SearchContext";
import { UserProvider } from "./context/UserContext";

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </UserProvider>
  </BrowserRouter>
);
