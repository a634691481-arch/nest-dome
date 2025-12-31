import { Injectable, NotFoundException } from '@nestjs/common'
import { BaseService } from '../../shared/base.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService extends BaseService {
  private users: User[] = []
  private idCounter = 1

  constructor() {
    super(UserService.name)
    // 初始化一些测试数据
    this.users.push({
      id: this.idCounter++,
      name: '张三',
      email: 'zhangsan@example.com',
      age: 25,
      createdAt: new Date()
    })
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: this.idCounter++,
      ...createUserDto,
      createdAt: new Date()
    }
    this.users.push(user)
    this.logInfo(`用户创建成功: ${user.name}`)
    return user
  }

  findAll(): User[] {
    return this.users
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id)
    if (!user) {
      throw new NotFoundException(`用户 ID ${id} 不存在`)
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id)
    Object.assign(user, updateUserDto)
    this.logInfo(`用户更新成功: ${user.name}`)
    return user
  }

  remove(id: number): void {
    const index = this.users.findIndex(u => u.id === id)
    if (index === -1) {
      throw new NotFoundException(`用户 ID ${id} 不存在`)
    }
    this.users.splice(index, 1)
    this.logInfo(`用户删除成功: ID ${id}`)
  }
}
