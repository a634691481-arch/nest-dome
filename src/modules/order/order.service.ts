import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseService } from '../../shared/base.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order, OrderStatus } from './entities/order.entity'

@Injectable()
export class OrderService extends BaseService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {
    super(OrderService.name)
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      ...createOrderDto,
      status: OrderStatus.PENDING
    })
    const savedOrder = await this.orderRepository.save(order)
    this.logInfo(`订单创建成功: ${savedOrder.id}`)
    return savedOrder
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find()
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } })
    if (!order) {
      throw new NotFoundException(`订单 ID ${id} 不存在`)
    }
    return order
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({ where: { userId } })
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id)
    Object.assign(order, updateOrderDto)
    const updatedOrder = await this.orderRepository.save(order)
    this.logInfo(`订单更新成功: ${updatedOrder.id}`)
    return updatedOrder
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id)
    await this.orderRepository.remove(order)
    this.logInfo(`订单删除成功: ID ${id}`)
  }
}
