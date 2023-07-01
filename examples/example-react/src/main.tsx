import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AnalyticsContextProvider } from "ratflow-sdk-react";
import { BrowserRouter } from "react-router-dom";
import { ratflowConfig } from "./ratflow"; 

const sdkOptions = {
    trackMouse: true,
    useBeacon: false
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AnalyticsContextProvider auth={ratflowConfig} options={sdkOptions}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AnalyticsContextProvider>
    </React.StrictMode>
);
