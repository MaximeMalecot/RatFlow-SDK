import { API_ENDPOINT } from "./constants.js";

interface SendEventOptions {}

interface SendEventData {
    eventName: string;
    url: string;
    //we can add whatever we want here
    userAgent?: string;
    ip?: string;
    date: Date;
    customData?: any;
}

interface SendEventAuth {
    appId: string;
    appSecret: string;
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
    const { appId, appSecret, service } = auth;
    const { eventName, url, userAgent, ip, date, customData } = data;

    if (!appId || !appSecret) {
        throw new Error("Missing SendEventAuth params");
    }

    if (!eventName || !url || !date) {
        throw new Error("Missing SendEventData params");
    }

    const rawFull = {
        ...auth,
        ...data,
    }

    try {
        console.log("sending event", rawFull);
        if (globalThis.fetch !== undefined) {
            await fetch(`${API_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rawFull),
            });
        } else {
            const fetch = require("node-fetch");
            await fetch(`${API_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rawFull),
            });
        }
    } catch (e) {
        console.log(e);
    }
};
