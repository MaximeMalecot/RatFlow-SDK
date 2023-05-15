import { Controller } from '@nestjs/common';
import { Ctx, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('getHello')
  getHello(@Ctx() ctx) {
    ctx
      .getArgs()
      .sendRatflowIntercept({ event: 'HelloEvent', tag: 'HelloTag' });
    return this.appService.getHello();
  }
}
