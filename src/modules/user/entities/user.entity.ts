import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  name: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  age?: number

  @CreateDateColumn()
  createdAt: Date
}
