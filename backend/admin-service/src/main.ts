import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                 // strips unknown properties
      forbidNonWhitelisted: false,     // set true if you want Nest to throw on extra fields
      transform: true,                 // auto-transform payloads to DTO classes
      transformOptions: {
        enableImplicitConversion: true // convert strings to numbers/booleans when possible
      },
    }),
  );

  await app.listen(4001);
  console.log('Admin Service is running on port 4001');
}
bootstrap();
