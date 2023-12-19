import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import AvadaLogo from '../src/assets/imgs/logo.png'
import en from "@shopify/polaris/locales/en.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider en={en} theme={{
      logo: {
        width: 105,
        topBarSource: AvadaLogo
      }
    }}>
      <App />
    </AppProvider>
  </React.StrictMode>
);
 