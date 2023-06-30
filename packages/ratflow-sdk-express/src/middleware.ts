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

        const reqData = {
            userAgent: req.headers["user-agent"]?.toString() ?? "null",
            url: req.url,
            date: new Date(),
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
                    sendEvent({ auth: config, data });
                });
            } else {
                sendEvent({ auth: config, data });
            }
        };
        next();
    };
}
