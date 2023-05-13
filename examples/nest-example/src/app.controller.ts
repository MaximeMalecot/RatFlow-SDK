import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req): Promise<string> {
    req.sendRatflow({ event: "test", test: "test" });
    await sleep(3000)
    return this.appService.getHello();
  }
}
