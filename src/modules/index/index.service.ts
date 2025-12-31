import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateIndexDto } from './dto/create-index.dto'
import { UpdateIndexDto } from './dto/update-index.dto'
import { Index } from './entities/index.entity'

@Injectable()
export class IndexService {
  // 注入 Index 实体的 Repository（数据库操作工具）
  constructor(
    @InjectRepository(Index)
    private readonly indexRepository: Repository<Index>
  ) {}

  // 创建一条数据（插入数据库）
  async create(createIndexDto: CreateIndexDto) {
    // create + save 方式（推荐，会触发所有钩子）
    const newItem = this.indexRepository.create(createIndexDto)
    const saved = await this.indexRepository.save(newItem)

    return saved
  }

  // 查询所有数据
  async findAll() {
    return await this.indexRepository.find()
  }

  // 查询单条数据
  async findOne(id: number) {
    return await this.indexRepository.findOne({ where: { id } })
  }

  // 更新数据
  async update(id: number, updateIndexDto: UpdateIndexDto) {
    await this.indexRepository.update(id, updateIndexDto)
    return this.findOne(id)
  }

  // 删除数据
  async remove(id: number) {
    await this.indexRepository.delete(id)
    return { message: '删除成功' }
  }
}
