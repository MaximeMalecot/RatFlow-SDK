import React, { createContext, useContext, useEffect } from "react";

interface Props {
    children: React.ReactNode;
    config: {
        token: string;
    };
}

export type DomTypes = 
| "click"
| "submit"
| "double-click"
| "mouse-over"
| "scroll"
| "changed"

export type EventTypes = DomTypes | "page-changed"

export interface EventType {
    tag?: string;
    type: EventTypes;
}

interface AnalyticsContextType {
    fetchEvent: (event: EventType) => Promise<void>;
    setCurrentPage: any;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
    fetchEvent: () => Promise.resolve(),
    setCurrentPage: {},
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

export const AnalyticsContextProvider: React.FC<Props> = ({
    children,
    config,
}: Props) => {
    const { token } = config;
    const [currentPage, setCurrentPage] = React.useState<string | null>(null);

    const fetchEvent = async (event: EventType) => {
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
                page
            }),
        });
    };

    useEffect(() => {
        if(!currentPage) return;
        fetchEvent({ type: "page-changed" });
    }, [currentPage]);

    return (
        <AnalyticsContext.Provider value={{ fetchEvent, setCurrentPage }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
