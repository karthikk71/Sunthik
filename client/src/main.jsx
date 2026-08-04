import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { SearchProvider } from "./context/SearchContext";
import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishlistProvider>
      <SearchProvider>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#131921",
              color: "#fff",
              borderRadius: "10px",
            },
          }}
        />
      </SearchProvider>
    </WishlistProvider>
  </React.StrictMode>
);