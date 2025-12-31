import { IsOptional, IsInt, Min, Max } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'

/**
 * 通用分页查询 DTO
 */
export class PaginationDto {
  @ApiPropertyOptional({ description: '页码', default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1

  @ApiPropertyOptional({ description: '每页数量', default: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10
}

/**
 * 通用分页响应结构
 */
export interface PaginationResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
