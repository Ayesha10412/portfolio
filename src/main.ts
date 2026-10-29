import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Keep every API route versioned so future breaking changes can coexist.
  app.setGlobalPrefix('api/v1');

  // The origin can be configured later for the deployed frontend.
  app.enableCors({
    origin: configService.getOrThrow<string>('app.frontendOrigin'),
  });

  await app.listen(
    configService.getOrThrow<number>('app.port'),
    configService.getOrThrow<string>('app.host'),
  );
}
await bootstrap();
