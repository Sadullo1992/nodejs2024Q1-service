import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { LogService } from 'src/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapter: AbstractHttpAdapter,
    private logger: LogService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const exceptionRes =
      statusCode === HttpStatus.BAD_REQUEST ? exception.getResponse() : {};

    this.logger.error(message, exception.name);

    const responseBody = {
      statusCode,
      message,
      ...(exceptionRes as object),
    };

    this.httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
