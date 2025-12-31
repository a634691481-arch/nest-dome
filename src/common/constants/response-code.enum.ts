/**
 * 统一响应状态码枚举
 */
export enum ResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

/**
 * 业务错误码（可根据实际业务扩展）
 */
export enum BusinessCode {
  USER_NOT_FOUND = 10001,
  USER_ALREADY_EXISTS = 10002,
  INVALID_PASSWORD = 10003,
  ORDER_NOT_FOUND = 20001,
  ORDER_ALREADY_PAID = 20002
}
