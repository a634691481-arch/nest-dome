import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

/**
 * 数据库模块
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: configService.get('environment') !== 'production',
        logging: configService.get('environment') === 'development'
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule {}
