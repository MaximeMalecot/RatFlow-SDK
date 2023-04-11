import React, { createContext, useContext, useEffect } from "react";

interface Props {
    children: React.ReactNode;
    config: {
        token: string;
    };
}

export type EventTypes =
    | "click"
    | "submit"
    | "double-click"
    | "mouse-over"
    | "scroll";

export interface EventType {
    tag?: string;
    type: EventTypes;
}

interface AnalyticsContextType {
    fetchEvent: (event: EventType) => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
    fetchEvent: () => Promise.resolve(),
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

    const fetchEvent = async (event: EventType) => {
        const { tag, type } = event;
        const res = await fetch(`http://localhost:3000/api/analytics/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tag,
            }),
        });
    };

    return (
        <AnalyticsContext.Provider value={{ fetchEvent }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
