import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { DatabaseModule } from './infrastructure/database/database.module'
import { IndexModule } from './modules/index/index.module'
import { UploadModule } from './modules/upload/upload.module'

@Module({
  imports: [
    // 导入配置变量，让其他模块能使用 全局可用
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
      // validationSchema: validationSchema, // 可选：启用环境变量验证
    }),
    // 基础设施层
    DatabaseModule,
    // 业务模块
    IndexModule,
    UploadModule
  ],
  providers: [],
  controllers: [],
  exports: []
})
export class AppModule {}
