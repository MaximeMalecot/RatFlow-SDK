import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { client } from "./config";
import { AnalyticsContextProvider } from "./contexts/analytics-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AnalyticsContextProvider config={client}>
            <App />
        </AnalyticsContextProvider>
    </React.StrictMode>
);
