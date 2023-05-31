import { SessionData } from "../interfaces/analytics-context";
import sha256 from 'crypto-js/sha256';

export function generateSessionData(clientId: string): SessionData{
    const data = clientId + Date.now().toString()
    const sessionId = sha256(data).toString();

    return {
        sessionStart: new Date(),
        sessionEnd: null,
        sessionId: sessionId
    }
}