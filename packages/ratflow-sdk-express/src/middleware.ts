import { Request, Response, NextFunction } from "express";
import { sendEvent } from "ratflow-sdk-lib-back";

interface RatflowConfig {
    appId: string;
    appSecret: string;
    service?: string;
    options: {
        immediate?: boolean;
        showLogs?: boolean;
    }
}

interface RatflowData {
  eventName: string;
  url: string;
  //we can add whatever we want here
  userAgent?: string;
  ip?: string;
  date: Date;
  customData?: any;
}

export function tracker(config: RatflowConfig) {
    return function trackerMiddleware(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { options, ...auth } = config;

        if (!auth.appId || !auth.appSecret) {
            throw new Error("Missing SendEventAuth params");
        }
        
        const reqData = {
            userAgent: req.headers["user-agent"]?.toString() ?? "null",
            url: req.url,
        };

        req["clientData"] = reqData;

        req["sendRatflow"] = function ({ event, ...rest }) {
            const data: RatflowData = {
                ...reqData,
                eventName: event,
                date: new Date(),
                customData: rest,
            };
            if (config.options?.immediate == false) {
                res.on("finish", () => {
                    sendEvent({ auth, data, options });
                });
            } else {
                sendEvent({ auth, data, options });
            }
        };
        next();
    };
}
