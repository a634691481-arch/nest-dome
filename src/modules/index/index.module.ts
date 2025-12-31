import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IndexService } from './index.service'
import { IndexController } from './index.controller'
import { Index } from './entities/index.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Index]) // 注册实体，这样才能用 Repository
  ],
  controllers: [IndexController],
  providers: [IndexService]
})
export class IndexModule {}
