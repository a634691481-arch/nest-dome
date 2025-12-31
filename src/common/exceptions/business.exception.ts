import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 自定义业务异常
 */
export class BusinessException extends HttpException {
  constructor(message: string, code?: number) {
    super(
      {
        code: code || HttpStatus.BAD_REQUEST,
        message,
        timestamp: new Date().toISOString()
      },
      HttpStatus.BAD_REQUEST
    )
  }
}
