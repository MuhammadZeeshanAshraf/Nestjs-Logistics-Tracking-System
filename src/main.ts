import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(json({ limit: '5mb' }));
    app.use(urlencoded({ extended: true, limit: '5mb' }));
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    const config = new DocumentBuilder()
      .setTitle('Container API')
      .setDescription('An inventory database handlers')
      .setVersion('1.0')
      .addTag('nestjs')
      .build();
    const swaggerOptions: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };
    const document = SwaggerModule.createDocument(app, config, swaggerOptions);
    SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.listen(3000, () => {
      console.log('Server started');
    });
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  Logger.error(error);
  process.exit(1);
});
