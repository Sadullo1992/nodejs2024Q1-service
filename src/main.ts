import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { yamlFileLoader } from './helpers/yamlFileLoader';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { LogService } from './logger/logger.service';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule, { logger: ['log'] });

  // Global Logger
  const logger = app.get<LogService>(LogService);
  app.useLogger(logger);

  // Logging interceptor
  app.useGlobalInterceptors(new LoggerInterceptor(logger));

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  // Swagger config
  const document = (await yamlFileLoader('./doc/api.yaml')) as OpenAPIObject;
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
