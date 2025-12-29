import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUploadDto } from './dto/create-upload.dto'
import { UpdateUploadDto } from './dto/update-upload.dto'
import { Upload } from './entities/upload.entity'

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private uploadRepository: Repository<Upload>
  ) {}

  create(createUploadDto: CreateUploadDto) {
    return this.uploadRepository.save(createUploadDto)
  }

  findAll() {
    return this.uploadRepository.find()
  }

  findOne(id: number) {
    return this.uploadRepository.findOne({ where: { id } })
  }

  async update(id: number, updateUploadDto: UpdateUploadDto) {
    await this.uploadRepository.update(id, updateUploadDto)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.uploadRepository.delete(id)
    return { deleted: true }
  }
}
