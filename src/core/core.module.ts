import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoreService } from './core.service'
import { CoreController } from './core.controller'
import { Core } from './entities/core.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Core])],
  controllers: [CoreController],
  providers: [CoreService]
})
export class CoreModule {}
