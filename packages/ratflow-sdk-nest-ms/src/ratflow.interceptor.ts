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
  eventName: string;
  url: string;
  //we can add whatever we want here
  userAgent?: string;
  ip?: string;
  date: Date;
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
        if(!data['url']) {
          if(config.options.showLogs){
              console.error("missing url");
          }
          ctx.getContext().getArgs()['sendRatflowIntercept'] = function () { };
          return next.handle();
        }
        const reqData = {
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
  