import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { yamlFileLoader } from './helpers/yamlFileLoader';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { LogService } from './logger/logger.service';
import { AuthGuard } from './resources/auth/auth.guard';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const jwt = app.get(JwtService);
  const config = app.get(ConfigService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(jwt, config, reflector));

  // Global Logger
  const logger = app.get<LogService>(LogService);
  app.useLogger(logger);

  // Logging interceptor
  app.useGlobalInterceptors(new LoggerInterceptor(logger));

  // Exceptions Filter
  const { httpAdapter } = app.get<HttpAdapterHost>(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

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

  process.on('unhandledRejection', () => {
    logger.log('unhandledRejection');
    logger.error('unhandledRejection');
  });

  process.on('uncaughtException', () => {
    logger.log('uncaughtException');
    logger.error('uncaughtException');
  });
}
bootstrap();
