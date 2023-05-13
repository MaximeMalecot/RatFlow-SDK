import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tracker } from 'ratflow-sdk-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(tracker({
    appId: "test",
    appSecret: "test",
    service: "test",
    immediate: false
  }));
  await app.listen(3100);
}
bootstrap();
