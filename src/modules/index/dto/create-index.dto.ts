import { IsString, IsBoolean, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateIndexDto {
  @ApiProperty({ description: '标题', example: '我的第一条记录' })
  @IsString()
  title: string

  @ApiProperty({ description: '内容', example: '这是一段测试内容' })
  @IsString()
  content: string

  @ApiProperty({ description: '是否激活', example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}
