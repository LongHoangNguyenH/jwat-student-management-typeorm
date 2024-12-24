import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from '../errors/response.errors';
import { INTERNAL_SERVER_ERROR } from '../errors/constants.errors';
import { BASE_URL } from '../guards/role';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: ErrorResponse;
    if (exception instanceof HttpException) {
      errorResponse = {
        statusCode: status,
        message: exception.message,
        data: {
          routeParam: BASE_URL.concat(request.url),
          body: request.body,
          timestamp: new Date().toISOString(),
        },
      };
    } else {
      errorResponse = {
        statusCode: 500,
        message: INTERNAL_SERVER_ERROR,
        data: {
          routeParam: request.url,
          timestamp: new Date().toISOString(),
          body: request.body,
        },
      };
    }

    response.status(status).json(errorResponse);
  }
}
