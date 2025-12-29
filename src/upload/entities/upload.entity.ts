import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('upload')
export class Upload {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  filename: string

  @Column()
  path: string

  @Column({ nullable: true })
  mimetype: string

  @Column({ nullable: true })
  size: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
