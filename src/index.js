import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/fonts/Mooli-Regular.ttf";
import "./assets/fonts/Nunito-Regular.ttf";
import "./assets/fonts/Nunito-Light.ttf";
import "./assets/fonts/Nunito-Bold.ttf";
import "./assets/fonts/NunitoSans_Regular.ttf";
import "./assets/fonts/NunitoSans_Bold.ttf";
import "./assets/fonts/NunitoSans_Light.ttf";

import { BizBanterProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BizBanterProvider>
      <App />
    </BizBanterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
