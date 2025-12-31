import { Logger } from '@nestjs/common'

/**
 * 基础 Service 类
 * 所有业务 Service 可继承此类，获得通用能力
 */
export abstract class BaseService {
  protected readonly logger: Logger

  constructor(serviceName: string) {
    this.logger = new Logger(serviceName)
  }

  protected logInfo(message: string, context?: any) {
    this.logger.log(message, context)
  }

  protected logError(message: string, trace?: string) {
    this.logger.error(message, trace)
  }

  protected logWarn(message: string) {
    this.logger.warn(message)
  }
}
