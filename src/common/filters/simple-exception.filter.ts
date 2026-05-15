import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch()
export class SimpleExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      return response.status(statusCode).json({
        success: false,
        statusCode,
        ...this.formatHttpResponse(exceptionResponse),
      });
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const statusCode = this.getPrismaStatusCode(exception.code);

      return response.status(statusCode).json({
        success: false,
        statusCode,
        message: this.getPrismaMessage(exception.code),
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Terjadi kesalahan pada server',
    });
  }

  private formatHttpResponse(exceptionResponse: string | object) {
    if (typeof exceptionResponse === 'string') {
      return { message: exceptionResponse };
    }

    return exceptionResponse;
  }

  private getPrismaStatusCode(code: string) {
    if (code === 'P2002') {
      return HttpStatus.BAD_REQUEST;
    }

    if (code === 'P2025') {
      return HttpStatus.NOT_FOUND;
    }

    return HttpStatus.BAD_REQUEST;
  }

  private getPrismaMessage(code: string) {
    if (code === 'P2002') {
      return 'Data sudah digunakan';
    }

    if (code === 'P2025') {
      return 'Data tidak ditemukan';
    }

    return 'Data tidak bisa diproses';
  }
}
