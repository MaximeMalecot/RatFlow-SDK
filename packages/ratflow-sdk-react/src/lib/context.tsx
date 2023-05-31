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
    // const [clientData, setClientData] = React.useState<ClientData | null>(null);
    // const [sessionData, setSessionData] = React.useState<SessionData | null>(null);
    const { setTimerCallback, resetTimer } = useTimer({ delay: 10000 });
    const clientDataRef = React.useRef<ClientData | null>(null);
    const sessionDataRef = React.useRef<SessionData | null>(null);

    const fetchEvent = async (event: FetchEventParams) => {
        try{
            if (!auth || !auth.appId) throw new Error("Invalid auth provided");

            const sessionData = sessionDataRef.current;
            const clientData = clientDataRef.current;
            if(!clientData) throw new Error("Missing client data");
            if(!sessionData) throw new Error("Missing session data");
            const { sessionId } = sessionData;
            if(!sessionId) throw new Error("Missing session id");

            const { tag, type, data } = event;
            if(!type) throw new Error("Missing event type");

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

            const { options: eventOptions } = event;
            
            //To not restart the session when for example the "session_end" event is sent
            if(eventOptions == undefined || eventOptions.affectSession == undefined || eventOptions.affectSession !== false ){
                resetTimer();
                restartSession()
            }
            

        }catch(e: any){
            console.error(e.message);
        }
        
    };

    const stopSession = () => {
        if(!sessionDataRef.current) return;
        const newSession = {...sessionDataRef.current, sessionEnd: new Date()};
        // setSessionData(newSession);
        sessionDataRef.current = newSession;
        const { sessionId, ...data } = newSession;
        fetchEvent({ type: SESSION_END, data, options: {affectSession: false} });
    }

    //Checks if the session was ended before the request, if so, restarts a new session
    const restartSession = () => {
        if(!sessionDataRef.current || !sessionDataRef.current.sessionEnd || !clientDataRef.current) return sessionDataRef.current;
        const newSession = {...generateSessionData(clientDataRef.current.clientId)};
        // setSessionData(newSession);
        sessionDataRef.current = newSession;
        return newSession;
    }
 
    const setupLocalData = async () => {
        const data = await getClientData();
        // setClientData(data);
        clientDataRef.current = data;

        const localSessionData = generateSessionData(data.clientId)
        // setSessionData(localSessionData);
        sessionDataRef.current = localSessionData;
    }

    useEffect(() => {
        setupLocalData();
        setTimerCallback(stopSession);
    }, [auth])

    // useEffect(() => {
    // }, []);

    useEffect(() => {
        if(!clientDataRef.current) return;
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
    }, [options, clientDataRef]);

    useEffect(() => {
        if(!clientDataRef.current) return;
        if (!currentPage) return;
        fetchEvent({ type: PAGE_CHANGED });
    }, [currentPage, clientDataRef]);

    return (
        <AnalyticsContext.Provider value={{ fetchEvent, setCurrentPage }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
