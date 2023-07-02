import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AnalyticsContextProvider } from "ratflow-sdk-react-rollup";
import { BrowserRouter } from "react-router-dom";
import { sdkConfig } from "./ratflow"; 


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AnalyticsContextProvider {...sdkConfig}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AnalyticsContextProvider>
    </React.StrictMode>
);
