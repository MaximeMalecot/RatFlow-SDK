import { ClientData } from "../interfaces/analytics-context";

function getClientId(): string{
    return "client_id";
};


export function getClientData(): ClientData{
    return {
        clientId: getClientId(),
        ip: "ip",
        userAgent: "user_agent",
    }
}