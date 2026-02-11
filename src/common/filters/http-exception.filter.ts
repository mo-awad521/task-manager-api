import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response as ExpressResponse, Request } from 'express';

interface ErrorResponse {
  message?: string | string[];
  error?: string;
  [key: string]: unknown;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    //const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse: ErrorResponse =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as ErrorResponse);

    const mainMessage: string = Array.isArray(errorResponse.message)
      ? errorResponse.message.join(', ')
      : (errorResponse.message as string) || exception.message;

    response.status(status).json({
      statusCode: status,
      success: false,
      message: mainMessage || 'Something went wrong',
      timestamp: new Date().toISOString(),
    });
  }
}
