import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { client } from "./config";
import { AnalyticsContextProvider } from "ratflow-sdk-react";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AnalyticsContextProvider config={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AnalyticsContextProvider>
    </React.StrictMode>
);
