import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { Upload } from './entities/upload.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload]) // 注册实体，这样才能用 Repository
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
