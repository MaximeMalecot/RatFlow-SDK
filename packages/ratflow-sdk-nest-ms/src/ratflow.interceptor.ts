import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { sendEvent } from "ratflow-sdk-lib-back";

interface RatflowAuth {
  appId: string;
  appSecret: string;
  service?: string;
}

interface RatflowOptions {
  showLogs?: boolean;
}

interface RatflowConfig {
  appId: string;
  appSecret: string;
  service?: string;
  options: RatflowOptions;
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
  private auth: RatflowAuth;
  private options: RatflowOptions;
  constructor(config: RatflowConfig) {
    const { options, ...auth } = config;
    if (!auth.appId || !auth.appSecret) {
      throw new Error("Missing SendEventAuth params");
    }
    this.auth = auth;
    this.options = options;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToRpc();
    const auth = this.auth;
    const options = this.options;
    const data = ctx.getData();
    if (!data["url"]) {
      if (options.showLogs) {
        console.error("missing url");
      }
      ctx.getContext().getArgs()["sendRatflowIntercept"] = function () {};
      return next.handle();
    }

    const reqData = {
      userAgent: data["userAgent"],
      url: data["url"],
    };
    ctx.getContext().getArgs()["sendRatflowIntercept"] = function ({
      event,
      ...rest
    }) {
      const data: RatflowData = {
        ...reqData,
        eventName: event,
        date: new Date(),
        customData: rest,
      };
      sendEvent({ auth, data, options });
    };
    return next.handle();
  }
}
