import { Injectable, NotFoundException } from '@nestjs/common'
import { BaseService } from '../../shared/base.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order, OrderStatus } from './entities/order.entity'

@Injectable()
export class OrderService extends BaseService {
  private orders: Order[] = []
  private idCounter = 1

  constructor() {
    super(OrderService.name)
    // 初始化测试数据
    this.orders.push({
      id: this.idCounter++,
      userId: 1,
      productName: 'Nest.js 入门教程',
      amount: 99.99,
      status: OrderStatus.PAID,
      createdAt: new Date()
    })
  }

  create(createOrderDto: CreateOrderDto): Order {
    const order: Order = {
      id: this.idCounter++,
      ...createOrderDto,
      status: OrderStatus.PENDING,
      createdAt: new Date()
    }
    this.orders.push(order)
    this.logInfo(`订单创建成功: ${order.id}`)
    return order
  }

  findAll(): Order[] {
    return this.orders
  }

  findOne(id: number): Order {
    const order = this.orders.find(o => o.id === id)
    if (!order) {
      throw new NotFoundException(`订单 ID ${id} 不存在`)
    }
    return order
  }

  findByUserId(userId: number): Order[] {
    return this.orders.filter(o => o.userId === userId)
  }

  update(id: number, updateOrderDto: UpdateOrderDto): Order {
    const order = this.findOne(id)
    Object.assign(order, updateOrderDto)
    this.logInfo(`订单更新成功: ${order.id}`)
    return order
  }

  remove(id: number): void {
    const index = this.orders.findIndex(o => o.id === id)
    if (index === -1) {
      throw new NotFoundException(`订单 ID ${id} 不存在`)
    }
    this.orders.splice(index, 1)
    this.logInfo(`订单删除成功: ID ${id}`)
  }
}
