import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('uploads')
export class Upload {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  filename: string

  @Column()
  originalName: string

  @Column()
  mimeType: string

  @Column('text')
  url: string

  @Column({ default: 0 })
  size: number

  @CreateDateColumn()
  createdAt: Date
}
