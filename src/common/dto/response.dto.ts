import { ResponseCode } from '../constants/response-code.enum'

/**
 * 统一响应格式
 */
export class ApiResponse<T = any> {
  statusCode: number
  message: string
  data?: T
  timestamp: string

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
    this.timestamp = new Date().toISOString()
  }

  static success<T>(data?: T, message = 'Success'): ApiResponse<T> {
    return new ApiResponse(ResponseCode.SUCCESS, message, data)
  }

  static error(statusCode: number, message: string): ApiResponse {
    return new ApiResponse(statusCode, message)
  }
}
