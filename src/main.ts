import { NestFactory } from '@nestjs/core'
import type { INestApplication } from '@nestjs/common'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document) // 设置Swagger，访问路径为 /swagger
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 配置跨域
  app.enableCors({
    origin: true,
    credentials: true
  })

  // 配置 Swagger
  setupSwagger(app)

  // 设置全局路由前缀
  app.setGlobalPrefix('api')

  // 读取配置信息
  const port = process.env.PORT || 3000
  await app.listen(port)
}

bootstrap().catch((err: unknown) => {
  console.error('Bootstrap error:', err)
  process.exit(1)
})
