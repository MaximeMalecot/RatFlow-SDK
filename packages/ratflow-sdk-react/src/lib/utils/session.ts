import { SessionData } from "../interfaces/analytics-context";
import {SHA256} from 'crypto-js'

export function generateSessionData(clientId: string): SessionData{
    const data = clientId + Date.now().toString()
    const sessionId = SHA256(data).toString();

    return {
        sessionStart: new Date(),
        sessionEnd: null,
        sessionId: sessionId
    }
}