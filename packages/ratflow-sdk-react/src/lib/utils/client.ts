import { ClientData } from "../interfaces/analytics-context";
import FingerPrintJS from "@fingerprintjs/fingerprintjs";

const fpPromise = FingerPrintJS.load();


async function getClientId(): Promise<string>{
    const fp = await fpPromise;
    const result = await fp.get();
    return result.visitorId;
};


export async function getClientData(): Promise<ClientData>{
    return {
        clientId: await getClientId(),
        ip: "ip",
        userAgent: "user_agent",
    }
}