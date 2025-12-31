import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('index_image_list') // 数据库表名
export class Index {
  @PrimaryGeneratedColumn() // 自增主键
  id: number

  @Column() // 普通字段
  title: string

  @Column('text') // 文本类型
  content: string

  @Column({ default: true }) // 带默认值
  isActive: boolean

  @CreateDateColumn() // 自动记录创建时间
  createdAt: Date
}
