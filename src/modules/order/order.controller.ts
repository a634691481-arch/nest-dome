import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@ApiTags('订单管理')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: '创建订单' })
  @ApiResponse({ status: 201, description: '创建成功' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto)
  }

  @Get()
  @ApiOperation({ summary: '获取所有订单' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.orderService.findByUserId(+userId)
    }
    return this.orderService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定订单' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新订单' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return this.orderService.update(id, updateOrderDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除订单' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.orderService.remove(id)
    return { message: '删除成功' }
  }
}
