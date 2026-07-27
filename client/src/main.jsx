import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { SearchProvider } from "./context/SearchContext";
import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishlistProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </WishlistProvider>
  </React.StrictMode>
);