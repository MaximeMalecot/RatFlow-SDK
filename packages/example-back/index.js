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

import { sendEvent } from "ratflow-sdk-lib/back/dist/index.js";
sendEvent({ auth, data });

// OR

import { back } from "ratflow-sdk-lib";
back.sendEvent({ auth, data });
