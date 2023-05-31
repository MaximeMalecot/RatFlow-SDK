import { API_ENDPOINT } from "./constants";

interface SendEventOptions {
    useBeacon?: boolean;
}

interface SendEventData {
    clientId?: string;
    sessionId?: string;
    eventName: string;
    url: string;
    //we can add whatever we want here
    userAgent?: string;
    ip?: string;
    date: Date;
    customData?: any;
    tag?: string;
}

interface SendEventAuth {
    appId: string;
    service?: string;
}

interface SendEventParams {
    auth: SendEventAuth;
    data: SendEventData;
    options?: SendEventOptions;
}

export const sendEvent = async ({
    auth,
    data,
    options = {},
}: SendEventParams) => {
    if (!auth.appId) {
        throw new Error("appId is required");
    }
    const { appId, service } = auth;
    const { eventName, url, date, tag, clientId, sessionId, customData, ip, userAgent } = data;
    const { useBeacon } = options;

    if (!appId) {
        throw new Error("Missing SendEventAuth params");
    }

    if (!eventName || !url || !date || !clientId || !sessionId || !ip || !userAgent) {
        throw new Error("Missing SendEventData params");
    }

    console.log("received:", data);
    
    try {
        if (useBeacon) {
            //TODO: implement beacon
            console.log("beacon");
        } else {
            console.log(API_ENDPOINT);
            await fetch(`${API_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ yourData: "here" }),
            });
        }
    } catch (e) {
        console.log(e);
    }
};
