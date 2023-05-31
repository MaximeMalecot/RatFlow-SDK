import {
    AnalyticsContextProviderProps,
    AnalyticsContextType,
    ClientData,
    FetchEventParams,
    SessionData,
} from "./interfaces/analytics-context";
import React, { createContext, useContext, useEffect } from "react";
import { sendEvent } from "ratflow-sdk-lib-front";
import { debounce } from "./helpers";
import { MOUSE_MOVED, PAGE_CHANGED, SESSION_END } from "./constants/events";
import useTimer from "./hooks/use-timer";
import { generateSessionData} from "./utils/session";
import { getClientData } from "./utils/client";

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
    const [sessionData, setSessionData] = React.useState<SessionData>(generateSessionData());
    const [clientData, setClientData] = React.useState<ClientData>(getClientData());
    const { setTimerCallback, resetTimer } = useTimer({ delay: 10000 });

    const fetchEvent = async (event: FetchEventParams) => {
        try{
            if (!auth || !auth.appId) throw new Error("Invalid auth provided");
            const { tag, type, data } = event;
            if(!type) throw new Error("Missing event type");
            const { sessionId } = sessionData;

            if(!sessionId) throw new Error("Missing session id");
            if(!clientData) throw new Error("Missing client data");

            const dataOptions = {
                sessionId,
                ...clientData,
                tag: tag,
                eventName: type,
                url: currentPage ? currentPage : window.location.pathname,
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

            restartSession();
            resetTimer();

        }catch(e: any){
            console.error(e.message);
        }
        
    };

    const stopSession = () => {
        const newSession = {...sessionData, sessionEnd: new Date()};
        setSessionData(newSession);
        const { sessionId, ...data } = newSession;
        fetchEvent({ type: SESSION_END, data });
    }

    const restartSession = () => {
        if(!sessionData.sessionEnd) return;
        setSessionData(() => ({...generateSessionData()}));
    }

    useEffect(() => {
        if (!options?.trackMouse) return;

        const listenerCb = debounce((e: MouseEvent) => {
            const { pageX, pageY } = e;
            fetchEvent({
                type: MOUSE_MOVED,
                data: { pageX, pageY },
            });
        }, 1000);

        document.addEventListener("mousemove", listenerCb);

        return () => document.removeEventListener("mousemove", listenerCb);
    }, [options]);

    useEffect(() => {
        if (!currentPage) return;
        fetchEvent({ type: PAGE_CHANGED });
    }, [currentPage]);

    useEffect(() => {
        setTimerCallback(stopSession);
    }, []);

    return (
        <AnalyticsContext.Provider value={{ fetchEvent, setCurrentPage }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
