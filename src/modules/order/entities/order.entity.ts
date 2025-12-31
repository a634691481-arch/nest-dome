export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export class Order {
  id: number
  userId: number
  productName: string
  amount: number
  status: OrderStatus
  createdAt: Date
}
