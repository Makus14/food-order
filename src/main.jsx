import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import MealContextProvider from "../src/store/meal-context.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MealContextProvider>
    <App />
  </MealContextProvider>
);
