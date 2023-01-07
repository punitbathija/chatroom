import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { userStore } from "./app/userStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={userStore}>
    <App />
  </Provider>
);
