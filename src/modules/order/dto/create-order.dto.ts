import { IsInt, IsString, IsNumber, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateOrderDto {
  @ApiProperty({ description: '用户ID', example: 1 })
  @IsInt()
  userId: number

  @ApiProperty({ description: '商品名称', example: 'Nest.js 教程' })
  @IsString()
  productName: string

  @ApiProperty({ description: '订单金额', example: 99.99 })
  @IsNumber()
  @Min(0.01)
  amount: number
}
