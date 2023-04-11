import {
    AnalyticsContextProviderProps,
    AnalyticsContextType,
    FetchEventParams,
} from "@/interfaces/analytics-context";
import React, { createContext, useContext, useEffect } from "react";

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
        const { tag, type } = event;
        const page = currentPage ? currentPage : window.location.pathname;

        const res = await fetch(`http://localhost:3000/api/analytics/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type,
                tag,
                page,
            }),
        });
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
