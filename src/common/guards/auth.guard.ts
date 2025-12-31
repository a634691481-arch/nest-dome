import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

/**
 * 认证守卫示例（需要结合 JWT 等实现）
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 检查是否标记为公开接口
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<{ headers: { authorization?: string } }>()
    const token = request.headers.authorization

    if (!token) {
      throw new UnauthorizedException('未提供认证令牌')
    }

    // TODO: 这里应该验证 token 的有效性
    // const user = this.jwtService.verify(token);
    // request.user = user;

    return true
  }
}
