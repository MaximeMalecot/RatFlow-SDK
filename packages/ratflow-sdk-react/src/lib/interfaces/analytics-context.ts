export interface FetchEventParams {
    tag?: string;
    type: string;
    data?: any
}

export interface AnalyticsContextProviderOptions {
    debug?: boolean;
    trackMouse?: boolean;
    useBeacon?: boolean;
}
export interface AnalyticsContextProviderProps {
    children: React.ReactNode;
    options?: AnalyticsContextProviderOptions;
    auth: {
        appId: string;
        service?: string;
    };
}

export interface AnalyticsContextType {
    fetchEvent: (event: FetchEventParams) => Promise<void>;
    setCurrentPage: any;
}

export interface SessionData {
    sessionId: string;
    sessionStart: Date;
    sessionEnd: Date | null;
}

export interface ClientData {
    clientId: string;
    ip: string;
    userAgent: string;
}