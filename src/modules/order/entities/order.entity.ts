import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  productName: string

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus

  @CreateDateColumn()
  createdAt: Date
}
