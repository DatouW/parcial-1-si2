import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ConfigProvider from "antd/es/config-provider";
import es_ES from "antd/locale/es_ES";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ConfigProvider locale={es_ES}>
      <App />
    </ConfigProvider>
  </BrowserRouter>
);
