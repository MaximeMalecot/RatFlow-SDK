import { EventTypes } from "./events";

export interface FetchEventParams {
    tag?: string;
    type: EventTypes;
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
        appSecret: string;
    };
}

export interface AnalyticsContextType {
    fetchEvent: (event: FetchEventParams) => Promise<void>;
    setCurrentPage: any;
}