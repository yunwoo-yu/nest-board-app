import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3080;
  await app.listen(port);

  Logger.log(`Applecation running on port ${port}`);
}
bootstrap();
