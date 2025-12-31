import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

/**
 * 全局异常过滤器
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const message = exception instanceof HttpException ? exception.message : 'Internal server error'

    const errorResponse = {
      code: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    }

    // 记录错误日志
    this.logger.error(`${request.method} ${request.url}`, exception instanceof Error ? exception.stack : exception)

    response.status(status).json(errorResponse)
  }
}
