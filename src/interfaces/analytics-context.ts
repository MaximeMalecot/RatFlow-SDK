import { EventTypes } from "./events";

export interface FetchEventParams {
    tag?: string;
    type: EventTypes;
    data?: any
}

export interface AnalyticsContextProviderProps {
    children: React.ReactNode;
    config: {
        token: string;
    };
}

export interface AnalyticsContextType {
    fetchEvent: (event: FetchEventParams) => Promise<void>;
    setCurrentPage: any;
}