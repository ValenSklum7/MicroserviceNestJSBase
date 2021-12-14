import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseException } from '../../domain/exception/BaseException.exception';
import { prepareTrace } from '../../infrastructure/utils/PrepareTrace';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class HttpExceptionInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<BaseException> {
    return next.handle().pipe(
      catchError((err: any) => {
        const debugMetadata = this.getRequestMetadata(_context, err);
        const exception = new HttpException(
          {
            _id: err?._id,
            status: HttpStatus.BAD_REQUEST,
            error: err?.response?.message || err.toString(),
            debugMetadata,
            inErrorMetadata: err.metadata,
          },
          HttpStatus.BAD_REQUEST
        );
        // if (process.env.ELASTIC_APM_ENABLE === 'true') ElastiSearchAPM.captureError(err);
        throw exception;
      })
    );
  }

  private getRequestMetadata(_context: ExecutionContext, err: any) {
    const request = _context.switchToHttp().getRequest();
    const debug = process.env.mode === 'DEV' && 'debug' in request.query;
    const isInternalRequest =
      request.headers.internal_request_token &&
      request.headers.internal_request_token ===
        process.env.INTERNAL_REQUEST_TOKEN;
    if (debug || isInternalRequest) {
      const response: any = {
        trace: prepareTrace(err.stack),
        request: {
          ...request.context.config,
          body: request.body,
        },
      };
      if (debug) {
        // TODO: cuando es modo debug, añadir variables extra
      }
      return response;
    }
  }
}
