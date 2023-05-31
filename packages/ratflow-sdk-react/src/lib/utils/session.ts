import { SessionData } from "../interfaces/analytics-context";

export const generateSessionId = () => {
    return "session_id";
}

export function generateSessionData(): SessionData{
    return {
        sessionStart: new Date(),
        sessionEnd: null,
        sessionId: generateSessionId()
    }
}