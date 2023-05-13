import {
    AnalyticsContextProviderProps,
    AnalyticsContextType,
    FetchEventParams,
} from "./interfaces/analytics-context";
import React, { createContext, useContext, useEffect } from "react";
import { sendEvent } from "ratflow-sdk-lib-front";

const AnalyticsContext = createContext<AnalyticsContextType>({
    fetchEvent: () => Promise.resolve(),
    setCurrentPage: () => {},
});

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);

    if (!context) {
        throw new Error(
            "useAnalytics must be used within AnalyticsContextProvider"
        );
    }

    return context;
};

export const AnalyticsContextProvider: React.FC<
    AnalyticsContextProviderProps
> = ({ children, config }: AnalyticsContextProviderProps) => {
    const { token } = config;
    const [currentPage, setCurrentPage] = React.useState<string | null>(null);

    const fetchEvent = async (event: FetchEventParams) => {
        const { tag, type, data } = event;
        const page = currentPage ? currentPage : window.location.pathname;

        const authOptions = {
            appId: token
        }

        const dataOptions = {
            tag: tag??"no",
            eventName: type,
            url: page,
            date: new Date()
        }

        const options = { 
            useBeacon: true,
        }
        const res = await sendEvent({auth: authOptions, data: dataOptions, options});
    };

    useEffect(() => {
        if (!currentPage) return;
        fetchEvent({ type: "page-changed" });
    }, [currentPage]);

    return (
        <AnalyticsContext.Provider value={{ fetchEvent, setCurrentPage }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
