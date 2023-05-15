# Ratflow express lib

## How to use

In any app that use express and you want to add tracking events, you'll need first to instantiate our middleware :

```
import { tracker } from 'ratflow-sdk-express';

app.use(
    tracker({
        appId: "test",
        appSecret: "test",
        service: "nest-example",
        options: {
            immediate: false,
            showLogs: true
        }
    })
);
```

Only appId and secret are required.

immediate will allow you to execute Ratflow's logic after your own, to not slow down your server.

Then, to send data in any route, you'll have a function on the request to call like that (only tested on TCP transporters):

```
    @Get()
    async getHello(@Req() req): Promise<string> {
        req.sendRatflow({ 
            event: "test", 
            tag: "test" 
        });
        return this.appService.getHello();
    }
```

You can pass any additional data in the customData attribute.

## Interfaces 

```
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

