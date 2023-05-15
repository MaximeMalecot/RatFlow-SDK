import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('MICROSERVICE') private readonly microService: ClientProxy) {}

  @Get()
  async getHello(@Req() req): Promise<string> {
    req.sendRatflow({ event: "test", test: "test" });
    await sleep(3000)
    return this.appService.getHello();
  }

  @Get('test')
  public test(@Req() req) {
    return this.microService.send('getHello', {
      ...req['clientData'],});
  }

}
