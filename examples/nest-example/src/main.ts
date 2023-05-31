import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tracker } from 'ratflow-sdk-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(tracker({
    appId: "64776ceaa113d3adae23432a",
    appSecret: "bae4d558-56a5-447a-9b5d-5154e52b9672",
    service: "nest-example",
    options: {
      immediate: false,
      showLogs: true
    }
  }));
  await app.listen(3100);
}
bootstrap();
