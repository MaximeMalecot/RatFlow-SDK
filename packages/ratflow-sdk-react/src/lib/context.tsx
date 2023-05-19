import {
    AnalyticsContextProviderProps,
    AnalyticsContextType,
    FetchEventParams,
} from "./interfaces/analytics-context";
import React, { createContext, useContext, useEffect } from "react";
import { sendEvent } from "ratflow-sdk-lib-front";
import { debounce } from "./helpers";

const AnalyticsContext = createContext<AnalyticsContextType>({
    fetchEvent: () => Promise.resolve(),
    setCurrentPage: () => {},
});

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);

    if (!context) {
        throw new Error(
            "useAnalytics must be used within an AnalyticsContextProvider"
        );
    }

    return context;
};

export const AnalyticsContextProvider: React.FC<
    AnalyticsContextProviderProps
> = ({ children, auth, options }: AnalyticsContextProviderProps) => {
    const [currentPage, setCurrentPage] = React.useState<string | null>(null);

    const fetchEvent = async (event: FetchEventParams) => {
        const { tag, type, data } = event;
        const url = currentPage ? currentPage : window.location.pathname;

        if (!auth) return console.error("No auth provided");

        const dataOptions = {
            tag: tag ?? "unset",
            eventName: type,
            url: url,
            date: new Date(),
            customData: data??null,
        };

        const sdkOptions = {
            useBeacon: options ? options.useBeacon ?? true : true,
        };

        await sendEvent({
            auth,
            data: dataOptions,
            options: sdkOptions,
        });
    };

    useEffect(() => {
        if (!options?.trackMouse) return;

        const listenerCb = debounce((e: MouseEvent) => {
            const { pageX, pageY } = e;
            fetchEvent({
                type: "mousemove",
                data: { pageX, pageY },
            });
        }, 1000);

        document.addEventListener("mousemove", listenerCb);

        return () => document.removeEventListener("mousemove", listenerCb);
    }, [options]);

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
