import { sendEvent } from "ratflow-sdk-lib-back";

const auth = {
    appId: "app",
    appSecret: "secret",
    service: "service"
};

const data = {
    eventName: "event",
    url: "location",
    date: new Date(),
};

sendEvent({ auth, data });
