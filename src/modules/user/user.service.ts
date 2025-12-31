import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BaseService } from '../../shared/base.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(UserService.name)
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto)
    const savedUser = await this.userRepository.save(user)
    this.logInfo(`用户创建成功: ${savedUser.name}`)
    return savedUser
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`用户 ID ${id} 不存在`)
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)
    Object.assign(user, updateUserDto)
    const updatedUser = await this.userRepository.save(user)
    this.logInfo(`用户更新成功: ${updatedUser.name}`)
    return updatedUser
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
    this.logInfo(`用户删除成功: ID ${id}`)
  }
}
