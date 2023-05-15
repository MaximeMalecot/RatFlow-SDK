import { API_ENDPOINT } from "./constants.js";

interface SendEventOptions {}

interface SendEventData {
    tag?: string;
    clientId?: string;
    sessionId?: string;
    eventName: string;
    url: string;
    date: Date;
    //we can add whatever we want here
    customData?: any;
}

interface SendEventAuth {
    appId: string;
    appSecret?: string;
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
    const { eventName, url, date, tag, clientId, sessionId, customData } = data;

    if (!appId || !appSecret || !service) {
        throw new Error("Missing SendEventAuth params");
    }

    if (!eventName || !url || !date) {
        throw new Error("Missing SendEventData params");
    }

    try {
        console.log(auth, data);
        if (globalThis.fetch !== undefined) {
            console.log("here");
            await fetch(`${API_ENDPOINT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ yourData: "here" }),
            });
        } else {
            const fetch = require("node-fetch");
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
