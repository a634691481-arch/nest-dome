import { IsString, IsEmail, IsInt, Min, Max, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: '张三' })
  @IsString()
  name: string

  @ApiProperty({ description: '邮箱', example: 'user@example.com' })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  email: string

  @ApiPropertyOptional({ description: '年龄', example: 25, minimum: 1, maximum: 150 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(150)
  age?: number
}
