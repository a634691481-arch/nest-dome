import { Module } from '@nestjs/common'

/**
 * 数据库模块
 * 如果使用 TypeORM/Prisma 等，可在此配置
 */
@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('database.host'),
    //     port: configService.get('database.port'),
    //     username: configService.get('database.username'),
    //     password: configService.get('database.password'),
    //     database: configService.get('database.database'),
    //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //     synchronize: configService.get('environment') !== 'production',
    //   }),
    //   inject: [ConfigService],
    // }),
  ]
})
export class DatabaseModule {}
