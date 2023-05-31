import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AnalyticsContextProvider } from "ratflow-sdk-react";
import { BrowserRouter } from "react-router-dom";

const authConfig = {
    appId: "64776ceaa113d3adae23432a"
};

const sdkOptions = {
    trackMouse: false,
    useBeacon: false
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AnalyticsContextProvider auth={authConfig} options={sdkOptions}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AnalyticsContextProvider>
    </React.StrictMode>
);
