import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCoreDto } from './dto/create-core.dto'
import { UpdateCoreDto } from './dto/update-core.dto'
import { Core } from './entities/core.entity'

@Injectable()
export class CoreService {
  constructor(
    @InjectRepository(Core)
    private coreRepository: Repository<Core>
  ) {}

  create(createCoreDto: CreateCoreDto) {
    return this.coreRepository.save(createCoreDto)
  }

  findAll() {
    return this.coreRepository.find()
  }

  findOne(id: number) {
    return this.coreRepository.findOne({ where: { id } })
  }

  async update(id: number, updateCoreDto: UpdateCoreDto) {
    await this.coreRepository.update(id, updateCoreDto)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.coreRepository.delete(id)
    return { deleted: true }
  }
}
