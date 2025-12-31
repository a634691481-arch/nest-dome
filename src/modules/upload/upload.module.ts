import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { Upload } from './entities/upload.entity'
import { IndexModule } from '../index/index.module' // 导入 IndexModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload]), // 注册实体，这样才能用 Repository
    IndexModule // 导入 IndexModule，这样就能使用 IndexService 了
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
