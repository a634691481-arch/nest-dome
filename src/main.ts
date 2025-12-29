import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 创建NestJS应用实例
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  await app.listen(process.env.PORT ?? 3000); // 监听端口
}
bootstrap().catch((err) => {
  console.error('Bootstrap error:', err);
  process.exit(1);
});
