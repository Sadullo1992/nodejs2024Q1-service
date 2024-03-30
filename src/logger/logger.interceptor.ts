import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LogService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logService: LogService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const [req, res] = context.getArgs();
    const { method, url, query, body } = req;
    const { statusCode } = res;
    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        this.logService.log({
          method,
          url,
          query,
          body,
          statusCode,
          responseTime: `${Date.now() - now}ms`,
        }),
      ),
    );
  }
}
