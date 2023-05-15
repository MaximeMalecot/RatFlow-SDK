import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
import { Observable } from 'rxjs';
import { sendEvent } from "ratflow-sdk-lib-back";
  
interface RatflowConfig {
    appId: string;
    appSecret: string;
    service?: string;
    options: {
        showLogs?: boolean;
    }
}
  
interface RatflowData {
    tag?: string;
    clientId?: string;
    sessionId?: string;
    eventName: string;
    url: string;
    userAgent?: string;
    date: Date;
    //we can add whatever we want here
    customData?: any;
}
  
export class RatFlowInterceptor implements NestInterceptor {
    constructor(private config: RatflowConfig) {
        this.config = config;
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToRpc();
        const config = this.config;
        const data = ctx.getData();
        if(!data['clientId'] || !data['sessionId'] || !data['url']) {
          if(config.options.showLogs){
              console.error("missing x-client-id or x-session-id headers");
          }
          ctx.getContext().getArgs()['sendRatflowIntercept'] = function () { };
          return next.handle();
        }
        const reqData = {
          clientId: data['clientId'],
          sessionId: data['sessionId'],
          userAgent: data['userAgent'],
          url: data['url'],
        };
        ctx.getContext().getArgs()['sendRatflowIntercept'] = function ({
          event,
          ...rest
        }) {
          const data: RatflowData = {
            ...reqData,
            eventName: event,
            date: new Date(),
            customData: rest,
          };
          sendEvent({ auth: config, data });
        };
        return next.handle();
    }
}
  