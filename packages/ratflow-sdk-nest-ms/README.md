# Ratflow nest microservice lib

## How to use

In nestJS app, using the "NestFactory.createMicroservice", you'll need to instantiate the lib like this :

```
import { tracker } from 'ratflow-sdk-express';

app.useGlobalInterceptors(
    new RatFlowInterceptor({
        appId: 'app',
        appSecret: 'secret',
        service: 'microservice-example',
        options: {
            showLogs: true
        }
    }),
);
```

Only appId and secret are required.

Then, to send data in any route, you'll have a function on the request to call like that (only tested on TCP transporters):

```
  @EventPattern('getHello')
  getHello(@Ctx() ctx) {
    ctx.getArgs()
        .sendRatflowIntercept({ 
            event: 'HelloEvent', 
            tag: 'HelloTag' 
        });
    return this.appService.getHello();
  }
```

The Interceptors needs this data in the received context : 

```
    const reqData = {
        clientId: ctx.getData()['clientId'],
        sessionId: ctx.getData()['sessionId'],
        userAgent: ctx.getData()['userAgent'],
        url: ctx.getData()['url'],
    };
```

If you are using a node/nest HTTP gateway, you can easily send them from here with our library like that :
```
    @Get('ms')
    public sendMs(@Req() req) {
    return this.microService.send('getHello', {
        ...req['clientData'],});
    }
```

## Interfaces 

```
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
    userAgent: string;
    date: Date;
    //we can add whatever we want here
    customData?: any;
}
```

