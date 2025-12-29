import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule) // 创建NestJS应用实例

  const config = new DocumentBuilder()
    .setTitle('API Documentation') // 设置API文档的标题
    .setDescription('API接口文档') // 设置API文档的描述信息
    .setVersion('1.0') // 设置API的版本号
    .addBearerAuth() // 添加Bearer Token认证方式，用于API安全验证
    .build() // 构建Swagger配置对象
  const documentFactory = () => SwaggerModule.createDocument(app, config) // 创建Swagger文档
  SwaggerModule.setup('swagger', app, documentFactory) // 设置Swagger，访问路径为 /api-docs

  app.setGlobalPrefix('api') // 设置全局路由前缀
  await app.listen(process.env.PORT ?? 3000) // 监听端口
}
bootstrap().catch(err => {
  console.error('Bootstrap error:', err)
  process.exit(1)
})
