import { Request, Response, NextFunction } from 'express';
import { sendEvent } from 'ratflow-sdk-lib/back';

interface RatflowConfig {
  appId: string;
  appSecret: string;
  service?: string;
  immediate?: boolean;
}

interface RatflowData {
  tag?: string;
  clientId?: string;
  sessionId?: string;
  eventName: string;
  url: string;
  userAgent: string;
  date: Date;
  //we can add whatever we want here
  customData?: any;
}

export function tracker(config: RatflowConfig) {
  return function trackerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {

    if(!req.headers || (!req.headers['x-client-id'] || !req.headers['x-session-id'])){
      return next();
    }
    
    const reqData = {
      clientId: req.headers['x-client-id'].toString(),
      sessionId: req.headers['x-session-id'].toString(),
      userAgent: req.headers['user-agent']?.toString() ?? "null",
      url: req.url,
    };

    req['clientData'] = reqData;

    req['sendRatflow'] = function ({ event, ...rest }) {
      const data: RatflowData = {
        ...reqData,
        eventName: event,
        date: new Date(),
        customData: rest,
      };
      if (config.immediate == false) {
        console.log('immediate is false');
        res.on('finish', () => {
            sendEvent({ auth: config, data });
        });
      } else {
        sendEvent({ auth: config, data });
      }
    };
    next();
  };
}
